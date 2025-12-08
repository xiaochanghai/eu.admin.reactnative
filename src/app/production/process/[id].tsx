import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavHeader, SafeAreaView } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

export default function ProcessDetail() {
  const [activeTab, setActiveTab] = useState('生产记录');
  const { isDark } = useAppColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <NavHeader
        title="工序详情"
        right={
          <>
            <TouchableOpacity className="mr-4">
              <FontAwesome name="share-alt" size={18} color={isDark ? '#9ca3af' : '#4b5563'} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="ellipsis-v" size={18} color={isDark ? '#9ca3af' : '#4b5563'} />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView className="flex-1 p-4">
        {/* 工序基本信息 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-3 flex-row items-start justify-between">
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">元器件贴装</Text>
            <View className="rounded-full bg-green-100 px-2 py-1 dark:bg-green-900/30">
              <Text className="text-xs font-medium text-green-800 dark:text-green-300">使用中</Text>
            </View>
          </View>

          <Text className="mb-2 text-sm text-gray-600 dark:text-gray-300">
            工序编号：PR20231201-03
          </Text>

          <View className="mb-3 grid grid-cols-2 gap-4">
            <View>
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">负责人</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">王工程师</Text>
            </View>
            <View>
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">标准工时</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">45分钟/批次</Text>
            </View>
          </View>

          <View className="mb-3">
            <View className="mb-1 flex-row justify-between text-sm">
              <Text className="text-gray-900 dark:text-gray-100">设备利用率</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">85%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
              <View
                className="h-full rounded bg-green-500"
                style={{ width: '85%' }}
              />
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">关联设备</Text>
            <View className="flex-row items-center">
              <FontAwesome
                name="microchip"
                size={16}
                color={isDark ? '#60a5fa' : '#2563eb'}
                className="mr-2"
              />
              <Text className="text-gray-900 dark:text-gray-100">SMT贴片机#2</Text>
            </View>
          </View>
        </View>

        {/* 工序详情选项卡 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 pb-2"
        >
          {['生产记录', '质量控制', '工艺参数', '操作指南'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`mr-2 rounded-full px-4 py-2 ${activeTab === tab ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <Text
                className={`text-sm font-medium ${activeTab === tab ? 'text-white' : 'text-gray-800 dark:text-gray-300'}`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 生产记录 */}
        {activeTab === '生产记录' && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">生产记录</Text>

            <ScrollView horizontal className="overflow-x-auto">
              <View>
                <View className="flex-row bg-gray-50 dark:bg-gray-700">
                  <Text className="px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    日期
                  </Text>
                  <Text className="px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    批次
                  </Text>
                  <Text className="px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    产量
                  </Text>
                  <Text className="px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    良品率
                  </Text>
                  <Text className="px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    操作员
                  </Text>
                </View>

                <View className="border-t border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">2023-12-04</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">B20231204-01</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">120件</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">98.3%</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">张三</Text>
                  </View>
                </View>

                <View className="border-t border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">2023-12-03</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">B20231203-02</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">150件</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">97.5%</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">李四</Text>
                  </View>
                </View>

                <View className="border-t border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">2023-12-02</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">B20231202-01</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">130件</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">99.1%</Text>
                    <Text className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100">王五</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        {/* 工艺参数 */}
        {activeTab === '工艺参数' && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">工艺参数</Text>

            <View className="mb-3 flex-row flex-wrap">
              <View className="mb-3 w-1/2 pr-2">
                <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">贴片速度</Text>
                <Text className="font-medium text-gray-900 dark:text-gray-100">0.1秒/个</Text>
              </View>
              <View className="mb-3 w-1/2 pl-2">
                <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">定位精度</Text>
                <Text className="font-medium text-gray-900 dark:text-gray-100">±0.02mm</Text>
              </View>
              <View className="mb-3 w-1/2 pr-2">
                <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">最小元件尺寸</Text>
                <Text className="font-medium text-gray-900 dark:text-gray-100">0201(0.6mm×0.3mm)</Text>
              </View>
              <View className="mb-3 w-1/2 pl-2">
                <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">最大PCB尺寸</Text>
                <Text className="font-medium text-gray-900 dark:text-gray-100">330mm×250mm</Text>
              </View>
            </View>

            <View className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
              <View className="flex-row items-start">
                <FontAwesome
                  name="exclamation-circle"
                  size={16}
                  color={isDark ? '#fbbf24' : '#d97706'}
                  className="mr-2 mt-0.5"
                />
                <View>
                  <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">注意事项</Text>
                  <Text className="text-xs text-gray-700 dark:text-gray-300">
                    1. 确保PCB板表面清洁无污染
                  </Text>
                  <Text className="text-xs text-gray-700 dark:text-gray-300">
                    2. 定期检查吸嘴状态，避免漏吸
                  </Text>
                  <Text className="text-xs text-gray-700 dark:text-gray-300">
                    3. 元件供料器需定期校准
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* 质量控制 */}
        {activeTab === '质量控制' && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">质量控制</Text>

            <View className="mb-3">
              <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">检验标准</Text>
              <Text className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                IPC-A-610G 3级标准
              </Text>

              <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">检验项目</Text>
              <View className="mb-2 flex-row flex-wrap gap-2">
                <View className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
                  <Text className="text-xs text-gray-800 dark:text-gray-300">元件位置</Text>
                </View>
                <View className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
                  <Text className="text-xs text-gray-800 dark:text-gray-300">焊接质量</Text>
                </View>
                <View className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
                  <Text className="text-xs text-gray-800 dark:text-gray-300">极性方向</Text>
                </View>
                <View className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
                  <Text className="text-xs text-gray-800 dark:text-gray-300">元件完整性</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* 操作指南 */}
        {activeTab === '操作指南' && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">操作指南</Text>

            <View className="mb-3">
              <Text className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">操作步骤</Text>
              <View className="mb-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                <Text className="mb-1 text-sm text-gray-900 dark:text-gray-100">1. 确认PCB板已完成前道工序</Text>
                <Text className="mb-1 text-sm text-gray-900 dark:text-gray-100">
                  2. 检查贴片机程序是否正确加载
                </Text>
                <Text className="mb-1 text-sm text-gray-900 dark:text-gray-100">
                  3. 确认元件供料器已正确安装
                </Text>
                <Text className="mb-1 text-sm text-gray-900 dark:text-gray-100">4. 启动设备并监控首件生产</Text>
                <Text className="text-sm text-gray-900 dark:text-gray-100">5. 完成后进行首件检验确认</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
