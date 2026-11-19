import { expect, test } from '@playwright/test';
import { cases } from '../src/data/cases';
import { site } from '../src/data/site';
import { contactItems, hasContact, neighbors } from '../src/lib/content';
import { PRIVATE_TERMS } from './private-terms';

const SLUGS = ['hanwha-solutions', 'hd-hyundai-heavy', 'rci-financial', 'moon-sun-power', 'confidential-im', 'bok-competition', 'swic-macro'];

test('케이스 7개, 순서·번호', () => {
  expect(cases.map((c) => c.slug)).toEqual(SLUGS);
  expect(cases.map((c) => c.no)).toEqual(['01', '02', '03', '04', '05', '06', '07']);
});

test('문구 규칙 위반 없음', () => {
  const all = JSON.stringify({ cases, site });
  for (const bad of ['해 봤습니다', '편하게', '번역하다', '닿기까지', '—', '입력 필요', ...PRIVATE_TERMS]) {
    expect(all, bad).not.toContain(bad);
  }
});

test('핵심 수치', () => {
  const h = cases[0];
  expect(h.kpis.map((k) => k.value)).toEqual(['43,300', '+30', '1조 7,361', '10.3']);
  expect(cases[4].card.org).toBe('CONFIDENTIAL');
  expect(cases[5].card.outcome).toBe('심리지표 VIX → NSI 교체 제안 · 채택');
});

test('연락처 헬퍼: 없음/있음 두 상태', () => {
  expect(hasContact({})).toBe(false);
  expect(contactItems({})).toEqual([]);
  expect(hasContact({ email: 'a@b.c' })).toBe(true);
  expect(contactItems({ email: 'a@b.c', linkedin: 'https://linkedin.com/in/x' }).map((i) => i.href)).toEqual([
    'mailto:a@b.c',
    'https://linkedin.com/in/x',
  ]);
});

test('이전/다음 헬퍼', () => {
  expect(neighbors(cases, 'hanwha-solutions').prev).toBeUndefined();
  expect(neighbors(cases, 'hanwha-solutions').next?.slug).toBe('hd-hyundai-heavy');
  expect(neighbors(cases, 'swic-macro').next).toBeUndefined();
});

test('site 현재 상태: 자료 없음', () => {
  expect(site.contact).toEqual({});
  expect(site.research.every((r) => r.pdf === undefined)).toBe(true);
});
