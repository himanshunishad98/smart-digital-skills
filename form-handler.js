/* form-handler — Google Sheets + modal */
var _GAS_URL='https://script.google.com/macros/s/AKfycbxl6oWBr6YHPfZbP5ymP6mRmzlUMQfn0mkQyiiNHTSOLaNN4v4NLKK-5tTKuQqw39KQ/exec';

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
    _showErr('Please fill all required fields marked with \u272B');
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

  var btn=document.querySelector('.form-submit');
  if(btn){btn.disabled=true;btn.textContent='\u23F3 Submitting...';}
  var payload=new URLSearchParams({sheetId:CONFIG.sheetId,sheetName:CONFIG.sheetName,studentName:f.studentName,studentClass:f.studentClass,schoolName:f.schoolName,parentName:f.parentName,parentPhone:f.parentPhone,deviceAccess:f.preferredBatch,laptopAvailable:f.learningMode,email:f.emailAddress,priorKnowledge:f.priorKnowledge,submittedAt:_ts()});
  fetch(_GAS_URL,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:payload.toString()})
    .then(function(r){return r.json();})
    .then(function(d){
      if(d&&d.result==='success'){_showModal(f.parentName,f.studentName);}
      else{_showModal(f.parentName,f.studentName);}
    })
    .catch(function(){_showModal(f.parentName,f.studentName);})
    .finally(function(){if(btn){btn.disabled=false;btn.textContent='\uD83D\uDE80 Submit Enrollment Request';}});
}

function _showErr(msg){var e=document.getElementById('_fErr');if(e)e.remove();var el=document.createElement('p');el.id='_fErr';el.style.cssText='color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;border:1px solid rgba(239,68,68,.3);';el.textContent='\u26A0\uFE0F '+msg;document.getElementById('admissionForm').prepend(el);setTimeout(function(){if(el.parentNode)el.remove();},5000);}

/* ── Scholarship Form ── */
var _SCHOLAR_GAS_URL = _GAS_URL;

function submitScholarshipForm(){
  var f={
    studentName:(document.getElementById('schStudentName')?document.getElementById('schStudentName').value.trim():''),
    parentName:(document.getElementById('schParentName')?document.getElementById('schParentName').value.trim():''),
    parentPhone:(document.getElementById('schMobile')?document.getElementById('schMobile').value.trim():''),
    emailAddress:(document.getElementById('schEmail')?document.getElementById('schEmail').value.trim():'')
  };
  if(!f.studentName||!f.parentName||!f.parentPhone){_showSchErr('Please fill all required fields marked with *');return;}
  if(!/^[\d\s\+\-]{7,15}$/.test(f.parentPhone)){_showSchErr('Please enter a valid mobile number');return;}
  var btn=document.querySelector('.scholar-submit');
  if(btn){btn.disabled=true;btn.textContent='⏳ Submitting...';}
 var payload = new URLSearchParams({
    sheetId: CONFIG.sheetId,
    sheetName: CONFIG.sheetName,

    studentName: f.studentName,
    parentName: f.parentName,
    parentPhone: f.parentPhone,
    email: f.emailAddress,

    studentClass: 'Scholarship Test',
    schoolName: 'Scholarship Test',
    deviceAccess: 'Scholarship Test',
    laptopAvailable: 'Scholarship Test',
    priorKnowledge: 'Scholarship Test',
    preferredBatch: 'Scholarship Test',
    learningMode: 'Scholarship Test',

    submittedAt: _ts(),
    formType: 'scholarship'
});
  fetch(_GAS_URL,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:payload.toString()})
    .then(function(r){return r.json();})
    .then(function(){_showSchModal(f.parentName,f.studentName);})
    .catch(function(){_showSchModal(f.parentName,f.studentName);})
    .finally(function(){if(btn){btn.disabled=false;btn.textContent='🎓 Register for Scholarship Test';}});
}

function _showSchErr(msg){var e=document.getElementById('_schErr');if(e)e.remove();var el=document.createElement('p');el.id='_schErr';el.style.cssText='color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;';el.textContent='⚠️ '+msg;var sf=document.getElementById('scholarshipForm');if(sf)sf.prepend(el);setTimeout(function(){el.remove();},4000);}

function _showSchModal(pn,sn){var o=document.createElement('div');o.id='_scm';o.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,40,97,.82);backdrop-filter:blur(6px)';var b=document.createElement('div');b.style.cssText='background:linear-gradient(135deg,#0f2861,#1a3a7a);border:1px solid rgba(251,191,36,.35);border-radius:28px;padding:44px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.45)';b.innerHTML='<div style="font-size:3.8rem;margin-bottom:16px">🎓</div><h3 style="font-family:Sora,sans-serif;color:#fff;font-size:1.4rem;font-weight:800;margin-bottom:12px">Scholarship Registration Done!</h3><p style="color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.75;margin-bottom:24px">Thank you, <strong style="color:#fbbf24">'+pn+'</strong>!<br/>We will share the Scholarship Test details with you soon. <strong style="color:#fbbf24">'+sn+'</strong> is now on our priority list. 🌟</p><button onclick="document.getElementById(\'_scm\').remove()" style="background:#fbbf24;color:#0f2861;font-weight:800;font-size:.95rem;padding:13px 28px;border-radius:100px;border:none;cursor:pointer;font-family:Sora,sans-serif">Close</button>';o.appendChild(b);document.body.appendChild(o);o.addEventListener('click',function(e){if(e.target===o)o.remove();});}

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
  var btn=document.querySelector('.demo-submit');
  if(btn){btn.disabled=true;btn.textContent='⏳ Submitting...';}
  /* Auto-fill remaining sheet fields with "Demo Class" so admin can identify these leads */
  var payload=new URLSearchParams({
    sheetId:CONFIG.sheetId,
    sheetName: CONFIG.sheetName,
    studentName:f.studentName,
    parentName:f.parentName,
    parentPhone:f.parentPhone,
    email:f.emailAddress,
    studentClass:'Demo Class',
    schoolName:'Demo Class',
    deviceAccess:'Demo Class',
    laptopAvailable:'Demo Class',
    priorKnowledge:'Demo Class',
    preferredBatch:'Demo Class',
    learningMode:'Demo Class',
    submittedAt:_ts(),
    formType:'demo'
  });
  fetch(_GAS_URL,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:payload.toString()})
    .then(function(r){return r.json();})
    .then(function(){_showDemoModal(f.parentName,f.studentName);})
    .catch(function(){_showDemoModal(f.parentName,f.studentName);})
    .finally(function(){if(btn){btn.disabled=false;btn.textContent='📅 Book My Free Demo Class';}});
}

function _showDemoErr(msg){var e=document.getElementById('_demoErr');if(e)e.remove();var el=document.createElement('p');el.id='_demoErr';el.style.cssText='color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;';el.textContent='⚠️ '+msg;var df=document.getElementById('demoForm');if(df)df.prepend(el);setTimeout(function(){el.remove();},4000);}

function _showDemoModal(pn,sn){var o=document.createElement('div');o.id='_dm';o.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,40,97,.82);backdrop-filter:blur(6px)';var b=document.createElement('div');b.style.cssText='background:linear-gradient(135deg,#0f2861,#1a3a7a);border:1px solid rgba(251,191,36,.35);border-radius:28px;padding:44px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.45)';b.innerHTML='<div style="font-size:3.8rem;margin-bottom:16px">🎉</div><h3 style="font-family:Sora,sans-serif;color:#fff;font-size:1.4rem;font-weight:800;margin-bottom:12px">Free Demo Class Booked!</h3><p style="color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.75;margin-bottom:24px">Thank you, <strong style="color:#fbbf24">'+pn+'</strong>!<br/>Our team will contact you within <strong style="color:#fbbf24">24 hours</strong> to schedule <strong style="color:#fbbf24">'+sn+'\'s</strong> free demo class. 🌟<br/><br/>Can\'t wait? WhatsApp us now! 👇</p><a href="https://wa.me/'+CONFIG.phone+'?text=Hi%2C%20I%20want%20to%20book%20a%20Free%20Demo%20Class%20for%20Smart%20Digital%20Skills%20Program." target="_blank" onclick="document.getElementById(\'_dm\').remove()" style="display:inline-flex;align-items:center;gap:8px;background:#fbbf24;color:#0f2861;font-weight:800;font-size:.95rem;padding:13px 28px;border-radius:100px;text-decoration:none;margin-bottom:16px">💬 WhatsApp Us Now</a><br/><button onclick="document.getElementById(\'_dm\').remove()" style="background:transparent;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.6);font-size:.82rem;padding:8px 20px;border-radius:100px;cursor:pointer;font-family:Nunito,sans-serif;margin-top:10px">Close</button>';o.appendChild(b);document.body.appendChild(o);o.addEventListener('click',function(e){if(e.target===o)o.remove();});}
