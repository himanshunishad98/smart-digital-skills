const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = path.join(__dirname, '../');

function getAllHtmlFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', 'scripts', 'archive', 'scratch'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllHtmlFiles(fullPath, results);
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(ROOT);

const report = {
  totalFiles: 0,
  fullyCompliant: 0,
  missingGTM: [],
  missingPixel: [],
  missingOGTags: [],
  missingTwitterTags: [],
  duplicateTrackingScripts: [],
  manualReviewRequired: []
};

htmlFiles.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const isRedirect = content.includes('http-equiv="refresh"') || content.includes('window.location.replace') || content.includes('Redirecting…');
  if (isRedirect) return;

  report.totalFiles++;
  if (content.length < 100) {
    report.manualReviewRequired.push({ file: relPath, reason: 'File too short/empty' });
    return;
  }
  
  const $ = cheerio.load(content);
  
  let isCompliant = true;
  let hasGtmHead = false;
  let hasGtmBody = false;
  let hasPixel = false;
  let duplicateGtm = false;
  let duplicatePixel = false;
  let hasDirectGa4 = false;
  
  // 1. Verify GTM Presence and Duplicates
  const gtmScriptsCount = (content.match(/<script[^>]*>(?:(?!<\/script>)[\s\S])*?GTM-ML9QWMMH(?:(?!<\/script>)[\s\S])*?<\/script>/gi) || []).length;
  if (gtmScriptsCount > 0) {
    hasGtmHead = true;
  }
  if (gtmScriptsCount > 1) {
    duplicateGtm = true;
  }
  
  const gtmNoscriptsCount = (content.match(/<noscript[^>]*>(?:(?!<\/noscript>)[\s\S])*?googletagmanager\.com\/ns\.html\?id=GTM-ML9QWMMH(?:(?!<\/noscript>)[\s\S])*?<\/noscript>/gi) || []).length;
  if (gtmNoscriptsCount > 0) {
    hasGtmBody = true;
  }
  if (gtmNoscriptsCount > 1) {
    duplicateGtm = true;
  }
  
  // Check for any legacy/direct GA4/gtag scripts
  const directGa4Count = (content.match(/<script[^>]*>(?:(?!<\/script>)[\s\S])*?(?:googletagmanager\.com\/gtag\/js|gtag\s*\()(?:(?!<\/script>)[\s\S])*?<\/script>/gi) || []).length;
  if (directGa4Count > 0) {
    hasDirectGa4 = true;
  }
  
  // 2. Verify Meta Pixel Presence and Duplicates
  const pixelScriptCount = (content.match(/<script[^>]*>(?:(?!<\/script>)[\s\S])*?1356797499656239(?:(?!<\/script>)[\s\S])*?<\/script>/gi) || []).length;
  if (pixelScriptCount > 0) {
    hasPixel = true;
  }
  if (pixelScriptCount > 1) {
    duplicatePixel = true;
  }
  
  const pixelNoscriptCount = (content.match(/<noscript[^>]*>(?:(?!<\/noscript>)[\s\S])*?1356797499656239(?:(?!<\/noscript>)[\s\S])*?<\/noscript>/gi) || []).length;
  if (pixelNoscriptCount > 1) {
    duplicatePixel = true;
  }
  
  // Update compliance reports
  if (!hasGtmHead || !hasGtmBody) {
    isCompliant = false;
    const reasons = [];
    if (!hasGtmHead) reasons.push('Missing GTM head script');
    if (!hasGtmBody) reasons.push('Missing GTM body noscript');
    report.missingGTM.push({ file: relPath, reason: reasons.join(', ') });
  }
  
  if (!hasPixel) {
    isCompliant = false;
    report.missingPixel.push({ file: relPath, reason: 'Missing Meta Pixel script' });
  }
  
  if (duplicateGtm || duplicatePixel || hasDirectGa4) {
    isCompliant = false;
    const duplicates = [];
    if (duplicateGtm) duplicates.push('Duplicate GTM scripts');
    if (duplicatePixel) duplicates.push('Duplicate Meta Pixel scripts');
    if (hasDirectGa4) duplicates.push('Direct GA4 (gtag) script found');
    report.duplicateTrackingScripts.push({ file: relPath, issues: duplicates });
  }
  
  // 3. Verify Open Graph tags
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDesc = $('meta[property="og:description"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  const ogUrl = $('meta[property="og:url"]').attr('content');
  
  const missingOG = [];
  if (!ogTitle) missingOG.push('og:title');
  if (!ogDesc) missingOG.push('og:description');
  if (!ogImage) missingOG.push('og:image');
  if (!ogUrl) missingOG.push('og:url');
  
  if (missingOG.length > 0) {
    isCompliant = false;
    report.missingOGTags.push({ file: relPath, missing: missingOG });
  }
  
  // 4. Verify Twitter Card tags
  const twitterTitle = $('meta[name="twitter:title"]').attr('content');
  const twitterDesc = $('meta[name="twitter:description"]').attr('content');
  const twitterImage = $('meta[name="twitter:image"]').attr('content');
  
  const missingTwitter = [];
  if (!twitterTitle) missingTwitter.push('twitter:title');
  if (!twitterDesc) missingTwitter.push('twitter:description');
  if (!twitterImage) missingTwitter.push('twitter:image');
  
  if (missingTwitter.length > 0) {
    isCompliant = false;
    report.missingTwitterTags.push({ file: relPath, missing: missingTwitter });
  }
  
  // Validate social image url standardization
  const expectedImage = 'https://skillnest.co.in/skillnest-poster.jpg';
  if (ogImage && ogImage !== expectedImage) {
    isCompliant = false;
    report.manualReviewRequired.push({ file: relPath, reason: `OG Image mismatch: ${ogImage}` });
  }
  if (twitterImage && twitterImage !== expectedImage) {
    isCompliant = false;
    report.manualReviewRequired.push({ file: relPath, reason: `Twitter Image mismatch: ${twitterImage}` });
  }
  
  if (isCompliant) {
    report.fullyCompliant++;
  }
});

// Write report to file
fs.writeFileSync(path.join(ROOT, 'tracking-compliance-report.json'), JSON.stringify(report, null, 2), 'utf8');

console.log('=== TRACKING COMPLIANCE REPORT SUMMARY ===');
console.log(`Total HTML files scanned: ${report.totalFiles}`);
console.log(`Fully Compliant files:   ${report.fullyCompliant}`);
console.log(`Missing GTM:             ${report.missingGTM.length}`);
console.log(`Missing Meta Pixel:      ${report.missingPixel.length}`);
console.log(`Missing OG Tags:         ${report.missingOGTags.length}`);
console.log(`Missing Twitter Tags:    ${report.missingTwitterTags.length}`);
console.log(`Duplicate scripts:       ${report.duplicateTrackingScripts.length}`);
console.log(`Manual Review Required:  ${report.manualReviewRequired.length}`);
console.log('==========================================');

if (report.fullyCompliant === report.totalFiles) {
  console.log('✅ ALL PAGES COMPLIANT! Verification successful.');
  process.exit(0);
} else {
  console.error('❌ Compliance issues found. Please check tracking-compliance-report.json.');
  process.exit(1);
}
