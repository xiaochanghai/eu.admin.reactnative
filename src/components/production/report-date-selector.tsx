import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { SegmentedControl } from '@/components/segmented-control';
import { FontAwesome } from '@/components/ui/icons';

/**
 * 报告类型定义
 * daily: 日报
 * weekly: 周报
 * monthly: 月报
 */
export type ReportType = 'daily' | 'weekly' | 'monthly';

const reportOptions = [
  { key: 'daily', label: '日报', period: '2023-12-05' },
  { key: 'weekly', label: '周报', period: '12月04日 - 12月10日' },
  { key: 'monthly', label: '月报', period: '2023年12月' },
];

/**
 * 报告日期选择器组件
 * 用于在日报、周报和月报之间切换
 */
const ReportDateSelector: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedOption = reportOptions[selectedIndex] ?? reportOptions[0];

  return (
    <View>
      <View className="mb-2 flex-row justify-end">
        <View className="flex-row items-center rounded-full bg-white px-3 py-2 dark:bg-neutral-800">
          <FontAwesome name="calendar" size={12} color="#F28B25" />
          <Text className="ml-1.5 text-xs font-medium text-gray-600 dark:text-gray-300">
            {selectedOption.period}
          </Text>
        </View>
      </View>

      <SegmentedControl
        options={reportOptions}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      />
    </View>
  );
};

export default ReportDateSelector;
