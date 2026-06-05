/**
 * config-loader.js — Dynamic Configuration Loader for SkillNest
 * Automatically injects centralized SITE_CONFIG values into HTML elements using data attributes.
 * Also renders reusable header and footer components dynamically.
 */

(function () {
  'use strict';

  // Helper to calculate relative base path depending on page depth
  function getBasePath() {
    let depth = 0;
    let prefix = '';
    var fallbackScript = document.getElementById('file-protocol-fallback');
    if (fallbackScript) {
      var attrDepth = fallbackScript.getAttribute('data-depth');
      if (attrDepth !== null) {
        depth = parseInt(attrDepth, 10) || 0;
        prefix = '';
        for (var i = 0; i < depth; i++) {
          prefix += '../';
        }
        return prefix;
      }
    }

    const loc = window.location;


    if (loc.protocol === 'file:') {
      const pathName = loc.pathname;
      const segments = pathName.split('/');
      const citiesIdx = segments.indexOf('cities');
      const resourcesIdx = segments.indexOf('resources');
      const ptIdx = segments.indexOf('tools') !== -1 ? segments.indexOf('tools') : (segments.indexOf('Personality Test') !== -1 ? segments.indexOf('Personality Test') : segments.indexOf('Personality%20Test'));
      
      if (citiesIdx !== -1) {
        depth = segments.length - 1 - citiesIdx;
      } else if (resourcesIdx !== -1) {
        depth = segments.length - 1 - resourcesIdx;
      } else if (ptIdx !== -1) {
        depth = segments.length - 1 - ptIdx;
      }
    } else {
      const pathName = loc.pathname;
      const cleanPath = pathName.replace(/^\/|\/$/g, '');
      if (cleanPath) {
        const segments = cleanPath.split('/');
        depth = segments.length - 1;
        // Check if final segment is a file (e.g. index.html)
        if (segments.length === 1 && segments[0].includes('.html')) {
          depth = 0;
        }
      }
    }

    prefix = '';
    for (let i = 0; i < depth; i++) {
      prefix += '../';
    }
    return prefix;
  }

  // Build desktop nav menu HTML from NAV_CONFIG
  function buildDesktopNavHtml(basePath) {
    var navConfig = window.NAV_CONFIG;
    if (!navConfig || !navConfig.menu) return '';
    function resolve(url) {
      if (url === '/') return basePath + 'index.html';
      if (url.charAt(0) === '/' && url.charAt(1) !== '/') {
        var clean = basePath + url.slice(1);
        if (clean.charAt(clean.length - 1) === '/') clean += 'index.html';
        return clean;
      }
      return url;
    }
    var html = '<ul class="nav-menu">\n';
    navConfig.menu.forEach(function(item) {
      if (item.dropdown) {
        html += '      <li class="nav-item dropdown">\n';
        html += '        <a href="' + resolve(item.url) + '" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">' + item.name + ' <span class="caret">▼</span></a>\n';
        html += '        <ul class="dropdown-menu" role="menu">\n';
        item.dropdown.forEach(function(sub) {
          html += '          <li><a href="' + resolve(sub.url) + '" role="menuitem">' + sub.name + '</a></li>\n';
        });
        html += '        </ul>\n';
        html += '      </li>\n';
      } else {
        html += '      <li class="nav-item"><a href="' + resolve(item.url) + '" class="nav-link">' + item.name + '</a></li>\n';
      }
    });
    html += '    </ul>';
    return html;
  }

  // Build mobile nav menu HTML from NAV_CONFIG
  function buildMobileNavHtml(basePath) {
    var navConfig = window.NAV_CONFIG;
    if (!navConfig || !navConfig.menu) return '';
    function resolve(url) {
      if (url === '/') return basePath + 'index.html';
      if (url.charAt(0) === '/' && url.charAt(1) !== '/') {
        var clean = basePath + url.slice(1);
        if (clean.charAt(clean.length - 1) === '/') clean += 'index.html';
        return clean;
      }
      return url;
    }
    var html = '<ul class="mobile-menu-list">\n';
    navConfig.menu.forEach(function(item) {
      if (item.dropdown) {
        html += '      <li class="mobile-dropdown">\n';
        html += '        <button class="mobile-trigger" aria-expanded="false">' + item.name + ' <span class="caret">▼</span></button>\n';
        html += '        <ul class="mobile-submenu">\n';
        item.dropdown.forEach(function(sub) {
          html += '          <li><a href="' + resolve(sub.url) + '">' + sub.name + '</a></li>\n';
        });
        html += '        </ul>\n';
        html += '      </li>\n';
      } else {
        html += '      <li><a href="' + resolve(item.url) + '" class="mobile-link">' + item.name + '</a></li>\n';
      }
    });
    if (navConfig.cta) {
      html += '      <li style="margin-top:15px"><a href="' + resolve(navConfig.cta.url) + '" class="btn-primary" style="display:block;text-align:center;padding:12px;font-size:.95rem;font-weight:800">' + navConfig.cta.name + '</a></li>\n';
    }
    html += '    </ul>';
    return html;
  }

  // Get dynamic header HTML structure
  function getHeaderHTML(basePath, config) {
    var brand = config.BRAND_NAME || 'SkillNest';
    var desktopNav = buildDesktopNavHtml(basePath);
    return '\n      <div class="container">\n        <div class="header-inner">\n          <a href="' + basePath + 'index.html" class="logo">\n            <div class="logo-icon">🎓</div>\n            <div class="logo-text">\n              <span class="brand-name">' + brand + '</span>\n            </div>\n          </a>\n          <nav class="desktop-nav" aria-label="Main Navigation">\n            ' + desktopNav + '\n          </nav>\n          <div class="nav-cta">\n            <a class="btn-primary" href="' + basePath + 'contact/book-demo.html">' + (config.CTA_TEXT || 'Book Free Demo') + '</a>\n          </div>\n          <button aria-label="Open Menu" class="mobile-nav-toggle" id="mobileNavToggle">☰</button>\n        </div>\n      </div>\n    ';
  }

  // Get dynamic mobile navigation menu HTML
  function getMobileMenuHTML(basePath) {
    var mobileNav = buildMobileNavHtml(basePath);
    return '\n      <div class="mobile-nav-content">\n        <button aria-label="Close Menu" class="mobile-nav-close" id="mobileNavClose">×</button>\n        ' + mobileNav + '\n      </div>\n    ';
  }


  // Get dynamic footer HTML structure
  function getFooterHTML(basePath, config) {
    const brand = config.BRAND_NAME || "SkillNest";
    const email = config.EMAIL || "support@skillnest.co.in";
    const phone = config.PHONE || "+91 8827731006";
    const address = `${config.ADDRESS}, ${config.CITY}, ${config.STATE}`;
    const hours = config.WORKING_HOURS || "9 AM - 8 PM";
    
    return `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3>🎓 <span class="brand-name">${brand}</span></h3>
            <p>Empowering Class 6–8 students with future-ready digital skills through practical, engaging, and expert-designed programs.</p>
            <div class="social-links">
              <a aria-label="WhatsApp" class="social-link whatsapp-link" href="#">📱</a>
              <a aria-label="Instagram" class="social-link" href="${config.INSTAGRAM || '#'}" target="_blank">📸</a>
              <a aria-label="Facebook" class="social-link" href="${config.FACEBOOK || '#'}" target="_blank">👥</a>
              <a aria-label="YouTube" class="social-link" href="#">📺</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Program</h4>
            <ul>
              <li><a href="${basePath}index.html#curriculum">Curriculum</a></li>
              <li><a href="${basePath}projects/">Project Gallery</a></li>
              <li><a href="${basePath}parent-hub/testimonials/">Testimonials</a></li>
              <li><a href="${basePath}schools/">Partner Schools</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="${basePath}index.html#highlights">Program Highlights</a></li>
              <li><a href="${basePath}index.html#parents">Parent Info</a></li>
              <li><a href="${basePath}index.html#faq">FAQ</a></li>
              <li><a href="${basePath}courses/computer/">AI & Computer Classes</a></li>
              <li><a href="${basePath}courses/computer/">Computer & Coding Classes</a></li>
              <li><a href="${basePath}schools/">School Partnerships</a></li>
              <li><a href="${basePath}blog/">Parent Blog</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Book Free Demo</h4>
            <div class="footer-contact-item">📞 <span class="phone-number">${phone}</span></div>
            <div class="footer-contact-item">📧 <span class="email-address">${email}</span></div>
            <div class="footer-contact-item">📍 <span class="address-text">${address}</span></div>
            <div class="footer-contact-item">⏰ <span>${hours}</span></div>
          </div>
        </div>
        <hr class="footer-divider">
        <!-- FOOTER CTA ROW -->
        <div class="footer-cta-row">
          <div class="footer-cta-text">
            <h3>🚀 Not Sure Yet? Try Our Free Digital Skills Demo Class First!</h3>
            <p>No commitment. Experience a live class and see the difference yourself.</p>
          </div>
          <div class="footer-cta-btns">
            <a class="btn-yellow" href="${basePath}contact/book-demo.html" style="font-size:.9rem;padding:12px 26px">${config.CTA_TEXT || "Book Free Demo"}</a>
            <a class="btn-ghost btn-ghost-footer whatsapp-link" href="#" target="_blank" rel="nofollow noopener noreferrer">✨ Download Curriculum</a>
          </div>
        </div>
        <hr class="footer-divider" style="margin-top:0">
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} ${brand}. All Rights Reserved.</p>
          <p>Made with ❤️ for Students of India</p>
        </div>
      </div>
    `;
  }

  // Load and inject the elements dynamically
  function initConfigAndComponents() {
    const config = window.SITE_CONFIG || window.CONFIG;
    if (!config) {
      console.warn("SITE_CONFIG/CONFIG object not found. Skipping dynamic injection.");
      return;
    }

    const basePath = getBasePath();

    // 1. Dynamic component injection for Header
    const headerEl = document.querySelector('header.header') || document.getElementById('mainHeader');
    if (headerEl && (headerEl.innerHTML.trim() === '' || !headerEl.querySelector('.header-inner'))) {
      headerEl.innerHTML = getHeaderHTML(basePath, config);
    }

    // 2. Dynamic component injection for Mobile Menu
    const mobileMenuEl = document.getElementById('mobileNavMenu');
    if (mobileMenuEl && (mobileMenuEl.innerHTML.trim() === '' || !mobileMenuEl.querySelector('.mobile-nav-content'))) {
      mobileMenuEl.innerHTML = getMobileMenuHTML(basePath);
    }

    // 3. Dynamic component injection for Footer
    const footerEl = document.querySelector('footer.footer') || document.querySelector('footer');
    if (footerEl && (footerEl.innerHTML.trim() === '' || !footerEl.querySelector('.footer-grid'))) {
      // Preserve regional cities panel if it exists in the footer
      const regionalPanel = footerEl.querySelector('.locations-serve-footer-panel');
      const regionalPanelHtml = regionalPanel ? regionalPanel.outerHTML : '';
      footerEl.innerHTML = getFooterHTML(basePath, config);
      if (regionalPanelHtml) {
        const bottomDivider = footerEl.querySelector('.footer-divider');
        if (bottomDivider) {
          bottomDivider.insertAdjacentHTML('beforebegin', regionalPanelHtml);
        } else {
          footerEl.querySelector('.container').appendChild(regionalPanel);
        }
      }
    }
  }

  // Run on DOMContentLoaded (and immediately if already loaded)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfigAndComponents);
  } else {
    initConfigAndComponents();
  }
})();
