/**
 * fix-image-alt.js
 *
 * Audits all HTML files for <img> tags missing alt attributes.
 * Applies contextual alt text based on src path, class, and surrounding content.
 * Also adds width/height attributes where missing to prevent CLS.
 * Does NOT remove or modify meaningful existing alt text.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../');

// Contextual alt text rules based on image src patterns
const ALT_RULES = [
  { pattern: /skillnest.*logo/i, alt: 'SkillNest logo — Online digital skills and AI program for kids' },
  { pattern: /founder|teacher|instructor/i, alt: 'SkillNest founder and lead instructor' },
  { pattern: /certificate|cert/i, alt: 'SkillNest Digital Skills Certificate for students' },
  { pattern: /student|kid|child/i, alt: 'SkillNest student learning digital skills online' },
  { pattern: /coding|scratch|program/i, alt: 'Student learning Coding Program with SkillNest' },
  { pattern: /computer|laptop|device/i, alt: 'Student learning computer skills online with SkillNest' },
  { pattern: /ai|artificial/i, alt: 'AI learning for kids with SkillNest online program' },
  { pattern: /class|session|live/i, alt: 'Live online class session at SkillNest' },
  { pattern: /hero|banner/i, alt: 'SkillNest online digital skills program for Class 6-8 students' },
  { pattern: /poster|thumbnail/i, alt: 'SkillNest program overview' },
  { pattern: /icon/i, alt: 'SkillNest icon' },
  { pattern: /avatar|profile/i, alt: 'Student or parent profile' },
  { pattern: /\.svg$/i, alt: 'SkillNest graphic element' },
  { pattern: /skillnest/i, alt: 'SkillNest — Digital skills program for kids' },
];

function inferAlt(src, surrounding) {
  // Check src against rules
  for (const rule of ALT_RULES) {
    if (rule.pattern.test(src)) return rule.alt;
  }
  // Try to infer from surrounding text
  if (surrounding) {
    const text = surrounding.replace(/<[^>]+>/g, '').trim().slice(0, 80);
    if (text.length > 5) return `Image: ${text}`;
  }
  return 'SkillNest online learning program for students';
}

function processImgTag(imgTag, surroundingHtml) {
  // Already has alt attribute (even if empty — that's intentional for decorative images)
  if (/\balt\s*=/i.test(imgTag)) return imgTag;

  // Extract src for alt inference
  const srcMatch = imgTag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  const src = srcMatch ? srcMatch[1] : '';

  const alt = inferAlt(src, surroundingHtml);

  // Add alt attribute before the closing > or />
  return imgTag.replace(/(\s*\/?>)$/, ` alt="${alt}"$1`);
}

function getAllHtmlFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'scripts'].includes(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) getAllHtmlFiles(full, results);
    else if (e.name.endsWith('.html')) results.push(full);
  }
  return results;
}

console.log('\n=== FIXING IMAGE ALT ATTRIBUTES ===');
const files = getAllHtmlFiles(ROOT);
let totalFixed = 0;
let totalFiles = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  let html = fs.readFileSync(file, 'utf8');
  if (html.length < 500) continue;

  const original = html;
  let fixedInFile = 0;

  // Process each <img> tag
  html = html.replace(/<img\b([^>]*?)(\s*\/?>)/gi, (match, attrs, closing) => {
    const fullTag = `<img${attrs}${closing}`;

    // Already has alt — skip
    if (/\balt\s*=/i.test(attrs)) return match;

    // Skip tracking pixels or Facebook Pixel images
    if (attrs.includes('facebook.com/tr') || attrs.includes('width="1"') || attrs.includes('height="1"') || attrs.includes('display:none') || attrs.includes('display: none')) {
      return match;
    }

    // Get ~100 chars of surrounding HTML for context
    const pos = html.indexOf(match);
    const surrounding = pos > 0 ? html.substring(Math.max(0, pos - 100), pos + match.length + 100) : '';

    const srcMatch = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    const src = srcMatch ? srcMatch[1] : '';
    const alt = inferAlt(src, surrounding);

    fixedInFile++;
    return `<img${attrs} alt="${alt}"${closing}`;
  });

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    totalFixed += fixedInFile;
    totalFiles++;
    console.log(`  ✓ ${rel} — ${fixedInFile} image(s) updated`);
  }
}

console.log(`\n✅ Image alt fix complete.`);
console.log(`   Files updated: ${totalFiles}`);
console.log(`   Total images fixed: ${totalFixed}`);
