const navLinks = document.querySelectorAll('.nav-links li a');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href')));
const burger   = document.getElementById('burger');
const navUl    = document.querySelector('.nav-links');

function highlight() {
  const pos = window.scrollY + 100;
  sections.forEach((sec, i) => {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      navLinks[i].classList.add('active');
    }
  });
}
window.addEventListener('scroll', highlight);
highlight();

burger.addEventListener('click', () => {
  navUl.classList.toggle('show');
  burger.classList.toggle('open');
});
navLinks.forEach(l => l.addEventListener('click', () => navUl.classList.remove('show')));

const slides = document.querySelectorAll('.slide'),
      dots   = document.querySelectorAll('.dot'),
      prev   = document.getElementById('prev'),
      next   = document.getElementById('next');
let idx = 0, timer = setInterval(nextSlide, 7000);

function showSlide(i){
  slides.forEach(s=>s.classList.remove('active'));
  dots  .forEach(d=>d.classList.remove('active'));
  slides[i].classList.add('active');
  dots[i].classList.add('active');
  idx = i;
}
function nextSlide(){ showSlide((idx+1)%slides.length); }
function prevSlide(){ showSlide((idx-1+slides.length)%slides.length); }

next.addEventListener('click', ()=>{nextSlide();resetTimer();});
prev.addEventListener('click', ()=>{prevSlide();resetTimer();});
dots.forEach(d => d.addEventListener('click', e => {showSlide(+e.target.dataset.index);resetTimer();}));
function resetTimer(){ clearInterval(timer); timer=setInterval(nextSlide,7000); }

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      ent.target.classList.add('visible');
      ent.target.classList.toggle('up', window.scrollY > ent.target.offsetTop); 
    }else{
      ent.target.classList.remove('visible','up');
    }
  });
},{threshold:0.2});
revealEls.forEach(el=>io.observe(el));

const t = {
  en:{
    title:"Ricardo Jiménez – Portfolio",
    "nav-inicio":"Home","nav-about":"About","nav-proj":"Projects","nav-skills":"Skills","nav-contact":"Contact",
    "about-h2":"About me","about-txt":"I'm Ricardo, a Mexican full-stack developer driven by elegant solutions…",
    "proj-h2":"Projects",
    "pos-title":"Dynamic POS","pos-desc":"Flexible tabs, QR ordering and full inventory control.",
    "task-title":"Taskly","task-desc":"Instant voice-to-reminder Android app.",
    "guest-title":"Guest Management","guest-desc":"Interactive invites and QR passes for your event.",
    "skills-h2":"Skills",
    "contact-h2":"Contact",
    "footer-txt":"© 2025 Ricardo Jiménez — Made with 💜."
  },
  es:{ /* Spanish originals = fallback */ }
};

const langBtn = document.getElementById('langToggle');
langBtn.addEventListener('click', ()=>{
  const cur = document.documentElement.dataset.lang;
  const next = cur === 'es' ? 'en' : 'es';
  document.documentElement.dataset.lang = next;
  langBtn.textContent = next === 'es' ? 'EN' : 'ES';
  applyLang(next);
});

function applyLang(lang){
  document.querySelectorAll('[data-t]').forEach(el=>{
    const key = el.dataset.t;
    if(lang==='es'){ el.textContent = el.dataset.orig || el.textContent; return; }
    if(!t[lang][key]) return;
    if(!el.dataset.orig) el.dataset.orig = el.textContent;
    el.textContent = t[lang][key];
  });
}
