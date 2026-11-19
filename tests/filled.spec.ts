import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { expect, test } from '@playwright/test';

/*
  "자료 있음" 상태(spec §11): 프로젝트를 임시 폴더에 복사해 데이터만 채우고 빌드한 뒤 HTML을 검사한다.
  리포트 PDF·이메일은 이미 실제 데이터에 있으므로, 남은 이력서만 넣어 버튼이 나타나는지 본다.
*/
const ROOT = resolve('.');

function edit(dir: string, file: string, from: string, to: string) {
  const p = join(dir, file);
  const s = readFileSync(p, 'utf8');
  if (!s.includes(from)) throw new Error(`패턴 없음: ${file}: ${from}`);
  writeFileSync(p, s.replace(from, to));
}

test('이력서를 데이터에 넣으면 내비·소개에 링크가 나타난다', () => {
  test.setTimeout(180_000);
  const dir = mkdtempSync(join(tmpdir(), 'osm-filled-'));
  try {
    for (const f of ['src', 'public', 'astro.config.mjs', 'tsconfig.json', 'package.json']) cpSync(join(ROOT, f), join(dir, f), { recursive: true });
    symlinkSync(join(ROOT, 'node_modules'), join(dir, 'node_modules'));

    edit(dir, 'src/data/site.ts', "contact: { email: 'dhtmdals4@naver.com',", "contact: { resumePdf: '/resume.pdf', email: 'dhtmdals4@naver.com',");

    execFileSync('npx', ['astro', 'build'], { cwd: dir, stdio: 'ignore' });
    const html = (p: string) => readFileSync(join(dir, 'dist', p), 'utf8');

    const home = html('index.html');
    expect(home.match(/href="\/resume\.pdf"/g)?.length).toBe(2); // 내비 버튼 + 소개의 연락처 묶음
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
