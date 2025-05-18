/* eslint-disable max-lines-per-function */
// 导入全局CSS文件
import '../../global.css';

import { Provider, Toast } from '@ant-design/react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme } from '@/lib';
import { setUniqueId } from '@/lib/auth/utils';
import { recordDevice } from '@/lib/device';
import { useThemeConfig } from '@/lib/use-theme-config';

export { ErrorBoundary } from 'expo-router';

// 路由设置
export const unstable_settings = {
  initialRouteName: '(app)',
};

// 初始化应用状态
hydrateAuth(); // 恢复认证状态
loadSelectedTheme(); // 加载用户选择的主题

// 防止启动屏幕在资源加载完成前自动隐藏
SplashScreen.preventAutoHideAsync();
// 设置动画选项（可选）
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});
// 配置Toast提示的默认持续时间
Toast.config({ duration: 2 });

/**
 * 应用根布局组件
 * 负责初始化应用环境、检查更新和设置全局提供者
 */
export default function RootLayout() {
  /**
   * 检查应用更新
   * 如果有可用更新，自动下载并重新加载应用
   */
  const checkForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();

      // alert('update.isAvailable:' + update.isAvailable);
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // 错误处理（已注释）
      // alert('检查更新失败:' + error);
      // if (error instanceof Error) {
      //   alert('错误信息:' + error.message);
      //   alert('错误堆栈:' + error.stack);
      // }
    }
  };

  // 应用启动时执行的操作
  useEffect(() => {
    if (Platform.OS !== 'web') {
      // 检查应用更新
      checkForUpdate();
      // 获取设备唯一ID并记录设备信息
      getUniqueId().then((uniqueId) => {
        setUniqueId(uniqueId);
        recordDevice(uniqueId);
      });
    }
  });

  return (
    <Provider>
      <Providers>
        <Stack
          screenOptions={{
            animation: 'slide_from_right',
            animationDuration: 200,
            gestureEnabled: true,
            contentStyle: { backgroundColor: 'white' },
          }}
        >
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
      </Providers>
    </Provider>
  );
}

/**
 * 全局提供者组件
 * 包装所有需要的上下文提供者，如主题、API、键盘等
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 */
function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView className={`flex-1 ${theme.dark ? 'dark' : ''}`}>
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
