import type { CaseStudy } from '../types';

export const swicMacro: CaseStudy = {
  slug: 'swic-macro',
  no: '07',
  name: 'SWIC Macro',
  card: {
    category: 'MACRO RESEARCH · 금리·외환',
    org: 'SWIC Multi-Asset Macro',
    role: '개인 리포트 2건 작성 · 발표',
    title: '미국 통화정책 전망과 원화 자산군 리서치',
    summary: '금리 인하 · QT 병행 시 미국 금리 커브, WGBI 편입 · 반도체 수출이 원화에 미치는 영향 분석',
    outcome: '원화 BUY · 불 스티프닝 전망',
  },
  eyebrow: 'Macro Research · 금리 · 외환 · 2026',
  title: '미국 통화정책 전망과 원화 자산군 리서치',
  org: 'SWIC Multi-Asset Macro 팀',
  facts: [
    { label: 'ROLE', value: '개인 리포트 2건 작성 · 발표' },
    { label: 'PERIOD', value: '2026.03 · 2026.05' },
    { label: 'ORGANIZATION', value: 'SWIC Multi-Asset Macro' },
    { label: 'DELIVERABLE', value: '리포트 9p · 14p', links: [{ text: '미국 경기 9p ↗', href: '/reports/us-macro.pdf' }, { text: '원화 14p ↗', href: '/reports/krw.pdf' }] },
  ],
  kpis: [
    { value: '2', unit: '건', label: '개인 리포트' },
    { value: '23', unit: 'p', label: '총 분량' },
    { value: 'BUY', label: '원화(KRW) 투자의견' },
    { value: '불 스티프닝', label: '미국 금리 커브 전망' },
  ],
  blocks: [
    {
      label: 'REPORTS',
      title: '리포트',
      parts: [
        {
          kind: 'reports',
          items: [
            {
              meta: 'MACRO · 2026.03 · 9p',
              title: '걱정은 Kevin Warsh가 Wash~',
              question: '금리 인하와 양적긴축(QT)이 동시에 진행되면 금리 커브는 어떻게 움직이는가',
              points: ['워시 체제의 금리 인하 + QT 혼합형 통화정책', '중간선거를 앞둔 행정부의 지정학 리스크 관리 유인', '에너지 자립도에 기반한 미국의 AI 시대 경쟁 우위'],
              conclusion: '불 스티프닝 전개 → 중소형주 · 단기채 중심, 원자재 비중 소폭 확대',
            },
            {
              meta: 'MULTI-ASSET · 2026.05 · 14p',
              title: '애국합시다',
              question: '원·달러 1,500원은 새로운 기준(뉴노멀)인가',
              points: [
                '대외: 한·미 금리차 축소, 미국 재정 부담과 실질금리 하락 유인, 엔화 커플링',
                '대내: WGBI 편입, 반도체 수출 호조, 증시 리레이팅 · IBKR 리테일 자금',
                '리스크: 비기축통화 변동성, 재정 확장',
              ],
              conclusion: '단기 변동성 지속, 중장기 원화 강세 · BUY KRW',
            },
          ],
        },
      ],
    },
    {
      label: 'EVIDENCE',
      title: '근거 데이터',
      parts: [
        {
          kind: 'exhibit',
          exhibit: {
            no: 1,
            title: 'WGBI 편입 첫 달 외국인 국고채 순매수',
            source: '애국합시다 리포트',
            figure: {
              type: 'hbars',
              rows: [
                { label: "'26.04 외국인 국고채 순매수", value: '10.1조 원', width: 100, tone: 'pos' },
                { label: '예년 월평균', value: '4.7조 원', width: 46.5, tone: 'base' },
              ],
            },
          },
        },
        { kind: 'paragraph', text: '일본 투자자 환헤지 비율 64% → 46% 하락을 근거로, 해외 기관이 <b>원화 강세에 따른 환차익</b>까지 기대하기 시작했다고 해석' },
      ],
    },
    {
      label: 'APPROACH',
      title: '분석 방식',
      parts: [
        {
          kind: 'list',
          items: [
            '개별 지표의 방향 예측이 아니라 <b>통화정책 · 실물경제 · 금융시장의 상호작용</b>으로 시나리오 구성',
            '대외 · 대내 요인을 분리해 각각 환율에 미치는 경로를 검토한 뒤 종합',
            '개인 · 팀 리포트 작성 후 학회 발표로 전망 공유',
          ],
        },
      ],
    },
  ],
};
