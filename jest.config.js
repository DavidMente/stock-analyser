module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*',
  ],
  coverageDirectory: '<rootDir>/coverage/jest'
};
