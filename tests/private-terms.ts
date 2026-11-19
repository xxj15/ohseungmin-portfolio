/** 비공개 고객사 이름. 저장소가 공개되므로 평문으로 적지 않는다. */
export const PRIVATE_TERMS = ['7YG0656Y7Iuc7Iqk', 'Q2xhc3N5cw=='].map((b64) => Buffer.from(b64, 'base64').toString('utf8'));
