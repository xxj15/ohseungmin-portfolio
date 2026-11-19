/** 케이스 7개 — 상세 페이지 번호 · 이전/다음 순서의 단일 출처(01 → 07).
 *  홈 Work 섹션 순서와 같다: Featured(한화솔루션 · SG Fenero · RCI) → Additional(HD · 한국은행 · SWIC · MSP). */
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
  confidentialIm,
  rciFinancial,
  hdHyundaiHeavy,
  bokCompetition,
  swicMacro,
  moonSunPower,
];
