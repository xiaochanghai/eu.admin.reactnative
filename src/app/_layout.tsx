// Import  global CSS file
import '../../global.css';
import 'dayjs/locale/zh-cn';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  checkForUpdateAsync,
  fetchUpdateAsync,
  reloadAsync,
} from 'expo-updates';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import { getUniqueId, getVersion } from 'react-native-device-info';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { APIProvider, queryLatestVersion, recordDevice } from '@/api';
import PrivacyModal from '@/components/modals/privacy-modal';
import { UpdateModal, useUpdateModal } from '@/components/modals/update-modal';
import { ToastContainer } from '@/components/ui/toast';
import {
  compareVersions,
  hydrateAuth,
  isAndroid,
  isIos,
  isWeb,
  loadSelectedTheme,
  useIsAgreePrivacy,
} from '@/lib';
import { setUniqueId } from '@/lib/auth/utils';
import { useThemeConfig } from '@/lib/use-theme-config';

dayjs.locale('zh-cn');
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};
hydrateAuth();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  /**
   * 检查应用更新
   * 如果有可用更新，自动下载并重新加载应用
   */
  const checkForUpdate = async () => {
    try {
      const update = await checkForUpdateAsync();

      console.log('update.isAvailable:' + update.isAvailable);
      if (update.isAvailable) {
        await fetchUpdateAsync();
        await reloadAsync();
      }
    } catch (_error) {
      // 错误处理（已注释）
      // alert('检查更新失败:' + error);
      // if (error instanceof Error) {
      //   alert('错误信息:' + error.message);
      //   alert('错误堆栈:' + error.stack);
      // }
    }
  };

  // 应用启动时执行的操作（仅在挂载时运行）
  useEffect(() => {
    if (!isWeb) {
      // 检查应用更新
      checkForUpdate();
      // 获取设备唯一ID并记录设备信息
      getUniqueId().then((uniqueId) => {
        setUniqueId(uniqueId);
        recordDevice(uniqueId);
      });
    }
  }, []);

  return (
    <Providers>
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          animationDuration: 200,
          gestureEnabled: true,
          contentStyle: { backgroundColor: 'white' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(repair)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(true);
  const pathname = usePathname();
  const [isAgreePrivacy, setIsAgreePrivacy] = useIsAgreePrivacy();
  const { ref, present } = useUpdateModal();

  const shouldShowPrivacyModal =
    isPrivacyModalVisible &&
    pathname !== '/user-agreement' &&
    pathname !== '/privacy-policy';
  const handleAgree = () => {
    console.log('Privacy terms agreed.');
    setPrivacyModalVisible(false);
    setIsAgreePrivacy(true);
  };

  const handleDisagree = () => {
    if (isAndroid)
      Alert.alert('提醒', '您必须同意用户协议和隐私政策才能继续使用。', [
        {
          text: '退出应用',
          onPress: () => BackHandler.exitApp(),
          style: 'destructive',
        },
      ]);
    else if (isIos)
      Alert.alert(
        '提醒',
        '您必须同意用户协议和隐私政策才能继续使用。'
        // [{ text: '退出应用', onPress: () => BackHandler.exitApp(), style: 'destructive' }]
      );
  };

  const latestVersion = useCallback(async () => {
    const { Success, Data } = await queryLatestVersion();
    if (Success && Data) {
      const currentVersion = isWeb ? '1.0.0' : getVersion();
      const latestVersion = Data.VersionNo || '1.0.0';

      //       if (result < 0) {
      //   console.log("有新版本可用！需要更新");
      // } else if (result > 0) {
      //   console.log("本地版本较新（可能是测试版）");
      // } else {
      //   console.log("版本一致，无需更新");
      // }
      if (compareVersions(latestVersion, currentVersion) > 0) {
        // 有新版本，提示用户更新
        // 这里可以使用你喜欢的方式来提示用户，比如弹窗、Toast等
        console.log(
          `有新版本可用！当前版本：${currentVersion}，最新版本：${latestVersion}`
        );
        present({
          version: latestVersion,
          description:
            Data.UpdateType === 'Force'
              ? '此版本包含重要的安全更新和关键功能修复，必须更新后才能继续使用应用。'
              : '新版本包含了更好的用户体验和性能优化，建议您及时更新以获得最佳使用体验。',
          isForced: Data.UpdateType === 'Force' ? true : false,
          downloadUrl: Data.FileUrl ?? '',
          appStoreUrl: 'https://apps.apple.com/app/id6751259759',
          releaseNotes: Data.VersionDesc ? [Data.VersionDesc] : [],
        });
      } else {
        console.log('当前已是最新版本');
      }
    }
  }, []);

  useEffect(() => {
    if (!isWeb) latestVersion();
  }, []);
  return (
    <GestureHandlerRootView
      // className={theme.dark ? `dark` : undefined}
      className={`relative flex-1 ${theme.dark === true ? 'dark' : ''}`}
    >
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              {isAgreePrivacy === false && isWeb === false && (
                <PrivacyModal
                  visible={shouldShowPrivacyModal}
                  onAgree={handleAgree}
                  onDisagree={handleDisagree}
                />
              )}
              <UpdateModal
                ref={ref}
                onUpdateStart={() => console.log('开始更新')}
                onUpdateCancel={() => console.log('取消更新')}
                onUpdateComplete={() => console.log('更新完成')}
              />
              <ToastContainer />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
