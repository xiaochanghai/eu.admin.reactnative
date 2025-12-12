import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';

// 工单状态类型
type WorkOrderStatus = 'urgent' | 'processing' | 'review' | 'completed' | 'all';

// 统计卡片数据类型
type StatCardData = {
  label: string;
  value: number;
  gradientColors: [string, string];
};

// 工单数据类型
type WorkOrder = {
  id: string;
  status: WorkOrderStatus;
  statusLabel: string;
  statusColor: string;
  title: string;
  equipmentName: string;
  description: string;
  assignee: string;
  timeAgo: string;
  deadline?: string;
};

// 统计卡片组件
type StatCardProps = {
  label: string;
  value: number;
  gradientColors: [string, string];
};

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  gradientColors,
}) => (
  <View className="w-[23%]">
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
      }}
    >
      <Text className="text-2xl font-bold text-white">{value}</Text>
      <Text className="mt-0.5 text-[10px] text-white opacity-90">{label}</Text>
    </LinearGradient>
  </View>
);

// 筛选按钮组件
type FilterButtonProps = {
  label: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  count,
  isActive,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className={`mr-2 rounded-full px-3 py-1.5 ${isActive ? 'bg-primary-500' : 'bg-gray-100 dark:bg-neutral-700'}`}
  >
    <Text
      className={`whitespace-nowrap text-sm ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}
    >
      {label} {count}
    </Text>
  </TouchableOpacity>
);

// 工单卡片组件
type WorkOrderCardProps = {
  order: WorkOrder;
  onPress: () => void;
};

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({ order, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="mb-3 rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800"
  >
    {/* 标题部分 */}
    <View className="mb-3 flex-1">
      <View className="mb-2 flex-row items-center">
        <View
          className="mr-2 rounded px-2 py-1"
          style={{ backgroundColor: order.statusColor }}
        >
          <Text className="text-xs font-semibold text-white">
            {order.statusLabel}
          </Text>
        </View>
        <Text
          className="flex-1 text-base font-semibold text-gray-800 dark:text-gray-100"
          numberOfLines={1}
        >
          {order.title}
        </Text>
      </View>
      <Text className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        设备：{order.equipmentName}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400">
        故障描述：{order.description}
      </Text>
    </View>

    {/* 底部信息 */}
    <View className="flex-row items-center justify-between border-t border-gray-100 pt-3 dark:border-neutral-700">
      <View className="flex-row items-center space-x-4">
        <View className="flex-row items-center">
          <FontAwesome name="user" size={12} color="#9ca3af" />
          <Text className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            {order.assignee}
          </Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome name="clock-o" size={12} color="#9ca3af" />
          <Text className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            {order.timeAgo}
          </Text>
        </View>
      </View>
      {order.deadline && (
        <Text
          className="text-sm font-semibold"
          style={{ color: order.statusColor }}
        >
          {order.deadline}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

const RepairList: React.FC = () => {
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

export default RepairList;
