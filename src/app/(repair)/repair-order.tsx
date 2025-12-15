import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import {
  FilterButton,
  StatCard,
  type StatCardData,
  type WorkOrder,
  WorkOrderCard,
  type WorkOrderStatus,
} from '@/components/repair-order';
import { NavHeader, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';

const RepairOrder: React.FC = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<WorkOrderStatus>('all');
  const { isDark } = useAppColorScheme();

  // 统计数据
  const stats: StatCardData[] = [
    { label: '紧急', value: 5, gradientColors: ['#ef4444', '#dc2626'] },
    { label: '处理中', value: 12, gradientColors: ['#f97316', '#ea580c'] },
    { label: '待审核', value: 8, gradientColors: ['#3b82f6', '#2563eb'] },
    { label: '已完成', value: 45, gradientColors: ['#22c55e', '#16a34a'] },
  ];

  // 工单数据
  const workOrders: WorkOrder[] = [
    {
      id: '1',
      status: 'urgent',
      statusLabel: '紧急',
      statusColor: '#f5222d',
      title: '生产线A-03设备故障',
      equipmentName: '数控机床 CNC-03',
      description: '主轴无法启动，电机异响',
      assignee: '张三',
      timeAgo: '2小时前',
      deadline: '今天 14:00 截止',
    },
    {
      id: '2',
      status: 'processing',
      statusLabel: '处理中',
      statusColor: '#faad14',
      title: '注塑机液压系统漏油',
      equipmentName: '注塑机 IM-05',
      description: '液压管路连接处渗油',
      assignee: '李四',
      timeAgo: '5小时前',
      deadline: '预计今天完成',
    },
    {
      id: '3',
      status: 'review',
      statusLabel: '待审核',
      statusColor: '#1890ff',
      title: '空压机压力不稳',
      equipmentName: '空压机 AC-02',
      description: '输出压力波动较大',
      assignee: '王五',
      timeAgo: '昨天',
      deadline: '等待审核',
    },
    {
      id: '4',
      status: 'completed',
      statusLabel: '已完成',
      statusColor: '#52c41a',
      title: '传送带异常停止',
      equipmentName: '传送带 CB-01',
      description: '传送带电机过载保护',
      assignee: '赵六',
      timeAgo: '2天前',
      deadline: '已完成',
    },
    {
      id: '5',
      status: 'completed',
      statusLabel: '已完成',
      statusColor: '#52c41a',
      title: '电气柜散热风扇故障',
      equipmentName: '控制柜 EC-08',
      description: '散热风扇不转动',
      assignee: '孙七',
      timeAgo: '3天前',
      deadline: '已完成',
    },
  ];

  // 根据筛选条件过滤工单
  const filteredOrders =
    activeFilter === 'all'
      ? workOrders
      : workOrders.filter((order) => order.status === activeFilter);

  // 处理工单点击
  const handleOrderPress = (orderId: string) => {
    // 跳转到工单详情页
    router.push(`/repair-order/${orderId}`);
    console.log('Order pressed:', orderId);
  };

  // 处理新建工单
  // const handleCreateOrder = () => {
  //   // router.push('/repair-create');
  //   console.log('Create new order');
  // };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader
        title="维修"
        leftShown={false}
        right={
          <TouchableOpacity
            className="mr-3"
            onPress={() => router.push('/repair-order/add')}
          >
            <FontAwesome
              name="plus"
              size={20}
              color={isDark ? '#9ca3af' : '#6b7280'}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 统计卡片 */}
        <View className="mb-4 flex-row justify-between">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              gradientColors={stat.gradientColors}
            />
          ))}
        </View>

        {/* 筛选标签 */}
        <View className="mb-4 rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pb-2"
          >
            <FilterButton
              label="全部"
              count={70}
              isActive={activeFilter === 'all'}
              onPress={() => setActiveFilter('all')}
            />
            <FilterButton
              label="紧急"
              count={5}
              isActive={activeFilter === 'urgent'}
              onPress={() => setActiveFilter('urgent')}
            />
            <FilterButton
              label="处理中"
              count={12}
              isActive={activeFilter === 'processing'}
              onPress={() => setActiveFilter('processing')}
            />
            <FilterButton
              label="待审核"
              count={8}
              isActive={activeFilter === 'review'}
              onPress={() => setActiveFilter('review')}
            />
            <FilterButton
              label="已完成"
              count={45}
              isActive={activeFilter === 'completed'}
              onPress={() => setActiveFilter('completed')}
            />
          </ScrollView>
        </View>

        {/* 维修工单列表 */}
        <View className="mb-4">
          {filteredOrders.map((order) => (
            <WorkOrderCard
              key={order.id}
              order={order}
              onPress={() => handleOrderPress(order.id)}
            />
          ))}
        </View>

        {/* 底部空间 - 为底部导航留出空间 */}
        <View className="h-[70px]" />
      </ScrollView>
    </View>
  );
};

export default RepairOrder;
