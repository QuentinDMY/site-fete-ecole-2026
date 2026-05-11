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

/* ---- Quiz Fêtes de Bayonne ---- */
(function initQuiz() {
  const QUESTIONS = [
    {
      q: "À quelle période ont lieu les Fêtes de Bayonne ?",
      answers: ["Fin juin", "Mi-juillet", "Première semaine d'août", "Fin août"],
      correct: 2
    },
    {
      q: "Quel est le cri emblématique des Fêtes de Bayonne ?",
      answers: ["Olé Bayonne !", "Viva Baiona !", "Aupa Baiona !", "Hola Bayonne !"],
      correct: 2
    },
    {
      q: "Quelle est la tenue traditionnelle des Fêtes ?",
      answers: ["Bleu et blanc", "Rouge et noir", "Blanc et vert", "Blanc et rouge"],
      correct: 3
    },
    {
      q: "Comment s'appelle la large ceinture rouge traditionnelle basque ?",
      answers: ["La txapela", "La txingarra", "La txalaparta", "La txakoli"],
      correct: 1
    },
    {
      q: "En quelle année ont été créées les Fêtes de Bayonne ?",
      answers: ["1897", "1921", "1932", "1958"],
      correct: 2
    },
    {
      q: "Combien de jours durent les Fêtes de Bayonne ?",
      answers: ["3 jours", "4 jours", "5 jours", "7 jours"],
      correct: 2
    },
    {
      q: "Comment s'appelle le béret basque traditionnel ?",
      answers: ["Txakoli", "Pilota", "Txapela", "Espadrille"],
      correct: 2
    },
    {
      q: "Comment se porte le foulard traditionnel des Fêtes ?",
      answers: ["Attaché au poignet", "Sur la tête comme un bandana", "Plié en triangle, noué autour du cou", "Dans la poche du pantalon"],
      correct: 2
    }
  ];

  const LEVELS = [
    { min: 0, max: 2, icon: "🎒", title: "Touriste en blanc et rouge", desc: "Bienvenue à Bayonne ! La féria vous attend — venez avec votre foulard rouge !" },
    { min: 3, max: 4, icon: "🥁", title: "Péna débutant", desc: "Vous avez du potentiel ! Encore quelques fêtes et vous chanterez Aupa Baiona comme un vrai !" },
    { min: 5, max: 6, icon: "🎉", title: "Ami des Bayonnais", desc: "Bien joué ! Vous connaissez vos classiques. On vous réserve un foulard rouge !" },
    { min: 7, max: 8, icon: "🌟", title: "Vrai Baionaïs !", desc: "Impressionnant ! Vous êtes une référence des Fêtes. Aupa Baiona — on vous attend le 27 juin !" }
  ];

  const LETTERS = ['A', 'B', 'C', 'D'];

  const fab        = document.getElementById('quiz-fab');
  const overlay    = document.getElementById('quiz-overlay');
  const closeBtn   = document.getElementById('quiz-close');
  const introScr   = document.getElementById('quiz-intro');
  const questionScr= document.getElementById('quiz-question');
  const resultScr  = document.getElementById('quiz-result');
  const startBtn   = document.getElementById('quiz-start');
  const nextBtn    = document.getElementById('quiz-next');
  const retryBtn   = document.getElementById('quiz-retry');
  const qText      = document.getElementById('quiz-q-text');
  const answersWrap= document.getElementById('quiz-answers');
  const progFill   = document.getElementById('quiz-progress-fill');
  const progLabel  = document.getElementById('quiz-progress-label');
  const scoreNum   = document.getElementById('quiz-score-num');
  const levelTitle = document.getElementById('quiz-level-title');
  const levelDesc  = document.getElementById('quiz-level-desc');
  const resultIcon = document.getElementById('quiz-result-icon');
  const shareBtn   = document.getElementById('quiz-share-btn');

  let current = 0;
  let score   = 0;
  let answered = false;

  function openQuiz() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeQuiz() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showScreen(id) {
    [introScr, questionScr, resultScr].forEach(s => {
      s.classList.toggle('quiz-screen--hidden', s.id !== id);
    });
  }

  function loadQuestion() {
    const q = QUESTIONS[current];
    answered = false;
    nextBtn.classList.add('quiz-next-btn--hidden');
    progFill.style.width = `${(current / QUESTIONS.length) * 100}%`;
    progLabel.textContent = `${current + 1} / ${QUESTIONS.length}`;
    qText.textContent = q.q;

    answersWrap.innerHTML = '';
    q.answers.forEach((answer, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-answer';
      btn.innerHTML = `<span class="quiz-answer-letter">${LETTERS[i]}</span><span>${answer}</span>`;
      btn.addEventListener('click', () => selectAnswer(i));
      answersWrap.appendChild(btn);
    });
  }

  function selectAnswer(index) {
    if (answered) return;
    answered = true;

    const q = QUESTIONS[current];
    const buttons = answersWrap.querySelectorAll('.quiz-answer');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct && i !== index) btn.classList.add('is-reveal');
      else if (i === q.correct)           btn.classList.add('is-correct');
      else if (i === index)               btn.classList.add('is-wrong');
    });

    if (index === q.correct) score++;

    nextBtn.textContent = current === QUESTIONS.length - 1 ? 'Voir mon score 🎉' : 'Question suivante →';
    nextBtn.classList.remove('quiz-next-btn--hidden');
  }

  function showResult() {
    progFill.style.width = '100%';
    const level = LEVELS.find(l => score >= l.min && score <= l.max);
    scoreNum.textContent  = score;
    resultIcon.textContent = level.icon;
    levelTitle.textContent = level.title;
    levelDesc.textContent  = level.desc;

    const text = encodeURIComponent(
      `🎉 J'ai scoré ${score}/8 au Quiz Fêtes de Bayonne — "${level.title}" !\n\nEt toi ? Teste-toi ici 👉 https://fete-ecole-saint-claude-2026.vercel.app`
    );
    shareBtn.href = `https://wa.me/?text=${text}`;
    showScreen('quiz-result');
  }

  function startQuiz() {
    current  = 0;
    score    = 0;
    showScreen('quiz-question');
    loadQuestion();
  }

  fab.addEventListener('click', openQuiz);
  closeBtn.addEventListener('click', closeQuiz);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeQuiz(); });
  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', () => {
    current++;
    current < QUESTIONS.length ? loadQuestion() : showResult();
  });
  retryBtn.addEventListener('click', startQuiz);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeQuiz();
  });
})();
