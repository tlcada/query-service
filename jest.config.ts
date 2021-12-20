export default {
  clearMocks: true, // Automatically clear mock calls and instances between every test
  roots: ["<rootDir>/src/"],
  testEnvironment: "node",
  preset: "ts-jest",
  coveragePathIgnorePatterns: ["/node_modules/", "index.ts", "gaugesUtils.ts"],
  collectCoverage: true, // Indicates whether the coverage information should be collected while executing the test
  coverageDirectory: "coverage", // The directory where Jest should output its coverage files
  setupFiles: ["dotenv/config", "<rootDir>/jest.env.ts"], // Enable .env files
  testTimeout: 10000,
  coverageThreshold: {
    global: {
      branches: 75, // Conditional statements create branches of code which may not be executed (e.g. if/else). This metric tells you how many of your branches have been executed.
      functions: 80,
      lines: 80,
    }
  }
};
