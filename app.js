/**
 * KARA NO KYOUKAI RACING TEAM - Official Web Prototype JS
 * Machine Code: RSMX135
 * Powered by Lenis Smooth Scroll, GSAP 3, and ScrollTrigger
 * Features:
 * - Ultra-Smooth Momentum Scrolling (Lenis)
 * - Cinematic GSAP ScrollTrigger Entrance Animations
 * - 3D Magnetic Card Tilt Motion & Shimmer
 * - Dynamic Gallery Filtering & Responsive Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Lenis Smooth Scroll Initialization
  // =========================================================================
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Smooth Anchor Navigation via Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -70, duration: 1.3 });
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // =========================================================================
  // 2. Sticky Navbar on Scroll
  // =========================================================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // =========================================================================
  // 3. GSAP & ScrollTrigger Animations
  // =========================================================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.hero-badge', { opacity: 0, y: -25, duration: 0.8, delay: 0.2 })
      .from('.hero-jp-kanji', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
      .from('.hero-main-title', { opacity: 0, y: 35, duration: 0.9 }, '-=0.5')
      .from('.hero-sub-title', { opacity: 0, y: 25, duration: 0.7 }, '-=0.6')
      .from('.hero-desc', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
      .from('.hero-ctas .btn', { opacity: 0, y: 20, stagger: 0.15, duration: 0.7 }, '-=0.5')
      .from('.hero-stats .stat-box', { opacity: 0, y: 20, stagger: 0.1, duration: 0.7 }, '-=0.4')
      .from('.hero-showcase-frame', { opacity: 0, scale: 0.92, x: 40, duration: 1.1, ease: 'power3.out' }, '-=1');

    // Section Headers Reveal
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 35,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out'
      });
    });

    // Pilot Card & Stats Reveal
    gsap.from('.pilot-visual', {
      scrollTrigger: {
        trigger: '.pilot-card-wrapper',
        start: 'top 82%',
      },
      opacity: 0,
      x: -40,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.pilot-info-panel', {
      scrollTrigger: {
        trigger: '.pilot-card-wrapper',
        start: 'top 82%',
      },
      opacity: 0,
      x: 40,
      duration: 1,
      ease: 'power3.out'
    });

    // Animate Driver Stats Bars on scroll
    ScrollTrigger.create({
      trigger: '.driver-stats-matrix',
      start: 'top 85%',
      onEnter: () => {
        document.querySelectorAll('.matrix-bar .fill').forEach(bar => {
          const targetWidth = bar.style.width || '95%';
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 100);
        });
      }
    });

    // Machine Cards Staggered Entrance
    gsap.from('.machine-card', {
      scrollTrigger: {
        trigger: '.machine-grid',
        start: 'top 82%',
      },
      opacity: 0,
      y: 50,
      stagger: 0.16,
      duration: 0.9,
      ease: 'power3.out'
    });

    // Machine Backdrop Text & Studio Showcase Entrance
    gsap.from('.machine-backdrop-text', {
      scrollTrigger: {
        trigger: '.machine-showcase-visual',
        start: 'top 80%',
      },
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 1.1,
      ease: 'power3.out'
    });

    gsap.from('.showcase-rbr-sidebar', {
      scrollTrigger: {
        trigger: '.machine-showcase-visual',
        start: 'top 80%',
      },
      opacity: 0,
      x: 35,
      duration: 0.9,
      delay: 0.2,
      ease: 'power3.out'
    });

    // Partner Cards Staggered Entrance
    gsap.from('.partner-card', {
      scrollTrigger: {
        trigger: '.partners-grid',
        start: 'top 82%',
      },
      opacity: 0,
      y: 40,
      scale: 0.96,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Gallery Cards Staggered Entrance
    gsap.from('.gallery-card', {
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 85%',
      },
      opacity: 0,
      y: 45,
      stagger: 0.1,
      duration: 0.85,
      ease: 'power3.out'
    });

    // Calendar Rows Staggered Entrance
    gsap.from('.race-row', {
      scrollTrigger: {
        trigger: '.calendar-list',
        start: 'top 85%',
      },
      opacity: 0,
      x: -35,
      stagger: 0.14,
      duration: 0.8,
      ease: 'power3.out'
    });

    // =========================================================================
    // 4. Interactive 3D Card Hover Tilt Motion
    // =========================================================================
    const tiltElements = document.querySelectorAll(
      '.gallery-card, .machine-card, .partner-card, .hero-showcase-frame'
    );

    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = (y / (rect.height / 2)) * -6;
        const rotY = (x / (rect.width / 2)) * 6;

        gsap.to(el, {
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      });
    });
  }

  // =========================================================================
  // 5. Gallery Filtering
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          if (typeof gsap !== 'undefined') {
            gsap.to(card, { opacity: 1, scale: 1, y: 0, duration: 0.4 });
          } else {
            card.style.opacity = '1';
          }
        } else {
          if (typeof gsap !== 'undefined') {
            gsap.to(card, {
              opacity: 0,
              scale: 0.94,
              y: 20,
              duration: 0.3,
              onComplete: () => {
                card.style.display = 'none';
              }
            });
          } else {
            card.style.display = 'none';
          }
        }
      });

      // Refresh ScrollTrigger calculations after filter layout shift
      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 350);
      }
    });
  });

  // =========================================================================
  // 6. Lightbox Modal with Lenis Pausing
  // =========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDate = document.getElementById('lightboxDate');
  const lightboxRes = document.getElementById('lightboxRes');
  const lightboxDownload = document.getElementById('lightboxDownload');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentImageIndex = 0;
  const visibleCardsList = () => Array.from(galleryCards).filter(c => c.style.display !== 'none');

  function openLightbox(card, index) {
    currentImageIndex = index;
    const src = card.getAttribute('data-src');
    const title = card.getAttribute('data-title');
    const date = card.getAttribute('data-date');
    const res = card.getAttribute('data-res');

    lightboxImg.src = src;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxDate.textContent = date;
    lightboxRes.textContent = `Native Resolution: ${res}`;
    lightboxDownload.href = src;
    lightboxDownload.setAttribute('download', src);

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  function showNextImage() {
    const activeCards = visibleCardsList();
    if (activeCards.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % activeCards.length;
    const nextCard = activeCards[currentImageIndex];
    openLightbox(nextCard, currentImageIndex);
  }

  galleryCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      const activeCards = visibleCardsList();
      const currentIdx = activeCards.indexOf(card);
      openLightbox(card, currentIdx !== -1 ? currentIdx : idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

  // Keyboard controls (Esc to close, ArrowRight or Space for next)
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      showNextImage();
    }
  });

  // Active link indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });
});
