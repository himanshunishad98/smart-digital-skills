/**
 * inject-critical-css.js
 *
 * Replaces the existing massive inline <style> blocks in all HTML files
 * with a minimal, optimized critical CSS block (~4KB) from css/critical.css.
 *
 * All non-critical styles are already in css/bundle.min.css (loaded async).
 * This improves: FCP, LCP, HTML payload size, caching efficiency.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../');
const CRITICAL_CSS_FILE = path.join(ROOT, 'assets/css/critical.css');

// Read and minify critical CSS
function minify(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')   // remove comments
    .replace(/\s{2,}/g, ' ')            // collapse whitespace
    .replace(/\s*([{}:;,>~+])\s*/g, '$1') // clean around operators
    .replace(/;}/g, '}')               // remove last semicolon in block
    .trim();
}

if (!fs.existsSync(CRITICAL_CSS_FILE)) {
  console.error('ERROR: css/critical.css not found. Run after creating it.');
  process.exit(1);
}

const criticalCssRaw = fs.readFileSync(CRITICAL_CSS_FILE, 'utf8');
const criticalCssMin = minify(criticalCssRaw);
const criticalStyleTag = `<style>${criticalCssMin}</style>`;

console.log(`\n=== INJECTING CRITICAL CSS ===`);
console.log(`Critical CSS size: ${criticalCssMin.length} bytes (minified)`);

function getAllHtmlFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (['node_modules', '.git', 'scripts'].includes(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) getAllHtmlFiles(full, results);
    else if (e.name.endsWith('.html')) results.push(full);
  }
  return results;
}

const allFiles = getAllHtmlFiles(ROOT);
let modified = 0;
let totalBytesSaved = 0;

for (const file of allFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  let html = fs.readFileSync(file, 'utf8');

  // Skip tiny redirect files (< 2KB — they have no inline style)
  if (html.length < 2000) continue;

  const original = html;

  // Replace ALL existing <style>...</style> blocks in <head> with critical CSS
  // Strategy: remove existing inline style blocks, then insert critical CSS
  let styleBlockCount = 0;
  let totalInlineSize = 0;

  // Match and measure inline style blocks
  const styleMatches = [...html.matchAll(/<style>([\s\S]*?)<\/style>/gi)];
  for (const m of styleMatches) {
    totalInlineSize += m[0].length;
    styleBlockCount++;
  }

  if (styleBlockCount === 0) continue; // no inline style blocks

  // Remove all existing inline <style> blocks
  html = html.replace(/<style>[\s\S]*?<\/style>/gi, '');

  // Insert critical CSS right after <head> opening tag
  html = html.replace(/(<head[^>]*>)/, `$1\n${criticalStyleTag}`);

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    const saved = totalInlineSize - criticalStyleTag.length;
    totalBytesSaved += Math.max(0, saved);
    modified++;
    console.log(`  ✓ ${rel} — replaced ${totalInlineSize}B inline → ${criticalStyleTag.length}B critical (saved ${Math.max(0,saved)}B)`);
  }
}

console.log(`\n✅ Critical CSS injection complete.`);
console.log(`   Files updated: ${modified}`);
console.log(`   Total bytes saved: ${totalBytesSaved.toLocaleString()} bytes (~${Math.round(totalBytesSaved/1024)}KB)`);
