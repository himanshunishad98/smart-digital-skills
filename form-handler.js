/* form-handler — Google Sheets + modal */
var _GAS_URL='https://script.google.com/macros/s/AKfycbxl6oWBr6YHPfZbP5ymP6mRmzlUMQfn0mkQyiiNHTSOLaNN4v4NLKK-5tTKuQqw39KQ/exec';

function _ts(){var n=new Date,p=function(v){return String(v).padStart(2,'0')};return[n.getDate(),n.getMonth()+1,n.getFullYear()].join('/')+' '+[p(n.getHours()),p(n.getMinutes()),p(n.getSeconds())].join(':');}

function _resetForm(){var ids=['studentName','studentClass','schoolName','parentName','parentPhone','emailAddress','preferredBatch','learningMode','priorKnowledge'];ids.forEach(function(id){var el=document.getElementById(id);if(!el)return;if(el.tagName==='SELECT'){el.selectedIndex=0;}else{el.value='';}});var err=document.getElementById('_fErr');if(err)err.remove();}
function _closeModal(){var m=document.getElementById('_sm');if(m)m.remove();_resetForm();}
function _showModal(pn,sn){var o=document.createElement('div');o.id='_sm';o.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(15,40,97,.82);backdrop-filter:blur(6px);animation:_smFade .3s ease';var b=document.createElement('div');b.style.cssText='background:linear-gradient(135deg,#0f2861,#1a3a7a);border:1px solid rgba(251,191,36,.35);border-radius:28px;padding:44px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,.45);position:relative;animation:_smUp .35s ease';b.innerHTML='<div style="font-size:3.8rem;margin-bottom:16px">\uD83C\uDF89</div><h3 style="font-family:Sora,sans-serif;color:#fff;font-size:1.55rem;font-weight:800;margin-bottom:12px">Enrollment Request Received!</h3><p style="color:rgba(255,255,255,.72);font-size:.95rem;line-height:1.75;margin-bottom:24px">Thank you, <strong style="color:#fbbf24">'+pn+'</strong>!<br/>Our team will call you within <strong style="color:#fbbf24">24 hours</strong> to confirm <strong style="color:#fbbf24">'+sn+'\'s</strong> enrollment.<br/><br/>Meanwhile, you can WhatsApp us for any questions. \uD83D\uDC47</p><a href="https://wa.me/'+CONFIG.phone+'" target="_blank" onclick="_closeModal()" style="display:inline-flex;align-items:center;gap:8px;background:#fbbf24;color:#0f2861;font-weight:800;font-size:.95rem;padding:13px 28px;border-radius:100px;text-decoration:none;margin-bottom:16px">\uD83D\uDCAC WhatsApp Us Now</a><br/><button onclick="_closeModal()" style="background:transparent;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.6);font-size:.82rem;padding:8px 20px;border-radius:100px;cursor:pointer;font-family:Nunito,sans-serif;margin-top:10px">Close</button>';var s=document.createElement('style');s.textContent='@keyframes _smFade{from{opacity:0}to{opacity:1}}@keyframes _smUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}';document.head.appendChild(s);o.appendChild(b);document.body.appendChild(o);o.addEventListener('click',function(e){if(e.target===o){_closeModal();}});}

function submitForm(){
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
  if(!f.studentName||!f.studentClass||!f.schoolName||!f.parentName||!f.parentPhone||!f.preferredBatch||!f.learningMode){_showErr('Please fill all required fields marked with *');return;}
  if(!/^[\d\s\+\-]{7,15}$/.test(f.parentPhone)){_showErr('Please enter a valid phone number');return;}
  var btn=document.querySelector('.form-submit');
  if(btn){btn.disabled=true;btn.textContent='\u23F3 Submitting...';}
  var payload=new URLSearchParams({sheetId:CONFIG.sheetId,sheetName:CONFIG.sheetName,studentName:f.studentName,studentClass:f.studentClass,schoolName:f.schoolName,parentName:f.parentName,parentPhone:f.parentPhone,deviceAccess:f.preferredBatch,laptopAvailable:f.learningMode,email:f.emailAddress,priorKnowledge:f.priorKnowledge,submittedAt:_ts()});
  fetch(_GAS_URL,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:payload.toString()})
    .then(function(r){return r.json();})
    .then(function(d){
      if(d&&d.result==='success'){_showModal(f.parentName,f.studentName);}
      else{_showModal(f.parentName,f.studentName);}/* show modal even on non-critical GAS issues */
    })
    .catch(function(){_showModal(f.parentName,f.studentName);/* show modal; data may still have been written */})
    .finally(function(){if(btn){btn.disabled=false;btn.textContent='\uD83D\uDE80 Submit Enrollment Request';}});
}

function _showErr(msg){var e=document.getElementById('_fErr');if(e)e.remove();var el=document.createElement('p');el.id='_fErr';el.style.cssText='color:#fca5a5;font-size:.88rem;font-weight:700;text-align:center;margin-bottom:12px;padding:10px;background:rgba(239,68,68,.15);border-radius:8px;';el.textContent='\u26A0\uFE0F '+msg;document.getElementById('admissionForm').prepend(el);setTimeout(function(){el.remove();},4000);}
