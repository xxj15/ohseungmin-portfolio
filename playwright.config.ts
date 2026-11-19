import { defineConfig } from '@playwright/test';

const PORT = 4322;
const BASE_URL = `http://127.0.0.1:${PORT}`;

/**
 * preview 서버(빌드 결과물)를 대상으로 검증한다.
 * 브라우저는 내려받지 않고 설치된 Chrome(channel: 'chrome')을 쓴다.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // 워커가 많으면 Chrome 컨텍스트 생성(browser.newContext)이 가끔 멈춘다(6워커에서 반복 확인). 3으로 묶는다.
  workers: 3,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: BASE_URL,
    channel: 'chrome',
    viewport: { width: 1440, height: 900 },
    locale: 'ko-KR',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${PORT} --ignore-lock`,
    url: BASE_URL,
    // 항상 새로 빌드한 결과물을 검증한다(이미 떠 있는 서버의 오래된 결과물을 쓰지 않는다)
    reuseExistingServer: false,
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
