import type { CaseStudy } from '../types';

export const moonSunPower: CaseStudy = {
  slug: 'moon-sun-power',
  no: '04',
  name: 'Moon, Sun, Power',
  card: {
    category: 'STRATEGY · EDTECH',
    org: 'Moon, Sun, Power',
    role: '프롬프트 엔지니어링 · 서비스 운영',
    title: 'AI 맞춤형 문해력 학습 플랫폼 기획·운영',
    summary: '관심사를 입력하면 지문과 독해 문제를 만들어 주는 웹 서비스의 Few-shot 프롬프트 설계, 출시 후 1년간 운영',
    outcome: '월 최대 방문자 9,400명',
    outcomeSub: '교내 대회 AI/SW 특별상 · 인기상',
  },
  eyebrow: 'Strategy · EdTech · 개발 3개월 · 운영 1년',
  title: 'AI 맞춤형 문해력 학습 플랫폼 기획·운영',
  org: 'Moon, Sun, Power',
  facts: [
    { label: 'ROLE', value: '프롬프트 엔지니어링 · 서비스 운영' },
    { label: 'TEAM', value: '팀 프로젝트' },
    { label: 'PERIOD', value: '개발 약 3개월 · 운영 약 1년' },
    { label: 'AWARD', value: '교내 대회 AI/SW 특별상 · 인기상' },
  ],
  kpis: [
    { value: '9,400', unit: '명', label: '월 최대 방문자 (Google Analytics)' },
    { value: '3', unit: '개월', label: '개발 기간' },
    { value: '1', unit: '년', label: '출시 후 운영' },
    { value: '2', unit: '개', label: '교내 대회 수상' },
  ],
  blocks: [
    {
      label: 'SITUATION',
      title: '배경',
      parts: [
        {
          kind: 'list',
          items: [
            '문해력 저하가 사회 문제로 대두, 원인 중 하나로 <b>충분한 독서 경험의 부족</b>에 주목',
            '독서 흥미는 개인 관심사에 따라 다르게 형성되므로 <b>모든 사용자에게 같은 콘텐츠</b>를 주는 방식에는 한계',
          ],
        },
      ],
    },
    {
      label: 'QUESTION',
      title: '핵심 질문',
      parts: [{ kind: 'question', text: '독서를 권장하는 대신, 사용자가 스스로 글을 읽게 만들 수 있는 구조는 무엇인가' }],
    },
    {
      label: 'SOLUTION',
      title: '서비스 구조',
      parts: [
        {
          kind: 'exhibit',
          exhibit: {
            no: 1,
            title: '서비스 흐름',
            figure: {
              type: 'flow',
              highlightLast: true,
              steps: [
                { key: 'INPUT', title: '관심 주제 입력', note: '사용자가 직접 입력' },
                { key: 'PROMPT', title: 'Few-shot 프롬프트', note: '생성 기준 구체화' },
                { key: 'TEXT', title: '맞춤 지문 생성', note: '관심사 기반' },
                { key: 'QUIZ', title: '독해 문제 생성', note: '객관식 문항' },
                { key: 'RESULT', title: '읽기 경험 확대', note: '진입장벽 완화' },
              ],
            },
          },
        },
        {
          kind: 'exhibit',
          exhibit: {
            no: 2,
            title: '서비스 화면 · 지문 읽기와 문제 풀이',
            figure: { type: 'image', src: '/images/msp-service.png', alt: 'Moon, Sun, Power 지문 · 문제 풀이 화면' },
          },
        },
      ],
    },
    {
      label: 'EXECUTION',
      title: '실행',
      parts: [
        {
          kind: 'cards',
          items: [
            { key: 'PROMPT', title: '프롬프트 설계 자청', body: '팀에 담당자가 없어 방향 변경 위기. 전문서적으로 생성형 AI 원리를 학습하고 Few-shot 기법으로 지문 · 문제 생성 기준 구체화' },
            { key: 'QUALITY', title: '정확성 · 객관성 개선', body: '생성 결과를 반복 검토하며 프롬프트 수정, 지문과 문항의 정확도 개선' },
            { key: 'TEAM', title: '피드백 Ground Rule', body: '친분으로 비판적 피드백이 어려운 문제를 발견, 업데이트마다 구체적 피드백을 주고받는 규칙 도입' },
            { key: 'OPERATION', title: '출시 후 운영', body: '어린이날 이벤트, 시즌별 콘텐츠 기획 · 업데이트로 재방문 유도' },
          ],
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
            'Google Analytics 기준 <b>월 최대 방문자 9,400명</b>',
            '교내 대회 <b>AI/SW 특별상 · 인기상</b> 수상',
            '개발 후 제출로 끝내지 않고 <b>약 1년간 직접 운영</b>',
          ],
        },
      ],
    },
  ],
};
