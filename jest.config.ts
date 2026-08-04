import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
	roots: ['<rootDir>/src'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testEnvironment: 'jest-environment-jsdom',
	testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	collectCoverage: true,
	coverageProvider: 'v8',
	coverageReporters: ['text-summary', 'lcov'],
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/*.d.ts',
		'!src/types/**',
		'!src/**/*.test.{ts,tsx}',
	],
};

export default createJestConfig(config);
