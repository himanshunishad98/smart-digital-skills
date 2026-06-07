/**
 * verify-seo.js
 * Build-level SEO validation script.
 * Exits with code 1 if CRITICAL issues are found.
 *
 * Checks:
 *  - No CONFIG_ placeholder leakage
 *  - <title> present
 *  - meta description present
 *  - self-referencing canonical (absolute URL)
 *  - robots meta tag
 *  - OpenGraph: og:title, og:description, og:image, og:url, og:type, og:site_name
 *  - Twitter: twitter:card, twitter:title, twitter:description, twitter:image
 *  - meta author
 *  - meta theme-color
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootDir = path.join(__dirname, '../');

function getAllHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllHtmlFiles(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

console.log('=== VERIFY-SEO: Running SEO Validation ===\n');
const htmlFiles = getAllHtmlFiles(rootDir);
let criticalErrors = 0;
let warnings = 0;
const issueLog = [];

htmlFiles.forEach(file => {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');

  // Skip scripts/templates (partials)
  if (relPath.startsWith('scripts/')) return;

  const content = fs.readFileSync(file, 'utf8');

  // Skip redirect pages (noindex)
  const isRedirect = content.includes('http-equiv="refresh"') || content.includes('window.location.replace') || content.includes('Redirecting…');
  if (isRedirect) return;

  // 0. CONFIG_ placeholder leak detection (CRITICAL)
  if (content.includes('CONFIG_')) {
    const tokens = [...new Set((content.match(/CONFIG_\w+/g) || []))];
    issueLog.push({ file: relPath, issues: [{ type: 'CRITICAL', msg: `CONFIG_ placeholder leakage: ${tokens.join(', ')}` }] });
    criticalErrors++;
    return; // No need to check further if template leaked
  }

  const $ = cheerio.load(content, { decodeEntities: false });
  const fileIssues = [];

  // 1. Title tag
  const title = $('title').text().trim();
  if (!title) {
    fileIssues.push({ type: 'CRITICAL', msg: 'Missing <title> tag' });
    criticalErrors++;
  }

  // 2. Meta description
  const desc = $('meta[name="description"]').attr('content') || '';
  if (!desc) {
    fileIssues.push({ type: 'CRITICAL', msg: 'Missing meta description' });
    criticalErrors++;
  }

  // 3. Canonical link (absolute URL)
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  if (!canonical) {
    fileIssues.push({ type: 'CRITICAL', msg: 'Missing canonical link tag' });
    criticalErrors++;
  } else if (!canonical.startsWith('https://skillnest.co.in')) {
    fileIssues.push({ type: 'CRITICAL', msg: `Non-absolute canonical: ${canonical}` });
    criticalErrors++;
  }

  // 4. Robots tag
  const robots = $('meta[name="robots"]').attr('content') || '';
  if (!robots) {
    fileIssues.push({ type: 'WARN', msg: 'Missing robots meta tag' });
    warnings++;
  }

  // 5. OG tags (CRITICAL)
  const ogRequiredTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:site_name'];
  for (const tag of ogRequiredTags) {
    const val = $(`meta[property="${tag}"]`).attr('content') || '';
    if (!val) {
      fileIssues.push({ type: 'CRITICAL', msg: `Missing ${tag}` });
      criticalErrors++;
    }
  }

  // 6. Twitter card (CRITICAL)
  const twitterRequiredTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
  for (const tag of twitterRequiredTags) {
    const val = $(`meta[name="${tag}"]`).attr('content') || '';
    if (!val) {
      fileIssues.push({ type: 'CRITICAL', msg: `Missing ${tag}` });
      criticalErrors++;
    }
  }

  // 7. Author
  const author = $('meta[name="author"]').attr('content') || '';
  if (!author) {
    fileIssues.push({ type: 'WARN', msg: 'Missing meta author' });
    warnings++;
  }

  // 8. Theme color
  const themeColor = $('meta[name="theme-color"]').attr('content') || '';
  if (!themeColor) {
    fileIssues.push({ type: 'WARN', msg: 'Missing meta theme-color' });
    warnings++;
  }

  if (fileIssues.length > 0) {
    issueLog.push({ file: relPath, issues: fileIssues });
  }
});

// Report
if (issueLog.length > 0) {
  issueLog.forEach(entry => {
    console.log(`📄 ${entry.file}`);
    entry.issues.forEach(i => {
      console.log(`   [${i.type}] ${i.msg}`);
    });
  });
}

console.log(`\n=== SEO Validation Summary ===`);
console.log(`Files checked: ${htmlFiles.length}`);
console.log(`Critical errors: ${criticalErrors}`);
console.log(`Warnings: ${warnings}`);

if (criticalErrors > 0) {
  console.error(`\n❌ SEO validation FAILED with ${criticalErrors} critical error(s). Fix before deploying.`);
  process.exit(1);
} else {
  console.log('\n✅ SEO validation passed!');
}
