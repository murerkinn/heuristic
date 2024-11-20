import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/cpp/',
    '/.next/',
    '/.vscode/',
    '/public/',
  ],
  detectOpenHandles: true,
  forceExit: true,
  testTimeout: 30000,
  testEnvironment: 'node',
  // testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
  testMatch: ['**/*.test.ts'],
  // setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}

export default config
