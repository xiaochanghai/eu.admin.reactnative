import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';

import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';

// 筛选标签类型
type FilterType = 'all' | 'running' | 'repairing' | 'fault';

// 设备状态类型
type EquipmentStatus = 'running' | 'repairing' | 'fault';

// 设备数据类型
type Equipment = {
  id: string;
  name: string;
  code: string;
  icon: string;
  location: string;
  installDate: string;
  status: EquipmentStatus;
  health: number;
  repairCount: number;
  maintenanceInfo: string;
  gradientColors: [string, string];
};

// 筛选按钮组件
type FilterButtonProps = {
  label: string;
  count: number;
  active: boolean;
  onPress: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  count,
  active,
  onPress,
}) => (
  <TouchableOpacity
    className={`rounded-full px-3 py-1.5 ${active ? 'bg-blue-600' : 'bg-gray-100 dark:bg-neutral-700'}`}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      className={`text-sm ${active ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}
    >
      {label}
      <Text
        className={`ml-1 ${active ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}
      >
        {count}
      </Text>
    </Text>
  </TouchableOpacity>
);

// 设备卡片组件
type EquipmentCardProps = {
  equipment: Equipment;
  onPress: () => void;
};

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  onPress,
}) => {
  const getStatusConfig = (status: EquipmentStatus) => {
    switch (status) {
      case 'running':
        return {
          bgColor: 'rgba(82, 196, 26, 0.1)',
          textColor: '#52c41a',
          icon: 'circle',
          label: '运行中',
        };
      case 'repairing':
        return {
          bgColor: 'rgba(250, 173, 20, 0.1)',
          textColor: '#faad14',
          icon: 'wrench',
          label: '维修中',
        };
      case 'fault':
        return {
          bgColor: 'rgba(245, 34, 45, 0.1)',
          textColor: '#f5222d',
          icon: 'exclamation-circle',
          label: '故障',
        };
    }
  };

  const statusConfig = getStatusConfig(equipment.status);

  return (
    <TouchableOpacity
      className="mb-3 rounded-xl bg-white shadow-sm dark:bg-neutral-800"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="p-4">
        {/* 顶部信息 */}
        <View className="mb-3 flex-row items-start justify-between">
          <View className="flex-1 flex-row items-start">
            <LinearGradient
              colors={equipment.gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <FontAwesome
                name={equipment.icon as any}
                size={24}
                color="white"
              />
            </LinearGradient>
            <View className="flex-1">
              <Text className="mb-1 text-base font-semibold text-gray-800 dark:text-gray-100">
                {equipment.name}
              </Text>
              <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                编号：{equipment.code}
              </Text>
              <View className="flex-row items-center">
                <FontAwesome name="map-marker" size={10} color="#9ca3af" />
                <Text className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                  {equipment.location}
                </Text>
                <FontAwesome
                  name="calendar"
                  size={10}
                  color="#9ca3af"
                  style={{ marginLeft: 12 }}
                />
                <Text className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                  {equipment.installDate}
                </Text>
              </View>
            </View>
          </View>
          <View
            className="ml-2 rounded-full px-3 py-1"
            style={{ backgroundColor: statusConfig.bgColor }}
          >
            <View className="flex-row items-center">
              <FontAwesome
                name={statusConfig.icon as any}
                size={8}
                color={statusConfig.textColor}
              />
              <Text
                className="ml-1 text-xs font-semibold"
                style={{ color: statusConfig.textColor }}
              >
                {statusConfig.label}
              </Text>
            </View>
          </View>
        </View>

        {/* 底部统计 */}
        <View className="flex-row border-t border-gray-100 pt-3 dark:border-neutral-700">
          <View className="flex-1 items-center">
            <Text
              className="text-sm font-semibold"
              style={{ color: equipment.health < 50 ? '#f5222d' : '#374151' }}
            >
              {equipment.health}%
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              健康度
            </Text>
          </View>
          <View className="flex-1 items-center border-x border-gray-100 dark:border-neutral-700">
            <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {equipment.repairCount}次
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              本月维修
            </Text>
          </View>
          <View className="flex-1 items-center">
            <Text
              className="text-sm font-semibold"
              style={{
                color:
                  equipment.status === 'repairing'
                    ? '#faad14'
                    : equipment.status === 'fault'
                      ? '#f5222d'
                      : '#374151',
              }}
            >
              {equipment.maintenanceInfo}
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              {equipment.status === 'repairing'
                ? '维修状态'
                : equipment.status === 'fault'
                  ? '优先级'
                  : '距保养'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EquipmentList: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { isDark } = useAppColorScheme();

  // 模拟设备数据
  const equipmentList: Equipment[] = [
    {
      id: '1',
      name: '数控机床 CNC-01',
      code: 'EQ-2024-001',
      icon: 'database',
      location: 'A车间-1号线',
      installDate: '2023-05-15',
      status: 'running',
      health: 98,
      repairCount: 2,
      maintenanceInfo: '5天',
      gradientColors: ['#3b82f6', '#2563eb'],
    },
    {
      id: '2',
      name: '注塑机 IM-03',
      code: 'EQ-2024-003',
      icon: 'cog',
      location: 'B车间-2号线',
      installDate: '2022-08-20',
      status: 'repairing',
      health: 65,
      repairCount: 7,
      maintenanceInfo: '进行中',
      gradientColors: ['#f97316', '#ea580c'],
    },
    {
      id: '3',
      name: '空压机 AC-05',
      code: 'EQ-2024-005',
      icon: 'map-marker',
      location: '动力车间',
      installDate: '2021-03-10',
      status: 'fault',
      health: 35,
      repairCount: 15,
      maintenanceInfo: '紧急',
      gradientColors: ['#ef4444', '#dc2626'],
    },
    {
      id: '4',
      name: '混料机 MX-08',
      code: 'EQ-2024-008',
      icon: 'flask',
      location: 'C车间-配料区',
      installDate: '2023-11-05',
      status: 'running',
      health: 95,
      repairCount: 1,
      maintenanceInfo: '12天',
      gradientColors: ['#22c55e', '#16a34a'],
    },
    {
      id: '5',
      name: '机械手臂 RB-02',
      code: 'EQ-2024-012',
      icon: 'map-marker',
      location: 'A车间-组装线',
      installDate: '2024-01-15',
      status: 'running',
      health: 99,
      repairCount: 0,
      maintenanceInfo: '30天',
      gradientColors: ['#a855f7', '#9333ea'],
    },
  ];

  // 筛选设备
  const filteredEquipment = equipmentList.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

  const filterCounts = {
    all: equipmentList.length,
    running: equipmentList.filter((e) => e.status === 'running').length,
    repairing: equipmentList.filter((e) => e.status === 'repairing').length,
    fault: equipmentList.filter((e) => e.status === 'fault').length,
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader
        title="设备"
        leftShown={false}
        right={
          <View className="flex-row items-center">
            <TouchableOpacity
              className="mr-3"
              onPress={() => {
                router.push(`/equipment/add`);
              }}
            >
              <FontAwesome
                name="plus"
                size={20}
                color={isDark ? '#9ca3af' : '#6b7280'}
              />
            </TouchableOpacity>
          </View>
        }
      />

      {/* 搜索和筛选 - 固定在顶部 */}
      <View className="border-b border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-neutral-700 dark:bg-neutral-800">
        {/* 搜索框 */}
        <View className="mb-3 flex-row items-center space-x-3">
          <View className="relative flex-1">
            <FontAwesome
              name="search"
              size={14}
              color="#9ca3af"
              style={{ position: 'absolute', left: 12, top: 12, zIndex: 1 }}
            />
            <TextInput
              className="rounded-lg border border-gray-300 py-2 pl-10 pr-4 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
              placeholder="搜索设备名称、编号..."
              placeholderTextColor={isDark ? '#9ca3af' : '#9ca3af'}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity
            className="rounded-lg bg-blue-600 px-4 py-2"
            activeOpacity={0.7}
          >
            <FontAwesome name="search" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* 筛选标签 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            <FilterButton
              label="全部"
              count={filterCounts.all}
              active={activeFilter === 'all'}
              onPress={() => setActiveFilter('all')}
            />
            <FilterButton
              label="运行中"
              count={filterCounts.running}
              active={activeFilter === 'running'}
              onPress={() => setActiveFilter('running')}
            />
            <FilterButton
              label="维修中"
              count={filterCounts.repairing}
              active={activeFilter === 'repairing'}
              onPress={() => setActiveFilter('repairing')}
            />
            <FilterButton
              label="故障"
              count={filterCounts.fault}
              active={activeFilter === 'fault'}
              onPress={() => setActiveFilter('fault')}
            />
            <TouchableOpacity
              className="rounded-full bg-gray-100 px-3 py-1.5 dark:bg-neutral-700"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <FontAwesome
                  name="filter"
                  size={12}
                  color={isDark ? '#d4d4d4' : '#374151'}
                />
                <Text className="ml-1 text-sm text-gray-700 dark:text-gray-200">
                  筛选
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* 设备列表 - 可滚动 */}
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 设备列表 */}
        <View>
          {filteredEquipment.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              onPress={() => {
                router.push(`/equipment/${equipment.id}`);
              }}
            />
          ))}
        </View>

        {/* 底部空间 */}
        <View className="h-[70px]" />
      </ScrollView>
    </View>
  );
};

export default EquipmentList;
