/**
 * fix-fallback-script-paths.js
 *
 * Updates all city pages and static root pages (except index.html which was already fixed)
 * to replace any inline fallback scripts with the external deferred fallback script
 * at the correct depth-relative path.
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

console.log('=== FIXING FALLBACK SCRIPT PATHS IN ALL HTML FILES ===');
const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`Found ${htmlFiles.length} HTML files.`);

let fixedCount = 0;
let alreadyCorrectCount = 0;
let skippedCount = 0;

htmlFiles.forEach(file => {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');

  // Skip template files  
  if (relPath.startsWith('scripts/templates/')) {
    skippedCount++;
    return;
  }

  const content = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(content, { decodeEntities: false });

  // Calculate depth-based relative path to assets/js/fallback.js
  const depth = relPath.split('/').length - 1;
  const prefix = depth === 0 ? '' : '../'.repeat(depth);
  const expectedSrc = `${prefix}assets/js/fallback.js`;

  // Check for existing fallback script (either inline or external)
  const existingFallbackExternal = $('script#file-protocol-fallback');
  const existingFallbackInline = $('head script').filter((i, el) => {
    return ($(el).html() || '').includes('Local File Protocol Fallback');
  });

  if (existingFallbackExternal.length && existingFallbackExternal.attr('src') === expectedSrc && existingFallbackExternal.attr('defer') === undefined) {
    alreadyCorrectCount++;
    return;
  }

  // Remove any inline fallback scripts
  existingFallbackInline.remove();

  // Remove any existing external fallback script (may be wrong path or has defer attribute)
  existingFallbackExternal.remove();

  // Inject the corrected external fallback script as the FIRST element in head
  const headElement = $('head');
  headElement.prepend(`\n<script src="${expectedSrc}" id="file-protocol-fallback"></script>\n`);

  fs.writeFileSync(file, $.html(), 'utf8');
  fixedCount++;
  console.log(`  ✅ Fixed: ${relPath} (src="${expectedSrc}")`);
});

console.log(`\n=== FALLBACK SCRIPT PATH FIX SUMMARY ===`);
console.log(`Already correct: ${alreadyCorrectCount}`);
console.log(`Fixed: ${fixedCount}`);
console.log(`Skipped: ${skippedCount}`);
console.log('=== COMPLETE ===');
