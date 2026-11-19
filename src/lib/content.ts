/** 순수 함수만 둔다(Astro import 금지) — 테스트가 브라우저 없이 바로 불러온다. */
import type { CaseStudy, Contact } from '../data/types';

export interface ContactItem { label: string; text: string; href: string }

/** 이메일·LinkedIn만 연락처 줄로 만든다. 이력서는 버튼으로 따로 쓴다. */
export function contactItems(c: Contact): ContactItem[] {
  const items: ContactItem[] = [];
  if (c.email) items.push({ label: 'Email', text: c.email, href: `mailto:${c.email}` });
  if (c.linkedin) items.push({ label: 'LinkedIn', text: '프로필 보기', href: c.linkedin });
  return items;
}

/** 연락처 섹션을 그릴지: 이메일·LinkedIn·이력서 중 하나라도 있으면 true */
export function hasContact(c: Contact): boolean {
  return contactItems(c).length > 0 || !!c.resumePdf;
}

export function neighbors(list: readonly CaseStudy[], slug: string): { prev?: CaseStudy; next?: CaseStudy } {
  const i = list.findIndex((c) => c.slug === slug);
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined };
}
