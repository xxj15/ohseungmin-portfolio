/**
 * 내비: 스크롤 진행 바, 현재 섹션 강조(aria-current="location"), 스크롤 후 아래 구분선.
 * 판정선: 내비 아래 남은 화면의 위쪽 1/3 지점. 대상 섹션이 없는 링크(상세 페이지)는 무시한다.
 */
function init(): void {
  const nav = document.querySelector<HTMLElement>('[data-site-nav]');
  if (!nav) return;
  const bar = nav.querySelector<HTMLElement>('[data-progress]');
  const targets = Array.from(nav.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')).flatMap((link) => {
    const section = document.getElementById(link.dataset.navLink ?? '');
    return section ? [{ link, section }] : [];
  });

  let scheduled = false;
  const update = () => {
    scheduled = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const scrollable = document.documentElement.scrollHeight - vh;
    if (bar) bar.style.transform = `scaleX(${scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0})`;
    nav.classList.toggle('is-scrolled', y > 4);

    const navBottom = nav.getBoundingClientRect().bottom;
    const line = navBottom + (vh - navBottom) / 3;
    let active: HTMLAnchorElement | null = null;
    for (const { link, section } of targets) {
      if (section.getBoundingClientRect().top <= line) active = link;
    }
    // 페이지 맨 끝이면 마지막 섹션
    if (targets.length && y >= scrollable - 2) active = targets[targets.length - 1].link;
    for (const { link } of targets) {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
}

try {
  init();
} catch (error) {
  console.error('[nav]', error);
}

export {};
