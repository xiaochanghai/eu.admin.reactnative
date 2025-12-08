import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

import { KpiCard } from '@/components/analytics/kpi-card';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

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
      <Text className="text-gray-700 dark:text-gray-300">{name}</Text>
      <Text className="text-gray-700 dark:text-gray-300">{rate}</Text>
    </View>
    <View className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
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
}) => {
  const getBgClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'green':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'purple':
        return 'bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-700';
    }
  };

  const getIconBgClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900/30';
      case 'green':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-600';
    }
  };

  const iconColor = color === 'blue' ? '#0066ff' : color === 'green' ? '#22c55e' : '#8b5cf6';

  return (
    <View className={`flex-row items-center p-3 ${getBgClass()} mb-3 rounded-lg`}>
      <View className={`size-10 ${getIconBgClass()} mr-3 items-center justify-center rounded-full`}>
        <FontAwesome
          name={icon}
          size={18}
          color={iconColor}
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
        <Text className="font-medium text-gray-900 dark:text-gray-100">{title}</Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          进度: {progress} | 预计完成: {dueDate}
        </Text>
      </View>
      <View>
        <FontAwesome name="chevron-right" size={16} color={iconColor} />
      </View>
    </View>
  );
};

// 图表通用配置
const getChartConfig = (isDark: boolean) => ({
  backgroundColor: isDark ? '#1f2937' : '#ffffff',
  backgroundGradientFrom: isDark ? '#1f2937' : '#ffffff',
  backgroundGradientTo: isDark ? '#1f2937' : '#ffffff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => isDark ? `rgba(156, 163, 175, ${opacity})` : `rgba(107, 114, 128, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  stackedBar: false,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#3b82f6',
  },
});

export const Quality: React.FC = () => {
  const { isDark } = useAppColorScheme();
  const chartConfig = getChartConfig(isDark);

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
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '材料缺陷',
      population: 20,
      color: '#f59e0b',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '功能异常',
      population: 20,
      color: '#3b82f6',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '外观瑕疵',
      population: 15,
      color: '#10b981',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '其他问题',
      population: 10,
      color: '#6b7280',
      legendFontColor: isDark ? '#9ca3af' : '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <>
      {/* 时间选择器 */}
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">质量数据</Text>
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
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">质量合格率趋势</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600 dark:text-blue-400">详情</Text>
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
        <Text className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
          注：图表显示的是不良品率，数值越低越好
        </Text>
      </View>

      {/* 不良品分析 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">不良品分析</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600 dark:text-blue-400">详情</Text>
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
            paddingLeft={'30'}
            center={[10, 10]}
            absolute
            hasLegend={false}
          />
          <View className="ml-4 flex-1">
            <View className="space-y-2">
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-red-500" />
                <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">组装不良</Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">35%</Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-yellow-500" />
                <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">材料缺陷</Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">20%</Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-blue-500" />
                <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">功能异常</Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">20%</Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-green-500" />
                <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">外观瑕疵</Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">15%</Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-2 size-3 rounded-full bg-gray-500" />
                <Text className="mr-2 text-sm text-gray-600 dark:text-gray-400">其他问题</Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">10%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 产品质量对比 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">产品质量对比</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600 dark:text-blue-400">详情</Text>
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
      <View className="mb-10 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">质量改进计划</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600 dark:text-blue-400">详情</Text>
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
