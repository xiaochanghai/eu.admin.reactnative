import React, { useState } from 'react';
import { Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

import { NavHeader, ScrollView, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

// 获取屏幕宽度用于图表响应式设计
const screenWidth = Dimensions.get('window').width;

// 分段控制器选项类型
type SegmentedControlOption = {
  key: string;
  label: string;
};

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

// 图表图例项组件
// type ChartLegendItemProps = {
//   color: string;
//   label: string;
// };

// const ChartLegendItem: React.FC<ChartLegendItemProps> = ({ color, label }) => (
//   <View className="flex-row items-center">
//     <View
//       className="mr-1 size-3 rounded-full"
//       style={{ backgroundColor: color }}
//     />
//     <Text className="text-xs text-gray-500">{label}</Text>
//   </View>
// );

// 报表项组件
type ReportItemProps = {
  icon: string;
  iconColor: string;
  title: string;
  date: string;
  onPress: () => void;
};

const ReportItem: React.FC<ReportItemProps> = ({
  icon,
  iconColor,
  title,
  date,
  onPress,
}) => (
  <View className="mb-2 flex-row items-center justify-between rounded-lg bg-gray-50 p-3">
    <View className="flex-row items-center">
      <FontAwesome
        name={icon}
        size={20}
        color={iconColor}
        style={{ marginRight: 12 }}
      />
      <View>
        <Text className="text-sm font-medium">{title}</Text>
        <Text className="mt-0.5 text-xs text-gray-500">{date}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={onPress}>
      <FontAwesome name="download" size={16} color="#0066ff" />
    </TouchableOpacity>
  </View>
);

// 图表通用配置
const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#3b82f6',
  },
};

const Analytics: React.FC = () => {
  // 分段控制器选项
  const segmentedOptions: SegmentedControlOption[] = [
    { key: 'overview', label: '总览' },
    { key: 'production-analytics', label: '生产分析' },
    { key: 'sales-analytics', label: '销售分析' },
    { key: 'inventory-analytics', label: '库存分析' },
    { key: 'quality-analytics', label: '质量分析' },
  ];

  // 当前选中的选项
  const [activeSegment, setActiveSegment] = useState<string>('overview');

  // 处理选项卡切换
  const handleSegmentChange = (key: string) => {
    setActiveSegment(key);
  };

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
  const productCategoryData = [
    {
      name: '智能手表',
      population: 45,
      color: '#3b82f6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '智能音箱',
      population: 25,
      color: '#22c55e',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '智能门锁',
      population: 15,
      color: '#f59e0b',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '其他产品',
      population: 15,
      color: '#ef4444',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <NavHeader
        title="数据分析"
        // right={
        //   <>
        //     <TouchableOpacity>
        //       <FontAwesome name="plus" size={12} />
        //     </TouchableOpacity>
        //   </>
        // }
      />
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 分段控制器 */}
        <View className="mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'row',
              backgroundColor: '#f3f4f6',
              borderRadius: 8,
              padding: 4,
            }}
          >
            {segmentedOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                className={`mr-1 rounded-md px-4 py-2 ${activeSegment === option.key ? 'bg-white shadow-sm' : ''}`}
                onPress={() => handleSegmentChange(option.key)}
              >
                <Text
                  className={`text-sm ${activeSegment === option.key ? 'font-medium text-blue-600' : 'text-gray-500'}`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 总览选项卡内容 */}
        {activeSegment === 'overview' && (
          <View>
            {/* 时间选择器 */}
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-lg font-semibold">本月数据</Text>
              <View className="flex-row overflow-hidden rounded-lg border border-gray-200 bg-white">
                <TouchableOpacity className="border-r border-gray-200 px-3 py-1">
                  <Text className="text-sm text-gray-500">日</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border-r border-gray-200 bg-blue-50 px-3 py-1">
                  <Text className="text-sm text-blue-600">月</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-3 py-1">
                  <Text className="text-sm text-gray-500">年</Text>
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
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-lg font-semibold">销售趋势</Text>
                <TouchableOpacity>
                  <Text className="text-sm text-blue-600">详情</Text>
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
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-lg font-semibold">生产与订单对比</Text>
                <TouchableOpacity>
                  <Text className="text-sm text-blue-600">详情</Text>
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
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-lg font-semibold">产品类别分布</Text>
                <TouchableOpacity>
                  <Text className="text-sm text-blue-600">详情</Text>
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
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              <Text className="mb-3 text-lg font-semibold">数据报表</Text>
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;
