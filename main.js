// ─────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// Hero fires immediately on load
setTimeout(() => {
  document.querySelectorAll('#hero .rv').forEach((el, i) => {
    setTimeout(() => el.classList.add('on'), i * 160);
  });
}, 80);

// ─────────────────────────────────────
// SMOOTH SCROLL WITH EASING
// ─────────────────────────────────────
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function smoothScrollTo(targetY, duration = 800) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuad(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('.nav').offsetHeight;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navH;
    smoothScrollTo(targetY, 800);
  });
});
