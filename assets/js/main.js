// ============================================================
// main.js – Assicurazioni Palermo
// ============================================================

// ── SLIDER ──
let cur=0;
const slides=document.querySelectorAll('.slide');
const dots=document.querySelectorAll('.s-dot');
let timer=null;
function showSlide(n){
  slides[cur].classList.remove('active');
  dots[cur].classList.remove('active');
  cur=(n+slides.length)%slides.length;
  slides[cur].classList.add('active');
  dots[cur].classList.add('active');
}
function moveSlider(d){clearTimeout(timer);showSlide(cur+d);startAuto()}
function goSlide(n){clearTimeout(timer);showSlide(n);startAuto()}
function startAuto(){timer=setTimeout(()=>{showSlide(cur+1);startAuto()},6000)}
startAuto();

// ── REVEAL ──
const obs=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})
},{threshold:.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// ── FORM ──
function submitForm(){
  const n=document.getElementById('fn').value;
  const t=document.getElementById('ft').value;
  const p=document.getElementById('priv').checked;
  if(!n||!t){alert('Inserisci nome e telefono.');return}
  if(!p){alert('Accetta la Privacy Policy per procedere.');return}
  const s=document.getElementById('succ');
  s.style.display='block';
  setTimeout(()=>s.style.display='none',6000);
}

// ── MOBILE MENU ──
var menuOpen=false;
function openMenu(){
  menuOpen=true;
  var n=document.getElementById('mobnav'),h=document.getElementById('ham');
  if(!n||!h)return;
  n.style.display='flex';
  requestAnimationFrame(function(){n.classList.add('is-open')});
  h.classList.add('is-open');
  document.body.style.overflow='hidden';
}
function closeMenu(){
  menuOpen=false;
  var n=document.getElementById('mobnav'),h=document.getElementById('ham');
  if(!n||!h)return;
  n.classList.remove('is-open');
  h.classList.remove('is-open');
  document.body.style.overflow='';
  // Reset all dropdowns
  document.querySelectorAll('.mnv-dropdown-toggle.open').forEach(function(b){
    b.classList.remove('open');
    var ob=b.nextElementSibling;
    if(ob) ob.classList.remove('open');
  });
  setTimeout(function(){if(!menuOpen)n.style.display='none';},350);
}
function toggleMenu(){menuOpen?closeMenu():openMenu();}
// ── MOBILE MENU: LINKS + DROPDOWN ──
document.addEventListener('DOMContentLoaded', function() {
  var mobnav = document.getElementById('mobnav');
  if (!mobnav) return;

  // 1. Close menu when any regular link is clicked (not dropdown toggle)
  mobnav.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      // Regular links inside dropdown body → navigate AND close menu
      // Dropdown toggle buttons are <button>, not <a>, so this is safe
      closeMenu();
    });
  });

  // 2. Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });
});

// ── DROPDOWN TOGGLE (called by onclick in HTML) ──
function toggleDropdown(btn) {
  var body = btn.nextElementSibling;
  if (!body || !body.classList.contains('mnv-dropdown-body')) return;

  var isOpen = btn.classList.contains('open');

  // Close all other open dropdowns first
  document.querySelectorAll('.mnv-dropdown-toggle.open').forEach(function(other) {
    if (other !== btn) {
      other.classList.remove('open');
      var ob = other.nextElementSibling;
      if (ob) ob.classList.remove('open');
    }
  });

  // Toggle this one
  btn.classList.toggle('open', !isOpen);
  body.classList.toggle('open', !isOpen);
}








// ── FORMSPREE SUCCESS ──
// Formspree success message
if(window.location.search.includes('success')){
  document.addEventListener('DOMContentLoaded',function(){
    var msg = document.createElement('div');
    msg.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#27ae60;color:#fff;padding:16px 28px;border-radius:8px;z-index:9999;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,.2);font-size:.88rem';
    msg.textContent='La richiesta è stata inoltrata correttamente. Verrai contattato al più presto da un nostro consulente.';
    document.body.appendChild(msg);
    setTimeout(function(){msg.remove()},6000);
  });
}

// ── STICKY MOBILE HEADER ──
(function(){
  var hdr = document.querySelector('header');
  if(!hdr) return;
  var lastY = 0;
  var ticking = false;
  function onScroll(){
    if(!ticking){
      requestAnimationFrame(function(){
        var y = window.scrollY || window.pageYOffset;
        if(window.innerWidth <= 768){
          if(y > 40){
            hdr.classList.add('hdr-compact');
          } else {
            hdr.classList.remove('hdr-compact');
          }
        } else {
          hdr.classList.remove('hdr-compact');
        }
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  // Also handle resize (switching between desktop/mobile)
  window.addEventListener('resize', function(){
    if(window.innerWidth > 768) hdr.classList.remove('hdr-compact');
  }, {passive:true});
})();
