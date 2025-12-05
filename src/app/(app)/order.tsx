import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { SegmentedControl, type SegmentedControlOption } from '@/components';
import { NavHeader, ScrollView } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

// 状态徽章组件
type StatusBadgeProps = {
  status: string;
  color: string;
  bgColor: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  color,
  bgColor,
}) => (
  <View className="rounded-full px-2 py-1" style={{ backgroundColor: bgColor }}>
    <Text className="text-xs font-medium" style={{ color }}>
      {status}
    </Text>
  </View>
);

// 订单项组件
type OrderItemProps = {
  orderNumber: string;
  customer: string;
  orderDate: string;
  deliveryDate: string;
  amount: string;
  status: string;
  statusColor: string;
  statusBgColor: string;
  onViewDetail?: () => void;
};

const OrderItem: React.FC<OrderItemProps> = ({
  orderNumber,
  customer,
  orderDate,
  deliveryDate,
  amount,
  status,
  statusColor,
  statusBgColor,
  onViewDetail,
}) => (
  <View className="border-b border-gray-100 py-4 dark:border-neutral-700">
    <View className="mb-2 flex-row items-center justify-between">
      <Text className="text-base font-medium dark:text-gray-100">
        订单 #{orderNumber}
      </Text>
      <StatusBadge
        status={status}
        color={statusColor}
        bgColor={statusBgColor}
      />
    </View>
    <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
      客户：{customer}
    </Text>
    <View className="mb-2 flex-row items-center justify-between">
      <Text className="text-sm text-gray-500 dark:text-gray-400">
        订单日期：{orderDate}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400">
        交付日期：{deliveryDate}
      </Text>
    </View>
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          订单金额：
        </Text>
        <Text className="text-sm font-medium dark:text-gray-100">
          ¥{amount}
        </Text>
      </View>
      <TouchableOpacity onPress={onViewDetail}>
        <Text className="text-sm text-blue-600 dark:text-blue-400">
          查看详情
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Orders: React.FC = () => {
  const router = useRouter();

  // 分段控制器选项
  const tabOptions: SegmentedControlOption[] = [
    { key: 'all-orders', label: '全部订单' },
    { key: 'pending-orders', label: '待处理' },
    { key: 'processing-orders', label: '生产中' },
    { key: 'completed-orders', label: '已完成' },
    { key: 'cancelled-orders', label: '已取消' },
  ];

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // 订单数据
  const orderStats = {
    total: 128,
    pending: 32,
    processing: 45,
    completed: 51,
    completionRate: 85.7,
    rateChange: 3.2,
  };

  // 订单列表数据
  const orderItems = [
    {
      id: '1',
      orderNumber: '2023112801',
      customer: '上海某电子有限公司',
      orderDate: '2023-11-28',
      deliveryDate: '2023-12-05',
      amount: '128,500',
      status: '已完成',
      statusColor: '#22c55e',
      statusBgColor: '#dcfce7',
    },
    {
      id: '2',
      orderNumber: '2023112702',
      customer: '北京智能科技有限公司',
      orderDate: '2023-11-27',
      deliveryDate: '2023-12-10',
      amount: '95,200',
      status: '生产中',
      statusColor: '#9333ea',
      statusBgColor: '#f3e8ff',
    },
    {
      id: '3',
      orderNumber: '2023112505',
      customer: '广州电子科技有限公司',
      orderDate: '2023-11-25',
      deliveryDate: '2023-12-15',
      amount: '76,800',
      status: '待处理',
      statusColor: '#f97316',
      statusBgColor: '#ffedd5',
    },
    {
      id: '4',
      orderNumber: '2023112403',
      customer: '深圳创新科技有限公司',
      orderDate: '2023-11-24',
      deliveryDate: '2023-12-01',
      amount: '112,350',
      status: '已完成',
      statusColor: '#22c55e',
      statusBgColor: '#dcfce7',
    },
    {
      id: '5',
      orderNumber: '2023112302',
      customer: '杭州智能家居有限公司',
      orderDate: '2023-11-23',
      deliveryDate: '2023-11-24',
      amount: '45,600',
      status: '已取消',
      statusColor: '#6b7280',
      statusBgColor: '#f3f4f6',
    },
  ];

  // 渲染当前选中的选项卡内容
  const renderTabContent = () => {
    switch (selectedTabIndex) {
      case 0: // 全部订单
        return (
          <>
            {/* 订单概览 */}
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <Text className="mb-3 text-lg font-semibold dark:text-gray-100">
                订单概览
              </Text>
              <View className="mb-3 flex-row justify-between">
                <View className="flex-1 items-center">
                  <Text
                    className="text-xl font-bold"
                    style={{ color: '#0066ff' }}
                  >
                    {orderStats.total}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    总订单
                  </Text>
                </View>
                <View className="flex-1 items-center">
                  <Text
                    className="text-xl font-bold"
                    style={{ color: '#f97316' }}
                  >
                    {orderStats.pending}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    待处理
                  </Text>
                </View>
                <View className="flex-1 items-center">
                  <Text
                    className="text-xl font-bold"
                    style={{ color: '#9333ea' }}
                  >
                    {orderStats.processing}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    生产中
                  </Text>
                </View>
                <View className="flex-1 items-center">
                  <Text
                    className="text-xl font-bold"
                    style={{ color: '#22c55e' }}
                  >
                    {orderStats.completed}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    已完成
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                <View className="mr-3">
                  <FontAwesome name="pie-chart" size={20} color="#0066ff" />
                </View>
                <View>
                  <Text className="text-sm font-medium dark:text-gray-100">
                    本月订单完成率
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="mr-2 text-lg font-bold text-blue-600">
                      {orderStats.completionRate}%
                    </Text>
                    <Text className="text-xs text-green-500">
                      ↑ {orderStats.rateChange}%
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 搜索框 */}
            <View className="mb-4">
              <View className="relative flex-row items-center">
                <View className="absolute left-3 z-10">
                  <FontAwesome name="search" size={16} color="#9ca3af" />
                </View>
                <TextInput
                  className="flex-1 rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  placeholder="搜索订单号、客户名称"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* 订单列表 */}
            <Text className="mb-3 text-lg font-semibold dark:text-gray-100">
              订单列表
            </Text>
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              {orderItems.map((item) => (
                <OrderItem
                  key={item.id}
                  orderNumber={item.orderNumber}
                  customer={item.customer}
                  orderDate={item.orderDate}
                  deliveryDate={item.deliveryDate}
                  amount={item.amount}
                  status={item.status}
                  statusColor={item.statusColor}
                  statusBgColor={item.statusBgColor}
                  onViewDetail={() => router.push(`/order/${item.id}`)}
                />
              ))}
            </View>
          </>
        );
      case 1: // 待处理
        return (
          <View className="my-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
            <Text className="mb-3 text-lg font-semibold dark:text-gray-100">
              待处理订单
            </Text>
            <Text className="text-gray-500 dark:text-gray-400">
              此处显示待处理订单信息
            </Text>
          </View>
        );
      case 2: // 生产中
        return (
          <View className="my-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
            <Text className="mb-3 text-lg font-semibold dark:text-gray-100">
              生产中订单
            </Text>
            <Text className="text-gray-500 dark:text-gray-400">
              此处显示生产中订单信息
            </Text>
          </View>
        );
      case 3: // 已完成
        return (
          <View className="my-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
            <Text className="mb-3 text-lg font-semibold dark:text-gray-100">
              已完成订单
            </Text>
            <Text className="text-gray-500 dark:text-gray-400">
              此处显示已完成订单信息
            </Text>
          </View>
        );
      case 4: // 已取消
        return (
          <View className="my-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
            <Text className="mb-3 text-lg font-semibold dark:text-gray-100">
              已取消订单
            </Text>
            <Text className="text-gray-500 dark:text-gray-400">
              此处显示已取消订单信息
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-gray-100 dark:bg-neutral-950">
      {/* 顶部导航 */}
      <NavHeader
        title="订单"
        leftShown={false}
        right={
          <>
            <TouchableOpacity className="ml-4">
              <FontAwesome name="search" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <FontAwesome name="filter" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <FontAwesome name="plus-circle" size={22} color="#0066ff" />
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

      {/* 内容区域 */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16 }}
      >
        {/* 选项卡内容 */}
        {renderTabContent()}

        {/* 底部间距 */}
        <View className="h-20" />
      </ScrollView>

      {/* 浮动按钮 */}
      <TouchableOpacity className="absolute bottom-20 right-6 size-14 items-center justify-center rounded-full bg-blue-600 shadow-lg">
        <FontAwesome name="plus" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

export default Orders;
