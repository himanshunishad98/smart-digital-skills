/**
 * update-schemas-from-config.js
 * Enforces dynamic schema templates across all HTML files.
 * Replaces hardcoded phone, email, and location details in JSON-LD schemas
 * with clean template placeholders (e.g. CONFIG_TELEPHONE, CONFIG_EMAIL)
 * so that no static hardcoded contact/location values ever reside inside the HTML source files.
 * Run: node scripts/update-schemas-from-config.js
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function getAllHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllHtmlFiles(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getAllHtmlFiles(root);
let updatedCount = 0;

console.log(`=== ENFORCING SCHEMA TEMPLATE PLACEHOLDERS IN STATIC FILES ===`);

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Locate all <script type="application/ld+json"> blocks and convert hardcoded details into template placeholders
  content = content.replace(/(<script\s+type="application\/ld\+json">[\s\S]*?<\/script>)/g, (match) => {
    let block = match;

    // Convert telephone to template placeholder
    block = block.replace(/"telephone"\s*:\s*"[^"]*"/g, `"telephone": "CONFIG_TELEPHONE"`);

    // Convert email to template placeholder
    block = block.replace(/"email"\s*:\s*"[^"]*"/g, `"email": "CONFIG_EMAIL"`);

    // NOTE: addressLocality / addressRegion / addressCountry are NOT replaced here.
    // Their values are set by city-specific generators (generate-*.js) and must remain
    // as real values in production HTML. Replacing them with CONFIG_ causes GEO leakage.

    // Convert alternate brand names to template placeholders
    block = block.replace(/"alternateName"\s*:\s*"[^"]*"/g, `"alternateName": "CONFIG_BRAND_NAME"`);

    // Convert sameAs Instagram links to template placeholders
    block = block.replace(/"https:\/\/instagram\.com\/[^"]*"/g, `"CONFIG_INSTAGRAM"`);

    return block;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`TEMPLATED SCHEMAS IN: ${path.relative(root, file).replace(/\\/g, '/')}`);
  }
}

console.log(`\nFinished. Enforced template placeholders in ${updatedCount} files.`);
console.log(`=== SCHEMA TEMPLATE ENFORCEMENT COMPLETE ===`);
