import React from 'react';

import { Text, View } from '@/components/ui';

export type StatCardProps = {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
  isDark: boolean;
};

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  bgColor,
  textColor,
  isDark,
}) => {
  // 在暗黑模式下使用半透明的深色背景
  const darkBgColor = isDark ? 'rgba(64, 64, 64, 0.5)' : bgColor;

  return (
    <View
      className="rounded-xl p-4 text-center"
      style={{ backgroundColor: darkBgColor }}
    >
      <Text className="mb-1 text-2xl font-bold" style={{ color: textColor }}>
        {value}
      </Text>
      <Text className="text-sm text-gray-600 dark:text-gray-400">{label}</Text>
    </View>
  );
};
