import { alias, configPaths } from 'react-app-rewire-alias';

module.exports = function override(config) {
  alias(configPaths('./tsconfig.paths.json'))(config);

  return config;
};
