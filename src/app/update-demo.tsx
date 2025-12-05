/**
 * UpdateDemo - 版本更新弹窗使用示例
 *
 * 演示如何使用UpdateModal组件
 */

import * as React from 'react';
import { View } from 'react-native';

import { UpdateModal, useUpdateModal } from '@/components/modals/update-modal';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function UpdateDemo() {
  const { ref, present } = useUpdateModal();

  // 模拟可选更新
  const handleOptionalUpdate = () => {
    present({
      version: '2.1.0',
      description:
        '新版本包含了更好的用户体验和性能优化，建议您及时更新以获得最佳使用体验。',
      isForced: false,
      downloadUrl: 'https://example.com/app-v2.1.0.apk',
      appStoreUrl: 'https://apps.apple.com/app/id6751259759',
      releaseNotes: [
        '优化了应用启动速度',
        '修复了已知问题',
        '新增了暗黑模式支持',
        '改进了用户界面设计',
      ],
    });
  };

  // 模拟强制更新
  const handleForcedUpdate = () => {
    present({
      version: '2.2.0',
      description:
        '此版本包含重要的安全更新和关键功能修复，必须更新后才能继续使用应用。',
      isForced: true,
      downloadUrl: 'https://example.com/app-v2.2.0.apk',
      appStoreUrl: 'https://apps.apple.com/app/id6751259759',
      releaseNotes: [
        '修复了重要安全漏洞',
        '更新了核心功能模块',
        '提升了数据传输安全性',
      ],
    });
  };

  // 模拟简单更新（无详细说明）
  const handleSimpleUpdate = () => {
    present({
      version: '2.0.5',
      description: '发现新版本，建议您更新以获得更好的使用体验。',
      isForced: false,
      downloadUrl: 'https://example.com/app-v2.0.5.apk',
      appStoreUrl: 'https://apps.apple.com/app/id6751259759',
    });
  };

  return (
    <View className="flex-1 bg-white px-6 py-8 dark:bg-charcoal-900">
      <Text className="mb-8 text-center text-2xl font-bold text-charcoal-900 dark:text-white">
        版本更新弹窗演示
      </Text>

      <View className="space-y-4">
        <Button
          variant="primary"
          label="显示可选更新"
          onPress={handleOptionalUpdate}
        />

        <Button
          variant="destructive"
          label="显示强制更新"
          onPress={handleForcedUpdate}
        />

        <Button
          variant="outline"
          label="显示简单更新"
          onPress={handleSimpleUpdate}
        />
      </View>

      <View className="mt-8 rounded-lg bg-neutral-100 p-4 dark:bg-charcoal-800">
        <Text className="mb-2 text-sm text-neutral-600 dark:text-neutral-300">
          功能说明：
        </Text>
        <Text className="text-xs leading-5 text-neutral-500 dark:text-neutral-400">
          • 可选更新：用户可以选择稍后提醒{'\n'}•
          强制更新：用户必须更新才能继续使用{'\n'}•
          Android：应用内下载APK并自动安装{'\n'}• iOS：跳转到App Store进行更新
          {'\n'}• 包含火箭主题动画和下载进度显示
        </Text>
      </View>

      <UpdateModal
        ref={ref}
        onUpdateStart={() => console.log('开始更新')}
        onUpdateCancel={() => console.log('取消更新')}
        onUpdateComplete={() => console.log('更新完成')}
      />
    </View>
  );
}
