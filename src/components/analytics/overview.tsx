import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

import { useAppColorScheme } from '@/lib';

import { KpiCard } from './kpi-card';
import { ReportItem } from './report-item';

const screenWidth = Dimensions.get('window').width;

// 销售趋势数据
const salesData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
  datasets: [
    {
      data: [60, 75, 45, 80, 65, 90, 70, 85, 95],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ['销售额'],
};

// 生产与订单对比数据
const productionOrderData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
  datasets: [
    {
      data: [40, 30, 45, 50, 65, 60, 70, 72, 85],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [30, 40, 35, 45, 55, 50, 60, 65, 75],
      color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ['订单量', '生产量'],
};

// 产品类别分布数据
const getProductCategoryData = (isDark: boolean) => [
  {
    name: '智能手表',
    population: 45,
    color: '#3b82f6',
    legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: '智能音箱',
    population: 25,
    color: '#22c55e',
    legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: '智能门锁',
    population: 15,
    color: '#f59e0b',
    legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: '其他产品',
    population: 15,
    color: '#ef4444',
    legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
    legendFontSize: 12,
  },
];

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

export const OverView = () => {
  const { isDark } = useAppColorScheme();
  const chartConfig = getChartConfig(isDark);
  const productCategoryData = getProductCategoryData(isDark);

  return (
    <View>
      {/* 时间选择器 */}
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">本月数据</Text>
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

      {/* KPI指标 */}
      <View className="mb-4 flex-row flex-wrap justify-between">
        <KpiCard
          title="总订单金额"
          value="¥1,258,600"
          trend="↑ 12.5%"
          trendUp={true}
          color="#0066ff"
        />
        <KpiCard
          title="生产完成率"
          value="78.5%"
          trend="↑ 5.2%"
          trendUp={true}
          color="#22c55e"
        />
        <KpiCard
          title="库存周转率"
          value="4.2"
          trend="↑ 0.3"
          trendUp={true}
          color="#f97316"
        />
        <KpiCard
          title="质检合格率"
          value="98.5%"
          trend="↑ 1.2%"
          trendUp={true}
          color="#a855f7"
        />
      </View>

      {/* 销售趋势图 - 使用BarChart替换自定义图表 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">销售趋势</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600 dark:text-blue-400">详情</Text>
          </TouchableOpacity>
        </View>
        <BarChart
          data={salesData}
          width={screenWidth - 48} // 考虑内边距
          height={220}
          yAxisLabel="¥"
          yAxisSuffix="万"
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          showBarTops={true}
          fromZero={true}
        />
      </View>

      {/* 生产与订单对比 - 使用LineChart替换自定义图表 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">生产与订单对比</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600 dark:text-blue-400">详情</Text>
          </TouchableOpacity>
        </View>
        <LineChart
          data={productionOrderData}
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

      {/* 产品类别分布 - 使用PieChart替换自定义图表 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">产品类别分布</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600 dark:text-blue-400">详情</Text>
          </TouchableOpacity>
        </View>
        <PieChart
          data={productCategoryData}
          width={screenWidth - 48} // 考虑内边距
          height={220}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 10]}
          absolute
        />
      </View>

      {/* 数据报表下载 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">数据报表</Text>
        <View className="mt-2">
          <ReportItem
            icon="file-pdf-o"
            iconColor="#ef4444"
            title="月度销售报表"
            date="2023年11月"
            onPress={() => {}}
          />
          <ReportItem
            icon="file-excel-o"
            iconColor="#22c55e"
            title="生产效率分析"
            date="2023年11月"
            onPress={() => {}}
          />
          <ReportItem
            icon="file-powerpoint-o"
            iconColor="#f97316"
            title="质量控制报告"
            date="2023年11月"
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};
