import React from 'react';

import { Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

export type RepairRecordItemProps = {
  title: string;
  description: string;
  assignee: string;
  date: string;
  status: string;
  statusColor: string;
  borderColor: string;
  bgColor: string;
  isDark: boolean;
};

export const RepairRecordItem: React.FC<RepairRecordItemProps> = ({
  title,
  description,
  assignee,
  date,
  status,
  statusColor,
  borderColor,
  bgColor,
  isDark,
}) => {
  // 在暗黑模式下使用半透明的深色背景
  const darkBgColor = isDark ? 'rgba(64, 64, 64, 0.3)' : bgColor;

  return (
    <View
      className="mb-3 rounded-lg p-3"
      style={{
        backgroundColor: darkBgColor,
        borderLeftWidth: 4,
        borderLeftColor: borderColor,
      }}
    >
      <View className="mb-2 flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="mb-1 text-sm font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400">
            {description}
          </Text>
        </View>
        <View
          className="ml-2 rounded px-2 py-1"
          style={{ backgroundColor: statusColor }}
        >
          <Text className="text-xs text-white">{status}</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <FontAwesome name="user" size={10} color="#9ca3af" />
          <Text className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            {assignee}
          </Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome name="clock-o" size={10} color="#9ca3af" />
          <Text className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
};
