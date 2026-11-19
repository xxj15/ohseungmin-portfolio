import { expect, test } from '@playwright/test';

test('홈이 Pretendard·흰 배경으로 뜬다', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  const fontFamily = await page.locator('body').evaluate((e) => getComputedStyle(e).fontFamily);
  expect(fontFamily).toContain('Pretendard');
  await expect(page.locator('nav')).toContainText('오승민');
  await expect(page.locator('nav a', { hasText: 'Work' })).toHaveAttribute('href', '/#work');
});

test('404 페이지', async ({ page }) => {
  const res = await page.goto('/no-such-page/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('a', { hasText: '홈으로' })).toHaveAttribute('href', '/');
});
