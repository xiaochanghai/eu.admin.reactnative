import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { useChatWorkspace } from '../chat-context';
import { ChatIcon } from '../chat-ui';

function HeaderTitleMenu() {
  const router = useRouter();
  const { selectedModel, extendedThinking } = useChatWorkspace();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push('/(chat)/model-picker' as never)}
      className="items-center rounded-lg px-2 py-1 active:bg-neutral-100 dark:active:bg-neutral-800"
    >
      <View className="flex-row items-center">
        <Text className="text-[17px] font-semibold text-neutral-900 dark:text-white">
          {selectedModel.label}
        </Text>
        <View className="ml-1">
          <ChatIcon name="chevron-down" size={13} />
        </View>
      </View>
      {extendedThinking ? (
        <Text className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Extended
        </Text>
      ) : null}
    </Pressable>
  );
}

export function MainHeader() {
  const { openDrawer } = useChatWorkspace();

  return (
    <>
      <Stack.Toolbar placement="left" asChild>
        <Pressable
          accessibilityLabel="Open drawer"
          accessibilityRole="button"
          onPress={openDrawer}
          className="p-2 active:opacity-60"
        >
          <ChatIcon name="menu-outline" size={24} />
        </Pressable>
      </Stack.Toolbar>
      <Stack.Title asChild>
        <HeaderTitleMenu />
      </Stack.Title>
      <Stack.Toolbar placement="right" asChild>
        <Pressable
          accessibilityLabel="Reader"
          accessibilityRole="button"
          className="p-2 active:opacity-60"
        >
          <ChatIcon name="glasses-outline" size={22} />
        </Pressable>
      </Stack.Toolbar>
    </>
  );
}
