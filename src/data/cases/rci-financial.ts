import type { CaseStudy } from '../types';

export const rciFinancial: CaseStudy = {
  slug: 'rci-financial',
  no: '03',
  card: {
    category: 'CREDIT RISK · 자동차금융',
    org: 'RCI FINANCIAL',
    role: 'Credit Risk 인턴 · 프로젝트 일정 관리',
    title: '프랑스 본사 리스크 규정 현지화 프로젝트 관리',
    summary: '부서별 절차서 작성 마일스톤을 수립하고 운영본부 주간 회의를 주관했으며, Local Risk Committee에 진행 현황을 보고했습니다.',
    outcome: 'Local Procedure 7건 기한 내 제정',
  },
  eyebrow: 'Credit Risk · 자동차금융 · 인턴십',
  title: '글로벌 리스크 규정 현지화와 내부통제 프로젝트',
  org: 'RCI Financial · Credit Risk팀',
  facts: [
    { label: 'ROLE', value: 'Credit Risk 인턴' },
    { label: 'SCOPE', value: '신용리스크 데이터 · 규정 현지화 · 내부통제' },
    { label: 'TOOLS', value: 'SQL · Excel' },
    { label: 'DELIVERABLE', value: '금감원 제출 자료 · Local Procedure · 체크리스트' },
  ],
  kpis: [
    { value: '7', unit: '/ 7', label: 'Local Procedure 기한 내 제정' },
    { value: '4', unit: '개', label: '참여 프로젝트' },
    { value: 'SQL', label: 'LTV · 계약기간 규정 위반 검증' },
    { value: 'IFRS 9', label: 'Forbearance 관리체계 검토' },
  ],
  blocks: [
    {
      label: 'SITUATION',
      title: '배경',
      parts: [
        {
          kind: 'list',
          items: [
            '자동차금융은 차주 상환능력, 담보 차량 가치, 대출 조건에 따라 신용위험이 달라지는 사업',
            'Credit Risk팀은 포트폴리오 데이터로 리스크를 점검하고 <b>본사 규정 · 국내 규제 준수 여부</b>를 관리',
            '프랑스 본사 감사와 글로벌 규정 현지화가 동시에 진행되던 시기',
          ],
        },
      ],
    },
    {
      label: 'WORKSTREAMS',
      title: '수행 업무',
      parts: [
        {
          kind: 'workstreams',
          items: [
            {
              key: '01 · REPORTING',
              title: 'DSR 분석 · 대외보고',
              bullets: [
                '대출 원천데이터를 대출 종류 · 소득 · 신용점수 · 연령별로 분류',
                'Pivot Table로 그룹별 평균 · 최대 DSR 산출, 금융감독원 제출 자료 작성',
                '신용정보 대외보고 오류코드와 데이터 불일치 점검, 원인 확인',
              ],
            },
            {
              key: '02 · PROJECT',
              title: 'Global Procedure 현지화',
              bullets: [
                '주요 마일스톤 수립, 부서별 절차서 작성 현황 · 일정 관리',
                '운영본부 주간 회의 주관, 지연 가능 업무 사전 파악 · 조율',
                'Local Risk Committee에서 경영진 대상 진행 현황 보고',
              ],
              result: 'Local Procedure 7건 기한 내 제정',
            },
            {
              key: '03 · CONTROL',
              title: 'First Level of Control',
              bullets: [
                '본사 감사 전 규정별 점검 항목과 증빙자료 정리, Action Plan 수립',
                'SQL로 신차 · 중고차 금융의 LTV와 최대 계약기간 규정 위반 여부를 실제 포트폴리오에서 검증',
              ],
            },
            {
              key: '04 · FRAMEWORK',
              title: 'Forbearance 관리체계',
              bullets: [
                'EBA 가이드라인 · IFRS 9 기준 분류 기준과 사후 모니터링 요건 정리, 장표화',
                '신규 분류 규칙의 시스템 반영 데이터 요건 · 단계별 Action Plan 정리',
                '실무용 Excel 체크리스트 개발',
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'PROCESS',
      title: '현지화 프로젝트 진행',
      parts: [
        {
          kind: 'exhibit',
          exhibit: {
            no: 1,
            title: 'Global Procedure 현지화 진행',
            figure: {
              type: 'flow',
              highlightLast: true,
              steps: [
                { key: 'STEP 1', title: '마일스톤 수립', note: '부서별 일정 · 담당 확정' },
                { key: 'STEP 2', title: '현황 관리', note: '절차서 작성 진척 추적' },
                { key: 'STEP 3', title: '주간 회의 주관', note: '지연 업무 사전 조율' },
                { key: 'STEP 4', title: 'Committee 보고', note: '경영진 대상 진행 보고' },
                { key: 'RESULT', title: '7건 제정', note: '전 건 기한 내 완료' },
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
          kind: 'list',
          items: [
            '핵심 Local Procedure <b>7건 전부 기한 내 제정</b>',
            '규제 조건을 문서가 아닌 <b>실제 대출 데이터로 검증</b>하는 내부통제 수행',
            '복잡한 금융규제를 실무 절차와 체크리스트로 전환',
          ],
        },
      ],
    },
  ],
};
