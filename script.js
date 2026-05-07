/* ================================================
   FÊTE ÉCOLE SAINT-CLAUDE — script.js
================================================ */

/* ---- Confetti ---- */
(function createConfetti() {
  const container = document.getElementById('confetti');
  if (!container) return;

  const COLORS  = ['#C8102E', '#FFFFFF', '#F2C230', '#FF6B6B', '#FFF0F2', '#E01535'];
  const COUNT   = 20;

  for (let i = 0; i < COUNT; i++) {
    const el       = document.createElement('div');
    const color    = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size     = Math.random() * 9 + 5;
    const isCircle = Math.random() > 0.55;
    const left     = Math.random() * 100;
    const delay    = Math.random() * 6;
    const duration = Math.random() * 5 + 5;
    const aspect   = isCircle ? 1 : 0.4 + Math.random() * 0.4;

    el.classList.add('confetto');
    el.style.cssText = [
      `background:${color}`,
      `width:${size}px`,
      `height:${Math.round(size * aspect)}px`,
      `left:${left}%`,
      `border-radius:${isCircle ? '50%' : '2px'}`,
      `animation-delay:${delay}s`,
      `animation-duration:${duration}s`,
    ].join(';');

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

/* ---- Fanions : vitesse de sway aléatoire ---- */
(function randomizeSway() {
  document.querySelectorAll('.fanion').forEach((el) => {
    const dur = (2 + Math.random() * 2).toFixed(2);
    el.style.animationDuration = `${dur}s`;
  });
})();
