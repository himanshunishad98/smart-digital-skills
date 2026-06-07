/**
 * generate-school-pages.js
 * Generates all SkillNest /schools/ subpages using the exact design system.
 * Pages generated:
 *   - schools/case-studies/index.html
 *   - schools/teacher-training/index.html
 *   - schools/book-school-demo/index.html
 *   - schools/workshops/index.html          (REPLACE redirect stub)
 *   - schools/school-programs/index.html    (REPLACE redirect stub)
 *   - schools/partner-with-us/index.html    (REPLACE redirect stub)
 *   - schools/csr-programs/index.html       (REPLACE redirect stub)
 *   - schools/school-partnerships/index.html (REPLACE redirect stub)
 *   - schools/principal-pitch/index.html    (REPLACE redirect stub)
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');
const ICON_SVG = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNyIgZmlsbD0iIzFlNGVhMCIvPjxyZWN0IHg9IjYiIHk9IjkiIHdpZHRoPSIxMyIgaGVpZ2h0PSI5IiByeD0iMS41IiBmaWxsPSJub25lIiBzdHJva2U9IiNmYmJmMjQiIHN0cm9rZS13aWR0aD0iMS41Ii8+PGxpbmUgeDE9IjkiIHkxPSIxOCIgeDI9IjE2IiB5Mj0iMTgiIHN0cm9rZT0iI2ZiYmYyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cmVjdCB4PSIxMCIgeT0iMjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjEuNSIgcng9Ii43NSIgZmlsbD0iI2ZiYmYyNCIvPjxjaXJjbGUgY3g9IjIzIiBjeT0iMTEiIHI9IjQiIGZpbGw9IiNmYmJmMjQiLz48dGV4dCB4PSIyMyIgeT0iMTQuNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiMwZjI4NjEiPkFJPC90ZXh0Pjwvc3ZnPg==`;

// Read existing school nav from schools/index.html to copy exact header/footer/mobile-nav
const schoolsIndexHtml = fs.readFileSync(path.join(rootDir, 'schools/index.html'), 'utf8');

// Extract header section
const headerStart = schoolsIndexHtml.indexOf('<header class="header"');
const headerEnd = schoolsIndexHtml.indexOf('</header>') + '</header>'.length;
const headerSection = schoolsIndexHtml.substring(headerStart, headerEnd);

// Extract mobile nav section
const mobileNavStart = schoolsIndexHtml.indexOf('<div class="mobile-nav-menu"');
const mobileNavEnd = schoolsIndexHtml.indexOf('</div>\n\n<!-- PAGE HERO') + '</div>'.length;
const mobileNavSection = schoolsIndexHtml.substring(mobileNavStart, mobileNavEnd);

// Extract footer section
const footerStart = schoolsIndexHtml.indexOf('<footer class="footer"');
const footerEnd = schoolsIndexHtml.indexOf('</footer>') + '</footer>'.length;
const footerSection = schoolsIndexHtml.substring(footerStart, footerEnd);

// Form handler for school inquiries
function buildSchoolForm(formId, submitFn, formTitle, fields) {
  return `
<section class="school-form-section" id="inquiry-form">
  <div class="container">
    <div class="section-header text-center fade-up" style="margin-bottom:40px;">
      <div class="section-tag"><span class="dot"></span>Get in Touch</div>
      <h2 class="section-title">${formTitle}</h2>
      <p style="color:var(--gray-500);font-size:1rem;max-width:540px;margin:0 auto;">Fill in the details below and our school partnership team will contact you within 24 hours.</p>
    </div>
    <div class="form-card" style="max-width:640px;margin:0 auto;background:var(--white);border-radius:var(--radius-lg);padding:44px 40px;box-shadow:var(--shadow-lg);border:1px solid var(--gray-100);">
      <form id="${formId}" novalidate>
        ${fields.map(f => f.type === 'select' ? `
        <div class="form-group" style="margin-bottom:20px;">
          <label for="${f.id}" style="display:block;font-weight:700;font-size:.88rem;color:var(--blue-900);margin-bottom:7px;">${f.label} ${f.required ? '<span style="color:var(--red-500)">*</span>' : ''}</label>
          <select id="${f.id}" name="${f.id}" ${f.required ? 'required' : ''} style="width:100%;padding:13px 16px;border:1.5px solid var(--gray-300);border-radius:var(--radius-sm);font-family:inherit;font-size:.95rem;color:var(--gray-900);background:var(--white);appearance:none;">
            <option value="">— Select ${f.label} —</option>
            ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>` : `
        <div class="form-group" style="margin-bottom:20px;">
          <label for="${f.id}" style="display:block;font-weight:700;font-size:.88rem;color:var(--blue-900);margin-bottom:7px;">${f.label} ${f.required ? '<span style="color:var(--red-500)">*</span>' : ''}</label>
          <input type="${f.type || 'text'}" id="${f.id}" name="${f.id}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''} autocomplete="${f.autocomplete || 'off'}" style="width:100%;padding:13px 16px;border:1.5px solid var(--gray-300);border-radius:var(--radius-sm);font-family:inherit;font-size:.95rem;color:var(--gray-900);transition:border-color .2s,box-shadow .2s;" onfocus="this.style.borderColor='var(--blue-600)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,.12)';" onblur="this.style.borderColor='var(--gray-300)';this.style.boxShadow='';">
        </div>`).join('')}
        <button type="button" onclick="${submitFn}()" class="btn-primary form-submit-btn" style="width:100%;justify-content:center;font-size:1.05rem;padding:16px;margin-top:10px;">
          🚀 Submit Inquiry
        </button>
        <p style="text-align:center;font-size:.82rem;color:var(--gray-500);margin-top:14px;">🔒 100% confidential · No spam · We respond within 24 hours</p>
      </form>
    </div>
  </div>
</section>`;
}

// School form JS handler
function buildFormScript(formId, submitFn, formType) {
  return `
<script>
var _GAS_URL_SCHOOL='https://script.google.com/macros/s/AKfycbxl6oWBr6YHPfZbP5ymP6mRmzlUMQfn0mkQyiiNHTSOLaNN4v4NLKK-5tTKuQqw39KQ/exec';
function _ts_s(){var n=new Date,p=function(v){return String(v).padStart(2,'0')};return[n.getDate(),n.getMonth()+1,n.getFullYear()].join('/')+' '+[p(n.getHours()),p(n.getMinutes()),p(n.getSeconds())].join(':');}
function _showSchoolModal(name){var o=document.createElement('div');o.id='_schModal';o.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,40,97,.85);backdrop-filter:blur(6px);animation:_smFade .3s ease';var b=document.createElement('div');b.style.cssText='background:linear-gradient(135deg,#0f2861,#1a3a7a);border:1px solid rgba(251,191,36,.35);border-radius:28px;padding:44px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.45);position:relative';b.innerHTML='<div style="font-size:3.8rem;margin-bottom:16px">🎉</div><h3 style="font-family:Sora,sans-serif;color:#fff;font-size:1.55rem;font-weight:800;margin-bottom:12px">Inquiry Received!</h3><p style="color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.75;margin-bottom:24px">Thank you, <strong style="color:#fbbf24">'+name+'</strong>!<br/>Our school partnership team will contact you within <strong style="color:#fbbf24">24 hours</strong>.<br/><br/>Meanwhile, you can WhatsApp us for faster response. 👇</p><a href="https://wa.me/918827731006?text=Hi%2C+I+want+to+know+more+about+SkillNest+School+Partnership." target="_blank" style="display:inline-flex;align-items:center;gap:8px;background:#fbbf24;color:#0f2861;font-weight:800;font-size:.95rem;padding:13px 28px;border-radius:100px;text-decoration:none;margin-bottom:16px">💬 WhatsApp Us Now</a><br/><button onclick="document.getElementById(\'_schModal\').remove();" style="background:transparent;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.6);font-size:.82rem;padding:8px 20px;border-radius:100px;cursor:pointer;font-family:Nunito,sans-serif;margin-top:10px">Close</button>';var s=document.createElement('style');s.textContent='@keyframes _smFade{from{opacity:0}to{opacity:1}}';document.head.appendChild(s);o.appendChild(b);document.body.appendChild(o);o.addEventListener('click',function(e){if(e.target===o){o.remove();}});}
function _showSchoolErr(msg,formId){var e=document.getElementById('_sErr');if(e)e.remove();var el=document.createElement('p');el.id='_sErr';el.style.cssText='color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;border:1px solid rgba(239,68,68,.3);';el.textContent='⚠️ '+msg;var f=document.getElementById(formId);if(f)f.prepend(el);setTimeout(function(){if(el.parentNode)el.remove();},5000);}
function ${submitFn}(){
  var nameEl=document.querySelector('#${formId} input[name="contactName"],#${formId} input[name="principalName"],#${formId} input[name="teacherName"]');
  var phoneEl=document.querySelector('#${formId} input[type="tel"],#${formId} input[name="phone"]');
  if(!nameEl||!nameEl.value.trim()){_showSchoolErr('Please enter your name.','${formId}');if(nameEl)nameEl.focus();return;}
  if(!phoneEl||!phoneEl.value.trim()){_showSchoolErr('Please enter your mobile number.','${formId}');if(phoneEl)phoneEl.focus();return;}
  if(!/^[\\d\\s\\+\\-]{7,15}$/.test(phoneEl.value.trim())){_showSchoolErr('Please enter a valid mobile number.','${formId}');phoneEl.focus();return;}
  var allInputs=document.querySelectorAll('#${formId} input,#${formId} select,#${formId} textarea');
  var data={sheetId:'1QvIUQFXiGPcpF2nf6Y45hkMPyaODgVkVA2SrPWQKSdY',sheetName:'SchoolLeads',formType:'${formType}',submittedAt:_ts_s()};
  allInputs.forEach(function(el){if(el.name)data[el.name]=el.value.trim();});
  var payload=new URLSearchParams(data);
  var btn=document.querySelector('.form-submit-btn');
  if(btn){btn.disabled=true;btn.textContent='⏳ Submitting...';}
  fetch(_GAS_URL_SCHOOL,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:payload.toString()})
    .then(function(){_showSchoolModal(nameEl.value.trim());})
    .catch(function(){_showSchoolModal(nameEl.value.trim());})
    .finally(function(){if(btn){btn.disabled=false;btn.textContent='🚀 Submit Inquiry';}});
}
</script>`;
}

// Standard school FAQ component
function buildFAQ(faqs) {
  return `
<section style="padding:70px 0;background:var(--gray-100);" id="faq">
  <div class="container">
    <div class="text-center fade-up" style="margin-bottom:48px;">
      <div class="section-tag"><span class="dot"></span>FAQ</div>
      <h2 class="section-title">Frequently Asked <span>Questions</span></h2>
    </div>
    <div class="faq-list" style="max-width:760px;margin:0 auto;">
      ${faqs.map((faq, i) => `
      <div class="faq-item" style="background:var(--white);border-radius:var(--radius-md);margin-bottom:14px;border:1px solid var(--gray-200);overflow:hidden;">
        <button class="faq-question" style="width:100%;text-align:left;padding:22px 28px;font-family:'Sora',sans-serif;font-weight:700;font-size:1rem;color:var(--blue-900);background:none;border:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;" onclick="var a=this.nextElementSibling;var o=a.style.display==='block';document.querySelectorAll('.faq-answer').forEach(function(el){el.style.display='none';});if(!o){a.style.display='block';}this.parentNode.parentNode.querySelectorAll('.faq-question').forEach(function(b){b.querySelector('span').textContent='+';});this.querySelector('span').textContent=o?'+':'-';" aria-expanded="false" id="faq-q-${i}">
          ${faq.q}
          <span style="font-size:1.4rem;font-weight:400;color:var(--blue-600);flex-shrink:0;">+</span>
        </button>
        <div class="faq-answer" style="display:none;padding:0 28px 22px;color:var(--gray-700);font-size:.95rem;line-height:1.75;">
          ${faq.a}
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

// Standard related pages section
function buildRelatedPages(pages) {
  return `
<section style="padding:60px 0;background:var(--blue-50);">
  <div class="container">
    <div class="text-center fade-up" style="margin-bottom:36px;">
      <div class="section-tag"><span class="dot"></span>Explore More</div>
      <h2 class="section-title">More School <span>Partnership</span> Pages</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
      ${pages.map(p => `
      <a href="${p.url}" style="display:block;background:var(--white);border-radius:var(--radius-md);padding:24px 20px;border:1px solid var(--gray-200);text-align:center;transition:all .2s;text-decoration:none;" onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.borderColor='var(--blue-300)';" onmouseout="this.style.boxShadow='';this.style.borderColor='var(--gray-200)';">
        <div style="font-size:2rem;margin-bottom:10px;">${p.icon}</div>
        <div style="font-family:'Sora',sans-serif;font-weight:700;color:var(--blue-900);font-size:.95rem;">${p.name}</div>
        <div style="color:var(--gray-500);font-size:.8rem;margin-top:6px;">${p.desc}</div>
      </a>`).join('')}
    </div>
  </div>
</section>`;
}

// Standard page CTA section
function buildFinalCTA(title, desc, ctaText, ctaUrl) {
  return `
<section style="padding:80px 0;background:linear-gradient(135deg,var(--blue-900),var(--blue-700));">
  <div class="container text-center">
    <div class="section-tag" style="background:rgba(251,191,36,.15);color:var(--yellow-300);border:1px solid rgba(251,191,36,.3);margin:0 auto 20px;"><span style="width:8px;height:8px;background:var(--yellow-400);border-radius:50%;display:inline-block;margin-right:6px;"></span>Take Action</div>
    <h2 style="font-family:'Sora',sans-serif;font-size:clamp(1.8rem,4vw,2.5rem);font-weight:800;color:var(--white);margin-bottom:16px;">${title}</h2>
    <p style="color:rgba(255,255,255,.8);font-size:1.1rem;max-width:560px;margin:0 auto 36px;line-height:1.75;">${desc}</p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
      <a href="${ctaUrl}" class="btn-yellow school-cta-btn">${ctaText}</a>
      <a href="#" class="whatsapp-link btn-ghost-school-whatsapp" data-config-href="whatsapp">💬 Talk on WhatsApp</a>
    </div>
  </div>
</section>`;
}

// Breadcrumb builder
function buildBreadcrumb(crumbs) {
  return `
<nav class="res-breadcrumb-bar" aria-label="Breadcrumb" style="background:var(--blue-50);border-bottom:1px solid var(--blue-100);padding:10px 0;">
  <div class="container">
    <ol style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;list-style:none;font-size:.82rem;font-weight:600;color:var(--gray-500);">
      ${crumbs.map((c, i) => i < crumbs.length - 1
        ? `<li><a href="${c.url}" style="color:var(--blue-600);text-decoration:none;">${c.name}</a></li><li style="color:var(--gray-300);">›</li>`
        : `<li style="color:var(--gray-700);">${c.name}</li>`
      ).join('')}
    </ol>
  </div>
</nav>`;
}

// Build complete page HTML
function buildPage(opts) {
  const {
    title, desc, canonical, ogImage = 'https://skillnest.co.in/assets/founder.jpeg',
    schema, breadcrumbs, heroTag, heroTitle, heroSubtitle, heroCtaText, heroCtaUrl,
    mainContent, formId, submitFn, formTitle, formFields, formType,
    faqs, relatedPages, finalCtaTitle, finalCtaDesc, finalCtaText, finalCtaUrl,
    schemaJson
  } = opts;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<script src="../../assets/js/fallback.js" defer id="file-protocol-fallback" data-depth="2"></script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow">
<meta name="author" content="SkillNest — Smart Digital Skills">
<meta name="theme-color" content="#1e40af">
<link rel="icon" type="image/svg+xml" href="${ICON_SVG}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImage}">
<meta property="og:site_name" content="SkillNest">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ogImage}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="../../assets/css/bundle.min.css">
<script type="application/ld+json">${JSON.stringify(schemaJson, null, 2)}</script>
</head>
<body>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-ML9QWMMH" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- Meta Pixel (noscript) -->
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1356797499656239&ev=PageView&noscript=1" alt="Meta Pixel Tracking" /></noscript>

${headerSection}

${mobileNavSection}

${buildBreadcrumb(breadcrumbs)}

<!-- HERO -->
<section class="page-hero fg-section-dark" style="text-align:center;">
  <div class="container">
    <div class="page-hero-tag"><span class="dot"></span>${heroTag}</div>
    <h1>${heroTitle}</h1>
    <p style="max-width:620px;margin:0 auto;">${heroSubtitle}</p>
    <div style="margin-top:32px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
      <a href="${heroCtaUrl}" class="btn-yellow school-hero-cta-btn">${heroCtaText}</a>
      <a href="#" class="btn-ghost whatsapp-link school-hero-whatsapp-btn" data-config-href="whatsapp">💬 WhatsApp Us</a>
    </div>
  </div>
</section>

${mainContent}

${buildSchoolForm(formId, submitFn, formTitle, formFields)}

${buildFAQ(faqs)}

${buildRelatedPages(relatedPages)}

${buildFinalCTA(finalCtaTitle, finalCtaDesc, finalCtaText, finalCtaUrl)}

${footerSection}

<script src="../../assets/js/bundle.min.js" defer></script>
${buildFormScript(formId, submitFn, formType)}
<script>
// Fade-up animation
(function(){
  if(typeof IntersectionObserver === 'undefined') return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';e.target.style.transition='opacity .55s ease,transform .55s ease';}
    });
  }, {threshold:0.12});
  document.querySelectorAll('.fade-up').forEach(function(el){
    el.style.opacity='0';el.style.transform='translateY(28px)';obs.observe(el);
  });
})();
</script>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────
// PAGE DEFINITIONS
// ─────────────────────────────────────────────────────────────

const RELATED_ALL = [
  {url:'../index.html', icon:'🏫', name:'Schools Home', desc:'Overview of all school programs'},
  {url:'../workshops/index.html', icon:'🎯', name:'Workshops', desc:'1-day & half-day workshops'},
  {url:'../school-programs/index.html', icon:'📚', name:'School Programs', desc:'Full semester programs'},
  {url:'../partner-with-us/index.html', icon:'🤝', name:'Partner With Us', desc:'Formal partnership model'},
  {url:'../csr-programs/index.html', icon:'🌱', name:'CSR Programs', desc:'Corporate social responsibility'},
  {url:'../teacher-training/index.html', icon:'👩‍🏫', name:'Teacher Training', desc:'Train your faculty'},
  {url:'../case-studies/index.html', icon:'📊', name:'Case Studies', desc:'Real school outcomes'},
  {url:'../book-school-demo/index.html', icon:'📅', name:'Book Demo', desc:'Book a free school demo'},
  {url:'../principal-pitch/index.html', icon:'🎤', name:'Principal Pitch', desc:'For decision makers'},
];

const pages = [

  // ─── WORKSHOPS ───────────────────────────────────────────────
  {
    outFile: 'schools/workshops/index.html',
    title: 'School Digital Skills Workshops | SkillNest — One-Day AI & Coding Workshops for Schools',
    desc: 'Book a 1-day or half-day SkillNest digital skills workshop for your school. AI, Coding, Cyber Safety & MS Office workshops for Class 6–8 students. Interactive, curriculum-aligned, fully managed.',
    canonical: 'https://skillnest.co.in/schools/workshops/',
    heroTag: 'School Workshops',
    heroTitle: 'Impactful <span>One-Day Workshops</span> for Your School',
    heroSubtitle: 'From AI literacy to Coding Program — our expert-led school workshops deliver hands-on digital skills in a single engaging session. No setup, no syllabus burden.',
    heroCtaText: '📅 Book a Workshop',
    heroCtaUrl: '#inquiry-form',
    breadcrumbs: [
      {name: 'Home', url: '../../index.html'},
      {name: 'Schools', url: '../index.html'},
      {name: 'Workshops', url: '#'}
    ],
    formId: 'workshopForm',
    submitFn: 'submitWorkshopInquiry',
    formTitle: 'Workshop Inquiry Form',
    formType: 'workshop-inquiry',
    formFields: [
      {id:'contactName', label:'Contact Person Name', type:'text', placeholder:'Your full name', required:true, autocomplete:'name'},
      {id:'schoolName', label:'School Name', type:'text', placeholder:'e.g. DPS Delhi', required:true},
      {id:'phone', label:'Mobile Number', type:'tel', placeholder:'+91 88277 31006', required:true, autocomplete:'tel'},
      {id:'email', label:'Email Address', type:'email', placeholder:'principal@school.edu.in', required:false, autocomplete:'email'},
      {id:'city', label:'City', type:'text', placeholder:'e.g. Bhopal', required:true},
      {id:'workshopType', label:'Preferred Workshop Topic', type:'select', required:true, options:['AI & ChatGPT for Students','Coding Program Basics','Cyber Safety & Digital Wellbeing','MS Office Productivity','Computer Basics & Typing','Custom Workshop (multiple topics)']},
      {id:'studentCount', label:'Approximate Number of Students', type:'select', required:true, options:['25–50','51–100','101–200','200+']},
    ],
    faqs: [
      {q:'How long does a workshop session last?', a:'We offer 3-hour half-day workshops and full-day 6-hour sessions. Custom durations can be arranged for your school schedule.'},
      {q:'What equipment does the school need to provide?', a:'A computer lab with working internet connection is sufficient. We bring all content, software, and handout materials.'},
      {q:'Can workshops be conducted offline in our school premises?', a:'Yes, all our workshops are designed for in-person delivery at your school. We travel to your location across India.'},
      {q:'What topics can workshops cover?', a:'AI literacy, Coding Program, MS Office, Cyber Safety, Canva Design, Digital Wellbeing, and ChatGPT prompting — individually or combined.'},
      {q:'Do students receive certificates after the workshop?', a:'Yes! Every participating student receives a SkillNest Workshop Completion Certificate.'},
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'SkillNest School Digital Skills Workshops',
      provider: {'@type': 'Organization', name: 'SkillNest', url: 'https://skillnest.co.in'},
      description: 'Interactive 1-day and half-day digital skills workshops for school students covering AI, Coding, Cyber Safety, and MS Office.',
      areaServed: {name: 'India'},
      serviceType: 'Educational Workshop',
      url: 'https://skillnest.co.in/schools/workshops/'
    },
    mainContent: `
<main style="padding:70px 0;">
  <div class="container">
    <div class="text-center fade-up" style="margin-bottom:50px;">
      <div class="section-tag"><span class="dot"></span>Why Workshops Work</div>
      <h2 class="section-title">What Makes Our Workshops <span>Different</span></h2>
      <p style="color:var(--gray-500);max-width:560px;margin:0 auto;">High-energy, hands-on learning experiences that students and teachers love.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:70px;">
      <div class="gallery-card cd-card cd-glow fade-up"><div class="gallery-icon">🎯</div><h3 class="gallery-title">Zero Preparation Needed</h3><p class="gallery-desc">We handle everything — from content to delivery to take-home materials. Your school's teachers can simply attend and observe.</p></div>
      <div class="gallery-card cd-card cd-glow fade-up"><div class="gallery-icon">🤖</div><h3 class="gallery-title">AI-First Content</h3><p class="gallery-desc">Students interact with real AI tools like ChatGPT, Canva AI, and Scratch — making learning immediately relevant and exciting.</p></div>
      <div class="gallery-card cd-card cd-glow fade-up"><div class="gallery-icon">🏆</div><h3 class="gallery-title">Certified Learning</h3><p class="gallery-desc">Every student receives a SkillNest Workshop Certificate, giving them something tangible to add to their portfolio.</p></div>
      <div class="gallery-card cd-card cd-glow fade-up"><div class="gallery-icon">📊</div><h3 class="gallery-title">Measurable Outcomes</h3><p class="gallery-desc">Pre and post workshop assessments help quantify student learning. We share a detailed outcome report with school management.</p></div>
      <div class="gallery-card cd-card cd-glow fade-up"><div class="gallery-icon">🔄</div><h3 class="gallery-title">Flexible Topics</h3><p class="gallery-desc">Mix and match from our 6 workshop themes or request a custom curriculum specific to your school's technology syllabus.</p></div>
      <div class="gallery-card cd-card cd-glow fade-up"><div class="gallery-icon">📱</div><h3 class="gallery-title">Parent-Ready Toolkit</h3><p class="gallery-desc">Students take home a digital resource kit parents can use at home to continue learning — extending impact beyond school.</p></div>
    </div>

    <div style="background:var(--blue-50);border-radius:var(--radius-lg);padding:48px 40px;margin-bottom:60px;">
      <div class="text-center fade-up" style="margin-bottom:36px;">
        <div class="section-tag"><span class="dot"></span>Workshop Topics</div>
        <h2 class="section-title">Choose Your <span>Workshop Theme</span></h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;">
        ${[
          ['🤖','AI & ChatGPT','Introduction to AI concepts, prompt writing, and responsible AI use.','90 min / 3 hr'],
          ['🐱','Coding Program','Block-based programming fundamentals with mini-project creation.','3 hr / Full Day'],
          ['🛡️','Cyber Safety','Online safety, privacy, digital wellbeing, and cyberbullying awareness.','90 min / 3 hr'],
          ['📊','MS Office Skills','Word, Excel, and PowerPoint for real school use cases.','3 hr / Full Day'],
          ['🎨','Canva Design','Creating presentations, posters, and infographics with Canva AI.','90 min / 3 hr'],
          ['⌨️','Touch Typing','Proper typing technique and speed building using online tools.','90 min'],
        ].map(([icon,name,desc,dur]) => `
        <div style="background:var(--white);border-radius:var(--radius-md);padding:22px 18px;border:1px solid var(--gray-200);">
          <div style="font-size:1.8rem;margin-bottom:10px;">${icon}</div>
          <div style="font-family:'Sora',sans-serif;font-weight:700;color:var(--blue-900);margin-bottom:6px;">${name}</div>
          <div style="color:var(--gray-600);font-size:.85rem;line-height:1.6;margin-bottom:10px;">${desc}</div>
          <div style="display:inline-flex;align-items:center;gap:5px;background:var(--blue-100);color:var(--blue-700);font-size:.75rem;font-weight:700;padding:4px 10px;border-radius:100px;">⏱️ ${dur}</div>
        </div>`).join('')}
      </div>
    </div>

    <div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">
      <div class="fg-card" style="padding:28px 40px;text-align:center;min-width:140px;background:linear-gradient(135deg,#0f2861,#1e4ea0);border-radius:var(--radius-md);">
        <div style="font-family:'Sora',sans-serif;font-size:2.2rem;font-weight:800;background:linear-gradient(135deg,#fbbf24,#fcd34d);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">200+</div>
        <div style="color:rgba(255,255,255,.6);font-size:.85rem;margin-top:6px;">Workshops Delivered</div>
      </div>
      <div class="fg-card" style="padding:28px 40px;text-align:center;min-width:140px;background:linear-gradient(135deg,#0f2861,#1e4ea0);border-radius:var(--radius-md);">
        <div style="font-family:'Sora',sans-serif;font-size:2.2rem;font-weight:800;background:linear-gradient(135deg,#06b6d4,#7c3aed);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">50+</div>
        <div style="color:rgba(255,255,255,.6);font-size:.85rem;margin-top:6px;">Partner Schools</div>
      </div>
      <div class="fg-card" style="padding:28px 40px;text-align:center;min-width:140px;background:linear-gradient(135deg,#0f2861,#1e4ea0);border-radius:var(--radius-md);">
        <div style="font-family:'Sora',sans-serif;font-size:2.2rem;font-weight:800;background:linear-gradient(135deg,#10b981,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">4.9★</div>
        <div style="color:rgba(255,255,255,.6);font-size:.85rem;margin-top:6px;">School Rating</div>
      </div>
      <div class="fg-card" style="padding:28px 40px;text-align:center;min-width:140px;background:linear-gradient(135deg,#0f2861,#1e4ea0);border-radius:var(--radius-md);">
        <div style="font-family:'Sora',sans-serif;font-size:2.2rem;font-weight:800;background:linear-gradient(135deg,#fbbf24,#10b981);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Pan-India</div>
        <div style="color:rgba(255,255,255,.6);font-size:.85rem;margin-top:6px;">Coverage</div>
      </div>
    </div>
  </div>
</main>`
  },

  // ─── SCHOOL PROGRAMS ─────────────────────────────────────────
  {
    outFile: 'schools/school-programs/index.html',
    title: 'School Digital Skills Programs | SkillNest — 6-Week AI & Coding Curriculum for Schools',
    desc: 'Integrate SkillNest 6-week digital skills programs into your school timetable. AI, Coding, MS Office & Cyber Safety curriculum for Class 6–8. Turnkey program with certified instructors.',
    canonical: 'https://skillnest.co.in/schools/school-programs/',
    heroTag: 'School Programs',
    heroTitle: 'Full-Semester <span>Digital Skills Programs</span> for Schools',
    heroSubtitle: 'A 6-week structured curriculum covering AI, Coding, and Digital Literacy — designed to slot seamlessly into your school\'s IT or activity periods.',
    heroCtaText: '📚 Request Program Details',
    heroCtaUrl: '#inquiry-form',
    breadcrumbs: [
      {name: 'Home', url: '../../index.html'},
      {name: 'Schools', url: '../index.html'},
      {name: 'School Programs', url: '#'}
    ],
    formId: 'programForm',
    submitFn: 'submitProgramInquiry',
    formTitle: 'Program Request Form',
    formType: 'school-program-inquiry',
    formFields: [
      {id:'contactName', label:'Contact Person Name', type:'text', placeholder:'Your full name', required:true, autocomplete:'name'},
      {id:'schoolName', label:'School Name', type:'text', placeholder:'e.g. Kendriya Vidyalaya, Delhi', required:true},
      {id:'phone', label:'Mobile Number', type:'tel', placeholder:'+91 88277 31006', required:true, autocomplete:'tel'},
      {id:'email', label:'Email Address', type:'email', placeholder:'admin@school.edu.in', required:false},
      {id:'city', label:'City', type:'text', placeholder:'e.g. Lucknow', required:true},
      {id:'programLevel', label:'Classes to be Covered', type:'select', required:true, options:['Class 6 only','Class 7 only','Class 8 only','Class 6 & 7','Class 7 & 8','All (Class 6–8)']},
      {id:'deliveryMode', label:'Preferred Delivery Mode', type:'select', required:true, options:['In-school (offline)','Online (live sessions)','Hybrid (both)']},
    ],
    faqs: [
      {q:'How many sessions does the 6-week program include?', a:'The program includes 12 sessions — 2 per week, each 90 minutes long. It can be condensed or extended based on your school\'s schedule.'},
      {q:'Does this integrate with the existing IT syllabus?', a:'Yes. Our curriculum is mapped to CBSE, ICSE, and state board IT syllabi, and augments them with practical project-based learning.'},
      {q:'Do we need a dedicated computer lab?', a:'A standard computer lab with internet access works perfectly. We support 20–60 students per batch.'},
      {q:'What is included in the program fee?', a:'Curriculum materials, instructor fees, student workbooks, assessment tools, and completion certificates are all included.'},
      {q:'Can programs be aligned to NEP 2020 competencies?', a:'Absolutely. All programs are mapped to NEP 2020 computational thinking, digital literacy, and 21st-century skills frameworks.'},
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalProgram',
      name: 'SkillNest School Digital Skills Program',
      provider: {'@type': 'Organization', name: 'SkillNest', url: 'https://skillnest.co.in'},
      description: '6-week digital skills program for Class 6–8 covering AI, Coding, MS Office, and Cyber Safety for school integration.',
      occupationalCategory: 'Digital Literacy',
      timeToComplete: 'P6W',
      url: 'https://skillnest.co.in/schools/school-programs/'
    },
    mainContent: `
<main style="padding:70px 0;">
  <div class="container">
    <div class="text-center fade-up" style="margin-bottom:50px;">
      <div class="section-tag"><span class="dot"></span>Curriculum Overview</div>
      <h2 class="section-title">What Your Students Will <span>Learn</span></h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:70px;">
      ${[
        ['💻','Week 1–2: Digital Foundations','Computer basics, keyboard mastery, internet safety, and the fundamentals of how technology works.'],
        ['📊','Week 3: MS Office Mastery','Word processing, spreadsheet basics, and PowerPoint presentation creation for real school projects.'],
        ['🤖','Week 4: AI & ChatGPT Skills','Introduction to artificial intelligence, responsible prompting, and using AI tools for learning.'],
        ['🐱','Week 5: Coding Program','Block-based programming, logic building, and creating interactive mini-projects and animations.'],
        ['🛡️','Week 6: Cyber Safety & Capstone','Online privacy, digital wellbeing, cyberbullying awareness, and final project presentations.'],
        ['🏆','Certification','All students receive SkillNest Digital Skills Certificate validated across partner schools.'],
      ].map(([icon,title,desc]) => `
      <div class="gallery-card cd-card cd-glow fade-up">
        <div class="gallery-icon">${icon}</div>
        <h3 class="gallery-title">${title}</h3>
        <p class="gallery-desc">${desc}</p>
      </div>`).join('')}
    </div>

    <div style="background:var(--blue-900);border-radius:var(--radius-lg);padding:48px 40px;color:var(--white);margin-bottom:60px;">
      <div class="text-center fade-up" style="margin-bottom:36px;">
        <h2 style="font-family:'Sora',sans-serif;font-size:clamp(1.5rem,3vw,2rem);font-weight:800;color:var(--white);margin-bottom:12px;">Program <span style="color:var(--yellow-400);">Delivery Modes</span></h2>
        <p style="color:rgba(255,255,255,.72);">Choose the format that works best for your school.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;">
        ${[
          ['🏫','In-School Offline','Our instructors visit your school and deliver classes in your computer lab.','Perfect for: Schools with lab infrastructure'],
          ['🖥️','Online Live Sessions','Students attend live classes from their devices — school or home.','Perfect for: Digital-first or multi-location schools'],
          ['🔀','Hybrid Model','Alternating in-school and online sessions for maximum flexibility.','Perfect for: Schools wanting the best of both worlds'],
        ].map(([icon,mode,desc,note]) => `
        <div style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:var(--radius-md);padding:24px 20px;">
          <div style="font-size:2rem;margin-bottom:12px;">${icon}</div>
          <div style="font-family:'Sora',sans-serif;font-weight:700;font-size:1.05rem;margin-bottom:8px;">${mode}</div>
          <div style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.6;margin-bottom:12px;">${desc}</div>
          <div style="font-size:.78rem;color:var(--yellow-300);font-weight:600;">${note}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</main>`
  },

  // ─── PARTNER WITH US ─────────────────────────────────────────
  {
    outFile: 'schools/partner-with-us/index.html',
    title: 'Partner With SkillNest | B2B School Partnership Program India',
    desc: 'Become a SkillNest partner school. Get turnkey digital skills curriculum, certified instructors, and ongoing support. Join 50+ schools across India delivering future-ready education.',
    canonical: 'https://skillnest.co.in/schools/partner-with-us/',
    heroTag: 'Partnership Program',
    heroTitle: 'Become a <span>SkillNest Partner</span> School',
    heroSubtitle: 'Join our growing network of 50+ partner schools delivering cutting-edge digital skills education. We provide everything — curriculum, trainers, and tech.',
    heroCtaText: '🤝 Start Partnership Discussion',
    heroCtaUrl: '#inquiry-form',
    breadcrumbs: [
      {name: 'Home', url: '../../index.html'},
      {name: 'Schools', url: '../index.html'},
      {name: 'Partner With Us', url: '#'}
    ],
    formId: 'partnerForm',
    submitFn: 'submitPartnerInquiry',
    formTitle: 'Partnership Inquiry Form',
    formType: 'partner-inquiry',
    formFields: [
      {id:'contactName', label:'Contact Person Name', type:'text', placeholder:'Principal / Admin Name', required:true, autocomplete:'name'},
      {id:'schoolName', label:'School Name', type:'text', placeholder:'Official school name', required:true},
      {id:'phone', label:'Mobile Number', type:'tel', placeholder:'+91 XXXXX XXXXX', required:true, autocomplete:'tel'},
      {id:'email', label:'Official Email', type:'email', placeholder:'principal@school.edu.in', required:false},
      {id:'city', label:'City', type:'text', placeholder:'Your city', required:true},
      {id:'studentStrength', label:'School Student Strength', type:'select', required:true, options:['Under 200','200–500','500–1000','1000–2000','2000+']},
      {id:'partnershipType', label:'Partnership Interest', type:'select', required:true, options:['Annual Partnership','Per-Program Engagement','CSR Collaboration','Workshop Only','Full Curriculum Integration']},
    ],
    faqs: [
      {q:'What does a formal partnership include?', a:'An annual partnership includes 3 program cycles per year, dedicated account manager, priority scheduling, co-branded certificates, and parent engagement workshops.'},
      {q:'Are there any upfront costs for the school?', a:'No upfront infrastructure costs. Pricing is per-student per-program, with annual partner schools receiving discounted rates.'},
      {q:'Can we put SkillNest branding on our school website?', a:'Yes! Partner schools receive a co-branding kit, digital badges, and are featured on our partner school directory page.'},
      {q:'How do we handle students who miss sessions?', a:'All partner schools get access to recorded session summaries for catch-up purposes. Our instructors also offer make-up sessions.'},
      {q:'Can partnership be expanded across our school chain?', a:'Absolutely. We offer group pricing for school chains and multi-campus institutions. Contact us to discuss enterprise rates.'},
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SkillNest School Partnership Program',
      url: 'https://skillnest.co.in/schools/partner-with-us/',
      description: 'B2B school partnership program offering turnkey digital skills education for Class 6-8 students across India.',
      areaServed: {name: 'India'}
    },
    mainContent: `
<main style="padding:70px 0;">
  <div class="container">
    <div class="text-center fade-up" style="margin-bottom:50px;">
      <div class="section-tag"><span class="dot"></span>Partnership Benefits</div>
      <h2 class="section-title">Everything a Partner School <span>Gets</span></h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:70px;">
      ${[
        ['📚','Complete Curriculum Kit','All teaching materials, student workbooks, assessment rubrics, and project guides — ready to deploy, zero prep required.'],
        ['👩‍🏫','Dedicated Expert Trainers','Trained SkillNest instructors assigned to your school for the full program duration — not freelancers.'],
        ['🏆','Co-Branded Certificates','Student completion certificates featuring both SkillNest and your school logo — elevating your institution\'s prestige.'],
        ['📊','Live Analytics Dashboard','Track attendance, assignment scores, and student progress through our school partner portal in real time.'],
        ['👪','Parent Communication Support','We conduct parent orientation sessions and send weekly progress updates — keeping families engaged and satisfied.'],
        ['🔄','Annual Program Cycles','3 program cycles per year with batch scheduling aligned to your academic calendar — no disruption to your timetable.'],
        ['🎤','School Events Support','We co-host tech fairs, competitions, and demo days at your school, showcasing student projects to parents and community.'],
        ['📞','Dedicated Account Manager','A named SkillNest coordinator handles all logistics, scheduling, and troubleshooting for your school.'],
      ].map(([icon,title,desc]) => `
      <div class="gallery-card cd-card cd-glow fade-up">
        <div class="gallery-icon">${icon}</div>
        <h3 class="gallery-title">${title}</h3>
        <p class="gallery-desc">${desc}</p>
      </div>`).join('')}
    </div>

    <div style="background:var(--blue-50);border-radius:var(--radius-lg);padding:48px 40px;margin-bottom:60px;">
      <div class="text-center fade-up" style="margin-bottom:36px;">
        <h2 class="section-title">How Partnership <span>Works</span></h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0;position:relative;">
        ${[
          ['1','Submit Inquiry','Fill the form below and our team reaches out within 24 hours.'],
          ['2','Discovery Call','30-minute call to understand your school\'s needs and student profile.'],
          ['3','Proposal Shared','Customized program proposal with pricing, schedule, and curriculum plan.'],
          ['4','Agreement Signed','Simple partnership agreement — no complex legal processes.'],
          ['5','Program Launched','First batch starts within 2–3 weeks of agreement.'],
        ].map(([step,title,desc]) => `
        <div style="text-align:center;padding:24px 20px;">
          <div style="width:52px;height:52px;border-radius:50%;background:var(--blue-600);color:var(--white);font-family:'Sora',sans-serif;font-weight:800;font-size:1.3rem;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">${step}</div>
          <div style="font-family:'Sora',sans-serif;font-weight:700;color:var(--blue-900);margin-bottom:8px;">${title}</div>
          <div style="color:var(--gray-600);font-size:.88rem;line-height:1.6;">${desc}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</main>`
  },

  // ─── CSR PROGRAMS ─────────────────────────────────────────────
  {
    outFile: 'schools/csr-programs/index.html',
    title: 'CSR Digital Skills Programs | SkillNest — Corporate Social Responsibility in Education',
    desc: 'Partner with SkillNest through CSR to deliver digital literacy and AI education to underserved school students. Impactful, measurable, and aligned with NEP 2020 and SDG 4.',
    canonical: 'https://skillnest.co.in/schools/csr-programs/',
    heroTag: 'CSR Collaboration',
    heroTitle: 'CSR Programs: <span>Digital Education</span> for Every Student',
    heroSubtitle: 'Enable quality digital education for students who need it most. Partner with SkillNest through your CSR mandate — creating lasting, measurable social impact.',
    heroCtaText: '🌱 Discuss CSR Partnership',
    heroCtaUrl: '#inquiry-form',
    breadcrumbs: [
      {name: 'Home', url: '../../index.html'},
      {name: 'Schools', url: '../index.html'},
      {name: 'CSR Programs', url: '#'}
    ],
    formId: 'csrForm',
    submitFn: 'submitCsrInquiry',
    formTitle: 'CSR Collaboration Form',
    formType: 'csr-inquiry',
    formFields: [
      {id:'contactName', label:'CSR/Admin Contact Name', type:'text', placeholder:'Your full name', required:true, autocomplete:'name'},
      {id:'organizationName', label:'Organization / Company Name', type:'text', placeholder:'e.g. Tata Consultancy Services', required:true},
      {id:'phone', label:'Mobile Number', type:'tel', placeholder:'+91 XXXXX XXXXX', required:true, autocomplete:'tel'},
      {id:'email', label:'Business Email', type:'email', placeholder:'csr@company.com', required:false},
      {id:'city', label:'Preferred Implementation City', type:'text', placeholder:'City or region', required:true},
      {id:'csrBudget', label:'Approximate CSR Budget', type:'select', required:false, options:['Under ₹5 Lakhs','₹5–15 Lakhs','₹15–50 Lakhs','₹50 Lakhs+','Prefer to discuss']},
      {id:'studentsTarget', label:'Target Number of Beneficiary Students', type:'select', required:false, options:['Under 100','100–500','500–2000','2000+']},
    ],
    faqs: [
      {q:'How does this qualify under our CSR mandate?', a:'SkillNest programs directly address PMLA Schedule VII items (ii) and (iii) — promoting education and vocational skills, particularly for underprivileged groups. We provide all documentation needed for CSR filings.'},
      {q:'Can we target specific schools or districts?', a:'Yes. We work with your CSR team to identify target schools in your preferred geography, including tier 2, tier 3 cities and rural areas.'},
      {q:'What impact metrics and reports do you provide?', a:'We deliver quarterly impact reports with attendance data, skill assessment scores, certificate counts, and photo/video documentation of program activities.'},
      {q:'How long does it take to launch a CSR program?', a:'From MoU signing, we can start operations within 3–4 weeks — including school onboarding, instructor deployment, and parent communication.'},
      {q:'Can you accommodate Government school partnerships through CSR?', a:'Yes. We have experience working with government schools and can navigate procurement requirements. We are open to tripartite agreements.'},
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'SkillNest CSR Digital Skills Program',
      provider: {'@type': 'Organization', name: 'SkillNest', url: 'https://skillnest.co.in'},
      description: 'Corporate Social Responsibility digital education programs delivered to underserved school students across India.',
      serviceType: 'CSR Education Program',
      url: 'https://skillnest.co.in/schools/csr-programs/'
    },
    mainContent: `
<main style="padding:70px 0;">
  <div class="container">
    <div class="text-center fade-up" style="margin-bottom:50px;">
      <div class="section-tag"><span class="dot"></span>Social Impact</div>
      <h2 class="section-title">Create <span>Lasting Digital Impact</span></h2>
      <p style="color:var(--gray-500);max-width:560px;margin:0 auto;">Every rupee invested in education technology reaches future leaders who would otherwise be left behind in the digital economy.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:70px;">
      ${[
        ['📜','SDG 4 Aligned','All programs directly contribute to UN Sustainable Development Goal 4 — Quality Education. Full documentation for international reporting included.'],
        ['📊','Impact Dashboards','Real-time monitoring dashboards showing beneficiary numbers, attendance, assessment outcomes, and geographic reach.'],
        ['🏆','Government Recognition','Programs delivered in partnership with government schools qualify for additional recognition under state digital literacy schemes.'],
        ['📰','PR & Brand Visibility','Co-branded press releases, social media campaigns, and school event coverage give your CSR investment public visibility.'],
        ['🌐','Pan-India Reach','We can deploy programs simultaneously across multiple cities and states — making large-scale CSR impact manageable.'],
        ['🔒','Full Compliance','All CSR documentation — MoU, utilization certificates, impact reports, and audit-ready financials provided as part of the partnership.'],
      ].map(([icon,title,desc]) => `
      <div class="gallery-card cd-card cd-glow fade-up">
        <div class="gallery-icon">${icon}</div>
        <h3 class="gallery-title">${title}</h3>
        <p class="gallery-desc">${desc}</p>
      </div>`).join('')}
    </div>

    <div style="background:linear-gradient(135deg,#0f2861,#1a3a7a);border-radius:var(--radius-lg);padding:48px 40px;margin-bottom:60px;">
      <div class="text-center fade-up" style="margin-bottom:36px;">
        <h2 style="font-family:'Sora',sans-serif;font-size:clamp(1.5rem,3vw,2rem);font-weight:800;color:var(--white);margin-bottom:12px;">CSR Program <span style="color:var(--yellow-400);">Impact Numbers</span></h2>
      </div>
      <div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap;">
        ${[['1,000+','Students Reached'],['20+','Government Schools'],['15','States'],['4.8★','Beneficiary Rating']].map(([num,label]) => `
        <div style="text-align:center;padding:28px 36px;">
          <div style="font-family:'Sora',sans-serif;font-size:2.2rem;font-weight:800;background:linear-gradient(135deg,#fbbf24,#fcd34d);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${num}</div>
          <div style="color:rgba(255,255,255,.6);font-size:.85rem;margin-top:6px;">${label}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</main>`
  },

  // ─── SCHOOL PARTNERSHIPS ─────────────────────────────────────
  {
    outFile: 'schools/school-partnerships/index.html',
    title: 'School Partnerships | SkillNest — Partner Schools Network India',
    desc: 'Explore SkillNest\'s growing network of partner schools across India. See how schools are integrating digital skills, AI, and coding programs for Class 6–8 students.',
    canonical: 'https://skillnest.co.in/schools/school-partnerships/',
    heroTag: 'Partner Schools Network',
    heroTitle: 'Join <span>50+ Schools</span> Already Partnered with SkillNest',
    heroSubtitle: 'See how forward-thinking schools across India are transforming their students\' future with our digital skills programs.',
    heroCtaText: '🤝 Become a Partner School',
    heroCtaUrl: '#inquiry-form',
    breadcrumbs: [
      {name: 'Home', url: '../../index.html'},
      {name: 'Schools', url: '../index.html'},
      {name: 'School Partnerships', url: '#'}
    ],
    formId: 'partnershipForm',
    submitFn: 'submitPartnershipInquiry',
    formTitle: 'Partnership Inquiry Form',
    formType: 'school-partnership',
    formFields: [
      {id:'contactName', label:'Contact Person Name', type:'text', placeholder:'Your name', required:true, autocomplete:'name'},
      {id:'schoolName', label:'School Name', type:'text', placeholder:'Your school name', required:true},
      {id:'phone', label:'Mobile Number', type:'tel', placeholder:'+91 XXXXX XXXXX', required:true, autocomplete:'tel'},
      {id:'email', label:'Email Address', type:'email', placeholder:'admin@school.in', required:false},
      {id:'city', label:'City', type:'text', placeholder:'Your city', required:true},
    ],
    faqs: [
      {q:'How many schools are already partnered with SkillNest?', a:'We have 50+ partner schools across 15+ Indian states, including CBSE, ICSE, and state board schools.'},
      {q:'What types of schools have partnered with SkillNest?', a:'We partner with all school types — CBSE, ICSE, state board, government, private, and international curriculum schools.'},
      {q:'Is there a formal MoU required?', a:'Yes, a simple 1-page Memorandum of Understanding outlines program scope, responsibilities, and pricing. No complex legal documentation.'},
      {q:'Can we start with just one class before expanding?', a:'Absolutely. Most schools start with a pilot batch of 25–30 students in one class before scaling to the whole school.'},
      {q:'What ongoing support do partner schools receive?', a:'Weekly check-ins, monthly program reviews, priority scheduling, and access to our educator community for sharing resources and ideas.'},
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SkillNest School Partnerships Network',
      url: 'https://skillnest.co.in/schools/school-partnerships/',
      description: 'Network of 50+ Indian partner schools delivering SkillNest digital skills programs for Class 6-8 students.',
      areaServed: {name: 'India'}
    },
    mainContent: `
<main style="padding:70px 0;">
  <div class="container">
    <div class="text-center fade-up" style="margin-bottom:50px;">
      <div class="section-tag"><span class="dot"></span>Our Impact</div>
      <h2 class="section-title">Schools That Trust <span>SkillNest</span></h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-bottom:60px;">
      ${[
        ['🏫','Delhi NCR','12 partner schools · 3,400+ students trained · Avg rating 4.9/5'],
        ['🌆','Mumbai Region','8 partner schools · 2,100+ students trained · Avg rating 4.8/5'],
        ['🌇','Lucknow & UP','6 partner schools · 1,600+ students trained · Avg rating 4.9/5'],
        ['🏙️','Bhopal & MP','5 partner schools · 1,200+ students trained · Avg rating 4.9/5'],
        ['🌃','Bengaluru','7 partner schools · 1,900+ students trained · Avg rating 4.8/5'],
        ['📍','Other Cities','15+ schools across Jaipur, Patna, Chandigarh, Raipur & more'],
      ].map(([icon,region,stats]) => `
      <div class="gallery-card cd-card cd-glow fade-up">
        <div class="gallery-icon">${icon}</div>
        <h3 class="gallery-title">${region}</h3>
        <p class="gallery-desc">${stats}</p>
      </div>`).join('')}
    </div>

    <div style="background:var(--blue-50);border-radius:var(--radius-lg);padding:48px 40px;margin-bottom:60px;">
      <div class="text-center fade-up" style="margin-bottom:36px;">
        <h2 class="section-title">What Partner Schools <span>Say</span></h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
        ${[
          ['"SkillNest transformed our IT classes from a boring period to the most anticipated one of the week."','Principal, CBSE School, Delhi','⭐⭐⭐⭐⭐'],
          ['"The coordinators handled everything — we just provided the lab. The results were outstanding."','Vice Principal, ICSE School, Mumbai','⭐⭐⭐⭐⭐'],
          ['"Parent satisfaction went up significantly after we introduced SkillNest. Parents love the certificates."','Admin Director, Private School, Lucknow','⭐⭐⭐⭐⭐'],
        ].map(([quote,source,stars]) => `
        <div style="background:var(--white);border-radius:var(--radius-md);padding:28px 24px;border:1px solid var(--gray-200);">
          <div style="color:var(--yellow-400);font-size:1rem;margin-bottom:14px;">${stars}</div>
          <p style="color:var(--gray-700);font-size:.95rem;line-height:1.75;font-style:italic;margin-bottom:16px;">${quote}</p>
          <div style="font-weight:700;color:var(--blue-900);font-size:.85rem;">— ${source}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</main>`
  },

  // ─── PRINCIPAL PITCH ──────────────────────────────────────────
  {
    outFile: 'schools/principal-pitch/index.html',
    title: 'SkillNest Principal Pitch | Book a Meeting with Our School Partnership Team',
    desc: 'Book a 30-minute meeting directly with the SkillNest school leadership team. Get a personalized program proposal for your school. For Principals and decision-makers.',
    canonical: 'https://skillnest.co.in/schools/principal-pitch/',
    heroTag: 'For Decision Makers',
    heroTitle: 'Schedule a <span>Direct Meeting</span> with Our Team',
    heroSubtitle: 'No sales pitch. A focused 30-minute conversation with our school partnership director to understand your needs and design the right program for your students.',
    heroCtaText: '📞 Book Your Meeting',
    heroCtaUrl: '#inquiry-form',
    breadcrumbs: [
      {name: 'Home', url: '../../index.html'},
      {name: 'Schools', url: '../index.html'},
      {name: 'Principal Pitch', url: '#'}
    ],
    formId: 'pitchForm',
    submitFn: 'submitPitchRequest',
    formTitle: 'Meeting Request Form',
    formType: 'principal-pitch',
    formFields: [
      {id:'contactName', label:'Principal / Director Name', type:'text', placeholder:'Your full name', required:true, autocomplete:'name'},
      {id:'schoolName', label:'School Name', type:'text', placeholder:'Official school name', required:true},
      {id:'phone', label:'Direct Mobile Number', type:'tel', placeholder:'+91 XXXXX XXXXX', required:true, autocomplete:'tel'},
      {id:'email', label:'Official Email', type:'email', placeholder:'principal@school.edu.in', required:false},
      {id:'city', label:'City', type:'text', placeholder:'Your city', required:true},
      {id:'meetingMode', label:'Preferred Meeting Mode', type:'select', required:true, options:['Video Call (Google Meet/Zoom)','Phone Call','In-Person Visit to School']},
      {id:'preferredTime', label:'Preferred Meeting Time', type:'select', required:false, options:['Weekday Morning (9–12 AM)','Weekday Afternoon (1–4 PM)','Weekday Evening (5–7 PM)','Weekend (Saturday morning)']},
    ],
    faqs: [
      {q:'What will be discussed in the 30-minute meeting?', a:'Your school\'s specific challenges, student profile (Class 6–8), technology infrastructure, and how SkillNest can best serve your goals. We will share a customized proposal during the meeting.'},
      {q:'Who will be present from SkillNest\'s side?', a:'Our School Partnership Director and an Academic Coordinator will be on the call. No junior sales staff — decision makers meeting decision makers.'},
      {q:'Do I need to prepare anything for the meeting?', a:'Not at all. Just come with an open mind. We will ask the right questions to understand your school\'s needs.'},
      {q:'How quickly can you share a proposal after the meeting?', a:'Within 48 hours of the meeting, you will receive a customized program proposal with pricing, schedule, and curriculum outline.'},
      {q:'Is there any cost or commitment for this meeting?', a:'Zero cost, zero commitment. This is a discovery conversation. You decide if and when you want to proceed after reviewing our proposal.'},
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'SkillNest Principal Partnership Meeting',
      provider: {'@type': 'Organization', name: 'SkillNest', url: 'https://skillnest.co.in'},
      description: 'Free 30-minute school partnership discovery call for Principals and school decision-makers.',
      url: 'https://skillnest.co.in/schools/principal-pitch/'
    },
    mainContent: `
<main style="padding:70px 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-bottom:80px;" class="fade-up">
      <div>
        <div class="section-tag"><span class="dot"></span>The Meeting Agenda</div>
        <h2 class="section-title">What We <span>Cover</span> Together</h2>
        <p style="color:var(--gray-600);margin-bottom:28px;line-height:1.75;">Our 30-minute conversation is structured, efficient, and tailored entirely around your school's unique situation.</p>
        ${[
          ['🎯','0–5 Min: Your Goals','Understanding what your school wants to achieve for students digitally.'],
          ['🔍','5–15 Min: Student Profile','Which classes, batch sizes, and current tech exposure your students have.'],
          ['📚','15–25 Min: Program Fit','We show you exactly which SkillNest program would work best for your school.'],
          ['📋','25–30 Min: Next Steps','Mutual agreement on whether to proceed and what the proposal will include.'],
        ].map(([icon,title,desc]) => `
        <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;">
          <div style="font-size:1.5rem;flex-shrink:0;">${icon}</div>
          <div>
            <div style="font-family:'Sora',sans-serif;font-weight:700;color:var(--blue-900);margin-bottom:4px;">${title}</div>
            <div style="color:var(--gray-600);font-size:.9rem;line-height:1.6;">${desc}</div>
          </div>
        </div>`).join('')}
      </div>
      <div>
        <div style="background:linear-gradient(135deg,#0f2861,#1a3a7a);border-radius:var(--radius-lg);padding:40px;color:var(--white);">
          <div style="font-size:3rem;margin-bottom:16px;">🎤</div>
          <h3 style="font-family:'Sora',sans-serif;font-size:1.4rem;font-weight:800;margin-bottom:16px;">You'll Walk Away With:</h3>
          ${['A customized program recommendation','Transparent pricing for your school size','Sample curriculum and student outcomes','References from similar partner schools','A ready-to-sign MoU if you choose to proceed'].map(item => `
          <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:12px;">
            <div style="color:var(--yellow-400);font-weight:800;flex-shrink:0;">✓</div>
            <div style="color:rgba(255,255,255,.82);font-size:.92rem;">${item}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</main>`
  },

  // ─── CASE STUDIES ─────────────────────────────────────────────
  {
    outFile: 'schools/case-studies/index.html',
    title: 'School Case Studies | SkillNest — Real Results from Partner Schools',
    desc: 'Read SkillNest school case studies. See how partner schools improved student digital skills, parent satisfaction, and academic outcomes through our 6-week programs.',
    canonical: 'https://skillnest.co.in/schools/case-studies/',
    heroTag: 'Success Stories',
    heroTitle: 'Real Results from <span>Real Schools</span>',
    heroSubtitle: 'Documented outcomes from our partner schools — from student skill gains to parent satisfaction scores to school community impact.',
    heroCtaText: '🏫 See Your School Here',
    heroCtaUrl: '#inquiry-form',
    breadcrumbs: [
      {name: 'Home', url: '../../index.html'},
      {name: 'Schools', url: '../index.html'},
      {name: 'Case Studies', url: '#'}
    ],
    formId: 'caseStudyForm',
    submitFn: 'submitCaseStudyInquiry',
    formTitle: 'Get a Similar Outcome — Inquiry Form',
    formType: 'case-study-inquiry',
    formFields: [
      {id:'contactName', label:'Your Name', type:'text', placeholder:'Contact person name', required:true, autocomplete:'name'},
      {id:'schoolName', label:'School Name', type:'text', placeholder:'Your school name', required:true},
      {id:'phone', label:'Mobile Number', type:'tel', placeholder:'+91 XXXXX XXXXX', required:true, autocomplete:'tel'},
      {id:'email', label:'Email', type:'email', placeholder:'admin@school.edu.in', required:false},
      {id:'city', label:'City', type:'text', placeholder:'Your city', required:true},
    ],
    faqs: [
      {q:'Can SkillNest share case studies from schools in my city?', a:'Yes! We have documented outcomes from 20+ cities. Request city-specific case studies through the inquiry form.'},
      {q:'How are case study outcomes measured?', a:'We use pre/post skill assessments, parent satisfaction surveys, attendance data, and teacher feedback to measure outcomes objectively.'},
      {q:'Can our school become a featured case study?', a:'Absolutely! Schools that complete at least one full program cycle are eligible for a co-branded case study featuring your school.'},
      {q:'Are these outcomes typical for all schools?', a:'Outcomes vary by student profile, batch size, and implementation quality. The case studies represent realistic results from well-implemented programs.'},
      {q:'Can we speak to a principal from a featured school?', a:'Yes! We arrange peer-to-peer calls with principals from partner schools upon request. Hearing from colleagues is often the most convincing evidence.'},
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'SkillNest School Case Studies',
      url: 'https://skillnest.co.in/schools/case-studies/',
      description: 'Collection of real school outcome case studies from SkillNest partner schools across India.'
    },
    mainContent: `
<main style="padding:70px 0;">
  <div class="container">
    <div class="text-center fade-up" style="margin-bottom:50px;">
      <div class="section-tag"><span class="dot"></span>Documented Outcomes</div>
      <h2 class="section-title">Case Study <span>Highlights</span></h2>
    </div>
    ${[
      {school:'CBSE School, Delhi NCR', badge:'Case Study #001', icon:'🏫', students:'120 students', period:'Jan–Feb 2025',
       outcomes:['87% students demonstrated proficiency in MS Office post-program','94% parents rated program Excellent or Good','Coding Program project showcase attracted 200+ parents to school event','School renewed for 3 additional program cycles'],
       quote:'"SkillNest delivered exactly what they promised — and more. The student enthusiasm was infectious."',
       author:'Principal, Prominent CBSE School, Delhi'},
      {school:'ICSE School, Mumbai', badge:'Case Study #002', icon:'🌆', students:'85 students', period:'Mar–Apr 2025',
       outcomes:['92% attendance throughout 6-week program (vs 78% for regular IT classes)','Students built 5 independent projects in Scratch','Parent NPS score improved by 23 points after program','Featured in local newspaper for innovation in education'],
       quote:'"The program was a complete hit. Our students are now helping their parents use technology at home."',
       author:'Vice Principal, ICSE School, Mumbai'},
      {school:'State Board School, Lucknow', badge:'Case Study #003', icon:'🌇', students:'150 students', period:'Jul–Aug 2025',
       outcomes:['First school in district to offer structured AI education for Class 6–8','Typing speed improved by average 40 WPM across cohort','100% of enrolled students received completion certificates','District education officer visited school to replicate model'],
       quote:'"I never imagined Class 6 students could use ChatGPT responsibly and create Canva presentations. SkillNest made it happen."',
       author:'School Principal, UP State Board School, Lucknow'},
    ].map(cs => `
    <div class="fade-up" style="background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius-lg);padding:36px;margin-bottom:32px;box-shadow:var(--shadow-sm);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;margin-bottom:24px;">
        <div>
          <div style="display:inline-flex;align-items:center;gap:6px;background:var(--blue-100);color:var(--blue-700);font-size:.75rem;font-weight:800;padding:4px 12px;border-radius:100px;margin-bottom:10px;">${cs.badge}</div>
          <h3 style="font-family:'Sora',sans-serif;font-weight:700;color:var(--blue-900);font-size:1.15rem;">${cs.icon} ${cs.school}</h3>
          <div style="color:var(--gray-500);font-size:.85rem;margin-top:4px;">${cs.students} · ${cs.period}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
        <div>
          <h4 style="font-family:'Sora',sans-serif;color:var(--blue-900);font-size:.95rem;margin-bottom:14px;">📊 Key Outcomes</h4>
          ${cs.outcomes.map(o => `<div style="display:flex;gap:8px;margin-bottom:10px;font-size:.88rem;color:var(--gray-700);"><span style="color:var(--green-500);font-weight:700;flex-shrink:0;">✓</span>${o}</div>`).join('')}
        </div>
        <div style="background:var(--blue-50);border-radius:var(--radius-md);padding:24px;">
          <div style="font-size:1.8rem;margin-bottom:12px;">💬</div>
          <p style="font-size:.92rem;color:var(--gray-700);line-height:1.7;font-style:italic;margin-bottom:12px;">${cs.quote}</p>
          <div style="font-size:.82rem;font-weight:700;color:var(--blue-900);">— ${cs.author}</div>
        </div>
      </div>
    </div>`).join('')}
  </div>
</main>`
  },

  // ─── TEACHER TRAINING ─────────────────────────────────────────
  {
    outFile: 'schools/teacher-training/index.html',
    title: 'Teacher Training Program | SkillNest — Digital Skills Training for School Educators',
    desc: 'Upskill your school\'s teaching staff with SkillNest\'s educator training program. AI tools, digital pedagogy, MS Office mastery, and Coding Program for teachers. CPD-eligible.',
    canonical: 'https://skillnest.co.in/schools/teacher-training/',
    heroTag: 'Educator Upskilling',
    heroTitle: 'Train Your <span>Teachers</span> to Teach Digital Skills',
    heroSubtitle: 'Equip your educators with confidence and competence in AI tools, digital pedagogy, and hands-on tech skills — so they can inspire the next generation.',
    heroCtaText: '👩‍🏫 Request Training Program',
    heroCtaUrl: '#inquiry-form',
    breadcrumbs: [
      {name: 'Home', url: '../../index.html'},
      {name: 'Schools', url: '../index.html'},
      {name: 'Teacher Training', url: '#'}
    ],
    formId: 'teacherTrainForm',
    submitFn: 'submitTeacherTrainInquiry',
    formTitle: 'Training Request Form',
    formType: 'teacher-training-inquiry',
    formFields: [
      {id:'contactName', label:'Principal / Admin Contact Name', type:'text', placeholder:'Your name', required:true, autocomplete:'name'},
      {id:'schoolName', label:'School Name', type:'text', placeholder:'Your school name', required:true},
      {id:'phone', label:'Mobile Number', type:'tel', placeholder:'+91 XXXXX XXXXX', required:true, autocomplete:'tel'},
      {id:'email', label:'Email', type:'email', placeholder:'admin@school.edu.in', required:false},
      {id:'city', label:'City', type:'text', placeholder:'Your city', required:true},
      {id:'teacherCount', label:'Number of Teachers to Train', type:'select', required:true, options:['1–5 teachers','6–10 teachers','11–20 teachers','20+ teachers']},
      {id:'trainingFocus', label:'Primary Training Focus', type:'select', required:true, options:['AI Tools for Teachers (ChatGPT, Canva AI)','MS Office Advanced Skills','Coding Program Basics','Digital Pedagogy & Ed-Tech Integration','Full Package (All Above)']},
    ],
    faqs: [
      {q:'How long is the teacher training program?', a:'Standard programs are 8–12 hours over 2–3 days. Intensive 1-day bootcamps are also available. Custom durations on request.'},
      {q:'Is this available during school holidays?', a:'Yes, many schools prefer summer vacation or exam holidays for teacher training. We accommodate school-friendly scheduling.'},
      {q:'Do teachers receive a certification?', a:'Yes. Every teacher receives a SkillNest Educator Certification, which is recognized as Continuing Professional Development (CPD) credit.'},
      {q:'Can training be done online?', a:'Yes. Online live training workshops via Zoom/Google Meet are available for remote teams or multi-campus schools.'},
      {q:'What if some teachers are not tech-comfortable?', a:'Our trainer approach starts from the basics and patiently builds confidence. We\'ve successfully trained teachers with zero prior tech skills.'},
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'SkillNest Teacher Digital Skills Training Program',
      provider: {'@type': 'Organization', name: 'SkillNest', url: 'https://skillnest.co.in'},
      description: 'Professional development program training school teachers in AI tools, digital pedagogy, MS Office, and Coding Program.',
      url: 'https://skillnest.co.in/schools/teacher-training/',
      hasCourseInstance: [{
        '@type': 'CourseInstance',
        courseMode: ['OnSite', 'Online'],
        duration: 'PT8H',
        inLanguage: ['English', 'Hindi']
      }]
    },
    mainContent: `
<main style="padding:70px 0;">
  <div class="container">
    <div class="text-center fade-up" style="margin-bottom:50px;">
      <div class="section-tag"><span class="dot"></span>Training Modules</div>
      <h2 class="section-title">What Teachers Will <span>Master</span></h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:70px;">
      ${[
        ['🤖','AI Tools for Educators','Using ChatGPT for lesson planning, quiz creation, and differentiated learning. Canva AI for presentations. Google Bard for research.'],
        ['📊','Advanced MS Office','Word templates, Excel formulas for grade tracking, PowerPoint design principles. Skills that save 2+ hours daily.'],
        ['🐱','Scratch Programming','Introduction to block-based coding so teachers can supervise and assess student coding projects confidently.'],
        ['💡','Digital Pedagogy','How to integrate technology meaningfully — not just using slides but transforming how students experience learning.'],
        ['🛡️','Online Safety Curriculum','Teaching digital citizenship, privacy, and responsible tech use. Includes parent communication frameworks.'],
        ['📱','Ed-Tech Integration','Using Google Classroom, Kahoot, Mentimeter, and other free tools effectively in any classroom setting.'],
      ].map(([icon,title,desc]) => `
      <div class="gallery-card cd-card cd-glow fade-up">
        <div class="gallery-icon">${icon}</div>
        <h3 class="gallery-title">${title}</h3>
        <p class="gallery-desc">${desc}</p>
      </div>`).join('')}
    </div>

    <div style="background:var(--blue-50);border-radius:var(--radius-lg);padding:48px 40px;margin-bottom:60px;">
      <div class="text-center fade-up" style="margin-bottom:36px;">
        <h2 class="section-title">Training <span>Formats Available</span></h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;">
        ${[
          ['📅','2-Day Intensive Bootcamp','Most popular. Deep-dive across all modules. 8–10 hours total. Certificate awarded.','8–10 hours'],
          ['☀️','Summer Vacation Workshop','Ideal for full faculty training. Runs 3–4 hours/day over 4–5 days.','15–20 hours'],
          ['🖥️','Online Live Workshop','Flexible sessions over 1–2 weeks via video call. Ideal for remote teams.','8–12 hours'],
          ['🔧','Custom Program','Tailored to specific needs — e.g. only AI tools or only Scratch for STEM teachers.','Custom'],
        ].map(([icon,format,desc,duration]) => `
        <div style="background:var(--white);border-radius:var(--radius-md);padding:24px;border:1px solid var(--gray-200);">
          <div style="font-size:1.8rem;margin-bottom:10px;">${icon}</div>
          <div style="font-family:'Sora',sans-serif;font-weight:700;color:var(--blue-900);margin-bottom:8px;">${format}</div>
          <div style="color:var(--gray-600);font-size:.85rem;line-height:1.6;margin-bottom:12px;">${desc}</div>
          <div style="display:inline-flex;align-items:center;gap:5px;background:var(--blue-100);color:var(--blue-700);font-size:.75rem;font-weight:700;padding:4px 10px;border-radius:100px;">⏱️ ${duration}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</main>`
  },

  // ─── BOOK SCHOOL DEMO ─────────────────────────────────────────
  {
    outFile: 'schools/book-school-demo/index.html',
    title: 'Book Free School Demo | SkillNest — See Our Digital Skills Program Live',
    desc: 'Book a free SkillNest school demo class for your school. Watch a live 45-minute demonstration of our AI, Coding & Digital Skills program with real students. No commitment required.',
    canonical: 'https://skillnest.co.in/schools/book-school-demo/',
    heroTag: 'Free School Demo',
    heroTitle: 'Book a <span>Free School Demo</span> — See It Live',
    heroSubtitle: 'Watch a real 45-minute SkillNest session with your students before making any decision. No commitment, no sales pressure — just genuine learning.',
    heroCtaText: '📅 Book Free Demo Now',
    heroCtaUrl: '#inquiry-form',
    breadcrumbs: [
      {name: 'Home', url: '../../index.html'},
      {name: 'Schools', url: '../index.html'},
      {name: 'Book School Demo', url: '#'}
    ],
    formId: 'schoolDemoForm',
    submitFn: 'submitSchoolDemoBooking',
    formTitle: 'Book Your Free School Demo',
    formType: 'school-demo-booking',
    formFields: [
      {id:'contactName', label:'Contact Person Name', type:'text', placeholder:'Principal / Admin Name', required:true, autocomplete:'name'},
      {id:'schoolName', label:'School Name', type:'text', placeholder:'Your school name', required:true},
      {id:'phone', label:'Mobile Number', type:'tel', placeholder:'+91 XXXXX XXXXX', required:true, autocomplete:'tel'},
      {id:'email', label:'Email Address', type:'email', placeholder:'admin@school.edu.in', required:false},
      {id:'city', label:'City', type:'text', placeholder:'Your city', required:true},
      {id:'demoClass', label:'Demo for Which Class', type:'select', required:true, options:['Class 6','Class 7','Class 8','Multiple Classes']},
      {id:'demoMode', label:'Demo Preferred Mode', type:'select', required:true, options:['In-School (we visit your school)','Online (via Google Meet/Zoom)','Either works']},
      {id:'studentCount', label:'Approximate Students for Demo', type:'select', required:false, options:['Under 25','25–50','50–100','100+']},
    ],
    faqs: [
      {q:'What happens during the free demo session?', a:'A SkillNest instructor conducts a 45-minute live class covering AI tools and basic Coding Program — with actual student participation. You observe the engagement, methodology, and student response.'},
      {q:'Is there any cost for the demo class?', a:'Absolutely zero cost. The demo is a gift to your students, with no strings attached.'},
      {q:'How soon can the demo be scheduled?', a:'Within 5–7 working days of your inquiry, depending on your preferred date and time.'},
      {q:'Can parents or other teachers observe the demo?', a:'Yes! We encourage you to invite interested parents, department heads, and management to observe. The more people see it, the better.'},
      {q:'What happens after the demo?', a:'We gather feedback from students, teachers, and observers. We then share a customized program proposal if you are interested. No pressure at any stage.'},
    ],
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'SkillNest Free School Demo Class',
      provider: {'@type': 'Organization', name: 'SkillNest', url: 'https://skillnest.co.in'},
      description: 'Free 45-minute live demonstration class of SkillNest digital skills program for school decision-makers.',
      offers: {'@type': 'Offer', price: '0', priceCurrency: 'INR'},
      url: 'https://skillnest.co.in/schools/book-school-demo/'
    },
    mainContent: `
<main style="padding:70px 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-bottom:80px;" class="fade-up">
      <div>
        <div class="section-tag"><span class="dot"></span>The Demo Experience</div>
        <h2 class="section-title">What Happens in <span>45 Minutes</span></h2>
        ${[
          ['0–5 min','Introduction & Setup','Instructor introduces themselves, explains the session agenda, and gets students comfortable.'],
          ['5–20 min','AI Tools Live Demo','Students try ChatGPT prompting and Canva AI under guided instructions — practical and exciting.'],
          ['20–35 min','Mini Coding Project','Groups create a 3-minute Scratch animation from scratch (pun intended!) — instant engagement.'],
          ['35–45 min','Q&A & Student Showcase','Students present their mini projects. Teachers and observers ask questions.'],
        ].map(([time,title,desc]) => `
        <div style="display:flex;gap:16px;margin-bottom:20px;align-items:flex-start;">
          <div style="background:var(--blue-100);color:var(--blue-700);font-family:'Sora',sans-serif;font-weight:700;font-size:.78rem;padding:6px 12px;border-radius:100px;flex-shrink:0;white-space:nowrap;">${time}</div>
          <div>
            <div style="font-family:'Sora',sans-serif;font-weight:700;color:var(--blue-900);margin-bottom:4px;">${title}</div>
            <div style="color:var(--gray-600);font-size:.88rem;line-height:1.6;">${desc}</div>
          </div>
        </div>`).join('')}
      </div>
      <div style="background:linear-gradient(135deg,#0f2861,#1a3a7a);border-radius:var(--radius-lg);padding:40px;color:var(--white);">
        <div style="font-size:3rem;margin-bottom:16px;">🎯</div>
        <h3 style="font-family:'Sora',sans-serif;font-size:1.4rem;font-weight:800;margin-bottom:20px;">Why Schools Love the Demo</h3>
        ${[
          'Authentic student engagement — nothing staged',
          'Teachers see how to handle mixed-ability classrooms',
          'No technical setup needed on your side',
          'Students love it — they ask "when is the next class?"',
          'Management gets a clear ROI picture instantly',
        ].map(item => `
        <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:14px;">
          <div style="color:var(--yellow-400);font-weight:800;flex-shrink:0;">⭐</div>
          <div style="color:rgba(255,255,255,.82);font-size:.9rem;">${item}</div>
        </div>`).join('')}
        <div style="margin-top:24px;padding:16px;background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.25);border-radius:var(--radius-sm);">
          <div style="color:var(--yellow-300);font-weight:700;font-size:.88rem;">⚡ Average time from demo to partnership sign: 7 days</div>
        </div>
      </div>
    </div>

    <div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-bottom:60px;">
      ${[['95%','Schools renew after pilot'],['< 5 days','Avg. demo scheduling time'],['100%','Demo sessions at zero cost'],['4.9/5','Average demo rating']].map(([stat,label]) => `
      <div class="fg-card" style="padding:28px 36px;text-align:center;min-width:150px;background:linear-gradient(135deg,#0f2861,#1e4ea0);border-radius:var(--radius-md);">
        <div style="font-family:'Sora',sans-serif;font-size:1.8rem;font-weight:800;background:linear-gradient(135deg,#fbbf24,#fcd34d);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${stat}</div>
        <div style="color:rgba(255,255,255,.6);font-size:.82rem;margin-top:6px;">${label}</div>
      </div>`).join('')}
    </div>
  </div>
</main>`
  },

];

// ─────────────────────────────────────────────────────────────
// GENERATE ALL PAGES
// ─────────────────────────────────────────────────────────────

let generated = 0;

pages.forEach(page => {
  const relatedForPage = RELATED_ALL.filter(r => !r.url.includes(page.outFile.replace('schools/','')));

  let customMainContent = page.mainContent;
  if (page.outFile !== 'schools/book-school-demo/index.html') {
    customMainContent = customMainContent.replace('<main style="padding:70px 0;">', '<main style="padding:70px 0;" class="fg-section-dark">');
  }

  const html = buildPage({
    ...page,
    mainContent: customMainContent,
    relatedPages: relatedForPage.slice(0, 6),
    finalCtaTitle: 'Ready to Bring Digital Skills to Your School?',
    finalCtaDesc: 'Join 50+ schools across India already partnering with SkillNest. Book a free demo, request a proposal, or simply chat with our team today.',
    finalCtaText: '📅 Book Free School Demo',
    finalCtaUrl: '../book-school-demo/index.html',
  });

  const outPath = path.join(rootDir, page.outFile);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`✅ Generated: ${page.outFile} (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`);
  generated++;
});

console.log(`\n🎉 Successfully generated ${generated} school section pages!`);
console.log('Pages created:');
pages.forEach(p => console.log(`  • ${p.outFile}`));
