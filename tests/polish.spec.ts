import { expect, test } from '@playwright/test';

const LINKEDIN = 'https://www.linkedin.com/in/seungmin-oh-8ab8a3351/';

test('연락처는 소개 섹션 안 "연락처" 묶음에 있고, 따로 된 Contact 섹션·메뉴는 없음', async ({ page }) => {
  await page.goto('/');
  const group = page.locator('#about [data-contact]');
  await expect(group.locator('h3')).toHaveText('연락처');
  await expect(group.locator('a', { hasText: '프로필 보기' })).toHaveAttribute('href', LINKEDIN);
  await expect(page.locator('#contact')).toHaveCount(0);
  await expect(page.locator('nav a', { hasText: 'Contact' })).toHaveCount(0);
  await expect(page.getByText('이력서 PDF')).toHaveCount(0);
});

test('문구 점검 반영', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('RCI Financial Credit Risk 인턴 · SG Fenero IM 프로젝트')).toBeVisible();
  await page.goto('/work/moon-sun-power/');
  await expect(page.getByText('프롬프트 설계 자청')).toBeVisible();
  await page.goto('/work/hd-hyundai-heavy/');
  await expect(page.locator('[data-kpi]').nth(1)).toContainText('억 달러');
});

test('Experience 띠: 항목마다 해당 경험으로 이동', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('[data-experience] a');
  await expect(links).toHaveText(['RCI Financial', 'SG Fenero', 'Sogang Wise Investment Club', '한국은행 통화정책 경시대회', 'Moon, Sun, Power', '산업분석 스터디']);
  expect(await links.evaluateAll((els) => els.map((e) => e.getAttribute('href')))).toEqual([
    '/work/rci-financial/',
    '/work/confidential-im/',
    '/#research',
    '/work/bok-competition/',
    '/work/moon-sun-power/',
    '/work/hd-hyundai-heavy/',
  ]);
});

test('파비콘', async ({ page, request }) => {
  await page.goto('/');
  const href = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(href).toBe('/favicon.svg');
  const res = await request.get(href!);
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain('SM');
});

test('링크 미리보기: 제목과 설명', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', '오승민 · Strategy & Financial Research');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /산업 구조를 분석하고 기업가치로 결론 내는 전략 분석가/);
  await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
});

test('이전/다음 이름 표기 통일', async ({ page }) => {
  await page.goto('/work/hd-hyundai-heavy/');
  await expect(page.locator('[data-pager-next] b')).toHaveText('RCI Financial · 글로벌 리스크 규정 현지화와 내부통제 프로젝트');
  await page.goto('/work/rci-financial/');
  await expect(page.locator('[data-pager-next] b')).toHaveText('Moon, Sun, Power · AI 맞춤형 문해력 학습 플랫폼 기획·운영');
});
