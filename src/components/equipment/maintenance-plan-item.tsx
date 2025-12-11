import React from 'react';

import { Text, View } from '@/components/ui';

export type MaintenancePlanItemProps = {
  title: string;
  date: string;
  daysLeft: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  isDark: boolean;
};

export const MaintenancePlanItem: React.FC<MaintenancePlanItemProps> = ({
  title,
  date,
  daysLeft,
  borderColor,
  bgColor,
  textColor,
  isDark,
}) => {
  // 在暗黑模式下使用半透明的深色背景
  const darkBgColor = isDark ? 'rgba(64, 64, 64, 0.3)' : bgColor;

  return (
    <View
      className="mb-3 flex-row items-center rounded-lg p-3"
      style={{
        backgroundColor: darkBgColor,
        borderLeftWidth: 4,
        borderLeftColor: borderColor,
      }}
    >
      <View className="flex-1">
        <Text className="mb-1 text-sm font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </Text>
        <Text className="text-xs text-gray-600 dark:text-gray-400">
          下次保养时间：{date}
        </Text>
      </View>
      <Text className="text-xs font-semibold" style={{ color: textColor }}>
        {daysLeft}
      </Text>
    </View>
  );
};
