const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootDir = path.join(__dirname, '../');

// Load Navigation Configuration
const navConfig = require('../assets/js/nav-config.js');

// Load template files
const headerTemplate = fs.readFileSync(path.join(rootDir, 'scripts/templates/header-template.html'), 'utf8');
const footerTemplate = fs.readFileSync(path.join(rootDir, 'scripts/templates/footer-template.html'), 'utf8');
const menuTemplate = fs.readFileSync(path.join(rootDir, 'scripts/templates/menu-template.html'), 'utf8');

// Recursively find all HTML files in the project
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

console.log('=== STARTING STANDARDIZED CONFIG TAG & STATIC LAYOUT APPLICATION ===');
const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`Found ${htmlFiles.length} HTML files to process.`);

let processedCount = 0;

function processTextNodes($, node) {
  node.contents().each((i, child) => {
    if (child.type === 'text') {
      const text = child.data;
      
      const regex = /(₹(?:5,500|5500|4,999|4999|3,499|3499|3,000|3000|1,999|1999|499|99))|((?:\+91[ -]?)?(?:88277|79876)[ -]?(?:31006|05097))|(admin@skillnest\.co\.in|support@skillnest\.co\.in)|(Durg, Chhattisgarh, India|Your Full Address Here)|(Mon[–-]Sat:\s*9\s*AM\s*[–-]\s*7\s*PM|9\s*AM\s*-\s*8\s*PM)|(Smart\s+Digital\s+Skills|SkillNest)/gi;
      
      const newHtml = text.replace(regex, (match, price, phone, email, address, hours, brand) => {
        if (price) {
          const cleanPrice = price.replace(/,/g, '');
          if (cleanPrice.includes('5500') || cleanPrice.includes('4999')) {
            return `<span class="original-price">${match}</span>`;
          }
          if (cleanPrice.includes('3499') || cleanPrice.includes('3000') || cleanPrice.includes('1999')) {
            return `<span class="current-price">${match}</span>`;
          }
          if (cleanPrice.includes('499') || cleanPrice.includes('99')) {
            return `<span class="registration-fees">${match}</span>`;
          }
        }
        if (phone) {
          return `<span class="phone-number">${match}</span>`;
        }
        if (email) {
          return `<span class="email-address">${match}</span>`;
        }
        if (address) {
          return `<span class="address-text">${match}</span>`;
        }
        if (hours) {
          return `<span class="working-hours">${match}</span>`;
        }
        if (brand) {
          return `<span class="brand-name">${match}</span>`;
        }
        return match;
      });

      if (newHtml !== text) {
        $(child).replaceWith(newHtml);
      }
    } else if (child.type === 'tag') {
      // Don't traverse scripts, styles, metadata, or other non-HTML tags, or if element already has the standardized classes
      if (
        child.name !== 'script' && 
        child.name !== 'style' && 
        child.name !== 'title' && 
        child.name !== 'meta' && 
        child.name !== 'link' && 
        child.name !== 'iframe' && 
        child.name !== 'textarea' && 
        child.name !== 'noscript' && 
        child.name !== 'svg' && 
        child.name !== 'header' && 
        child.name !== 'footer' && 
        $(child).attr('id') !== 'mobileNavMenu' &&
        !$(child).hasClass('phone-number') &&
        !$(child).hasClass('email-address') &&
        !$(child).hasClass('current-price') &&
        !$(child).hasClass('original-price') &&
        !$(child).hasClass('brand-name') &&
        !$(child).hasClass('address-text')
      ) {
        processTextNodes($, $(child));
      }
    }
  });
}

function buildDesktopNavHtml(basePath) {
  function resolve(url) {
    if (url === '/') return basePath + 'index.html';
    if (url.startsWith('/') && !url.startsWith('//')) {
      let hashIndex = url.indexOf('#');
      let pathPart = hashIndex !== -1 ? url.substring(0, hashIndex) : url;
      let hashPart = hashIndex !== -1 ? url.substring(hashIndex) : '';

      let cleanUrl = basePath + pathPart.slice(1);
      if (cleanUrl.endsWith('/')) {
        cleanUrl += 'index.html';
      }
      return cleanUrl + hashPart;
    }
    return url;
  }

  let html = '<ul class="nav-menu">\n';
  navConfig.menu.forEach(item => {
    if (item.dropdown) {
      html += `      <li class="nav-item dropdown">\n`;
      html += `        <a href="${resolve(item.url)}" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">${item.name} <span class="caret">▼</span></a>\n`;
      html += `        <ul class="dropdown-menu" role="menu">\n`;
      item.dropdown.forEach(sub => {
        html += `          <li><a href="${resolve(sub.url)}" role="menuitem">${sub.name}</a></li>\n`;
      });
      html += `        </ul>\n`;
      html += `      </li>\n`;
    } else {
      html += `      <li class="nav-item"><a href="${resolve(item.url)}" class="nav-link">${item.name}</a></li>\n`;
    }
  });
  html += '    </ul>';
  return html;
}

function buildMobileNavHtml(basePath) {
  function resolve(url) {
    if (url === '/') return basePath + 'index.html';
    if (url.startsWith('/') && !url.startsWith('//')) {
      let hashIndex = url.indexOf('#');
      let pathPart = hashIndex !== -1 ? url.substring(0, hashIndex) : url;
      let hashPart = hashIndex !== -1 ? url.substring(hashIndex) : '';

      let cleanUrl = basePath + pathPart.slice(1);
      if (cleanUrl.endsWith('/')) {
        cleanUrl += 'index.html';
      }
      return cleanUrl + hashPart;
    }
    return url;
  }

  let html = '<ul class="mobile-menu-list">\n';
  navConfig.menu.forEach(item => {
    if (item.dropdown) {
      html += `      <li class="mobile-dropdown">\n`;
      html += `        <button class="mobile-trigger" aria-expanded="false">${item.name} <span class="caret">▼</span></button>\n`;
      html += `        <ul class="mobile-submenu">\n`;
      item.dropdown.forEach(sub => {
        html += `          <li><a href="${resolve(sub.url)}">${sub.name}</a></li>\n`;
      });
      html += `        </ul>\n`;
      html += `      </li>\n`;
    } else {
      html += `      <li><a href="${resolve(item.url)}" class="mobile-link">${item.name}</a></li>\n`;
    }
  });
  html += `      <li style="margin-top: 15px;"><a href="${resolve(navConfig.cta.url)}" class="btn-primary" style="display: block; text-align: center; padding: 12px; font-size: 0.95rem; font-weight: 800;">${navConfig.cta.name}</a></li>\n`;
  html += '    </ul>';
  return html;
}

htmlFiles.forEach(filePath => {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  
  // Calculate relative basePath for depth replacement
  const relativeDir = path.relative(rootDir, path.dirname(filePath));
  let basePath = '';
  if (relativeDir) {
    const depth = relativeDir.split(path.sep).length;
    basePath = '../'.repeat(depth);
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip redirect stubs to prevent injecting layouts/scripts and bloating files
  if (content.includes('title>Redirecting…') || content.includes('window.location.replace') || content.includes('http-equiv="refresh"')) {
    console.log(`Skipping redirect stub: ${relPath}`);
    return;
  }

  // Pre-clean existing config spans (whether empty or populated) to their raw text defaults
  content = content.replace(/<span class="original-price">(.*?)<\/span>/gi, '₹5,500');
  content = content.replace(/<span class="current-price">(.*?)<\/span>/gi, '₹3,499');
  content = content.replace(/<span class="registration-fees">(.*?)<\/span>/gi, '₹499');
  content = content.replace(/<span class="phone-number">(.*?)<\/span>/gi, '+91 88277 31006');
  content = content.replace(/<span class="email-address">(.*?)<\/span>/gi, 'admin@skillnest.co.in');
  content = content.replace(/<span class="address-text">(.*?)<\/span>/gi, 'Durg, Chhattisgarh, India');
  content = content.replace(/<span class="working-hours">(.*?)<\/span>/gi, 'Mon–Sat: 9 AM – 7 PM');
  content = content.replace(/<span class="brand-name">(.*?)<\/span>/gi, 'SkillNest');

  // 0. Remove inline configs and schema telephones from raw content
  content = content.replace(/,?\s*phone:\s*["']91(?:8827731006|7987605097)["']/g, '');
  content = content.replace(/"telephone"\s*:\s*"[^"]*"/g, '"telephone": ""');

  // Load Cheerio
  const $ = cheerio.load(content, { decodeEntities: false });

  // Compile templates with basePath and inject compiled slots
  const desktopNavHtml = buildDesktopNavHtml(basePath);
  const mobileNavHtml = buildMobileNavHtml(basePath);

  let compiledHeaderRaw = headerTemplate.replace(/BASE_PATH/g, basePath);
  compiledHeaderRaw = compiledHeaderRaw.replace('<!-- NAVIGATION_MENU_SLOT -->', desktopNavHtml);

  let compiledMenuRaw = menuTemplate.replace(/BASE_PATH/g, basePath);
  compiledMenuRaw = compiledMenuRaw.replace('<!-- MOBILE_MENU_SLOT -->', mobileNavHtml);

  const compiledFooterRaw = footerTemplate.replace(/BASE_PATH/g, basePath);

  const $headerTemp = cheerio.load(compiledHeaderRaw, { decodeEntities: false });
  const compiledHeader = $headerTemp('body').html();

  const $menuTemp = cheerio.load(compiledMenuRaw, { decodeEntities: false });
  const compiledMenu = $menuTemp('body').html();

  const $footerTemp = cheerio.load(compiledFooterRaw, { decodeEntities: false });
  const compiledFooter = $footerTemp('body').html();

  // 1. Inject Header Static Content
  const header = $('header.header, #mainHeader');
  if (header.length) {
    header.attr('data-dynamic-component', 'header');
    header.html(compiledHeader);
  }

  // 2. Inject Mobile Menu Static Content (insert if missing, update if present)
  let mobileMenu = $('#mobileNavMenu');
  if (!mobileMenu.length) {
    // Inject mobile nav overlay after the header element
    const headerEl2 = $('header.header, #mainHeader');
    if (headerEl2.length) {
      headerEl2.after('\n<div class="mobile-nav-menu" id="mobileNavMenu" data-dynamic-component="mobile-menu"></div>\n');
      mobileMenu = $('#mobileNavMenu');
    }
  }
  if (mobileMenu.length) {
    mobileMenu.attr('data-dynamic-component', 'mobile-menu');
    mobileMenu.html(compiledMenu);
  }

  // 3. Inject Footer Static Content (preserving locations panel)
  const footer = $('footer.footer, footer');
  if (footer.length) {
    footer.attr('data-dynamic-component', 'footer');
    
    // Find locations serve footer panel
    const regionalPanel = footer.find('.locations-serve-footer-panel');
    const regionalHtml = regionalPanel.length ? $.html(regionalPanel) : '';
    
    footer.html(compiledFooter);
    
    if (regionalHtml) {
      footer.find('.container').append('\n    ' + regionalHtml + '\n  ');
    }
  }

  // 4. Tag links (tel, mailto, whatsapp) with standardized classes and dynamic config hrefs in the rest of the body
  $('a').each((i, el) => {
    const href = $(el).attr('href') || '';
    
    // WhatsApp links
    if (href.includes('wa.me/') || href.includes('phone=')) {
      $(el).addClass('whatsapp-link');
      $(el).attr('href', '#');
      $(el).attr('data-config-href', 'whatsapp');
    }
    // Mailto links
    else if (href.includes('mailto:')) {
      $(el).addClass('email-address');
      $(el).attr('href', '#');
      $(el).attr('data-config-href', 'email');
    }
    // Tel links
    else if (href.includes('tel:')) {
      $(el).addClass('phone-number');
      $(el).attr('href', '#');
      $(el).attr('data-config-href', 'mobile');
    }
  });

  // 4b. Update floating WhatsApp button text to 'Chat on WhatsApp'
  $('.whatsapp-float a, a.whatsapp-btn').each((i, el) => {
    const text = $(el).text();
    if (text.includes('Counselor') || text.includes('counselor') || text.includes('Talk to')) {
      $(el).html('<div class="whatsapp-icon">💬</div>\n    Chat on WhatsApp\n  ');
    }
  });

  // 5. Process text nodes recursively to apply standardized spans/classes
  processTextNodes($, $('html'));

  // 6. Custom cleanups for specific static elements (e.g. announcement bar batch names)
  $('.announcement-bar').each((i, el) => {
    let html = $(el).html() || '';
    
    // Make phone number dynamic
    if (html.includes('+91-8827731006') && !html.includes('class="phone-number"')) {
      html = html.replace('+91-8827731006', '<span class="phone-number"></span>');
    } else if (html.includes('+91 88277 31006') && !html.includes('class="phone-number"')) {
      html = html.replace('+91 88277 31006', '<span class="phone-number"></span>');
    }
    
    // Make batch dynamic
    if (html.includes('May 2026 Batch') && !html.includes('data-config="batchName"')) {
      html = html.replace('May 2026 Batch', '<span data-config="batchName">May 2026 Batch</span>');
    }
    
    $(el).html(html);
  });

  // 7. Freshness Engine: Update freshness dates
  const todayISO = new Date().toISOString().split('T')[0];
  const todayReadable = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Update visible blog publish/update dates
  $('.blog-hero-date').each((i, el) => {
    let text = $(el).text();
    text = text.split(' (Updated')[0];
    $(el).text(text + ` (Updated: ${todayReadable})`);
  });

  // Inject or Update dateModified and lastReviewed in JSON-LD schemas
  $('script[type="application/ld+json"]').each((i, el) => {
    let jsonText = $(el).html();
    try {
      let schema = JSON.parse(jsonText);
      function updateDates(obj) {
        if (Array.isArray(obj)) {
          obj.forEach(updateDates);
        } else if (obj && typeof obj === 'object') {
          if (obj['@type'] === 'BlogPosting' || obj['@type'] === 'Course' || obj['@type'] === 'FAQPage' || obj['@type'] === 'EducationalOrganization') {
            obj.dateModified = todayISO;
            obj.lastReviewed = todayISO;
          }
          for (let key in obj) {
            updateDates(obj[key]);
          }
        }
      }
      updateDates(schema);
      $(el).html(JSON.stringify(schema, null, 2));
    } catch (err) {
      jsonText = jsonText
        .replace(/"dateModified"\s*:\s*"[^"]*"/g, `"dateModified": "${todayISO}"`)
        .replace(/"lastReviewed"\s*:\s*"[^"]*"/g, `"lastReviewed": "${todayISO}"`);
      $(el).html(jsonText);
    }
  });

  // 8. Remove any existing config, global-data, bundle.min, and nav-inject script tags to avoid duplication and fix path errors
  $('script[src*="config.js"]').remove();
  $('script[src*="global-data.js"]').remove();
  $('script[src*="bundle.min.js"]').remove();
  $('script[src*="nav-inject.js"]').remove();
  
  // 9. Append standard script relative to current depth
  const bundleJsPath = basePath + 'assets/js/bundle.min.js';
  
  $('body').append(`\n<script src="${bundleJsPath}" defer></script>\n`);

  // Save changes
  const modifiedHtml = $.html();
  fs.writeFileSync(filePath, modifiedHtml, 'utf8');
  processedCount++;
  console.log(`Processed: ${relPath} (basePath: "${basePath}")`);
});

console.log(`\nSuccessfully applied layouts and configuration tags to ${processedCount} HTML files.`);
console.log('=== CONFIG TAG & STATIC LAYOUT APPLICATION COMPLETE ===');
