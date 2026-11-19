import { execFileSync } from 'node:child_process';
import { expect, test } from '@playwright/test';
import { cases } from '../src/data/cases';
import { PRIVATE_TERMS } from './private-terms';

for (const c of cases) {
  test(`${c.no} ${c.slug} 기본 구조`, async ({ page }) => {
    const res = await page.goto(`/work/${c.slug}/`);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(c.title);
    await expect(page.locator('[data-fact]')).toHaveCount(4);
    await expect(page.locator('[data-kpi]')).toHaveCount(4);
    await expect(page.locator('[data-block] h2')).toHaveText(c.blocks.map((b) => b.title));
    await expect(page.locator('a', { hasText: '← 주요 프로젝트' })).toHaveAttribute('href', '/#work');
  });
}

test('이전/다음 순환', async ({ page }) => {
  await page.goto('/work/hanwha-solutions/');
  await expect(page.locator('[data-pager-prev]')).toHaveAttribute('href', '/#work');
  await expect(page.locator('[data-pager-next]')).toHaveAttribute('href', '/work/hd-hyundai-heavy/');
  await page.goto('/work/swic-macro/');
  await expect(page.locator('[data-pager-prev]')).toHaveAttribute('href', '/work/bok-competition/');
  await expect(page.locator('[data-pager-next]')).toHaveAttribute('href', '/#work');
});

test('IM: 비공개 안내', async ({ page }) => {
  await page.goto('/work/confidential-im/');
  await expect(page.getByText('고객사 보호를 위해 회사명 · 장표 원본 · 세부 수치는 비공개', { exact: false })).toBeVisible();
});

test('빌드 산출물에 IM 회사명 없음', () => {
  let out = '';
  try {
    out = execFileSync('grep', ['-rIl', ...PRIVATE_TERMS.flatMap((t) => ['-e', t]), 'dist'], { encoding: 'utf8' }).trim();
  } catch {
    out = ''; // grep: 일치 없음 → exit 1
  }
  expect(out).toBe('');
});

test('HD: 입력 필요 표시 없음, 결과 문구', async ({ page }) => {
  await page.goto('/work/hd-hyundai-heavy/');
  await expect(page.getByText('입력 필요')).toHaveCount(0);
  await expect(page.locator('[data-block]').last()).toContainText('Comps · DCF 밸류에이션 모델 구축');
});

test('상세 페이지 배경 흰색', async ({ page }) => {
  await page.goto('/work/hanwha-solutions/');
  const els = await page.locator('[data-kpi-strip], [data-block]').all();
  expect(els.length).toBe(1 + cases[0].blocks.length);
  for (const el of els) {
    await expect(el).toHaveCSS('background-color', /rgb\(255, 255, 255\)|rgba\(0, 0, 0, 0\)/);
  }
});
