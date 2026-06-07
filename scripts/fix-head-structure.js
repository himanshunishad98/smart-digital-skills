/**
 * fix-head-structure.js
 *
 * Reorders <head> elements in all HTML files to the proper SEO/CWV sequence:
 * 1. <meta charset>
 * 2. <meta viewport>
 * 3. <title>
 * 4. <meta description>
 * 5. <link rel="canonical">
 * 6. <link rel="preconnect"> / <link rel="dns-prefetch">
 * 7. <link rel="preload"> (fonts, critical assets)
 * 8. <style> (critical CSS inline)
 * 9. JSON-LD schema <script type="application/ld+json">
 * 10. GTM / tracking scripts (last in head)
 *
 * Also fixes:
 * - Adds defer to non-critical scripts
 * - Adds font-display:swap preconnect for Google Fonts
 * - Adds fetchpriority="high" to LCP image candidates
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../');

function getAllHtmlFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'scripts'].includes(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) getAllHtmlFiles(full, results);
    else if (e.name.endsWith('.html')) results.push(full);
  }
  return results;
}

const APPROVED_GTM_SCRIPT = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-ML9QWMMH');</script>
<!-- End Google Tag Manager -->`;

const APPROVED_META_PIXEL = `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1356797499656239');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1356797499656239&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`;

const APPROVED_GTM_NOSCRIPT = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-ML9QWMMH"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

function fixHeadStructure(html) {
  // Use function callback to ensure we replace each script block individually without matching across tags
  let cleanedHtml = html.replace(/<script[^>]*>(?:(?!<\/script>)[\s\S])*?<\/script>/gi, (match) => {
    if (match.includes('googletagmanager') || match.includes('gtag(') || match.includes('fbq(') || match.includes('dataLayer') || match.includes('1356797499656239') || match.includes('GTM-ML9QWMMH')) {
      return '';
    }
    return match;
  });

  // Strip external script tags referencing tracking endpoints
  cleanedHtml = cleanedHtml.replace(/<script[^>]*(?:googletagmanager\.com|connect\.facebook\.net)[^>]*>(?:(?!<\/script>)[\s\S])*?<\/script>/gi, '');

  // Strip noscripts containing tracking code individually
  cleanedHtml = cleanedHtml.replace(/<noscript>(?:(?!<\/noscript>)[\s\S])*?<\/noscript>/gi, (match) => {
    if (match.includes('googletagmanager') || match.includes('facebook.com/tr')) {
      return '';
    }
    return match;
  });

  // Strip Google Tag Manager and Meta Pixel comments and empty comments blocks to prevent accumulation
  cleanedHtml = cleanedHtml.replace(/<!--\s*Google Tag Manager\s*-->[\s\S]*?<!--\s*End Google Tag Manager\s*-->/gi, '');
  cleanedHtml = cleanedHtml.replace(/<!--\s*Google Tag Manager \(noscript\)\s*-->[\s\S]*?<!--\s*End Google Tag Manager \(noscript\)\s*-->/gi, '');
  cleanedHtml = cleanedHtml.replace(/<!--\s*Meta Pixel Code\s*-->[\s\S]*?<!--\s*End Meta Pixel Code\s*-->/gi, '');
  cleanedHtml = cleanedHtml.replace(/<!--\s*Meta Pixel \(noscript\)\s*-->[\s\S]*?<!--\s*End Meta Pixel \(noscript\)\s*-->/gi, '');

  // Extract head content from the cleaned HTML
  const headMatch = cleanedHtml.match(/<head([^>]*)>([\s\S]*?)<\/head>/i);
  if (!headMatch) return html; // fallback to original if head cannot be parsed

  const headAttrs = headMatch[1];
  let headContent = headMatch[2];

  // --- 1. Collect elements by category ---
  const charset = headContent.match(/<meta\s+charset[^>]*>/i)?.[0] || '<meta charset="utf-8">';
  const viewport = headContent.match(/<meta\s+[^>]*name=["']viewport["'][^>]*>/i)?.[0] || '';
  const title = headContent.match(/<title>[^<]*<\/title>/i)?.[0] || '';
  const metaDesc = headContent.match(/<meta\s+[^>]*name=["']description["'][^>]*>/i)?.[0] || '';
  const canonical = headContent.match(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i)?.[0] || '';
  const themeColor = headContent.match(/<meta\s+[^>]*name=["']theme-color["'][^>]*>/i)?.[0] || '';

  // OG/Twitter meta tags
  const ogTags = [...headContent.matchAll(/<meta\s+[^>]*?(?:property|name)=["'](?:og:|twitter:)[^"']*["'][^>]*?>/gi)].map(m => m[0]);
  const robotsMeta = headContent.match(/<meta\s+[^>]*name=["']robots["'][^>]*>/i)?.[0] || '';
  const authorMeta = headContent.match(/<meta\s+[^>]*name=["']author["'][^>]*>/i)?.[0] || '';

  // Favicon
  const favicon = '<link href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNyIgZmlsbD0iIzFlNGVhMCIvPjxyZWN0IHg9IjYiIHk9IjkiIHdpZHRoPSIxMyIgaGVpZ2h0PSI5IiByeD0iMS41IiBmaWxsPSJub25lIiBzdHJva2U9IiNmYmJmMjQiIHN0cm9rZS13aWR0aD0iMS41Ii8+PGxpbmUgeDE9IjkiIHkxPSIxOCIgeDI9IjE2IiB5Mj0iMTgiIHN0cm9rZT0iI2ZiYmYyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cmVjdCB4PSIxMCIgeT0iMjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjEuNSIgcng9Ii43NSIgZmlsbD0iI2ZiYmYyNCIvPjxjaXJjbGUgY3g9IjIzIiBjeT0iMTEiIHI9IjQiIGZpbGw9IiNmYmJmMjQiLz48dGV4dCB4PSIyMyIgeT0iMTQuNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiMwZjI4NjEiPkFJPC90ZXh0Pjwvc3ZnPg==" rel="icon" type="image/svg+xml">';

  // Preconnect / dns-prefetch links
  const preconnects = [...headContent.matchAll(/<link\s+[^>]*rel=["'](?:preconnect|dns-prefetch)["'][^>]*>/gi)].map(m => m[0]);

  // Preload links
  const preloads = [...headContent.matchAll(/<link\s+[^>]*rel=["']preload["'][^>]*>/gi)].map(m => m[0]);

  // Stylesheets (non-preload)
  const stylesheets = [...headContent.matchAll(/<link\s+[^>]*rel=["']stylesheet["'][^>]*>/gi)].map(m => m[0]);
  const noscriptStyles = [...headContent.matchAll(/<noscript>[\s\S]*?<\/noscript>/gi)].map(m => m[0]);

  // Inline style blocks
  const inlineStyles = [...headContent.matchAll(/<style>[\s\S]*?<\/style>/gi)].map(m => m[0]);

  // JSON-LD schemas
  const schemas = [...headContent.matchAll(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi)].map(m => m[0]);

  // Non-GTM / non-FB scripts in head (GTM and FB Pixel are completely stripped from cleanedHtml, so we only get others)
  const otherScripts = [...headContent.matchAll(/<script[^>]*>[\s\S]*?<\/script>/gi)]
    .map(m => m[0])
    .filter(s => !s.includes('application/ld+json'));

  // Add defer to other (non-GTM, non-FB, non-schema) head scripts if not already deferred
  const deferredOtherScripts = otherScripts.map(s => {
    if (s.includes('defer') || s.includes('async') || s.includes('application/ld') || s.includes('fallback.js')) return s;
    return s.replace('<script', '<script defer');
  });

  // Google Fonts preconnect (add if missing)
  const hasGFontsPreconnect = preconnects.some(p => p.includes('fonts.googleapis') || p.includes('fonts.gstatic'));
  const gfontsPreconnects = hasGFontsPreconnect ? [] : [
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
  ];

  // --- 2. Rebuild head in correct order ---
  const parts = [
    charset,
    viewport,
    title,
    metaDesc,
    canonical,
    robotsMeta,
    authorMeta,
    themeColor,
    favicon,
    ...gfontsPreconnects,
    ...preconnects.filter(p => !p.includes('fonts.googleapis') && !p.includes('fonts.gstatic')),
    ...preloads,
    ...inlineStyles,           // critical CSS inline (already injected by inject-critical-css.js)
    ...stylesheets,
    ...noscriptStyles,
    ...ogTags,
    ...schemas,                // JSON-LD schemas
    ...deferredOtherScripts,   // non-GTM head scripts (deferred)
    APPROVED_META_PIXEL,       // Meta Pixel
    APPROVED_GTM_SCRIPT,       // GTM last in head
  ].filter(Boolean);

  const newHead = `<head${headAttrs}>\n${parts.join('\n')}\n</head>`;
  let updatedHtml = cleanedHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/i, newHead);

  // Inject GTM noscript immediately after opening <body> tag
  updatedHtml = updatedHtml.replace(/<body([^>]*)>/i, (match, attrs) => {
    return `<body${attrs}>\n${APPROVED_GTM_NOSCRIPT}`;
  });

  return updatedHtml;
}

console.log('\n=== FIXING HEAD STRUCTURE ===');
const files = getAllHtmlFiles(ROOT);
let modified = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  let html = fs.readFileSync(file, 'utf8');
  if (html.length < 500) continue; // skip extremely short files

  const fixed = fixHeadStructure(html);
  if (fixed !== html) {
    fs.writeFileSync(file, fixed, 'utf8');
    console.log(`  ✓ Fixed head structure: ${rel}`);
    modified++;
  }
}

console.log(`\n✅ Head structure fix complete. ${modified} files updated.`);
