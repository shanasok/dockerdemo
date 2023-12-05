module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js", // Excludes specific file(s) from coverage
    "!**/node_modules/**" // Excludes all files in node_modules directory
  ],
  coverageReporters: ["lcov", "text", "html"],
  moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs"
  },
};