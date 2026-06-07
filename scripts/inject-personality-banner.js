/**
 * inject-personality-banner.js
 * Programmatically injects the static Personality Test banner HTML
 * immediately after the hero section (or breadcrumb bar) in target pages.
 * Fully idempotent.
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = path.join(__dirname, '../');

// Banner HTML structure
// NOTE: Emoji are written as HTML numeric character references (&#xNNNNN;)
// to prevent cheerio's $.html() from corrupting multi-byte UTF-8 sequences.
const BANNER_HTML = `
<!-- Personality Test Banner -->
<section id="ptBanner" class="pt-banner" aria-label="Free Personality Test">
  <div class="pt-inner">
    <div class="pt-content">
      <div class="pt-badge-row">
        <span class="pt-tag"><span class="pt-dot"></span>100% Free &amp; Instant</span>
        <span class="pt-tag pt-tag-new">&#x2728; New</span>
      </div>
      <h2 class="pt-title">&#x1F9E0; Discover Your <span class="pt-hl">Personality Type</span></h2>
      <p class="pt-sub">Take India's most practical HEXACO personality assessment &#x2014; 100 science-backed questions designed for students. Understand your strengths, learning style &amp; career fit in minutes.</p>
      <div class="pt-chips">
        <span class="pt-chip">&#x1F52C; Science-Based</span>
        <span class="pt-chip">&#x23F1;&#xFE0F; ~10 Minutes</span>
        <span class="pt-chip">&#x1F4CA; Instant Results</span>
        <span class="pt-chip">&#x1F512; 100% Private</span>
        <span class="pt-chip">&#x1F393; For Students</span>
      </div>
      <div class="pt-cta-row">
        <a href="/tools/personality-test/" class="pt-cta" id="ptBannerCta">Take Free Personality Test &#x2192;</a>
        <span class="pt-note">No sign-up required</span>
      </div>
    </div>
    <div class="pt-cards">
      <div class="pt-card">
        <div class="pt-card-icon">&#x1F3AF;</div>
        <div class="pt-card-title">Know Your Strengths</div>
        <div class="pt-card-desc">Uncover your natural talents and how to apply them in studies &amp; career.</div>
      </div>
      <div class="pt-card">
        <div class="pt-card-icon">&#x1F4DA;</div>
        <div class="pt-card-title">Better Learning Style</div>
        <div class="pt-card-desc">Understand how you learn best and maximise your academic performance.</div>
      </div>
      <div class="pt-card">
        <div class="pt-card-icon">&#x1F680;</div>
        <div class="pt-card-title">Career Clarity</div>
        <div class="pt-card-desc">Get insights into which fields and roles suit your personality profile.</div>
      </div>
    </div>
  </div>
</section>
`;

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Exclude system/build/sub-app folders
      if (['node_modules', '.git', 'css', 'js', 'assets', 'scripts', 'Personality Test', 'tools', 'archive', 'backup-original-structure'].includes(file)) {
        return;
      }
      getFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

console.log('\n=== INJECTING STATIC PERSONALITY TEST BANNERS ===');

const htmlFiles = getFiles(ROOT);
let modifiedCount = 0;

htmlFiles.forEach(filePath => {
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip tiny redirect stubs
  if (content.length < 2000) {
    return;
  }

  const $ = cheerio.load(content, { decodeEntities: false });
  
  // Find injection targets in priority order
  let hero = $('section.hero');
  if (!hero.length) {
    hero = $('section.page-hero');
  }
  if (!hero.length) {
    hero = $('.res-breadcrumb-bar');
  }

  // If no target is found, it's a form/utility page (like demo.html, refund-policy.html) -> skip
  if (!hero.length) {
    return;
  }

  // Idempotency: remove existing ptBanner if already present
  const existing = $('#ptBanner');
  if (existing.length) {
    existing.remove();
  }
  // Also clean up comment markers or class instances to be thorough
  $('.pt-banner').remove();
  
  // Clean up any remaining "Personality Test Banner" comment nodes to prevent duplication
  $('*').contents().filter((i, el) => el.type === 'comment' && el.data && el.data.trim() === 'Personality Test Banner').remove();
  $.root().contents().filter((i, el) => el.type === 'comment' && el.data && el.data.trim() === 'Personality Test Banner').remove();

  // If target is breadcrumb-bar, we insert after the breadcrumb bar's parent sibling
  // matching the dynamic nav-inject.js insertion logic
  let insertTarget = hero;
  if (hero.hasClass('res-breadcrumb-bar')) {
    const pageHero = $('section.page-hero');
    if (pageHero.length) {
      insertTarget = pageHero;
    }
  }

  // Insert the banner immediately after the target
  insertTarget.after(BANNER_HTML);

  // Write back to file — use Buffer to ensure UTF-8 BOM-free output
  const output = $.html();
  fs.writeFileSync(filePath, Buffer.from(output, 'utf8'));
  console.log(`  ✓ Banner injected into: ${relPath}`);
  modifiedCount++;
});

console.log(`\n✅ Static injection complete. ${modifiedCount} files updated.`);
