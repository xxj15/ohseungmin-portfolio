import { expect, test } from '@playwright/test';

test('한화 AMPC 막대와 주주가치 계산', async ({ page }) => {
  await page.goto('/work/hanwha-solutions/');
  await expect(page.locator('[data-exhibit]').first().locator('[data-bar-value]')).toHaveText(['5,551', '5,360', '9,720', '11,332']);
  await expect(page.locator('[data-hbars-result]')).toHaveText('43,300원');
  await expect(page.locator('[data-exhibit] table tr')).toHaveCount(6); // 머리 + 5행
});

test('HD 선 그래프 값 라벨과 Comps 표', async ({ page }) => {
  await page.goto('/work/hd-hyundai-heavy/');
  await expect(page.locator('svg [data-point-label]')).toHaveText(['-9.6%', '-3.2%', '1.5%', '4.9%', '11.6%', '15.9%']);
  await expect(page.locator('[data-exhibit] td.up')).toHaveText(['+29.8%']);
});

test('IM 분류 흐름도는 화살표 없음, 한국은행은 두 경로', async ({ page }) => {
  await page.goto('/work/confidential-im/');
  await expect(page.locator('[data-flow][data-arrows="false"]')).toHaveCount(1);
  await page.goto('/work/bok-competition/');
  await expect(page.locator('[data-path-tag]')).toHaveText(['상방 압력', '하방 압력']);
});

test('MSP 이미지 로드', async ({ page }) => {
  await page.goto('/work/moon-sun-power/');
  const img = page.locator('[data-exhibit] img');
  await expect(img).toHaveCount(1);
  const ok = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
  expect(ok).toBe(true);
});
