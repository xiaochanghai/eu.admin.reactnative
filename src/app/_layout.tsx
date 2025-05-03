/* eslint-disable max-lines-per-function */
// Import  global CSS file
import '../../global.css';

import { Provider, Toast } from '@ant-design/react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
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

export const unstable_settings = {
  initialRouteName: '(app)',
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
Toast.config({ duration: 2 });

export default function RootLayout() {
  const checkForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();

      // alert('update.isAvailable:' + update.isAvailable);
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // alert('检查更新失败:' + error);
      // if (error instanceof Error) {
      //   alert('错误信息:' + error.message);
      //   alert('错误堆栈:' + error.stack);
      // }
    }
  };
  useEffect(() => {
    if (Platform.OS !== 'web') {
      checkForUpdate();
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

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
