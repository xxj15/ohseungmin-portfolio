import type { CaseStudy } from '../types';

export const hdHyundaiHeavy: CaseStudy = {
  slug: 'hd-hyundai-heavy',
  no: '02',
  name: 'HD현대중공업',
  card: {
    category: 'INDUSTRY RESEARCH · 조선',
    org: 'HD현대중공업',
    role: '스터디 조직·팀장 · 단독 분석',
    title: '고부가 선박 수주잔고 기반 실적 전망과 Valuation',
    summary: '고선가 LNG선 수주분의 매출 인식 시점과 Peer 대비 수익성 개선 속도를 분석하고, Trading Comps와 DCF 모델을 직접 구축했습니다.',
    outcome: 'Comps · DCF 밸류에이션 모델 구축',
  },
  eyebrow: 'Industry Research · 조선 · 2026 여름',
  title: '고부가 선박 수주잔고 기반 실적 전망과 Valuation',
  org: 'HD현대중공업 (329180 KS)',
  facts: [
    { label: 'ROLE', value: '스터디 조직·팀장 · 단독 분석' },
    { label: 'SCOPE', value: '산업분석 · 재무 모델링 · Valuation' },
    { label: 'ORGANIZATION', value: '산업분석 스터디 (자체 조직)' },
    { label: 'DELIVERABLE', value: '분석 장표 · Comps / DCF 모델' },
  ],
  kpis: [
    { value: '15.9', unit: '%', label: "'26 1H 영업이익률 ('21년 -9.6%)" },
    { value: '2.55', unit: '억$', label: "'26 LNG선 평균 수주선가 · 13척" },
    { value: '6', unit: '개사', label: 'Trading Comps Peer (국내 3 · 글로벌 3)' },
    { value: '2', unit: '개', label: 'Valuation 방법론 (Comps · DCF)' },
  ],
  blocks: [
    {
      label: 'SITUATION',
      title: '배경',
      parts: [
        {
          kind: 'list',
          items: [
            '글로벌 조선업은 한국·중국·일본 3국 경쟁 구도, 선종별 기술 진입장벽이 상이',
            '선박은 <b>수주 후 2~3년 뒤 매출로 인식</b>되는 구조로, 과거 수주 선가가 현재 수익성을 결정',
            "'23~'24년 평균 수주선가 1.93억 · 1.91억 달러로 <b>고선가 수주잔고 누적</b>",
          ],
        },
      ],
    },
    {
      label: 'QUESTION',
      title: '핵심 질문',
      parts: [{ kind: 'question', text: '고선가 수주 물량의 매출 인식이 HD현대중공업의 수익성을 얼마나, 언제까지 끌어올리는가' }],
    },
    {
      label: 'THESIS',
      title: '투자 가설',
      parts: [
        {
          kind: 'thesis',
          items: [
            { tag: '01 · 매출 인식', title: '고부가 수주잔고의 매출 인식 시기 도래', body: "'23~'24년 고선가 수주분이 '26~'27년 매출로 본격 인식되며 실적 가시성 확대." },
            { tag: '02 · 수익성', title: 'Peer 대비 빠른 마진 개선', body: '고선가 물량 중심으로 영업이익률이 국내 Peer 평균을 상회하며 개선.' },
            { tag: '03 · 신규 수주', title: '고선가 신규 수주 지속', body: "'26년 LNG선 13척을 국내 최고 평균 선가에 수주. 그룹 내 생산 유연성 확보." },
          ],
        },
        {
          kind: 'exhibit',
          exhibit: {
            no: 1,
            title: '영업이익률 추이 (%)',
            source: '각 사, Dart, 자체 분석',
            figure: {
              type: 'line',
              unit: '%',
              xLabels: ["'21", "'22", "'23", "'24", "'25", "'26 1H"],
              series: [
                { name: 'HD현대중공업', values: [-9.6, -3.2, 1.5, 4.9, 11.6, 15.9] },
                { name: 'Peer 평균 (동사 · 삼성중공업 · 한화오션)', values: [-22.8, -16.9, 0.6, 4.1, 9.6, 13.1], muted: true },
              ],
            },
          },
        },
      ],
    },
    {
      label: 'APPROACH',
      title: '분석 방법',
      parts: [
        {
          kind: 'cards',
          items: [
            { key: 'INDUSTRY', title: '세부 시장 구분', body: '상선 · 특수선 · 해양플랜트로 시장을 나누고 선종별 수주 경쟁력, 고부가 선박 비중, 선가 · 원가 구조 분석' },
            { key: 'COMPS', title: 'Trading Comparables', body: '국내 3사 · 글로벌 3사, LTM / FTM 기준 EV/Sales · EV/EBITDA · EV/EBIT · P/E · P/B 5개 멀티플 비교' },
            { key: 'DCF', title: '현금흐름 할인', body: '향후 실적과 잉여현금흐름을 추정해 현재가치로 환산, 내재가치 산출' },
            { key: 'LINK', title: '재무 변화의 원인 연결', body: '매출 성장 · 마진 개선을 산업 사이클, 수주 구조, 사업 포트폴리오 변화와 연결해 해석' },
          ],
        },
        {
          kind: 'exhibit',
          exhibit: {
            no: 2,
            title: 'Trading Comps 적용 결과 (현재가 453,000원 기준)',
            source: '자체 Valuation 모델',
            figure: {
              type: 'table',
              head: ['FTM 멀티플', 'Peer 중앙값', '적용 주당가치', '현재가 대비'],
              toneColumn: 3,
              rows: [
                { cells: ['EV/EBITDA', '8.2x', '371,438원', '-18.0%'], tone: 'down' },
                { cells: ['EV/EBIT', '11.3x', '587,858원', '+29.8%'], tone: 'up' },
                { cells: ['P/E', '14.6x', '405,800원', '-10.4%'], tone: 'down' },
                { cells: ['P/B', '2.9x', '247,068원', '-45.5%'], tone: 'down' },
              ],
            },
          },
        },
      ],
    },
    {
      label: 'OUTCOME',
      title: '결과',
      parts: [
        {
          kind: 'outcome',
          headline: 'Comps · DCF 밸류에이션 모델 구축',
          body: '분석 주제 선정부터 산업 · 기업분석, 재무 모델링, Valuation, 최종 장표까지 단독 수행. 스터디를 직접 조직하고 참여자별 발표 진행.',
        },
      ],
    },
  ],
};
