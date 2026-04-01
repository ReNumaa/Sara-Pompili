/* ============================================
   MINI MONDI — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ---------- Fade in on scroll ---------- */
  const fadeElements = document.querySelectorAll(
    '.category__header, .section-header, ' +
    '.personalizzazione__inner, .chi-sono__inner, ' +
    '.missione__text, .pillar'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  // Gather all animated elements (fade-in, fade-in-stagger, fade-in-left, fade-in-right, fade-in-scale)
  const allAnimated = document.querySelectorAll(
    '.fade-in, .fade-in-stagger, .fade-in-left, .fade-in-right, .fade-in-scale'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  allAnimated.forEach(el => observer.observe(el));

  /* ---------- Hero video: unmute on play & fullscreen ---------- */
  const heroVideo = document.querySelector('.hero__video');
  const fullscreenBtn = document.querySelector('.hero__video-fullscreen');

  if (heroVideo) {
    // Unmute on first user interaction with the page
    function unmuteVideo() {
      heroVideo.muted = false;
      document.removeEventListener('click', unmuteVideo);
      document.removeEventListener('scroll', unmuteVideo);
      document.removeEventListener('touchstart', unmuteVideo);
    }
    document.addEventListener('click', unmuteVideo, { once: true });
    document.addEventListener('scroll', unmuteVideo, { once: true });
    document.addEventListener('touchstart', unmuteVideo, { once: true });
  }

  if (fullscreenBtn && heroVideo) {
    fullscreenBtn.addEventListener('click', () => {
      heroVideo.muted = false;
      if (heroVideo.requestFullscreen) {
        heroVideo.requestFullscreen();
      } else if (heroVideo.webkitEnterFullscreen) {
        heroVideo.webkitEnterFullscreen();
      } else if (heroVideo.webkitRequestFullscreen) {
        heroVideo.webkitRequestFullscreen();
      }
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

});
