(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ---------- Nav background on scroll ---------- */
  var nav = document.getElementById('nav');
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  /* ---------- Back to top button ---------- */
  var toTop = document.getElementById('toTop');
  function updateToTop() {
    toTop.classList.toggle('visible', window.scrollY > 600);
  }
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main .section, .hero'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link[href^="#"]'));

  function updateActiveLink() {
    var scrollPos = window.scrollY + window.innerHeight * 0.35;
    var currentId = sections.length ? sections[0].id : null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateProgress();
        updateNav();
        updateToTop();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinksEl = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    var open = navLinksEl.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinksEl.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinksEl.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Reveal-on-scroll + skill bar animation ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
    document.querySelectorAll('.skill-fill').forEach(function (el) { el.classList.add('animate'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);

          var bars = entry.target.querySelectorAll('.skill-fill');
          bars.forEach(function (bar) { bar.classList.add('animate'); });
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Typewriter hero subtitle ---------- */
  var typedEl = document.getElementById('typed');
  var phrases = [
    'Data Scientist in the making.',
    'ML · NLP · Optimization.',
    'Building things that learn.'
  ];

  function typewriter() {
    if (reduceMotion) {
      typedEl.textContent = phrases[0];
      return;
    }

    var phraseIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(tick, deleting ? 35 : 55);
    }

    tick();
  }

  typewriter();

  /* ---------- Hero parallax glow (subtle) ---------- */
  if (!reduceMotion) {
    var glow1 = document.querySelector('.glow-1');
    var glow2 = document.querySelector('.glow-2');
    var hero = document.querySelector('.hero');

    window.addEventListener('scroll', function () {
      if (!hero) return;
      var rect = hero.getBoundingClientRect();
      if (rect.bottom < 0) return;
      var offset = window.scrollY * 0.15;
      if (glow1) glow1.style.transform = 'translateY(' + offset + 'px)';
      if (glow2) glow2.style.transform = 'translateY(' + (-offset) + 'px)';
    }, { passive: true });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
