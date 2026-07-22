import React from 'react';
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';

import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

import { getAnalyticsChartConfig, PeriodHeader } from './analytics-ui';
import { KpiCard } from './kpi-card';

// 设备状态项组件
type DeviceStatusItemProps = {
  name: string;
  info: string;
  status: 'normal' | 'warning' | 'error';
  icon: string;
};

const DeviceStatusItem: React.FC<DeviceStatusItemProps> = ({
  name,
  info,
  status,
  icon,
}) => {
  // 根据状态设置样式
  const getStatusStyles = () => {
    switch (status) {
      case 'normal':
        return {
          container:
            'bg-green-50 border-l-4 border-green-500 dark:bg-green-900/20',
          iconBg: 'bg-green-100 dark:bg-green-900/30',
          iconColor: '#16a34a',
          statusText: 'text-green-600 dark:text-green-400',
          statusLabel: '正常',
        };
      case 'warning':
        return {
          container:
            'bg-yellow-50 border-l-4 border-yellow-500 dark:bg-yellow-900/20',
          iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
          iconColor: '#ca8a04',
          statusText: 'text-yellow-600 dark:text-yellow-400',
          statusLabel: '注意',
        };
      case 'error':
        return {
          container: 'bg-red-50 border-l-4 border-red-500 dark:bg-red-900/20',
          iconBg: 'bg-red-100 dark:bg-red-900/30',
          iconColor: '#dc2626',
          statusText: 'text-red-600 dark:text-red-400',
          statusLabel: '故障',
        };
      default:
        return {
          container: 'bg-gray-50 border-l-4 border-gray-500 dark:bg-gray-700',
          iconBg: 'bg-gray-100 dark:bg-gray-600',
          iconColor: '#4b5563',
          statusText: 'text-gray-600 dark:text-gray-400',
          statusLabel: '未知',
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <View
      className={`flex-row items-center justify-between rounded-lg p-3 ${styles.container} mb-3`}
    >
      <View className="flex-row items-center">
        <View
          className={`size-10 ${styles.iconBg} mr-3 flex items-center justify-center rounded-full`}
        >
          <FontAwesome name={icon} size={20} color={styles.iconColor} />
        </View>
        <View>
          <Text className="font-medium text-gray-900 dark:text-gray-100">
            {name}
          </Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {info}
          </Text>
        </View>
      </View>
      <Text className={`text-sm font-medium ${styles.statusText}`}>
        {styles.statusLabel}
      </Text>
    </View>
  );
};

export const Production: React.FC = () => {
  const { isDark } = useAppColorScheme();
  const { width } = useWindowDimensions();
  const chartWidth = width - 64;
  const chartConfig = getAnalyticsChartConfig(isDark);

  // 生产效率趋势数据
  const efficiencyData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    datasets: [
      {
        data: [50, 60, 62, 75, 72, 78, 78, 80, 82],
        color: (opacity = 1) => `rgba(109, 87, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['生产效率'],
  };

  // 产能利用率数据
  const capacityData = {
    data: [0.785],
  };

  return (
    <View>
      {/* 时间选择器 */}
      <PeriodHeader title="生产数据" description="12 条产线" />

      {/* 生产KPI指标 */}
      <View className="mb-2 flex-row flex-wrap justify-between">
        <KpiCard
          title="生产效率"
          value="82.5%"
          trend="↑ 3.8%"
          trendUp={true}
          color="#6D57FF"
        />
        <KpiCard
          title="计划达成率"
          value="78.5%"
          trend="↑ 5.2%"
          trendUp={true}
          color="#22c55e"
        />
        <KpiCard
          title="设备稼动率"
          value="91.2%"
          trend="↑ 2.5%"
          trendUp={true}
          color="#f97316"
        />
        <KpiCard
          title="异常停机时间"
          value="45分钟"
          trend="↓ 12.3%"
          trendUp={false}
          color="#ef4444"
        />
      </View>

      {/* 生产效率趋势 */}
      <View className="mb-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-bold text-neutral-900 dark:text-white">
            生产效率趋势
          </Text>
          <TouchableOpacity>
            <Text className="text-xs font-semibold text-primary-500 dark:text-primary-300">
              详情
            </Text>
          </TouchableOpacity>
        </View>
        <LineChart
          data={efficiencyData}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            marginLeft: -10,
          }}
          yAxisSuffix="%"
        />
      </View>

      {/* 设备运行状态 */}
      <View className="mb-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-bold text-neutral-900 dark:text-white">
            设备运行状态
          </Text>
          <TouchableOpacity>
            <Text className="text-xs font-semibold text-primary-500 dark:text-primary-300">
              详情
            </Text>
          </TouchableOpacity>
        </View>
        <View className="space-y-3">
          <DeviceStatusItem
            name="注塑机 #A102"
            info="运行时间: 18小时 | 效率: 95%"
            status="normal"
            icon="cog"
          />
          <DeviceStatusItem
            name="组装线 #B205"
            info="运行时间: 12小时 | 效率: 78%"
            status="warning"
            icon="exclamation-triangle"
          />
          <DeviceStatusItem
            name="测试设备 #C308"
            info="停机时间: 2小时 | 维修进度: 65%"
            status="error"
            icon="times-circle"
          />
        </View>
      </View>

      {/* 产能利用率 */}
      <View className="mb-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-bold text-neutral-900 dark:text-white">
            产能利用率
          </Text>
          <Text className="text-lg font-bold text-primary-500 dark:text-primary-300">
            78.5%
          </Text>
        </View>
        <ProgressChart
          data={capacityData}
          width={chartWidth}
          height={70}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={true}
        />
      </View>
    </View>
  );
};
