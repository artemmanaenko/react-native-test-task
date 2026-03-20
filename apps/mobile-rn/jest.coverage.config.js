const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/screens/**/*.{ts,tsx}',
    'src/stores/**/*.{ts,tsx}',
    'src/components/**/*.{ts,tsx}',
    '!src/components/ScreenContainer.tsx'
  ],
  coverageReporters: ['text-summary', 'json-summary'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 50,
      functions: 70,
      lines: 70
    }
  }
};
