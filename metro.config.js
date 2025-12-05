/* eslint-env node */

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Configure resolver to handle native-only modules on web
config.resolver = {
  ...config.resolver,
  resolveRequest: (context, moduleName, platform) => {
    // List of native-only modules to mock on web
    const nativeOnlyModules = [
      'react-native-pdf',
      'react-native-restart',
    ];

    // If building for web and requesting a native-only module, return empty module
    if (platform === 'web' && nativeOnlyModules.includes(moduleName)) {
      return {
        type: 'empty',
      };
    }

    // Otherwise, use the default resolver
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = withNativeWind(config, { input: './global.css' });
