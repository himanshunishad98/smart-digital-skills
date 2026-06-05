/**
 * futuristic-global.js — Site-Wide Futuristic Layer (Optimized)
 * Scroll reveal, sticky header, smooth scroll, mobile nav
 * REMOVED: ambient particle system (filter:blur expensive paint)
 * OPTIMIZED: Consolidated observers, passive scroll listeners
 */

(function () {
  'use strict';

  /* ── 1. Sticky Header scroll class ── */
  const header = document.getElementById('mainHeader');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 2. Unified Scroll-reveal: .fg-reveal and .fade-up ── */
  const revealEls = document.querySelectorAll('.fg-reveal, .fade-up');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('fg-visible', 'visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ── 3. Section title underline trigger ── */
  const titles = document.querySelectorAll('.section-title');
  if (titles.length) {
    const tio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('title-visible');
          tio.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    titles.forEach(t => tio.observe(t));
  }

  /* ── 4. Mobile nav toggle ── */
  const toggle = document.getElementById('mobileNavToggle');
  const menu   = document.getElementById('mobileNavMenu');
  const close  = document.getElementById('mobileNavClose');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.add('open'));
    if (close) close.addEventListener('click', () => menu.classList.remove('open'));
    menu.addEventListener('click', (e) => {
      if (e.target === menu) menu.classList.remove('open');
    });
  }

  /* ── 5. Dynamic class injection ── */
  const isMobile = () => window.innerWidth <= 768;

  function applyDynamicClasses() {
    if (isMobile()) return; // skip heavy effects on mobile

    document.querySelectorAll(
      '.why-card,.hl-card,.testi-card,.project-card,.trust-card,.daily-card,.review-card,.gallery-card'
    ).forEach((el, i) => {
      el.classList.add('cd-card');
      el.style.setProperty('--cd-stagger', (i * 0.45) + 's');
    });

    document.querySelectorAll('.seats-badge,.section-tag').forEach(el => {
      el.classList.add('cd-glow');
    });

    document.querySelectorAll('.btn-primary,.btn-yellow').forEach(el => {
      el.classList.add('cd-btn-shift');
    });

    document.querySelectorAll('.float-card').forEach(el => {
      el.classList.add('cd-glow');
    });

    // Hero orb injection
    const hero = document.querySelector('.hero, .page-hero');
    if (hero && !hero.querySelector('.cd-hero-orb')) {
      const orb = document.createElement('div');
      orb.className = 'cd-hero-orb';
      hero.appendChild(orb);
    }

    // Reflect on premium cards
    document.querySelectorAll(
      '.hero-main-card,.form-wrapper,.pricing-card,.level-card'
    ).forEach(el => {
      el.classList.add('cd-reflect');
    });
  }

  applyDynamicClasses();

  /* ── 6. Tilt 3D on hero card (desktop only, rAF throttled) ── */
  const tiltCard = document.querySelector('.hero-main-card');
  if (tiltCard && !isMobile()) {
    tiltCard.classList.add('tilt-3d', 'parallax-hero', 'cd-reflect');
    let rafPending = false;
    tiltCard.addEventListener('mousemove', (e) => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        const rect = tiltCard.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        tiltCard.style.transform = `perspective(900px) rotateX(${(-dy * 6).toFixed(1)}deg) rotateY(${(dx * 6).toFixed(1)}deg) translateZ(4px)`;
        rafPending = false;
      });
    });
    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = '';
      rafPending = false;
    });
  }

  /* ── 7. Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 8. fg-reveal: mark section cards for reveal ── */
  document.querySelectorAll(
    '.review-card, .gallery-card, article, .b2b-feature-card, .fg-card'
  ).forEach((el, i) => {
    if (!el.classList.contains('fg-reveal') && !el.classList.contains('fade-up')) {
      el.classList.add('fg-reveal');
      if (i % 3 === 1) el.classList.add('fg-reveal-delay-1');
      if (i % 3 === 2) el.classList.add('fg-reveal-delay-2');
    }
  });

  // Re-observe newly added fg-reveal elements
  const newReveal = document.querySelectorAll('.fg-reveal:not(.fg-visible)');
  if (newReveal.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('fg-visible');
          io2.unobserve(e.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });
    newReveal.forEach(el => io2.observe(el));
  }

})();
