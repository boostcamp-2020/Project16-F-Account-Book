/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfigPathsJest = require('tsconfig-paths-jest');
const tsconfig = require('./tsconfig.json');

const moduleNameMapper = tsconfigPathsJest(tsconfig);

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: 'src',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper,
};
