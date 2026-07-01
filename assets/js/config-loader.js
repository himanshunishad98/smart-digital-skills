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
    const phone = config.PHONE || "+91 74705 54811";
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
            <h4>Programs</h4>
            <ul>
              <li><a href="${basePath}programs/index.html">Programs Overview</a></li>
              <li><a href="${basePath}programs/digital-skills-foundation/index.html">Digital Skills Foundation</a></li>
              <li><a href="${basePath}programs/ai-skills-for-students/index.html">AI Skills for Students</a></li>
              <li><a href="${basePath}programs/coding/index.html">Coding Program</a></li>
              <li><a href="${basePath}programs/excel-for-students/index.html">Excel for Students</a></li>
              <li><a href="${basePath}programs/productivity-tools/index.html">Productivity Tools</a></li>
              <li><a href="${basePath}programs/cyber-safety/index.html">Cyber Safety</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Courses</h4>
            <ul>
              <li><a href="${basePath}courses/index.html">Courses Overview</a></li>
              <li><a href="${basePath}courses/digital-literacy-online-presence/index.html">Computer Basics</a></li>
              <li><a href="${basePath}courses/digital-literacy-online-presence/index.html">Typing Course</a></li>
              <li><a href="${basePath}courses/computational-thinking-coding-logic/index.html">Coding Course</a></li>
              <li><a href="${basePath}courses/ai-classes-for-kids/index.html">AI Classes for Kids</a></li>
              <li><a href="${basePath}courses/excel-course/index.html">Excel Course</a></li>
              <li><a href="${basePath}courses/powerpoint-course/index.html">PowerPoint Course</a></li>
              <li><a href="${basePath}courses/internet-safety-course/index.html">Internet Safety Course</a></li>
              <li><a href="${basePath}courses/productivity-tools-course/index.html">Productivity Tools Course</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Age Groups</h4>
            <ul>
              <li><a href="${basePath}age-groups/index.html">Overview</a></li>
              <li><a href="${basePath}age-groups/ages-8-10/index.html">Ages 8–10</a></li>
              <li><a href="${basePath}age-groups/ages-11-13/index.html">Ages 11–13</a></li>
              <li><a href="${basePath}age-groups/ages-14-16/index.html">Ages 14–16</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Learning Paths</h4>
            <ul>
              <li><a href="${basePath}learning-paths/index.html">Overview</a></li>
              <li><a href="${basePath}learning-paths/beginner-digital-skills/index.html">Beginner Skills</a></li>
              <li><a href="${basePath}learning-paths/intermediate-digital-skills/index.html">Intermediate Skills</a></li>
              <li><a href="${basePath}learning-paths/advanced-digital-skills/index.html">Advanced Skills</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Compare</h4>
            <ul>
              <li><a href="${basePath}compare/index.html">Compare Overview</a></li>
              <li><a href="${basePath}compare/coding-vs-digital-skills/index.html">Coding vs Digital Skills</a></li>
              <li><a href="${basePath}compare/ai-vs-coding/index.html">AI vs Coding for Kids</a></li>
              <li><a href="${basePath}compare/online-vs-offline-learning/index.html">Online vs Offline Classes</a></li>
              <li><a href="${basePath}compare/skillnest-vs-traditional-computer-classes/index.html"><span class="brand-name">SkillNest</span> vs Traditional</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Tools</h4>
            <ul>
              <li><a href="${basePath}tools/index.html">Tools Overview</a></li>
              <li><a href="${basePath}tools/typing-speed-test/index.html">Typing Speed Test</a></li>
              <li><a href="${basePath}tools/password-strength-checker/index.html">Password Checker</a></li>
              <li><a href="${basePath}tools/ai-prompt-generator/index.html">AI Prompt Generator</a></li>
              <li><a href="${basePath}tools/digital-readiness-quiz/index.html">Digital Readiness Quiz</a></li>
              <li><a href="${basePath}tools/productivity-calculator/index.html">Productivity Calculator</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Parent Hub</h4>
            <ul>
              <li><a href="${basePath}parent-hub/index.html">Parent Hub Overview</a></li>
              <li><a href="${basePath}parent-hub/screen-time-guide/index.html">Screen Time Guide</a></li>
              <li><a href="${basePath}parent-hub/ai-safety-for-kids/index.html">AI Safety for Kids</a></li>
              <li><a href="${basePath}parent-hub/digital-parenting/index.html">Digital Parenting</a></li>
              <li><a href="${basePath}parent-hub/internet-safety/index.html">Internet Safety</a></li>
              <li><a href="${basePath}parent-hub/future-skills-guide/index.html">Future Skills Guide</a></li>
              <li><a href="${basePath}parent-hub/learning-tips/index.html">Learning Tips</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Blog</h4>
            <ul>
              <li><a href="${basePath}blog/index.html">Blog Overview</a></li>
              <li><a href="${basePath}blog/ai-for-kids/index.html">AI for Kids</a></li>
              <li><a href="${basePath}blog/digital-skills/index.html">Digital Skills</a></li>
              <li><a href="${basePath}blog/screen-time/index.html">Screen Time</a></li>
              <li><a href="${basePath}blog/productivity-skills/index.html">Productivity Skills</a></li>
              <li><a href="${basePath}blog/coding-for-kids/index.html">Coding for Kids</a></li>
              <li><a href="${basePath}blog/internet-safety/index.html">Internet Safety</a></li>
              <li><a href="${basePath}blog/school-education/index.html">School Education</a></li>
              <li><a href="${basePath}blog/stem-learning/index.html">STEM Learning</a></li>
              <li><a href="${basePath}blog/ai-vs-coding/index.html">AI vs Coding</a></li>
              <li><a href="${basePath}blog/coding-vs-digital-skills/index.html">Coding vs Digital Skills</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="${basePath}resources/index.html">Resources Overview</a></li>
              <li><a href="${basePath}resources/ai-tools/index.html">AI Tools</a></li>
              <li><a href="${basePath}resources/typing-practice/index.html">Typing Practice</a></li>
              <li><a href="${basePath}resources/worksheets/index.html">Worksheets</a></li>
              <li><a href="${basePath}resources/parent-guides/index.html">Parent Guides</a></li>
              <li><a href="${basePath}resources/digital-skills-checklist/index.html">Digital Skills Checklist</a></li>
              <li><a href="${basePath}resources/cyber-safety-guide/index.html">Cyber Safety Guide</a></li>
              <li><a href="${basePath}resources/free-mini-courses/index.html">Free Mini Courses</a></li>
              <li><a href="${basePath}resources/ai-prompt-guide/index.html">AI Prompt Guide</a></li>
              <li><a href="${basePath}resources/cbse-resources/index.html">CBSE Resources</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Cities</h4>
            <ul>
              <li><a href="${basePath}cities/index.html">Cities Overview</a></li>
              <li><a href="${basePath}cities/bhopal/index.html">Bhopal</a></li>
              <li><a href="${basePath}cities/indore/index.html">Indore</a></li>
              <li><a href="${basePath}cities/raipur/index.html">Raipur</a></li>
              <li><a href="${basePath}cities/delhi/index.html">Delhi</a></li>
              <li><a href="${basePath}cities/mumbai/index.html">Mumbai</a></li>
              <li><a href="${basePath}cities/pune/index.html">Pune</a></li>
              <li><a href="${basePath}cities/bangalore/index.html">Bangalore</a></li>
              <li><a href="${basePath}cities/hyderabad/index.html">Hyderabad</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="${basePath}index.html#highlights">Program Highlights</a></li>
              <li><a href="${basePath}index.html#parents">Parent Info</a></li>
              <li><a href="${basePath}index.html#faq">FAQ</a></li>
              <li><a href="${basePath}courses/digital-literacy-online-presence/index.html">Computer Basics</a></li>
              <li><a href="${basePath}courses/computational-thinking-coding-logic/index.html">Coding Course</a></li>
              <li><a href="${basePath}schools/index.html">School Partnerships</a></li>
              <li><a href="${basePath}blog/index.html">Parent Blog</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="${basePath}legal/privacy-policy.html">Privacy Policy</a></li>
              <li><a href="${basePath}legal/terms-and-conditions.html">Terms &amp; Conditions</a></li>
              <li><a href="${basePath}legal/disclaimer.html">Disclaimer</a></li>
              <li><a href="${basePath}legal/refund-policy.html">Refund Policy</a></li>
              <li><a href="${basePath}contact/support.html">Support Center</a></li>
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
        <div class="footer-program-links">
          <h4>Program Links</h4>
          <ul>
            <li><a href="${basePath}projects/index.html">Project Gallery</a></li>
            <li><a href="${basePath}parent-hub/testimonials/index.html">Testimonials</a></li>
            <li><a href="${basePath}schools/index.html">Partner Schools</a></li>
            <li><a href="${basePath}programs/admission/index.html">Admissions</a></li>
            <li><a href="${basePath}programs/scholarship/index.html">Scholarship Program</a></li>
          </ul>
        </div>
        <hr class="footer-divider">
        <!-- FOOTER CTA ROW -->
        <div class="footer-cta-row">
          <div class="footer-cta-text">
            <h3>🚀 Not Sure Yet? Try Our Free Digital Skills Demo Class First!</h3>
            <p>No commitment. Experience a live class and see the difference yourself.</p>
          </div>
          <div class="footer-cta-btns">
        <a class="btn-yellow ref-btn-footer-cta" href="${basePath}contact/book-demo.html" data-config="ctaText">${config.CTA_TEXT || "Book Free Demo"}</a>
            <a class="btn-ghost btn-ghost-footer whatsapp-link" href="#" target="_blank" rel="nofollow noopener noreferrer">✨ Download Curriculum</a>
          </div>
        </div>
        <hr class="footer-divider ref-footer-divider-top">
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} ${brand}. All Rights Reserved.</p>
          <p>Made with ❤️ for Students of India</p>
        </div>
      </div>
    `;
  }

  // Inject sticky mobile cta dynamically
  function injectStickyMobileCTA(basePath, config) {
    if (document.querySelector('.sticky-mobile-cta')) return;

    const title = config.STICKY_CTA_TITLE || "36-Day Digital Skills Program";
    const sub = config.STICKY_CTA_SUB || "Special offer · Enroll before seats fill up";
    const badge = config.STICKY_CTA_BADGE || "Limited Seats";
    const originalPrice = config.ORIGINAL_PRICE || "₹7499";
    const currentPrice = config.CURRENT_PRICE || "₹5499";
    
    const demoUrl = basePath + "contact/book-demo.html";
    const enrollUrl = basePath + "programs/admission/index.html";

    const cta = document.createElement('div');
    cta.className = 'sticky-mobile-cta new-sticky-layout ref-sticky-cta-inner';
    cta.innerHTML = `
      <div class="smc-top-row">
        <div class="smc-btns">
          <a class="smc-demo" href="${demoUrl}">Free Demo</a>
          <a aria-label="Message on Facebook Messenger" class="smc-icon-btn messenger" href="https://m.me/skillnest.co.in" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.91 1.45 5.51 3.71 7.15.19.14.3.36.3.59l-.02 1.78c0 .4.42.69.78.52l1.98-.93c.18-.08.38-.1.57-.05 1.05.28 2.16.44 3.32.44 5.52 0 10-4.14 10-9.25S17.52 2 12 2zm1.25 12.25L10.5 11.5l-3.5 3.5 3.85-4.1c.14-.15.37-.15.51 0l2.75 2.75 3.5-3.5-3.86 4.1c-.13.15-.36.15-.5 0z"/></svg>
          </a>
          <a aria-label="Follow on Instagram" class="smc-icon-btn instagram" href="https://www.instagram.com/skillnest.co.in/" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a aria-label="Message on Telegram" class="smc-icon-btn telegram" href="https://t.me/+917470554811?text=I%20want%20details%20about%20digital%20learning%20program." target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15.82-1.87 8.02-2.74 8.48-.48.25-.97.12-1.36-.16-.36-.26-1.93-1.24-2.22-1.5-.24-.22-.04-.64.18-.84.45-.4 3.03-2.81 3.52-3.32.22-.23.15-.33-.09-.16-1.02.7-3.9 2.62-4.48 3.02-.34.23-.74.12-1.01-.06-.59-.38-1.5-.95-1.92-1.21-.4-.25-.33-.67.15-.88.92-.41 8.9-3.87 9.87-4.22.42-.15.82-.08.96.22.09.2.04.6-.1.87z"/></svg>
          </a>
          <a aria-label="Email support" class="smc-icon-btn email" href="mailto:admin@skillnest.co.in?subject=Digital%20Learning%20Program%20Inquiry&body=I%20want%20details%20about%20digital%20learning%20program.">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(cta);
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
      footerEl.innerHTML = getFooterHTML(basePath, config);
    }

    // 3b. Inject SEO Quick Links block after footer if not already present
    if (!document.querySelector('.ref-footer-bottom-dark')) {
      const seoBlock = document.createElement('div');
      seoBlock.className = 'ref-footer-bottom-dark';
      seoBlock.innerHTML = `
        <div class="container">
          <p class="ref-text-muted-sm">Explore More:</p>
          <div class="ref-flex-wrap-center-sm">
            <a class="ref-text-link-white" href="${basePath}index.html">Home</a>
            <a class="ref-text-link-white" href="${basePath}courses/index.html">All Courses</a>
            <a class="ref-text-link-white" href="${basePath}cities/mumbai/index.html">Classes in Mumbai</a>
            <a class="ref-text-link-white" href="${basePath}cities/delhi/index.html">Classes in Delhi</a>
            <a class="ref-text-link-white" href="${basePath}cities/bangalore/index.html">Classes in Bangalore</a>
            <a class="ref-text-link-white" href="${basePath}cities/bhopal/computer-classes/index.html">Classes in Bhopal</a>
            <a class="ref-text-link-white" href="${basePath}cities/indore/index.html">Classes in Indore</a>
            <a class="ref-text-link-white" href="${basePath}cities/pune/index.html">Classes in Pune</a>
            <a class="ref-text-link-white" href="${basePath}cities/hyderabad/index.html">Coding in Hyderabad</a>
            <a class="ref-text-link-white" href="${basePath}cities/chennai/index.html">AI Classes in Chennai</a>
            <a class="ref-text-link-white" href="${basePath}cities/kolkata/index.html">Digital Skills in Kolkata</a>
            <a class="ref-text-link-white" href="${basePath}courses/ai-classes-for-students/index.html">AI Classes for Students</a>
            <a class="ref-text-link-white" href="${basePath}courses/computational-thinking-coding-logic/index.html">Coding Classes India</a>
            <a class="ref-text-link-white" href="${basePath}courses/digital-literacy-online-presence/index.html">Computer Classes for Teenagers</a>
            <a class="ref-text-link-white" href="${basePath}courses/digital-literacy-online-presence/index.html">Digital Skills for Kids</a>
            <a class="ref-text-link-white" href="${basePath}blog/index.html">Blog</a>
            <a class="ref-text-link-white" href="${basePath}projects/index.html">Student Projects</a>
            <a class="ref-text-link-white" href="${basePath}parent-hub/testimonials/index.html">Parent Reviews</a>
          </div>
        </div>`;
      const footerRef = document.querySelector('footer.footer') || document.querySelector('footer');
      if (footerRef && footerRef.parentNode) {
        footerRef.insertAdjacentElement('afterend', seoBlock);
      } else {
        document.body.appendChild(seoBlock);
      }
    }

    // 4. Dynamic component injection for Sticky Mobile CTA
    injectStickyMobileCTA(basePath, config);
  }

  // Run on DOMContentLoaded (and immediately if already loaded)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfigAndComponents);
  } else {
    initConfigAndComponents();
  }
})();
