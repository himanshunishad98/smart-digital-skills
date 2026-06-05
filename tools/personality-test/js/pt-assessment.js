/**
 * HEXACO — assessment.js
 * Loads questions, renders cards, tracks progress, scores & submits to Google Sheets
 */
(function () {
  'use strict';

  /* ════════════════════════════════════════
     CONSTANTS
  ════════════════════════════════════════ */
  var TOTAL_Q   = 100;
  var AUTO_SAVE = 'hexaco_answers';
  var DATA_PATH = 'data/questions.json';

  var DIM_ORDER = ['H','E','X','A','C','O','AL'];
  var DIM_NAMES = {
    H:'Honesty-Humility', E:'Emotionality', X:'Extraversion',
    A:'Agreeableness',    C:'Conscientiousness', O:'Openness to Experience',
    AL:'Altruism'
  };

  // Row thresholds per Excel: Low=4-10, Medium=11-14, High=15-20 (4 questions per row)
  var ROW_LOW_MAX = 10, ROW_MED_MAX = 14;

  // Dimension totals: 16 questions per dim (4 rows x4), min=16, max=80
  // AL: 4 questions, min=4, max=20
  var DIM_THRESHOLDS = {
    H : { low:40, med:56 },  // 4 rows × Low/Med breakpoints
    E : { low:40, med:56 },
    X : { low:40, med:56 },
    A : { low:40, med:56 },
    C : { low:40, med:56 },
    O : { low:40, med:56 },
    AL: { low:10, med:14 }   // 1 row of 4
  };

  /* ════════════════════════════════════════
     STATE
  ════════════════════════════════════════ */
  var questionsData = null;
  var answers       = {};       // { qId: rawValue }
  var startTime     = null;

  /* ════════════════════════════════════════
     LOAD QUESTIONS
     Priority order:
     1. window.HEXACO_QUESTIONS_DATA — inline embedded data (works on file://)
     2. fetch(DATA_PATH)             — server-served JSON (works on http://)
  ════════════════════════════════════════ */
  function loadData() {
    // 1. Use inline-embedded data if available (file:// safe)
    if (window.HEXACO_QUESTIONS_DATA) {
      return Promise.resolve(window.HEXACO_QUESTIONS_DATA);
    }
    // 2. Fallback: fetch from JSON file (requires http server)
    return fetch(DATA_PATH)
      .then(function(r){ if(!r.ok) throw new Error('fetch failed: ' + r.status); return r.json(); })
      .catch(function(err){
        console.warn('[HEXACO] Could not load questions.json via fetch:', err.message,
          '\nTip: Serve the site via "npx serve ." or embed data inline.');
        return null;
      });
  }

  /* ════════════════════════════════════════
     RENDER QUESTION CARDS
  ════════════════════════════════════════ */
  var LABELS = ['Do not Agree','Agree very little','Somewhat Agree','Agree to a good extent','Strongly Agree'];

  function buildCard(q) {
    var card = document.createElement('div');
    card.className  = 'question-card';
    card.dataset.qid = q.id;
    card.dataset.dim = q.dim;
    if (q.rev) card.dataset.rev = '1';

    var num = document.createElement('div');
    num.className   = 'question-num';
    num.textContent = 'Q' + q.id;

    var txt = document.createElement('p');
    txt.className   = 'question-text';
    txt.textContent = q.question;

    var scale = document.createElement('div');
    scale.className = 'likert-scale';

    var labRow = document.createElement('div');
    labRow.className = 'likert-labels';
    labRow.innerHTML = '<span class="likert-label-text">Do not Agree</span><span class="likert-label-text">Strongly Agree</span>';

    var opts = document.createElement('div');
    opts.className = 'likert-options';
    opts.setAttribute('role','radiogroup');
    opts.setAttribute('aria-label','Rate Q' + q.id);

    for (var v = 1; v <= 5; v++) {
      var wrap  = document.createElement('div');
      wrap.className = 'likert-option';
      var rid   = 'q' + q.id + '-' + v;
      var inp   = document.createElement('input');
      inp.type  = 'radio'; inp.name = 'q' + q.id;
      inp.id    = rid;     inp.value = v;

      // Restore saved answer
      if (answers[q.id] && parseInt(answers[q.id]) === v) inp.checked = true;

      var lbl   = document.createElement('label');
      lbl.htmlFor = rid;
      lbl.innerHTML = '<span class="likert-dot"></span><span class="likert-value-num">' + v + '</span><span class="likert-value-desc">' + LABELS[v-1] + '</span>';

      inp.addEventListener('change', function(ev) {
        var qid = parseInt(ev.target.name.replace('q',''));
        answers[qid] = parseInt(ev.target.value);
        autoSave();
        ev.target.closest('.question-card').classList.add('answered');
        updateProgress();
        checkSubmitReady();
      });

      wrap.appendChild(inp); wrap.appendChild(lbl);
      opts.appendChild(wrap);
    }

    scale.appendChild(labRow); scale.appendChild(opts);
    card.appendChild(num); card.appendChild(txt); card.appendChild(scale);

    // Mark answered already
    if (answers[q.id]) card.classList.add('answered');
    return card;
  }

  function renderQuestions(data) {
    var container = document.getElementById('questions-container');
    if (!container) return;

    // Sort questions sequentially by ID
    var sortedQuestions = data.questions.slice().sort(function(a, b) { return a.id - b.id; });
    var QUESTIONS_PER_PAGE = 1;
    var numPages = Math.ceil(sortedQuestions.length / QUESTIONS_PER_PAGE);

    for (var i = 0; i < numPages; i++) {
      var section = document.createElement('section');
      section.className = 'question-section';
      section.id = 'page-' + (i + 1);
      if (i !== 0) section.hidden = true;

      var list = document.createElement('div');
      list.className = 'question-cards-list';

      var pageQuestions = sortedQuestions.slice(i * QUESTIONS_PER_PAGE, (i + 1) * QUESTIONS_PER_PAGE);
      pageQuestions.forEach(function(q) {
        list.appendChild(buildCard(q));
      });

      section.appendChild(list);
      container.appendChild(section);
    }

    // Update total count displays
    document.querySelectorAll('.total-q, #nav-total').forEach(function(el) {
      el.textContent = TOTAL_Q;
    });
  }

  /* ════════════════════════════════════════
     PROGRESS
  ════════════════════════════════════════ */
  function updateProgress() {
    var answered = Object.keys(answers).length;
    var pct      = Math.round((answered / TOTAL_Q) * 100);

    // Linear progress fills
    document.querySelectorAll('.pt-pct-fill, #progress-fill').forEach(function(f) {
      f.style.width = pct + '%';
    });
    // Header bar fill
    var hbf = document.getElementById('nav-progress-fill');
    if (hbf) hbf.style.width = pct + '%';

    // Text counters
    ['answered-count','nav-answered','ring-answered'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.textContent = answered;
    });
    var na = document.getElementById('nav-answered');
    if (na) na.textContent = answered;
    var pl = document.getElementById('pct-label');
    if (pl) pl.textContent = pct + '% complete';

    // Circular SVG ring (circumference = 2π×50 ≈ 314)
    var ring = document.getElementById('ring-fill');
    if (ring) {
      var offset = 314 - (314 * answered / TOTAL_Q);
      ring.style.strokeDashoffset = offset;
    }

    // Dimension chips: mark done when all questions of that dim answered
    document.querySelectorAll('.pt-dim-chip').forEach(function(chip) {
      var dim = chip.dataset.dim;
      if (!dim || !window._questionsData) return;
      var qs = window._questionsData.questions.filter(function(q){ return q.dim === dim; });
      var allDone = qs.length > 0 && qs.every(function(q){ return answers[q.id]; });
      chip.classList.toggle('done', allDone);
    });

    // Header submit button enable/disable
    var hbtn = document.getElementById('btn-submit-header');
    if (hbtn) hbtn.disabled = answered < TOTAL_Q;
  }

  /* ════════════════════════════════════════
     TIMER
  ════════════════════════════════════════ */
  function startTimer() {
    startTime = Date.now();
  }

  function startTimerDisplay() {
    var display = document.getElementById('timer-display');
    if (!display) return;
    setInterval(function() {
      var elapsed = Math.round((Date.now() - (startTime || Date.now())) / 1000);
      var h = Math.floor(elapsed / 3600);
      var m = Math.floor((elapsed % 3600) / 60);
      var s = elapsed % 60;
      display.textContent =
        String(h).padStart(2,'0') + ':' +
        String(m).padStart(2,'0') + ':' +
        String(s).padStart(2,'0');
    }, 1000);
  }

  function getElapsedSeconds() {
    return Math.round((Date.now() - (startTime || Date.now())) / 1000);
  }

  /* ════════════════════════════════════════
     AUTO-SAVE (localStorage)
  ════════════════════════════════════════ */
  function autoSave() {
    try { localStorage.setItem(AUTO_SAVE, JSON.stringify(answers)); } catch(_) {}
  }

  function loadSaved() {
    try {
      var s = localStorage.getItem(AUTO_SAVE);
      if (s) {
        var parsed = JSON.parse(s);
        Object.keys(parsed).forEach(function(k){ answers[parseInt(k)] = parsed[k]; });
      }
    } catch(_) {}
  }

  /* ════════════════════════════════════════
     SCORING ENGINE
  ════════════════════════════════════════ */
  function reverseScore(val) { return 6 - val; }

  function getLabel(score, low, med) {
    if (score <= low) return 'Low';
    if (score <= med) return 'Medium';
    return 'High';
  }

  function calculateScores(data) {
    var questions  = data.questions;
    var rows       = data.rows;

    // 1. Compute scored answers (apply reverse scoring)
    var scoredAnswers = {};
    questions.forEach(function(q) {
      var raw = answers[q.id] || 0;
      scoredAnswers[q.id] = q.rev ? reverseScore(raw) : raw;
    });

    // 2. Category totals — directly from scored answers per dimension
    var catTotals  = { H:0, E:0, X:0, A:0, C:0, O:0, AL:0 };
    questions.forEach(function(q) {
      var sc = scoredAnswers[q.id];
      if (catTotals[q.dim] !== undefined) {
        catTotals[q.dim] += sc;
      }
    });

    var categoryScores = {}, categoryLabels = {};
    ['H','E','X','A','C','O','AL'].forEach(function(k) {
      var sc = catTotals[k];
      categoryScores[k] = sc;
      var th = DIM_THRESHOLDS[k];
      categoryLabels[k] = getLabel(sc, th.low, th.med);
    });

    // 3. Row scores
    var rowScores = [];
    rows.forEach(function(row) {
      var total = 0;
      var validCount = 0;
      row.qids.forEach(function(qid) {
        var q = questions.find(function(q){ return q.id === qid; });
        if (q) { total += scoredAnswers[qid] || 0; validCount++; }
      });
      var label = '';
      if (validCount === 4) {
        label = getLabel(total, ROW_LOW_MAX, ROW_MED_MAX);
      } else if (validCount > 0) {
        // Scale threshold for smaller row
        var scaledLow = Math.round(ROW_LOW_MAX * validCount / 4);
        var scaledMed = Math.round(ROW_MED_MAX * validCount / 4);
        label = getLabel(total, scaledLow, scaledMed);
      }
      rowScores.push({ id: row.id, dim: row.dim, label_name: row.label, total: total, label: label });
    });

    return {
      scoredAnswers  : scoredAnswers,
      categoryScores : categoryScores,
      categoryLabels : categoryLabels,
      rowScores      : rowScores
    };
  }

  /* ════════════════════════════════════════
     SUBMIT TO GOOGLE SHEETS
  ════════════════════════════════════════ */
  function submitToSheets(payload) {
    return new Promise((resolve) => {
      const submitLeadFn = window.submitLead || (window.parent && window.parent.submitLead);
      if (typeof submitLeadFn === 'function') {
        submitLeadFn('personality-test-result', payload, {
          onSuccess: () => {
            resolve({ success: true });
          },
          onError: (err) => {
            console.error('Firestore save error:', err);
            resolve({ success: false });
          }
        });
      } else {
        console.warn('submitLead function not found on window.');
        resolve({ success: true, skipped: true });
      }
    });
  }

  /* ════════════════════════════════════════
     SUBMIT BUTTON STATE
  ════════════════════════════════════════ */
  function checkSubmitReady() {
    var ready = Object.keys(answers).length >= TOTAL_Q;
    ['btn-submit','btn-submit-header'].forEach(function(id) {
      var btn = document.getElementById(id);
      if (btn) btn.disabled = !ready;
    });
  }

  /* ════════════════════════════════════════
     CONFIRMATION POPUP
  ════════════════════════════════════════ */
  function showPopup(onConfirm) {
    var overlay = document.getElementById('submit-overlay');
    if (!overlay) { onConfirm(); return; }
    overlay.classList.add('active');
    document.getElementById('popup-confirm').onclick = function() {
      overlay.classList.remove('active');
      onConfirm();
    };
    document.getElementById('popup-cancel').onclick = function() {
      overlay.classList.remove('active');
    };
  }

  /* ════════════════════════════════════════
     SECTION TABS
  ════════════════════════════════════════ */
  /* Windowed dot nav — shows 9 dots max around the current page */
  var _allSections = [];
  function buildPageDots(sections) {
    _allSections = Array.from(sections);
    renderWindowedDots(0, sections.length);
  }

  function renderWindowedDots(currentIdx, total) {
    var container = document.getElementById('page-dots');
    if (!container) return;
    container.innerHTML = '';

    var WINDOW = 9;  /* max visible dots */
    var half   = Math.floor(WINDOW / 2);
    var start  = Math.max(0, currentIdx - half);
    var end    = Math.min(total - 1, start + WINDOW - 1);
    if (end - start < WINDOW - 1) start = Math.max(0, end - WINDOW + 1);

    /* Leading ellipsis */
    if (start > 0) {
      var sp = document.createElement('span');
      sp.className = 'pt-dot-ellipsis';
      sp.textContent = '…';
      container.appendChild(sp);
    }

    for (var i = start; i <= end; i++) {
      var dot = document.createElement('button');
      var cls = 'pt-page-dot';
      if (i === currentIdx) cls += ' active';
      else if (i < currentIdx)  cls += ' done';
      dot.className = cls;
      dot.textContent = i + 1;
      dot.setAttribute('aria-label', 'Go to question ' + (i + 1));
      (function(idx) {
        dot.addEventListener('click', function() { showSectionByIdx(idx); });
      })(i);
      container.appendChild(dot);
    }

    /* Trailing ellipsis */
    if (end < total - 1) {
      var sp2 = document.createElement('span');
      sp2.className = 'pt-dot-ellipsis';
      sp2.textContent = '…';
      container.appendChild(sp2);
    }
  }

  function updateDots(currentIdx, sections) {
    renderWindowedDots(currentIdx, sections.length);
  }

  var _showSectionByIdx = null;

  function initTabs() {
    var sections = document.querySelectorAll('.question-section');
    var allIds = Array.from(sections).map(function(s){ return s.id; });
    var currentIdx = 0;

    buildPageDots(sections);

    function showSection(idx) {
      sections.forEach(function(s, i) { s.hidden = i !== idx; });
      currentIdx = idx;

      // Update badge: "Q X of 100"
      var badge = document.getElementById('section-badge');
      if (badge) badge.textContent = (idx + 1) + ' / ' + allIds.length;

      // Update current question number (first Q on this page)
      var section = sections[idx];
      var firstCard = section ? section.querySelector('.question-card') : null;
      var qnum = document.getElementById('current-q-num');
      if (qnum && firstCard) qnum.textContent = firstCard.dataset.qid;

      // Buttons
      var prev = document.getElementById('btn-prev');
      var next = document.getElementById('btn-next');
      var scl  = document.getElementById('section-count-label');
      if (prev) prev.disabled = idx === 0;
      if (next) next.textContent = (idx === allIds.length - 1) ? 'Review & Submit' : 'Next →';
      if (scl)  scl.textContent  = 'Part ' + (idx + 1) + ' of ' + allIds.length;

      // Show/hide submit row
      var subRow = document.getElementById('pt-submit-row');
      if (subRow) subRow.hidden = (idx !== allIds.length - 1);

      updateDots(idx, sections);
      /* No window.scrollTo — layout is viewport-locked */
    }

    _showSectionByIdx = showSection;

    var btnPrev = document.getElementById('btn-prev');
    var btnNext = document.getElementById('btn-next');

    if (btnPrev) btnPrev.addEventListener('click', function() {
      if (currentIdx > 0) showSection(currentIdx - 1);
    });
    if (btnNext) btnNext.addEventListener('click', function() {
      if (currentIdx < allIds.length - 1) { showSection(currentIdx + 1); }
      else { var s = document.getElementById('pt-submit-row'); if (s) s.scrollIntoView({ behavior: 'smooth' }); }
    });

    if (allIds.length > 0) showSection(0);
  }

  function showSectionByIdx(idx) {
    if (_showSectionByIdx) _showSectionByIdx(idx);
  }

  /* ════════════════════════════════════════
     HANDLE FINAL SUBMIT
  ════════════════════════════════════════ */
  function handleSubmit() {
    var unanswered = TOTAL_Q - Object.keys(answers).length;
    if (unanswered > 0) {
      alert('Please answer all ' + TOTAL_Q + ' questions. You have ' + unanswered + ' remaining.');
      return;
    }

    showPopup(function() {
      var btn = document.getElementById('btn-submit');
      if (btn) { btn.disabled = true; btn.textContent = 'Submitting…'; }

      var scores  = calculateScores(questionsData);
      var user    = {};
      // Support both key names: 'pt_user' (from pt-register.html) and
      // legacy 'hexaco_user'. 'pt_user' takes precedence if present.
      try {
        var rawUser = localStorage.getItem('pt_user') || localStorage.getItem('hexaco_user') || '{}';
        user = JSON.parse(rawUser);
      } catch(_) {}

      var timeSec = getElapsedSeconds();
      var payload = {
        // Support both camelCase (legacy hexaco_user) and snake_case (pt_user)
        userId        : user.userId        || user.user_id       || 'ANON-' + Date.now(),
        fullName      : user.fullName      || user.full_name     || 'Anonymous',
        mobile        : user.mobile        || '',
        email         : user.email         || '',
        stream        : user.streamLabel   || user.stream        || '',
        qualification : user.qualLabel     || user.qualification || '',
        timeTaken     : timeSec,
        submittedAt   : new Date().toISOString(),
        answers       : answers,
        scoredAnswers : scores.scoredAnswers,
        categoryScores: scores.categoryScores,
        categoryLabels: scores.categoryLabels,
        rowScores     : scores.rowScores
      };

      // Save result to localStorage for result page
      try { localStorage.setItem('hexaco_result', JSON.stringify(payload)); } catch(_) {}

      submitToSheets(payload).finally(function() {
        // Clear auto-saved answers
        try { localStorage.removeItem(AUTO_SAVE); } catch(_) {}
        window.location.href = (window.location.protocol === 'file:' ? '../result/index.html' : '../result/');
      });
    });
  }

  /* ════════════════════════════════════════
     INIT
  ════════════════════════════════════════ */
  function init() {
    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'flex';

    loadSaved();

    loadData().then(function(data) {
      if (!data) {
        if (loading) loading.innerHTML = '<div class="loading-inner"><p>⚠ Could not load questions.json.<br>Serve via a local server (e.g. <code>npx serve .</code>)</p></div>';
        return;
      }
      questionsData = data;
      window._questionsData = data;
      renderQuestions(data);
      if (loading) loading.style.display = 'none';
      initTabs();
      updateProgress();
      checkSubmitReady();
      startTimer();
      startTimerDisplay();

      // Both submit buttons
      ['btn-submit','btn-submit-header'].forEach(function(id) {
        var btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', handleSubmit);
      });

      // Set ring total display
      var rt = document.getElementById('ring-total');
      if (rt) rt.textContent = TOTAL_Q;

      // Navbar toggle
      var toggle = document.querySelector('.navbar__toggle');
      var drawer = document.querySelector('.navbar__drawer');
      if (toggle && drawer) {
        toggle.addEventListener('click', function() {
          var open = drawer.classList.toggle('open');
          toggle.setAttribute('aria-expanded', open);
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
