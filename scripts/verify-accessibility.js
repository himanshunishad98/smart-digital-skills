/**
 * verify-accessibility.js
 * Build-level accessibility validation script (WCAG basics).
 * Exits with code 1 if CRITICAL issues are found.
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

console.log('=== VERIFY-ACCESSIBILITY: Running Accessibility Validation ===\n');
const htmlFiles = getAllHtmlFiles(rootDir);
let criticalErrors = 0;
let warnings = 0;
const issueLog = [];

htmlFiles.forEach(file => {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  if (relPath.startsWith('scripts/')) return;

  const content = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(content, { decodeEntities: false });
  const fileIssues = [];

  // 1. Images must have alt text
  $('img').each((i, el) => {
    const src = $(el).attr('src') || '';
    // Skip tracking pixels and known 1x1 images
    if (src.includes('facebook.com/tr') || src.includes('googletagmanager') ||
        ($(el).attr('width') === '1' && $(el).attr('height') === '1')) return;

    const alt = $(el).attr('alt');
    if (alt === undefined) {
      fileIssues.push({ type: 'CRITICAL', msg: `Image missing alt attribute: src="${src.slice(0, 60)}"` });
      criticalErrors++;
    }
  });

  // 2. Anchor tags with no text content and no aria-label
  $('a').each((i, el) => {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr('aria-label') || '';
    const title = $(el).attr('title') || '';
    const imgAlt = $(el).find('img').attr('alt') || '';
    if (!text && !ariaLabel && !title && !imgAlt) {
      const href = $(el).attr('href') || '';
      fileIssues.push({ type: 'WARN', msg: `Empty anchor tag with no accessible text (href="${href.slice(0, 40)}")` });
      warnings++;
    }
  });

  // 3. Buttons with no accessible text
  $('button').each((i, el) => {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr('aria-label') || '';
    if (!text && !ariaLabel) {
      fileIssues.push({ type: 'WARN', msg: 'Button has no accessible text and no aria-label' });
      warnings++;
    }
  });

  // 4. html lang attribute
  const htmlLang = $('html').attr('lang') || '';
  if (!htmlLang) {
    fileIssues.push({ type: 'CRITICAL', msg: 'Missing lang attribute on <html>' });
    criticalErrors++;
  }

  // 5. Check for main landmark
  const hasMain = $('main').length > 0;
  if (!hasMain && !relPath.startsWith('Personality Test/') && !relPath.startsWith('resources/')) {
    fileIssues.push({ type: 'WARN', msg: 'Missing <main> landmark element' });
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

console.log(`\n=== Accessibility Validation Summary ===`);
console.log(`Files checked: ${htmlFiles.length}`);
console.log(`Critical errors: ${criticalErrors}`);
console.log(`Warnings: ${warnings}`);

if (criticalErrors > 0) {
  console.error(`\n❌ Accessibility validation FAILED with ${criticalErrors} critical error(s).`);
  process.exit(1);
} else {
  console.log('\n✅ Accessibility validation passed!');
}
