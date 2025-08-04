/* ====== NAVBAR ACTIVE LINK & BURGER ====== */
const navLinks = document.querySelectorAll('.nav-links li a');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href')));
const burger = document.getElementById('burger');
const navUl = document.querySelector('.nav-links');

function highlight() {
  const scrollPos = window.scrollY + 100;
  sections.forEach((sec, i) => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
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

/* ====== CAROUSEL ====== */
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dots = document.querySelectorAll('.dot');
let index = 0;
let interval = setInterval(nextSlide, 7000);

function showSlide(i) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[i].classList.add('active');
  dots[i].classList.add('active');
  index = i;
}
function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}
function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}
nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
dots.forEach(d => d.addEventListener('click', e => { showSlide(+e.target.dataset.index); resetInterval(); }));
function resetInterval() { clearInterval(interval); interval = setInterval(nextSlide, 7000); }

/* ====== SCROLL REVEAL ====== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
