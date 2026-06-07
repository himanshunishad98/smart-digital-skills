/**
 * clean-inline-css.js
 *
 * Removes non-critical CSS selectors from inline <style> blocks in all HTML files.
 * Since these styles are already in css/bundle.min.css, removing them from inline style
 * tags saves head size and improves DOM efficiency without affecting styling.
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootDir = path.join(__dirname, '../');

const SELECTORS_TO_STRIP = [
  '\\.why-card',
  '\\.why-icon',
  '\\.project-card',
  '\\.project-top',
  '\\.project-bottom',
  '\\.faq-a',
  '\\.form-group',
  '\\.whatsapp-float',
  '\\.whatsapp-btn',
  '\\.whatsapp-icon',
  '\\.sticky-mobile-cta',
  '\\.new-sticky-layout',
  '\\.mobile-nav-toggle',
  '\\.mobile-nav-menu',
  '\\.mobile-nav-content',
  '\\.mobile-nav-close',
  '#exitPopup',
  '::-webkit-scrollbar',
  '::-webkit-scrollbar-track',
  '::-webkit-scrollbar-thumb',
  '\\.roadmap-grid',
  '\\.roadmap-card',
  '\\.rmc-week',
  '\\.rmc-icon',
  '\\.rmc-title',
  '\\.rmc-chips',
  '\\.rmc-chip',
  '\\.roadmap-bar',
  '\\.rb-step',
  '\\.rb-arrow',
  '\\.outcome-card',
  '\\.oc-icon',
  '\\.oc-body',
  '\\.blog-section',
  '\\.blog-tag',
  '\\.blog-tag-blue',
  '\\.blog-date',
  '\\.blog-card-actions',
  '\\.page-hero',
  '\\.page-hero-tag',
  '\\.fg-reveal',
  'article'
];

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

console.log('=== CLEANING INLINE CSS BLOCKS ===');

const allHtmlFiles = getAllHtmlFiles(rootDir);
let processedCount = 0;
let totalSavedBytes = 0;

allHtmlFiles.forEach(filePath => {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  
  // Skip temp files in scripts directory if any
  if (relPath.startsWith('scripts/')) return;

  const originalContent = fs.readFileSync(filePath, 'utf8');
  let content = originalContent;

  // Use a regex to find all <style> blocks
  content = content.replace(/(<style>)([\s\S]*?)(<\/style>)/g, (match, openTag, cssContent, closeTag) => {
    let cleanedCss = cssContent;

    // Apply the selector stripping
    SELECTORS_TO_STRIP.forEach(selectorPattern => {
      // Matches: .selector { properties } or .selector:hover { properties }
      const regex = new RegExp(`(?:[^\\}]*?)${selectorPattern}(?:[^\\{]*?)\\s*\\{[^\\}]*\\}`, 'gi');
      cleanedCss = cleanedCss.replace(regex, '');
    });

    // Clean up empty media queries or leftover empty braces
    cleanedCss = cleanedCss
      .replace(/@media[^{}]*\{\s*\}/g, '')
      .replace(/\{\s*\}/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return `${openTag}${cleanedCss}${closeTag}`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    const saved = originalContent.length - content.length;
    totalSavedBytes += saved;
    processedCount++;
    console.log(`  ✅ Cleaned inline CSS in: ${relPath} (Saved ${saved} bytes)`);
  }
});

console.log(`\n=== INLINE CSS CLEANUP SUMMARY ===`);
console.log(`Files optimized: ${processedCount}`);
console.log(`Total bytes saved: ${totalSavedBytes} bytes`);
console.log('=== CLEANUP COMPLETE ===');
