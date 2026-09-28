import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command:
      process.env.PLAYWRIGHT_USE_PRODUCTION === 'true'
        ? 'npm run start -- --hostname 127.0.0.1 --port 3100'
        : 'npm run dev -- --hostname 127.0.0.1 --port 3100',
    url: 'http://127.0.0.1:3100',
    // Never accidentally reuse a developer's server with connected services enabled.
    reuseExistingServer: false,
    env: {
      CREDIFY_AUTH_ENABLED: 'false',
      CREDIFY_AI_ENABLED: 'false',
      CREDIFY_REGISTRY_ENABLED: 'false',
      SITE_URL: 'http://127.0.0.1:3100',
    },
  },
});
