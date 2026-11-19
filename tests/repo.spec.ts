import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

import { PRIVATE_TERMS } from './private-terms';

test('추적 중인 파일에 비공개 고객사 이름 없음', () => {
  const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
  const hits = files.filter((f) => {
    if (/\.(png|jpe?g|pdf|ico)$/i.test(f)) return false;
    const text = readFileSync(f, 'utf8');
    return PRIVATE_TERMS.some((t) => text.includes(t));
  });
  expect(hits).toEqual([]);
});

test('인벤토리 원문은 저장소에 없음', () => {
  const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0');
  expect(files.some((f) => f.includes('인벤토리'))).toBe(false);
});
