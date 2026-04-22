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

/* ── EXPANDABLE DUTIES (mobile only) ────────────────── */
/**
 * Oculta os itens 3+ da lista de responsabilidades do cargo principal
 * e injeta um botão "Ver mais" com fade gradient acima.
 * Só executa em viewports <= 768px (mobile).
 */
function initExpandableDuties() {
  const firstDuties = document.querySelector('.timeline-item .timeline-duties');
  if (!firstDuties) return;

  const items = Array.from(firstDuties.querySelectorAll('li'));
  if (items.length <= 2) return;

  // Esconde os itens a partir do 3º (índice 2)
  items.slice(2).forEach(li => li.classList.add('expand-hidden'));

  // Cria o <li> de trigger com botão
  const triggerLi = document.createElement('li');
  triggerLi.className = 'expand-trigger';
  triggerLi.innerHTML = `
    <button class="expand-btn" aria-expanded="false" aria-label="Ver mais responsabilidades">
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      <span>Ver mais</span>
    </button>
  `;
  firstDuties.appendChild(triggerLi);

  // Toggle bidirecional: Ver mais ↔ Ver menos
  const btn     = triggerLi.querySelector('.expand-btn');
  const label   = triggerLi.querySelector('span');
  let expanded  = false;

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

// Só inicializa em mobile (nunca altera o layout desktop)
if (window.matchMedia('(max-width: 768px)').matches) {
  initExpandableDuties();
  initExpandableProject();
}

/* ── EXPANDABLE PROJECT DESC (mobile only) ───────────── */
/**
 * Oculta o 2º parágrafo do projeto Suite [data-project-extra]
 * e injeta botão "Ver mais / Ver menos" entre os dois parágrafos.
 * Mesmo padrão do initExpandableDuties().
 */
function initExpandableProject() {
  const main  = document.querySelector('[data-project-main]');
  const extra = document.querySelector('[data-project-extra]');
  if (!main || !extra) return;

  // Mesmo padrão da timeline: adiciona expand-hidden diretamente ao elemento
  extra.classList.add('expand-hidden');

  // Insere o trigger entre os dois parágrafos
  const triggerDiv = document.createElement('div');
  triggerDiv.className = 'expand-trigger-block';
  triggerDiv.innerHTML = `
    <button class="expand-btn" aria-expanded="false" aria-label="Ver mais sobre o projeto">
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      <span>Ver mais</span>
    </button>
  `;
  // Insere o trigger APÓS o extra (mesmo padrão do appendChild da timeline)
  // Colapsado: extra some → botão fica logo abaixo do 1º parágrafo
  // Expandido: extra aparece → botão fica abaixo de todo o conteúdo
  extra.parentNode.insertBefore(triggerDiv, extra.nextSibling);

  const btn    = triggerDiv.querySelector('.expand-btn');
  const label  = triggerDiv.querySelector('span');
  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    btn.setAttribute('aria-expanded', expanded);

    if (expanded) {
      extra.classList.remove('expand-hidden');   // igual timeline
      triggerDiv.classList.add('open');
      label.textContent = 'Ver menos';
    } else {
      extra.classList.add('expand-hidden');      // igual timeline
      triggerDiv.classList.remove('open');
      label.textContent = 'Ver mais';
    }
  });
}

/* ── MOBILE MENU ─────────────────────────────────────── */
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  // Sincroniza a animação hamburger → X com o estado do menu
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', open);
});

// Fecha ao clicar em um link e reverte o hamburger para o estado inicial
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ── TYPED EFFECT ────────────────────────────────────── */
const phrases = [
  'Suporte Técnico (HelpDesk) 🔧',
  'Infraestrutura & Redes 🌐',
  'Automação de Rotinas de TI ⚡',
  'Cibersegurança Defensiva 🛡️',
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
  if (currentGallery.length > 0) {
    lightboxImg.src = currentGallery[currentIndex];
  }
}

document.querySelectorAll('.btn-cert').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const certSrc = btn.getAttribute('data-cert');
    const gallerySrc = btn.getAttribute('data-gallery');

    if (gallerySrc) {
      currentGallery = gallerySrc.split(',');
      currentIndex = 0;
      lightboxPrev.style.display = 'flex';
      lightboxNext.style.display = 'flex';
      updateLightboxImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    } 
    else if (certSrc) {
      currentGallery = [certSrc];
      currentIndex = 0;
      lightboxPrev.style.display = 'none';
      lightboxNext.style.display = 'none';
      updateLightboxImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

lightboxPrev.addEventListener('click', () => {
  if (currentGallery.length > 1) {
    currentIndex = (currentIndex === 0) ? currentGallery.length - 1 : currentIndex - 1;
    updateLightboxImage();
  }
});

lightboxNext.addEventListener('click', () => {
  if (currentGallery.length > 1) {
    currentIndex = (currentIndex === currentGallery.length - 1) ? 0 : currentIndex + 1;
    updateLightboxImage();
  }
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    lightboxImg.src = '';
    currentGallery = [];
  }, 300);
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
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
