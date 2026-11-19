import { expect, test } from '@playwright/test';
import { SLUGS } from './fixtures';

test('카드 7개, 순서, 끝 슬래시 링크', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#work [data-case-card]');
  await expect(cards).toHaveCount(7);
  const hrefs = await cards.evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  expect(hrefs).toEqual(SLUGS.map((s) => `/work/${s}/`));
  await expect(cards.first()).toContainText('목표주가 43,300원 · BUY');
  await expect(cards.nth(4)).toContainText('Confidential');
});

/** 카드들의 [left, top]을 반올림해 돌려준다. */
const boxes = (page: import('@playwright/test').Page) =>
  page.locator('#work [data-case-card]').evaluateAll((els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect();
      return [Math.round(r.left), Math.round(r.top + window.scrollY)];
    }),
  );

test('데스크톱: 2열 그리드, 화살표 없음', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /프로젝트/ })).toHaveCount(0);
  const b = await boxes(page);
  expect(new Set(b.map(([left]) => left)).size).toBe(2);
  expect(b[0][1]).toBe(b[1][1]); // 1·2번 같은 줄
  expect(b[2][1]).toBeGreaterThan(b[0][1]); // 3번은 다음 줄
  expect(b[2][0]).toBe(b[0][0]);
});

test('모바일: 1열', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const b = await boxes(page);
  expect(new Set(b.map(([left]) => left)).size).toBe(1);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});
