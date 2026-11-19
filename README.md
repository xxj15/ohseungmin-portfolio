# 오승민 · Strategy Portfolio

전략 컨설팅 지원용 웹 포트폴리오. 사이트: https://xxj15.github.io/ohseungmin-portfolio/

## 로컬 실행

Node 24가 필요합니다(`.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:4321
npm test         # 빌드 후 Playwright 테스트 (설치된 Chrome 사용)
```

## 콘텐츠 수정

문구와 수치는 전부 `src/data/`에 있습니다. 화면 코드는 고칠 필요가 없습니다.

- 홈 공용(히어로 · 분석 방식 · 리서치 · 소개 · 연락처): `src/data/site.ts`
- 케이스 7개: `src/data/cases/*.ts` (순서는 `src/data/cases/index.ts`)

문구 규칙: 섹션 제목은 명사, 케이스 제목은 명사형, 설명은 사실 서술. 말 거는 문장과 대시(—)는 쓰지 않습니다(`tests/data.spec.ts`가 검사).

## 자료 추가 (넣으면 자동으로 나타남)

| 자료 | 파일 위치 | 데이터 |
|---|---|---|
| 리포트 PDF | `public/reports/<파일>.pdf` | `site.ts`의 `research[].pdf: '/reports/<파일>.pdf'`. 케이스 상세에도 보이려면 해당 케이스 파일의 DELIVERABLE 사실에 `links: [{ text: '리포트 18p (PDF) ↗', href: '/reports/<파일>.pdf' }]`(매크로는 링크 2개), 한화솔루션은 결과 블록 `pdf`에도 |
| 이력서 PDF | `public/<파일>.pdf` | `site.ts`의 `contact.resumePdf: '/<파일>.pdf'` → 상단 메뉴 버튼 + 소개의 연락처 묶음 |
| 이메일 · LinkedIn | — | `site.ts`의 `contact.email`, `contact.linkedin` → 소개 섹션의 연락처 묶음에 표시 |

`tests/data.spec.ts`의 "site 현재 상태: 자료 없음" 테스트는 자료를 넣으면 실패하므로 함께 지우거나 고칩니다.

비공개 자료(SG Fenero IM 장표, 공개 여부 미확인 장표)는 `public/`에 넣지 않습니다.

## 배포

`main`에 push하면 GitHub Actions가 빌드해서 Pages에 올립니다(`.github/workflows/deploy.yml`).
