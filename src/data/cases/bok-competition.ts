import type { CaseStudy } from '../types';

export const bokCompetition: CaseStudy = {
  slug: 'bok-competition',
  no: '06',
  name: '한국은행 경시대회',
  card: {
    category: 'ECONOMIC RESEARCH · 거시경제',
    org: '한국은행 경시대회',
    role: '무역·환율 경로 분석·작성',
    title: '미국 관세정책 불확실성의 국내 경제 파급효과 분석',
    summary: '관세 불확실성을 물가 상방 · 경기 하방 두 압력으로 분해, 한국은행 경제통계로 가격 전가 구조 검증',
    outcome: '심리지표 VIX → NSI 교체 제안 · 채택',
  },
  eyebrow: 'Economic Research · 거시경제 · 2025',
  title: '미국 관세정책 불확실성의 국내 경제 파급효과 분석',
  org: '2025 한국은행 통화정책 경시대회',
  facts: [
    { label: 'ROLE', value: '무역 · 환율 경로 분석 · 작성' },
    { label: 'TEAM', value: '팀 프로젝트' },
    { label: 'DATA', value: '한국은행 경제통계시스템(ECOS)' },
    { label: 'DELIVERABLE', value: '이슈분석 보고서' },
  ],
  kpis: [
    { value: '3', unit: '개', label: '파급경로 (무역·환율 / 금융 / 심리)' },
    { value: '2', unit: '개', label: '압력 구분 (상방 · 하방)' },
    { value: 'PPI > CPI', label: '가격 전가 지연 구조 확인' },
    { value: 'VIX → NSI', label: '심리지표 교체 제안 · 채택' },
  ],
  blocks: [
    {
      label: 'SITUATION',
      title: '배경',
      parts: [
        {
          kind: 'list',
          items: [
            '트럼프 2기 보호무역 강화로 글로벌 통상환경의 불확실성 확대',
            '팀은 파급경로를 <b>무역 · 환율, 금융, 심리</b> 세 가지로 구분, 무역 · 환율 경로 담당',
          ],
        },
      ],
    },
    {
      label: 'QUESTION',
      title: '핵심 질문',
      parts: [{ kind: 'question', text: '불확실성이라는 추상적 개념을 어떤 경제지표로 측정하고 설명할 것인가' }],
    },
    {
      label: 'FRAMEWORK',
      title: '분석 구조',
      parts: [
        { kind: 'paragraph', text: '불확실성의 영향을 한 방향으로 설명하지 않고, 경제에 작용하는 두 힘으로 분해' },
        {
          kind: 'exhibit',
          exhibit: {
            no: 1,
            title: '관세 불확실성의 무역 · 환율 경로',
            source: '팀 보고서',
            figure: {
              type: 'paths',
              paths: [
                { tag: '상방 압력', steps: ['위험회피 심리 확대', '달러 강세 · 원화 약세', '수입 원자재 가격 상승', '국내 물가 상승'] },
                { tag: '하방 압력', muted: true, steps: ['불확실성 확대', '소비 · 투자 연기', '총수요 위축', '실물경기 둔화'] },
              ],
            },
          },
        },
      ],
    },
    {
      label: 'VERIFICATION',
      title: '지표 검증',
      parts: [
        {
          kind: 'cards',
          items: [
            { key: 'COST', title: '원가 → 수익성', body: '원재료 국내공급물가지수와 제조업 평균 매출액영업이익률을 비교해 수입 원가 상승이 기업 수익성에 미치는 영향 분석' },
            { key: 'PASS-THROUGH', title: 'PPI 대비 낮은 CPI 상승폭', body: '기업이 원가 상승분을 소비자에게 즉시 전가하지 못하고 이익률 감소로 흡수하는 가격 전가 구조로 설명' },
          ],
        },
      ],
    },
    {
      label: 'CONTRIBUTION',
      title: '팀 기여',
      parts: [
        {
          kind: 'list',
          items: [
            '초기 심리경로 지표였던 <b>VIX</b>는 주식시장 변동성 기대만 반영해 경제주체 전반의 심리 설명에 한계가 있다고 판단',
            '실물경제와 직결된 심리지표로 <b>뉴스심리지수(NSI)</b> 제안, 교수 면담 · 팀 회의를 거쳐 채택',
            'NSI의 경기지표 선행성을 활용해 불확실성의 실물 파급 과정 설명',
          ],
        },
      ],
    },
  ],
};
