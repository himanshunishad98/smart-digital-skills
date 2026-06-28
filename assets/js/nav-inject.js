/**
 * nav-inject.js
 * Standardized navigation controller for SkillNest.
 * Injects breadcrumbs, handles active link states, and manages mobile & desktop dropdown states.
 */
(function () {
  'use strict';

  // 1. Resolve relative prefix depth
  var depth = 0;
  var fallbackScript = document.getElementById('file-protocol-fallback');
  if (fallbackScript) {
    var attrDepth = fallbackScript.getAttribute('data-depth');
    if (attrDepth !== null) {
      depth = parseInt(attrDepth, 10) || 0;
    }
  }
  var prefix = '';
  for (var i = 0; i < depth; i++) {
    prefix += '../';
  }

  // Helper to resolve clean URL offsets for file://
  function resolveUrl(url) {
    if (window.location.protocol === 'file:') {
      if (url === '/') return prefix + 'index.html';
      if (url.startsWith('/') && !url.startsWith('//')) {
        var hashIndex = url.indexOf('#');
        var pathPart = hashIndex !== -1 ? url.substring(0, hashIndex) : url;
        var hashPart = hashIndex !== -1 ? url.substring(hashIndex) : '';

        var cleanUrl = prefix + pathPart.slice(1);
        if (cleanUrl.endsWith('/')) {
          cleanUrl += 'index.html';
        }
        return cleanUrl + hashPart;
      }
    }
    return url;
  }

  // 2. Active Link Highlighting
  function highlightActive() {
    var pathname = window.location.pathname;
    
    // Determine active category keyword
    var activeKeyword = '';
    if (pathname.indexOf('/programs/') !== -1) activeKeyword = 'PROGRAMS';
    else if (pathname.indexOf('/courses/') !== -1) activeKeyword = 'COURSES';
    else if (pathname.indexOf('/age-groups/') !== -1) activeKeyword = 'AGE GROUPS';
    else if (pathname.indexOf('/learning-paths/') !== -1) activeKeyword = 'LEARNING PATHS';
    else if (pathname.indexOf('/compare/') !== -1) activeKeyword = 'COMPARE';
    else if (pathname.indexOf('/tools/') !== -1) activeKeyword = 'TOOLS';
    else if (pathname.indexOf('/resources/') !== -1) activeKeyword = 'RESOURCES';
    else if (pathname.indexOf('/blog/') !== -1) activeKeyword = 'BLOG';
    else if (pathname.indexOf('/parent-hub/') !== -1) activeKeyword = 'PARENT HUB';
    else if (pathname.indexOf('/schools/') !== -1) activeKeyword = 'SCHOOLS';
    else if (pathname.indexOf('/projects/') !== -1) activeKeyword = 'PROJECTS';
    else if (pathname.indexOf('/contact/') !== -1) activeKeyword = 'CONTACT';
    else if (pathname.indexOf('/cities/') !== -1) {
      // Highlight COURSES or PROGRAMS for city SEO topic pages
      if (pathname.indexOf('coding') !== -1) activeKeyword = 'COURSES';
      else if (pathname.indexOf('computer') !== -1) activeKeyword = 'COURSES';
      else if (pathname.indexOf('ai-classes') !== -1) activeKeyword = 'COURSES';
      else activeKeyword = 'CITIES';
    }

    if (!activeKeyword) return;

    // Highlight desktop links
    var desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
    desktopLinks.forEach(function(link) {
      if (link.textContent.trim().toUpperCase().indexOf(activeKeyword) !== -1) {
        link.classList.add('nav-active');
      }
    });

    // Highlight mobile triggers/links
    var mobileLinks = document.querySelectorAll('.mobile-menu-list a, .mobile-menu-list .mobile-trigger');
    mobileLinks.forEach(function(link) {
      if (link.textContent.trim().toUpperCase().indexOf(activeKeyword) !== -1) {
        link.classList.add('nav-active');
        if (link.classList.contains('mobile-trigger')) {
          link.classList.add('active');
        }
      }
    });
  }

  // 3. Dynamic Breadcrumb Injection (Visual + JSON-LD Schema)
  function injectBreadcrumbs() {
    // Only inject on nested pages (depth > 0)
    if (depth <= 0) return;

    // Don't inject on redirect stubs or layout templates
    var mainEl = document.querySelector('main');
    if (!mainEl || document.querySelector('meta[http-equiv="refresh"]')) return;

    var pathname = window.location.pathname;
    var segments = pathname.split('/').filter(Boolean);

    // Skip if not a city page, course page, program page, or tool page
    var allowedSilos = ['cities', 'courses', 'programs', 'age-groups', 'learning-paths', 'compare', 'parent-hub', 'tools', 'resources', 'blog', 'schools', 'projects', 'legal'];
    if (segments.length === 0 || allowedSilos.indexOf(segments[0]) === -1) return;

    // Map segments to readable titles
    var titleMap = {
      'cities': 'Cities',
      'courses': 'Courses',
      'programs': 'Programs',
      'age-groups': 'Age Groups',
      'ages-8-10': 'Ages 8–10',
      'ages-11-13': 'Ages 11–13',
      'ages-14-16': 'Ages 14–16',
      'learning-paths': 'Learning Paths',
      'beginner-digital-skills': 'Beginner Digital Skills',
      'intermediate-digital-skills': 'Intermediate Digital Skills',
      'advanced-digital-skills': 'Advanced Digital Skills',
      'compare': 'Compare',
      'coding-vs-digital-skills': 'Coding vs Digital Skills',
      'ai-vs-coding': 'AI vs Coding for Kids',
      'ai-vs-coding-for-kids': 'AI vs Coding for Kids',
      'online-vs-offline-learning': 'Online vs Offline Classes',
      'online-vs-offline-computer-classes': 'Online vs Offline Computer Classes',
      'skillnest-vs-traditional-computer-classes': 'SkillNest vs Traditional Classes',
      'parent-hub': 'Parent Hub',
      'tools': 'Tools',
      'typing-speed-test': 'Typing Speed Test',
      'password-strength-checker': 'Password Strength Checker',
      'ai-prompt-generator': 'AI Prompt Generator',
      'digital-readiness-quiz': 'Digital Readiness Quiz',
      'productivity-calculator': 'Productivity Calculator',
      'resources': 'Resources',
      'blog': 'Blog',
      'schools': 'Schools',
      'projects': 'Projects',
      'legal': 'Legal',
      'testimonials': 'Testimonials',
      'admission': 'Admissions',
      'scholarship': 'Scholarship',
      'summer-camp': 'Future Skills Academy',
      'personality-test': 'Personality Test',
      'assessment': 'Assessment',
      'register': 'Registration',
      'result': 'Result'
    };

    function cleanTitle(segment) {
      if (titleMap[segment]) return titleMap[segment];
      // Convert dashes to spaces and capitalize
      return segment.split('-').map(function(word) {
        if (word.toUpperCase() === 'AI') return 'AI';
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    }

    // Build breadcrumb trails
    var trail = [{ name: 'Home', url: '/' }];
    var accumulatedPath = '';

    for (var idx = 0; idx < segments.length; idx++) {
      var seg = segments[idx];
      if (seg === 'index.html' || seg === 'index.htm') continue;
      accumulatedPath += '/' + seg;
      trail.push({
        name: cleanTitle(seg),
        url: accumulatedPath + '/'
      });
    }

    // Build visual breadcrumb list
    var breadcrumbBar = document.createElement('div');
    breadcrumbBar.className = 'res-breadcrumb-bar';
    breadcrumbBar.setAttribute('aria-label', 'Breadcrumb');

    var container = document.createElement('div');
    container.className = 'container';

    var ul = document.createElement('ul');
    ul.className = 'res-breadcrumb';

    trail.forEach(function(item, idx) {
      var li = document.createElement('li');
      if (idx === trail.length - 1) {
        li.className = 'bc-current';
        li.textContent = item.name;
        li.setAttribute('aria-current', 'page');
      } else {
        var a = document.createElement('a');
        a.href = resolveUrl(item.url);
        a.textContent = item.name;
        li.appendChild(a);

        var sep = document.createElement('span');
        sep.className = 'bc-sep';
        sep.textContent = '>';
        li.appendChild(sep);
      }
      ul.appendChild(li);
    });

    container.appendChild(ul);
    breadcrumbBar.appendChild(container);

    // Prepend before main content (or inside body if main is nested)
    if (mainEl.parentNode) {
      mainEl.parentNode.insertBefore(breadcrumbBar, mainEl);
    }

    // Inject JSON-LD Schema
    var schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": trail.map(function(item, idx) {
        var domain = "https://skillnest.co.in";
        return {
          "@type": "ListItem",
          "position": idx + 1,
          "name": item.name,
          "item": item.url === '/' ? domain + '/' : domain + item.url
        };
      })
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  // 4. Attach Mobile Accordion Menu Click Event Handlers
  function initMobileMenu() {
    var triggers = document.querySelectorAll('.mobile-trigger');
    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        var submenu = trigger.nextElementSibling;
        if (!submenu || !submenu.classList.contains('mobile-submenu')) return;

        var isOpen = submenu.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) {
          trigger.classList.add('active');
        } else {
          trigger.classList.remove('active');
        }
      });
    });

    // Mobile nav overlay toggles
    var toggleBtn = document.getElementById('mobileNavToggle');
    var closeBtn = document.getElementById('mobileNavClose');
    var menuOverlay = document.getElementById('mobileNavMenu');

    if (toggleBtn && menuOverlay) {
      toggleBtn.addEventListener('click', function() {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
        if (closeBtn) closeBtn.focus();
      });
    }

    if (closeBtn && menuOverlay) {
      closeBtn.addEventListener('click', function() {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (toggleBtn) toggleBtn.focus();
      });
    }

    // Close mobile nav on overlay click outside the list
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
          menuOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // 5. Desktop Keyboard & Click Accessibility
  function initDesktopMenuAccessibility() {
    var dropdowns = document.querySelectorAll('.desktop-nav .nav-item.dropdown');
    dropdowns.forEach(function(dropdown) {
      var trigger = dropdown.querySelector('.dropdown-toggle');
      var menu = dropdown.querySelector('.dropdown-menu');

      if (!trigger || !menu) return;

      // Handle hover trigger accessibility updates
      dropdown.addEventListener('mouseenter', function() {
        trigger.setAttribute('aria-expanded', 'true');
      });
      dropdown.addEventListener('mouseleave', function() {
        trigger.setAttribute('aria-expanded', 'false');
      });

      // Escape key listener to close dropdowns
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 6. Init layout bindings
  function init() {
    highlightActive();
    injectBreadcrumbs();
    initMobileMenu();
    initDesktopMenuAccessibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
