/**
 * 홈 공용 콘텐츠. 사실·수치는 케이스 데이터와 리포트 PDF에 있는 것만 쓴다.
 * 자료가 들어오면 contact·research[].pdf에 값만 넣으면 화면에 나타난다(README 참고).
 */
import type { AboutGroup, ApproachRow, Contact, Credential, ResearchItem, Rich } from './types';

export const site = {
  name: '오승민',
  eyebrow: 'Strategy & Financial Research',
  heroLines: ['<b>산업 구조</b>를 분석하고', '<b>기업가치</b>로 결론 내는 전략 분석가'] as Rich[],
  heroIntro: '산업분석 · 실적 추정 · Valuation · 거시경제 분석 · Credit Risk',
  credentials: [
    { label: 'Education', value: '서강대학교', sub: '유럽문화학과 · 경영학 복수전공' },
    { label: 'Research', value: 'Sogang Wise Investment Club 38기', sub: 'Equity Research · Multi-Asset Macro' },
    { label: 'Experience', value: 'RCI Financial', sub: 'Credit Risk 인턴' },
    { label: 'Advisory', value: 'SG Fenero', sub: 'Information Memorandum 프로젝트' },
  ] as Credential[],
  description: '산업 구조를 분석하고 기업가치로 결론 내는 전략 분석가 오승민의 포트폴리오. 산업분석, Valuation, 거시경제 리서치, 신용리스크 실무 케이스 7건.',
  approach: [
    {
      no: '01', en: 'Define', title: '문제 정의',
      desc: '분석 질문 설정 · 전달 경로 분해',
      example: '관세 불확실성을 <b>물가 상방 · 경기 하방</b> 두 압력으로 분해',
      source: '한국은행 통화정책 경시대회',
    },
    {
      no: '02', en: 'Hypothesize', title: '가설 수립',
      desc: '투자 가설 · 핵심 변수 선정',
      example: '미국 내 유일한 <b>잉곳-to-모듈 수직계열화</b>를 핵심 투자 가설로 설정',
      source: '한화솔루션 Equity Research',
    },
    {
      no: '03', en: 'Analyze', title: '데이터 검증',
      desc: '공시 · 통계 · 대체 데이터로 수치 검증',
      example: '비공시 TPO 단가를 ABS 담보풀로 역산(<b>월 약 $184</b>), PVC 판매량은 회귀식으로 추정',
      source: '한화솔루션 Equity Research',
    },
    {
      no: '04', en: 'Recommend', title: '결론 도출',
      desc: 'Valuation · 투자의견 제시',
      example: 'Peer 3사 EV/EBITDA 평균 10.3배 적용, <b>목표주가 43,300원 · BUY</b>',
      source: '한화솔루션 Equity Research',
    },
  ] as ApproachRow[],
  research: [
    {
      category: 'Equity Research', date: '2026.09', pages: '18p', rating: 'BUY',
      title: '한화솔루션 (009830)', alt: 'Cellf-made Orange',
      view: '목표주가 43,300원. AI 전력 수요와 미국 공급망 규제를 근거로 FTM 영업이익 흑자전환 전망',
      cover: '/reports/covers/hanwha-solutions.jpg', pdf: '/reports/hanwha-solutions.pdf',
    },
    {
      category: 'Macro · FX', date: '2026.05', pages: '14p', rating: 'BUY KRW',
      title: '원화(KRW) 자산군 리서치', alt: '애국합시다',
      view: 'WGBI 편입 자금과 반도체 수출 호조를 근거로 중장기 원화 강세 전망',
      cover: '/reports/covers/krw.jpg', pdf: '/reports/krw.pdf',
    },
    {
      category: 'Macro · Rates', date: '2026.03', pages: '9p', rating: 'Outlook',
      title: '미국 경기 · 통화정책 전망', alt: '걱정은 Kevin Warsh가 Wash~',
      view: '금리 인하와 QT 병행 시 불 스티프닝 전개, 단기채 · 중소형주 비중 확대 제시',
      cover: '/reports/covers/us-macro.jpg', pdf: '/reports/us-macro.pdf',
    },
  ] as ResearchItem[],
  about: [
    {
      heading: 'Education',
      rows: [{ title: '서강대학교', sub: '유럽문화학과 (독일어심화) · 경영학 복수전공' }],
    },
    {
      heading: 'Professional Experience',
      rows: [
        { title: 'RCI Financial · Credit Risk 인턴', sub: '신용리스크 데이터 · 글로벌 규정 현지화 · 내부통제' },
        { title: 'SG Fenero · Information Memorandum', sub: '산업분석 · Investment Highlights 작성', meta: '2025' },
      ],
    },
    {
      heading: 'Activities & Awards',
      rows: [
        { title: 'Sogang Wise Investment Club 38기', sub: 'Multi-Asset Macro · Equity Research', meta: '2026' },
        { title: '산업분석 스터디 조직 · 팀장', sub: 'HD현대중공업 분석 · Valuation', meta: '2026 여름' },
        { title: '한국은행 통화정책 경시대회', sub: '무역 · 환율 경로 분석', meta: '2025' },
        { title: '교내 대회 AI/SW 특별상 · 인기상', sub: 'Moon, Sun, Power' },
      ],
    },
  ] as AboutGroup[],
  contact: { email: 'dhtmdals4@naver.com', linkedin: 'https://www.linkedin.com/in/seungmin-oh-8ab8a3351/' } as Contact,
};
