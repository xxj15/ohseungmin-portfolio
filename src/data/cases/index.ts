/** 케이스 7개 — 홈 레일 · 상세 페이지 · 이전/다음 순서의 단일 출처(01 → 07). */
import type { CaseStudy } from '../types';
import { hanwhaSolutions } from './hanwha-solutions';
import { hdHyundaiHeavy } from './hd-hyundai-heavy';
import { rciFinancial } from './rci-financial';
import { moonSunPower } from './moon-sun-power';
import { confidentialIm } from './confidential-im';
import { bokCompetition } from './bok-competition';
import { swicMacro } from './swic-macro';

export const cases: readonly CaseStudy[] = [
  hanwhaSolutions,
  hdHyundaiHeavy,
  rciFinancial,
  moonSunPower,
  confidentialIm,
  bokCompetition,
  swicMacro,
];
