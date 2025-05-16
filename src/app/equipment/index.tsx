import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

import { NavHeader, ScrollView, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

const Equipment = () => {
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();

  // 切换选项卡
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  type EquipmentProps = {
    id: string;
    name: string;
    code: string;
    projectManager: string;
    location: string;
    duration: number;
    status: string;
    capacity: number;
  };
  // 模拟物料数据
  const data: EquipmentProps[] = [
    {
      id: '1',
      name: 'SMT贴片机#2',
      code: 'EQ20230501-02',
      status: '运行中',
      projectManager: '王工程师',
      location: 'A区生产线',
      duration: 1245,
      capacity: 850,
    },
    {
      id: '2',
      name: 'AOI检测仪',
      code: 'EQ20230315-05',
      status: '运行中',
      projectManager: '李工程师',
      location: 'B区检测线',
      duration: 985,
      capacity: 1200,
    },
    {
      id: '4',
      name: '自动化机械臂',
      code: 'EQ20230610-08',
      status: '故障中',
      projectManager: '赵工程师',
      location: 'C区装配线',
      duration: 520,
      capacity: 1560,
    },
  ];

  interface EquipmentItemProps {
    equipment: EquipmentProps;
  }

  const EquipmentItemItem = ({ equipment }: EquipmentItemProps) => (
    <TouchableOpacity
      className="mb-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
      onPress={() => router.push(`/equipment/1`)}
    >
      <View className="mb-3 flex-row items-start justify-between">
        <View className="flex-row items-center">
          {equipment.status === '运行中' && (
            <View className="mr-3 rounded-lg bg-blue-100 p-2">
              <FontAwesome name="microchip" size={20} color="#2563EB" />
            </View>
          )}
          {equipment.status === '待机中' && (
            <View className="mr-3 rounded-lg bg-orange-100 p-2">
              <FontAwesome name="fire" size={20} color="#EA580C" />
            </View>
          )}
          {equipment.status === '故障中' && (
            <View className="mr-3 rounded-lg bg-red-100 p-2">
              <FontAwesome name="robot" size={20} color="#DC2626" />
            </View>
          )}
          <View>
            <Text className="font-medium">{equipment.name}</Text>
            <Text className="text-xs text-gray-500">
              设备编号：{equipment.code}
            </Text>
          </View>
        </View>
        <View className="rounded-full bg-green-100 px-2 py-1">
          {equipment.status === '运行中' && (
            <Text className="text-xs font-medium text-green-800">
              {equipment.status}
            </Text>
          )}
          {equipment.status === '待机中' && (
            <Text className="text-xs font-medium text-yellow-800">
              {equipment.status}
            </Text>
          )}
          {equipment.status === '故障中' && (
            <Text className="text-xs font-medium text-red-800">
              {equipment.status}
            </Text>
          )}
        </View>
      </View>

      <View className="mb-3 flex-row">
        <View className="flex-1">
          <Text className="mb-1 text-xs text-gray-500">负责人</Text>
          <Text className="text-sm">{equipment.projectManager}</Text>
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-xs text-gray-500">位置</Text>
          <Text className="text-sm">{equipment.location}</Text>
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-xs text-gray-500">运行时长</Text>
          <Text className="text-sm">{equipment.duration}小时</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        {equipment.status === '故障中' ? (
          <Text className="text-xs font-medium text-red-500">
            故障：控制系统异常
          </Text>
        ) : (
          <Text className="text-xs text-gray-500">
            今日产能：{equipment.capacity}件
          </Text>
        )}

        <FontAwesome name="chevron-right" size={14} color="#2563EB" />
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <NavHeader
        title="设备管理"
        right={
          <>
            <TouchableOpacity>
              <FontAwesome name="plus" size={12} />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView className="flex-1 p-4">
        {/* 设备状态概览 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <Text className="mb-3 font-medium">设备状态概览</Text>

          <View className="mb-4 flex-row">
            <View className="mr-3 flex-1 items-center rounded-lg bg-blue-50 p-3">
              <Text className="mb-1 text-xl font-medium text-blue-600">24</Text>
              <Text className="text-xs text-gray-600">设备总数</Text>
            </View>
            <View className="mr-3 flex-1 items-center rounded-lg bg-green-50 p-3">
              <Text className="mb-1 text-xl font-medium text-green-600">
                18
              </Text>
              <Text className="text-xs text-gray-600">运行中</Text>
            </View>
            <View className="mr-3 flex-1 items-center rounded-lg bg-yellow-50 p-3">
              <Text className="mb-1 text-xl font-medium text-yellow-600">
                4
              </Text>
              <Text className="text-xs text-gray-600">待机中</Text>
            </View>
            <View className="flex-1 items-center rounded-lg bg-red-50 p-3">
              <Text className="mb-1 text-xl font-medium text-red-600">2</Text>
              <Text className="text-xs text-gray-600">故障中</Text>
            </View>
          </View>

          <View className="mb-3">
            <View className="mb-1 flex-row justify-between text-sm">
              <Text>设备利用率</Text>
              <Text className="font-medium">75%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded bg-gray-200">
              <View
                className="h-full rounded bg-blue-500"
                style={{ width: '75%' }}
              />
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3">
            <View className="flex-row items-center">
              <FontAwesome
                name="info-circle"
                size={16}
                color="#2563EB"
                className="mr-2"
              />
              <View>
                <Text className="text-sm font-medium">设备状态</Text>
                <Text className="text-sm">
                  今日设备平均运行时长：7.5小时 | 本周维护计划：3台
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 筛选和搜索 */}
        <View className="mb-4 flex-row items-center justify-between">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pb-2"
          >
            <TouchableOpacity
              className={`mr-2 rounded-full px-4 py-2 ${activeTab === 'all' ? 'bg-blue-600' : 'bg-gray-200'}`}
              onPress={() => handleTabChange('all')}
            >
              <Text
                className={`text-sm ${activeTab === 'all' ? 'font-medium text-white' : 'text-gray-600'}`}
              >
                全部设备
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`mr-2 rounded-full px-4 py-2 ${activeTab === 'production' ? 'bg-blue-600' : 'bg-gray-200'}`}
              onPress={() => handleTabChange('production')}
            >
              <Text
                className={`text-sm ${activeTab === 'production' ? 'font-medium text-white' : 'text-gray-600'}`}
              >
                生产设备
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`mr-2 rounded-full px-4 py-2 ${activeTab === 'testing' ? 'bg-blue-600' : 'bg-gray-200'}`}
              onPress={() => handleTabChange('testing')}
            >
              <Text
                className={`text-sm ${activeTab === 'testing' ? 'font-medium text-white' : 'text-gray-600'}`}
              >
                检测设备
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`mr-2 rounded-full px-4 py-2 ${activeTab === 'auxiliary' ? 'bg-blue-600' : 'bg-gray-200'}`}
              onPress={() => handleTabChange('auxiliary')}
            >
              <Text
                className={`text-sm ${activeTab === 'auxiliary' ? 'font-medium text-white' : 'text-gray-600'}`}
              >
                辅助设备
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View className="relative">
            <TextInput
              placeholder="搜索设备"
              className="rounded-full border border-gray-300 bg-white py-2 pl-8 pr-4 text-sm"
            />
            <FontAwesome
              name="search"
              size={14}
              color="#9CA3AF"
              style={{ position: 'absolute', left: 12, top: 12 }}
            />
          </View>
        </View>

        {/* 设备列表 */}
        <View className="mb-4">
          {data.map((material, index) => (
            <EquipmentItemItem key={index} equipment={material} />
          ))}
        </View>

        {/* 维护计划 */}
        <View className="mb-10 rounded-2xl bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="font-medium">近期维护计划</Text>
            <TouchableOpacity>
              <Text className="text-xs text-blue-600">查看全部</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View className="border-b border-gray-100 py-3">
              <View className="mb-1 flex-row items-start justify-between">
                <Text className="text-sm font-medium">
                  SMT贴片机#1 - 例行保养
                </Text>
                <View className="rounded-full bg-yellow-100 px-2 py-1">
                  <Text className="text-xs font-medium text-yellow-800">
                    待处理
                  </Text>
                </View>
              </View>
              <Text className="text-xs text-gray-500">
                计划时间：2023-12-10 | 负责人：王工程师
              </Text>
            </View>
            <View className="border-b border-gray-100 py-3">
              <View className="mb-1 flex-row items-start justify-between">
                <Text className="text-sm font-medium">回流焊炉 - 温度校准</Text>
                <View className="rounded-full bg-yellow-100 px-2 py-1">
                  <Text className="text-xs font-medium text-yellow-800">
                    待处理
                  </Text>
                </View>
              </View>
              <Text className="text-xs text-gray-500">
                计划时间：2023-12-12 | 负责人：张工程师
              </Text>
            </View>
            <View className="py-3">
              <View className="mb-1 flex-row items-start justify-between">
                <Text className="text-sm font-medium">
                  自动化机械臂 - 控制系统维修
                </Text>
                <View className="rounded-full bg-blue-100 px-2 py-1">
                  <Text className="text-xs font-medium text-blue-800">
                    进行中
                  </Text>
                </View>
              </View>
              <Text className="text-xs text-gray-500">
                计划时间：2023-12-08 | 负责人：赵工程师
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Equipment;
