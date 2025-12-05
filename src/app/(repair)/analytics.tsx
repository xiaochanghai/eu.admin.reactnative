import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';

// 时间范围类型
type TimeRange = 'month' | 'quarter' | 'year' | 'custom';

// 关键指标卡片组件
type MetricCardProps = {
  icon: string;
  value: string;
  label: string;
  trend: string;
  trendUp: boolean;
  gradientColors: [string, string];
};

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  value,
  label,
  trend,
  trendUp,
  gradientColors,
}) => (
  <View className="mb-3 w-[48%]">
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 12,
        padding: 16,
      }}
    >
      <View className="mb-2 flex-row items-center justify-between">
        <FontAwesome
          name={icon as any}
          size={24}
          color="rgba(255,255,255,0.8)"
        />
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <Text className="text-xs text-white">
            {trendUp ? '↑' : '↓'} {trend}
          </Text>
        </View>
      </View>
      <Text className="mb-1 text-2xl font-bold text-white">{value}</Text>
      <Text className="text-sm text-white opacity-90">{label}</Text>
    </LinearGradient>
  </View>
);

// 时间筛选按钮组件
type TimeFilterButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const TimeFilterButton: React.FC<TimeFilterButtonProps> = ({
  label,
  isActive,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className={`mr-2 rounded-lg px-4 py-2 ${isActive ? 'bg-primary-500' : 'bg-gray-100 dark:bg-neutral-700'}`}
  >
    <Text
      className={`whitespace-nowrap text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// 设备状态图例组件
type StatusLegendProps = {
  color: string;
  label: string;
  count: number;
};

const StatusLegend: React.FC<StatusLegendProps> = ({ color, label, count }) => (
  <View className="items-center">
    <View
      className="mx-auto mb-1 size-3 rounded-full"
      style={{ backgroundColor: color }}
    />
    <Text className="text-xs text-gray-600 dark:text-gray-400">{label}</Text>
    <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
      {count}
    </Text>
  </View>
);

// 故障类型进度条组件
type FaultTypeBarProps = {
  label: string;
  percentage: number;
  color: string;
};

const FaultTypeBar: React.FC<FaultTypeBarProps> = ({
  label,
  percentage,
  color,
}) => (
  <View className="mb-3">
    <View className="mb-1 flex-row justify-between">
      <Text className="text-sm text-gray-600 dark:text-gray-400">{label}</Text>
      <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {percentage}%
      </Text>
    </View>
    <View className="h-2 w-full rounded-full bg-gray-200 dark:bg-neutral-700">
      <View
        className="h-2 rounded-full"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </View>
  </View>
);

// TOP设备排名组件
type TopEquipmentItemProps = {
  rank: number;
  name: string;
  location: string;
  count: number;
  rankColor: string;
  bgColor: string;
  countColor: string;
};

const TopEquipmentItem: React.FC<TopEquipmentItemProps> = ({
  rank,
  name,
  location,
  count,
  rankColor,
  bgColor,
  countColor,
}) => {
  const { isDark } = useAppColorScheme();

  return (
    <View
      className="mb-3 flex-row items-center justify-between rounded-lg p-3"
      style={{ backgroundColor: isDark ? 'rgba(64, 64, 64, 0.5)' : bgColor }}
    >
      <View className="flex-1 flex-row items-center">
        <View
          className="size-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: rankColor }}
        >
          <Text className="text-sm font-bold text-white">{rank}</Text>
        </View>
        <View className="ml-3 flex-1">
          <Text
            className="text-sm font-semibold text-gray-800 dark:text-gray-100"
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {location}
          </Text>
        </View>
      </View>
      <View className="ml-2 items-end">
        <Text className="text-sm font-bold" style={{ color: countColor }}>
          {count}次
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400">本月</Text>
      </View>
    </View>
  );
};

// 图表占位组件（可以替换为真实的图表库）
const ChartPlaceholder: React.FC<{ height: number; type: string }> = ({
  height,
  type,
}) => (
  <View
    className="items-center justify-center rounded-lg bg-gray-100 dark:bg-neutral-700"
    style={{ height }}
  >
    <FontAwesome name="chart-line" size={48} color="#9ca3af" />
    <Text className="mt-2 text-sm text-gray-400 dark:text-gray-500">
      {type}图表占位
    </Text>
    <Text className="mt-1 text-xs text-gray-400 dark:text-gray-500">
      可接入 react-native-chart-kit
    </Text>
  </View>
);

const Analytics: React.FC = () => {
  // const router = useRouter();
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const { isDark } = useAppColorScheme();

  // 关键指标数据
  const metrics = [
    {
      icon: 'chart-line',
      value: '95.2%',
      label: '设备完好率',
      trend: '12%',
      trendUp: true,
      gradientColors: ['#3b82f6', '#2563eb'] as [string, string],
    },
    {
      icon: 'clock-o',
      value: '2.5h',
      label: '平均维修时间',
      trend: '8%',
      trendUp: false,
      gradientColors: ['#22c55e', '#16a34a'] as [string, string],
    },
    {
      icon: 'rmb',
      value: '¥58.5K',
      label: '维修成本',
      trend: '15%',
      trendUp: false,
      gradientColors: ['#f97316', '#ea580c'] as [string, string],
    },
    {
      icon: 'tasks',
      value: '98.5%',
      label: '任务完成率',
      trend: '5%',
      trendUp: true,
      gradientColors: ['#a855f7', '#9333ea'] as [string, string],
    },
  ];

  // 设备状态数据
  const equipmentStatus = [
    { color: '#22c55e', label: '运行中', count: 142 },
    { color: '#f97316', label: '维修中', count: 8 },
    { color: '#ef4444', label: '故障', count: 6 },
    { color: '#9ca3af', label: '停用', count: 0 },
  ];

  // 故障类型数据
  const faultTypes = [
    { label: '机械故障', percentage: 45, color: '#3b82f6' },
    { label: '电气故障', percentage: 30, color: '#22c55e' },
    { label: '液压故障', percentage: 15, color: '#f97316' },
    { label: '其他', percentage: 10, color: '#a855f7' },
  ];

  // TOP设备数据
  const topEquipments = [
    {
      rank: 1,
      name: '空压机 AC-05',
      location: '动力车间',
      count: 15,
      rankColor: '#f5222d',
      bgColor: '#fef2f2',
      countColor: '#f5222d',
    },
    {
      rank: 2,
      name: '注塑机 IM-03',
      location: 'B车间',
      count: 12,
      rankColor: '#faad14',
      bgColor: '#fff7ed',
      countColor: '#faad14',
    },
    {
      rank: 3,
      name: '传送带 CB-02',
      location: 'C车间',
      count: 8,
      rankColor: '#9ca3af',
      bgColor: '#f9fafb',
      countColor: '#6b7280',
    },
  ];

  const handleDownload = () => {
    console.log('Download report');
    // 实现下载报告功能
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader
        title="分析"
        leftShown={false}
        right={
          <TouchableOpacity onPress={handleDownload} activeOpacity={0.7}>
            <FontAwesome
              name="download"
              size={20}
              color={isDark ? '#9ca3af' : '#6b7280'}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 时间筛选 */}
        <View className="mb-4 rounded-xl bg-white p-3 shadow-sm dark:bg-neutral-800">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row space-x-2"
          >
            <TimeFilterButton
              label="本月"
              isActive={timeRange === 'month'}
              onPress={() => setTimeRange('month')}
            />
            <TimeFilterButton
              label="本季度"
              isActive={timeRange === 'quarter'}
              onPress={() => setTimeRange('quarter')}
            />
            <TimeFilterButton
              label="本年"
              isActive={timeRange === 'year'}
              onPress={() => setTimeRange('year')}
            />
            <TimeFilterButton
              label="自定义"
              isActive={timeRange === 'custom'}
              onPress={() => setTimeRange('custom')}
            />
          </ScrollView>
        </View>

        {/* 关键指标 */}
        <View className="mb-4 flex-row flex-wrap justify-between">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </View>

        {/* 维修趋势图 */}
        <View className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <Text className="mb-3 text-base font-semibold text-gray-800 dark:text-gray-100">
            维修工单趋势
          </Text>
          <ChartPlaceholder height={192} type="折线" />
        </View>

        {/* 设备状态分布 */}
        <View className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <Text className="mb-3 text-base font-semibold text-gray-800 dark:text-gray-100">
            设备状态分布
          </Text>
          <ChartPlaceholder height={192} type="饼图" />
          <View className="mt-4 flex-row justify-around">
            {equipmentStatus.map((status, index) => (
              <StatusLegend
                key={index}
                color={status.color}
                label={status.label}
                count={status.count}
              />
            ))}
          </View>
        </View>

        {/* 故障类型分析 */}
        <View className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <Text className="mb-3 text-base font-semibold text-gray-800 dark:text-gray-100">
            故障类型分析
          </Text>
          {faultTypes.map((fault, index) => (
            <FaultTypeBar
              key={index}
              label={fault.label}
              percentage={fault.percentage}
              color={fault.color}
            />
          ))}
        </View>

        {/* TOP故障设备 */}
        <View className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <Text className="mb-3 text-base font-semibold text-gray-800 dark:text-gray-100">
            故障频次TOP5
          </Text>
          {topEquipments.map((equipment) => (
            <TopEquipmentItem key={equipment.rank} {...equipment} />
          ))}
        </View>

        {/* 底部空间 - 为底部导航留出空间 */}
        <View className="h-[70px]" />
      </ScrollView>
    </View>
  );
};

export default Analytics;
