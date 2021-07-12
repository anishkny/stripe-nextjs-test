module.exports = {
  // Forbid test.only on CI
  forbidOnly: !!process.env.CI,

  // Two retries for each test
  retries: 2,

  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 2 : undefined,

  use: {
    // Browser options
    headless: !!process.env.CI, // Headless in CI
    slowMo: process.env.CI ? 0 : 100, // No slow Mo in CI

    // Context options
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Artifacts
    screenshot: 'only-on-failure',
    video: 'retry-with-video',
  },
};
