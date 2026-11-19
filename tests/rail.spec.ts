import { expect, test } from '@playwright/test';
import { SLUGS } from './fixtures';

test('카드 7개, 순서, 끝 슬래시 링크', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#work [data-case-card]');
  await expect(cards).toHaveCount(7);
  const hrefs = await cards.evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  expect(hrefs).toEqual(SLUGS.map((s) => `/work/${s}/`));
  await expect(cards.first()).toContainText('목표주가 43,300원 · BUY');
  await expect(cards.nth(4)).toContainText('CONFIDENTIAL');
});

test('화살표: 처음엔 이전 비활성, 다음 누르면 이동', async ({ page }) => {
  await page.goto('/');
  const prev = page.getByRole('button', { name: '이전 프로젝트' });
  const next = page.getByRole('button', { name: '다음 프로젝트' });
  await expect(prev).toBeDisabled();
  const rail = page.locator('#work [data-rail]');
  const before = await rail.evaluate((e) => e.scrollLeft);
  await next.focus();
  await page.keyboard.press('Enter');
  await expect.poll(() => rail.evaluate((e) => e.scrollLeft)).toBeGreaterThan(before);
  await expect(prev).toBeEnabled();
});

test('끝까지 가면 다음 비활성', async ({ page }) => {
  await page.goto('/');
  await page.locator('#work [data-rail]').evaluate((e) => e.scrollTo({ left: e.scrollWidth }));
  await expect(page.getByRole('button', { name: '다음 프로젝트' })).toBeDisabled();
});
