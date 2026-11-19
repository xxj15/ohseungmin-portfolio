/**
 * 숫자 카운트업: [data-countup]이 절반 보이면 1회, 0 → 최종값 900ms ease-out.
 * 최종값 텍스트(.final)는 처음부터 DOM에 있고 바뀌지 않는다. 움직이는 숫자는 aria-hidden 레이어에만 쓴다.
 */
import { prefersReducedMotion } from './motion';

const DURATION_MS = 900;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function format(value: number, el: HTMLElement): string {
  const decimals = Number(el.dataset.countupDecimals ?? 0);
  const comma = el.dataset.countupComma === 'true';
  const text = comma
    ? value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toFixed(decimals);
  return `${el.dataset.countupPrefix ?? ''}${text}`;
}

function done(el: HTMLElement, layer: HTMLElement): void {
  el.classList.remove('is-counting');
  layer.textContent = '';
  el.dataset.countupDone = 'true';
}

function run(el: HTMLElement): void {
  const layer = el.querySelector<HTMLElement>('[aria-hidden="true"]');
  const target = Number(el.dataset.countupValue);
  if (!layer || !Number.isFinite(target)) return;
  el.classList.add('is-counting');
  const start = performance.now();
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION_MS);
    layer.textContent = format(target * easeOutCubic(t), el);
    if (t < 1) requestAnimationFrame(frame);
    else done(el, layer);
  };
  requestAnimationFrame(frame);
}

function init(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-countup]'));
  if (items.length === 0) return;
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => (el.dataset.countupDone = 'true'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        run(entry.target as HTMLElement);
      }
    },
    { threshold: 0.5 },
  );
  items.forEach((el) => observer.observe(el));
}

try {
  init();
} catch (error) {
  console.error('[countup]', error);
}

export {};
