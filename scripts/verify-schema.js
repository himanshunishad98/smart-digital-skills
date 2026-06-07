/**
 * verify-schema.js
 * Build-level JSON-LD schema validation.
 * Exits with code 1 if any malformed schemas are found.
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

console.log('=== VERIFY-SCHEMA: Running JSON-LD Schema Validation ===\n');
const htmlFiles = getAllHtmlFiles(rootDir);
let criticalErrors = 0;
let warnings = 0;
const issueLog = [];

htmlFiles.forEach(file => {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');

  // Skip templates
  if (relPath.startsWith('scripts/')) return;

  const content = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(content, { decodeEntities: false });
  const fileIssues = [];

  // 1. Validate each JSON-LD script block is valid JSON
  $('script[type="application/ld+json"]').each((i, el) => {
    const rawJson = $(el).html() || '';
    if (!rawJson.trim()) {
      fileIssues.push({ type: 'CRITICAL', msg: `Empty JSON-LD script block #${i + 1}` });
      criticalErrors++;
      return;
    }
    try {
      const parsed = JSON.parse(rawJson);

      // 2. Check for @context
      if (!parsed['@context']) {
        fileIssues.push({ type: 'WARN', msg: `JSON-LD block #${i + 1} missing @context` });
        warnings++;
      }

      // 3. Check for @type or @graph
      if (!parsed['@type'] && !parsed['@graph']) {
        fileIssues.push({ type: 'WARN', msg: `JSON-LD block #${i + 1} missing @type or @graph` });
        warnings++;
      }

      // 4. FAQPage validation — ensure all questions have acceptedAnswer
      if (parsed['@type'] === 'FAQPage' && parsed.mainEntity) {
        parsed.mainEntity.forEach((q, qi) => {
          if (!q.name) {
            fileIssues.push({ type: 'CRITICAL', msg: `FAQPage: question #${qi + 1} missing 'name' field` });
            criticalErrors++;
          }
          if (!q.acceptedAnswer || !q.acceptedAnswer.text) {
            fileIssues.push({ type: 'CRITICAL', msg: `FAQPage: question #${qi + 1} missing acceptedAnswer.text` });
            criticalErrors++;
          }
        });
      }

      // 5. @graph FAQPage validation
      if (parsed['@graph']) {
        parsed['@graph'].forEach((node, ni) => {
          if (node['@type'] === 'FAQPage' && node.mainEntity) {
            node.mainEntity.forEach((q, qi) => {
              if (!q.name) {
                fileIssues.push({ type: 'CRITICAL', msg: `@graph FAQPage node #${ni + 1}: question #${qi + 1} missing name` });
                criticalErrors++;
              }
              if (!q.acceptedAnswer || !q.acceptedAnswer.text) {
                fileIssues.push({ type: 'CRITICAL', msg: `@graph FAQPage node #${ni + 1}: question #${qi + 1} missing acceptedAnswer` });
                criticalErrors++;
              }
            });
          }
        });
      }

    } catch (e) {
      fileIssues.push({ type: 'CRITICAL', msg: `Malformed JSON-LD block #${i + 1}: ${e.message}` });
      criticalErrors++;
    }
  });

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

console.log(`\n=== Schema Validation Summary ===`);
console.log(`Files checked: ${htmlFiles.length}`);
console.log(`Critical errors: ${criticalErrors}`);
console.log(`Warnings: ${warnings}`);

if (criticalErrors > 0) {
  console.error(`\n❌ Schema validation FAILED with ${criticalErrors} critical error(s). Fix before deploying.`);
  process.exit(1);
} else {
  console.log('\n✅ Schema validation passed!');
}
