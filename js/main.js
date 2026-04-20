/**
 * Web Currículo — Raphael Chernicharo Martins
 * main.js — Interações, animações e lógica de UI
 */

/* ── CURSOR GLOW ─────────────────────────────────────── */
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
  cursorGlow.style.left = `${x}px`;
  cursorGlow.style.top  = `${y}px`;
});

/* ── NAVBAR SCROLL ───────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── MOBILE MENU ─────────────────────────────────────── */
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

// Fecha ao clicar em um link
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ── TYPED EFFECT ────────────────────────────────────── */
const phrases = [
  'Dev Front-End 💻',
  'Estudante de Ciência da Computação 🎓',
  'Suporte & Manutenção TI 🔧',
  'Apaixonado por CiberSegurança 🛡️',
];
let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const current = phrases[pIdx];
  typedEl.textContent = deleting
    ? current.slice(0, --cIdx)
    : current.slice(0, ++cIdx);

  let delay = deleting ? 45 : 80;

  if (!deleting && cIdx === current.length) {
    delay = 2200;
    deleting = true;
  } else if (deleting && cIdx === 0) {
    deleting = false;
    pIdx = (pIdx + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

/* ── SCROLL REVEAL ───────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger nos filhos do mesmo grupo
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ── ACTIVE NAV LINK ─────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => sectionObserver.observe(s));

/* ── CONTACT FORM ────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !message) {
    showToast('Preencha todos os campos!', 'error');
    return;
  }

  // Abre cliente de e-mail (mailto) — fallback sem backend
  const subject = encodeURIComponent(`Contato pelo Portfólio — ${name}`);
  const body    = encodeURIComponent(`Olá Raphael,\n\n${message}\n\nDe: ${name}\nE-mail: ${email}`);
  window.location.href = `mailto:raphaelchernicharo@gmail.com?subject=${subject}&body=${body}`;
  showToast('Abrindo seu cliente de e-mail... 📨', 'success');
  contactForm.reset();
});

/* ── TOAST SYSTEM ────────────────────────────────────── */
const toastContainer = document.getElementById('toast-container');

function showToast(msg, type = 'success', duration = 4000) {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}" aria-hidden="true"></i>
    <span>${msg}</span>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut .35s ease forwards';
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

/* ── FOOTER YEAR ─────────────────────────────────────── */
document.getElementById('footer-year').textContent = new Date().getFullYear();

/* ── SMOOTH ACTIVE LINK STYLE ────────────────────────── */
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--accent) !important; }`;
document.head.appendChild(style);
