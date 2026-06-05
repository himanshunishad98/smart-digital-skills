/* form-handler — UI handlers & success modals, routing submissions to submitLead */

function _ts(){var n=new Date,p=function(v){return String(v).padStart(2,'0')};return[n.getDate(),n.getMonth()+1,n.getFullYear()].join('/')+' '+[p(n.getHours()),p(n.getMinutes()),p(n.getSeconds())].join(':');}

function _resetForm(){var ids=['studentName','studentClass','schoolName','parentName','parentPhone','emailAddress','preferredBatch','learningMode','priorKnowledge'];ids.forEach(function(id){var el=document.getElementById(id);if(!el)return;if(el.tagName==='SELECT'){el.selectedIndex=0;}else{el.value='';}});var err=document.getElementById('_fErr');if(err)err.remove();}
function _closeModal(){var m=document.getElementById('_sm');if(m)m.remove();_resetForm();}
function _showModal(pn,sn){var o=document.createElement('div');o.id='_sm';o.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,40,97,.82);backdrop-filter:blur(6px);animation:_smFade .3s ease';var b=document.createElement('div');b.style.cssText='background:linear-gradient(135deg,#0f2861,#1a3a7a);border:1px solid rgba(251,191,36,.35);border-radius:28px;padding:44px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.45);position:relative;animation:_smUp .35s ease';b.innerHTML='<div style="font-size:3.8rem;margin-bottom:16px">\uD83C\uDF89</div><h3 style="font-family:Sora,sans-serif;color:#fff;font-size:1.55rem;font-weight:800;margin-bottom:12px">Enrollment Request Received!</h3><p style="color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.75;margin-bottom:24px">Thank you, <strong style="color:#fbbf24">'+pn+'</strong>!<br/>Our team will call you within <strong style="color:#fbbf24">24 hours</strong> to confirm <strong style="color:#fbbf24">'+sn+'\'s</strong> enrollment.<br/><br/>Meanwhile, you can WhatsApp us for any questions. \uD83D\uDC47</p><a href="https://wa.me/'+CONFIG.phone+'" target="_blank" onclick="_closeModal()" style="display:inline-flex;align-items:center;gap:8px;background:#fbbf24;color:#0f2861;font-weight:800;font-size:.95rem;padding:13px 28px;border-radius:100px;text-decoration:none;margin-bottom:16px">\uD83D\uDCAC WhatsApp Us Now</a><br/><button onclick="_closeModal()" style="background:transparent;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.6);font-size:.82rem;padding:8px 20px;border-radius:100px;cursor:pointer;font-family:Nunito,sans-serif;margin-top:10px">Close</button>';var s=document.createElement('style');s.textContent='@keyframes _smFade{from{opacity:0}to{opacity:1}}@keyframes _smUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}';document.head.appendChild(s);o.appendChild(b);document.body.appendChild(o);o.addEventListener('click',function(e){if(e.target===o){_closeModal();}});}

/* ── Field highlight helpers for admission form ── */
function _clearFieldError(el){el.style.border='';el.style.boxShadow='';}
function _setFieldError(el){el.style.border='2px solid #ef4444';el.style.boxShadow='0 0 0 3px rgba(239,68,68,.18)';}

function submitForm(){
  /* Clear previous highlights */
  var allFields=['studentName','studentClass','schoolName','parentName','parentPhone','preferredBatch','learningMode'];
  allFields.forEach(function(id){var el=document.getElementById(id);if(el)_clearFieldError(el);});
  var err=document.getElementById('_fErr');if(err)err.remove();

  var f={
    studentName:document.getElementById('studentName').value.trim(),
    studentClass:document.getElementById('studentClass').value,
    schoolName:document.getElementById('schoolName').value.trim(),
    parentName:document.getElementById('parentName').value.trim(),
    parentPhone:document.getElementById('parentPhone').value.trim(),
    preferredBatch:document.getElementById('preferredBatch').value,
    learningMode:document.getElementById('learningMode').value,
    emailAddress:(document.getElementById('emailAddress')?document.getElementById('emailAddress').value.trim():''),
    priorKnowledge:(document.getElementById('priorKnowledge')?document.getElementById('priorKnowledge').value:'')
  };

  /* Validate each required field individually and highlight empties */
  var requiredMap=[
    {id:'studentName',val:f.studentName},
    {id:'studentClass',val:f.studentClass},
    {id:'schoolName',val:f.schoolName},
    {id:'parentName',val:f.parentName},
    {id:'parentPhone',val:f.parentPhone},
    {id:'preferredBatch',val:f.preferredBatch},
    {id:'learningMode',val:f.learningMode}
  ];
  var firstEmpty=null;
  requiredMap.forEach(function(item){
    if(!item.val){
      var el=document.getElementById(item.id);
      if(el){_setFieldError(el);if(!firstEmpty)firstEmpty=el;}
    }
  });
  if(firstEmpty){
    _showErr('Please fill all required fields marked with ✶');
    firstEmpty.scrollIntoView({behavior:'smooth',block:'center'});
    /* Remove error highlight on change */
    allFields.forEach(function(id){
      var el=document.getElementById(id);
      if(el){
        var handler=function(){_clearFieldError(el);};
        el.addEventListener('input',handler,{once:true});
        el.addEventListener('change',handler,{once:true});
      }
    });
    return;
  }
  if(!/^[\d\s\+\-]{7,15}$/.test(f.parentPhone)){
    var ph=document.getElementById('parentPhone');
    _setFieldError(ph);
    _showErr('Please enter a valid phone number');
    return;
  }

  submitLead('enrollment', f, {
    btnSelector: '.form-submit',
    btnLoadingText: '⏳ Submitting...',
    btnOriginalText: '🚀 Submit Enrollment Request',
    onSuccess: function() {
      _showModal(f.parentName, f.studentName);
    },
    onError: function(err) {
      _showErr(err.message || 'Submission failed. Please try again.');
    }
  });
}

function _showErr(msg){var e=document.getElementById('_fErr');if(e)e.remove();var el=document.createElement('p');el.id='_fErr';el.style.cssText='color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;border:1px solid rgba(239,68,68,.3);';el.textContent='\u26A0\uFE0F '+msg;document.getElementById('admissionForm').prepend(el);setTimeout(function(){if(el.parentNode)el.remove();},5000);}

/* ── Scholarship Form ── */
function _resetScholarshipForm(){var ids=['schStudentName','schParentName','schMobile','schEmail'];ids.forEach(function(id){var el=document.getElementById(id);if(!el)return;el.value='';});var err=document.getElementById('_schErr');if(err)err.remove();}
function _resetDemoForm(){var ids=['demoStudentName','demoParentName','demoMobile','demoEmail'];ids.forEach(function(id){var el=document.getElementById(id);if(!el)return;el.value='';});var err=document.getElementById('_demoErr');if(err)err.remove();}

function submitScholarshipForm(){
  var f={
    studentName:(document.getElementById('schStudentName')?document.getElementById('schStudentName').value.trim():''),
    parentName:(document.getElementById('schParentName')?document.getElementById('schParentName').value.trim():''),
    parentPhone:(document.getElementById('schMobile')?document.getElementById('schMobile').value.trim():''),
    emailAddress:(document.getElementById('schEmail')?document.getElementById('schEmail').value.trim():'')
  };
  if(!f.studentName||!f.parentName||!f.parentPhone){_showSchErr('Please fill all required fields marked with *');return;}
  if(!/^[\d\s\+\-]{7,15}$/.test(f.parentPhone)){_showSchErr('Please enter a valid mobile number');return;}

  // Auto-fill values
  f.studentClass = 'Scholarship Test';
  f.schoolName = 'Scholarship Test';
  f.deviceAccess = 'Scholarship Test';
  f.laptopAvailable = 'Scholarship Test';
  f.priorKnowledge = 'Scholarship Test';
  f.preferredBatch = 'Scholarship Test';
  f.learningMode = 'Scholarship Test';

  submitLead('scholarship', f, {
    btnSelector: '.scholar-submit',
    btnLoadingText: '⏳ Submitting...',
    btnOriginalText: '🎓 Register for Scholarship Test',
    onSuccess: function() {
      _showSchModal(f.parentName, f.studentName);
    },
    onError: function(err) {
      _showSchErr(err.message || 'Submission failed. Please try again.');
    }
  });
}

function _showSchErr(msg){var e=document.getElementById('_schErr');if(e)e.remove();var el=document.createElement('p');el.id='_schErr';el.style.cssText='color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;';el.textContent='⚠️ '+msg;var sf=document.getElementById('scholarshipForm');if(sf)sf.prepend(el);setTimeout(function(){el.remove();},4000);}

function _showSchModal(pn,sn){var o=document.createElement('div');o.id='_scm';o.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,40,97,.82);backdrop-filter:blur(6px)';var b=document.createElement('div');b.style.cssText='background:linear-gradient(135deg,#0f2861,#1a3a7a);border:1px solid rgba(251,191,36,.35);border-radius:28px;padding:44px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.45)';b.innerHTML='<div style="font-size:3.8rem;margin-bottom:16px">🎓</div><h3 style="font-family:Sora,sans-serif;color:#fff;font-size:1.4rem;font-weight:800;margin-bottom:12px">Scholarship Registration Done!</h3><p style="color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.75;margin-bottom:24px">Thank you, <strong style="color:#fbbf24">'+pn+'</strong>!<br/>We will share the Scholarship Test details with you soon. <strong style="color:#fbbf24">'+sn+'</strong> is now on our priority list. 🌟</p><button onclick="document.getElementById(\'_scm\').remove();_resetScholarshipForm();" style="background:#fbbf24;color:#0f2861;font-weight:800;font-size:.95rem;padding:13px 28px;border-radius:100px;border:none;cursor:pointer;font-family:Sora,sans-serif">Close</button>';o.appendChild(b);document.body.appendChild(o);o.addEventListener('click',function(e){if(e.target===o){o.remove();_resetScholarshipForm();}});}

/* ── Demo Class Form ── */
function submitDemoForm(){
  var f={
    studentName:(document.getElementById('demoStudentName')?document.getElementById('demoStudentName').value.trim():''),
    parentName:(document.getElementById('demoParentName')?document.getElementById('demoParentName').value.trim():''),
    parentPhone:(document.getElementById('demoMobile')?document.getElementById('demoMobile').value.trim():''),
    emailAddress:(document.getElementById('demoEmail')?document.getElementById('demoEmail').value.trim():'')
  };
  if(!f.studentName||!f.parentName||!f.parentPhone){_showDemoErr('Please fill all required fields marked with *');return;}
  if(!/^[\d\s\+\-]{7,15}$/.test(f.parentPhone)){_showDemoErr('Please enter a valid mobile number');return;}

  // Auto-fill values
  f.studentClass = 'Demo Class';
  f.schoolName = 'Demo Class';
  f.deviceAccess = 'Demo Class';
  f.laptopAvailable = 'Demo Class';
  f.priorKnowledge = 'Demo Class';
  f.preferredBatch = 'Demo Class';
  f.learningMode = 'Demo Class';

  submitLead('demo', f, {
    btnSelector: '.demo-submit',
    btnLoadingText: '⏳ Submitting...',
    btnOriginalText: '📅 Book My Free Demo Class',
    onSuccess: function() {
      _showDemoModal(f.parentName, f.studentName);
    },
    onError: function(err) {
      _showDemoErr(err.message || 'Submission failed. Please try again.');
    }
  });
}

function _showDemoErr(msg){var e=document.getElementById('_demoErr');if(e)e.remove();var el=document.createElement('p');el.id='_demoErr';el.style.cssText='color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;';el.textContent='⚠️ '+msg;var df=document.getElementById('demoForm');if(df)df.prepend(el);setTimeout(function(){el.remove();},4000);}

function _showDemoModal(pn,sn){var o=document.createElement('div');o.id='_dm';o.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,40,97,.82);backdrop-filter:blur(6px)';var b=document.createElement('div');b.style.cssText='background:linear-gradient(135deg,#0f2861,#1a3a7a);border:1px solid rgba(251,191,36,.35);border-radius:28px;padding:44px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.45)';b.innerHTML='<div style="font-size:3.8rem;margin-bottom:16px">🎉</div><h3 style="font-family:Sora,sans-serif;color:#fff;font-size:1.4rem;font-weight:800;margin-bottom:12px">Free Demo Class Booked!</h3><p style="color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.75;margin-bottom:24px">Thank you, <strong style="color:#fbbf24">'+pn+'</strong>!<br/>Our team will contact you within <strong style="color:#fbbf24">24 hours</strong> to schedule <strong style="color:#fbbf24">'+sn+'\'s</strong> free demo class. 🌟<br/><br/>Can\'t wait? WhatsApp us now! 👇</p><a href="https://wa.me/'+CONFIG.phone+'?text=Hi%2C%20I%20want%20to%20book%20a%20Free%20Demo%20Class%20for%20Smart%20Digital%20Skills%20Program." target="_blank" onclick="document.getElementById(\'_dm\').remove();_resetDemoForm();" style="display:inline-flex;align-items:center;gap:8px;background:#fbbf24;color:#0f2861;font-weight:800;font-size:.95rem;padding:13px 28px;border-radius:100px;text-decoration:none;margin-bottom:16px">💬 WhatsApp Us Now</a><br/><button onclick="document.getElementById(\'_dm\').remove();_resetDemoForm();" style="background:transparent;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.6);font-size:.82rem;padding:8px 20px;border-radius:100px;cursor:pointer;font-family:Nunito,sans-serif;margin-top:10px">Close</button>';o.appendChild(b);document.body.appendChild(o);o.addEventListener('click',function(e){if(e.target===o){o.remove();_resetDemoForm();}});}

/* ── Careers Application Form ── */
function _resetCareerForm(){
  var ids = ['careerName', 'careerEmail', 'careerPhone', 'careerPosition', 'careerMessage'];
  ids.forEach(function(id){
    var el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'SELECT') {
      el.selectedIndex = 0;
    } else {
      el.value = '';
    }
  });
  var err = document.getElementById('_carErr');
  if (err) err.remove();
}

function _showCareerErr(msg){
  var e = document.getElementById('_carErr');
  if (e) e.remove();
  var el = document.createElement('p');
  el.id = '_carErr';
  el.style.cssText = 'color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;border:1px solid rgba(239,68,68,.3);';
  el.textContent = '⚠️ ' + msg;
  var cf = document.getElementById('careerForm');
  if (cf) cf.prepend(el);
  setTimeout(function(){
    if (el.parentNode) el.remove();
  }, 5000);
}

function _showCareerModal(name){
  var o = document.createElement('div');
  o.id = '_crm';
  o.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,40,97,.82);backdrop-filter:blur(6px)';
  var b = document.createElement('div');
  b.style.cssText = 'background:linear-gradient(135deg,#0f2861,#1a3a7a);border:1px solid rgba(251,191,36,.35);border-radius:28px;padding:44px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.45)';
  b.innerHTML = '<div style="font-size:3.8rem;margin-bottom:16px">💼</div><h3 style="font-family:Sora,sans-serif;color:#fff;font-size:1.4rem;font-weight:800;margin-bottom:12px">Application Submitted!</h3><p style="color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.75;margin-bottom:24px">Thank you, <strong style="color:#fbbf24">'+name+'</strong>!<br/>Our HR team will review your details and contact you within <strong style="color:#fbbf24">2-3 business days</strong> if your background matches our needs. 🌟</p><button onclick="document.getElementById(\'_crm\').remove();_resetCareerForm();" style="background:#fbbf24;color:#0f2861;font-weight:800;font-size:.95rem;padding:13px 28px;border-radius:100px;border:none;cursor:pointer;font-family:Sora,sans-serif">Close</button>';
  o.appendChild(b);
  document.body.appendChild(o);
  o.addEventListener('click',function(e){
    if(e.target===o){
      o.remove();
      _resetCareerForm();
    }
  });
}

function submitCareerForm(){
  var f = {
    name: (document.getElementById('careerName') ? document.getElementById('careerName').value.trim() : ''),
    email: (document.getElementById('careerEmail') ? document.getElementById('careerEmail').value.trim() : ''),
    phone: (document.getElementById('careerPhone') ? document.getElementById('careerPhone').value.trim() : ''),
    position: (document.getElementById('careerPosition') ? document.getElementById('careerPosition').value : ''),
    message: (document.getElementById('careerMessage') ? document.getElementById('careerMessage').value.trim() : '')
  };

  if (!f.name || !f.email || !f.phone || !f.position || !f.message) {
    _showCareerErr('Please fill all fields of the application form.');
    return;
  }
  if (!/^[\d\s\+\-]{7,15}$/.test(f.phone)) {
    _showCareerErr('Please enter a valid mobile number.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    _showCareerErr('Please enter a valid email address.');
    return;
  }

  // Schema properties mappings
  f.studentName = f.name;
  f.parentName = f.name;
  f.parentPhone = f.phone;
  f.studentClass = 'Careers - ' + f.position;
  f.schoolName = 'Careers Application';
  f.deviceAccess = 'Careers Application';
  f.laptopAvailable = 'Careers Application';
  f.priorKnowledge = f.message;
  f.preferredBatch = 'Careers Application';
  f.learningMode = 'Careers Application';

  submitLead('careers', f, {
    btnSelector: '.career-submit',
    btnLoadingText: '⏳ Submitting...',
    btnOriginalText: '💼 Submit Application',
    onSuccess: function() {
      _showCareerModal(f.name);
    },
    onError: function(err) {
      _showCareerErr(err.message || 'Submission failed. Please try again.');
    }
  });
}

/* ── Contact Hub Form ── */
function _resetContactForm(){
  var ids = ['contactName', 'contactEmail', 'contactPhone', 'contactSubject', 'contactMessage'];
  ids.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  var err = document.getElementById('_conErr');
  if (err) err.remove();
}

function _showContactErr(msg){
  var e = document.getElementById('_conErr');
  if (e) e.remove();
  var el = document.createElement('p');
  el.id = '_conErr';
  el.style.cssText = 'color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;border:1px solid rgba(239,68,68,.3);';
  el.textContent = '⚠️ ' + msg;
  var cf = document.getElementById('contactForm');
  if (cf) cf.prepend(el);
  setTimeout(function(){
    if (el.parentNode) el.remove();
  }, 5000);
}

function _showContactModal(name){
  var o = document.createElement('div');
  o.id = '_cnm';
  o.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,40,97,.82);backdrop-filter:blur(6px)';
  var b = document.createElement('div');
  b.style.cssText = 'background:linear-gradient(135deg,#0f2861,#1a3a7a);border:1px solid rgba(251,191,36,.35);border-radius:28px;padding:44px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.45)';
  b.innerHTML = '<div style="font-size:3.8rem;margin-bottom:16px">✉️</div><h3 style="font-family:Sora,sans-serif;color:#fff;font-size:1.4rem;font-weight:800;margin-bottom:12px">Message Sent!</h3><p style="color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.75;margin-bottom:24px">Thank you, <strong style="color:#fbbf24">'+name+'</strong>!<br/>We have received your message. Our team will get back to you within <strong style="color:#fbbf24">24 hours</strong>. 🌟</p><button onclick="document.getElementById(\'_cnm\').remove();_resetContactForm();" style="background:#fbbf24;color:#0f2861;font-weight:800;font-size:.95rem;padding:13px 28px;border-radius:100px;border:none;cursor:pointer;font-family:Sora,sans-serif">Close</button>';
  o.appendChild(b);
  document.body.appendChild(o);
  o.addEventListener('click',function(e){
    if(e.target===o){
      o.remove();
      _resetContactForm();
    }
  });
}

function submitContactForm(){
  var f = {
    name: (document.getElementById('contactName') ? document.getElementById('contactName').value.trim() : ''),
    email: (document.getElementById('contactEmail') ? document.getElementById('contactEmail').value.trim() : ''),
    phone: (document.getElementById('contactPhone') ? document.getElementById('contactPhone').value.trim() : ''),
    subject: (document.getElementById('contactSubject') ? document.getElementById('contactSubject').value.trim() : ''),
    message: (document.getElementById('contactMessage') ? document.getElementById('contactMessage').value.trim() : '')
  };

  if (!f.name || !f.email || !f.phone || !f.subject || !f.message) {
    _showContactErr('Please fill all required fields.');
    return;
  }
  if (!/^[\d\s\+\-]{7,15}$/.test(f.phone)) {
    _showContactErr('Please enter a valid mobile number.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    _showContactErr('Please enter a valid email address.');
    return;
  }

  // Schema properties mappings
  f.studentName = f.name;
  f.parentName = f.name;
  f.parentPhone = f.phone;
  f.studentClass = 'Contact Hub - ' + f.subject;
  f.schoolName = 'Contact Page Inquiry';
  f.deviceAccess = 'Contact Page Inquiry';
  f.laptopAvailable = 'Contact Page Inquiry';
  f.priorKnowledge = f.message;
  f.preferredBatch = 'Contact Page Inquiry';
  f.learningMode = 'Contact Page Inquiry';

  submitLead('contact', f, {
    btnSelector: '.contact-submit',
    btnLoadingText: '⏳ Submitting...',
    btnOriginalText: '📩 Send Message',
    onSuccess: function() {
      _showContactModal(f.name);
    },
    onError: function(err) {
      _showContactErr(err.message || 'Submission failed. Please try again.');
    }
  });
}

/* ── Book Demo Page Form ── */
function _resetDemoBookingForm(){
  var ids = ['demoBookStudentName', 'demoBookClass', 'demoBookParentName', 'demoBookPhone', 'demoBookEmail', 'demoBookTime', 'demoBookMessage'];
  ids.forEach(function(id){
    var el = document.getElementById(id);
    if (el) {
      if (el.tagName === 'SELECT') {
        el.selectedIndex = 0;
      } else {
        el.value = '';
      }
    }
  });
  var err = document.getElementById('_dbErr');
  if (err) err.remove();
}

function _showDemoBookingErr(msg){
  var e = document.getElementById('_dbErr');
  if (e) e.remove();
  var el = document.createElement('p');
  el.id = '_dbErr';
  el.style.cssText = 'color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;border:1px solid rgba(239,68,68,.3);';
  el.textContent = '⚠️ ' + msg;
  var df = document.getElementById('demoBookingForm');
  if (df) df.prepend(el);
  setTimeout(function(){
    if (el.parentNode) el.remove();
  }, 5000);
}

function submitDemoBookingForm(){
  var f = {
    studentName: (document.getElementById('demoBookStudentName') ? document.getElementById('demoBookStudentName').value.trim() : ''),
    studentClass: (document.getElementById('demoBookClass') ? document.getElementById('demoBookClass').value : ''),
    parentName: (document.getElementById('demoBookParentName') ? document.getElementById('demoBookParentName').value.trim() : ''),
    parentPhone: (document.getElementById('demoBookPhone') ? document.getElementById('demoBookPhone').value.trim() : ''),
    emailAddress: (document.getElementById('demoBookEmail') ? document.getElementById('demoBookEmail').value.trim() : ''),
    preferredTime: (document.getElementById('demoBookTime') ? document.getElementById('demoBookTime').value : ''),
    message: (document.getElementById('demoBookMessage') ? document.getElementById('demoBookMessage').value.trim() : '')
  };

  if (!f.studentName || !f.studentClass || !f.parentName || !f.parentPhone || !f.preferredTime) {
    _showDemoBookingErr('Please fill all required fields.');
    return;
  }
  if (!/^[\d\s\+\-]{7,15}$/.test(f.parentPhone)) {
    _showDemoBookingErr('Please enter a valid mobile number.');
    return;
  }

  // Schema properties mappings
  f.parentPhone = f.parentPhone;
  f.schoolName = 'Demo Booking Page';
  f.deviceAccess = 'Demo Booking Page';
  f.laptopAvailable = 'Demo Booking Page';
  f.priorKnowledge = 'Pref Time: ' + f.preferredTime + ' | MSG: ' + f.message;
  f.preferredBatch = f.preferredTime;
  f.learningMode = 'Demo Booking Page';

  submitLead('demo-booking', f, {
    btnSelector: '.demobook-submit',
    btnLoadingText: '⏳ Booking...',
    btnOriginalText: '📅 Book Free Demo',
    onSuccess: function() {
      _showDemoModal(f.parentName, f.studentName);
      _resetDemoBookingForm();
    },
    onError: function(err) {
      _showDemoBookingErr(err.message || 'Submission failed. Please try again.');
    }
  });
}

/* ── Support Request Form ── */
function _resetSupportForm(){
  var ids = ['supportName', 'supportEmail', 'supportPhone', 'supportCategory', 'supportMessage'];
  ids.forEach(function(id){
    var el = document.getElementById(id);
    if (el) {
      if (el.tagName === 'SELECT') {
        el.selectedIndex = 0;
      } else {
        el.value = '';
      }
    }
  });
  var err = document.getElementById('_supErr');
  if (err) err.remove();
}

function _showSupportErr(msg){
  var e = document.getElementById('_supErr');
  if (e) e.remove();
  var el = document.createElement('p');
  el.id = '_supErr';
  el.style.cssText = 'color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;border:1px solid rgba(239,68,68,.3);';
  el.textContent = '⚠️ ' + msg;
  var sf = document.getElementById('supportForm');
  if (sf) sf.prepend(el);
  setTimeout(function(){
    if (el.parentNode) el.remove();
  }, 5000);
}

function _showSupportModal(name){
  var o = document.createElement('div');
  o.id = '_spm';
  o.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,40,97,.82);backdrop-filter:blur(6px)';
  var b = document.createElement('div');
  b.style.cssText = 'background:linear-gradient(135deg,#0f2861,#1a3a7a);border:1px solid rgba(251,191,36,.35);border-radius:28px;padding:44px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.45)';
  b.innerHTML = '<div style="font-size:3.8rem;margin-bottom:16px">🛠️</div><h3 style="font-family:Sora,sans-serif;color:#fff;font-size:1.4rem;font-weight:800;margin-bottom:12px">Support Request Logged</h3><p style="color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.75;margin-bottom:24px">Thank you, <strong style="color:#fbbf24">'+name+'</strong>!<br/>We have logged your support request. Our support staff will call or email you within <strong style="color:#fbbf24">12-24 hours</strong>. 🌟</p><button onclick="document.getElementById(\'_spm\').remove();_resetSupportForm();" style="background:#fbbf24;color:#0f2861;font-weight:800;font-size:.95rem;padding:13px 28px;border-radius:100px;border:none;cursor:pointer;font-family:Sora,sans-serif">Close</button>';
  o.appendChild(b);
  document.body.appendChild(o);
  o.addEventListener('click',function(e){
    if(e.target===o){
      o.remove();
      _resetSupportForm();
    }
  });
}

function submitSupportForm(){
  var f = {
    name: (document.getElementById('supportName') ? document.getElementById('supportName').value.trim() : ''),
    email: (document.getElementById('supportEmail') ? document.getElementById('supportEmail').value.trim() : ''),
    phone: (document.getElementById('supportPhone') ? document.getElementById('supportPhone').value.trim() : ''),
    category: (document.getElementById('supportCategory') ? document.getElementById('supportCategory').value : ''),
    message: (document.getElementById('supportMessage') ? document.getElementById('supportMessage').value.trim() : '')
  };

  if (!f.name || !f.email || !f.phone || !f.category || !f.message) {
    _showSupportErr('Please fill all fields.');
    return;
  }
  if (!/^[\d\s\+\-]{7,15}$/.test(f.phone)) {
    _showSupportErr('Please enter a valid mobile number.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    _showSupportErr('Please enter a valid email address.');
    return;
  }

  // Schema properties mappings
  f.studentName = f.name;
  f.parentName = f.name;
  f.parentPhone = f.phone;
  f.studentClass = 'Support - ' + f.category;
  f.schoolName = 'Support Request';
  f.deviceAccess = 'Support Request';
  f.laptopAvailable = 'Support Request';
  f.priorKnowledge = f.message;
  f.preferredBatch = 'Support Request';
  f.learningMode = 'Support Request';

  submitLead('support', f, {
    btnSelector: '.support-submit',
    btnLoadingText: '⏳ Submitting...',
    btnOriginalText: '🛠️ Submit Support Request',
    onSuccess: function() {
      _showSupportModal(f.name);
    },
    onError: function(err) {
      _showSupportErr(err.message || 'Submission failed. Please try again.');
    }
  });
}
