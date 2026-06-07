/**
 * remove-empty-lines.js
 * Scans all HTML files and collapses consecutive blank lines to keep code compact and readable.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../');

function getFiles(dir, fileList = []) {
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

console.log('\n=== COLLAPSING EMPTY LINES IN HTML ===');

const allHtml = getFiles(ROOT);
let totalCleanedFiles = 0;

allHtml.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  let content = fs.readFileSync(file, 'utf8');

  // Skip redirect stubs
  if (content.length < 2000) {
    return;
  }

  // Regex to collapse 3 or more consecutive newlines (with optional whitespace) into a single blank line
  const originalLength = content.length;
  content = content.replace(/(\r?\n\s*){3,}/g, '\n\n');

  if (content.length !== originalLength) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`  ✓ Collapsed blank lines in: ${relPath}`);
    totalCleanedFiles++;
  }
});

console.log(`\n✅ Blank lines collapse complete. cleaned ${totalCleanedFiles} files.`);
