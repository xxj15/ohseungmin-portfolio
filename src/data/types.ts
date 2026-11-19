/** <b>…</b>만 허용하는 인라인 HTML. 컴포넌트에서 set:html로 렌더링한다. */
export type Rich = string;

/** links가 있으면 value 대신 링크들을 ' · '로 이어 보여준다(예: 리포트 PDF). */
export interface Fact { label: string; value: Rich; links?: { text: string; href: string }[] }
export interface Kpi { value: string; unit?: string; label: string }
export interface CaseCard {
  category: string;
  org: string;
  role: string;
  title: string;
  summary: string;
  outcome: string;
  outcomeSub?: string;
}

export type Figure =
  | { type: 'bars'; bars: { label: string; value: number; display: string; highlight?: boolean }[] }
  | { type: 'line'; xLabels: string[]; series: { name: string; values: number[]; muted?: boolean }[]; unit: string }
  | { type: 'table'; head: string[]; rows: { cells: string[]; tone?: 'up' | 'down' | 'strike' | 'total' }[]; toneColumn?: number }
  | { type: 'flow'; steps: { key?: string; title: string; note?: string }[]; highlightLast?: boolean; arrows?: boolean }
  | { type: 'paths'; paths: { tag: string; muted?: boolean; steps: string[] }[] }
  | {
      type: 'hbars';
      rows: { label: string; value: string; width: number; offset?: number; tone: 'pos' | 'neg' | 'base'; total?: boolean }[];
      result?: { label: string; value: string };
    }
  | { type: 'image'; src: string; alt: string };

export interface Exhibit { no: number; title: string; source?: string; figure: Figure; caption?: Rich }

export type Part =
  | { kind: 'list'; items: Rich[] }
  | { kind: 'question'; text: string }
  | { kind: 'paragraph'; text: Rich }
  | { kind: 'notice'; text: string }
  | { kind: 'thesis'; items: { tag: string; title: string; body: string }[] }
  | { kind: 'cards'; items: { key: string; title: string; body: Rich; note?: Rich }[] }
  | { kind: 'workstreams'; items: { key: string; title: string; bullets: Rich[]; result?: string }[] }
  | { kind: 'reports'; items: { meta: string; title: string; question: string; points: string[]; conclusion: string }[] }
  | { kind: 'outcome'; headline: string; body?: string; pdf?: string; cover?: { org: string; rating: string; name: string } }
  | { kind: 'exhibit'; exhibit: Exhibit };

/** label: 'SITUATION' 같은 영문 라벨, title: '배경' 같은 한글 제목 */
export interface Block { label: string; title: string; parts: Part[] }

export type CaseSlug =
  | 'hanwha-solutions'
  | 'hd-hyundai-heavy'
  | 'rci-financial'
  | 'moon-sun-power'
  | 'confidential-im'
  | 'bok-competition'
  | 'swic-macro';

export interface CaseStudy {
  slug: CaseSlug;
  no: string;
  card: CaseCard;
  eyebrow: string;
  title: string;
  org: string;
  facts: [Fact, Fact, Fact, Fact];
  kpis: [Kpi, Kpi, Kpi, Kpi];
  blocks: Block[];
}

export interface Contact { email?: string; linkedin?: string; resumePdf?: string }
export interface ResearchItem { tag: string; title: string; summary: string; pdf?: string }
export interface ApproachRow { no: string; title: string; en: string; body: Rich; source: string }
export interface AboutGroup { heading: string; rows: { label: string; value: string; sub?: string }[] }
