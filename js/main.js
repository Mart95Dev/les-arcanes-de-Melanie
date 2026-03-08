/* ============================================
   Main JS — Les Arcanes de Mélanie
   Navigation mobile, animations scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initActiveNavLink();
});

/* ============================================
   Menu Mobile Toggle
   ============================================ */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('mobile-menu--open');
    hamburger.classList.toggle('hamburger--active');
    mobileMenu.classList.toggle('mobile-menu--open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
    hamburger.setAttribute('aria-expanded', !isOpen);
  });

  // Fermer le menu quand on clique sur un lien
  const menuLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('hamburger--active');
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Fermer avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--open')) {
      hamburger.classList.remove('hamburger--active');
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });
}

/* ============================================
   Scroll Reveal (IntersectionObserver)
   ============================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ============================================
   Smooth Scroll pour les ancres
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* ============================================
   Active Nav Link (basé sur le fichier courant)
   ============================================ */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link, .header__nav-link, .mobile-menu__link, .bottom-nav__link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      if (link.classList.contains('nav__link')) {
        link.classList.add('nav__link--active');
      } else if (link.classList.contains('header__nav-link')) {
        link.classList.add('active');
      } else if (link.classList.contains('bottom-nav__link')) {
        link.classList.add('bottom-nav__link--active');
      }
    }
  });
}
