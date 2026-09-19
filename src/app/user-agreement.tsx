// src/app/user-agreement.tsx
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView } from 'react-native';

import { SafeAreaView, Text, View } from '@/components/ui';
import UserAgreement from '@/components/user-agreement';

export default function UserAgreementScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <Stack.Screen options={{ headerShown: false }} />

      {/* 顶部自定义头部 */}
      <View className="flex-row items-center border-b border-gray-200 px-4 py-3 dark:border-neutral-700">
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text className="text-blue-600 dark:text-blue-400">返回</Text>
        </Pressable>
        <Text className="flex-1 text-center text-base font-semibold text-gray-800 dark:text-gray-100">
          用户协议
        </Text>
        {/* 占位使标题居中 */}
        <View style={{ width: 40 }} />
      </View>

      {/* 正文 */}
      <UserAgreement />
    </SafeAreaView>
  );
}
