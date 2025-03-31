/* eslint-env node */

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  /\/node_modules\/(?!react-native-css-interop\/.cache).*\/__tests__\//,
];

// 添加SVG转换器配置
// 保留Expo默认transformer配置
const defaultTransformer = getDefaultConfig(__dirname).transformer;

config.transformer = {
  ...defaultTransformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

module.exports = withNativeWind(config, { input: './global.css' });
