import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

import { KpiCard } from '@/components/analytics/kpi-card';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';

// 获取屏幕宽度用于图表响应式设计
const screenWidth = Dimensions.get('window').width;

// 产品质量对比项组件
type ProductQualityItemProps = {
  name: string;
  rate: string;
  percentage: number;
};

const ProductQualityItem: React.FC<ProductQualityItemProps> = ({
  name,
  rate,
  percentage,
}) => (
  <View className="mb-3">
    <View className="mb-1 flex-row justify-between text-sm">
      <Text className="text-gray-700">{name}</Text>
      <Text className="text-gray-700">{rate}</Text>
    </View>
    <View className="h-2 w-full rounded-full bg-gray-200">
      <View
        className="h-2 rounded-full bg-green-500"
        style={{ width: `${percentage}%` }}
      />
    </View>
  </View>
);

// 质量改进计划项组件
type QualityImprovementItemProps = {
  title: string;
  progress: string;
  dueDate: string;
  icon: string;
  color: string;
};

const QualityImprovementItem: React.FC<QualityImprovementItemProps> = ({
  title,
  progress,
  dueDate,
  icon,
  color,
}) => (
  <View className={`bg- flex-row items-center p-3${color}-50 mb-3 rounded-lg`}>
    <View
      className={`bg- size-10${color}-100 mr-3 items-center justify-center rounded-full`}
    >
      <FontAwesome
        name={icon}
        size={18}
        color={`#${color === 'blue' ? '0066ff' : color === 'green' ? '22c55e' : '8b5cf6'}`}
        group={
          icon === 'tools'
            ? GroupEnum.Entypo
            : icon === 'vial'
              ? GroupEnum.FontAwesome5
              : GroupEnum.FontAwesome
        }
      />
    </View>
    <View className="flex-1">
      <Text className="font-medium">{title}</Text>
      <Text className="text-xs text-gray-500">
        进度: {progress} | 预计完成: {dueDate}
      </Text>
    </View>
    <View className={`text-${color}-600`}>
      <FontAwesome
        name="chevron-right"
        size={16}
        color={`#${color === 'blue' ? '0066ff' : color === 'green' ? '22c55e' : '8b5cf6'}`}
      />
    </View>
  </View>
);

// 图表通用配置
const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 1,
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

export const Quality: React.FC = () => {
  // 质量合格率趋势数据
  const qualityTrendData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    datasets: [
      {
        data: [1.5, 1.2, 1.3, 1.5, 1.7, 2.0, 2.5, 3.0, 4.0],
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // 红色
        strokeWidth: 2,
      },
    ],
    legend: ['不良品率 (%)'],
  };

  // 不良品分析数据
  const defectAnalysisData = [
    {
      name: '组装不良',
      population: 35,
      color: '#ef4444',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '材料缺陷',
      population: 20,
      color: '#f59e0b',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '功能异常',
      population: 20,
      color: '#3b82f6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '外观瑕疵',
      population: 15,
      color: '#10b981',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '其他问题',
      population: 10,
      color: '#6b7280',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <>
      {/* 时间选择器 */}
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold">质量数据</Text>
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

      {/* 质量概览 */}
      <View className="mb-4 flex-row flex-wrap justify-between">
        <KpiCard
          title="质检合格率"
          value="98.5%"
          trend="↑ 0.8%"
          trendUp={true}
          color="#0066ff"
        />
        <KpiCard
          title="不良品数量"
          value="245"
          trend="↓ 12.3%"
          trendUp={true}
          color="#ef4444"
        />
        <KpiCard
          title="客户投诉率"
          value="0.5%"
          trend="↓ 0.2%"
          trendUp={true}
          color="#f97316"
        />
        <KpiCard
          title="返修率"
          value="0.8%"
          trend="↓ 0.3%"
          trendUp={true}
          color="#a855f7"
        />
      </View>

      {/* 质量合格率趋势 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold">质量合格率趋势</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
        <LineChart
          data={qualityTrendData}
          width={screenWidth - 48} // 考虑内边距
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // 红色
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Text className="mt-2 text-center text-xs text-gray-500">
          注：图表显示的是不良品率，数值越低越好
        </Text>
      </View>

      {/* 不良品分析 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold">不良品分析</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center">
          <PieChart
            data={defectAnalysisData}
            width={screenWidth / 2 - 24} // 考虑内边距
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
                <View className="mr-2 size-3 rounded-full bg-red-500" />
                <Text className="mr-2 text-sm text-gray-600">组装不良</Text>
                <Text className="text-sm font-medium">35%</Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-yellow-500" />
                <Text className="mr-2 text-sm text-gray-600">材料缺陷</Text>
                <Text className="text-sm font-medium">20%</Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-blue-500" />
                <Text className="mr-2 text-sm text-gray-600">功能异常</Text>
                <Text className="text-sm font-medium">20%</Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-green-500" />
                <Text className="mr-2 text-sm text-gray-600">外观瑕疵</Text>
                <Text className="text-sm font-medium">15%</Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-gray-500" />
                <Text className="mr-2 text-sm text-gray-600">其他问题</Text>
                <Text className="text-sm font-medium">10%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 产品质量对比 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold">产品质量对比</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
        <View className="space-y-3">
          <ProductQualityItem name="智能手表" rate="99.2%" percentage={99.2} />
          <ProductQualityItem name="智能音箱" rate="98.5%" percentage={98.5} />
          <ProductQualityItem name="智能门锁" rate="97.8%" percentage={97.8} />
          <ProductQualityItem name="智能插座" rate="99.5%" percentage={99.5} />
        </View>
      </View>

      {/* 质量改进计划 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold">质量改进计划</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
        <View className="space-y-3">
          <QualityImprovementItem
            title="组装工艺优化"
            progress="65%"
            dueDate="10月15日"
            icon="tools"
            color="blue"
          />
          <QualityImprovementItem
            title="材料质量提升"
            progress="40%"
            dueDate="11月20日"
            icon="vial"
            color="green"
          />
          <QualityImprovementItem
            title="质检流程优化"
            progress="85%"
            dueDate="10月5日"
            icon="clipboard-check"
            color="purple"
          />
        </View>
      </View>
    </>
  );
};
