function abrirCarta() {
  const audio = document.getElementById('player');
  const screen = document.getElementById('envelope-screen');

  screen.classList.add('hide');

  audio.play().catch(() => {});

  setTimeout(() => {
    screen.style.display = 'none';
    playing = true;
    document.getElementById('play-ico').innerHTML =
      '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    document.getElementById('waves').classList.remove('paused');
  }, 800);
}

const START = new Date('2024-11-15T00:00:00');

  function updateCounter() {
    const diff = Date.now() - START.getTime();
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cnt-d').textContent = String(d).padStart(3, '0');
    document.getElementById('cnt-h').textContent = String(h).padStart(2, '0');
    document.getElementById('cnt-m').textContent = String(m).padStart(2, '0');
    document.getElementById('cnt-s').textContent = String(s).padStart(2, '0');
  }
  updateCounter();
  setInterval(updateCounter, 1000);

  // ── Typewriter ───────────────────────────────────────────────────────
  // PERSONALIZE: troque o texto abaixo pela mensagem que você quer enviar!
  const mensagem =
    "Maria Eduarda, desde o dia 15 de novembro você transformou o meu mundo. " +
    "Você tem esse jeito único de tornar tudo mais leve, mais bonito, mais cheio de sentido. " +
    "Cada risada sua, cada mensagem de bom dia, cada momento simples ao seu lado — eu guardo tudo. " +
    "Você é minha estrela da manhã: aparece e ilumina tudo ao redor. " +
    "Feliz Dia dos Namorados, meu amor. Obrigado por existir na minha vida. ♡";

  let i = 0;
  const el = document.getElementById('tw-text');

  function type() {
    if (i < mensagem.length) {
      el.textContent += mensagem[i++];
      setTimeout(type, 35 + Math.random() * 25);
    }
  }

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { setTimeout(type, 400); observer.disconnect(); }
  }, { threshold: 0.3 });
  observer.observe(document.getElementById('mensagem'));

  // ── Música (toggle visual) ────────────────────────────────────────────
  let playing = false;

  function toggleMusic() {
  const audio = document.getElementById('player');
  playing = !playing;

  const ico   = document.getElementById('play-ico');
  const waves = document.getElementById('waves');

  if (playing) {
    audio.play();
    ico.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    waves.classList.remove('paused');
    spawnHearts();
  } else {
    audio.pause();
    ico.innerHTML = '<polygon points="5,3 19,12 5,21"/>';
    waves.classList.add('paused');
  }
}

  // ── Corações flutuantes ───────────────────────────────────────────────
  function spawnHearts() {
    const chars = ['♡', '♥', '❤', '♡'];
    chars.forEach((h, idx) => {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'heart-float';
        el.textContent = h;
        el.style.left = (10 + Math.random() * 80) + '%';
        el.style.bottom = '10%';
        el.style.color = ['#e8a0b4','#c2607a','#9b1c3c','#f0b8cb'][idx];
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3600);
      }, idx * 180);
    });
  }

  // ── Corações flutuantes no hero (canvas) ──────────────────────────────
  const canvas = document.getElementById('petals');
  const ctx = canvas.getContext('2d');
  let hearts = [];

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  for (let j = 0; j < 22; j++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height,
      vy: -(0.3 + Math.random() * 0.5),
      size: 7 + Math.random() * 14,
      alpha: 0.1 + Math.random() * 0.25,
      rot: (Math.random() - .5) * .5
    });
  }

  function drawHeart(ctx, x, y, s, a) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = '#e8a0b4';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - s * .35, x - s * .5, y - s * .6, x - s * .5, y - s * .25);
    ctx.bezierCurveTo(x - s * .5, y + s * .1, x, y + s * .4, x, y + s * .55);
    ctx.bezierCurveTo(x, y + s * .4, x + s * .5, y + s * .1, x + s * .5, y - s * .25);
    ctx.bezierCurveTo(x + s * .5, y - s * .6, x, y - s * .35, x, y);
    ctx.fill();
    ctx.restore();
  }

  function animHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
      h.y += h.vy;
      if (h.y < -30) h.y = canvas.height + 20;
      drawHeart(ctx, h.x, h.y, h.size, h.alpha);
    });
    requestAnimationFrame(animHearts);
  }
  animHearts();

  // ── Aparição suave das seções ──────────────────────────────────────────
  const fadeEls = document.querySelectorAll('section');
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    fadeObs.observe(el);
  });