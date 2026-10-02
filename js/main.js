/**
 * Web Currículo — Raphael Chernicharo Martins
 * main.js — Interações, lógica de filtros e sistema de UI nativo
 */

/* ── RESET DE SCROLL NO TOPO (Garante início no topo ao recarregar F5 / Shift+F5) ── */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function forceScrollTop() {
  if (window.location.hash) {
    try {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    } catch (e) {}
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

// Inicializa scroll no topo apenas ao recarregar a página
document.addEventListener('DOMContentLoaded', () => {
  forceScrollTop();
});

window.addEventListener('load', () => {
  forceScrollTop();
});

/* ── CURSOR GLOW ─────────────────────────────────────── */
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
    cursorGlow.style.left = `${x}px`;
    cursorGlow.style.top = `${y}px`;
  });
}

/* ── SCROLL PROGRESS BAR ─────────────────────────────── */
const scrollProgress = document.getElementById('scroll-progress');

/* ── NAVBAR SCROLL & PROGRESS ────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 40);

  if (scrollProgress) {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
  }
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

/* ── HERO STATS COUNTER ANIMATION ───────────────────── */
function initHeroCounters() {
  const counterElements = document.querySelectorAll('.hero-stat-num[data-count]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Curva de desaceleração suave (easeOutExpo)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.floor(ease * target);
      el.textContent = val + suffix;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(frame);
  }

  counterElements.forEach(el => observer.observe(el));
}
initHeroCounters();

/* ── EXPANDABLE DUTIES (Mobile & Compact View) ───────── */
function initExpandableDuties() {
  const allDuties = document.querySelectorAll('.timeline-item .timeline-duties');
  if (!allDuties.length) return;

  allDuties.forEach((dutiesList) => {
    if (dutiesList.querySelector('.expand-trigger')) return;

    const items = Array.from(dutiesList.querySelectorAll('li'));
    // Aplica na lista longa (Cartório com 8 responsabilidades completas)
    if (items.length <= 4) return;

    const visibleCount = 2;
    const remaining = items.length - visibleCount;

    // Marca os excedentes para ocultação exclusiva no mobile via CSS
    items.slice(visibleCount).forEach(li => li.classList.add('expand-hidden'));

    const triggerLi = document.createElement('li');
    triggerLi.className = 'expand-trigger';
    triggerLi.innerHTML = `
      <button class="expand-btn" type="button" aria-expanded="false" aria-label="Ver mais responsabilidades">
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        <span>Ver mais responsabilidades (+${remaining})</span>
      </button>
    `;
    dutiesList.appendChild(triggerLi);

    const btn = triggerLi.querySelector('.expand-btn');
    const label = triggerLi.querySelector('span');
    let expanded = false;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      expanded = !expanded;
      btn.setAttribute('aria-expanded', expanded);

      if (expanded) {
        items.slice(visibleCount).forEach(li => li.classList.remove('expand-hidden'));
        triggerLi.classList.add('open');
        label.textContent = 'Ver menos responsabilidades';
      } else {
        items.slice(visibleCount).forEach(li => li.classList.add('expand-hidden'));
        triggerLi.classList.remove('open');
        label.textContent = `Ver mais responsabilidades (+${remaining})`;
      }
    });
  });
}

/* ── EXPANDABLE PROJECT DESCRIPTIONS (Mobile Clamping) ── */
function initExpandableProjectDescriptions() {
  const descriptions = document.querySelectorAll('.project-card .project-desc');
  descriptions.forEach(desc => {
    if (desc.textContent.trim().length > 130 && !desc.nextElementSibling?.classList?.contains('project-desc-toggle')) {
      desc.classList.add('is-clampable');

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'project-desc-toggle';
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = `
        <span>Ler detalhes</span>
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      `;

      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = desc.classList.toggle('is-expanded');
        toggleBtn.setAttribute('aria-expanded', isExpanded);
        toggleBtn.querySelector('span').textContent = isExpanded ? 'Recolher detalhes' : 'Ler detalhes';
      });

      desc.parentNode.insertBefore(toggleBtn, desc.nextSibling);
    }
  });
}

/* ── PROGRESSIVE PROJECTS ON MOBILE (Catalog View) ───── */
function initMobileProjectsCatalog() {
  const projectsGrid = document.querySelector('.projects-grid');
  if (!projectsGrid) return;

  const cards = Array.from(projectsGrid.querySelectorAll('.project-card'));
  if (cards.length <= 4) return;

  let existingWrap = document.getElementById('mobile-projects-more-wrap');
  if (existingWrap) existingWrap.remove();

  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    cards.forEach(card => card.classList.remove('mobile-project-hidden'));
    return;
  }

  // No mobile, exibe inicialmente os 4 principais projetos
  cards.slice(4).forEach(card => card.classList.add('mobile-project-hidden'));

  const moreWrap = document.createElement('div');
  moreWrap.id = 'mobile-projects-more-wrap';
  moreWrap.className = 'projects-mobile-more-wrap';
  moreWrap.innerHTML = `
    <button id="btn-projects-mobile-more" class="btn btn--outline btn--full" type="button">
      <i class="fa-solid fa-layer-group" aria-hidden="true"></i>
      <span>Ver todos os projetos (+${cards.length - 4})</span>
    </button>
  `;
  projectsGrid.parentNode.insertBefore(moreWrap, projectsGrid.nextSibling);

  const moreBtn = moreWrap.querySelector('button');
  let expanded = false;

  moreBtn.addEventListener('click', () => {
    expanded = !expanded;
    if (expanded) {
      cards.forEach(card => card.classList.remove('mobile-project-hidden'));
      moreBtn.innerHTML = `
        <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>
        <span>Recolher lista de projetos</span>
      `;
    } else {
      cards.slice(4).forEach(card => card.classList.add('mobile-project-hidden'));
      moreBtn.innerHTML = `
        <i class="fa-solid fa-layer-group" aria-hidden="true"></i>
        <span>Ver todos os projetos (+${cards.length - 4})</span>
      `;
      document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/* ── MENU MOBILE COM BACKDROP & ACESSIBILIDADE ESC ────── */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!menuToggle || !navLinks) return;

  let backdrop = document.querySelector('.mobile-menu-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(backdrop);
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('active');
    document.body.classList.remove('menu-locked');
  }

  function openMenu() {
    navLinks.classList.add('open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    backdrop.classList.add('active');
    document.body.classList.add('menu-locked');
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
      initMobileProjectsCatalog();
    }
  });
}

/* ── SCROLL HINT (Fade-out ao Rolar a Página) ─────────── */
function initScrollHintListener() {
  const scrollHint = document.getElementById('hero-scroll-hint');
  if (!scrollHint) return;

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 40) {
      scrollHint.classList.add('is-hidden');
    } else {
      scrollHint.classList.remove('is-hidden');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ── FILTER TABS DRAG (Arraste Fluido Horizontal) ────── */
function initFilterTabsDrag() {
  const tabs = document.querySelector('.filter-tabs');
  if (!tabs) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let hasMoved = false;

  tabs.addEventListener('mousedown', (e) => {
    isDown = true;
    hasMoved = false;
    tabs.classList.add('is-dragging');
    startX = e.pageX - tabs.offsetLeft;
    scrollLeft = tabs.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    tabs.classList.remove('is-dragging');
  });

  tabs.addEventListener('mouseleave', () => {
    isDown = false;
    tabs.classList.remove('is-dragging');
  });

  tabs.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - tabs.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) hasMoved = true;
    tabs.scrollLeft = scrollLeft - walk;
  });

  // Previne clique involuntário nos botões ao realizar o arraste
  tabs.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        hasMoved = false;
      }
    }, true);
  });
}

// Inicializa controles de responsividade
initExpandableDuties();
initExpandableProjectDescriptions();
initMobileProjectsCatalog();
initMobileMenu();
initScrollHintListener();
initFilterTabsDrag();

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
    const moreWrap = document.getElementById('mobile-projects-more-wrap');

    projectCards.forEach(card => {
      const categories = (card.getAttribute('data-category') || '').split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('is-hidden');
        if (filter !== 'all') {
          card.classList.remove('mobile-project-hidden');
        }
      } else {
        card.classList.add('is-hidden');
      }
    });

    if (moreWrap) {
      moreWrap.style.display = (filter === 'all' && window.innerWidth <= 768) ? 'flex' : 'none';
    }
  });
});

/* ── CONTACT FORM ────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('form-name');
const emailInput = document.getElementById('form-email');
const extraContactInput = document.getElementById('form-extra-contact');
const emailSuggestions = document.getElementById('email-suggestions');

// 1. Capitalização Automática de Nome e Sobrenome (Title Case)
if (nameInput) {
  nameInput.addEventListener('input', () => {
    const start = nameInput.selectionStart;
    const end = nameInput.selectionEnd;
    const original = nameInput.value;
    const formatted = original.replace(/(^|[\s\-])([^\s\-])/g, (_, sep, char) => sep + char.toUpperCase());
    if (original !== formatted) {
      nameInput.value = formatted;
      nameInput.setSelectionRange(start, end);
    }
  });

  nameInput.addEventListener('blur', () => {
    if (!nameInput.value.trim()) return;
    const connectives = ['de', 'da', 'do', 'das', 'dos', 'e'];
    const words = nameInput.value.trim().split(/\s+/);
    nameInput.value = words.map((w, i) => {
      const lower = w.toLowerCase();
      if (i > 0 && connectives.includes(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }).join(' ');
  });
}

// 2. Sugestão Inteligente de Domínios de E-mail
if (emailInput && emailSuggestions) {
  const commonDomains = [
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com',
    'yahoo.com.br',
    'icloud.com',
    'live.com',
    'proton.me'
  ];
  let activeIndex = -1;

  function closeSuggestions() {
    emailSuggestions.hidden = true;
    emailSuggestions.innerHTML = '';
    activeIndex = -1;
  }

  function renderSuggestions(userPart, matchingDomains) {
    emailSuggestions.innerHTML = '';
    matchingDomains.forEach((domain, idx) => {
      const li = document.createElement('li');
      li.className = 'email-suggestion-item';
      li.setAttribute('role', 'option');
      li.setAttribute('id', `email-sugg-${idx}`);

      const icon = document.createElement('i');
      icon.className = 'fa-regular fa-envelope';
      icon.setAttribute('aria-hidden', 'true');

      const span = document.createElement('span');
      span.textContent = userPart;

      const strong = document.createElement('strong');
      strong.textContent = `@${domain}`;
      span.appendChild(strong);

      li.appendChild(icon);
      li.appendChild(span);

      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        selectDomain(userPart, domain);
      });
      emailSuggestions.appendChild(li);
    });
    emailSuggestions.hidden = false;
    activeIndex = -1;
  }

  function selectDomain(userPart, domain) {
    emailInput.value = `${userPart}@${domain}`;
    closeSuggestions();
    if (extraContactInput) {
      extraContactInput.focus();
    }
  }

  emailInput.addEventListener('input', () => {
    const val = emailInput.value;
    const atIndex = val.indexOf('@');

    if (atIndex <= 0) {
      closeSuggestions();
      return;
    }

    // Se houver mais de um '@', oculta as sugestões
    if (val.indexOf('@', atIndex + 1) !== -1) {
      closeSuggestions();
      return;
    }

    const userPart = val.slice(0, atIndex);
    const domainQuery = val.slice(atIndex + 1).toLowerCase();

    // Se já digitou o domínio completo com exatidão, fecha
    const exactMatch = commonDomains.find(d => d === domainQuery);
    if (exactMatch) {
      closeSuggestions();
      return;
    }

    const matches = commonDomains.filter(d => d.startsWith(domainQuery));
    if (matches.length > 0) {
      renderSuggestions(userPart, matches);
    } else {
      closeSuggestions();
    }
  });

  emailInput.addEventListener('keydown', (e) => {
    if (emailSuggestions.hidden) return;

    const items = emailSuggestions.querySelectorAll('.email-suggestion-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActiveItem(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActiveItem(items);
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (activeIndex >= 0 && items[activeIndex]) {
        e.preventDefault();
        items[activeIndex].dispatchEvent(new MouseEvent('mousedown'));
      }
    } else if (e.key === 'Escape') {
      closeSuggestions();
    }
  });

  function updateActiveItem(items) {
    items.forEach((item, idx) => {
      const isActive = idx === activeIndex;
      item.classList.toggle('active', isActive);
      if (isActive) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  emailInput.addEventListener('blur', () => {
    setTimeout(closeSuggestions, 180);
  });
}

// 3. Formatação Inteligente do Campo "Outro Meio de Contato"
if (extraContactInput) {
  extraContactInput.addEventListener('input', () => {
    const val = extraContactInput.value;
    // Se o usuário estiver digitando números e pontuação telefônica, formata como telefone brasileiro
    if (!/[a-zA-Z]/.test(val) && /\d/.test(val)) {
      const digits = val.replace(/\D/g, '').slice(0, 11);
      if (!digits) {
        extraContactInput.value = '';
        return;
      }
      let formatted = '';
      if (digits.length <= 2) {
        formatted = `(${digits}`;
      } else if (digits.length <= 6) {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      } else if (digits.length <= 10) {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      }
      extraContactInput.value = formatted;
    }
  });
}

// 4. Submissão do Formulário com Validação e Feedback Instantâneo
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const extraContact = document.getElementById('form-extra-contact')?.value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Por favor, preencha todos os campos obrigatórios!', 'error');
      return;
    }

    const subject = encodeURIComponent(`Contato pelo Portfólio — ${name}`);
    let bodyText = `Olá Raphael,\n\n${message}\n\nDe: ${name}\nE-mail: ${email}`;
    if (extraContact) {
      bodyText += `\nOutro Contato: ${extraContact}`;
    }
    const body = encodeURIComponent(bodyText);
    window.location.href = `mailto:raphaelchernicharo@gmail.com?subject=${subject}&body=${body}`;
    showToast('Abrindo seu aplicativo de e-mail...', 'success');
    contactForm.reset();
  });
}

// 5. Clique no E-mail: Preserva posição do scroll e copia para o clipboard
const contactEmailLink = document.getElementById('contact-email');
if (contactEmailLink) {
  contactEmailLink.addEventListener('click', () => {
    const currentY = window.scrollY;
    const email = 'raphaelchernicharo@gmail.com';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        showToast('E-mail copiado para a área de transferência!', 'success', 3000);
      }).catch(() => {});
    }

    // Trava a posição do scroll para impedir saltos do navegador ao abrir protocolo externo
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentY, behavior: 'instant' });
    });
    setTimeout(() => {
      window.scrollTo({ top: currentY, behavior: 'instant' });
    }, 60);
  });
}

/* ── TOAST SYSTEM ────────────────────────────────────── */
const toastContainer = document.getElementById('toast-container');

function showToast(msg, type = 'success', duration = 4000) {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  const iconClass = type === 'success' ? 'circle-check' : (type === 'info' ? 'circle-info' : 'circle-exclamation');
  
  const icon = document.createElement('i');
  icon.className = `fa-solid fa-${iconClass}`;
  icon.setAttribute('aria-hidden', 'true');

  const span = document.createElement('span');
  span.textContent = msg;

  toast.appendChild(icon);
  toast.appendChild(span);
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
      const stack = el.closest('.cert-sub-stack');
      if (stack && stack.getAttribute('data-gallery')) {
        gallerySrc = stack.getAttribute('data-gallery');
      } else if (parentCard) {
        const mainBtn = parentCard.querySelector('.btn-cert[data-gallery]');
        if (mainBtn) gallerySrc = mainBtn.getAttribute('data-gallery');
      }
      startIndex = parseInt(el.getAttribute('data-gallery-index'), 10) || 0;
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

/* ═══════════════════════════════════════════════════════
   GERENCIAMENTO DE TEMA (Theme Manager)
   Botão Flutuante Único com Efeito Radial de View Transitions
   ═══════════════════════════════════════════════════════ */
const themeToggleBtn = document.getElementById('theme-toggle');
const themeTooltip = document.getElementById('theme-tooltip');
const metaThemeColor = document.getElementById('meta-theme-color');

function getStoredTheme() {
  return localStorage.getItem('rcm_theme') || 'light';
}

function updateThemeUI(theme) {
  const isLight = theme === 'light';
  document.documentElement.setAttribute('data-theme', theme);

  const label = isLight ? 'Alternar para tema escuro' : 'Alternar para tema claro';
  const title = isLight ? 'Tema Escuro' : 'Tema Claro';

  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', label);
    themeToggleBtn.setAttribute('title', title);
  }

  if (themeTooltip) {
    themeTooltip.textContent = title;
  }

  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isLight ? '#f8fafc' : '#090a10');
  }
}

function toggleTheme(event) {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Coordenadas para o centro da expansão radial a partir do botão flutuante no canto inferior direito
  let x = window.innerWidth - 50;
  let y = window.innerHeight - 50;
  if (event && typeof event.clientX === 'number' && event.clientX > 0) {
    x = event.clientX;
    y = event.clientY;
  } else if (event && event.currentTarget) {
    const rect = event.currentTarget.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  } else if (themeToggleBtn) {
    const rect = themeToggleBtn.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  }

  // Imediata persistência de estado
  localStorage.setItem('rcm_theme', newTheme);

  // Verifica se o navegador suporta a View Transitions API nativa
  const supportsViewTransition =
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (supportsViewTransition) {
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    try {
      const transition = document.startViewTransition(() => {
        updateThemeUI(newTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 520,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      }).catch(() => {
        updateThemeUI(newTheme);
      });
    } catch (e) {
      updateThemeUI(newTheme);
    }
  } else {
    // Fallback com ondulação circular dinâmica + transição suave
    const ripple = document.createElement('div');
    ripple.className = 'theme-switch-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.background = newTheme === 'light' ? '#f8fafc' : '#090a10';
    document.body.appendChild(ripple);

    document.body.classList.add('theme-transitioning');
    updateThemeUI(newTheme);

    setTimeout(() => {
      ripple.remove();
      document.body.classList.remove('theme-transitioning');
    }, 650);
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// Sincroniza estado inicial conforme persistência do usuário
updateThemeUI(getStoredTheme());

