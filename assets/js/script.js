/* script.js — FAQ, animations, countdown, toggles */
window.addEventListener('scroll',function(){document.getElementById('mainHeader').classList.toggle('scrolled',window.scrollY>40);});

function toggleLevel(h){var b=h.nextElementSibling,a=h.querySelector('.level-arrow'),o=b.classList.contains('open');b.classList.toggle('open',!o);a.style.transform=o?'rotate(0deg)':'rotate(180deg)';}

function toggleFaq(el){var ans=el.nextElementSibling,arrow=el.querySelector('.faq-arrow'),isOpen=ans.classList.contains('open');document.querySelectorAll('.faq-a').forEach(function(a){a.classList.remove('open');});document.querySelectorAll('.faq-arrow').forEach(function(a){a.textContent='+';a.style.transform='';});if(!isOpen){ans.classList.add('open');arrow.textContent='\xD7';arrow.style.transform='rotate(90deg)';}}

(function(){
  var end=CONFIG.countdownTarget;
  function _u(){
    var now=new Date(),diff=Math.max(0,end-now);
    var d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
    function p(n){return String(n).padStart(2,'0');}
    var ed=document.getElementById('cd-d'),eh=document.getElementById('cd-h'),em=document.getElementById('cd-m'),es=document.getElementById('cd-s');
    if(ed)ed.textContent=p(d);if(eh)eh.textContent=p(h);if(em)em.textContent=p(m);if(es)es.textContent=p(s);
  }
  _u();setInterval(_u,1000);
})();

var _obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');_obs.unobserve(e.target);}});},{threshold:0.12});
document.querySelectorAll('.fade-up').forEach(function(el){_obs.observe(el);});

document.querySelectorAll('.level-header').forEach(function(h){var b=h.nextElementSibling,a=h.querySelector('.level-arrow');if(b&&b.classList.contains('open')&&a)a.style.transform='rotate(180deg)';});

// Global Click Tracking for Analytics (GTM via dataLayer)
document.addEventListener('click', function(e) {
  var target = e.target.closest('a, button');
  if (!target) return;
  var linkText = target.innerText.trim() || target.getAttribute('aria-label') || 'Button';
  var linkHref = target.getAttribute('href') || 'No href';
  
  var eventName = 'click_event';
  var lText = linkText.toLowerCase();
  
  if(lText.includes('demo')) eventName = 'book_demo_click';
  else if(lText.includes('whatsapp') || lText.includes('counselor') || linkHref.includes('wa.me')) eventName = 'whatsapp_click';
  else if(lText.includes('curriculum')) eventName = 'download_curriculum_click';
  else if(lText.includes('school')) eventName = 'school_inquiry_click';
  else if(target.closest('.blog-content, .article-content, .blog-section')) eventName = 'blog_cta_click';

  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    event: eventName,
    event_category: 'engagement',
    event_label: linkText,
    link_url: linkHref
  });
});

document.addEventListener('submit', function(e) {
  if (e.target.tagName === 'FORM') {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: 'form_submission',
      form_id: e.target.id || 'unknown_form'
    });
  }
});

// Mobile Nav Logic
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeBtn = document.getElementById('mobileNavClose');
  const navMenu = document.getElementById('mobileNavMenu');
  
  if(toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function() {
      navMenu.classList.add('active');
    });
  }
  if(closeBtn && navMenu) {
    closeBtn.addEventListener('click', function() {
      navMenu.classList.remove('active');
    });
  }
});
// Add click feedback
document.addEventListener('click', function(e) {
  var target = e.target.closest('.btn-primary, .btn-yellow, .btn-outline, .btn-ghost, .smc-demo, .smc-enroll');
  if (target) {
    target.classList.add('btn-loading');
    setTimeout(() => {
      target.classList.remove('btn-loading');
    }, 500);
  }
});

// Popups State Manager (Activity & Inactivity control)
let isScrollPopupEligible = false;

window.addEventListener('scroll', function() {
  if (!isScrollPopupEligible) {
    let scrollPos = window.scrollY || document.documentElement.scrollTop;
    let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Eligible to show scroll popup after scrolling past 30% of page height
    if (scrollPos / docHeight > 0.3) {
      isScrollPopupEligible = true;
      // If user is currently active (which they are) and exit popup is not shown, show scroll popup
      const exitPopup = document.getElementById('exitPopup');
      const isExitOpen = exitPopup && exitPopup.classList.contains('is-visible');
      if (!isExitOpen && !sessionStorage.getItem('scrollPopupClosed')) {
        showScrollPopup();
      }
    }
  }
}, { passive: true });

function showScrollPopup() {
  let popup = document.querySelector('.scroll-cta-popup');
  if (!popup) {
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
    
    popup = document.createElement('div');
    popup.className = 'scroll-cta-popup';
    popup.innerHTML = `
      <div class="scp-content">
        <button class="scp-close">&times;</button>
        <p>Still exploring?</p>
        <a href="tel:${CONFIG.phoneDisplay.replace(/[^+\d]/g, '')}" class="btn-yellow">📞 Call: ${CONFIG.phoneDisplay}</a>
      </div>
    `;
    document.body.appendChild(popup);
    
    popup.querySelector('.scp-close').addEventListener('click', () => {
      sessionStorage.setItem('scrollPopupClosed', 'true');
      popup.classList.remove('is-visible');
    });
    popup.querySelector('.btn-yellow').addEventListener('click', () => {
      sessionStorage.setItem('scrollPopupClosed', 'true');
      popup.classList.remove('is-visible');
    });
  }
  
  if (!sessionStorage.getItem('scrollPopupClosed')) {
    // Hide exit popup if visible
    const exitPopup = document.getElementById('exitPopup');
    if (exitPopup) exitPopup.classList.remove('is-visible');
    popup.classList.add('is-visible');
  }
}

// ---- FUNNEL IMPROVEMENTS SCRIPT ----
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('exitPopup');
  const closes = document.querySelectorAll('.exit-close, .exit-close-btn');
  
  if (closes.length && popup) {
    closes.forEach(btn => btn.addEventListener('click', () => {
      sessionStorage.setItem('exitPopupClosed', 'true');
      popup.classList.remove('is-visible');
      resetInactivityTimer();
    }));
  }

  function showExitPopup() {
    if (!sessionStorage.getItem('exitPopupClosed') && popup) {
      // Hide scroll cta popup if it is open
      const scrollPopup = document.querySelector('.scroll-cta-popup');
      if (scrollPopup) {
        scrollPopup.classList.remove('is-visible');
      }
      popup.classList.add('is-visible');
      sessionStorage.setItem('exitPopupShown', 'true');
    }
  }

  // Unified Inactivity / Activity logic
  let inactivityTimer;
  const INACTIVITY_LIMIT = (window.CONFIG && window.CONFIG.exitPopupDelay) || 10000;

  function resetInactivityTimer() {
    // If the exit popup is currently visible or tab is hidden, do nothing
    if (popup && popup.classList.contains('is-visible')) {
      return;
    }
    if (document.visibilityState === 'hidden') {
      return;
    }

    clearTimeout(inactivityTimer);
    
    inactivityTimer = setTimeout(() => {
      // Don't show if tab is hidden
      if (document.visibilityState === 'hidden') {
        return;
      }
      // When user becomes inactive, show exit popup and hide scroll popup
      const scrollPopup = document.querySelector('.scroll-cta-popup');
      if (scrollPopup) {
        scrollPopup.classList.remove('is-visible');
      }
      showExitPopup();
    }, INACTIVITY_LIMIT);
  }

  // Activity listeners covering mouse, keyboard, scrolling, and touch input on mobile
  const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'touchmove'];
  activityEvents.forEach(eventName => {
    window.addEventListener(eventName, resetInactivityTimer, { passive: true });
  });

  // Handle visibility changes (tab switches, opening in new tab, etc.) to pause/resume timer
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      resetInactivityTimer();
    } else {
      clearTimeout(inactivityTimer);
    }
  });

  // Start the inactivity timer on page load
  resetInactivityTimer();

  // Lead Magnet Form Handler
  const lmForm = document.getElementById('leadMagnetForm');
  if (lmForm) {
    lmForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lmName').value.trim();
      const phone = document.getElementById('lmPhone').value.trim();
      
      if (!name || !phone) {
        alert('Please fill all required fields.');
        return;
      }
      if (!/^[\d\s\+\-]{7,15}$/.test(phone)) {
        alert('Please enter a valid phone number.');
        return;
      }

      // Tracking
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: 'pdf_download',
        lead_name: name,
        lead_phone: phone
      });

      submitLead('lead-magnet', { lmName: name, lmPhone: phone }, {
        btnSelector: '#leadMagnetForm button[type="submit"]',
        btnLoadingText: '⏳ Loading...',
        btnOriginalText: 'Chat to Advisor',
        onSuccess: () => {
          // 1. Simulate auto-download
          alert('Your PDF will download shortly!');
          
          // 2. Redirect to WA
          const waText = encodeURIComponent(`Hi, I just downloaded the Starter Kit. My name is ${name}.`);
          window.location.href = `https://wa.me/${CONFIG.phone}?text=${waText}`;
          
          popup.classList.remove('is-visible');
        },
        onError: (err) => {
          alert(err.message || 'Submission failed. Please try again.');
        }
      });
    });
  }

  // WA tracking
  document.querySelectorAll('.whatsapp-float').forEach(el => {
    el.addEventListener('click', () => {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({ event: 'wa_click' });
    });
  });
});


  const admissionForm = document.getElementById('admissionForm');
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({ event: 'form_submit' });
      dataLayer.push({ event: 'demo_booked' });
      // Proceed with normal submission or fetch API...
    });
  }




  // Sticky CTA Visibility Logic
  window.addEventListener('scroll', () => {
    const stickyCta = document.querySelector('.new-sticky-layout');
    if (!stickyCta) return;
    const waFloat = document.querySelector('.whatsapp-float');
    const isMobile = window.innerWidth <= 768;
    const heroSection = document.querySelector('.hero') || document.querySelector('.page-hero');
    let shouldShow = false;
    if (heroSection) {
      shouldShow = heroSection.getBoundingClientRect().bottom < 0;
    } else {
      shouldShow = (window.scrollY || document.documentElement.scrollTop) > 200;
    }
    if (shouldShow) {
      stickyCta.classList.add('is-visible');
      if (isMobile && waFloat) {
        waFloat.style.setProperty('display', 'none', 'important');
      }
    } else {
      stickyCta.classList.remove('is-visible');
      if (isMobile && waFloat) {
        waFloat.style.removeProperty('display');
      }
    }
  });


  // Curriculum Accordion
  document.querySelectorAll('.rmc-title').forEach(title => {
    title.addEventListener('click', () => {
      title.classList.toggle('expanded');
      if(title.nextElementSibling && title.nextElementSibling.classList.contains('rmc-chips')) {
        title.nextElementSibling.classList.toggle('expanded');
      }
    });
  });


// UI Toggle Logic for Collapsible Sections
window.toggleSection = function(contentId, btnElement, textShow, textHide) {
    const content = document.getElementById(contentId);
    if (!content) return;
    const isHidden = content.style.display === 'none';
    content.style.display = isHidden ? '' : 'none';
    btnElement.innerHTML = isHidden ? textHide : textShow;
    btnElement.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
};

window.toggleCards = function(className, btnElement, textShow, textHide) {
    const elements = document.querySelectorAll('.' + className);
    if (elements.length === 0) return;
    const isHidden = elements[0].style.display === 'none';
    elements.forEach(el => {
        el.style.display = isHidden ? '' : 'none';
    });
    btnElement.innerHTML = isHidden ? textHide : textShow;
    btnElement.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
};
