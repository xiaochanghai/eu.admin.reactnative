/* eslint-env node */

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// 添加自定义解析器
config.resolver.extraNodeModules = {
  'expo-router': path.resolve(__dirname, 'node_modules/expo-router'),
};

module.exports = withNativeWind(config, { input: './global.css' });
