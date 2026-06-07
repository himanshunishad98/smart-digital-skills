/**
 * fix-config-placeholders.js
 *
 * CRITICAL: Replaces all CONFIG_ schema placeholders with real geo values.
 *
 * The update-schemas-from-config.js writes CONFIG_CITY / CONFIG_STATE / CONFIG_COUNTRY_CODE
 * as placeholders. This script resolves them to real values AFTER that step,
 * and also replaces CONFIG_TELEPHONE, CONFIG_EMAIL, CONFIG_BRAND_NAME, CONFIG_INSTAGRAM.
 *
 * Run: node scripts/fix-config-placeholders.js
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');

// ============================================================
// PAGE-LEVEL GEO MAPPING
// Map each filename (relative to root) to real city/state/country
// ============================================================
const PAGE_GEO_MAP = {
  // Chennai
  'ai-classes-chennai.html':               { city: 'Chennai',        state: 'Tamil Nadu',        country: 'IN' },

  // Bhilai / Bhilai Nagar / Durg / Raipur variants
  'ai-classes-in-bhilai.html':             { city: 'Bhilai',         state: 'Chhattisgarh',      country: 'IN' },
  'ai-classes-in-bhilai-nagar.html':       { city: 'Bhilai Nagar',   state: 'Chhattisgarh',      country: 'IN' },
  'ai-classes-in-durg.html':               { city: 'Durg',           state: 'Chhattisgarh',      country: 'IN' },
  'ai-classes-in-raipur.html':             { city: 'Raipur',         state: 'Chhattisgarh',      country: 'IN' },

  'coding-classes-in-bhilai.html':         { city: 'Bhilai',         state: 'Chhattisgarh',      country: 'IN' },
  'coding-classes-in-bhilai-nagar.html':   { city: 'Bhilai Nagar',   state: 'Chhattisgarh',      country: 'IN' },
  'coding-classes-in-durg.html':           { city: 'Durg',           state: 'Chhattisgarh',      country: 'IN' },
  'coding-classes-in-raipur.html':         { city: 'Raipur',         state: 'Chhattisgarh',      country: 'IN' },

  'computer-classes-in-bhilai.html':       { city: 'Bhilai',         state: 'Chhattisgarh',      country: 'IN' },
  'computer-classes-in-bhilai-nagar.html': { city: 'Bhilai Nagar',   state: 'Chhattisgarh',      country: 'IN' },
  'computer-classes-in-durg.html':         { city: 'Durg',           state: 'Chhattisgarh',      country: 'IN' },
  'computer-classes-in-raipur.html':       { city: 'Raipur',         state: 'Chhattisgarh',      country: 'IN' },

  'computer-classes-for-kids-in-bhilai.html':        { city: 'Bhilai',       state: 'Chhattisgarh', country: 'IN' },
  'computer-classes-for-kids-in-bhilai-nagar.html':  { city: 'Bhilai Nagar', state: 'Chhattisgarh', country: 'IN' },
  'computer-classes-for-kids-in-durg.html':          { city: 'Durg',         state: 'Chhattisgarh', country: 'IN' },
  'computer-classes-for-kids-in-raipur.html':        { city: 'Raipur',       state: 'Chhattisgarh', country: 'IN' },

  // Hyderabad
  'coding-classes-hyderabad.html':         { city: 'Hyderabad',      state: 'Telangana',         country: 'IN' },

  // Major metro cities
  'computer-classes-bangalore.html':       { city: 'Bengaluru',      state: 'Karnataka',         country: 'IN' },
  'computer-classes-bhopal.html':          { city: 'Bhopal',         state: 'Madhya Pradesh',    country: 'IN' },
  'computer-classes-delhi.html':           { city: 'Delhi',          state: 'Delhi',             country: 'IN' },
  'computer-classes-indore.html':          { city: 'Indore',         state: 'Madhya Pradesh',    country: 'IN' },
  'computer-classes-mumbai.html':          { city: 'Mumbai',         state: 'Maharashtra',       country: 'IN' },
  'computer-classes-pune.html':            { city: 'Pune',           state: 'Maharashtra',       country: 'IN' },
  'digital-skills-kolkata.html':           { city: 'Kolkata',        state: 'West Bengal',       country: 'IN' },

  // Near-me / generic
  'ai-coding-classes-near-me.html':        { city: 'Bhilai Nagar',   state: 'Chhattisgarh',      country: 'IN' },
};

// ============================================================
// GLOBAL CONSTANTS to fill remaining CONFIG_ tokens
// ============================================================
const BRAND_NAME_ALT = 'Smart Digital Skills';
const INSTAGRAM_URL  = 'https://instagram.com/skillnest.co.in';
const EMAIL          = 'support@skillnest.co.in';
const TELEPHONE      = '+91 8827731006';

// ============================================================
// PROCESS FILES
// ============================================================
console.log('=== FIX-CONFIG-PLACEHOLDERS: Resolving all CONFIG_ tokens ===\n');
let totalFixed = 0;
let noGeoCount = 0;

function getAllHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) getAllHtmlFiles(fullPath, files);
    else if (entry.name.endsWith('.html')) files.push(fullPath);
  }
  return files;
}

const allHtmlFiles = getAllHtmlFiles(rootDir);

allHtmlFiles.forEach(filePath => {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Only process if any CONFIG_ token present
  if (!content.includes('CONFIG_')) return;

  const filename = path.basename(filePath);
  const geo = PAGE_GEO_MAP[filename];

  const hasGeoPlaceholders = content.includes('CONFIG_CITY') || content.includes('CONFIG_STATE') || content.includes('CONFIG_COUNTRY_CODE');

  if (hasGeoPlaceholders) {
    if (geo) {
      content = content.replace(/CONFIG_CITY/g, geo.city);
      content = content.replace(/CONFIG_STATE/g, geo.state);
      content = content.replace(/CONFIG_COUNTRY_CODE/g, geo.country);
    } else {
      // File has geo placeholders but no geo mapping — log it
      noGeoCount++;
      console.warn(`  ⚠️  No geo mapping for: ${relPath} (has CONFIG_CITY/STATE/COUNTRY_CODE tokens)`);
    }
  }

  // Fill remaining global CONFIG_ tokens
  content = content.replace(/CONFIG_TELEPHONE/g, TELEPHONE);
  content = content.replace(/CONFIG_EMAIL/g, EMAIL);
  content = content.replace(/CONFIG_BRAND_NAME/g, BRAND_NAME_ALT);
  content = content.replace(/CONFIG_INSTAGRAM/g, INSTAGRAM_URL);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFixed++;
    console.log(`  ✅ Resolved CONFIG_ in: ${relPath}${geo ? ` → ${geo.city}, ${geo.state}` : ''}`);
  }
});

console.log(`\n=== CONFIG PLACEHOLDER RESOLUTION SUMMARY ===`);
console.log(`Files fixed: ${totalFixed}`);
console.log(`Files with unmapped CONFIG_ geo: ${noGeoCount}`);

if (noGeoCount > 0) {
  console.error(`\n❌ ${noGeoCount} file(s) still have unmapped CONFIG_ placeholders. Add them to PAGE_GEO_MAP.`);
  process.exit(1);
} else {
  console.log('\n✅ All CONFIG_ placeholders resolved successfully.');
}
