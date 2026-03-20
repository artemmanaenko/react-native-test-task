module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^react-native$': '<rootDir>/src/test/reactNativeMock.ts'
  },
  watchman: false,
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/']
};
