import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import { Text, View } from '@/components/ui';

type StatCardProps = {
  label: string;
  value: number;
  gradientColors: [string, string];
};
// 统计卡片数据类型
export type StatCardData = {
  label: string;
  value: number;
  gradientColors: [string, string];
};
export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  gradientColors,
}) => (
  <View className="w-[23%]">
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 12, padding: 12, alignItems: 'center' }}
    >
      <Text className="text-2xl font-bold text-white">{value}</Text>
      <Text className="mt-0.5 text-[10px] text-white opacity-90">{label}</Text>
    </LinearGradient>
  </View>
);
