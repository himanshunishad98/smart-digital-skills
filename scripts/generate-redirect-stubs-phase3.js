/**
 * generate-redirect-stubs-phase3.js
 * Programmatically generates physical directory redirect stubs for clean dropdown paths.
 * Resolves offline preview navigation issues on file:// protocol.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../');

const MAPPINGS = {
  // Main Categories
  '/programs/': '/programs/summer-camp/',
  '/courses/': '/courses/computer/',
  '/age-groups/': '/',
  '/resources/': '/resources/cbse-resources/ncert-books/',
  '/parent-hub/': '/parent-hub/testimonials/',
  '/contact/': '/contact/demo/',

  // Programs Dropdown
  '/programs/digital-skills-foundation/': '/courses/digital-skills-classes-for-kids/',
  '/programs/ai-skills-for-students/': '/courses/ai-classes-for-school-students/',
  '/programs/coding/': '/courses/coding-classes-for-kids-india/',
  '/programs/typing-productivity/': '/courses/computer-classes-for-teenagers/',
  '/programs/cyber-safety/': '/courses/computer-classes-for-teenagers/',
  '/programs/smart-internet-skills/': '/courses/computer-classes-for-teenagers/',
  '/programs/canva-design/': '/courses/digital-skills-classes-for-kids/',
  '/programs/excel-for-students/': '/blog/excel-for-students/',
  '/programs/presentation-skills/': '/courses/digital-skills-classes-for-kids/',
  '/programs/productivity-tools/': '/courses/computer/',

  // Courses Dropdown
  '/courses/ai-classes-for-kids/': '/courses/ai-classes-for-school-students/',
  '/courses/coding-course/': '/courses/coding/',
  '/courses/scratch-coding-course/': '/courses/coding/',
  '/courses/typing-course/': '/courses/computer-classes-for-teenagers/',
  '/courses/computer-basics/': '/courses/computer/',
  '/courses/cyber-safety-course/': '/courses/computer-classes-for-teenagers/',
  '/courses/ai-tools-for-students/': '/courses/ai-classes-for-students/',
  '/courses/excel-course/': '/blog/excel-for-students/',
  '/courses/powerpoint-course/': '/courses/computer/',
  '/courses/digital-skills-program/': '/courses/digital-skills-classes-for-kids/',
  '/courses/summer-course/': '/programs/summer-camp/',
  '/courses/stem-program/': '/courses/coding/',

  // Resources Dropdown
  '/resources/ai-tools/': '/tools/personality-test/',
  '/resources/typing-practice/': '/courses/computer/',
  '/resources/worksheets/': '/resources/cbse-resources/ncert-books/',
  '/resources/parent-guides/': '/parent-hub/testimonials/',
  '/resources/cyber-safety-guide/': '/blog/screen-time/',
  '/resources/free-mini-courses/': '/courses/',
  '/resources/ai-prompt-guide/': '/blog/ai-for-kids/',
  '/resources/templates/': '/resources/cbse-resources/ncert-books/',

  // Parent Hub Dropdown
  '/parent-hub/screen-time-guide/': '/blog/screen-time/',
  '/parent-hub/ai-safety-for-kids/': '/blog/ai-for-kids/',
  '/parent-hub/digital-parenting/': '/parent-hub/testimonials/',
  '/parent-hub/internet-safety/': '/blog/digital-education-jk/',
  '/parent-hub/future-skills-guide/': '/blog/skills-schools-miss/',
  '/parent-hub/learning-tips/': '/blog/ai-learning-punjab/',

  // Schools Dropdown
  '/schools/workshops/': '/schools/',
  '/schools/school-programs/': '/schools/',
  '/schools/partner-with-us/': '/schools/',
  '/schools/csr-programs/': '/schools/',
  '/schools/school-partnerships/': '/schools/',
  '/schools/principal-pitch/': '/schools/',
  '/compare/skillnest-vs-traditional-classes/': '/compare/skillnest-vs-traditional-computer-classes/'
};

function getDepthAndPrefix(cleanUrl) {
  const segments = cleanUrl.split('/').filter(Boolean);
  const depth = segments.length;
  let prefix = '';
  for (let i = 0; i < depth; i++) {
    prefix += '../';
  }
  return { depth, prefix };
}

function makeRedirectHtml(target, depth, prefix) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<script src="${prefix}assets/js/fallback.js" defer="" id="file-protocol-fallback" data-depth="${depth}"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="utf-8">
<title>Redirecting… | SkillNest</title>
<link rel="canonical" href="https://skillnest.co.in${target}">
<meta http-equiv="refresh" content="0; url=https://skillnest.co.in${target}">
<meta name="robots" content="noindex, follow">
<script>window.location.replace("${target}");</script>
<meta name="theme-color" content="#1e40af">
</head>
<body>
<main>
<h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;">Redirecting… | <span class="brand-name">SkillNest</span></h1>
<p>This page has moved. <a href="${target}">Click here</a> if you are not redirected automatically.</p>
</main>
</body>
</html>`;
}

console.log('=== STARTING GENERATION OF PHASE 3 REDIRECT STUBS ===');

const redirectMapPath = path.join(ROOT, 'redirect-map.json');
let redirectMap = {};
if (fs.existsSync(redirectMapPath)) {
  try {
    redirectMap = JSON.parse(fs.readFileSync(redirectMapPath, 'utf8'));
  } catch(e) {
    console.warn(`Could not parse existing redirect-map.json: ${e.message}`);
  }
}

let generatedCount = 0;

for (const [cleanUrl, target] of Object.entries(MAPPINGS)) {
  // Determine relative physical folder path
  const folderRelPath = cleanUrl.slice(1); // remove leading slash
  const folderAbsPath = path.join(ROOT, folderRelPath);

  // If a physical content folder/page already exists at this location (e.g. index.html) and is NOT a redirect, skip it
  const indexHtmlPath = path.join(folderAbsPath, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    const existingContent = fs.readFileSync(indexHtmlPath, 'utf8');
    if (existingContent.length > 2000 && !existingContent.includes('http-equiv="refresh"')) {
      console.log(`Skipping existing content page: ${cleanUrl}`);
      continue;
    }
  }

  // Create folder directory if it doesn't exist
  if (!fs.existsSync(folderAbsPath)) {
    fs.mkdirSync(folderAbsPath, { recursive: true });
  }

  // Determine prefix depth
  const { depth, prefix } = getDepthAndPrefix(cleanUrl);

  // Create redirect HTML stub
  const stubHtml = makeRedirectHtml(target, depth, prefix);
  fs.writeFileSync(indexHtmlPath, stubHtml, 'utf8');
  console.log(`✓ Generated Redirect Stub: ${cleanUrl} -> ${target} (depth: ${depth})`);

  // Record mapping
  redirectMap[cleanUrl] = target;
  generatedCount++;
}

// Write the updated redirects mapping
fs.writeFileSync(redirectMapPath, JSON.stringify(redirectMap, null, 2), 'utf8');
console.log(`\nSuccessfully updated redirect-map.json with clean dropdown redirects.`);
console.log(`Successfully generated ${generatedCount} redirect stub folders.`);
console.log('=== PHASE 3 REDIRECT STUBS GENERATION COMPLETE ===');
