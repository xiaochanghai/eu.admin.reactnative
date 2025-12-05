// src/app/about-us.tsx
import { Env } from '@env';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { NavHeader, SafeAreaView } from '@/components/ui';
import { isWeb } from '@/lib';
export default function AboutUsScreen() {
  const [updateId, setUpdateId] = useState<string | null>(null);
  // 在组件挂载时获取更新ID（仅在非web平台）
  useEffect(() => {
    if (!isWeb) {
      const updateId1 = Updates?.updateId;
      setUpdateId(updateId1);
    }
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <NavHeader title="关于我们" />

      {/* 正文 */}
      <ScrollView
        className="flex-1 px-4 py-3"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="mb-6 items-center pt-4">
          <Image
            source={require('../../assets/login-logo.png')}
            className="mb-3 size-24"
            resizeMode="contain"
            style={{ width: 120, height: 120 }}
          />
          <Text className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {Env.NAME}
          </Text>
          <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            V {Env.VERSION} {Env.APP_ENV === 'development' && Env.APP_ENV}
          </Text>
          {updateId && (
            <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              版本ID: {updateId}
            </Text>
          )}
        </View>

        <Text className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-100">
          公司介绍
        </Text>
        <Text className="mb-6 text-sm leading-6 text-gray-700 dark:text-gray-300">
          苏州优智云有限公司是一家专注于人工智能技术研发与应用的创新型企业。我们致力于将前沿AI技术转化为实用工具，帮助用户提升工作效率、激发创造力，并简化复杂任务。
        </Text>

        <Text className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-100">
          产品理念
        </Text>
        <Text className="mb-6 text-sm leading-6 text-gray-700 dark:text-gray-300">
          {Env.NAME}
          以&quot;科技赋能创造&quot;为核心理念，通过智能对话、内容生成、知识管理等功能，为用户提供全方位的AI助手服务。我们注重用户体验，追求技术创新，同时严格保护用户隐私和数据安全。
        </Text>

        <Text className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-100">
          联系我们
        </Text>
        <Text className="mb-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
          • 官方网站：http://www.eu-cloud.com/
        </Text>
        <Text className="mb-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
          • 客服邮箱：support@eu-cloud.com
        </Text>

        <View className="mb-4 mt-6 items-center">
          <Text className="text-xs text-gray-400 dark:text-gray-500">
            © 2025 苏州优智云有限公司
          </Text>
          <Text className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            保留所有权利
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
