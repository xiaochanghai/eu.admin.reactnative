import React, { useState } from 'react';
import type { LayoutChangeEvent, ViewProps } from 'react-native';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';

export const ANALYTICS_ACCENT = '#6D57FF';

type PeriodHeaderProps = {
  title: string;
  description?: string;
};

export const PeriodHeader: React.FC<PeriodHeaderProps> = ({
  title,
  description,
}) => {
  const [period, setPeriod] = useState('月');
  const periodLabel =
    period === '日' ? '今日' : period === '月' ? '本月' : '本年';

  return (
    <View className="mb-5 flex-row items-end justify-between">
      <View className="mr-4 flex-1">
        <Text className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {title}
        </Text>
        <Text className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          统计周期：{periodLabel}
          {description ? ` · ${description}` : ''}
        </Text>
      </View>
      <View className="flex-row rounded-xl bg-neutral-200/70 p-1 dark:bg-neutral-800">
        {['日', '月', '年'].map((item) => {
          const active = period === item;

          return (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => setPeriod(item)}
              className={`min-h-[32px] min-w-[36px] items-center justify-center rounded-lg px-2 ${
                active ? 'bg-white dark:bg-neutral-700' : ''
              }`}
              style={({ pressed }) => ({ opacity: pressed ? 0.65 : 1 })}
            >
              <Text
                className={`text-xs font-semibold ${
                  active
                    ? 'text-primary-500 dark:text-primary-300'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

type SectionProps = ViewProps & {
  title: string;
  description?: string;
  actionLabel?: string;
  children: React.ReactNode;
};

export const AnalyticsSection: React.FC<SectionProps> = ({
  title,
  description,
  actionLabel = '查看详情',
  children,
  ...props
}) => (
  <View
    className="mb-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
    {...props}
  >
    <View className="mb-4 flex-row items-start justify-between">
      <View className="mr-3 flex-1">
        <Text className="text-base font-bold text-neutral-900 dark:text-white">
          {title}
        </Text>
        {description ? (
          <Text className="mt-1 text-xs leading-5 text-neutral-500 dark:text-neutral-400">
            {description}
          </Text>
        ) : null}
      </View>
      {actionLabel ? (
        <Pressable
          accessibilityRole="button"
          className="min-h-[32px] flex-row items-center justify-center rounded-lg px-1"
          style={({ pressed }) => ({ opacity: pressed ? 0.55 : 1 })}
        >
          <Text className="text-xs font-semibold text-primary-500 dark:text-primary-300">
            {actionLabel}
          </Text>
          <FontAwesome
            name="chevron-right"
            group={GroupEnum.Feather}
            size={14}
            color={ANALYTICS_ACCENT}
            style={{ marginLeft: 2 }}
          />
        </Pressable>
      ) : null}
    </View>
    {children}
  </View>
);

type ResponsiveChartProps = {
  children: (width: number) => React.ReactNode;
};

export const ResponsiveChart: React.FC<ResponsiveChartProps> = ({
  children,
}) => {
  const [width, setWidth] = useState(0);
  const onLayout = (event: LayoutChangeEvent) => {
    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    if (nextWidth !== width) setWidth(nextWidth);
  };

  return (
    <View className="overflow-hidden" onLayout={onLayout}>
      {width > 0 ? children(width) : <View className="h-[220px]" />}
    </View>
  );
};

export const getAnalyticsChartConfig = (
  isDark: boolean,
  decimalPlaces = 0
) => ({
  backgroundColor: isDark ? '#171717' : '#ffffff',
  backgroundGradientFrom: isDark ? '#171717' : '#ffffff',
  backgroundGradientTo: isDark ? '#171717' : '#ffffff',
  decimalPlaces,
  color: (opacity = 1) => `rgba(109, 87, 255, ${opacity})`,
  labelColor: (opacity = 1) =>
    isDark
      ? `rgba(163, 163, 163, ${opacity})`
      : `rgba(115, 115, 115, ${opacity})`,
  fillShadowGradientFrom: ANALYTICS_ACCENT,
  fillShadowGradientTo: ANALYTICS_ACCENT,
  fillShadowGradientOpacity: 0.12,
  propsForBackgroundLines: {
    stroke: isDark ? '#262626' : '#F0EFEE',
    strokeDasharray: '',
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: isDark ? '#171717' : '#ffffff',
  },
});

type LegendItemProps = {
  color: string;
  label: string;
  value: string;
};

export const LegendItem: React.FC<LegendItemProps> = ({
  color,
  label,
  value,
}) => (
  <View className="mb-2 flex-row items-center">
    <View
      className="mr-2 size-2 rounded-full"
      style={{ backgroundColor: color }}
    />
    <Text className="flex-1 text-xs text-neutral-500 dark:text-neutral-400">
      {label}
    </Text>
    <Text className="ml-2 text-xs font-bold text-neutral-900 dark:text-white">
      {value}
    </Text>
  </View>
);
