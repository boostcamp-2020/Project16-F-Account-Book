/* eslint-disable @typescript-eslint/no-var-requires */
const { alias, configPaths } = require('react-app-rewire-alias');
const tsconfigPathsJest = require('tsconfig-paths-jest');
const pathConfig = require('./tsconfig.paths.json');

module.exports = {
  webpack: function override(config) {
    alias(configPaths('./tsconfig.paths.json'))(config);
    return config;
  },
  jest: function override(config) {
    const moduleNameMapper = tsconfigPathsJest(pathConfig);
    return { ...config, moduleNameMapper };
  },
};
