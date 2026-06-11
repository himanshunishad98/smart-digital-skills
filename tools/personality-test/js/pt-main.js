/* =============================================
   HEXACO Personality Inventory — main.js
   Handles: navbar, mobile menu, active links,
   assessment interactions, results bar animation
   ============================================= */

/* ─── Navbar: scroll shadow + mobile toggle ─── */
(function initNavbar() {
  const navbar  = document.querySelector('.navbar');
  const toggle  = document.querySelector('.navbar__toggle');
  const drawer  = document.querySelector('.navbar__drawer');

  if (!navbar) return;

  // Shadow on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  // Hamburger toggle
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mark active nav link
  const currentPage = location.pathname.split('/').pop() || 'pt-index.html';
  document.querySelectorAll('.navbar__link, .navbar__drawer .navbar__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'pt-index.html')) {
      link.classList.add('active');
    }
  });
})();


/* ─── Animate-on-scroll (fade-up cards) ─── */
(function initAOS() {
  const els = document.querySelectorAll(
    '.feature-card, .dim-card, .process-step, .stat-card, .dim-score-card'
  );
  if (!els.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add('animate-fade-up');
        io.unobserve(target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => {
    el.style.opacity = '0';          // hide before animation
    io.observe(el);
  });
})();


/* ─── Assessment page ─── */
(function initAssessment() {
  /* ── Section tab switching ── */
  const tabs = document.querySelectorAll('.section-tab');
  const sections = document.querySelectorAll('.question-section');

  function switchTab(targetId) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.section === targetId));
    sections.forEach(s => {
      s.hidden = (s.id !== targetId);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.section));
  });

  /* ── Mark question cards answered ── */
  document.querySelectorAll('.question-card').forEach(card => {
    const radios = card.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      radio.addEventListener('change', () => card.classList.add('answered'));
    });
  });

  /* ── Progress tracking ── */
  function updateProgress() {
    const all      = document.querySelectorAll('input[type="radio"][name]');
    const names    = [...new Set([...all].map(r => r.name))];
    const answered = names.filter(n =>
      document.querySelector(`input[name="${n}"]:checked`)
    ).length;
    const total    = names.length;
    const pct      = total ? Math.round((answered / total) * 100) : 0;

    const fill  = document.querySelector('.progress-fill');
    const label = document.querySelector('.assessment-progress-info');

    if (fill)  fill.style.width = `${pct}%`;
    if (label) {
      const strong = label.querySelector('strong');
      if (strong) strong.textContent = answered;
      const totalSpan = label.querySelector('.total-q');
      if (totalSpan) totalSpan.textContent = total;
    }
  }

  document.querySelectorAll('input[type="radio"]').forEach(r =>
    r.addEventListener('change', updateProgress)
  );

  updateProgress(); // init

  /* ── Previous / Next section navigation ── */
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');

  function currentTabIndex() {
    return [...tabs].findIndex(t => t.classList.contains('active'));
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const idx = currentTabIndex();
      if (idx > 0) switchTab(tabs[idx - 1].dataset.section);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const idx   = currentTabIndex();
      const isLast = idx === tabs.length - 1;
      if (isLast) {
        // Navigate to results
        window.location.href = (window.location.protocol === 'file:' ? '../result/index.html' : '../result/');
      } else {
        // Mark current tab complete
        tabs[idx].classList.add('completed');
        tabs[idx].classList.remove('active');
        switchTab(tabs[idx + 1].dataset.section);
        // Update button label
        if (idx + 1 === tabs.length - 1) nextBtn.textContent = 'Finish & View Results';
      }
    });
  }

  // Init first section visible
  if (tabs.length) switchTab(tabs[0].dataset.section);
})();


/* ─── Results page: animate dimension bars ─── */
(function initResultBars() {
  const bars = document.querySelectorAll('.dim-bar-fill, .summary-dim-bar-fill');
  if (!bars.length) return;

  // Store target width, set to 0 initially
  bars.forEach(bar => {
    bar.dataset.target = bar.style.width || '0%';
    bar.style.width = '0%';
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        // Slight delay so user notices the animation
        requestAnimationFrame(() => {
          target.style.width = target.dataset.target;
        });
        io.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => io.observe(bar));
})();


/* ─── Register page: basic client-side validation UI ─── */
(function initRegister() {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');

    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        const group = field.closest('.form-group');
        if (group) {
          let errEl = group.querySelector('.form-error');
          if (!errEl) {
            errEl = document.createElement('span');
            errEl.className = 'form-error';
            group.appendChild(errEl);
          }
          errEl.textContent = 'This field is required.';
        }
      }
    });

    // Email format check
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      valid = false;
      const group = emailField.closest('.form-group');
      if (group) {
        let errEl = group.querySelector('.form-error');
        if (!errEl) { errEl = document.createElement('span'); errEl.className = 'form-error'; group.appendChild(errEl); }
        errEl.textContent = 'Please enter a valid email address.';
      }
    }

    // Consent check
    const consent = form.querySelector('#consent');
    if (consent && !consent.checked) {
      valid = false;
      const group = consent.closest('.checkbox-group');
      let errEl = form.querySelector('#consent-error');
      if (!errEl) {
        errEl = document.createElement('span');
        errEl.id = 'consent-error';
        errEl.className = 'form-error mt-2';
        group.after(errEl);
      }
      errEl.textContent = 'You must agree to proceed.';
    }

    if (valid) {
      window.location.href = (window.location.protocol === 'file:' ? '../assessment/index.html' : '../assessment/');
    }
  });
})();
