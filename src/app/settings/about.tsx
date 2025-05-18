import { Env } from '@env';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView } from 'react-native';
import { getVersion } from 'react-native-device-info';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { Image, NavHeader, Text, View } from '@/components/ui';
import { translate } from '@/lib/i18n';

export default function LoginForm() {
  // 存储更新ID的状态
  const [updateId, setUpdateId] = useState<string | null>(null);

  // 在组件挂载时获取更新ID（仅在非web平台）
  useEffect(() => {
    if (Platform.OS !== 'web') {
      const updateId1 = Updates?.updateId;
      setUpdateId(updateId1);
    }
  }, []);

  return (
    // 安全区域视图，确保内容不会被设备的缺口遮挡
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        {/* 导航头部 */}
        <NavHeader tx="settings.about.about_us" />

        {/* 可滚动内容区域 */}
        <ScrollView className="grow px-4">
          {/* 顶部空间 */}
          <View className="h-[10%]" />

          {/* Logo和标题区域 */}
          <View className="mb-8 items-center">
            {/* Logo圆形背景 */}
            <View className="mb-4 size-20 items-center justify-center rounded-full bg-[#EBF5FF]">
              <Image
                source={require('../../../assets/favicon.png')}
                className="size-[60px]"
                contentFit="contain"
              />
            </View>

            {/* 应用名称和版本 */}
            <Text className="text-lg font-bold text-[#333]">
              {Env.NAME + ' V' + getVersion()}
            </Text>

            {/* 副标题 */}
            <Text className="mt-2 text-base text-gray-500">
              {translate('login.sub_title')}
            </Text>

            {/* 版本ID（如果存在） */}
            {updateId ? (
              <Text className="mt-2 text-base text-gray-500">
                版本ID：{updateId}
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
