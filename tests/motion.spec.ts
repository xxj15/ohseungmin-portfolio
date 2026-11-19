import { expect, test } from '@playwright/test';

test('내비: 스크롤 진행 바·현재 섹션 강조·구분선', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('nav[aria-label="주 메뉴"]');
  await expect(nav).not.toHaveClass(/is-scrolled/);
  await page.locator('#research').scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 200);
  await expect(nav).toHaveClass(/is-scrolled/);
  await expect(nav.locator('a', { hasText: 'Research' })).toHaveAttribute('aria-current', 'location');
  await expect(nav.locator('a', { hasText: 'Work' })).not.toHaveAttribute('aria-current', 'location');
  const scale = await page.locator('[data-progress]').evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);
  expect(scale).toBeGreaterThan(0.2);
});

test('스크롤 리빌: 화면 아래 요소는 숨겨졌다가 보이면 나타남', async ({ page }) => {
  await page.goto('/');
  const row = page.locator('#approach li').first();
  await expect(row).toHaveClass(/reveal-pending/);
  await row.scrollIntoViewIfNeeded();
  await expect(row).not.toHaveClass(/reveal-pending/);
  await expect.poll(() => row.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
});

test('히어로 제목 줄 단위 등장 준비', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/\bjs\b/);
  await expect(page.locator('h1 [data-hero-line]')).toHaveCount(2);
});

test('숫자 카운트업: 최종값은 처음부터 DOM에 있고 애니메이션 후에도 같음', async ({ page }) => {
  await page.goto('/work/hanwha-solutions/');
  const first = page.locator('[data-kpi]').first().locator('[data-countup]');
  await expect(first.locator('.final')).toHaveText('43,300');
  await expect(first).toHaveAttribute('data-countup-done', 'true', { timeout: 5000 });
  await expect(first.locator('.final')).toHaveText('43,300');
  await expect(first.locator('[aria-hidden="true"]')).toHaveCount(1);
  // 숫자가 아닌 값(혼합 표기 '1조 7,361')은 카운트업하지 않음
  await expect(page.locator('[data-kpi]').nth(2).locator('[data-countup]')).toHaveCount(0);
});

test('차트: 화면에 들어오면 그려짐', async ({ page }) => {
  await page.goto('/work/hanwha-solutions/');
  const chart = page.locator('[data-chart]').first();
  await expect(chart).toHaveClass(/chart-pending/);
  await chart.scrollIntoViewIfNeeded();
  await expect(chart).not.toHaveClass(/chart-pending/);
  await expect.poll(() => chart.locator('.bar').last().evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThan(100);
});

test('동작 줄이기 설정이면 숨김·애니메이션 없음', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/work/hanwha-solutions/');
  await expect(page.locator('.reveal-pending, .chart-pending')).toHaveCount(0);
  await expect(page.locator('[data-countup].is-counting')).toHaveCount(0);
});
