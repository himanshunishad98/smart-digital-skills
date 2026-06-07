/**
 * verify-headings.js
 * Build-level heading structure validation.
 * Checks for sequential heading order and exactly one H1 per page.
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

console.log('=== VERIFY-HEADINGS: Running Heading Structure Validation ===\n');
const htmlFiles = getAllHtmlFiles(rootDir);
let criticalErrors = 0;
let warnings = 0;
const issueLog = [];

htmlFiles.forEach(file => {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  if (relPath.startsWith('scripts/') || relPath.startsWith('Personality Test/') || relPath.startsWith('resources/')) return;

  const content = fs.readFileSync(file, 'utf8');
  const isRedirect = content.includes('http-equiv="refresh"') || content.includes('window.location.replace') || content.includes('Redirecting…');
  if (isRedirect) return;
  const $ = cheerio.load(content, { decodeEntities: false });
  const fileIssues = [];

  // 1. Collect all headings in document order (excluding script/style content)
  const headings = [];
  $('h1, h2, h3, h4, h5, h6').each((i, el) => {
    const level = parseInt(el.name[1]);
    headings.push({ level, text: $(el).text().trim().slice(0, 60) });
  });

  // 2. Exactly one H1
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count === 0) {
    fileIssues.push({ type: 'CRITICAL', msg: 'No H1 tag found on page' });
    criticalErrors++;
  } else if (h1Count > 1) {
    fileIssues.push({ type: 'CRITICAL', msg: `Multiple H1 tags found (${h1Count} total)` });
    criticalErrors++;
  }

  // 3. No heading level jump > 1 (e.g., H1 → H3)
  for (let i = 0; i < headings.length - 1; i++) {
    const curr = headings[i];
    const next = headings[i + 1];
    if (next.level > curr.level + 1) {
      fileIssues.push({
        type: 'WARN',
        msg: `Heading jump from H${curr.level} → H${next.level}: "${curr.text}" → "${next.text}"`
      });
      warnings++;
    }
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

console.log(`\n=== Heading Validation Summary ===`);
console.log(`Files checked: ${htmlFiles.length}`);
console.log(`Critical errors: ${criticalErrors}`);
console.log(`Warnings: ${warnings}`);

if (criticalErrors > 0) {
  console.error(`\n❌ Heading validation FAILED with ${criticalErrors} critical error(s).`);
  process.exit(1);
} else {
  console.log('\n✅ Heading validation passed!');
}
