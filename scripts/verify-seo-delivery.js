const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

console.log('=== SEO QA & VERIFICATION START ===\n');

// 1. Check sitemaps
const sitemaps = [
  'sitemap.xml',
  'sitemap-main.xml',
  'sitemap-cities.xml'
];

sitemaps.forEach(file => {
  const p = path.join(__dirname, '../', file);
  if (!fs.existsSync(p)) {
    console.error(`❌ Missing sitemap: ${file}`);
    process.exit(1);
  }
  try {
    const content = fs.readFileSync(p, 'utf8');
    const $ = cheerio.load(content, { xmlMode: true });
    const errors = [];
    if (file === 'sitemap.xml' || file === 'sitemap-index.xml') {
      const sitemapsCount = $('sitemap').length;
      if (sitemapsCount === 0) errors.push('No <sitemap> tags found in index.');
    } else {
      const urlsCount = $('url').length;
      if (urlsCount === 0) errors.push('No <url> tags found.');
    }
    if (errors.length > 0) {
      console.error(`❌ Sitemap ${file} validation failed:`, errors);
      process.exit(1);
    }
    console.log(`✅ Sitemap ${file} is valid. (${file === 'sitemap.xml' || file === 'sitemap-index.xml' ? $('sitemap').length + ' entries' : $('url').length + ' entries'})`);
  } catch (e) {
    console.error(`❌ Sitemap ${file} failed to parse:`, e.message);
    process.exit(1);
  }
});

// Verification of individual city pages and course-city pages is skipped 
// since their generation is disabled in generate-cities.js.

console.log('\n=== ALL QA CHECKS PASSED ===');
