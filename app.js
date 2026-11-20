/**
 * KARA NO KYOUKAI RACING TEAM - Official Web Prototype JS
 * Machine Code: RSMX135
 * Features:
 * - Dynamic Gallery Filtering (All, Track & Circuit, Paddock & Meet, Livery & Branding)
 * - Lightbox Modal with Next/Previous & Keyboard navigation
 * - Sticky Navbar & Mobile Hamburger Menu
 * - Interactive Telemetry & Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // 3. Gallery Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. Lightbox Modal
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
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
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
