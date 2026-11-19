/**
 * 홈 Work 섹션 전용 데이터. 상세 내용은 cases/*.ts, 여기는 홈에서 보여줄 요약만 둔다.
 * 수치는 모두 케이스 데이터 또는 리포트 원문에 있는 값이다(새로 만들지 않는다).
 */
import type { CaseSlug } from './types';

/** 대표 프로젝트: 한화솔루션 Equity Research */
export const featuredHanwha = {
  slug: 'hanwha-solutions' as CaseSlug,
  category: 'Equity Research / Energy',
  org: '한화솔루션',
  ticker: '009830 KS',
  title: '미국 태양광 공급망 재편에 따른 기업가치 분석',
  thesis: '미국 내 유일한 잉곳-to-모듈 수직계열화가 AMPC 세액공제 확대와 모듈 ASP 상승으로 이어져, FTM 영업이익 흑자전환',
  role: '단독 작성 · 산업분석 · 실적 추정 · Valuation',
  /** 리포트 투자포인트 3개 */
  drivers: [
    { key: '수직계열화', text: '미국 내 유일한 잉곳-to-모듈 생산, AMPC 누적 수령' },
    { key: 'Price', text: '수입 하한가 + DCA 프리미엄으로 미국 모듈 ASP 상승' },
    { key: 'Quantity', text: '비중국 공급망 점유율 확대, 개발 · EPC까지 매출 범위 확대' },
  ],
  rating: 'BUY',
  target: '43,300',
  current: '33,350',
  upside: '+30%',
  asOf: '2026.09',
  pdf: '/reports/hanwha-solutions.pdf',
  /** 리포트 1p 추정손익계산서의 영업이익 (단위: 십억 원) */
  opIncome: {
    unit: '영업이익 · 십억 원',
    source: 'SWIC 리포트 추정손익계산서',
    bars: [
      { label: "'23", value: 580 },
      { label: "'24", value: -300 },
      { label: "'25", value: -344 },
      { label: 'LTM', value: -98 },
      { label: 'FTM', value: 1737, highlight: true },
    ],
  },
};

/** 두 번째 줄 2열 카드: SG Fenero(비공개) · RCI Financial */
export const featuredIm = {
  slug: 'confidential-im' as CaseSlug,
  category: 'M&A Advisory',
  org: 'SG Fenero',
  title: '미용의료기기 산업분석 및 Investment Highlights',
  contribution: '산업 구조 분석, Peer 재무지표 비교, 투자 포인트 장표 작성',
  result: 'Investment Highlights 1 · 4 · 5 작성',
  /** 산업 구조: Energy-Based Device를 에너지원에 따라 4개 기술군으로 분류 */
  segments: [
    { key: 'Laser', note: '레이저' },
    { key: 'RF', note: '고주파' },
    { key: 'MNRF', note: '마이크로니들 고주파' },
    { key: 'HIFU', note: '고강도 집속 초음파' },
  ],
  metrics: ['DIO', 'CCC', 'OCF'],
};

export const featuredRci = {
  slug: 'rci-financial' as CaseSlug,
  category: 'Credit Risk / Automotive Finance',
  org: 'RCI Financial',
  title: '글로벌 리스크 규정 현지화 프로젝트',
  contribution: '부서별 일정 관리, 운영본부 주간 회의 주관, Local Risk Committee 진행 현황 보고',
  result: 'Local Procedure 7건 기한 내 제정',
  steps: ['마일스톤 수립', '진척 추적', '주간 회의 주관', 'Committee 보고'],
  procedures: 7,
};

/** 나머지 4개: 간결한 에디토리얼 리스트 */
export const additionalWork: { slug: CaseSlug; category: string; org: string; subject: string; result: string }[] = [
  {
    slug: 'hd-hyundai-heavy',
    category: 'Industry Research · Shipbuilding',
    org: 'HD현대중공업',
    subject: '고선가 LNG선 수주잔고의 매출 인식 시점과 Peer 대비 수익성 개선 속도',
    result: 'Trading Comps · DCF 모델 단독 구축, 산업분석 스터디 조직',
  },
  {
    slug: 'bok-competition',
    category: 'Economic Research · Macro',
    org: '한국은행 통화정책 경시대회',
    subject: '미국 관세정책 불확실성이 국내 물가와 경기에 전달되는 경로',
    result: '심리지표 VIX → 뉴스심리지수(NSI) 교체 제안 · 채택',
  },
  {
    slug: 'swic-macro',
    category: 'Macro Research · Rates & FX',
    org: 'SWIC Multi-Asset Macro',
    subject: '금리 인하 · QT 병행 시 미국 금리 커브와 원화 방향성',
    result: '원화 BUY · 불 스티프닝 전망, 개인 리포트 2건',
  },
  {
    slug: 'moon-sun-power',
    category: 'Product Strategy · EdTech',
    org: 'Moon, Sun, Power',
    subject: '관심사 기반 AI 문해력 학습 서비스 기획 · 프롬프트 설계',
    result: '월 최대 방문자 9,400명, 출시 후 1년 운영',
  },
];
