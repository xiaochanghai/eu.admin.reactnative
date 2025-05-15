import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavHeader } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
const ProcessList = () => {
  const [activeFilter, setActiveFilter] = useState('全部');
  const router = useRouter();

  const goToProcessDetail = () => {
    router.push(`/process/1`);
  };

  const filters = [
    '全部',
    '使用中',
    '待优化',
    '已归档',
    '电子组装',
    '机械加工',
    '质量检测',
  ];

  // 工序数据
  const processes = [
    {
      id: 'PR20231201-03',
      name: '元器件贴装',
      status: '使用中',
      statusColor: 'green',
      manager: '王工程师',
      standardTime: '45分钟/批次',
      utilizationRate: 85,
      equipment: 'SMT贴片机#2',
      icon: 'microchip',
    },
    {
      id: 'PR20231202-05',
      name: 'PCB焊接',
      status: '使用中',
      statusColor: 'green',
      manager: '李工程师',
      standardTime: '30分钟/批次',
      utilizationRate: 92,
      equipment: '回流焊接机#1',
      icon: 'fire',
    },
    {
      id: 'PR20231203-02',
      name: '电路测试',
      status: '待优化',
      statusColor: 'orange',
      manager: '张工程师',
      standardTime: '60分钟/批次',
      utilizationRate: 68,
      equipment: '电路测试仪#3',
      icon: 'bolt',
    },
    {
      id: 'PR20231204-01',
      name: '外壳组装',
      status: '使用中',
      statusColor: 'green',
      manager: '赵工程师',
      standardTime: '25分钟/批次',
      utilizationRate: 78,
      equipment: '组装工作站#2',
      icon: 'tools',
    },
  ];

  // 根据筛选条件过滤工序
  const filteredProcesses =
    activeFilter === '全部'
      ? processes
      : processes.filter(
          (process) =>
            process.status === activeFilter ||
            process.name.includes(activeFilter)
        );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <NavHeader title="工序管理" leftShown={false} />

      <ScrollView className="flex-1 p-4">
        {/* 工序统计概览 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <Text className="mb-3 text-lg font-semibold">工序概览</Text>
          <View className="mb-3 flex-row">
            <View className="flex-1 items-center">
              <Text className="text-xl font-bold text-blue-600">32</Text>
              <Text className="text-xs text-gray-500">总工序</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-xl font-bold text-green-600">18</Text>
              <Text className="text-xs text-gray-500">使用中</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-xl font-bold text-orange-600">8</Text>
              <Text className="text-xs text-gray-500">待优化</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-xl font-bold text-gray-600">6</Text>
              <Text className="text-xs text-gray-500">已归档</Text>
            </View>
          </View>

          <View className="mb-3">
            <View className="mb-1 flex-row justify-between">
              <Text className="text-sm">工序效率指数</Text>
              <Text className="text-sm font-medium">82%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded-full bg-gray-200">
              <View
                className="h-full rounded-full bg-blue-500"
                style={{ width: '82%' }}
              />
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3">
            <View className="flex-row">
              <FontAwesome
                name="info-circle"
                size={16}
                color="#0066ff"
                style={{ marginTop: 2, marginRight: 8 }}
              />
              <View>
                <Text className="mb-1 text-sm font-medium">工序优化建议</Text>
                <Text className="text-xs text-gray-700">
                  根据近期生产数据分析，"元器件贴装"工序可通过调整设备参数提升15%效率
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 工序筛选器 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                className={`mr-2 rounded-full px-4 py-2 ${activeFilter === filter ? 'bg-blue-600' : 'bg-gray-100'}`}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  className={`text-xs font-medium ${activeFilter === filter ? 'text-white' : 'text-gray-800'}`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 工序列表 */}
        <Text className="mb-3 text-lg font-semibold">工序列表</Text>

        {/* 工序卡片 - 使用数据循环 */}
        {filteredProcesses.map((process) => (
          <TouchableOpacity
            key={process.id}
            className="mb-4 rounded-2xl bg-white p-4 shadow-sm"
            onPress={goToProcessDetail}
          >
            <View className="mb-3 flex-row items-start justify-between">
              <Text className="text-base font-semibold">{process.name}</Text>
              <View
                className={`bg-${process.statusColor}-100 rounded-full px-2 py-1`}
              >
                <Text
                  className={`text- text-xs${process.statusColor}-800 font-medium`}
                >
                  {process.status}
                </Text>
              </View>
            </View>

            <Text className="mb-2 text-sm text-gray-600">
              工序编号：{process.id}
            </Text>

            <View className="mb-3 flex-row">
              <View className="flex-1">
                <Text className="mb-1 text-xs text-gray-500">负责人</Text>
                <Text className="font-medium">{process.manager}</Text>
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-xs text-gray-500">标准工时</Text>
                <Text className="font-medium">{process.standardTime}</Text>
              </View>
            </View>

            <View className="mb-3">
              <View className="mb-1 flex-row justify-between">
                <Text className="text-sm">设备利用率</Text>
                <Text className="text-sm font-medium">
                  {process.utilizationRate}%
                </Text>
              </View>
              <View className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                <View
                  className={`bg- h-full${process.utilizationRate >= 80 ? 'green' : process.utilizationRate >= 70 ? 'blue' : 'orange'}-500 rounded-full`}
                  style={{ width: `${process.utilizationRate}%` }}
                />
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <FontAwesome
                  name={process.icon}
                  size={14}
                  color="#666"
                  style={{ marginRight: 4 }}
                />
                <Text className="text-sm text-gray-600">
                  {process.equipment}
                </Text>
              </View>
              <Text className="text-sm font-medium text-blue-600">
                查看详情
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 浮动按钮 - 新建工序 */}
      <TouchableOpacity
        className="absolute bottom-24 right-6 size-14 items-center justify-center rounded-full bg-blue-600 shadow-lg"
        style={{ elevation: 5 }}
      >
        <FontAwesome name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProcessList;
