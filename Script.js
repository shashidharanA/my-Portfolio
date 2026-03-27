/* ============================
   PORTFOLIO SCRIPT
   ============================ */

// ---- GRID CANVAS ----
(function initGrid() {
  const canvas = document.getElementById('grid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, cols, rows;
  const CELL = 60;
  const COLOR = 'rgba(56,189,248,';

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.ceil(W / CELL) + 1;
    rows = Math.ceil(H / CELL) + 1;
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = COLOR + '0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, H);
      ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * CELL);
      ctx.lineTo(W, j * CELL);
      ctx.stroke();
    }
    // Highlight dot intersections near corners
    ctx.fillStyle = COLOR + '0.25)';
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const dx = i * CELL - W / 2;
        const dy = j * CELL - H / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > W * 0.6) continue;
        const opacity = 0.15 - (dist / (W * 0.6)) * 0.14;
        ctx.fillStyle = COLOR + opacity + ')';
        ctx.beginPath();
        ctx.arc(i * CELL, j * CELL, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  window.addEventListener('resize', resize);
  resize();
})();


// ---- NAVBAR SCROLL STATE ----
(function initNav() {
  const navbar = document.getElementById('navbar');
  function update() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


// ---- HAMBURGER MOBILE MENU ----
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  // Create mobile menu dynamically
  const menu = document.createElement('nav');
  menu.className = 'mobile-menu';
  const links = [
    ['#about', 'About'],
    ['#skills', 'Skills'],
    ['#projects', 'Projects'],
    ['#learning', 'Learning'],
    ['#contact', 'Contact'],
  ];
  links.forEach(([href, label]) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    a.addEventListener('click', close);
    menu.appendChild(a);
  });
  document.body.appendChild(menu);

  function open() {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
    // Animate spans to X
    const spans = btn.querySelectorAll('span');
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  }
  function close() {
    menu.classList.remove('open');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
    const spans = btn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  btn.addEventListener('click', () => {
    menu.classList.contains('open') ? close() : open();
  });
})();


// ---- SCROLL REVEAL ----
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger children within the same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(idx * 80, 300));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  els.forEach(el => observer.observe(el));
})();


// ---- HERO STAGGER ON LOAD ----
(function initHeroReveal() {
  const heroEls = document.querySelectorAll('#hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
  });
})();


// ---- SMOOTH ACTIVE NAV LINK ----
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActive() {
    const scroll = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scroll >= top && scroll < bottom) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + section.id);
        });
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();


// ---- CONTACT FORM ----
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const span = btn.querySelector('span');
    const originalText = span.textContent;

    btn.disabled = true;
    span.textContent = 'Sending…';

    setTimeout(() => {
      span.textContent = 'Message sent!';
      btn.style.background = '#10b981';
      form.reset();
      setTimeout(() => {
        span.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 1200);
  });
})();


// ---- PARALLAX ORBS ----
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        orbs[0] && (orbs[0].style.transform = `translateY(${sy * 0.12}px)`);
        orbs[1] && (orbs[1].style.transform = `translateY(${sy * -0.08}px)`);
        orbs[2] && (orbs[2].style.transform = `translateY(${sy * 0.06}px)`);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


// ---- PROJECT CARD 3D TILT ----
(function initTilt() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      card.style.transform = `translateY(-6px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();