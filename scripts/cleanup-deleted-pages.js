/**
 * cleanup-deleted-pages.js
 * Removes all references to deleted city/course pages, creates redirect files,
 * and updates sitemaps.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ─── DELETED CITIES & THEIR REDIRECT TARGETS ─────────────────────────────────
const DELETED_CITIES = {
  'dharwad':           '/cities/mysuru/',
  'tumkur':            '/cities/mysuru/',
  'kalaburagi':        '/cities/mysuru/',
  'gaya':              '/cities/patna/',
  'jorhat':            '/',
  'ladakh':            '/',
  'sikkim':            '/',
  'arunachal-pradesh': '/',
  'himachal-pradesh':  '/',
  'jammu-kashmir':     '/',
  'mohali':            '/cities/chandigarh/',
};

const DELETED_CITY_NAMES = {
  'dharwad':           'Dharwad',
  'tumkur':            'Tumkur',
  'kalaburagi':        'Kalaburagi',
  'gaya':              'Gaya',
  'jorhat':            'Jorhat',
  'ladakh':            'Ladakh',
  'sikkim':            'Sikkim',
  'arunachal-pradesh': 'Arunachal Pradesh',
  'himachal-pradesh':  'Himachal Pradesh',
  'jammu-kashmir':     'Jammu & Kashmir',
  'mohali':            'Mohali',
};

// ─── DELETED SEO PAGES & THEIR REDIRECT TARGETS ──────────────────────────────
const DELETED_SEO_PAGES = {
  'seo-ai-classes-for-school-students.html':  '/courses/ai-classes-for-school-students/',
  'seo-coding-classes-for-kids-india.html':   '/courses/coding-classes-for-kids-india/',
  'seo-computer-classes-for-teenagers.html':  '/courses/computer-classes-for-teenagers/',
  'seo-digital-skills-classes-for-kids.html': '/courses/digital-skills-classes-for-kids/',
  'student-projects.html':                    '/projects/',
};

// ─── DELETED COURSE SUB-PAGES & THEIR REDIRECT TARGETS ───────────────────────
const DELETED_COURSE_PAGES = {
  'legal/refund-policy': '/legal/refund-policy.html',
  'courses/scratch-coding-course': '/courses/coding/',
  'cities/bhopal/ai-classes': '/cities/bhopal/',
  'cities/indore/computer-classes': '/cities/indore/',
  'cities/jaipur/digital-skills': '/cities/jaipur/',
  'cities/lucknow/ai-classes': '/cities/lucknow/',
  'cities/lucknow/coding-classes': '/cities/lucknow/',
  'cities/patna/spoken-english': '/cities/patna/',
  'cities/surat/coding-classes': '/cities/surat/',
  'cities/varanasi/digital-skills': '/cities/varanasi/',
  'cities/bhilai/computer-classes-for-kids': '/cities/bhilai/digital-skills/',
  'cities/bhilai-nagar/computer-classes-for-kids': '/cities/bhilai-nagar/digital-skills/',
  'cities/durg/computer-classes-for-kids': '/cities/durg/digital-skills/',
  'cities/raipur/computer-classes-for-kids': '/cities/raipur/digital-skills/',
};

// ─── REDIRECT HTML TEMPLATE ───────────────────────────────────────────────────
function makeRedirectHtml(from, to, label) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting… | SkillNest</title>
<link rel="canonical" href="https://skillnest.co.in${to}">
<meta http-equiv="refresh" content="0; url=https://skillnest.co.in${to}">
<meta name="robots" content="noindex, follow">
<script>window.location.replace("${to}");</script>
</head>
<body>
<main>
<p>This page has moved. <a href="${to}">Click here</a> if you are not redirected automatically.</p>
</main>
</body>
</html>`;
}

// ─── STEP 1: Create redirect files for deleted city & course pages ────────────
console.log('\n=== STEP 1: Creating city & course redirect files ===');
for (const [city, target] of Object.entries(DELETED_CITIES)) {
  const dir = path.join(ROOT, 'cities', city);
  const file = path.join(dir, 'index.html');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const html = makeRedirectHtml(`/cities/${city}/`, target, DELETED_CITY_NAMES[city]);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`  ✓ cities/${city}/index.html → ${target}`);
}

for (const [courseDir, target] of Object.entries(DELETED_COURSE_PAGES)) {
  const dir = path.join(ROOT, courseDir);
  const file = path.join(dir, 'index.html');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const html = makeRedirectHtml(`/${courseDir}/`, target, courseDir);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`  ✓ ${courseDir}/index.html → ${target}`);
}


// ─── STEP 2: Create redirect files for deleted seo-*.html pages ───────────────
console.log('\n=== STEP 2: Creating SEO page redirect files ===');
for (const [page, target] of Object.entries(DELETED_SEO_PAGES)) {
  const file = path.join(ROOT, page);
  const html = makeRedirectHtml(`/${page}`, target, page);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`  ✓ ${page} → ${target}`);
}

// ─── STEP 3: Remove broken footer links from all HTML files ───────────────────
console.log('\n=== STEP 3: Removing deleted city links from HTML files ===');

function collectHtmlFiles(dir, results = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.name === 'node_modules') continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      collectHtmlFiles(full, results);
    } else if (item.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

// Build regex patterns for each deleted city link (anchor + optional trailing separator span)
// Pattern: <a href="/cities/CITY/" ...>CityName</a><span ...>|</span>
// Also handles the case where the <a> and <span> are on separate lines or have slightly different formatting.
function buildCityLinkPatterns(city) {
  const patterns = [];

  // Pattern 1: anchor tag followed immediately by separator span (same line, various whitespace)
  // <a href="/cities/CITY/" style="...">TEXT</a><span style="color: rgba(255,255,255,0.2); margin-right: 12px;">|</span>
  patterns.push(
    new RegExp(
      `\\s*<a\\s+href=["']/cities/${city}/["'][^>]*>[^<]*</a>` +
      `(?:\\s*<span\\s+style="color:\\s*rgba\\(255,255,255,0\\.2\\);[^"]*">\\s*\\|\\s*</span>)?`,
      'gi'
    )
  );

  // Pattern 2: anchor on its own line with indentation
  patterns.push(
    new RegExp(
      `[ \\t]*<a\\s[^>]*href=["']/cities/${city}/["'][^>]*>.*?</a>(?:\\s*<span[^>]*>\\s*\\|\\s*</span>)?[\\r\\n]?`,
      'gi'
    )
  );

  return patterns;
}

const allHtmlFiles = collectHtmlFiles(ROOT);
let totalFilesModified = 0;

for (const file of allHtmlFiles) {
  // Skip redirect files we just created
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const isRedirectCity = Object.keys(DELETED_CITIES).some(c => rel === `cities/${c}/index.html`);
  const isRedirectSeo = Object.keys(DELETED_SEO_PAGES).some(p => rel === p);
  if (isRedirectCity || isRedirectSeo) continue;

  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  let changed = false;

  for (const city of Object.keys(DELETED_CITIES)) {
    const patterns = buildCityLinkPatterns(city);
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, '');
        changed = true;
      }
    }
  }

  // Also remove stacked separators left behind (e.g. || or dangling | at end of city list block)
  // Fix doubled separators like: | | or ending with | before the closing tag
  content = content.replace(
    /(<span style="color: rgba\(255,255,255,0\.2\); margin-right: 12px;">\|<\/span>\s*)+(<span style="color: rgba\(255,255,255,0\.2\); margin-right: 12px;">\|<\/span>)/gi,
    '$2'
  );

  if (changed && content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`  ✓ Cleaned: ${rel}`);
    totalFilesModified++;
  }
}
console.log(`  Total HTML files modified: ${totalFilesModified}`);

// ─── STEP 4: Remove hilly region section from Punjab/index.html ───────────────
console.log('\n=== STEP 4: Removing hilly region section from Punjab page ===');
const punjabFile = path.join(ROOT, 'cities', 'punjab', 'index.html');
let punjabContent = fs.readFileSync(punjabFile, 'utf8');

// The hilly region section contains a link to /cities/ladakh/ — remove entire section block
// It's a card or section element containing references to ladakh/himachal/sikkim/arunachal/jk
const hillyPatterns = [
  // Remove any section/div containing "Hilly Regions" or "hilly" heading text
  /<[^>]+>[^<]*(?:hilly\s*region|explore\s*more\s*cities|himachal|sikkim|arunachal|jammu)[^<]*<\/[^>]+>/gi,

  // Remove specific ladakh anchor in non-footer context (line ~2014)
  /<a\s+href="\/cities\/ladakh\/"[^>]*>[\s\S]*?<\/a>/gi,

  // Remove any remaining references
  /<a\s+href="\/cities\/himachal-pradesh\/"[^>]*>[\s\S]*?<\/a>/gi,
  /<a\s+href="\/cities\/sikkim\/"[^>]*>[\s\S]*?<\/a>/gi,
  /<a\s+href="\/cities\/arunachal-pradesh\/"[^>]*>[\s\S]*?<\/a>/gi,
  /<a\s+href="\/cities\/jammu-kashmir\/"[^>]*>[\s\S]*?<\/a>/gi,
];

const punjabOriginal = punjabContent;
for (const pat of hillyPatterns) {
  punjabContent = punjabContent.replace(pat, '');
}

if (punjabContent !== punjabOriginal) {
  fs.writeFileSync(punjabFile, punjabContent, 'utf8');
  console.log('  ✓ Hilly region references removed from cities/punjab/index.html');
} else {
  console.log('  ℹ No hilly region patterns found (may have already been cleaned).');
}

// ─── STEP 5: Update sitemap-cities.xml ────────────────────────────────────────
console.log('\n=== STEP 5: Updating sitemap-cities.xml ===');
const sitemapCitiesFile = path.join(ROOT, 'sitemap-cities.xml');
let sitemapCities = fs.readFileSync(sitemapCitiesFile, 'utf8');

for (const city of Object.keys(DELETED_CITIES)) {
  // Remove the <url>...</url> block for this city
  const urlPattern = new RegExp(
    `\\s*<url>\\s*<loc>https://skillnest\\.co\\.in/cities/${city}/</loc>[\\s\\S]*?</url>`,
    'gi'
  );
  sitemapCities = sitemapCities.replace(urlPattern, '');
}

fs.writeFileSync(sitemapCitiesFile, sitemapCities.trim() + '\n', 'utf8');
console.log('  ✓ sitemap-cities.xml updated — removed deleted city entries');

// ─── STEP 6: Update sitemap-course-pages.xml ──────────────────────────────────
console.log('\n=== STEP 6: Clearing sitemap-course-pages.xml ===');
// All course sub-pages (coding-classes, ai-classes, etc.) are deleted
const emptyCoursesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap-course-pages.xml'), emptyCoursesSitemap, 'utf8');
console.log('  ✓ sitemap-course-pages.xml cleared (all course sub-pages removed)');

// ─── STEP 7: Update sitemap-landing-pages.xml ─────────────────────────────────
console.log('\n=== STEP 7: Updating sitemap-landing-pages.xml ===');
const sitemapLandingFile = path.join(ROOT, 'sitemap-landing-pages.xml');
let sitemapLanding = fs.readFileSync(sitemapLandingFile, 'utf8');

const seoPageUrls = [
  'seo-ai-classes-for-school-students.html',
  'seo-coding-classes-for-kids-india.html',
  'seo-computer-classes-for-teenagers.html',
  'seo-digital-skills-classes-for-kids.html',
];
for (const page of seoPageUrls) {
  const urlPattern = new RegExp(
    `\\s*<url>\\s*<loc>https://skillnest\\.co\\.in/${page}</loc>[\\s\\S]*?</url>`,
    'gi'
  );
  sitemapLanding = sitemapLanding.replace(urlPattern, '');
}

// Also remove blog posts linked to deleted regions
const deletedBlogUrls = [
  'blog-coding-ladakh.html',
  'blog-digital-education-jk.html',
  'blog-education-himachal.html',
  'blog-stem-sikkim.html',
  'blog-computational-thinking-arunachal.html',
];
for (const blog of deletedBlogUrls) {
  const urlPattern = new RegExp(
    `\\s*<url>\\s*<loc>https://skillnest\\.co\\.in/${blog}</loc>[\\s\\S]*?</url>`,
    'gi'
  );
  sitemapLanding = sitemapLanding.replace(urlPattern, '');
}

fs.writeFileSync(sitemapLandingFile, sitemapLanding.trim() + '\n', 'utf8');
console.log('  ✓ sitemap-landing-pages.xml updated — removed seo-*.html and deleted region blog entries');

// ─── STEP 8: Verify no remaining broken links ─────────────────────────────────
console.log('\n=== STEP 8: Verification — scanning for remaining broken links ===');
const allHtmlFilesAfter = collectHtmlFiles(ROOT);
let brokenFound = false;
const toCheck = Object.keys(DELETED_CITIES).map(c => `/cities/${c}/`);

for (const file of allHtmlFilesAfter) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const isOwnRedirect = Object.keys(DELETED_CITIES).some(c => rel === `cities/${c}/index.html`);
  if (isOwnRedirect) continue;

  const content = fs.readFileSync(file, 'utf8');
  for (const linkPath of toCheck) {
    const city = linkPath.replace('/cities/', '').replace('/', '');
    // Ignore the canonical/og:url in the redirect files themselves
    if (content.includes(`href="${linkPath}"`) || content.includes(`href='${linkPath}'`)) {
      console.log(`  ⚠ Still has link to ${linkPath} in: ${rel}`);
      brokenFound = true;
    }
  }
}

if (!brokenFound) {
  console.log('  ✓ No remaining broken links found in HTML files!');
}

console.log('\n✅ CLEANUP COMPLETE!\n');
console.log('Summary:');
console.log(`  - ${Object.keys(DELETED_CITIES).length} city redirect files created`);
console.log(`  - ${Object.keys(DELETED_SEO_PAGES).length} SEO page redirect files created`);
console.log(`  - ${totalFilesModified} HTML files had footer links removed`);
console.log('  - sitemap-cities.xml: deleted city entries removed');
console.log('  - sitemap-course-pages.xml: cleared');
console.log('  - sitemap-landing-pages.xml: seo-*.html + region blog entries removed');
