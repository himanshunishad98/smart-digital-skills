/**
 * SkillNest Internal Linking & Orphan Pages Fixer
 * 1. Adds a premium, SEO-optimized "Locations We Serve" block to all root-level HTML files' footers.
 * 2. Links city root pages (e.g. cities/bhopal/index.html) to their specific course-city subpages (e.g. cities/bhopal/ai-classes/).
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = path.join(__dirname, '..');

// ── 1. Update City Root Pages with Links to Their Course Pages ───────────────────
console.log('\n--- Connecting City Root Pages to Course-City Pages ---');
const courseCityData = JSON.parse(fs.readFileSync(path.join(__dirname, 'course-city-metadata.json'), 'utf8'));

// Group course-city pages by cityId
const cityCourses = {};
courseCityData.forEach(item => {
  if (!cityCourses[item.cityId]) {
    cityCourses[item.cityId] = [];
  }
  cityCourses[item.cityId].push(item);
});

Object.entries(cityCourses).forEach(([cityId, courses]) => {
  const cityIdxPath = path.join(ROOT, 'cities', cityId, 'index.html');
  if (!fs.existsSync(cityIdxPath)) {
    console.log(`⚠️  Warning: City root index not found at ${cityIdxPath}`);
    return;
  }

  let content = fs.readFileSync(cityIdxPath, 'utf8');
  const $ = cheerio.load(content);

  // Check if we already injected a local course specialized links block
  if ($('.local-courses-block').length > 0) {
    console.log(`✓  ${cityId}/index.html already has local courses block.`);
    return;
  }

  // Create local course links HTML
  const courseLinks = courses.map(c => `
    <a href="/cities/${c.cityId}/${c.courseId}/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(37, 99, 235, 0.08); color: var(--blue-600); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 100px; padding: 10px 22px; font-weight: 700; text-decoration: none; font-size: 0.95rem; transition: all 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.background='var(--blue-600)'; this.style.color='#fff';" onmouseout="this.style.background='rgba(37, 99, 235, 0.08)'; this.style.color='var(--blue-600)';">
      🎓 ${c.courseName} in ${c.cityName} →
    </a>
  `).join('\n');

  const localCoursesHtml = `
  <!-- local-courses-block -->
  <div class="local-courses-block" style="margin-top: 30px; padding: 25px; background: var(--blue-50); border: 1px solid var(--blue-100); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
    <h3 style="font-family: 'Sora', sans-serif; color: var(--blue-900); font-weight: 800; font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
      <span>📍</span> Specialized Local Programs in ${courses[0].cityName}
    </h3>
    <p style="font-size: 0.92rem; color: var(--gray-600); margin-bottom: 18px; line-height: 1.5;">
      In addition to our general digital foundation, we run specialized batches with localized syllabus and hands-on projects:
    </p>
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      ${courseLinks}
    </div>
  </div>
  `;

  // Inject this block into the "Core Courses" article/card in the Explore Hub or near it
  const coreCoursesHeader = $('h3:contains("Core Courses")');
  if (coreCoursesHeader.length > 0) {
    coreCoursesHeader.closest('article').append(localCoursesHtml);
    fs.writeFileSync(cityIdxPath, $.html(), 'utf8');
    console.log(`✅ Linked specialized courses inside ${cityId}/index.html`);
  } else {
    // Fallback: append inside explore-hub container
    const exploreHub = $('.explore-hub .container');
    if (exploreHub.length > 0) {
      exploreHub.append(localCoursesHtml);
      fs.writeFileSync(cityIdxPath, $.html(), 'utf8');
      console.log(`✅ Linked specialized courses (fallback) inside ${cityId}/index.html`);
    } else {
      console.log(`❌ Failed to inject local courses block for ${cityId}/index.html`);
    }
  }
});

// ── 2. Add "Locations We Serve" to All Root Pages' Footers ─────────────────────
console.log('\n--- Adding Locations Footer to Root-Level HTML Files ---');

const CITIES_LIST = [
  { id: 'lucknow', name: 'Lucknow' },
  { id: 'jaipur', name: 'Jaipur' },
  { id: 'nagpur', name: 'Nagpur' },
  { id: 'bhopal', name: 'Bhopal' },
  { id: 'surat', name: 'Surat' },
  { id: 'patna', name: 'Patna' },
  { id: 'indore', name: 'Indore' },
  { id: 'varanasi', name: 'Varanasi' },
  { id: 'ranchi', name: 'Ranchi' },
  { id: 'coimbatore', name: 'Coimbatore' },
  { id: 'bhubaneswar', name: 'Bhubaneswar' },
  { id: 'kochi', name: 'Kochi' },
  { id: 'mysuru', name: 'Mysuru' },
  { id: 'vadodara', name: 'Vadodara' },
  { id: 'visakhapatnam', name: 'Visakhapatnam' },
  { id: 'chandigarh', name: 'Chandigarh' },
  { id: 'agra', name: 'Agra' },
  { id: 'meerut', name: 'Meerut' },
  { id: 'bareilly', name: 'Bareilly' },
  { id: 'aligarh', name: 'Aligarh' },
  { id: 'bilaspur', name: 'Bilaspur' },
  { id: 'thiruvananthapuram', name: 'Trivandrum' },
];

const rootHtmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && f !== 'summer-course.html');

const cityLinksHtml = CITIES_LIST.map(c => 
  `<a href="/cities/${c.id}/" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.85rem; font-weight: 600; margin-right: 12px; display: inline-block; transition: color 0.2s;" onmouseover="this.style.color='var(--yellow-400)';" onmouseout="this.style.color='rgba(255,255,255,0.7)';">${c.name}</a>`
).join('<span style="color: rgba(255,255,255,0.2); margin-right: 12px;">|</span>\n          ');

const localLandingLinksHtml = `
          <!-- Coding classes cluster -->
          <div style="margin-bottom: 8px;">
            <strong style="color: var(--yellow-300); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; width: 140px;">Coding Classes:</strong>
            <a href="/coding-classes-in-bhilai.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Bhilai</a> |
            <a href="/coding-classes-in-bhilai-nagar.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Bhilai Nagar</a> |
            <a href="/coding-classes-in-durg.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Durg</a> |
            <a href="/coding-classes-in-raipur.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem;">Raipur</a>
          </div>
          <!-- AI classes cluster -->
          <div style="margin-bottom: 8px;">
            <strong style="color: var(--yellow-300); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; width: 140px;">AI Classes:</strong>
            <a href="/ai-classes-in-bhilai.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Bhilai</a> |
            <a href="/ai-classes-in-bhilai-nagar.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Bhilai Nagar</a> |
            <a href="/ai-classes-in-durg.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Durg</a> |
            <a href="/ai-classes-in-raipur.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem;">Raipur</a>
          </div>
          <!-- Computer classes cluster -->
          <div>
            <strong style="color: var(--yellow-300); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; width: 140px;">Computer Classes:</strong>
            <a href="/computer-classes-in-bhilai.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Bhilai</a> |
            <a href="/computer-classes-in-bhilai-nagar.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Bhilai Nagar</a> |
            <a href="/computer-classes-in-durg.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Durg</a> |
            <a href="/computer-classes-in-raipur.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Raipur</a> |
            <a href="/computer-classes-for-kids-in-bhilai.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Kids Bhilai</a> |
            <a href="/computer-classes-for-kids-in-bhilai-nagar.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Kids Bhilai Nagar</a> |
            <a href="/computer-classes-for-kids-in-durg.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 10px;">Kids Durg</a> |
            <a href="/computer-classes-for-kids-in-raipur.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem;">Kids Raipur</a>
          </div>
`;

const locationsFooterHtml = `
  <!-- locations-serve-footer-panel -->
  <div class="locations-serve-footer-panel" style="padding-top: 25px; margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: left;">
    <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
      <div>
        <h3 style="font-family: 'Sora', sans-serif; color: #fff; font-size: 0.95rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
          <span>📍</span> Operating Cities & Learning Hubs
        </h3>
        <div style="line-height: 2;">
          ${cityLinksHtml}
        </div>
      </div>
      <div style="padding-top: 15px; border-top: 1px dashed rgba(255,255,255,0.08);">
        <h3 style="font-family: 'Sora', sans-serif; color: #fff; font-size: 0.95rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
          <span>🚀</span> AI & Coding Classes Near Me (Major Hubs)
        </h3>
        <div style="line-height: 1.8; color: rgba(255,255,255,0.5);">
          <a href="/ai-coding-classes-near-me.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 12px; font-weight: bold; display: inline-block;">AI & Coding Near Me</a> <span style="color: rgba(255,255,255,0.25)">|</span>
          <a href="/computer-classes-bangalore.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 12px; display: inline-block;">Bengaluru</a> <span style="color: rgba(255,255,255,0.25)">|</span>
          <a href="/computer-classes-mumbai.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 12px; display: inline-block;">Mumbai</a> <span style="color: rgba(255,255,255,0.25)">|</span>
          <a href="/computer-classes-delhi.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 12px; display: inline-block;">Delhi NCR</a> <span style="color: rgba(255,255,255,0.25)">|</span>
          <a href="/computer-classes-pune.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 12px; display: inline-block;">Pune</a> <span style="color: rgba(255,255,255,0.25)">|</span>
          <a href="/coding-classes-hyderabad.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 12px; display: inline-block;">Hyderabad</a> <span style="color: rgba(255,255,255,0.25)">|</span>
          <a href="/ai-classes-chennai.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 12px; display: inline-block;">Chennai</a> <span style="color: rgba(255,255,255,0.25)">|</span>
          <a href="/digital-skills-kolkata.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 12px; display: inline-block;">Kolkata</a> <span style="color: rgba(255,255,255,0.25)">|</span>
          <a href="/computer-classes-bhopal.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; margin-right: 12px; display: inline-block;">Bhopal</a> <span style="color: rgba(255,255,255,0.25)">|</span>
          <a href="/computer-classes-indore.html" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.82rem; display: inline-block;">Indore</a>
        </div>
      </div>
      <div style="padding-top: 15px; border-top: 1px dashed rgba(255,255,255,0.08);">
        <h3 style="font-family: 'Sora', sans-serif; color: #fff; font-size: 0.95rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
          <span>✨</span> Local specialized Batches (Bhilai, Durg & Raipur)
        </h3>
        <div style="line-height: 1.8; color: rgba(255,255,255,0.5);">
          ${localLandingLinksHtml}
        </div>
      </div>
    </div>
  </div>
`;

rootHtmlFiles.forEach(file => {
  const filePath = path.join(ROOT, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content);

  // Remove existing locations footer panel if it exists, to allow clean updates
  if ($('.locations-serve-footer-panel').length > 0) {
    $('.locations-serve-footer-panel').remove();
  }

  // Inject locationsFooterHtml before the footer bottom copyright info or inside the footer container
  const footerContainer = $('footer .container');
  if (footerContainer.length > 0) {
    // Append inside footerContainer, just before footer-bottom or divider
    const footerBottom = footerContainer.find('.footer-bottom');
    if (footerBottom.length > 0) {
      footerBottom.before(locationsFooterHtml);
    } else {
      footerContainer.append(locationsFooterHtml);
    }
    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log(`✅ Injected/Updated locations footer panel in ${file}`);
  } else {
    console.log(`❌ Failed to find footer container in ${file}`);
  }
});

console.log('\n--- Internal Linking & Orphan Pages Fix Process Finished successfully! ---');
