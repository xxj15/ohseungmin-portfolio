import type { CaseStudy } from '../types';

export const hanwhaSolutions: CaseStudy = {
  slug: 'hanwha-solutions',
  no: '01',
  name: '한화솔루션',
  card: {
    category: 'EQUITY RESEARCH · 태양광',
    org: '한화솔루션',
    role: '단독 작성 · 산업분석, 실적 추정, Valuation',
    title: '미국 태양광 공급망 재편에 따른 실적 추정과 기업가치 평가',
    summary: 'AMPC 세액공제, 모듈 ASP, 비중국 공급망 점유율을 P×Q로 분해해 FTM 실적을 추정하고, EV/EBITDA로 목표주가를 산출했습니다.',
    outcome: '목표주가 43,300원 · BUY',
    outcomeSub: '상승여력 30% (2026.09 기준)',
  },
  eyebrow: 'Equity Research · 태양광 · 2026.09',
  title: '미국 태양광 공급망 재편에 따른 실적 추정과 기업가치 평가',
  org: '한화솔루션 (009830 KS)',
  facts: [
    { label: 'ROLE', value: '단독 작성' },
    { label: 'SCOPE', value: '산업분석 · 실적 추정 · Valuation' },
    { label: 'ORGANIZATION', value: 'SWIC Equity Research' },
    { label: 'DELIVERABLE', value: '리포트 18p' },
  ],
  kpis: [
    { value: '43,300', unit: '원', label: '목표주가 · BUY' },
    { value: '+30', unit: '%', label: '상승여력 (현재가 33,350원)' },
    { value: '1조 7,361', unit: '억', label: 'FTM 영업이익 · LTM -980억에서 흑자전환' },
    { value: '10.3', unit: 'x', label: 'Target EV/EBITDA (Peer 3사 평균)' },
  ],
  blocks: [
    {
      label: 'SITUATION',
      title: '배경',
      parts: [
        {
          kind: 'list',
          items: [
            '글로벌 태양광 시장은 중국 공급과잉으로 <b>밸류체인 전반의 가격이 원가 이하</b>까지 하락',
            '미국은 Section 232(최저수입가격·관세)로 수입을 제한하고, Section 45X(AMPC)로 <b>현지 생산에 세액공제</b> 지급',
            'OBBBA 이후 중국계 공급망(PFE) 비중이 세액공제 적격성을 좌우, <b>미국 내 비중국 공급망</b>의 가치 상승',
          ],
        },
      ],
    },
    {
      label: 'QUESTION',
      title: '핵심 질문',
      parts: [{ kind: 'question', text: "'25년 영업적자 3,440억 원을 낸 한화솔루션이 미국 정책 환경에서 흑자전환할 수 있는가" }],
    },
    {
      label: 'THESIS',
      title: '투자 가설',
      parts: [
        {
          kind: 'thesis',
          items: [
            { tag: '01 · 수직계열화', title: '미국 내 유일한 잉곳-to-모듈 생산체계', body: 'Cartersville 업스트림 가동으로 모듈 외에 셀·웨이퍼 AMPC까지 누적 수령. 가동률 정상화에 따른 이익 레버리지.' },
            { tag: '02 · Price', title: '미국 모듈 ASP 상승', body: '중국 증치세 환급 폐지로 글로벌 가격 바닥 상승, 미국은 수입 하한가 + DCA 프리미엄. 판매량 80% 이상이 미국향.' },
            { tag: '03 · Quantity', title: '비중국 공급망 점유율 확대', body: '규제로 밀려난 중국·동남아산 물량을 현지 생산업체가 흡수. 개발·EPC까지 이어지는 매출 범위 확대.' },
          ],
        },
        {
          kind: 'exhibit',
          exhibit: {
            no: 1,
            title: '미국 내 CAPA 확대에 따른 AMPC 수령액 (억 원)',
            source: "한화솔루션, SWIC 추정 · '24A 대비 '27F 2.04배",
            figure: {
              type: 'bars',
              bars: [
                { label: '24A', value: 5551, display: '5,551' },
                { label: '25A', value: 5360, display: '5,360' },
                { label: '26E', value: 9720, display: '9,720', highlight: true },
                { label: '27F', value: 11332, display: '11,332', highlight: true },
              ],
            },
          },
        },
      ],
    },
    {
      label: 'APPROACH',
      title: '추정 방법',
      parts: [
        {
          kind: 'cards',
          items: [
            { key: 'ASP', title: '미국 모듈 목표 판가', body: 'MIP $0.38/W × (1 + 관세 15%) = $0.437/W<br>+ DCA 프리미엄 5% = <b>$0.459/W</b>', note: '장기계약 시차를 반영해 2Q26 $0.30/W에서 4개 분기에 걸쳐 단계적 상승 가정' },
            { key: 'TPO', title: '비공시 구독 단가 역산', body: 'ABS 담보풀 15,555건 · 자산잔액 3.861억 달러<br>만기 300개월 · 할인율 7.5% → <b>월 약 $184</b>', note: 'ClearLight Nebo Issuer 2026-1 ABS(KBRA) 자료 기준' },
            { key: 'REGRESSION', title: '중국 PVC 판매량', body: '판매량 증감률 = 1.3% + <b>0.435</b> × 중국 부동산 개발투자 증감률', note: '3Q26 부동산 투자 -21.6% 대입 → 판매량 -8.1%' },
            { key: 'AMPC', title: '공정별 세액공제 산출', body: '모듈 · 셀 · 웨이퍼 가동률을 각각 가정해 합산<br>FTM <b>1조 1,066억 원</b> (LTM 대비 +5,045억)', note: '과거 AMPC 인식액으로 실제 생산량과 가동률(94.3%) 역산' },
          ],
        },
      ],
    },
    {
      label: 'VALUATION',
      title: '기업가치 평가',
      parts: [
        { kind: 'paragraph', text: '순이익은 일회성 항목 영향이 크고, AMPC가 매출원가에서 차감되는 구조라 <b>EV/EBITDA</b>를 적용. Peer는 사업 구조가 유사한 결정질 실리콘 태양광 제조사 3곳으로 구성.' },
        {
          kind: 'exhibit',
          exhibit: {
            no: 2,
            title: 'Peer Group과 Target Multiple',
            figure: {
              type: 'table',
              head: ['PEER', '선정 근거', 'FWD EV/EBITDA'],
              rows: [
                { cells: ['HD현대에너지솔루션', '국내 결정질 실리콘 모듈 제조', '7.5x'] },
                { cells: ['Canadian Solar', '모듈 + 발전 개발 · ESS', '10.0x'] },
                { cells: ['T1 Energy', '미국 내 모듈 · 셀 생산, AMPC 수혜', '13.5x'] },
                { cells: ['First Solar', 'CdTe 박막 · 순수 제조사로 제외', '–'], tone: 'strike' },
                { cells: ['Target Multiple', '3사 평균', '10.3x'], tone: 'total' },
              ],
            },
          },
        },
        {
          kind: 'exhibit',
          exhibit: {
            no: 3,
            title: '주주가치 산출 (억 원)',
            figure: {
              type: 'hbars',
              rows: [
                { label: 'FTM EBITDA × 10.3x', value: '267,103', width: 100, tone: 'pos' },
                { label: '(-) 순차입금', value: '-141,766', width: 53, offset: 47, tone: 'neg' },
                { label: '(-) 비지배지분', value: '-27,580', width: 10, offset: 37, tone: 'neg' },
                { label: '(-) 우선주 시가총액', value: '-428', width: 1, offset: 36.5, tone: 'neg' },
                { label: '보통주 주주가치', value: '97,329', width: 36.4, tone: 'pos', total: true },
              ],
              result: { label: '÷ 발행주식수 2억 2,489만 주', value: '43,300원' },
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
          headline: '목표주가 43,300원 · 투자의견 BUY',
          body: '산업분석, 기업분석, 실적 추정, Valuation, 최종 작성 전 과정 단독 수행',
          cover: { org: 'SWIC', rating: 'BUY', name: '한화솔루션' },
        },
      ],
    },
  ],
};
