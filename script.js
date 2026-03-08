/* ──────────────────────────────────────────────────────────────
   KOYTECH — Premium Interactions v2
────────────────────────────────────────────────────────────── */

/* ─── CURSOR ───────────────────────────────────────────────── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  document.querySelectorAll('[data-cursor="hover"], a, button, .tilt-card, .sys-feature').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ─── SCROLL PROGRESS ──────────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ─── NAVBAR ───────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ─── ACTIVE NAV ───────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sectionObs.observe(s));

/* ─── HERO CANVAS — PARTICLE FIELD ────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  const GOLD = 'rgba(212,175,55,';
  const COUNT = 60;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.r  = Math.random() * 1.5 + 0.5;
      this.a  = Math.random() * 0.4 + 0.05;
      this.life = Math.random() * 200 + 100;
      this.age  = 0;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.age++;
      if (this.age > this.life || this.y < -10) this.reset(false);
    }
    draw() {
      const alpha = this.a * Math.sin((this.age / this.life) * Math.PI);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = GOLD + alpha + ')';
      ctx.fill();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = GOLD + (0.06 * (1 - dist/100)) + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();

/* ─── TYPEWRITER ───────────────────────────────────────────── */
(function () {
  const el    = document.getElementById('typewriter');
  if (!el) return;
  const words = ['ideias', 'sistemas', 'negócios', 'soluções'];
  let wi = 0, ci = 0, deleting = false, waiting = false;

  function type() {
    const word = words[wi];

    if (waiting) { waiting = false; return setTimeout(type, 1600); }

    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; waiting = true; return setTimeout(type, 80); }
      setTimeout(type, 90);
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
      setTimeout(type, 55);
    }
  }
  setTimeout(type, 1000);
})();

/* ─── SCROLL ANIMATIONS ────────────────────────────────────── */
const animObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      animObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => animObs.observe(el));

/* ─── COUNTER ANIMATION ────────────────────────────────────── */
function animateCount(el, target, duration = 1600) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-number[data-count]');
      nums.forEach(n => animateCount(n, +n.dataset.count));
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) counterObs.observe(statsSection);

/* ─── TIMELINE ANIMATION ───────────────────────────────────── */
const timelineObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.getElementById('timeline-line')?.classList.add('animated');
      timelineObs.disconnect();
    }
  });
}, { threshold: 0.3 });

const processSection = document.querySelector('.process');
if (processSection) timelineObs.observe(processSection);

/* ─── 3D TILT CARDS ────────────────────────────────────────── */
document.querySelectorAll('.tilt-card').forEach(card => {
  const MAX = 8;

  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateY(${dx * MAX}deg) rotateX(${-dy * MAX}deg) translateZ(4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

/* ─── CHART BAR ANIMATION ──────────────────────────────────── */
const chartObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sc-bar').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.opacity = '1';
          bar.style.transform = 'scaleY(1)';
        }, i * 80);
      });
      chartObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const chart = document.querySelector('.sc-chart');
if (chart) {
  chart.querySelectorAll('.sc-bar').forEach(b => {
    b.style.transform = 'scaleY(0)';
    b.style.transformOrigin = 'bottom';
    b.style.opacity = '0';
    b.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s';
  });
  chartObs.observe(chart);
}

/* ─── CONTACT FORM ─────────────────────────────────────────── */
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const successMsg = document.getElementById('form-success');
const errorMsg   = document.getElementById('form-error');

form?.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoad = submitBtn.querySelector('.btn-loading');

  submitBtn.disabled = true;
  btnText.hidden = true;
  btnLoad.hidden = false;
  errorMsg.hidden = true;

  try {
    const res  = await fetch(form.dataset.endpoint, {
      method: 'POST',
      body: new FormData(form)
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      successMsg.hidden = false;
      form.reset();
      setTimeout(() => { successMsg.hidden = true; }, 6000);
    } else {
      errorMsg.textContent = data.error || 'Erro ao enviar. Tente pelo WhatsApp.';
      errorMsg.hidden = false;
    }
  } catch {
    errorMsg.textContent = 'Sem conexão. Tente pelo WhatsApp.';
    errorMsg.hidden = false;
  } finally {
    submitBtn.disabled = false;
    btnText.hidden = false;
    btnLoad.hidden = true;
  }
});

/* ─── MAGNETIC BUTTONS ─────────────────────────────────────── */
document.querySelectorAll('.btn--primary.btn--glow').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    btn.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s';
    setTimeout(() => { btn.style.transition = ''; }, 500);
  });
});

/* ─── LGPD — COOKIE CONSENT ────────────────────────────────── */
(function () {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  if (!localStorage.getItem('koytech_cookies')) {
    setTimeout(() => { banner.hidden = false; }, 1500);
  }

  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem('koytech_cookies', 'accepted');
    banner.hidden = true;
  });

  document.getElementById('cookie-decline').addEventListener('click', () => {
    localStorage.setItem('koytech_cookies', 'essential');
    banner.hidden = true;
  });
})();
