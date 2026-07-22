import React from 'react';
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

import { useAppColorScheme } from '@/lib';

import { getAnalyticsChartConfig, PeriodHeader } from './analytics-ui';
import { KpiCard } from './kpi-card';

export const Sales: React.FC = () => {
  const { isDark } = useAppColorScheme();
  const { width } = useWindowDimensions();
  const chartWidth = width - 64;
  const chartConfig = getAnalyticsChartConfig(isDark);

  // 销售趋势数据
  const salesData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    datasets: [
      {
        data: [60, 75, 45, 80, 65, 90, 70, 85, 95],
        color: (opacity = 1) => `rgba(109, 87, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['销售额'],
  };

  // 客户地区分布数据
  const customerRegionData = [
    {
      name: '华东地区',
      population: 45,
      color: '#6D57FF',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '华南地区',
      population: 25,
      color: '#22c55e',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '华北地区',
      population: 15,
      color: '#f59e0b',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '其他地区',
      population: 15,
      color: '#ef4444',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <>
      {/* 时间选择器 */}
      <PeriodHeader title="销售数据" description="1,245 笔订单" />

      {/* 销售业绩概览 */}
      <View className="mb-2 flex-row flex-wrap justify-between">
        <KpiCard
          title="本月销售额"
          value="¥1,258,600"
          trend="↑ 12.5%"
          trendUp={true}
          color="#6D57FF"
        />
        <KpiCard
          title="订单数量"
          value="1,245"
          trend="↑ 8.3%"
          trendUp={true}
          color="#22c55e"
        />
        <KpiCard
          title="客单价"
          value="¥1,011"
          trend="↑ 3.8%"
          trendUp={true}
          color="#f97316"
        />
        <KpiCard
          title="新客户数"
          value="328"
          trend="↑ 15.2%"
          trendUp={true}
          color="#a855f7"
        />
      </View>

      {/* 销售趋势图 */}
      <View className="mb-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-bold text-neutral-900 dark:text-white">
            销售趋势
          </Text>
          <TouchableOpacity>
            <Text className="text-xs font-semibold text-primary-500 dark:text-primary-300">
              详情
            </Text>
          </TouchableOpacity>
        </View>
        <BarChart
          data={salesData}
          width={chartWidth}
          height={220}
          yAxisLabel="¥"
          yAxisSuffix="万"
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            marginLeft: -10,
          }}
          showBarTops={true}
          fromZero={true}
        />
      </View>

      {/* 客户地区分布 */}
      <View className="mb-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-bold text-neutral-900 dark:text-white">
            客户地区分布
          </Text>
          <TouchableOpacity>
            <Text className="text-xs font-semibold text-primary-500 dark:text-primary-300">
              详情
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center">
          <PieChart
            data={customerRegionData}
            width={chartWidth}
            height={180}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[10, 10]}
            absolute
          />
        </View>
      </View>
    </>
  );
};
