/**
 * cleanup-comments.js
 * Scans all HTML files and removes duplicate/consecutive <!-- Personality Test Banner --> comments.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../');

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (['node_modules', '.git', 'scripts'].includes(file)) {
        return;
      }
      getFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

console.log('\n=== CLEANING DUPLICATE PERSONALITY TEST BANNER COMMENTS ===');

const allHtml = getFiles(ROOT);
let totalCleanedFiles = 0;

allHtml.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  let content = fs.readFileSync(file, 'utf8');

  // Skip redirect stubs
  if (content.length < 2000) {
    return;
  }

  const originalLength = content.length;
  
  // Collapse any consecutive occurrences of the comments (with arbitrary whitespace/newlines between them)
  // to a single occurrence.
  content = content.replace(/(<!--\s*Personality Test Banner\s*-->[\s\r\n]*){2,}/gi, '<!-- Personality Test Banner -->\n');
  content = content.replace(/(<!--\s*GEO & AEO GLOBAL TRUST BLOCK \(Visually Hidden, Crawlable\)\s*-->[\s\r\n]*){2,}/gi, '<!-- GEO & AEO GLOBAL TRUST BLOCK (Visually Hidden, Crawlable) -->\n');
  content = content.replace(/(<!--\s*GEO & AEO LOCALIZED TRUST BLOCK \(Visually Hidden, Crawlable\)\s*-->[\s\r\n]*){2,}/gi, '<!-- GEO & AEO LOCALIZED TRUST BLOCK (Visually Hidden, Crawlable) -->\n');

  if (content.length !== originalLength) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`  ✓ Cleaned duplicate comments in: ${relPath}`);
    totalCleanedFiles++;
  }
});

console.log(`\n✅ Comment cleanup complete. Cleaned ${totalCleanedFiles} files.`);
