import { expect, test, type Page } from '@playwright/test';
import { SLUGS } from './fixtures';

/** #work 안 케이스 링크를 화면 순서대로(중복 없이) */
const caseLinks = (page: Page) =>
  page.locator('#work a[href^="/work/"]').evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute('href')))]);

const box = (page: Page, sel: string) =>
  page.locator(sel).evaluateAll((els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect();
      return { left: Math.round(r.left), top: Math.round(r.top + window.scrollY), width: Math.round(r.width) };
    }),
  );

test('7개 케이스 모두 링크, 순서는 Featured 3 → Additional 4', async ({ page }) => {
  await page.goto('/');
  expect(await caseLinks(page)).toEqual(SLUGS.map((s) => `/work/${s}/`));
  await expect(page.locator('#work [data-featured]')).toHaveCount(3);
  await expect(page.locator('#work [data-additional] li')).toHaveCount(4);
});

test('대표 프로젝트: 한화솔루션 투자의견 수치와 리포트 실제 영업이익', async ({ page }) => {
  await page.goto('/');
  const f = page.locator('[data-featured="hanwha"]');
  await expect(f).toContainText('₩43,300');
  await expect(f).toContainText('BUY');
  await expect(f).toContainText('+30%');
  await expect(f).toContainText('2026.09');
  // 리포트 1p 추정손익계산서 영업이익(십억 원)
  await expect(f.locator('figure')).toHaveAttribute('aria-label', /'23 580, '24 -300, '25 -344, LTM -98, FTM 1,737/);
  await expect(f.locator('a[href="/reports/hanwha-solutions.pdf"]')).toHaveCount(1);
});

test('SG Fenero 카드: 비공개 표시, 고객사 정보 없이 산업 구조만', async ({ page }) => {
  await page.goto('/');
  const f = page.locator('[data-featured="confidential-im"]');
  await expect(f).toContainText('Confidential');
  await expect(f).toContainText('Investment Highlights 1 · 4 · 5');
  await expect(f.locator('.segs li')).toHaveCount(4);
});

test('RCI 카드: 절차서 7건 기한 내 제정', async ({ page }) => {
  await page.goto('/');
  const f = page.locator('[data-featured="rci-financial"]');
  await expect(f).toContainText('Local Procedure 7건 기한 내 제정');
  await expect(f.locator('.cells li')).toHaveCount(7);
});

test('데스크톱: 대표 1장 전폭, 다음 줄 2열, 추가 4개 2×2', async ({ page }) => {
  await page.goto('/');
  const [h, im, rci] = await box(page, '#work [data-featured]');
  expect(im.top).toBe(rci.top);
  expect(im.top).toBeGreaterThan(h.top);
  expect(h.width).toBeGreaterThan(im.width * 1.8);
  const add = await box(page, '#work [data-additional] li');
  expect(add[0].top).toBe(add[1].top);
  expect(add[2].top).toBeGreaterThan(add[0].top);
  expect(add[2].left).toBe(add[0].left);
});

for (const width of [360, 390, 430]) {
  test(`모바일 ${width}px: 1열, 가로 넘침 없음`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    const lefts = new Set((await box(page, '#work [data-featured], #work [data-additional] li')).map((b) => b.left));
    expect(lefts.size).toBe(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test('모바일: 주요 버튼·링크 터치 영역 44px 이상', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const heights = await page
    .locator('.hero .btn, #work .more, #research .more, #about [data-contact] a')
    .evaluateAll((els) => els.filter((e) => (e as HTMLElement).offsetParent).map((e) => e.getBoundingClientRect().height));
  expect(heights.length).toBeGreaterThan(5);
  for (const h of heights) expect(h).toBeGreaterThanOrEqual(43.5);
});
