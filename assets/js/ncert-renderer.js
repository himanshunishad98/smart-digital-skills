/* ncert-renderer.js — Shared rendering engine for all class resource pages.
   Reads window.NCERT_DATA and generates book/exemplar HTML into page containers.
   Zero external dependencies. Extends existing site CSS classes. */
(function () {
  'use strict';

  /* ── Subject metadata ── */
  var SUBJECT_META = {
    'English':             { icon: '📖', bg: '#dbeafe', color: '#1e4ea0', desc: 'NCERT English textbooks with stories, poems, and grammar for comprehensive language learning.' },
    'Mathematics':         { icon: '🔢', bg: '#d1fae5', color: '#059669', desc: 'NCERT Maths books covering all chapters with solved examples and practice exercises.' },
    'Science':             { icon: '🔬', bg: '#ede9fe', color: '#7c3aed', desc: 'NCERT Science textbooks covering physics, chemistry, and biology concepts for CBSE students.' },
    'Social Science':      { icon: '🌍', bg: '#fce7f3', color: '#be185d', desc: 'NCERT Social Science books covering History, Geography, Civics, and Economics.' },
    'History':             { icon: '🏛️', bg: '#fef3c7', color: '#b45309', desc: 'NCERT History textbooks covering ancient, medieval, and modern Indian history.' },
    'Geography':           { icon: '🗺️', bg: '#ecfdf5', color: '#065f46', desc: 'NCERT Geography books covering physical and human geography with maps.' },
    'Physics':             { icon: '⚛️', bg: '#eff6ff', color: '#1d4ed8', desc: 'NCERT Physics textbooks with theory, derivations, and solved numerical problems.' },
    'Chemistry':           { icon: '🧪', bg: '#fdf4ff', color: '#7e22ce', desc: 'NCERT Chemistry textbooks covering physical, organic, and inorganic chemistry.' },
    'Biology':             { icon: '🧬', bg: '#f0fdf4', color: '#15803d', desc: 'NCERT Biology textbooks with detailed diagrams and explanations for CBSE board.' },
    'Computer Science':    { icon: '💻', bg: '#f0f9ff', color: '#0369a1', desc: 'NCERT Computer Science books covering programming and computational thinking.' },
    'Economics':           { icon: '📊', bg: '#fffbeb', color: '#b45309', desc: 'NCERT Economics textbooks with macro and microeconomics concepts for Class 11-12.' },
    'Political Science':   { icon: '🏛️', bg: '#fef2f2', color: '#b91c1c', desc: 'NCERT Political Science books covering Indian polity and world politics.' },
    'Psychology':          { icon: '🧠', bg: '#fdf4ff', color: '#9333ea', desc: 'NCERT Psychology textbooks with psychological concepts and case studies.' },
    'Accountancy':         { icon: '📒', bg: '#f0fdf4', color: '#166534', desc: 'NCERT Accountancy books with journal entries, ledger, and financial statements.' },
    'Business Studies':    { icon: '💼', bg: '#fffbeb', color: '#92400e', desc: 'NCERT Business Studies textbooks covering management and entrepreneurship.' },
    'Home Science':        { icon: '🏠', bg: '#fff7ed', color: '#c2410c', desc: 'NCERT Home Science books covering nutrition, health, and family management.' },
    'Sociology':           { icon: '👥', bg: '#f0f9ff', color: '#075985', desc: 'NCERT Sociology textbooks exploring social structures, institutions, and change.' },
    'Biotechnology':       { icon: '🔬', bg: '#f0fdf4', color: '#065f46', desc: 'NCERT Biotechnology books covering molecular biology and genetic engineering.' },
    'Fine Art':            { icon: '🎨', bg: '#fdf4ff', color: '#6d28d9', desc: 'NCERT Fine Arts textbooks covering art history and practical art skills.' },
    'Informatics Pratices':{ icon: '🖥️', bg: '#eff6ff', color: '#1e40af', desc: 'NCERT Informatics Practices books covering databases and Python programming.' },
    'The World Around Us': { icon: '🌱', bg: '#f0fdf4', color: '#166534', desc: 'NCERT Environmental Studies books exploring nature and our surroundings.' },
    'Arts':                { icon: '🎭', bg: '#fdf4ff', color: '#7c3aed', desc: 'NCERT Arts books developing creativity and artistic expression.' },
    'Physical Education And Well Being': { icon: '🏃', bg: '#ecfdf5', color: '#059669', desc: 'NCERT Physical Education books promoting fitness and healthy lifestyle.' },
    'Vocational Education':{ icon: '🔧', bg: '#fff7ed', color: '#c2410c', desc: 'NCERT Vocational Education books for skill-based practical learning.' },
    'Health And Physical Education': { icon: '💪', bg: '#ecfdf5', color: '#059669', desc: 'NCERT Health and Physical Education books for overall wellness.' },
    'Knowledge Traditions Pratices of India': { icon: '📿', bg: '#fffbeb', color: '#92400e', desc: 'Exploring India\'s rich knowledge traditions and classical learning systems.' }
  };

  var DEFAULT_META = { icon: '📚', bg: '#dbeafe', color: '#1e4ea0', desc: 'NCERT textbook PDF available for free download as per the latest CBSE curriculum.' };

  function getMeta(subject) {
    return SUBJECT_META[subject] || DEFAULT_META;
  }

  /* ── Build single chapter link row ── */
  function chapterLinkHTML(url, idx) {
    var fileName = url.split('/').pop().replace('.pdf', '');
    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="chapter-link">' +
      '<span>📄 Chapter ' + (idx + 1) + ' <span style="font-size:.75rem;opacity:.6">(' + fileName + ')</span></span>' +
      '<span class="dl-icon">⬇</span>' +
      '</a>';
  }

  /* ── Build book card HTML ── */
  function bookCardHTML(bookTitle, chapters, subject, delay) {
    var meta = getMeta(subject);
    var single = chapters.length === 1;
    var delayClass = delay ? ' fg-reveal-delay-' + delay : '';

    var downloadSection;
    if (single) {
      downloadSection = '<a href="' + chapters[0] + '" target="_blank" rel="noopener noreferrer" class="btn-primary book-primary-btn cd-btn-shift">⬇ Download PDF</a>';
    } else {
      var chapterLinks = chapters.map(function (url, i) { return chapterLinkHTML(url, i); }).join('');
      downloadSection =
        '<a href="' + chapters[0] + '" target="_blank" rel="noopener noreferrer" class="btn-primary book-primary-btn">⬇ Download Chapter 1</a>' +
        '<button class="book-chapter-toggle" onclick="(function(btn){btn.classList.toggle(\'open\');var list=btn.nextElementSibling;list.classList.toggle(\'open\');})(this)">' +
          'View All ' + chapters.length + ' Chapters <span class="toggle-caret">▾</span>' +
        '</button>' +
        '<div class="book-chapters-list">' + chapterLinks + '</div>';
    }

    return '<div class="why-card book-card fg-reveal' + delayClass + '">' +
      '<div class="why-icon" style="background:' + meta.bg + '">' + meta.icon + '</div>' +
      '<span class="book-subject-tag" style="background:' + meta.bg + ';color:' + meta.color + '">' + subject + '</span>' +
      '<h4 style="font-size:.95rem;font-weight:800;color:var(--blue-900);margin-bottom:4px">' + bookTitle + '</h4>' +
      '<p class="book-chapter-count">📄 ' + chapters.length + ' chapter' + (chapters.length > 1 ? 's' : '') + ' available</p>' +
      '<p class="book-desc">' + meta.desc + '</p>' +
      downloadSection +
    '</div>';
  }

  /* ── Build subject section HTML ── */
  function subjectSectionHTML(subject, booksObj, idx) {
    var meta = getMeta(subject);
    var totalChapters = Object.values(booksObj).reduce(function (acc, ch) { return acc + ch.length; }, 0);
    var cards = Object.entries(booksObj).map(function (entry, i) {
      return bookCardHTML(entry[0], entry[1], subject, (i % 3) + 1);
    }).join('');

    var bgStyle = idx % 2 === 0 ? 'background:var(--white)' : 'background:var(--blue-50)';
    return '<section class="subject-section" style="' + bgStyle + '">' +
      '<div class="container">' +
        '<div class="subject-header">' +
          '<div class="subject-icon-wrap" style="background:' + meta.bg + '">' + meta.icon + '</div>' +
          '<h2>' + subject + '</h2>' +
          '<span class="subject-book-count">' + totalChapters + ' PDFs</span>' +
        '</div>' +
        '<div class="why-grid">' + cards + '</div>' +
      '</div>' +
    '</section>';
  }

  /* ── Build exemplar card HTML ── */
  function exemplarCardHTML(subject, links, idx) {
    var meta = getMeta(subject);
    var chapterLinks = links.map(function (url, i) {
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="exemplar-chapter-link">' +
        '<span>📄 Part ' + (i + 1) + '</span><span>⬇</span></a>';
    }).join('');
    var delayClass = idx < 3 ? ' fg-reveal-delay-' + (idx + 1) : '';

    return '<div class="exemplar-card fg-reveal' + delayClass + '">' +
      '<div class="exemplar-tag">⭐ Exemplar</div>' +
      '<div style="font-size:2rem;margin-bottom:8px">' + meta.icon + '</div>' +
      '<h4>' + subject + ' Exemplar</h4>' +
      '<p>Advanced practice problems to strengthen conceptual understanding for CBSE board exams.</p>' +
      '<div class="exemplar-chapter-list">' + chapterLinks + '</div>' +
    '</div>';
  }

  /* ── Render exemplar section ── */
  function renderExemplar(classKey) {
    var container = document.getElementById('exemplar-container');
    if (!container) return;
    var data = window.NCERT_DATA && window.NCERT_DATA.exemplar && window.NCERT_DATA.exemplar[classKey];
    if (!data || Object.keys(data).length === 0) {
      container.innerHTML = '';
      return;
    }
    var cards = Object.entries(data).map(function (entry, i) {
      return exemplarCardHTML(entry[0], entry[1], i);
    }).join('');

    container.innerHTML =
      '<section class="exemplar-section fg-section-dark" id="exemplar">' +
        '<div class="container">' +
          '<div class="text-center fg-reveal">' +
            '<div class="section-tag" style="background:rgba(124,58,237,.15);color:#c4b5fd"><span class="dot" style="background:#c4b5fd"></span>NCERT Exemplar</div>' +
            '<h2 class="section-title" style="color:#fff">Exemplar Problems for <span style="color:var(--fg-gold)">' + classKey + '</span></h2>' +
            '<p class="section-sub" style="color:rgba(255,255,255,.7);margin:0 auto">Advanced practice problems aligned with the latest CBSE curriculum. Free PDF download.</p>' +
          '</div>' +
          '<div class="why-grid" style="margin-top:48px">' + cards + '</div>' +
        '</div>' +
      '</section>';
    initReveal(container);
  }

  /* ── Render main books ── */
  function renderBooks(classKey) {
    var container = document.getElementById('books-container');
    if (!container) return;
    var data = window.NCERT_DATA && window.NCERT_DATA.books && window.NCERT_DATA.books[classKey];
    if (!data) { container.innerHTML = '<div class="container" style="padding:60px 0;text-align:center"><p>No books found for ' + classKey + '.</p></div>'; return; }

    var html = Object.entries(data).map(function (entry, i) {
      return subjectSectionHTML(entry[0], entry[1], i);
    }).join('');
    container.innerHTML = html;
    initReveal(container);
  }

  /* ── Initialize scroll reveal on new elements ── */
  function initReveal(container) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('fg-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    container.querySelectorAll('.fg-reveal, .fade-up').forEach(function (el) {
      obs.observe(el);
    });
  }

  /* ── Public API ── */
  window.NCERT_RENDERER = {
    renderPage: function (classKey) {
      if (!window.NCERT_DATA) { console.error('NCERT_DATA not loaded'); return; }
      renderBooks(classKey);
      renderExemplar(classKey);
    }
  };
})();
