# 오승민 포트폴리오 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 확정 시안(홈 1 + 케이스 상세 7)을 Astro 정적 사이트로 구현하고 GitHub Pages(`https://xxj15.github.io/ohseungmin-portfolio/`)에 배포한다.

**Architecture:** 콘텐츠는 `src/data/`의 TypeScript 데이터(사이트 공용 + 케이스 7개)에만 있고, 페이지는 데이터를 렌더링만 한다. 케이스 상세는 `blocks → parts` 배열을 순서대로 그리는 하나의 동적 라우트(`/work/[slug]/`)다. 배포·base 경로·Playwright 설정은 서진 저장소(`/Users/xxj15/2026-pjt/anseojin-portfolio`)에서 가져온다.

**Tech Stack:** Astro 7.4, TypeScript(strict), Playwright(설치된 Edge, `channel: 'msedge'`), GitHub Actions + Pages. UI·차트 라이브러리 없음.

**Spec:** `docs/superpowers/specs/2026-11-19-portfolio-design.md` (시각 기준: `docs/superpowers/mockups/*.html`)

## Global Constraints

- 글꼴: Pretendard Variable, `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`, 폴백 `-apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif`.
- 배경은 모든 섹션·카드가 흰색(`#ffffff`). 색 띠·회색 면 금지. 네이비 `#1b3a78`(강조), `#0f1d3a`(채움 버튼·리포트 썸네일 띠).
- 나머지 토큰·크기·간격은 시안 `<style>`의 최종값(`white-only override` 적용 후)을 그대로 쓴다. 시안의 `.note`, `.switch`, `.ph`(노란 "입력 필요")는 구현하지 않는다.
- 문구는 시안 파일 텍스트가 확정본. 시안에 없는 홈 카드 05~07은 spec §5.3 표. 새 수치 금지.
- 문구 규칙(spec §6): 말 거는 문장, 질문형 카드 제목, "번역하다", "닿기까지", 대시(—) 금지. `word-break: keep-all`.
- IM 케이스: 회사명 노출 금지, IM 장표 파일을 `public/`에 두지 않는다.
- 내부 링크는 전부 `withBase()`를 거치고, 페이지 경로는 끝 슬래시(`/work/<slug>/`).
- 없는 자료(이메일·LinkedIn·이력서·리포트 PDF·HD 투자의견)는 렌더링하지 않는다(spec §9, §11). 연락처가 하나도 없으면 연락처 섹션과 내비 링크 모두 없음.
- 배포: `ASTRO_BASE=/ohseungmin-portfolio`, `site=https://xxj15.github.io`. GitHub 저장소 생성·push는 사용자 확인 후.

## Review Focus

- 360px 폭에서 표(Peer·Comps)·흐름도·주주가치 막대가 가로 스크롤을 만들면 안 된다 → Task 6 테스트.
- `ASTRO_BASE` 하위 경로 빌드에서 링크·이미지·PDF가 루트(`/`)로 새면 안 된다 → Task 7 테스트.
- IM 회사명·원본 자료가 빌드 산출물 어디에도 없어야 한다 → Task 5 테스트.
- 내부 링크가 끝 슬래시 없이 나가면 Pages에서 301이 한 번 더 생긴다 → Task 4 테스트.
- 케이스 레일의 ←/→가 끝에서 비활성(`disabled`)이고 키보드로 조작 가능해야 한다 → Task 4 테스트.

---

### Task 1: 프로젝트 골격 · 레이아웃 · 내비

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `playwright.config.ts`
- Create: `src/lib/paths.ts`, `src/styles/tokens.css`, `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`
- Create: `src/pages/index.astro`(임시: 레이아웃 + h1만), `src/pages/404.astro`
- Test: `tests/smoke.spec.ts`

**Interfaces:**
- Produces: `withBase(path: string): string`, `casePath(slug: string): string` → `withBase('/work/<slug>/')` (`src/lib/paths.ts`, 서진 `paths.ts`와 동일 규칙)
- Produces: `BaseLayout` props `{ title: string; ogTitle?: string; noindex?: boolean }`, slot = 본문. 레이아웃이 `Nav`와 `Footer`를 포함.
- Produces: `Nav` props `{ showResume: boolean; resumeHref?: string; showContact: boolean }` — 메뉴 Work(`/#work`) · Approach(`/#approach`) · Research(`/#research`) · About(`/#about`) (+ `showContact`면 Contact `/#contact`).

- [ ] **Step 1:** 서진 저장소에서 `package.json`(name `ohseungmin-portfolio`, `predev`/`prebuild` 제거, 의존성 동일 버전), `astro.config.mjs`, `tsconfig.json`, `.gitignore`(PDF 사본 줄 제거), `playwright.config.ts`를 복사해 맞추고 `npm install`.
- [ ] **Step 2: 실패 테스트 작성** `tests/smoke.spec.ts`

```ts
test('홈이 Pretendard·흰 배경으로 뜬다', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  expect(await page.locator('body').evaluate(e => getComputedStyle(e).fontFamily)).toContain('Pretendard');
  await expect(page.locator('nav')).toContainText('오승민');
  await expect(page.locator('nav a', { hasText: 'Work' })).toHaveAttribute('href', '/#work');
});
test('404 페이지', async ({ page }) => {
  const res = await page.goto('/no-such-page/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('a', { hasText: '홈으로' })).toHaveAttribute('href', '/');
});
```

- [ ] **Step 3:** `npx playwright test tests/smoke.spec.ts` → FAIL(페이지 없음).
- [ ] **Step 4:** 토큰·전역 스타일(시안 `:root`·`body`·`.wrap`·`.eyebrow`·`.sec-label`·`h2`·버튼 `.b1`/`.b2`), `BaseLayout`(Pretendard 비차단 로드, `<title>`, `og:title`), `Nav`, `Footer`(`오승민` · `© 2026`), 임시 `index.astro`, `404.astro` 구현.
- [ ] **Step 5:** 테스트 PASS, `npx astro check` 오류 0.
- [ ] **Step 6:** 커밋 `feat: scaffold Astro site with layout and nav`

---

### Task 2: 데이터 모델 · 콘텐츠 · 문구 규칙 검사

**Files:**
- Create: `src/data/types.ts`, `src/data/site.ts`, `src/data/cases/{hanwha-solutions,hd-hyundai-heavy,rci-financial,moon-sun-power,confidential-im,bok-competition,swic-macro}.ts`, `src/data/cases/index.ts`
- Create: `src/lib/content.ts`
- Create: `public/images/msp-service.png` (← `docs/superpowers/mockups/msp-service.png`)
- Create: `tests/fixtures.ts`
- Test: `tests/data.spec.ts`

**Interfaces:**
- Produces (`src/data/types.ts`):

```ts
export type Rich = string; // <b>…</b>만 허용하는 인라인 HTML, set:html로 렌더링
export interface Fact { label: string; value: Rich; href?: string }
export interface Kpi { value: string; unit?: string; label: string }
export interface CaseCard { category: string; org: string; role: string; title: string; summary: string; outcome: string; outcomeSub?: string }
export type Figure =
  | { type: 'bars'; bars: { label: string; value: number; display: string; highlight?: boolean }[] }
  | { type: 'line'; xLabels: string[]; series: { name: string; values: number[]; muted?: boolean }[]; unit: string }
  | { type: 'table'; head: string[]; rows: { cells: string[]; tone?: 'up' | 'down' | 'strike' | 'total' }[] }
  | { type: 'flow'; steps: { key?: string; title: string; note?: string }[]; highlightLast?: boolean; arrows?: boolean }
  | { type: 'paths'; paths: { tag: string; muted?: boolean; steps: string[] }[] }
  | { type: 'hbars'; rows: { label: string; value: string; width: number; offset?: number; tone: 'pos' | 'neg' | 'base'; total?: boolean }[]; result?: { label: string; value: string } }
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
export interface Block { label: string; title: string; parts: Part[] } // label: 'SITUATION' 등 영문, title: '배경' 등
export type CaseSlug = 'hanwha-solutions' | 'hd-hyundai-heavy' | 'rci-financial' | 'moon-sun-power' | 'confidential-im' | 'bok-competition' | 'swic-macro';
export interface CaseStudy { slug: CaseSlug; no: string; card: CaseCard; eyebrow: string; title: string; org: string; facts: [Fact, Fact, Fact, Fact]; kpis: [Kpi, Kpi, Kpi, Kpi]; blocks: Block[] }
export interface Contact { email?: string; linkedin?: string; resumePdf?: string }
export interface ResearchItem { tag: string; title: string; summary: string; pdf?: string }
```

- Produces: `cases: readonly CaseStudy[]` (`src/data/cases/index.ts`, 순서 01→07), `site` (`src/data/site.ts`: `name`, `eyebrow`, `heroLines: Rich[]`, `heroFacts`, `experience: string[]`, `approach: { no; title; en; body: Rich; source }[]`, `research: ResearchItem[]`, `about: { heading; rows: { label; value; sub? }[] }[]`, `contact: Contact`)
- Produces (`src/lib/content.ts`, 순수 함수, Astro import 금지): `contactItems(c: Contact): { label: string; text: string; href: string }[]` (email → `mailto:`, linkedin 그대로; resume 제외), `hasContact(c: Contact): boolean`, `neighbors(list, slug): { prev?: CaseStudy; next?: CaseStudy }`

- [ ] **Step 1: 실패 테스트 작성** `tests/data.spec.ts` (브라우저 없이 데이터만 검사)

```ts
const SLUGS = ['hanwha-solutions','hd-hyundai-heavy','rci-financial','moon-sun-power','confidential-im','bok-competition','swic-macro'];
test('케이스 7개, 순서·번호', () => {
  expect(cases.map(c => c.slug)).toEqual(SLUGS);
  expect(cases.map(c => c.no)).toEqual(['01','02','03','04','05','06','07']);
});
test('문구 규칙 위반 없음', () => {
  const all = JSON.stringify({ cases, site });
  for (const bad of ['해 봤습니다','편하게','번역하다','닿기까지','—','입력 필요','<고객사명>','<고객사명>']) expect(all).not.toContain(bad);
});
test('핵심 수치', () => {
  const h = cases[0];
  expect(h.kpis.map(k => k.value)).toEqual(['43,300','+30','1조 7,361','10.3']);
  expect(cases[4].card.org).toBe('CONFIDENTIAL');
  expect(cases[5].card.outcome).toBe('심리지표 VIX → NSI 교체 제안 · 채택');
});
test('연락처 헬퍼: 없음/있음 두 상태', () => {
  expect(hasContact({})).toBe(false);
  expect(contactItems({})).toEqual([]);
  expect(contactItems({ email: 'a@b.c', linkedin: 'https://linkedin.com/in/x' }).map(i => i.href))
    .toEqual(['mailto:a@b.c', 'https://linkedin.com/in/x']);
});
test('site 현재 상태: 자료 없음', () => {
  expect(site.contact).toEqual({});
  expect(site.research.every(r => r.pdf === undefined)).toBe(true);
});
```

- [ ] **Step 2:** `npx playwright test tests/data.spec.ts` → FAIL(모듈 없음).
- [ ] **Step 3:** 타입·헬퍼 구현 후, 시안 텍스트를 그대로 데이터로 옮긴다. 출처: 홈 → `home-v8.html`(카드 05~07은 spec §5.3), 케이스 → 각 `detail-*.html`. 예외:
  - HD 결과 블록: `{ kind: 'outcome', headline: 'Comps · DCF 밸류에이션 모델 구축', body: '분석 주제 선정부터 산업 · 기업분석, 재무 모델링, Valuation, 최종 장표까지 단독 수행. 스터디를 직접 조직하고 참여자별 발표 진행.' }`, DCF 카드의 `.ph` 문구 삭제.
  - 시안 대시(—) 문장이 있으면 쉼표·마침표로 바꾼다.
  - Macro DELIVERABLE: `리포트 9p · 14p`(PDF 없으므로 링크 없음). 한화 DELIVERABLE: `리포트 18p`.
  - MSP 이미지: `{ type: 'image', src: '/images/msp-service.png', alt: 'Moon, Sun, Power 지문 · 문제 풀이 화면' }`.
  - 소개 학력 sub: `유럽문화학과 (독일어권 심화) · 경영학 복수전공` (사용자 확인 2026-11-19, 시안의 "경영학과"를 대체).
  - `tests/fixtures.ts`에 `export const SLUGS = cases.map(c => c.slug)`를 두고 이후 테스트가 import한다.
- [ ] **Step 4:** 테스트 PASS, `npx astro check` 0.
- [ ] **Step 5:** 커밋 `feat: add content data for site and seven cases`

---

### Task 3: 홈 정적 섹션 (히어로 · 경력 띠 · 분석 방식 · 리서치 · 소개 · 연락처)

**Files:**
- Create: `src/components/home/{Hero,ExperienceStrip,ApproachList,ResearchList,AboutLists,ContactSection,SectionHead}.astro`
- Modify: `src/pages/index.astro`, `src/layouts/BaseLayout.astro`(Nav에 `site.contact` 기반 플래그 전달)
- Test: `tests/home.spec.ts`

**Interfaces:**
- Consumes: `site`, `hasContact`, `contactItems`, `withBase`
- Produces: `SectionHead` props `{ id: string; no: string; label: string; title: string }` → `<section id>` 머리(● `01` `SELECTED WORK` + h2). Task 4가 Work 섹션에 재사용.

- [ ] **Step 1: 실패 테스트 작성** `tests/home.spec.ts`

```ts
test('히어로', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('산업 구조를 분석하고 기업가치로 결론 내는 전략 분석가');
  await expect(page.locator('h1 b')).toHaveText(['산업 구조', '기업가치']);
  await expect(page.getByText('서강대학교 · Sogang Wise Investment Club 38기 · RCI Financial Credit Risk 인턴 · SG Fenero')).toBeVisible();
});
test('섹션 순서와 제목', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main h2')).toHaveText(['주요 프로젝트', '분석 방식', '리서치 리포트', '소개']);
});
test('자료 없음 상태: 연락처·이력서·PDF 숨김', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#contact')).toHaveCount(0);
  await expect(page.locator('nav a', { hasText: 'Contact' })).toHaveCount(0);
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
  for (const s of await page.locator('main section').all())
    await expect(s).toHaveCSS('background-color', /rgba?\(255, 255, 255|rgba\(0, 0, 0, 0\)/);
});
```

- [ ] **Step 2:** 테스트 실행 → FAIL.
- [ ] **Step 3:** 컴포넌트 구현. 레이아웃·간격은 `home-v8.html` 해당 섹션 CSS. `ContactSection`은 `hasContact(site.contact)`가 false면 아무것도 렌더링하지 않음. 리서치 PDF 링크는 `item.pdf`가 있을 때만 `withBase(item.pdf)`.
- [ ] **Step 4:** 테스트 PASS.
- [ ] **Step 5:** 커밋 `feat: build home sections`

---

### Task 4: 홈 주요 프로젝트 레일

**Files:**
- Create: `src/components/home/WorkRail.astro`, `src/components/home/CaseCard.astro`, `src/scripts/rail.ts`
- Modify: `src/pages/index.astro`
- Test: `tests/rail.spec.ts`

**Interfaces:**
- Consumes: `cases`, `casePath`, `SectionHead`
- Produces: `CaseCard` props `{ card: CaseCard; href: string }`

- [ ] **Step 1: 실패 테스트 작성** `tests/rail.spec.ts`

```ts
test('카드 7개, 순서, 끝 슬래시 링크', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#work [data-case-card]');
  await expect(cards).toHaveCount(7);
  const hrefs = await cards.evaluateAll(els => els.map(e => e.getAttribute('href')));
  expect(hrefs).toEqual(SLUGS.map(s => `/work/${s}/`));
  await expect(cards.first()).toContainText('목표주가 43,300원 · BUY');
});
test('화살표: 처음엔 이전 비활성, 다음 누르면 이동', async ({ page }) => {
  await page.goto('/');
  const prev = page.getByRole('button', { name: '이전 프로젝트' });
  const next = page.getByRole('button', { name: '다음 프로젝트' });
  await expect(prev).toBeDisabled();
  const rail = page.locator('#work [data-rail]');
  const before = await rail.evaluate(e => e.scrollLeft);
  await next.focus(); await page.keyboard.press('Enter');
  await expect.poll(() => rail.evaluate(e => e.scrollLeft)).toBeGreaterThan(before);
  await expect(prev).toBeEnabled();
});
test('끝까지 가면 다음 비활성', async ({ page }) => {
  await page.goto('/');
  await page.locator('#work [data-rail]').evaluate(e => e.scrollTo({ left: e.scrollWidth }));
  await expect(page.getByRole('button', { name: '다음 프로젝트' })).toBeDisabled();
});
```

- [ ] **Step 2:** 실행 → FAIL.
- [ ] **Step 3:** 카드 마크업·스타일은 `home-v8.html` `.card`. 레일은 `overflow-x: auto` + `scroll-snap-type: x mandatory`, 스크롤바 숨김. `rail.ts`: 화살표 클릭 시 카드 폭 + gap만큼 `scrollBy({ behavior: 'smooth' })`(`prefers-reduced-motion`이면 `'auto'`), `scroll` 이벤트에서 양 끝 판정해 `disabled` 갱신. 버튼 `aria-label`은 "이전 프로젝트"/"다음 프로젝트".
- [ ] **Step 4:** PASS.
- [ ] **Step 5:** 커밋 `feat: add case rail with arrows`

---

### Task 5: 케이스 상세 페이지 · 기본 블록

**Files:**
- Create: `src/pages/work/[slug].astro`
- Create: `src/components/case/{CaseHeader,KpiStrip,BlockSection,PartRenderer,Pager}.astro`
- Create: `src/components/case/parts/{ListPart,QuestionPart,ParagraphPart,NoticePart,ThesisPart,CardsPart,WorkstreamsPart,ReportsPart,OutcomePart}.astro`
- Test: `tests/case.spec.ts`

**Interfaces:**
- Consumes: `cases`, `neighbors`, `casePath`, `withBase`, 타입 `Block`/`Part`
- Produces: `PartRenderer` props `{ part: Part }` — `kind`별 컴포넌트로 분기, `exhibit`는 Task 6의 `ExhibitFigure`에 위임(이 태스크에서는 `<figure data-exhibit>` + 제목 + Source만 그리는 자리 컴포넌트).

- [ ] **Step 1: 실패 테스트 작성** `tests/case.spec.ts`

```ts
for (const c of cases) test(`${c.no} ${c.slug} 기본 구조`, async ({ page }) => {
  const res = await page.goto(`/work/${c.slug}/`);
  expect(res?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveText(c.title);
  await expect(page.locator('[data-fact]')).toHaveCount(4);
  await expect(page.locator('[data-kpi]')).toHaveCount(4);
  await expect(page.locator('[data-block] h2')).toHaveText(c.blocks.map(b => b.title));
  await expect(page.locator('a', { hasText: '← 주요 프로젝트' })).toHaveAttribute('href', '/#work');
});
test('이전/다음 순환', async ({ page }) => {
  await page.goto('/work/hanwha-solutions/');
  await expect(page.locator('[data-pager-prev]')).toHaveAttribute('href', '/#work');
  await expect(page.locator('[data-pager-next]')).toHaveAttribute('href', '/work/hd-hyundai-heavy/');
  await page.goto('/work/swic-macro/');
  await expect(page.locator('[data-pager-next]')).toHaveAttribute('href', '/#work');
});
test('IM: 비공개 안내, 회사명 없음', async ({ page }) => {
  await page.goto('/work/confidential-im/');
  await expect(page.getByText('고객사 보호를 위해 회사명, 장표 원본, 세부 수치는 공개하지 않습니다.', { exact: false })).toBeVisible();
});
test('빌드 산출물에 IM 회사명·원본 없음', () => {
  const out = execFileSync('grep', ['-rIl', '-e', <비공개 고객사명>, 'dist'], { encoding: 'utf8' }).trim();
  expect(out).toBe('');
});
test('HD: 입력 필요 표시 없음, 결과 문구', async ({ page }) => {
  await page.goto('/work/hd-hyundai-heavy/');
  await expect(page.getByText('입력 필요')).toHaveCount(0);
  await expect(page.locator('[data-block]').last()).toContainText('Comps · DCF 밸류에이션 모델 구축');
});
```

(`grep`가 결과 없으면 exit 1로 throw하므로 `try/catch`로 빈 문자열 처리.)

- [ ] **Step 2:** 실행 → FAIL.
- [ ] **Step 3:** `getStaticPaths`는 `cases`에서 생성. 머리·숫자 띠·블록·카드·목록·질문 스타일은 `detail-hanwha.html`(흰 배경 최종값). `Pager`는 `neighbors()`로 prev/next, 없으면 "목록으로"(`/#work`). 페이지 `<title>`: `{c.card.org === 'CONFIDENTIAL' ? 'Confidential' : c.org} · {c.title} | 오승민`.
- [ ] **Step 4:** PASS.
- [ ] **Step 5:** 커밋 `feat: add case detail pages with core blocks`

---

### Task 6: Exhibit 도표 · 반응형

**Files:**
- Create: `src/components/case/exhibit/{ExhibitFigure,BarsFigure,LineFigure,TableFigure,FlowFigure,PathsFigure,HBarsFigure,ImageFigure}.astro`
- Modify: `src/components/case/PartRenderer.astro`(자리 컴포넌트 → `ExhibitFigure`)
- Modify: 전역·컴포넌트 CSS(반응형)
- Test: `tests/exhibit.spec.ts`, `tests/responsive.spec.ts`

**Interfaces:**
- Consumes: 타입 `Exhibit`, `Figure`
- Produces: `ExhibitFigure` props `{ exhibit: Exhibit }` → `<figure data-exhibit>` 안에 "Exhibit N" + 제목, 도표, Source 각주.

- [ ] **Step 1: 실패 테스트 작성**

```ts
// tests/exhibit.spec.ts
test('한화 AMPC 막대와 주주가치 계산', async ({ page }) => {
  await page.goto('/work/hanwha-solutions/');
  await expect(page.locator('[data-exhibit]').first().locator('[data-bar-value]')).toHaveText(['5,551','5,360','9,720','11,332']);
  await expect(page.locator('[data-hbars-result]')).toHaveText('43,300원');
});
test('HD 선 그래프 값 라벨', async ({ page }) => {
  await page.goto('/work/hd-hyundai-heavy/');
  await expect(page.locator('svg [data-point-label]')).toHaveText(['-9.6%','-3.2%','1.5%','4.9%','11.6%','15.9%']);
});
test('IM 분류 흐름도는 화살표 없음, 한국은행은 두 경로', async ({ page }) => {
  await page.goto('/work/confidential-im/');
  await expect(page.locator('[data-flow][data-arrows="false"]')).toHaveCount(1);
  await page.goto('/work/bok-competition/');
  await expect(page.locator('[data-path-tag]')).toHaveText(['상방 압력', '하방 압력']);
});
test('MSP 이미지 로드', async ({ page }) => {
  await page.goto('/work/moon-sun-power/');
  const ok = await page.locator('figure img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
  expect(ok).toBe(true);
});

// tests/responsive.spec.ts
test.use({ viewport: { width: 360, height: 780 } });
for (const path of ['/', ...SLUGS.map(s => `/work/${s}/`)]) test(`360px 가로 스크롤 없음 ${path}`, async ({ page }) => {
  await page.goto(path);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
});
```

- [ ] **Step 2:** 실행 → FAIL.
- [ ] **Step 3:** 도표 구현(시안 CSS 그대로; 선 그래프는 시안 `line_chart` 방식의 인라인 SVG, `viewBox`로 폭 반응). 반응형(spec §10): ≤ 900px에서 다열 그리드 1열, 상세 라벨 열은 블록 위, 흐름도는 세로 쌓기(화살표 ↓), 표는 `[data-exhibit]` 안에서만 가로 스크롤 허용(`overflow-x: auto`, 페이지 자체는 넘치지 않음), 좌우 여백 20px, 히어로 h1 34px 수준.
- [ ] **Step 4:** 모든 테스트 PASS(`npx playwright test`).
- [ ] **Step 5:** 커밋 `feat: add exhibit figures and responsive layout`

---

### Task 7: 하위 경로 빌드 검증 · 배포 워크플로

**Files:**
- Create: `.github/workflows/deploy.yml` (서진 파일 복사, `ASTRO_BASE: /ohseungmin-portfolio`, PDF 주석 삭제, 사이트 주소 주석 갱신)
- Create: `README.md` (사이트 주소, 로컬 실행, 자료 넣는 법: 리포트 PDF → `public/reports/` + `site.research[].pdf`, 이력서 → `public/` + `site.contact.resumePdf`, 이메일·LinkedIn → `site.contact`)
- Test: `tests/base.spec.ts`

- [ ] **Step 1: 실패 테스트 작성** `tests/base.spec.ts`

```ts
test('ASTRO_BASE 빌드에서 내부 링크·자산이 base를 탄다', () => {
  execFileSync('npx', ['astro', 'build', '--outDir', 'dist-base'], { env: { ...process.env, ASTRO_BASE: '/ohseungmin-portfolio' }, stdio: 'ignore' });
  const files = globSync('dist-base/**/*.html');
  expect(files.length).toBeGreaterThanOrEqual(9); // 홈 + 상세 7 + 404
  for (const f of files) {
    const html = readFileSync(f, 'utf8');
    const leaks = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map(m => m[1]).filter(p => !p.startsWith('/ohseungmin-portfolio/'));
    expect(leaks, f).toEqual([]);
  }
});
```

(`globSync`는 `node:fs`의 `globSync`, Node 22.)

- [ ] **Step 2:** 실행 → 누락된 `withBase`가 있으면 FAIL, 고친다.
- [ ] **Step 3:** 워크플로·README 작성. `npx playwright test` 전체 PASS, `npx astro check` 0.
- [ ] **Step 4:** 커밋 `chore: add Pages deploy workflow and README`
- [ ] **Step 5 (사용자 확인 후에만):** `gh repo create xxj15/ohseungmin-portfolio --public --source . --push` → 저장소 Settings › Pages › Source를 GitHub Actions로 → Actions 성공 확인 → `https://xxj15.github.io/ohseungmin-portfolio/`와 `/work/hanwha-solutions/`가 200인지 `curl -sI`로 확인.
