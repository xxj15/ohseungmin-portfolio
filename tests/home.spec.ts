import { expect, test } from '@playwright/test';

test('히어로', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('산업 구조를 분석하고 기업가치로 결론 내는 전략 분석가');
  await expect(page.locator('h1 b')).toHaveText(['산업 구조', '기업가치']);
  await expect(page.getByText('서강대학교 · Sogang Wise Investment Club 38기 · RCI Financial Credit Risk 인턴 · SG Fenero')).toBeVisible();
});

test('섹션 순서와 제목', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main h2')).toHaveText(['주요 프로젝트', '분석 방식', '리서치 리포트', '소개', '연락처']);
});

test('자료 없음 항목 숨김: 이력서·리포트 PDF', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('이력서 PDF')).toHaveCount(0);
  await expect(page.locator('#research a', { hasText: 'PDF' })).toHaveCount(0);
  await expect(page.locator('#research blockquote')).toHaveText(['Cellf-made Orange', '애국합시다', '걱정은 Kevin Warsh가 Wash~']);
});

test('소개 학력', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#about')).toContainText('유럽문화학과 (독일어권 심화) · 경영학 복수전공');
});

test('모든 섹션 배경 흰색', async ({ page }) => {
  await page.goto('/');
  const sections = await page.locator('main section').all();
  expect(sections.length).toBeGreaterThanOrEqual(4);
  for (const s of sections) {
    await expect(s).toHaveCSS('background-color', /rgb\(255, 255, 255\)|rgba\(0, 0, 0, 0\)/);
  }
});
