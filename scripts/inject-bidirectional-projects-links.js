const fs = require('fs');
const path = require('path');
const cheerio = require('g:/SKILLNEST - IDE/node_modules/cheerio');

const ROOT = path.join(__dirname, '..');

const LINK_INJECTIONS = [
  {
    file: 'learning-paths/beginner-digital-skills/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ Explore student projects in our <a href="/projects/coding-and-games/" style="color: var(--blue-600); text-decoration: underline;">Coding & Games Projects</a>.</p>`
  },
  {
    file: 'learning-paths/intermediate-digital-skills/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ See presentations created by students: <a href="/projects/student-presentations/" style="color: var(--blue-600); text-decoration: underline;">Student Presentations Gallery</a>.</p>`
  },
  {
    file: 'learning-paths/advanced-digital-skills/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ Browse advanced final student work: <a href="/projects/portfolio-projects/" style="color: var(--blue-600); text-decoration: underline;">Portfolio Projects Showcase</a>.</p>`
  },
  {
    file: 'courses/coding/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ See coding achievements built by kids: <a href="/projects/coding-and-games/" style="color: var(--blue-600); text-decoration: underline;">Coding & Games Projects</a>.</p>`
  },
  {
    file: 'courses/ai-classes-for-students/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ View student prompt engineering works: <a href="/projects/ai-projects/" style="color: var(--blue-600); text-decoration: underline;">AI Projects Journal</a>.</p>`
  },
  {
    file: 'courses/excel-course/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ View automated spreadsheets built by students: <a href="/projects/excel-projects/" style="color: var(--blue-600); text-decoration: underline;">Excel Projects Showcase</a>.</p>`
  },
  {
    file: 'resources/ai-tools/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ View student prompt engineering works: <a href="/projects/ai-projects/" style="color: var(--blue-600); text-decoration: underline;">AI Projects Journal</a>.</p>`
  },
  {
    file: 'resources/worksheets/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ See how students format school presentations: <a href="/projects/student-presentations/" style="color: var(--blue-600); text-decoration: underline;">Student Presentations Gallery</a>.</p>`
  },
  {
    file: 'parent-hub/future-skills-guide/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ Review compiled student outcomes: <a href="/projects/portfolio-projects/" style="color: var(--blue-600); text-decoration: underline;">Portfolio Projects Gallery</a>.</p>`
  },
  {
    file: 'parent-hub/digital-parenting/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ Browse the full range of student work: <a href="/projects/" style="color: var(--blue-600); text-decoration: underline;">Student Projects Overview</a>.</p>`
  },
  {
    file: 'blog/ai-for-kids/index.html',
    select: 'article p:first-of-type, .why-card:first-child',
    html: `<p style="margin-top: 15px; font-weight: 700; font-size: 0.95rem;">🤖 Learn more about child-safe prompting outcomes in our <a href="/projects/ai-projects/" style="color: var(--blue-600); text-decoration: underline;">Student AI Projects</a> journal.</p>`
  },
  {
    file: 'blog/coding-for-kids/index.html',
    select: 'article p:first-of-type, .why-card:first-child',
    html: `<p style="margin-top: 15px; font-weight: 700; font-size: 0.95rem;">🎮 Play mini-games created by Scratch students in the <a href="/projects/coding-and-games/" style="color: var(--blue-600); text-decoration: underline;">Coding & Games Projects</a> gallery.</p>`
  },
  {
    file: 'tools/ai-prompt-generator/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ Explore ethical prompting portfolios built by kids: <a href="/projects/ai-projects/" style="color: var(--blue-600); text-decoration: underline;">Student AI Projects</a>.</p>`
  },
  {
    file: 'tools/productivity-calculator/index.html',
    select: '.why-card:first-child',
    html: `<p style="margin-top: 10px; font-weight: 700; font-size: 0.9rem;">➡️ Review student-designed automated worksheets: <a href="/projects/excel-projects/" style="color: var(--blue-600); text-decoration: underline;">Excel Projects Gallery</a>.</p>`
  }
];

console.log('=== STARTING INJECTION OF BIDIRECTIONAL PROJECTS LINKS ===');

LINK_INJECTIONS.forEach(injection => {
  const filePath = path.join(ROOT, injection.file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Target file not found (skipped): ${injection.file}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content, { decodeEntities: false });

  // Prevent duplicate injections
  if (content.includes('/projects/')) {
    console.log(`✓  Link to /projects/ already exists in: ${injection.file}`);
    return;
  }

  // Find target element
  const target = $(injection.select).first();
  if (target.length > 0) {
    target.append(injection.html);
    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log(`✅ Injected contextual project link into: ${injection.file}`);
  } else {
    // If specific target not found, fall back to appending inside the first main section or body container
    const fallbackTarget = $('main .container, .container').first();
    if (fallbackTarget.length > 0) {
      fallbackTarget.append(injection.html);
      fs.writeFileSync(filePath, $.html(), 'utf8');
      console.log(`✅ Injected contextual project link (fallback) into: ${injection.file}`);
    } else {
      console.log(`❌ Target and fallback selectors not found in: ${injection.file}`);
    }
  }
});

console.log('=== BIDIRECTIONAL PROJECTS LINKS INJECTION COMPLETE ===');
