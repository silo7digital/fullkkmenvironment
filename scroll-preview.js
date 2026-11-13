const sequence = document.querySelector('.hero-sequence');
const hero = sequence.querySelector('.hero');
const checker = document.querySelector('.watch-transition');
const thumbnail = document.querySelector('#watch .feature-video .media-placeholder');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const narrow = matchMedia('(max-width: 850px)');
const clamp = value => Math.max(0, Math.min(1, value));
let frame;

function renderScroll() {
  frame = undefined;
  document.documentElement.classList.toggle('scroll-preview', !reduceMotion.matches);
  if (reduceMotion.matches) return;

  const height = window.innerHeight;
  const heroScroll = -sequence.getBoundingClientRect().top;
  const heroHeight = hero.offsetHeight;
  const zoomProgress = clamp(heroScroll / heroHeight);
  const textTravel = Math.max(0, heroScroll);
  const fade = clamp((zoomProgress - 0.34) / 0.58);
  const checkerProgress = clamp(1 - checker.getBoundingClientRect().top / height);
  const videoTop = thumbnail.isConnected ? thumbnail.parentElement.closest('.feature-grid').getBoundingClientRect().top : 0;
  const videoProgress = clamp((height * 0.96 - videoTop) / (height * 0.31));

  hero.style.setProperty('--hero-scale', 1 + zoomProgress * (narrow.matches ? 0.12 : 0.24));
  hero.style.setProperty('--hero-offset', textTravel * 0.48 + 'px');
  hero.style.setProperty('--hero-alpha', 1 - fade);
  hero.style.setProperty('--hero-pointer', fade === 1 ? 'none' : 'auto');
  checker.style.setProperty('--checker-progress', checkerProgress);
  thumbnail.style.setProperty('--video-crop', (1 - videoProgress) * (narrow.matches ? 32 : 64) + '%');
  thumbnail.style.setProperty('--video-rise', (1 - videoProgress) * (narrow.matches ? 20 : 56) + 'px');
}

function requestScrollFrame() {
  if (frame === undefined) frame = requestAnimationFrame(renderScroll);
}

renderScroll();
window.addEventListener('scroll', requestScrollFrame, { passive: true });
window.addEventListener('resize', requestScrollFrame);
window.addEventListener('pageshow', requestScrollFrame);
reduceMotion.addEventListener('change', requestScrollFrame);
