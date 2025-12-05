import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';

import { ClientEnv, Env } from './env';

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== 'production',
  badges: [
    {
      text: Env.APP_ENV,
      type: 'banner',
      color: 'white',
    },
    {
      text: Env.VERSION.toString(),
      type: 'ribbon',
      color: 'white',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: 'eu-cloud',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/9d0f9588-d00f-40cf-a15c-ffd7e8bc7654',
  },
  // runtimeVersion: {
  //   policy: 'sdkVersion',
  // },
  runtimeVersion: Env.VERSION.toString(),
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    buildNumber: Env.BUILD_NUMBER.toString(),
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSPhotoLibraryUsageDescription:
        '我们需要访问您的照片库，以便您选择图片用于头像、上传和分享。',
      NSCameraUsageDescription:
        '我们需要使用相机，以便您拍摄照片/视频用于头像或内容发布。',
      NSMicrophoneUsageDescription: '我们需要使用您的麦克风用于录音、语音识别',
    },
    runtimeVersion: Env.VERSION.toString(),
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: Env.PACKAGE,
    versionCode: Env.BUILD_NUMBER,
    // runtimeVersion: {
    //   policy: 'appVersion',
    // },
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        backgroundColor: '#FFFFFF',
        image: './assets/splash-icon.png',
        imageWidth: 150,
      },
    ],
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Inter.ttf'],
      },
    ],
    'expo-localization',
    'expo-router',
    ['app-icon-badge', appIconBadgeConfig],
    ['react-native-edge-to-edge'],
    [
      'expo-image-picker',
      {
        photosPermission:
          'The app accesses your photos to let you share them with your friends.',
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission: '我们需要使用相机来扫描二维码。',
      },
    ],
    // [
    //   'expo-notifications',
    //   {
    //     icon: './assets/favicon.png',
    //     color: '#ffffff',
    //     defaultChannel: 'default',
    //     // "sounds": [
    //     //   "./local/assets/notification_sound.wav",
    //     //   "./local/assets/notification_sound_other.wav"
    //     // ],
    //     enableBackgroundRemoteNotifications: false,
    //   },
    // ],
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
