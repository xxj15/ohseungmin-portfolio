/**
 * 홈 공용 콘텐츠. 문구는 docs/superpowers/mockups/home-v8.html이 확정본이다.
 * 자료가 들어오면 contact·research[].pdf에 값만 넣으면 화면에 나타난다(README 참고).
 */
import type { AboutGroup, ApproachRow, Contact, ResearchItem, Rich } from './types';

export const site = {
  name: '오승민',
  eyebrow: '오승민 · Strategy & Financial Research',
  heroLines: ['<b>산업 구조</b>를 분석하고', '<b>기업가치</b>로 결론 내는 전략 분석가'] as Rich[],
  heroFacts: '서강대학교 · Sogang Wise Investment Club 38기 · RCI Financial Credit Risk 인턴 · SG Fenero IM 프로젝트',
  /** 경력 띠: 누르면 해당 경험으로 이동. SWIC는 케이스가 둘(한화솔루션 · 매크로)이라 리서치 섹션으로 보낸다. */
  experience: [
    { name: 'RCI Financial', href: '/work/rci-financial/' },
    { name: 'SG Fenero', href: '/work/confidential-im/' },
    { name: 'Sogang Wise Investment Club', href: '/#research' },
    { name: '한국은행 통화정책 경시대회', href: '/work/bok-competition/' },
    { name: 'Moon, Sun, Power', href: '/work/moon-sun-power/' },
    { name: '산업분석 스터디', href: '/work/hd-hyundai-heavy/' },
  ] as { name: string; href: string }[],
  description: '산업 구조를 분석하고 기업가치로 결론 내는 전략 분석가 오승민의 포트폴리오. 산업분석, Valuation, 거시경제 리서치, 신용리스크 실무 케이스 7건.',
  approach: [
    { no: '01', title: '문제 정의', en: 'DEFINE', body: '관세 불확실성을 물가 상방 압력과 경기 하방 압력, 두 경로로 분해', source: '한국은행 통화정책 경시대회' },
    { no: '02', title: '가설 수립', en: 'HYPOTHESIZE', body: '미국 내 유일한 잉곳-to-모듈 수직계열화를 핵심 투자 가설로 설정', source: '한화솔루션 Equity Research' },
    { no: '03', title: '데이터 검증', en: 'ANALYZE', body: '비공시 TPO 계약 단가를 ABS 담보풀 데이터로 역산 (월 약 184달러), PVC 판매량은 회귀식으로 추정', source: '한화솔루션 Equity Research' },
    { no: '04', title: '결론 도출', en: 'RECOMMEND', body: 'Peer 3사 Forward EV/EBITDA 평균 10.3배 적용, 목표주가 43,300원 · BUY', source: '한화솔루션 Equity Research' },
  ] as ApproachRow[],
  research: [
    { tag: 'EQUITY · 한화솔루션 · 2026.09 · 18p', title: 'Cellf-made Orange', summary: 'AI 전력 수요 확대와 미국 공급망 규제를 근거로 흑자전환 전망, BUY 의견 제시' },
    { tag: 'MACRO · 원화(KRW) · 2026.05 · 14p', title: '애국합시다', summary: 'WGBI 편입 자금과 반도체 수출 호조를 근거로 중장기 원화 강세 전망' },
    { tag: 'MACRO · 미국 경기 · 2026.03 · 9p', title: '걱정은 Kevin Warsh가 Wash~', summary: '금리 인하와 QT 병행 시나리오에서 불 스티프닝 전개, 단기채·중소형주 비중 확대 제시' },
  ] as ResearchItem[],
  about: [
    {
      heading: '학력 · 활동',
      rows: [
        { label: '학력', value: '서강대학교', sub: '유럽문화학과 (독일어권 심화) · 경영학 복수전공' },
        { label: '금융학회', value: 'Sogang Wise Investment Club 38기', sub: 'Multi-Asset Macro · Equity Research' },
        { label: '스터디', value: '산업분석 스터디 조직 · 팀장', sub: '2026 여름' },
      ],
    },
    {
      heading: '경력 · 수상',
      rows: [
        { label: '인턴', value: 'RCI Financial · Credit Risk' },
        { label: '프로젝트', value: 'SG Fenero · Information Memorandum' },
        { label: '수상', value: '교내 대회 AI/SW 특별상 · 인기상', sub: 'Moon, Sun, Power' },
        { label: '대회', value: '2025 한국은행 통화정책 경시대회' },
      ],
    },
  ] as AboutGroup[],
  contact: { linkedin: 'https://www.linkedin.com/in/seungmin-oh-8ab8a3351/' } as Contact,
};
