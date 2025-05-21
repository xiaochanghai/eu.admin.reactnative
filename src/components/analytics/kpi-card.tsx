import React from 'react';

import { Text, View } from '@/components/ui';
// KPI卡片组件
type KpiCardProps = {
  title: string;
  value: string;
  trend: string;
  trendUp?: boolean;
  color: string;
};

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  trend,
  trendUp = true,
  color,
}) => (
  <View className="mb-3 w-[48%] rounded-2xl bg-white p-3 shadow-sm">
    <Text className="text-sm text-gray-500">{title}</Text>
    <Text className="mt-1 text-xl font-bold" style={{ color }}>
      {value}
    </Text>
    <Text
      className="mt-1 text-xs"
      style={{ color: trendUp ? '#22c55e' : '#ef4444' }}
    >
      {trend}
    </Text>
  </View>
);
