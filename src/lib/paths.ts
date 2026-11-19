/**
 * 내부 링크는 모두 이 함수를 거친다. 하위 경로 호스팅(ASTRO_BASE)에서도 링크가 깨지지 않게 한다.
 * withBase('/') → '/' 또는 '/ohseungmin-portfolio/'
 * withBase('/#work') → '/#work' 또는 '/ohseungmin-portfolio/#work'
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function withBase(path: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path; // 외부·mailto 링크는 그대로
  if (path.startsWith('#')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${normalized}`;
}

/** 케이스 상세 경로. 빌드 결과가 /work/<slug>/index.html이라 끝에 /를 붙인다. */
export function casePath(slug: string): string {
  return withBase(`/work/${slug}/`);
}
