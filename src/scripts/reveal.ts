/**
 * 스크롤 등장 · 차트 그리기
 * - [data-reveal]: 화면 아래 15% 선에 닿으면 1회, 아래에서 16px 떠오르며 나타남(480ms). 같은 부모의 형제는 60ms 간격(최대 4).
 * - [data-chart]: 보이면 막대가 자라고 선이 그려진다(CSS가 담당, 이 스크립트는 클래스만 바꾼다).
 * - 숨김 클래스는 이 스크립트가 붙인다 → 스크립트가 실패하면 아무것도 숨지 않는다.
 * - 처음 화면에 이미 보이는 요소는 건드리지 않는다. 동작 줄이기 설정이면 아무것도 하지 않는다.
 */
import { prefersReducedMotion } from './motion';

const KINDS = [
  { selector: '[data-reveal]', pending: 'reveal-pending', active: 'is-revealing', duration: 480 },
  { selector: '[data-chart]', pending: 'chart-pending', active: 'is-drawing', duration: 1400 },
] as const;
const STAGGER_MS = 60;
const MAX_STAGGER_INDEX = 3;

function init(): void {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  for (const kind of KINDS) {
    const pending = Array.from(document.querySelectorAll<HTMLElement>(kind.selector)).filter(
      (el) => el.getBoundingClientRect().top >= viewportHeight * 0.85,
    );
    if (pending.length === 0) continue;
    pending.forEach((el) => el.classList.add(kind.pending));

    const finish = (el: HTMLElement) => {
      el.classList.remove(kind.pending, kind.active);
      el.style.removeProperty('--reveal-delay');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        const index = new Map<Element | null, number>();
        for (const el of visible) {
          observer.unobserve(el);
          const i = index.get(el.parentElement) ?? 0;
          index.set(el.parentElement, i + 1);
          const delay = Math.min(i, MAX_STAGGER_INDEX) * STAGGER_MS;
          el.style.setProperty('--reveal-delay', `${delay}ms`);
          el.classList.add(kind.active);
          // 클래스 추가와 제거를 다른 프레임에 둬야 전환이 일어난다
          requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove(kind.pending)));
          window.setTimeout(() => finish(el), kind.duration + delay + 100);
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    pending.forEach((el) => observer.observe(el));
    // 인쇄할 때는 전부 보이게
    window.addEventListener('beforeprint', () => pending.forEach(finish), { once: true });
  }
}

try {
  init();
} catch (error) {
  document.querySelectorAll('.reveal-pending, .chart-pending').forEach((el) => el.classList.remove('reveal-pending', 'chart-pending'));
  console.error('[reveal]', error);
}

export {};
