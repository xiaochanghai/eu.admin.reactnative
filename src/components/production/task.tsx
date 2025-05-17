import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { ProgressBar } from './progress-bar';
import { StatusBadge } from './status-badge';

/**
 * Task 组件 - 生产任务管理界面
 *
 * 该组件展示生产任务的概览和详细列表，包括：
 * 1. 任务概览：显示任务总数、进行中任务数、待分配任务数和员工任务完成率
 * 2. 生产任务列表：展示各个生产任务的详细信息和进度
 */
export const Task = () => {
  return (
    <View>
      {/* 任务概览 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          任务概览
        </Text>
        <View className="mb-3 flex-row justify-between">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#0066ff' }}>
              24
            </Text>
            <Text className="mt-1 text-xs text-gray-500">任务总数</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#22c55e' }}>
              12
            </Text>
            <Text className="mt-1 text-xs text-gray-500">进行中</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#f97316' }}>
              5
            </Text>
            <Text className="mt-1 text-xs text-gray-500">待分配</Text>
          </View>
        </View>
        <View className="flex-row items-center rounded-xl bg-blue-50 p-3">
          <FontAwesome
            name="users"
            size={20}
            color="#0066ff"
            style={{ marginRight: 12 }}
          />
          <View className="flex-1">
            <Text className="text-sm font-medium">员工任务完成率</Text>
            <View className="flex-row items-center">
              <Text className="mr-2 text-lg font-bold text-blue-600">
                82.3%
              </Text>
              <Text className="text-xs text-green-600">↑ 3.7%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 生产任务列表 */}
      <Text className="mb-3 text-lg font-semibold text-gray-800">
        生产任务列表
      </Text>

      {/* 任务项目1 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-2 flex-row items-start justify-between">
          <Text className="text-base font-medium text-gray-800">
            主板元器件贴装任务
          </Text>
          <StatusBadge status="进行中" color="#22c55e" bgColor="#dcfce7" />
        </View>
        <Text className="mb-2 text-sm text-gray-500">
          任务编号：TA20231205-01
        </Text>
        <View className="mb-3 flex-row justify-between">
          <Text className="text-sm text-gray-500">负责人：李技术员</Text>
          <Text className="text-sm text-gray-500">截止日期：2023-12-10</Text>
        </View>
        <View className="mb-2">
          <View className="mb-1 flex-row justify-between">
            <Text className="text-sm text-gray-500">完成进度</Text>
            <Text className="text-sm text-gray-500">70%</Text>
          </View>
          <ProgressBar progress={70} color="#22c55e" />
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-500">所属计划：</Text>
            <Text className="mr-3 text-sm font-medium">PP20231128-01</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 任务项目2 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-2 flex-row items-start justify-between">
          <Text className="text-base font-medium text-gray-800">
            电路板焊接任务
          </Text>
          <StatusBadge status="待分配" color="#f97316" bgColor="#ffedd5" />
        </View>
        <Text className="mb-2 text-sm text-gray-500">
          任务编号：TA20231205-02
        </Text>
        <View className="mb-3 flex-row justify-between">
          <Text className="text-sm text-gray-500">负责人：待分配</Text>
          <Text className="text-sm text-gray-500">截止日期：2023-12-12</Text>
        </View>
        <View className="mb-2">
          <View className="mb-1 flex-row justify-between">
            <Text className="text-sm text-gray-500">完成进度</Text>
            <Text className="text-sm text-gray-500">0%</Text>
          </View>
          <ProgressBar progress={0} color="#f97316" />
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-500">所属计划：</Text>
            <Text className="mr-3 text-sm font-medium">PP20231128-01</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 任务项目3 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-2 flex-row items-start justify-between">
          <Text className="text-base font-medium text-gray-800">
            音箱外壳注塑任务
          </Text>
          <StatusBadge status="进行中" color="#22c55e" bgColor="#dcfce7" />
        </View>
        <Text className="mb-2 text-sm text-gray-500">
          任务编号：TA20231204-03
        </Text>
        <View className="mb-3 flex-row justify-between">
          <Text className="text-sm text-gray-500">负责人：王技术员</Text>
          <Text className="text-sm text-gray-500">截止日期：2023-12-15</Text>
        </View>
        <View className="mb-2">
          <View className="mb-1 flex-row justify-between">
            <Text className="text-sm text-gray-500">完成进度</Text>
            <Text className="text-sm text-gray-500">45%</Text>
          </View>
          <ProgressBar progress={45} color="#22c55e" />
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-500">所属计划：</Text>
            <Text className="mr-3 text-sm font-medium">PP20231130-02</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
