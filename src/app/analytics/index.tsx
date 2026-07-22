import { MotiView } from 'moti';
import React, { useState } from 'react';

import { SegmentedControl, type SegmentedControlOption } from '@/components';
import {
  Inventory,
  OverView,
  Production,
  Quality,
  Sales,
} from '@/components/analytics';
import { NavHeader, ScrollView, Text, View } from '@/components/ui';

const Analytics: React.FC = () => {
  // 分段控制器选项
  const segmentedOptions: SegmentedControlOption[] = [
    { key: 'overview', label: '总览' },
    { key: 'production-analytics', label: '生产' },
    { key: 'sales-analytics', label: '销售' },
    { key: 'inventory-analytics', label: '库存' },
    { key: 'quality-analytics', label: '质量' },
  ];

  // 当前选中的选项
  const [activeSegment, setActiveSegment] = useState(0);

  return (
    <View className="flex-1 bg-neutral-100 dark:bg-neutral-950">
      <NavHeader title="数据分析" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 flex-row items-center justify-between px-1">
          <View>
            <Text className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              经营数据中心
            </Text>
            <Text className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
              关键指标
            </Text>
          </View>
          <View className="items-end">
            <View className="flex-row items-center">
              <View className="mr-1.5 size-2 rounded-full bg-success-500" />
              <Text className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                数据已同步
              </Text>
            </View>
            <Text className="mt-1 text-[11px] text-neutral-400">
              今天 09:30 更新
            </Text>
          </View>
        </View>

        {/* 分段控制器 */}
        <View className="mb-6 rounded-2xl border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900">
          <SegmentedControl
            options={segmentedOptions}
            selectedIndex={activeSegment}
            onChange={setActiveSegment}
          />
        </View>

        <MotiView
          key={segmentedOptions[activeSegment].key}
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 220 }}
        >
          {activeSegment === 0 && <OverView />}
          {activeSegment === 1 && <Production />}
          {activeSegment === 2 && <Sales />}
          {activeSegment === 3 && <Inventory />}
          {activeSegment === 4 && <Quality />}
        </MotiView>
      </ScrollView>
    </View>
  );
};

export default Analytics;
