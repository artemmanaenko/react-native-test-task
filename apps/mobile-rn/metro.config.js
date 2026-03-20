const path = require('node:path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    extraNodeModules: {
      '@orders/shared': path.resolve(workspaceRoot, 'packages/shared/src')
    },
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules')
    ]
  }
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
