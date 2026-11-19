import { execFileSync } from 'node:child_process';
import { globSync, readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

const BASE = '/ohseungmin-portfolio';

test('ASTRO_BASE 빌드에서 내부 링크·자산이 base를 탄다', () => {
  test.setTimeout(120_000);
  execFileSync('npx', ['astro', 'build', '--outDir', 'dist-base'], {
    env: { ...process.env, ASTRO_BASE: BASE },
    stdio: 'ignore',
  });
  const files = globSync('dist-base/**/*.html');
  expect(files.length).toBeGreaterThanOrEqual(9); // 홈 + 상세 7 + 404
  for (const f of files) {
    const html = readFileSync(f, 'utf8');
    const leaks = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)]
      .map((m) => m[1])
      .filter((p) => !p.startsWith(`${BASE}/`));
    expect(leaks, f).toEqual([]);
  }
});
