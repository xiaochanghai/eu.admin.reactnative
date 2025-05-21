import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

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
  <View className="mb-3 w-[48%] rounded-2xl bg-white p-3 shadow-sm">
    <Text className="text-sm text-gray-600">{title}</Text>
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

export const Sales: React.FC = () => {
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

  // 客户地区分布数据
  const customerRegionData = [
    {
      name: '华东地区',
      population: 45,
      color: '#3b82f6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '华南地区',
      population: 25,
      color: '#22c55e',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '华北地区',
      population: 15,
      color: '#f59e0b',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '其他地区',
      population: 15,
      color: '#ef4444',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <>
      {/* 时间选择器 */}
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold">销售数据</Text>
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

      {/* 销售业绩概览 */}
      <View className="mb-4 flex-row flex-wrap justify-between">
        <KpiCard
          title="本月销售额"
          value="¥1,258,600"
          trend="↑ 12.5%"
          trendUp={true}
          color="#0066ff"
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

      {/* 客户地区分布 */}
      <View className="mb-10 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold">客户地区分布</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center">
          <PieChart
            data={customerRegionData}
            width={screenWidth - 24} // 考虑内边距
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
