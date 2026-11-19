import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { expect, test } from '@playwright/test';

/*
  "자료 있음" 상태(spec §11): 프로젝트를 임시 폴더에 복사해 데이터만 채우고 빌드한 뒤 HTML을 검사한다.
  데이터 파일 수정만으로 연락처·이력서·리포트 링크가 나타나야 한다.
*/
const ROOT = resolve('.');

function edit(dir: string, file: string, from: string, to: string) {
  const p = join(dir, file);
  const s = readFileSync(p, 'utf8');
  if (!s.includes(from)) throw new Error(`패턴 없음: ${file}: ${from}`);
  writeFileSync(p, s.replace(from, to));
}

test('자료를 데이터에 넣으면 연락처·이력서·리포트 링크가 나타난다', () => {
  test.setTimeout(180_000);
  const dir = mkdtempSync(join(tmpdir(), 'osm-filled-'));
  try {
    for (const f of ['src', 'public', 'astro.config.mjs', 'tsconfig.json', 'package.json']) cpSync(join(ROOT, f), join(dir, f), { recursive: true });
    symlinkSync(join(ROOT, 'node_modules'), join(dir, 'node_modules'));

    edit(dir, 'src/data/site.ts', 'contact: {} as Contact', "contact: { email: 'test@example.com', linkedin: 'https://www.linkedin.com/in/test', resumePdf: '/resume.pdf' } as Contact");
    edit(dir, 'src/data/site.ts', "BUY 의견 제시' }", "BUY 의견 제시', pdf: '/reports/hanwha.pdf' }");
    edit(dir, 'src/data/cases/hanwha-solutions.ts', "{ label: 'DELIVERABLE', value: '리포트 18p' }", "{ label: 'DELIVERABLE', value: '리포트 18p', links: [{ text: '리포트 18p (PDF) ↗', href: '/reports/hanwha.pdf' }] }");
    edit(dir, 'src/data/cases/hanwha-solutions.ts', "cover: { org: 'SWIC'", "pdf: '/reports/hanwha.pdf', cover: { org: 'SWIC'");
    edit(dir, 'src/data/cases/swic-macro.ts', "{ label: 'DELIVERABLE', value: '리포트 9p · 14p' }", "{ label: 'DELIVERABLE', value: '리포트 9p · 14p', links: [{ text: '리포트 9p ↗', href: '/reports/us.pdf' }, { text: '14p ↗', href: '/reports/krw.pdf' }] }");

    execFileSync('npx', ['astro', 'build'], { cwd: dir, stdio: 'ignore' });
    const html = (p: string) => readFileSync(join(dir, 'dist', p), 'utf8');

    const home = html('index.html');
    expect(home).toContain('id="contact"');
    expect(home).toContain('href="mailto:test@example.com"');
    expect(home).toContain('href="https://www.linkedin.com/in/test"');
    expect(home.match(/href="\/resume\.pdf"/g)?.length).toBe(2); // 내비 버튼 + 연락처 버튼
    expect(home).toContain('href="/#contact"');
    expect(home).toContain('href="/reports/hanwha.pdf"');

    const macro = html('work/swic-macro/index.html');
    expect(macro).toContain('href="/reports/us.pdf"');
    expect(macro).toContain('href="/reports/krw.pdf"');

    const hanwha = html('work/hanwha-solutions/index.html');
    expect(hanwha.match(/href="\/reports\/hanwha\.pdf"/g)?.length).toBe(2); // 사실표 + 결과 버튼
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
