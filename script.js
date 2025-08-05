const navLinks = Array.from(document.querySelectorAll('.nav-links li a'));
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
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

const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
const prev   = document.getElementById('prev');
const next   = document.getElementById('next');
let idx = 0, timer = setInterval(nextSlide, 7000);

function showSlide(i) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[i].classList.add('active');
  dots[i].classList.add('active');
  idx = i;
}

function nextSlide() { showSlide((idx + 1) % slides.length); }
function prevSlide() { showSlide((idx - 1 + slides.length) % slides.length); }

next.addEventListener('click', () => { nextSlide(); resetTimer(); });
prev.addEventListener('click', () => { prevSlide(); resetTimer(); });
dots.forEach(d => d.addEventListener('click', e => {
  showSlide(+e.target.dataset.index);
  resetTimer();
}));

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 7000);
}

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if (ent.isIntersecting) {
      ent.target.classList.add('visible');
      ent.target.classList.toggle('up', window.scrollY > ent.target.offsetTop);
    } else {
      ent.target.classList.remove('visible', 'up');
    }
  });
}, { threshold: 0.25 });

revealEls.forEach(el => io.observe(el));

const translations = {
  en: {
    title: "Ricardo Jiménez – Portfolio",
    "nav-inicio":"Home",
    "nav-about":"About",
    "nav-proj":"Projects",
    "nav-skills":"Skills",
    "nav-contact":"Contact",
    "about-h2":"About me",
    "about-txt":"I'm Ricardo, a Mexican full-stack developer who loves designing, coding, deploying and iterating elegant solutions.",
    "proj-h2":"Projects",
    "skills-h2":"Skills",
    "contact-h2":"Contact",
    "pos-title":"Dynamic POS",
    "pos-desc":"Real-time point of sale with flexible tabs, QR ordering and full inventory control (Angular 16 + Laravel 11).",
    "task-title":"Taskly",
    "task-desc":"Android app (Kotlin + Firebase) that turns voice into smart reminders.",
    "guest-title":"Guest Management",
    "guest-desc":"Web suite for events with interactive invites and QR-based access control.",
    "footer-txt":"© 2025 Ricardo Jiménez — Made with 💜."
  }
};


const langBtn = document.getElementById('langToggle');
langBtn.addEventListener('click', () => {
  const cur = document.documentElement.dataset.lang;
  const next = cur === 'es' ? 'en' : 'es';
  document.documentElement.dataset.lang = next;
  langBtn.querySelector('.label').textContent = next === 'es' ? 'EN' : 'ES';
  applyLang(next);
});

function applyLang(lang) {
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.dataset.t;
    if (lang === 'es') {
      el.textContent = el.dataset.orig || el.textContent;
    } else if (translations[lang] && translations[lang][key]) {
      if (!el.dataset.orig) el.dataset.orig = el.textContent;
      el.textContent = translations[lang][key];
    }
  });
}
