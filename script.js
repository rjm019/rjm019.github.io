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
window.addEventListener('scroll', highlight, { passive: true });
highlight();

function setMenu(open) {
  navUl.classList.toggle('show', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
}
burger.addEventListener('click', () => setMenu(!navUl.classList.contains('show')));
navLinks.forEach(l => l.addEventListener('click', () => setMenu(false)));

const revealEls = document.querySelectorAll('.reveal');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('visible');
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
}

document.getElementById('year').textContent = new Date().getFullYear();

const translations = {
  en: {
    title: "Ricardo Jiménez – Full-stack developer",
    "nav-inicio": "Home",
    "nav-about": "About",
    "nav-proj": "Projects",
    "nav-skills": "Skills",
    "nav-contact": "Contact",
    "hero-eyebrow": "Full-stack developer · Mexico City",
    "hero-pitch": "I build web products end to end: from the database and the API to the interface and cloud deployment. My latest project, a digital invitation engine, is already live in production.",
    "hero-cta": "See projects",
    "hero-contact": "Get in touch",
    "proj-h2": "Projects",
    "inv-badge": "In production",
    "inv-desc": "Digital invitation engine for weddings, quinceañeras and graduations, with RSVP and guest check-in at the door.",
    "inv-h1": "Template manager with instant preview, autosaved drafts, history and publishing.",
    "inv-h2": "Live host dashboard: links by party size, confirmations and table assignments.",
    "inv-h3": "Personal invitation with a QR code woven into the design, read by the offline check-in app.",
    "inv-h4": "No database: state lives in CSV files with atomic writes, backups and file locks.",
    "inv-h5": "Tested with PHPUnit and Vitest; everything runs in Docker and ships to Fly.io.",
    "inv-live": "Live site",
    "inv-demo": "See a sample",
    "code": "Code",
    "pos-badge": "Client: El Tinacal",
    "pos-title": "Restaurant point of sale",
    "pos-desc": "Point of sale system built for a restaurant.",
    "pos-h1": "Tables that merge and split, and orders that can be divided to pay in parts.",
    "pos-h2": "QR ordering, product catalog with availability and sales reports.",
    "pos-h3": "Token-authenticated API and an Angular Material client.",
    "private": "Private code (client project)",
    "inegi-badge": "REST API",
    "inegi-title": "INEGI states catalog",
    "inegi-desc": "API that syncs the INEGI geostatistical catalog of Mexican states and serves it with search and pagination.",
    "inegi-h1": "HTTP client with retries and a 7-day cached copy in case INEGI's service is down.",
    "inegi-h2": "Sync inside a database transaction plus duplicate cleanup.",
    "inegi-h3": "OpenAPI docs with Swagger and a lookup page built with DataTables.",
    "about-h2": "About me",
    "about-txt": "I'm Ricardo, a Mexican developer who has been coding since 17. I've built ERPs, points of sale, mobile apps and cloud deployments, and I've worked as PM, DevOps and team lead, though writing code is still what I enjoy most. I like owning a product end to end: understanding the business, designing it, coding it, testing it and shipping it.",
    "skills-h2": "Skills",
    "skills-ops": "DevOps & data",
    "contact-h2": "Contact",
    "contact-intro": "Have a project or an opening? Drop me a line.",
    "contact-email": "Email"
  }
};

const langBtn = document.getElementById('langToggle');
langBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.lang === 'es' ? 'en' : 'es';
  document.documentElement.dataset.lang = next;
  document.documentElement.lang = next;
  langBtn.querySelector('.label').textContent = next === 'es' ? 'EN' : 'ES';
  langBtn.setAttribute('aria-label', next === 'es' ? 'Switch to English' : 'Cambiar a español');
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
