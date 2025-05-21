import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';

import { FontAwesome } from '@/components/ui/icons';

import { KpiCard } from './kpi-card';

// 获取屏幕宽度用于图表响应式设计
const screenWidth = Dimensions.get('window').width;

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
          container: 'bg-green-50 border-l-4 border-green-500',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          statusText: 'text-green-600',
          statusLabel: '正常',
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-l-4 border-yellow-500',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          statusText: 'text-yellow-600',
          statusLabel: '注意',
        };
      case 'error':
        return {
          container: 'bg-red-50 border-l-4 border-red-500',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          statusText: 'text-red-600',
          statusLabel: '故障',
        };
      default:
        return {
          container: 'bg-gray-50 border-l-4 border-gray-500',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          statusText: 'text-gray-600',
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
          <FontAwesome
            name={icon}
            size={20}
            color={styles.iconColor.replace('text-', '')}
          />
        </View>
        <View>
          <Text className="font-medium">{name}</Text>
          <Text className="text-xs text-gray-500">{info}</Text>
        </View>
      </View>
      <Text className={`text-sm font-medium ${styles.statusText}`}>
        {styles.statusLabel}
      </Text>
    </View>
  );
};

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

export const Production: React.FC = () => {
  // 生产效率趋势数据
  const efficiencyData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    datasets: [
      {
        data: [50, 60, 62, 75, 72, 78, 78, 80, 82],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 时间选择器 */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-semibold">生产数据</Text>
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

        {/* 生产KPI指标 */}
        <View className="mb-4 flex-row flex-wrap justify-between">
          <KpiCard
            title="生产效率"
            value="82.5%"
            trend="↑ 3.8%"
            trendUp={true}
            color="#0066ff"
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
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold">生产效率趋势</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600">详情</Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={efficiencyData}
            width={screenWidth - 48} // 考虑内边距
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            yAxisSuffix="%"
          />
        </View>

        {/* 设备运行状态 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold">设备运行状态</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600">详情</Text>
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
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold">产能利用率</Text>
            <Text className="text-lg font-bold text-blue-600">78.5%</Text>
          </View>
          <ProgressChart
            data={capacityData}
            width={screenWidth - 48}
            height={70}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
