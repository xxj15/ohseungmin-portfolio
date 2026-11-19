import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

/*
  예전 GitHub Pages 주소 → Vercel 새 주소 이동 페이지(redirect/404.html, index.html).
  실제 네트워크 대신 두 주소를 가로채서, 경로 · 쿼리 · 해시가 그대로 넘어가는지 본다.
*/
const OLD = 'https://xxj15.github.io/ohseungmin-portfolio';
const NEW = 'https://ohseungmin.vercel.app';
const page404 = readFileSync('redirect/404.html', 'utf8');

test('index.html과 404.html은 같은 이동 페이지', () => {
  expect(readFileSync('redirect/index.html', 'utf8')).toBe(page404);
});

for (const [from, to] of [
  ['/', '/'],
  ['', '/'],
  ['/#research', '/#research'],
  ['/work/hanwha-solutions/', '/work/hanwha-solutions/'],
  ['/reports/krw.pdf', '/reports/krw.pdf'],
  ['/work/swic-macro/?ref=mail#top', '/work/swic-macro/?ref=mail#top'],
]) {
  test(`예전 주소 ${from || '(base만)'} → 새 주소 ${to}`, async ({ page }) => {
    await page.route(`${OLD}/**`, (r) => r.fulfill({ status: 404, contentType: 'text/html', body: page404 }));
    await page.route(OLD, (r) => r.fulfill({ status: 200, contentType: 'text/html', body: page404 }));
    await page.route(`${NEW}/**`, (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<p>new</p>' }));
    await page.goto(OLD + from);
    await expect(page).toHaveURL(NEW + to);
  });
}
