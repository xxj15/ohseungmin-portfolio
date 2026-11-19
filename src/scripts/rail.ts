/** 케이스 레일: ←/→로 카드 한 장씩 이동, 양 끝에서 버튼 비활성. */
export function initRail(root: HTMLElement): void {
  const rail = root.querySelector<HTMLElement>('[data-rail]');
  const prev = root.querySelector<HTMLButtonElement>('[data-rail-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-rail-next]');
  if (!rail || !prev || !next) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const step = (): number => {
    const card = rail.querySelector<HTMLElement>('[data-case-card]');
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : rail.clientWidth;
  };

  const update = (): void => {
    const max = rail.scrollWidth - rail.clientWidth;
    prev.disabled = rail.scrollLeft <= 1;
    next.disabled = rail.scrollLeft >= max - 1;
  };

  prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }));
  next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' }));
  rail.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}
