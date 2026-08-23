// src/app/about-us.tsx
import { Env } from '@env';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Image,
  NavHeader,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/components/ui';
import { primary } from '@/components/ui/colors';
import { isWeb } from '@/lib';
// import { usePrimaryShades } from '@/lib/hooks';
import { error, info, success } from '@/lib/message';

const splashIcon = require('../../../assets/splash-icon.png');

export default function AboutUsScreen() {
  // const primary = usePrimaryShades();
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<
    'idle' | 'checking' | 'downloading'
  >('idle');
  const isUpdating = updateStatus !== 'idle';
  // 在组件挂载时获取更新ID（仅在非web平台）
  useEffect(() => {
    if (!isWeb) {
      const updateId1 = Updates?.updateId;
      setUpdateId(updateId1);
    }
  }, []);

  const checkForUpdate = async () => {
    if (isUpdating) return;

    setUpdateStatus('checking');
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        info('发现新版本，正在下载更新...');
        setUpdateStatus('downloading');
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } else {
        success('当前已是最新版本');
      }
    } catch (err) {
      error('检查更新失败');
      if (err instanceof Error) {
        error('错误信息:' + err.message);
      }
    } finally {
      setUpdateStatus('idle');
    }
  };
  return (
    <View className="flex-1">
      <NavHeader
        title="关于我们"
        // tintColor="#FFFFFF"
        // statusBarStyle="light-content"
      />

      {/* 正文 */}
      <View
        className="flex-1 overflow-hidden bg-white dark:bg-neutral-900"
        style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
      >
        <ScrollView
          className="flex-1 px-4 py-3"
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <View className="mb-6 items-center pt-4">
            <Image source={splashIcon} style={{ width: 80, height: 80 }} />
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {Env.NAME}
            </Text>
            <TouchableOpacity onPress={checkForUpdate}>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                V 3.0.1 (2026/07/20)
                {Env.APP_ENV === 'development' && Env.APP_ENV}
              </Text>
            </TouchableOpacity>
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
            苏州衣代码智能科技有限公司是一家专注于人工智能技术研发与应用的创新型企业。我们致力于将前沿AI技术转化为实用工具，帮助用户提升工作效率、激发创造力，并简化复杂任务。
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
            • 官方网站：http://www.porcelain.ink/
          </Text>
          <Text className="mb-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
            • 客服邮箱：support@porcelain.ink
          </Text>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ disabled: isUpdating, busy: isUpdating }}
            className="mt-6 w-1/3 flex-row items-center justify-center self-center rounded-full px-6 py-3"
            style={{ backgroundColor: primary[600] }}
            disabled={isUpdating}
            onPress={checkForUpdate}
          >
            {isUpdating && (
              <ActivityIndicator
                className="mr-2"
                size="small"
                color="#FFFFFF"
              />
            )}
            <Text className="text-sm font-medium text-white">
              {updateStatus === 'checking'
                ? '正在检测...'
                : updateStatus === 'downloading'
                  ? '正在下载...'
                  : '检查更新'}
            </Text>
          </TouchableOpacity>

          <View className="mb-4 mt-6 items-center">
            <Text className="text-xs text-gray-400 dark:text-gray-500">
              © 2025 苏州衣代码智能科技有限公司
            </Text>
            <Text className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              保留所有权利
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
