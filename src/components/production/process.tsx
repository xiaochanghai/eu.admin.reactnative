import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@/components/ui/icons';

import { ProcessNode } from './process-node';
import { ProgressBar } from './progress-bar';
import { StatusBadge } from './status-badge';

/**
 * 工序管理组件
 * 展示工序概览、工序流程图和工序列表
 */
export const Process = () => {
  return (
    <View>
      {/* 工序概览 - 显示工序总数、使用中和待优化的统计信息 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          工序概览
        </Text>
        <View className="mb-3 flex-row justify-between">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#0066ff' }}>
              18
            </Text>
            <Text className="mt-1 text-xs text-gray-500">工序总数</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#22c55e' }}>
              10
            </Text>
            <Text className="mt-1 text-xs text-gray-500">使用中</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#f97316' }}>
              2
            </Text>
            <Text className="mt-1 text-xs text-gray-500">待优化</Text>
          </View>
        </View>
      </View>

      {/* 工序流程图 - 显示生产工序的流程和进度 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-medium">智能手表生产工序流程</Text>
          <View className="flex-row items-center">
            <Text className="text-sm font-medium text-blue-600">
              当前批次：
            </Text>
            <Text className="text-sm">B20231204-01</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-3"
        >
          <View className="min-w-full flex-row items-center py-2">
            <ProcessNode icon="box" label="原料准备" status="completed" />
            <View className="h-0.5 w-12 bg-green-500" />
            <ProcessNode icon="cut" label="PCB切割" status="completed" />
            <View className="h-0.5 w-12 bg-green-500" />
            <ProcessNode
              icon="microchip"
              label="元器件贴装"
              status="inProgress"
            />
            <View className="h-0.5 w-12 bg-gray-200" />
            <ProcessNode icon="fire" label="回流焊接" status="pending" />
            <View className="h-0.5 w-12 bg-gray-200" />
            <ProcessNode
              icon="check-circle"
              label="功能测试"
              status="pending"
            />
          </View>
        </ScrollView>

        {/* 工序进度信息 */}
        <View className="flex-row items-center rounded-xl bg-blue-50 p-3">
          <FontAwesome
            name="info-circle"
            size={16}
            color="#0066ff"
            style={{ marginRight: 8 }}
          />
          <View>
            <Text className="text-sm">
              当前进度：
              <Text className="font-medium">40%</Text> | 预计完成时间：
              <Text className="font-medium">2023-12-05 18:00</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* 工序列表标题 */}
      <Text className="mb-3 text-lg font-semibold text-gray-800">工序列表</Text>

      {/* 工序项目1 - 元器件贴装 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-2 flex-row items-start justify-between">
          <Text className="text-base font-medium text-gray-800">
            元器件贴装
          </Text>
          <StatusBadge status="使用中" color="#22c55e" bgColor="#dcfce7" />
        </View>
        <Text className="mb-2 text-sm text-gray-500">
          工序编号：PR20231201-03
        </Text>

        {/* 工序基本信息 */}
        <View className="mb-3 flex-row justify-between">
          <View className="flex-1">
            <Text className="mb-1 text-xs text-gray-500">负责人</Text>
            <Text className="text-sm font-medium">王工程师</Text>
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-xs text-gray-500">标准工时</Text>
            <Text className="text-sm font-medium">45分钟/批次</Text>
          </View>
        </View>

        {/* 设备利用率进度条 */}
        <View className="mb-2">
          <View className="mb-1 flex-row justify-between">
            <Text className="text-sm text-gray-500">设备利用率</Text>
            <Text className="text-sm">85%</Text>
          </View>
          <ProgressBar progress={85} color="#22c55e" />
        </View>

        {/* 关联设备信息 */}
        <View className="mb-3 rounded-xl bg-blue-50 p-3">
          <Text className="mb-2 text-sm font-medium">关联设备</Text>
          <View className="flex-row items-center">
            <FontAwesome
              name="microchip"
              size={16}
              color="#0066ff"
              style={{ marginRight: 8 }}
            />
            <Text className="text-sm">SMT贴片机#2</Text>
          </View>
        </View>

        {/* 工序项目底部 - 良品率和详情链接 */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-500">良品率：</Text>
            <Text className="mr-3 text-sm font-medium">98.3%</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 工序项目2 - 电路板焊接 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-2 flex-row items-start justify-between">
          <Text className="text-base font-medium text-gray-800">
            电路板焊接
          </Text>
          <StatusBadge status="使用中" color="#22c55e" bgColor="#dcfce7" />
        </View>
        <Text className="mb-2 text-sm text-gray-500">
          工序编号：PR20231201-04
        </Text>

        {/* 工序基本信息 */}
        <View className="mb-3 flex-row justify-between">
          <View className="flex-1">
            <Text className="mb-1 text-xs text-gray-500">负责人</Text>
            <Text className="text-sm font-medium">李工程师</Text>
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-xs text-gray-500">标准工时</Text>
            <Text className="text-sm font-medium">60分钟/批次</Text>
          </View>
        </View>

        {/* 设备利用率进度条 */}
        <View className="mb-2">
          <View className="mb-1 flex-row justify-between">
            <Text className="text-sm text-gray-500">设备利用率</Text>
            <Text className="text-sm">75%</Text>
          </View>
          <ProgressBar progress={75} color="#22c55e" />
        </View>

        {/* 关联设备信息 */}
        <View className="mb-3 rounded-xl bg-blue-50 p-3">
          <Text className="mb-2 text-sm font-medium">关联设备</Text>
          <View className="flex-row items-center">
            <FontAwesome
              name="fire"
              size={16}
              color="#f97316"
              style={{ marginRight: 8 }}
            />
            <Text className="text-sm">波峰焊接机#1</Text>
          </View>
        </View>

        {/* 工序项目底部 - 良品率和详情链接 */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-500">良品率：</Text>
            <Text className="mr-3 text-sm font-medium">97.5%</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
