/* ================================================
   FÊTE ÉCOLE SAINT-CLAUDE — script.js
================================================ */

/* ---- Confetti féria ---- */
(function createConfetti() {
  const container = document.getElementById('confetti');
  if (!container) return;

  const COLORS = ['#C8102E','#FFFFFF','#F2C230','#FFD700','#E01535','#FF8FA0','#FFF0F2','#9B0B23','#fff'];
  const ANIMS  = ['confetto-fall','confetto-fall-left','confetto-fall-right','confetto-drift'];
  const COUNT  = 68;

  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  for (let i = 0; i < COUNT; i++) {
    const el    = document.createElement('div');
    const color = pick(COLORS);
    const anim  = pick(ANIMS);
    const delay = rand(-10, 1);   // délai négatif = déjà en chute dès le chargement
    const dur   = rand(7, 16);
    const left  = rand(-2, 102);

    const roll = Math.random();
    let w, h, br = '2px', clip = '';

    if (roll < 0.22) {
      // Cercle
      const s = rand(5, 14); w = s; h = s; br = '50%';
    } else if (roll < 0.44) {
      // Rectangle plat
      w = rand(8, 18); h = rand(5, 10);
    } else if (roll < 0.62) {
      // Streamer (fin et long, virevolte)
      w = rand(3, 5); h = rand(18, 34); br = '3px';
    } else if (roll < 0.80) {
      // Mini fanion triangle
      const s = rand(9, 16); w = s; h = s; br = '0';
      clip = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    } else {
      // Étoile
      const s = rand(9, 15); w = s; h = s; br = '0';
      clip = 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)';
    }

    el.classList.add('confetto');
    const styles = [
      `background:${color}`,
      `width:${w}px`,
      `height:${h}px`,
      `left:${left}%`,
      `border-radius:${br}`,
      clip ? `clip-path:${clip}` : null,
      `animation:${anim} ${dur}s ${delay}s linear infinite`,
    ].filter(Boolean).join(';');

    el.style.cssText = styles;
    container.appendChild(el);
  }
})();

/* ---- Navigation sticky ---- */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const toggle = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
})();

/* ---- Scroll reveal (IntersectionObserver) ---- */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  items.forEach((el) => observer.observe(el));
})();

/* ---- Smooth scroll pour les ancres internes ---- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ---- Confetti : fondu au scroll ---- */
(function initConfettiFade() {
  const container = document.getElementById('confetti');
  if (!container) return;
  window.addEventListener('scroll', () => {
    const ratio = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
    container.style.opacity = 1 - ratio * ratio;
  }, { passive: true });
})();

/* ---- Menu hamburger mobile ---- */
(function initMobileMenu() {
  const btn    = document.getElementById('nav-hamburger');
  const menu   = document.getElementById('nav-mobile');
  if (!btn || !menu) return;

  function open() {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    menu.classList.contains('is-open') ? close() : open();
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });
})();

/* ---- Fanions : vitesse de sway aléatoire ---- */
(function randomizeSway() {
  document.querySelectorAll('.fanion').forEach((el) => {
    const dur = (2 + Math.random() * 2).toFixed(2);
    el.style.animationDuration = `${dur}s`;
  });
})();
