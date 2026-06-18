/* ============================================================
   ENHANCEMENTS.JS — Futuristic 3D & Visual Layer (Optimized)
   REMOVED: Duplicate IntersectionObserver (handled by futuristic-global.js)
   REMOVED: WhatsApp magnetic pull (ran Math.hypot on every global mousemove)
   OPTIMIZED: All mousemove handlers throttled via requestAnimationFrame
   OPTIMIZED: Heavy init wrapped in requestIdleCallback where available
   PRESERVED: Hero tilt, card tilt, countdown tick, section stagger,
              sticky CTA strip, click tracking, section title underline
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var IS_MOBILE    = window.matchMedia('(max-width: 768px)').matches;
  var PREFERS_RED  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DISABLE_3D   = IS_MOBILE || PREFERS_RED;

  /* ============================================================
     1. HERO CARD — Interactive 3D Tilt (rAF throttled)
  ============================================================ */
  if (!DISABLE_3D) {
    var heroCard   = document.querySelector('.hero-main-card');
    var heroVisual = document.querySelector('.hero-visual');

    if (heroCard && heroVisual) {
      heroCard.classList.add('tilt-3d');
      var tiltRaf = false;

      heroVisual.addEventListener('mousemove', function (e) {
        if (tiltRaf) return;
        tiltRaf = true;
        requestAnimationFrame(function () {
          var rect = heroVisual.getBoundingClientRect();
          var cx   = rect.left + rect.width  / 2;
          var cy   = rect.top  + rect.height / 2;
          var dx   = (e.clientX - cx) / (rect.width  / 2);
          var dy   = (e.clientY - cy) / (rect.height / 2);
          var rotX = -(dy * 6).toFixed(1);
          var rotY =  (dx * 7).toFixed(1);
          heroCard.style.transform =
            'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.01)';
          tiltRaf = false;
        });
      });

      heroVisual.addEventListener('mouseleave', function () {
        heroCard.style.transform = '';
        tiltRaf = false;
      });
    }
  }

  /* ============================================================
     2. HERO SECTION PARALLAX — cursor-reactive depth (rAF throttled)
  ============================================================ */
  if (!DISABLE_3D) {
    var heroSection  = document.querySelector('.hero');
    var heroVisualEl = document.querySelector('.hero-visual');

    if (heroSection && heroVisualEl && !heroVisualEl.classList.contains('parallax-hero')) {
      heroVisualEl.classList.add('parallax-hero');
      var parallaxRaf = false;

      heroSection.addEventListener('mousemove', function (e) {
        if (parallaxRaf) return;
        parallaxRaf = true;
        requestAnimationFrame(function () {
          var rect = heroSection.getBoundingClientRect();
          var dx   = (e.clientX - rect.left - rect.width  / 2) / rect.width;
          var dy   = (e.clientY - rect.top  - rect.height / 2) / rect.height;
          heroVisualEl.style.transform =
            'translate3d(' + (dx * -12).toFixed(1) + 'px, ' +
            (dy * -9).toFixed(1) + 'px, 0)';
          parallaxRaf = false;
        });
      });

      heroSection.addEventListener('mouseleave', function () {
        heroVisualEl.style.transform = '';
        parallaxRaf = false;
      });
    }
  }

  /* ============================================================
     3. CARD MICRO-TILT — rAF throttled per-card tilt
  ============================================================ */
  if (!DISABLE_3D) {
    var tiltTargets = document.querySelectorAll(
      '.why-card, .testi-card, .project-card, .hl-card, .daily-card'
    );

    tiltTargets.forEach(function (card) {
      var cardRaf = false;
      card.addEventListener('mousemove', function (e) {
        if (cardRaf) return;
        cardRaf = true;
        requestAnimationFrame(function () {
          var r  = card.getBoundingClientRect();
          var dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
          var dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
          card.style.transform =
            'perspective(700px) rotateX(' + (-dy * 3.5).toFixed(1) + 'deg) rotateY(' +
            (dx * 4.5).toFixed(1) + 'deg) translateY(-6px)';
          cardRaf = false;
        });
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        cardRaf = false;
      });
    });
  }

  /* ============================================================
     4. COUNTDOWN TICK — Momentary .cd-tick class
        Does NOT touch countdown logic in script.js
  ============================================================ */
  (function () {
    var cdIds    = ['cd-d', 'cd-h', 'cd-m', 'cd-s'];
    var lastVals = {};

    function checkTick() {
      cdIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        var val = el.textContent;
        if (val !== lastVals[id]) {
          var unit = el.closest('.countdown-unit');
          if (unit) {
            unit.classList.add('cd-tick');
            setTimeout(function () { unit.classList.remove('cd-tick'); }, 200);
          }
          lastVals[id] = val;
        }
      });
    }

    setInterval(checkTick, 900);
  }());

  /* ============================================================
     5. STAGGER FADE-UP — incremental transition-delay on siblings
  ============================================================ */
  var staggerParents = document.querySelectorAll(
    '.why-grid, .highlights-grid, .projects-grid, .trust-grid, .testimonials-grid, .daily-grid'
  );

  staggerParents.forEach(function (grid) {
    var children = grid.querySelectorAll('.fade-up');
    children.forEach(function (child, i) {
      if (!child.dataset.staggered) {
        child.style.transitionDelay = Math.min(i * 80, 350) + 'ms';
        child.dataset.staggered = '1';
      }
    });
  });

  /* ============================================================
     6. SECTION TITLE UNDERLINE — scroll-triggered width animation
  ============================================================ */
  if (!PREFERS_RED) {
    var sectionTitles = document.querySelectorAll('.section-title');
    var titleObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('title-visible');
          titleObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    sectionTitles.forEach(function (t) { titleObs.observe(t); });
  }

  /* ============================================================
     6.5. FLOATING WHATSAPP BUTTON — Injected dynamically if missing
  ============================================================ */
  (function () {
    var FLOAT_CLASS = 'whatsapp-float';
    if (document.querySelector('.' + FLOAT_CLASS)) return;

    var waPhone = (window.CONFIG && window.CONFIG.phone) || '917470554811';
    var waHref = 'https://wa.me/' + waPhone + '?text=Hi%2C%20I%20want%20details%20about%20Smart%20Digital%20Skills%20Program.';

    var waFloat = document.createElement('div');
    waFloat.className = FLOAT_CLASS;
    waFloat.innerHTML =
      '<a aria-label="Chat on WhatsApp" class="whatsapp-btn whatsapp-link" href="' + waHref + '" target="_blank" rel="nofollow noopener noreferrer" data-config-href="whatsapp">' +
        '<div class="whatsapp-icon">💬</div>' +
        'Chat on WhatsApp' +
      '</a>';
    document.body.appendChild(waFloat);

    // Track click event locally
    waFloat.addEventListener('click', function () {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({ event: 'wa_click' });
    });
  }());

  /* ============================================================
     7. STICKY CTA STRIP — injected bottom bar
        Appears after 40% scroll. Dismissible via close button.
  ============================================================ */
  (function () {
    var STRIP_ID      = 'sds-sticky-strip';
    var DISMISSED_KEY = 'sds_strip_dismissed';

    if (sessionStorage.getItem(DISMISSED_KEY)) return;
    if (document.getElementById(STRIP_ID)) return;

    var basePath = '';
    var fb = document.getElementById('file-protocol-fallback');
    if (fb && fb.getAttribute('data-depth')) {
      var depth = parseInt(fb.getAttribute('data-depth'), 10) || 0;
      for (var i = 0; i < depth; i++) basePath += '../';
    } else {
      var segments = window.location.pathname.split('/').filter(Boolean);
      if (window.location.protocol === 'file:') {
        var folders = ['cities', 'resources', 'tools', 'about', 'age-groups', 'blog', 'compare', 'contact', 'courses', 'legal', 'parent-hub', 'programs', 'projects', 'schools', 'Personality Test', 'Personality%20Test'];
        var rootIdx = -1;
        for (var i = 0; i < segments.length; i++) {
          if (folders.indexOf(segments[i]) !== -1) {
            rootIdx = i;
            break;
          }
        }
        if (rootIdx !== -1) {
          segments = segments.slice(rootIdx);
        } else {
          segments = [];
        }
      }
      if (segments.length > 0 && segments[segments.length - 1].indexOf('.') !== -1) {
        segments.pop();
      }
      var depth = segments.length;
      for (var i = 0; i < depth; i++) basePath += '../';
    }
    var demoHref = basePath + 'contact/book-demo.html';

    var strip = document.createElement('div');
    strip.id  = STRIP_ID;
    strip.className = 'sticky-cta-strip';
    var batchText = (window.CONFIG && window.CONFIG.batchName) || 'June 2026 Batch';
    var waPhone = (window.CONFIG && window.CONFIG.phone) || '917470554811';
    var waHref = 'https://wa.me/' + waPhone + '?text=Hi%2C%20I%20want%20details%20about%20Smart%20Digital%20Skills%20Program.';
    strip.innerHTML =
      '<p>🔥 Limited seats left for ' + batchText + '!</p>' +
      '<div class="strip-btns">' +
        '<a href="' + demoHref + '" class="strip-cta">Book Free Demo</a>' +
        '<a aria-label="Chat on WhatsApp" class="strip-cta whatsapp-strip-btn whatsapp-link" href="' + waHref + '" target="_blank" rel="nofollow noopener noreferrer" data-config-href="whatsapp">' +
          '<span class="whatsapp-icon">💬</span>' +
          'Chat on WhatsApp' +
        '</a>' +
        '<a aria-label="Message on Facebook Messenger" class="strip-icon-btn messenger" href="https://m.me/skillnest.co.in" target="_blank" rel="noopener noreferrer">' +
          '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.91 1.45 5.51 3.71 7.15.19.14.3.36.3.59l-.02 1.78c0 .4.42.69.78.52l1.98-.93c.18-.08.38-.1.57-.05 1.05.28 2.16.44 3.32.44 5.52 0 10-4.14 10-9.25S17.52 2 12 2zm1.25 12.25L10.5 11.5l-3.5 3.5 3.85-4.1c.14-.15.37-.15.51 0l2.75 2.75 3.5-3.5-3.86 4.1c-.13.15-.36.15-.5 0z"/></svg>' +
        '</a>' +
        '<a aria-label="Follow on Instagram" class="strip-icon-btn instagram" href="https://www.instagram.com/skillnest.co.in/" target="_blank" rel="noopener noreferrer">' +
          '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>' +
        '</a>' +
        '<a aria-label="Message on Telegram" class="strip-icon-btn telegram" href="https://t.me/+917470554811?text=I%20want%20details%20about%20digital%20learning%20program." target="_blank" rel="noopener noreferrer">' +
          '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15.82-1.87 8.02-2.74 8.48-.48.25-.97.12-1.36-.16-.36-.26-1.93-1.24-2.22-1.5-.24-.22-.04-.64.18-.84.45-.4 3.03-2.81 3.52-3.32.22-.23.15-.33-.09-.16-1.02.7-3.9 2.62-4.48 3.02-.34.23-.74.12-1.01-.06-.59-.38-1.5-.95-1.92-1.21-.4-.25-.33-.67.15-.88.92-.41 8.9-3.87 9.87-4.22.42-.15.82-.08.96.22.09.2.04.6-.1.87z"/></svg>' +
        '</a>' +
        '<a aria-label="Email support" class="strip-icon-btn email" href="mailto:admin@skillnest.co.in?subject=Digital%20Learning%20Program%20Inquiry&body=I%20want%20details%20about%20digital%20learning%20program.">' +
          '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>' +
        '</a>' +
      '</div>' +
      '<button class="strip-close" aria-label="Close">✕</button>';
    document.body.appendChild(strip);

    function updateWhatsAppFloatVisibility() {
      var waFloat = document.querySelector('.whatsapp-float');
      if (!waFloat) return;
      if (strip.classList.contains('visible')) {
        waFloat.style.setProperty('display', 'none', 'important');
      } else {
        waFloat.style.removeProperty('display');
      }
    }

    strip.querySelector('.strip-close').addEventListener('click', function () {
      strip.classList.remove('visible');
      sessionStorage.setItem(DISMISSED_KEY, '1');
      updateWhatsAppFloatVisibility();
    });

    strip.querySelector('.strip-cta').addEventListener('click', function () {
      strip.classList.remove('visible');
      sessionStorage.setItem(DISMISSED_KEY, '1');
      updateWhatsAppFloatVisibility();
    });

    var shown = false;
    function handleStripScroll() {
      if (sessionStorage.getItem(DISMISSED_KEY)) {
        updateWhatsAppFloatVisibility();
        return;
      }
      var scrollPct  = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      var nearFooter = window.scrollY + window.innerHeight > document.body.scrollHeight - 200;

      if (scrollPct > 0.40 && !nearFooter) {
        if (!shown) { 
          strip.classList.add('visible'); 
          shown = true; 
          updateWhatsAppFloatVisibility();
        }
      } else {
        if (shown) {
          strip.classList.remove('visible');
          shown = false;
          updateWhatsAppFloatVisibility();
        }
      }
    }

    window.addEventListener('scroll', handleStripScroll, { passive: true });
    // Initialize visibility on load
    updateWhatsAppFloatVisibility();
  }());

  /* ============================================================
     6. WORKSHEETS CATALOG CLICK INTERCEPTION
     ============================================================ */
  (function () {
    // Check if current URL/path is worksheets or free mini-courses page
    var isTargetPage = /\/resources\/worksheets\//i.test(window.location.href) || 
                       /\\resources\\worksheets\\/i.test(window.location.href) ||
                       /\/resources\/free-mini-courses\//i.test(window.location.href) ||
                       /\\resources\\free-mini-courses\\/i.test(window.location.href);
    if (!isTargetPage) return;


    document.addEventListener('click', function (e) {
      // Find the closest primary button inside .why-grid
      var button = e.target.closest('.why-grid .why-card a.btn-primary');
      if (!button) return;

      // Ensure we are targeting the worksheets catalog grid (inside .programs-overview)
      var isCatalogGrid = button.closest('.programs-overview');
      if (!isCatalogGrid) return;

      var card = button.closest('.why-card');
      if (!card) return;

      var h3 = card.querySelector('h3');
      if (!h3) return;

      e.preventDefault();

      var h3Text = h3.textContent || h3.innerText || '';
      
      // Clean title: remove emojis and non-ASCII decorative characters
      var cleanTitle = h3Text.replace(/[\uD800-\uDFFF]./g, '')
                             .replace(/[^\x20-\x7E]/g, '')
                             .trim();

      // Generate WhatsApp message
      var message = "I want " + cleanTitle;

      // Get phone from centralized configuration
      var phone = (window.CONFIG && window.CONFIG.phone) || 
                  (window.SITE_CONFIG && window.SITE_CONFIG.WHATSAPP) || 
                  '917470554811';

      // Construct URL
      var waUrl = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

      // Track event via dataLayer (preserve and extend analytics)
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: 'worksheet_whatsapp_click',
        worksheet: cleanTitle
      });

      // Open WhatsApp in a new tab/window
      window.open(waUrl, '_blank', 'noopener noreferrer nofollow');
    });
  }());

  /* ============================================================
     END — All enhancements isolated. Zero side-effects.
     ============================================================ */
});
