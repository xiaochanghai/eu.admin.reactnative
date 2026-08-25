import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { ChatWorkspaceProvider } from '@/features/chat';
import { useAppColorScheme } from '@/lib/hooks';

export default function ChatLayout() {
  const { colors } = useAppColorScheme();

  useEffect(() => {
    if (Platform.OS === 'web') return;
    SystemUI.setBackgroundColorAsync(colors.background).catch(() => {});
  }, [colors.background]);

  return (
    <ChatWorkspaceProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="chats" options={{ animation: 'none' }} />
        <Stack.Screen name="projects" options={{ animation: 'none' }} />
        <Stack.Screen
          name="attachments"
          options={{
            presentation: Platform.OS === 'web' ? 'card' : 'formSheet',
            sheetAllowedDetents: [0.55],
            sheetGrabberVisible: Platform.OS !== 'android',
          }}
        />
        <Stack.Screen
          name="model-picker"
          options={{
            presentation: Platform.OS === 'web' ? 'card' : 'formSheet',
            sheetAllowedDetents: 'fitToContents',
            sheetGrabberVisible: Platform.OS !== 'android',
          }}
        />
        <Stack.Screen
          name="(settings)"
          options={{ presentation: Platform.OS === 'web' ? 'card' : 'modal' }}
        />
      </Stack>
      {Platform.OS !== 'ios' ? <StatusBar style="auto" /> : null}
    </ChatWorkspaceProvider>
  );
}
