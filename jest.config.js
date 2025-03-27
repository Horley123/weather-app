// jest.config.js
const nextJest = require("next/jest"); // Use require em vez de import

const createJestConfig = nextJest({
  dir: "./", // Defina a raiz do seu projeto
});

const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/.jest/setup.ts",
    "<rootDir>/.jest/browserMocks.ts",
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/components/**/*.ts(x)?",
    "src/views/**/*.ts(x)?",
    "src/models/**/*.ts(x)?",
    "src/providers/**/*.ts(x)?",
    "src/redux/**/*.ts(x)?",
    "src/**/*.ts(x)?",
    "!src/**/*.test.tsx",
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    "^@actions/(.*)$": "<rootDir>/src/actions/$1",
  },
};

// Alteração: Use `module.exports` ao invés de `export default`
module.exports = createJestConfig(config);
