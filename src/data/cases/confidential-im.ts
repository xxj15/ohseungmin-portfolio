import type { CaseStudy } from '../types';

/** 고객사 보호: 회사명 · 장표 원본 · 세부 수치를 쓰지 않는다(spec §7). */
export const confidentialIm: CaseStudy = {
  slug: 'confidential-im',
  no: '05',
  name: 'Confidential',
  card: {
    category: 'M&A ADVISORY · 미용의료기기',
    org: 'CONFIDENTIAL',
    role: 'IM 작성 참여 · 산업분석, 장표 제작',
    title: '미용의료기기 기업 IM의 산업분석과 Investment Highlights 작성',
    summary: 'EBD 4개 기술군으로 산업 구조를 정리하고, Peer 대비 재고·현금전환 지표를 비교해 투자 포인트를 도출했습니다.',
    outcome: 'Investment Highlights 1·4·5번 작성',
  },
  eyebrow: 'M&A Advisory · 미용의료기기 · 2025',
  title: '미용의료기기 기업 IM의 산업분석과 Investment Highlights 작성',
  org: 'Confidential · SG Fenero 프로젝트',
  facts: [
    { label: 'ROLE', value: 'IM 작성 참여' },
    { label: 'SCOPE', value: '산업분석 · Peer 재무 비교 · 장표 제작' },
    { label: 'ORGANIZATION', value: 'SG Fenero' },
    { label: 'DELIVERABLE', value: 'Information Memorandum (비공개)' },
  ],
  kpis: [
    { value: '3', unit: '개', label: 'Investment Highlights 담당 (1 · 4 · 5번)' },
    { value: '4', unit: '개', label: 'EBD 기술군 분류' },
    { value: 'DIO · CCC', label: '핵심 분석 지표' },
    { value: 'Peer', label: '재무지표 비교 기준 통일' },
  ],
  blocks: [
    {
      label: 'NOTE',
      title: '공개 범위',
      parts: [{ kind: 'notice', text: '고객사 보호를 위해 회사명, 장표 원본, 세부 수치는 공개하지 않습니다. 수행한 분석의 구조와 접근 방식만 정리했습니다.' }],
    },
    {
      label: 'SITUATION',
      title: '배경',
      parts: [
        {
          kind: 'list',
          items: [
            '투자자에게 대상회사의 사업구조, 경쟁력, 재무 특성, 투자 매력도를 전달하는 <b>IM 작성</b> 프로젝트',
            '정보 나열이 아니라 <b>투자자가 주목할 투자 포인트</b>를 도출하고 정량 근거로 뒷받침하는 것이 목표',
          ],
        },
      ],
    },
    {
      label: 'INDUSTRY',
      title: '산업분석',
      parts: [
        {
          kind: 'list',
          items: [
            '시술 효과 유지를 위한 <b>재방문 수요</b>로 고객 기반이 안정적이고 경기 민감도가 상대적으로 낮다는 점에 주목',
            'Energy-Based Device(EBD)를 에너지원에 따라 4개 기술군으로 분류',
          ],
        },
        {
          kind: 'exhibit',
          exhibit: {
            no: 1,
            title: 'EBD 기술군 분류',
            source: '자체 정리',
            caption: '기술마다 시술 목적과 목표 피부층이 달라, 시장을 단일 제품 경쟁이 아닌 <b>제품 포트폴리오 경쟁</b>으로 설명',
            figure: {
              type: 'flow',
              arrows: false,
              steps: [
                { key: 'LASER', title: '레이저' },
                { key: 'RF', title: '고주파' },
                { key: 'MNRF', title: '마이크로니들 고주파' },
                { key: 'HIFU', title: '고강도 집속 초음파' },
              ],
            },
          },
        },
      ],
    },
    {
      label: 'HIGHLIGHTS',
      title: 'Investment Highlights',
      parts: [
        {
          kind: 'cards',
          items: [
            { key: 'BENCHMARK', title: 'Peer 재무 비교', body: '매출 규모 · 수익성 · 운전자본 · 현금흐름 지표를 비교. 기업별 규모 차이를 고려해 산출 기준 통일' },
            { key: 'WORKING CAPITAL', title: 'DIO · CCC 분석', body: 'Peer 대비 낮은 재고자산회전일수와 짧은 현금전환주기의 원인을 Lean 공정의 재고 효율성에서 도출' },
            { key: 'NARRATIVE', title: '수치의 사업적 원인 설명', body: '지표의 절대 수준보다 그 수치가 나온 이유에 집중. 영업현금흐름 확대와 운전자본 효율성을 하나의 논리로 연결' },
            { key: 'STORYLINE', title: '메시지 우선 장표 구성', body: '장표마다 핵심 메시지를 먼저 정하고, 이를 뒷받침하는 지표만 배치. 논리 구조와 시각 일관성 유지' },
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
          items: ['IM Investment Highlights <b>1 · 4 · 5번 장표 작성</b>', '산업 특성 장표(수요 구조 · 기술군 분류) 담당'],
        },
      ],
    },
  ],
};
