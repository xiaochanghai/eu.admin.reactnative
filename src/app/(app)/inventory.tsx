import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';

import { SegmentedControl, type SegmentedControlOption } from '@/components';
import InventoryItem from '@/components/inventory/item';
import {
  NavHeader,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

// 预警项组件
type AlertItemProps = {
  name: string;
  message: string;
  type: 'danger' | 'warning';
};

const AlertItem: React.FC<AlertItemProps> = ({ name, message, type }) => {
  const bgColor = type === 'danger' ? 'bg-red-50 dark:bg-red-900/30' : 'bg-amber-50 dark:bg-amber-900/30';
  const iconColor = type === 'danger' ? '#ef4444' : '#eab308';
  const icon =
    type === 'danger' ? 'exclamation-circle' : 'exclamation-triangle';

  return (
    <View className={`mb-2 flex-row items-center rounded-lg p-3 ${bgColor}`}>
      <View className="mr-3 size-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/10">
        <FontAwesome name={icon} size={20} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="mb-0.5 text-base font-medium dark:text-gray-100">{name}</Text>
        <Text className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{message}</Text>
      </View>
      <TouchableOpacity>
        <Text className="text-sm font-medium text-blue-600 dark:text-blue-400">补货</Text>
      </TouchableOpacity>
    </View>
  );
};

const Inventory: React.FC = () => {
  const router = useRouter();

  // 分段控制器选项
  const tabOptions: SegmentedControlOption[] = [
    { key: 'inventory-overview', label: '库存概览' },
    { key: 'raw-materials', label: '原材料' },
    { key: 'semi-finished', label: '半成品' },
    { key: 'finished-products', label: '成品' },
    { key: 'inventory-report', label: '库存报表' },
  ];

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // 库存预警数据
  const alertItems = [
    {
      name: 'PCB板',
      message: '库存低于安全库存（20/100）',
      type: 'danger' as const,
    },
    {
      name: '电容 0.1uF',
      message: '库存低于安全库存（150/500）',
      type: 'danger' as const,
    },
    {
      name: '塑料外壳 A型',
      message: '库存接近安全库存（220/300）',
      type: 'warning' as const,
    },
  ];

  // 库存列表数据
  const inventoryItems = [
    {
      name: '电阻 10kΩ',
      code: 'RM-10K-0805',
      quantity: 5000,
      safetyStock: 1000,
      status: 'normal' as const,
    },
    {
      name: '电容 1uF',
      code: 'CM-1UF-0805',
      quantity: 3200,
      safetyStock: 800,
      status: 'normal' as const,
    },
    {
      name: '塑料外壳 A型',
      code: 'CS-A-001',
      quantity: 220,
      safetyStock: 300,
      status: 'warning' as const,
    },
    {
      name: 'PCB板',
      code: 'PCB-ST-001',
      quantity: 20,
      safetyStock: 100,
      status: 'danger' as const,
    },
    {
      name: 'LED灯 白色',
      code: 'LED-W-5MM',
      quantity: 1500,
      safetyStock: 500,
      status: 'normal' as const,
    },
  ];

  // 原材料列表数据
  const rawMaterialItems = [
    {
      name: '电阻 10kΩ',
      code: 'RM-10K-0805',
      quantity: 5000,
      safetyStock: 1000,
      status: 'normal' as const,
    },
    {
      name: '电容 1uF',
      code: 'CM-1UF-0805',
      quantity: 3200,
      safetyStock: 800,
      status: 'normal' as const,
    },
    {
      name: 'PCB板',
      code: 'PCB-ST-001',
      quantity: 20,
      safetyStock: 100,
      status: 'danger' as const,
    },
  ];

  // 半成品列表数据
  const semiFinishedItems = [
    {
      name: '主板组件',
      code: 'SF-MB-001',
      quantity: 120,
      safetyStock: 50,
      status: 'normal' as const,
    },
    {
      name: '电源模块',
      code: 'SF-PM-002',
      quantity: 45,
      safetyStock: 40,
      status: 'warning' as const,
    },
  ];

  // 成品列表数据
  const finishedProductItems = [
    {
      name: '智能控制器 A1',
      code: 'FP-SC-A1',
      quantity: 85,
      safetyStock: 30,
      status: 'normal' as const,
    },
    {
      name: '智能控制器 B2',
      code: 'FP-SC-B2',
      quantity: 65,
      safetyStock: 25,
      status: 'normal' as const,
    },
  ];

  return (
    <View className="flex-1 bg-gray-100 dark:bg-neutral-950">
      {/* 顶部导航 */}
      <NavHeader
        title="库存"
        leftShown={false}
        right={
          <>
            <TouchableOpacity className="ml-4">
              <FontAwesome name="search" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <FontAwesome name="filter" size={18} color="#6b7280" />
            </TouchableOpacity>
          </>
        }
      />

      {/* 分段控制器 - 固定在顶部 */}
      <View className="px-4 pt-4">
        <SegmentedControl
          options={tabOptions}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        />
      </View>

      {/* 滚动内容区域 */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16 }}
      >
        {/* 库存概览 */}
        {selectedTabIndex === 0 && (
          <View>
            {/* 库存概览卡片 */}
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <Text className="mb-3 text-lg font-semibold dark:text-gray-100">库存概览</Text>
              <View className="mb-4 flex-row justify-between">
                <View className="flex-1 items-center">
                  <Text className="mb-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                    152
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">物料种类</Text>
                </View>
                <View className="flex-1 items-center">
                  <Text className="mb-1 text-2xl font-bold text-green-500 dark:text-green-400">
                    87%
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">库存健康度</Text>
                </View>
                <View className="flex-1 items-center">
                  <Text className="mb-1 text-2xl font-bold text-red-500 dark:text-red-400">
                    3
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">库存预警</Text>
                </View>
              </View>
              <View className="flex-row items-center rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                <FontAwesome
                  name="info-circle"
                  size={20}
                  color="#0066ff"
                  className="mr-3"
                />
                <View>
                  <Text className="mb-0.5 text-sm text-gray-500 dark:text-gray-400">
                    本月库存周转率
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="mr-2 text-lg font-semibold text-blue-600">
                      4.2
                    </Text>
                    <Text className="text-sm font-medium text-green-500">
                      ↑ 0.3
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 库存预警 */}
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-lg font-semibold dark:text-gray-100">库存预警</Text>
                <TouchableOpacity>
                  <Text className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    查看全部
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mt-2">
                {alertItems.map((item, index) => (
                  <AlertItem
                    key={index}
                    name={item.name}
                    message={item.message}
                    type={item.type}
                  />
                ))}
              </View>
            </View>

            {/* 库存列表 */}
            <Text className="mb-2 mt-4 text-base font-semibold dark:text-gray-100">
              库存列表
            </Text>

            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <View className="relative mb-4">
                <TextInput
                  className="rounded-lg bg-gray-100 px-10 py-2.5 text-sm dark:bg-neutral-800 dark:text-white"
                  placeholder="搜索物料"
                  placeholderTextColor="#9ca3af"
                />
                <FontAwesome
                  name="search"
                  size={16}
                  color="#9ca3af"
                  className="absolute left-3 top-3"
                />
              </View>

              {/* 库存项目列表 */}
              {inventoryItems.map((item, index) => (
                <InventoryItem
                  key={index}
                  name={item.name}
                  code={item.code}
                  quantity={item.quantity}
                  safetyStock={item.safetyStock}
                  status={item.status}
                  onViewDetail={() => router.push(`/inventory/${index}`)}
                />
              ))}
            </View>
          </View>
        )}

        {/* 原材料 */}
        {selectedTabIndex === 1 && (
          <View>
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <Text className="mb-3 text-lg font-semibold dark:text-gray-100">原材料库存</Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                此处显示原材料库存信息
              </Text>
            </View>

            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <View className="relative mb-4">
                <TextInput
                  className="rounded-lg bg-gray-100 px-10 py-2.5 text-sm dark:bg-neutral-800 dark:text-white"
                  placeholder="搜索原材料"
                  placeholderTextColor="#9ca3af"
                />
                <FontAwesome
                  name="search"
                  size={16}
                  color="#9ca3af"
                  className="absolute left-3 top-3"
                />
              </View>

              {/* 原材料项目列表 */}
              {rawMaterialItems.map((item, index) => (
                <InventoryItem
                  key={index}
                  name={item.name}
                  code={item.code}
                  quantity={item.quantity}
                  safetyStock={item.safetyStock}
                  status={item.status}
                  onViewDetail={() => router.push(`/inventory/${index}`)}
                />
              ))}
            </View>
          </View>
        )}

        {/* 半成品 */}
        {selectedTabIndex === 2 && (
          <View>
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <Text className="mb-3 text-lg font-semibold dark:text-gray-100">半成品库存</Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                此处显示半成品库存信息
              </Text>
            </View>

            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <View className="relative mb-4">
                <TextInput
                  className="rounded-lg bg-gray-100 px-10 py-2.5 text-sm dark:bg-neutral-800 dark:text-white"
                  placeholder="搜索半成品"
                  placeholderTextColor="#9ca3af"
                />
                <FontAwesome
                  name="search"
                  size={16}
                  color="#9ca3af"
                  className="absolute left-3 top-3"
                />
              </View>

              {/* 半成品项目列表 */}
              {semiFinishedItems.map((item, index) => (
                <InventoryItem
                  key={index}
                  name={item.name}
                  code={item.code}
                  quantity={item.quantity}
                  safetyStock={item.safetyStock}
                  status={item.status}
                  onViewDetail={() => router.push(`/inventory/${index}`)}
                />
              ))}
            </View>
          </View>
        )}

        {/* 成品 */}
        {selectedTabIndex === 3 && (
          <View>
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <Text className="mb-3 text-lg font-semibold dark:text-gray-100">成品库存</Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                此处显示成品库存信息
              </Text>
            </View>

            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <View className="relative mb-4">
                <TextInput
                  className="rounded-lg bg-gray-100 px-10 py-2.5 text-sm dark:bg-neutral-800 dark:text-white"
                  placeholder="搜索成品"
                  placeholderTextColor="#9ca3af"
                />
                <FontAwesome
                  name="search"
                  size={16}
                  color="#9ca3af"
                  className="absolute left-3 top-3"
                />
              </View>

              {/* 成品项目列表 */}
              {finishedProductItems.map((item, index) => (
                <InventoryItem
                  key={index}
                  name={item.name}
                  code={item.code}
                  quantity={item.quantity}
                  safetyStock={item.safetyStock}
                  status={item.status}
                  onViewDetail={() => router.push(`/inventory/${index}`)}
                />
              ))}
            </View>
          </View>
        )}

        {/* 库存报表 */}
        {selectedTabIndex === 4 && (
          <View>
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <Text className="mb-3 text-lg font-semibold dark:text-gray-100">库存报表</Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                此处显示库存报表信息
              </Text>
            </View>

            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <Text className="text-base font-medium dark:text-gray-100">库存周转率</Text>
              <View className="mt-3">
                <View className="flex-row justify-between border-b border-gray-100 py-2 dark:border-neutral-700">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">原材料</Text>
                  <Text className="text-sm font-medium dark:text-gray-100">4.5</Text>
                </View>
                <View className="flex-row justify-between border-b border-gray-100 py-2 dark:border-neutral-700">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">半成品</Text>
                  <Text className="text-sm font-medium dark:text-gray-100">3.8</Text>
                </View>
                <View className="flex-row justify-between border-b border-gray-100 py-2 dark:border-neutral-700">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">成品</Text>
                  <Text className="text-sm font-medium dark:text-gray-100">5.2</Text>
                </View>
              </View>
            </View>

            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <Text className="text-base font-medium dark:text-gray-100">库存价值分布</Text>
              <View className="mt-3">
                <View className="flex-row justify-between border-b border-gray-100 py-2 dark:border-neutral-700">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">原材料</Text>
                  <Text className="text-sm font-medium dark:text-gray-100">¥125,000</Text>
                </View>
                <View className="flex-row justify-between border-b border-gray-100 py-2 dark:border-neutral-700">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">半成品</Text>
                  <Text className="text-sm font-medium dark:text-gray-100">¥85,000</Text>
                </View>
                <View className="flex-row justify-between border-b border-gray-100 py-2 dark:border-neutral-700">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">成品</Text>
                  <Text className="text-sm font-medium dark:text-gray-100">¥210,000</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* 底部间距 */}
        <View className="h-20" />
      </ScrollView>

      {/* 浮动按钮 */}
      <TouchableOpacity className="absolute bottom-4 right-4 size-14 items-center justify-center rounded-full bg-blue-600 shadow-lg">
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Inventory;

