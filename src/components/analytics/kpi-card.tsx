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
  <View className="mb-3 min-h-[118px] w-[48.5%] justify-between rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
    <View className="flex-row items-center">
      <View
        className="mr-2 h-4 w-1 rounded-full"
        style={{ backgroundColor: color }}
      />
      <Text className="flex-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
        {title}
      </Text>
    </View>
    <Text className="mt-3 text-[22px] font-bold tracking-tight text-neutral-950 dark:text-white">
      {value}
    </Text>
    <View className="mt-2 flex-row items-center">
      <View
        className={`rounded-md px-1.5 py-0.5 ${
          trendUp
            ? 'bg-success-50 dark:bg-success-900/20'
            : 'bg-danger-50 dark:bg-danger-900/20'
        }`}
      >
        <Text
          className={`text-[11px] font-semibold ${
            trendUp
              ? 'text-success-600 dark:text-success-400'
              : 'text-danger-600 dark:text-danger-400'
          }`}
        >
          {trend}
        </Text>
      </View>
      <Text className="ml-1.5 text-[10px] text-neutral-400">较上期</Text>
    </View>
  </View>
);
