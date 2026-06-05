/* ============================================================
   COLOR-DYNAMICS.JS — Dynamic Color Layer (Optimized)
   REMOVED: updateProximity() rAF loop (getBoundingClientRect on
            every card every mousemove frame = very expensive)
   REMOVED: countdown MutationObserver (low value, high overhead)
   REMOVED: button press inline style manipulation
   KEPT: class injection (cd-glow, cd-card, cd-btn-shift setup)
   KEPT: hero stat icon hover (event-driven = efficient)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var IS_MOBILE   = window.matchMedia('(max-width: 768px)').matches;
  var PREFERS_RED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     1. ADD .cd-glow to glow-eligible elements
  ============================================================ */
  document.querySelectorAll('.seats-badge, .section-tag, .float-card').forEach(function (el) {
    el.classList.add('cd-glow');
  });

  /* ============================================================
     2. ADD .cd-card + stagger offset to interactive cards
  ============================================================ */
  var cardSelectors = [
    '.why-card', '.hl-card', '.testi-card',
    '.project-card', '.trust-card', '.daily-card'
  ];
  document.querySelectorAll(cardSelectors.join(',')).forEach(function (card, i) {
    card.classList.add('cd-card');
    card.style.setProperty('--cd-stagger', (i % 6) * 0.55 + 's');
  });

  /* ============================================================
     3. ADD .cd-btn-shift to CTA buttons
  ============================================================ */
  document.querySelectorAll('.btn-primary, .btn-yellow, .btn-ghost').forEach(function (btn) {
    btn.classList.add('cd-btn-shift');
  });

  /* ============================================================
     4. HERO BACKGROUND COLOR FLOW — inject .cd-hero-orb div
  ============================================================ */
  var hero = document.querySelector('.hero');
  if (hero && !document.querySelector('.cd-hero-orb')) {
    var orb = document.createElement('div');
    orb.className = 'cd-hero-orb';
    hero.insertBefore(orb, hero.firstChild);
  }

  /* ============================================================
     5. PREMIUM CARD REFLECT
  ============================================================ */
  document.querySelectorAll(
    '.hero-main-card, .form-wrapper, .pricing-card, .level-card'
  ).forEach(function (el) {
    el.classList.add('cd-reflect');
  });

  /* ============================================================
     6. HERO STAT ICONS — hover-only color accent (event-driven)
  ============================================================ */
  document.querySelectorAll('.hero-stat-icon').forEach(function (icon) {
    icon.addEventListener('mouseenter', function () {
      icon.style.boxShadow = '0 0 14px rgba(6,182,212,.45), 0 0 28px rgba(6,182,212,.15)';
      icon.style.transition = 'box-shadow .28s ease, transform .28s ease';
    });
    icon.addEventListener('mouseleave', function () {
      icon.style.boxShadow = '';
    });
  });

  /* ============================================================
     END — Fully isolated. Zero side-effects on existing code.
  ============================================================ */
});
