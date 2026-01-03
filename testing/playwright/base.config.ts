import { defineConfig, devices } from '@playwright/test'

/**
 * Base Playwright configuration for AI Dev Platform projects
 *
 * This config provides sensible defaults for E2E testing.
 * Extend or override in your project's playwright.config.ts
 */
export default defineConfig({
  // Test location
  testDir: './tests/e2e',

  // Test file patterns
  testMatch: '**/*.spec.ts',

  // Fully parallel test execution
  fullyParallel: true,

  // Don't fail on only() in CI
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Limit workers in CI for stability
  workers: process.env.CI ? 2 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['list'],
  ],

  // Shared settings for all tests
  use: {
    // Base URL for tests (can be overridden with BASE_URL env var)
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Retry on network errors
    actionTimeout: 10_000,
    navigationTimeout: 30_000,

    // Collect trace when retrying
    trace: 'on-first-retry',

    // Screenshot on failure only
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Viewport size
    viewport: { width: 1280, height: 720 },

    // Test-specific options
    ignoreHTTPSErrors: true,
  },

  // Projects for different browsers/devices
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Mobile viewports */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Tablet viewports */
    {
      name: 'Tablet',
      use: { ...devices['iPad Pro'] },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: process.env.CI
    ? undefined // Don't start server in CI (GitHub Actions does it)
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
      },

  // Global setup and teardown
  globalSetup: require.resolve('./tests/global-setup'),
  globalTeardown: require.resolve('./tests/global-teardown'),

  // Output folder for test artifacts
  outputDir: 'test-results',

  // Timeout for each test
  timeout: 60 * 1000,

  // Expect timeout
  expect: {
    timeout: 5_000,
  },
})

/**
 * Example project-specific config override:
 *
 * import baseConfig from '@your-org/ai-dev-platform/testing/playwright/base.config'
 *
 * export default defineConfig({
 *   ...baseConfig,
 *   testDir: './e2e',
 *   use: {
 *     ...baseConfig.use,
 *     baseURL: 'http://localhost:8080',
 *   },
 * })
 */
