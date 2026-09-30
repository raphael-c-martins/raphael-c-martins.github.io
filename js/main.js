/**
 * Web Currículo — Raphael Chernicharo Martins
 * main.js — Interações, lógica de filtros e sistema de UI nativo
 */

/* ── CURSOR GLOW ─────────────────────────────────────── */
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
    cursorGlow.style.left = `${x}px`;
    cursorGlow.style.top = `${y}px`;
  });
}

/* ── NAVBAR SCROLL ───────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── TYPED EFFECT ────────────────────────────────────── */
const phrases = [
  'Suporte Técnico (HelpDesk) 🔧',
  'Infraestrutura & Redes 🌐',
  'Automação de Rotinas com Python ⚡',
  'Garantia de Qualidade & QA 🧪',
  'Desenvolvimento Full-Stack 💻',
  'Cibersegurança Defensiva 🛡️',
];
let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  if (!typedEl) return;
  const current = phrases[pIdx];
  typedEl.textContent = deleting
    ? current.slice(0, --cIdx)
    : current.slice(0, ++cIdx);

  let delay = deleting ? 40 : 75;

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
if (typedEl) typeLoop();

/* ── EXPANDABLE DUTIES (Mobile Only) ─────────────────── */
function initExpandableDuties() {
  const firstDuties = document.querySelector('.timeline-item .timeline-duties');
  if (!firstDuties) return;

  const items = Array.from(firstDuties.querySelectorAll('li'));
  if (items.length <= 2) return;

  items.slice(2).forEach(li => li.classList.add('expand-hidden'));

  const triggerLi = document.createElement('li');
  triggerLi.className = 'expand-trigger';
  triggerLi.innerHTML = `
    <button class="expand-btn" aria-expanded="false" aria-label="Ver mais responsabilidades">
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      <span>Ver mais</span>
    </button>
  `;
  firstDuties.appendChild(triggerLi);

  const btn = triggerLi.querySelector('.expand-btn');
  const label = triggerLi.querySelector('span');
  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    btn.setAttribute('aria-expanded', expanded);

    if (expanded) {
      items.slice(2).forEach(li => li.classList.remove('expand-hidden'));
      triggerLi.classList.add('open');
      label.textContent = 'Ver menos';
    } else {
      items.slice(2).forEach(li => li.classList.add('expand-hidden'));
      triggerLi.classList.remove('open');
      label.textContent = 'Ver mais';
    }
  });
}

/* ── EXPANDABLE PROJECT DESC (Mobile Only) ───────────── */
function initExpandableProject() {
  const main = document.querySelector('[data-project-main]');
  const extra = document.querySelector('[data-project-extra]');
  if (!main || !extra) return;

  extra.classList.add('expand-hidden');

  const triggerDiv = document.createElement('div');
  triggerDiv.className = 'expand-trigger-block';
  triggerDiv.innerHTML = `
    <button class="expand-btn" aria-expanded="false" aria-label="Ver mais sobre o projeto">
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      <span>Ver mais</span>
    </button>
  `;
  extra.parentNode.insertBefore(triggerDiv, extra.nextSibling);

  const btn = triggerDiv.querySelector('.expand-btn');
  const label = triggerDiv.querySelector('span');
  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    btn.setAttribute('aria-expanded', expanded);

    if (expanded) {
      extra.classList.remove('expand-hidden');
      triggerDiv.classList.add('open');
      label.textContent = 'Ver menos';
    } else {
      extra.classList.add('expand-hidden');
      triggerDiv.classList.remove('open');
      label.textContent = 'Ver mais';
    }
  });
}

if (window.matchMedia('(max-width: 768px)').matches) {
  initExpandableDuties();
  initExpandableProject();
}

/* ── MOBILE MENU ─────────────────────────────────────── */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── SCROLL REVEAL ───────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
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
  { threshold: 0.35 }
);
sections.forEach(s => sectionObserver.observe(s));

/* ── PROJECT CATEGORY FILTERS ────────────────────────── */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = (card.getAttribute('data-category') || '').split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});

/* ── CONTACT FORM ────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Por favor, preencha todos os campos!', 'error');
      return;
    }

    const subject = encodeURIComponent(`Contato pelo Portfólio — ${name}`);
    const body = encodeURIComponent(`Olá Raphael,\n\n${message}\n\nDe: ${name}\nE-mail: ${email}`);
    window.location.href = `mailto:raphaelchernicharo@gmail.com?subject=${subject}&body=${body}`;
    showToast('Abrindo seu aplicativo de e-mail...', 'success');
    contactForm.reset();
  });
}

/* ── TOAST SYSTEM ────────────────────────────────────── */
const toastContainer = document.getElementById('toast-container');

function showToast(msg, type = 'success', duration = 4000) {
  if (!toastContainer) return;
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
const footerYearEl = document.getElementById('footer-year');
if (footerYearEl) {
  footerYearEl.textContent = new Date().getFullYear();
}

/* ── LIGHTBOX MODAL ──────────────────────────────────── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentGallery = [];
let currentIndex = 0;

function updateLightboxImage() {
  if (currentGallery.length > 0 && lightboxImg) {
    lightboxImg.src = currentGallery[currentIndex];
  }
}

function openLightbox(gallery, index = 0) {
  if (!lightbox) return;
  currentGallery = gallery;
  currentIndex = index;
  if (lightboxPrev) lightboxPrev.style.display = currentGallery.length > 1 ? 'flex' : 'none';
  if (lightboxNext) lightboxNext.style.display = currentGallery.length > 1 ? 'flex' : 'none';
  updateLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.btn-cert, .sub-card-mini').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();

    let gallerySrc = el.getAttribute('data-gallery');
    let startIndex = 0;

    if (el.classList.contains('sub-card-mini')) {
      const parentCard = el.closest('.cert-card, .project-card');
      const mainBtn = parentCard ? parentCard.querySelector('.btn-cert') : null;
      if (mainBtn) gallerySrc = mainBtn.getAttribute('data-gallery');
      startIndex = parseInt(el.getAttribute('data-gallery-index')) || 0;

      if (el.classList.contains('sub-card-mini--more')) startIndex = 1;
    }

    const certSrc = el.getAttribute('data-cert');

    if (gallerySrc) {
      openLightbox(gallerySrc.split(','), startIndex);
    } else if (certSrc) {
      openLightbox([certSrc], 0);
    }
  });
});

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', () => {
    if (currentGallery.length > 1) {
      currentIndex = (currentIndex === 0) ? currentGallery.length - 1 : currentIndex - 1;
      updateLightboxImage();
    }
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', () => {
    if (currentGallery.length > 1) {
      currentIndex = (currentIndex === currentGallery.length - 1) ? 0 : currentIndex + 1;
      updateLightboxImage();
    }
  });
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    if (lightboxImg) lightboxImg.src = '';
    currentGallery = [];
  }, 300);
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && currentGallery.length > 1) {
    currentIndex = (currentIndex === 0) ? currentGallery.length - 1 : currentIndex - 1;
    updateLightboxImage();
  }
  if (e.key === 'ArrowRight' && currentGallery.length > 1) {
    currentIndex = (currentIndex === currentGallery.length - 1) ? 0 : currentIndex + 1;
    updateLightboxImage();
  }
});
