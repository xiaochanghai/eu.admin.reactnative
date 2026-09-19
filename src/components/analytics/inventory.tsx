import React from 'react';
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

import { useAppColorScheme } from '@/lib';

import { getAnalyticsChartConfig, PeriodHeader } from './analytics-ui';
import { KpiCard } from './kpi-card';

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
        <Text className="font-medium text-gray-900 dark:text-gray-100">
          {name}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          当前库存: {currentStock} | 安全库存: {safetyStock}
        </Text>
      </View>
      <Text className={`text-sm font-medium ${textColor}`}>{levelText}</Text>
    </View>
  );
};

export const Inventory: React.FC = () => {
  const { isDark } = useAppColorScheme();
  const { width } = useWindowDimensions();
  const chartWidth = width - 64;
  const chartConfig = getAnalyticsChartConfig(isDark);

  // 库存周转率趋势数据
  const inventoryTurnoverData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    datasets: [
      {
        data: [4.0, 3.8, 3.7, 3.5, 3.8, 4.0, 4.1, 4.2, 4.2],
        color: (opacity = 1) => `rgba(109, 87, 255, ${opacity})`,
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
    <View>
      {/* 时间选择器 */}
      <PeriodHeader title="库存数据" description="3 个仓库" />

      {/* 库存概览 */}
      <View className="mb-2 flex-row flex-wrap justify-between">
        <KpiCard
          title="库存总价值"
          value="¥3,856,200"
          trend="↑ 5.2%"
          trendUp={false}
          color="#6D57FF"
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
      <View className="mb-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-bold text-neutral-900 dark:text-white">
            库存周转率趋势
          </Text>
          <TouchableOpacity>
            <Text className="text-xs font-semibold text-primary-500 dark:text-primary-300">
              详情
            </Text>
          </TouchableOpacity>
        </View>
        <LineChart
          data={inventoryTurnoverData}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            marginLeft: -10,
          }}
        />
      </View>

      {/* 库存状态分布 */}
      <View className="mb-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-bold text-neutral-900 dark:text-white">
            库存状态分布
          </Text>
          <TouchableOpacity>
            <Text className="text-xs font-semibold text-primary-500 dark:text-primary-300">
              详情
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center">
          <PieChart
            data={inventoryStatusData}
            width={chartWidth * 0.58}
            height={180}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft="8"
            center={[0, 0]}
            absolute
            hasLegend={false}
          />
          <View className="ml-2 flex-1">
            <View className="space-y-2">
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-green-500" />
                <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                  正常
                </Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  65%
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-yellow-500" />
                <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                  偏低
                </Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  20%
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-red-500" />
                <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                  预警
                </Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  15%
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 库存预警列表 */}
      <View className="mb-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-bold text-neutral-900 dark:text-white">
            库存预警
          </Text>
          <TouchableOpacity>
            <Text className="text-xs font-semibold text-primary-500 dark:text-primary-300">
              查看全部
            </Text>
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
    </View>
  );
};
