/**
 * cleanup-duplicates.js
 * Scans all HTML files and removes duplicate <link> and <script> tags from the head.
 * Resolves HTML bloat and ensures correct stylesheet rendering.
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

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

console.log('\n=== CLEANING HTML HEAD DUPLICATIONS ===');

const allHtml = getFiles(ROOT);
let totalCleanedFiles = 0;

allHtml.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  let content = fs.readFileSync(file, 'utf8');

  // Skip redirect stubs
  if (content.length < 2000) {
    return;
  }

  const $ = cheerio.load(content, { decodeEntities: false });
  let changed = false;

  // 1. Clean duplicate <link> tags
  const seenLinks = new Set();
  $('link').each((i, el) => {
    const rel = $(el).attr('rel') || '';
    const href = $(el).attr('href') || '';
    const asAttr = $(el).attr('as') || '';
    const key = `${rel.trim().toLowerCase()}|${href.trim().toLowerCase()}|${asAttr.trim().toLowerCase()}`;
    
    if (seenLinks.has(key)) {
      $(el).remove();
      changed = true;
    } else {
      seenLinks.add(key);
    }
  });

  // 2. Clean duplicate <script src="..."> tags
  const seenScripts = new Set();
  $('script').each((i, el) => {
    const src = $(el).attr('src');
    const inlineText = $(el).html() || '';
    const key = src ? `src|${src.trim().toLowerCase()}` : `inline|${inlineText.trim()}`;
    
    // Only remove duplicate script tags if they are exact duplicates
    if (key && seenScripts.has(key)) {
      $(el).remove();
      changed = true;
    } else if (key) {
      seenScripts.add(key);
    }
  });

  // 3. Clean duplicate <meta> tags
  const seenMetas = new Set();
  $('meta').each((i, el) => {
    const name = $(el).attr('name') || '';
    const prop = $(el).attr('property') || '';
    const charset = $(el).attr('charset') || '';
    const httpEquiv = $(el).attr('http-equiv') || '';
    const key = `${name.trim().toLowerCase()}|${prop.trim().toLowerCase()}|${charset.trim().toLowerCase()}|${httpEquiv.trim().toLowerCase()}`;
    
    if (key && key !== '|||' && seenMetas.has(key)) {
      $(el).remove();
      changed = true;
    } else if (key && key !== '|||') {
      seenMetas.add(key);
    }
  });

  if (changed) {
    fs.writeFileSync(file, $.html(), 'utf8');
    console.log(`  ✓ Cleaned duplicates in: ${relPath}`);
    totalCleanedFiles++;
  }
});

console.log(`\n✅ Head cleanup complete. cleaned ${totalCleanedFiles} files.`);
