import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

/**
 * 报告类型定义
 * daily: 日报
 * weekly: 周报
 * monthly: 月报
 */
type ReportType = 'daily' | 'weekly' | 'monthly';

/**
 * 报告日期选择器组件
 * 用于在日报、周报和月报之间切换
 */
const ReportDateSelector: React.FC = () => {
  // 当前选中的报告类型，默认为日报
  const [selectedReportType, setSelectedReportType] =
    useState<ReportType>('daily');

  /**
   * 处理报告类型变更
   * @param type 要切换到的报告类型
   */
  const handleReportTypeChange = (type: ReportType) => {
    setSelectedReportType(type);
  };

  return (
    <View className="mt-3 flex-row rounded-lg bg-gray-100 p-1 dark:bg-neutral-700">
      <TouchableOpacity
        className={`flex-1 items-center rounded-md py-2 ${selectedReportType === 'daily' ? 'bg-white shadow-sm dark:bg-neutral-600' : ''}`}
        onPress={() => handleReportTypeChange('daily')}
      >
        <Text
          className={`text-sm ${selectedReportType === 'daily' ? 'font-medium text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
        >
          日报
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 items-center rounded-md py-2 ${selectedReportType === 'weekly' ? 'bg-white shadow-sm dark:bg-neutral-600' : ''}`}
        onPress={() => handleReportTypeChange('weekly')}
      >
        <Text
          className={`text-sm ${selectedReportType === 'weekly' ? 'font-medium text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
        >
          周报
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 items-center rounded-md py-2 ${selectedReportType === 'monthly' ? 'bg-white shadow-sm dark:bg-neutral-600' : ''}`}
        onPress={() => handleReportTypeChange('monthly')}
      >
        <Text
          className={`text-sm ${selectedReportType === 'monthly' ? 'font-medium text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
        >
          月报
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportDateSelector;
