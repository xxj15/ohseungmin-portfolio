import { expect, test } from '@playwright/test';
import { SLUGS } from './fixtures';

test.use({ viewport: { width: 360, height: 780 } });

for (const path of ['/', ...SLUGS.map((s) => `/work/${s}/`)]) {
  test(`360px 가로 스크롤 없음 ${path}`, async ({ page }) => {
    await page.goto(path);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(360);
  });
}

test('360px: 연락처가 생겨 메뉴가 5개가 돼도 넘치지 않음', async ({ page }) => {
  await page.goto('/');
  await page.locator('nav .menu').evaluate((menu) => {
    const a = document.createElement('a');
    a.href = '/#contact';
    a.textContent = 'Contact';
    menu.appendChild(a);
  });
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(360);
  const right = await page.locator('nav .menu a').last().evaluate((el) => el.getBoundingClientRect().right);
  expect(right).toBeLessThanOrEqual(360 - 16);
});

test('360px: HD 선 그래프 값 라벨이 읽을 수 있는 크기', async ({ page }) => {
  await page.goto('/work/hd-hyundai-heavy/');
  const heights = await page.locator('svg [data-point-label]').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));
  expect(heights.length).toBe(6);
  for (const h of heights) expect(h).toBeGreaterThanOrEqual(10);
});
