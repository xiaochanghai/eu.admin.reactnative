import { Stack } from 'expo-router';
import React from 'react';

export default function ChatSettingsLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="settings" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="capabilities" />
    </Stack>
  );
}
