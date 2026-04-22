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
