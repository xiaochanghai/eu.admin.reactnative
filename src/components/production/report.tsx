import { Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@/components/ui/icons';

import ReportDateSelector from './report-date-selector';

/**
 * 生产报表组件
 * 展示生产数据、设备运行报表和报表下载功能
 */
export const Report = () => {
  return (
    <View>
      {/* 报表概览 - 标题和日期选择器 */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-800">生产报表</Text>
        <ReportDateSelector />
      </View>

      {/* 生产数据卡片 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-semibold">生产数据</Text>
          <Text className="text-sm text-gray-500">2023-12-05</Text>
        </View>

        {/* 生产数据统计网格 */}
        <View className="mb-4 flex-row flex-wrap">
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600">1,250</Text>
            <Text className="text-xs text-gray-500">计划产量</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600">1,180</Text>
            <Text className="text-xs text-gray-500">实际产量</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600">94.4%</Text>
            <Text className="text-xs text-gray-500">计划完成率</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600">98.3%</Text>
            <Text className="text-xs text-gray-500">良品率</Text>
          </View>
        </View>

        {/* 产品线产量对比图表 */}
        <View className="mb-3">
          <Text className="mb-2 text-sm font-medium">各产品线产量对比</Text>
          <View className="h-40 items-center justify-center rounded-xl bg-gray-50">
            <FontAwesome name="bar-chart-o" size={40} color="#0066ff" />
            <Text className="mt-2 text-sm text-gray-500">产量数据图表</Text>
          </View>
        </View>
      </View>

      {/* 设备运行报表卡片 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-semibold">设备运行报表</Text>
          <Text className="text-sm text-gray-500">2023-12-05</Text>
        </View>

        {/* 设备运行数据统计网格 */}
        <View className="mb-4 flex-row flex-wrap">
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600">32</Text>
            <Text className="text-xs text-gray-500">设备总数</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600">28</Text>
            <Text className="text-xs text-gray-500">运行设备</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600">87.5%</Text>
            <Text className="text-xs text-gray-500">设备利用率</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600">4.2h</Text>
            <Text className="text-xs text-gray-500">平均运行</Text>
          </View>
        </View>

        {/* 设备运行状态分布图表 */}
        <View className="mb-3">
          <Text className="mb-2 text-sm font-medium">设备运行状态分布</Text>
          <View className="h-40 items-center justify-center rounded-xl bg-gray-50">
            <FontAwesome name="pie-chart" size={40} color="#0066ff" />
            <Text className="mt-2 text-sm text-gray-500">设备状态图表</Text>
          </View>
        </View>
      </View>

      {/* 报表下载卡片 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          生产报表
        </Text>
        <TouchableOpacity className="flex-row items-center border-b border-gray-100 py-3">
          <FontAwesome
            name="file-pdf-o"
            size={20}
            color="#ef4444"
            style={{ marginRight: 12 }}
          />
          <Text className="text-sm text-gray-800">下载本月生产报表</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
