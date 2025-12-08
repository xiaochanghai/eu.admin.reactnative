import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

import { useAppColorScheme } from '@/lib';

// 获取屏幕宽度用于图表响应式设计
const screenWidth = Dimensions.get('window').width;

// KPI卡片组件
type KpiCardProps = {
  title: string;
  value: string;
  trend: string;
  trendUp?: boolean;
  color: string;
};

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  trend,
  trendUp = true,
  color,
}) => (
  <View className="mb-3 w-[48%] rounded-2xl bg-white p-3 shadow-sm dark:bg-gray-800">
    <Text className="text-sm text-gray-600 dark:text-gray-400">{title}</Text>
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

// 库存预警项组件
type InventoryAlertItemProps = {
  name: string;
  currentStock: string;
  safetyStock: string;
  level: 'urgent' | 'warning' | 'normal';
};

const InventoryAlertItem: React.FC<InventoryAlertItemProps> = ({
  name,
  currentStock,
  safetyStock,
  level,
}) => {
  let bgColor = 'bg-red-50 dark:bg-red-900/20';
  let borderColor = 'border-red-500';
  let textColor = 'text-red-600 dark:text-red-400';
  let levelText = '紧急';

  if (level === 'warning') {
    bgColor = 'bg-yellow-50 dark:bg-yellow-900/20';
    borderColor = 'border-yellow-500';
    textColor = 'text-yellow-600 dark:text-yellow-400';
    levelText = '注意';
  } else if (level === 'normal') {
    bgColor = 'bg-green-50 dark:bg-green-900/20';
    borderColor = 'border-green-500';
    textColor = 'text-green-600 dark:text-green-400';
    levelText = '正常';
  }

  return (
    <View
      className={`flex-row items-center justify-between p-3 ${bgColor} rounded-lg border-l-4 ${borderColor} mb-2`}
    >
      <View>
        <Text className="font-medium text-gray-900 dark:text-gray-100">{name}</Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          当前库存: {currentStock} | 安全库存: {safetyStock}
        </Text>
      </View>
      <Text className={`text-sm font-medium ${textColor}`}>{levelText}</Text>
    </View>
  );
};

// 图表通用配置
const getChartConfig = (isDark: boolean) => ({
  backgroundColor: isDark ? '#1f2937' : '#ffffff',
  backgroundGradientFrom: isDark ? '#1f2937' : '#ffffff',
  backgroundGradientTo: isDark ? '#1f2937' : '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => isDark ? `rgba(156, 163, 175, ${opacity})` : `rgba(107, 114, 128, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#3b82f6',
  },
});

export const Inventory: React.FC = () => {
  const { isDark } = useAppColorScheme();
  const chartConfig = getChartConfig(isDark);

  // 库存周转率趋势数据
  const inventoryTurnoverData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    datasets: [
      {
        data: [4.0, 3.8, 3.7, 3.5, 3.8, 4.0, 4.1, 4.2, 4.2],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['周转率'],
  };

  // 库存状态分布数据
  const inventoryStatusData = [
    {
      name: '正常',
      population: 65,
      color: '#10b981',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '偏低',
      population: 20,
      color: '#f59e0b',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '预警',
      population: 15,
      color: '#ef4444',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 时间选择器 */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">库存数据</Text>
          <View className="flex-row overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800">
            <TouchableOpacity className="border-r border-gray-200 px-3 py-1 dark:border-gray-600">
              <Text className="text-sm text-gray-500 dark:text-gray-400">日</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border-r border-gray-200 bg-blue-50 px-3 py-1 dark:border-gray-600 dark:bg-blue-900/30">
              <Text className="text-sm text-blue-600 dark:text-blue-400">月</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-3 py-1">
              <Text className="text-sm text-gray-500 dark:text-gray-400">年</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 库存概览 */}
        <View className="mb-4 flex-row flex-wrap justify-between">
          <KpiCard
            title="库存总价值"
            value="¥3,856,200"
            trend="↑ 5.2%"
            trendUp={false}
            color="#0066ff"
          />
          <KpiCard
            title="库存周转率"
            value="4.2"
            trend="↑ 0.3"
            trendUp={true}
            color="#22c55e"
          />
          <KpiCard
            title="库存商品数"
            value="1,245"
            trend="↑ 3.8%"
            trendUp={false}
            color="#f97316"
          />
          <KpiCard
            title="库存预警数"
            value="28"
            trend="↓ 15.2%"
            trendUp={true}
            color="#ef4444"
          />
        </View>

        {/* 库存周转率趋势 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">库存周转率趋势</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600 dark:text-blue-400">详情</Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={inventoryTurnoverData}
            width={screenWidth - 48} // 考虑内边距
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* 库存状态分布 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">库存状态分布</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600 dark:text-blue-400">详情</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center">
            <PieChart
              data={inventoryStatusData}
              width={screenWidth - 24} // 考虑内边距
              height={180}
              chartConfig={chartConfig}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              center={[10, 10]}
              absolute
            />
            <View className="ml-4 flex-1">
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <View className="mr-2 size-3 rounded-full bg-green-500" />
                  <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">正常</Text>
                  <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">65%</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="mr-2 size-3 rounded-full bg-yellow-500" />
                  <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">偏低</Text>
                  <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">20%</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="mr-2 size-3 rounded-full bg-red-500" />
                  <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">预警</Text>
                  <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">15%</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 库存预警列表 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">库存预警</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600 dark:text-blue-400">查看全部</Text>
            </TouchableOpacity>
          </View>
          <View className="space-y-3">
            <InventoryAlertItem
              name="智能手表主板"
              currentStock="58"
              safetyStock="100"
              level="urgent"
            />
            <InventoryAlertItem
              name="智能音箱外壳"
              currentStock="120"
              safetyStock="150"
              level="warning"
            />
            <InventoryAlertItem
              name="门锁电池"
              currentStock="230"
              safetyStock="300"
              level="warning"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
