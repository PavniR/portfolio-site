document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================
   Nav: transparent -> blurred on scroll, mobile toggle
   ============================================ */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

const onScroll = () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('is-open');
  navLinks.classList.toggle('is-open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navToggle.classList.remove('is-open');
    navLinks.classList.remove('is-open');
  })
);

/* ============================================
   Hero: sequential typing
   1. "Hi, I'm Pavni"
   2. designation (types once, then loops through titles)
   3. tagline (types once, stays)
   4. buttons + socials fade in
   ============================================ */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const greetingEl = document.getElementById('typeGreeting');
const roleEl = document.getElementById('typeRole');
const taglineEl = document.getElementById('typeTagline');
const actionsEl = document.getElementById('heroActions');

const GREETING = "Hi, I'm Pavni";
const ROLES = [
  "Data and Business Analyst",
  "Analytics & Automation",
  "Problem Solver"
];
const TAGLINE = "Turning business data into decisions through analytics, automation, dashboards, and predictive modelling.";

function typeInto(el, text, speed = 45) {
  return new Promise(resolve => {
    let i = 0;
    const cursor = el.querySelector('.cursor');
    const tick = () => {
      const chunk = text.slice(0, i);
      el.textContent = chunk;
      if (cursor) el.appendChild(cursor);
      i++;
      if (i <= text.length) {
        setTimeout(tick, speed);
      } else {
        resolve();
      }
    };
    tick();
  });
}

function eraseFrom(el, text, speed = 30) {
  return new Promise(resolve => {
    let i = text.length;
    const tick = () => {
      el.textContent = text.slice(0, i);
      i--;
      if (i >= 0) {
        setTimeout(tick, speed);
      } else {
        resolve();
      }
    };
    tick();
  });
}

async function loopRoles() {
  let idx = 0;
  // first pass already typed by runIntroSequence; start loop from idx 1
  while (true) {
    await new Promise(r => setTimeout(r, 1600));
    idx = (idx + 1) % ROLES.length;
    await eraseFrom(roleEl, ROLES[(idx - 1 + ROLES.length) % ROLES.length], 22);
    await typeInto(roleEl, ROLES[idx], 40);
  }
}

async function runIntroSequence() {
  if (reduceMotion) {
    greetingEl.textContent = GREETING;
    roleEl.textContent = ROLES[0];
    taglineEl.textContent = TAGLINE;
    actionsEl.classList.add('is-visible');
    return;
  }

  // cursor lives on greeting first
  const cursor = greetingEl.querySelector('.cursor');
  await typeInto(greetingEl, GREETING, 55);
  await new Promise(r => setTimeout(r, 350));

  // move cursor to role line
  roleEl.appendChild(cursor);
  await typeInto(roleEl, ROLES[0], 45);
  await new Promise(r => setTimeout(r, 500));

  // move cursor to tagline
  taglineEl.appendChild(cursor);
  await typeInto(taglineEl, TAGLINE, 16);
  cursor.remove();

  await new Promise(r => setTimeout(r, 250));
  actionsEl.classList.add('is-visible');

  // after the one-time sequence completes, gently cycle remaining role titles
  loopRoles();
}

runIntroSequence();

/* ============================================
   Scroll reveals
   ============================================ */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ============================================
   Animated stat counters
   ============================================ */
const counters = document.querySelectorAll('.stat-card__num');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.round(target / 40));
    const tick = () => {
      current = Math.min(target, current + step);
      el.textContent = current;
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterIO.observe(el));
