import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import { queryByFilter } from '@/api';
import { RefreshListView } from '@/components';
import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';
import { type Equipment, type EquipmentStatus } from '@/types';
import { Env } from '@env';

const PageSize = 10;
const moduleCode = 'EM_EQUIPMENT_INFO_MNG';

type FilterType = 'all' | 'running' | 'repairing' | 'fault';

const STATUS_CONFIG = {
  running: {
    bg: 'bg-emerald-50',
    text: '#059669',
    border: 'border-emerald-200',
    icon: 'check-circle',
    label: '运行中',
  },
  repairing: {
    bg: 'bg-amber-50',
    text: '#d97706',
    border: 'border-amber-200',
    icon: 'wrench',
    label: '维修中',
  },
  fault: {
    bg: 'bg-red-50',
    text: '#dc2626',
    border: 'border-red-200',
    icon: 'exclamation-triangle',
    label: '故障',
  },
  default: {
    bg: 'bg-gray-100',
    text: '#6b7280',
    border: 'border-gray-200',
    icon: 'question-circle',
    label: '未知',
  },
};

const getStatusConfig = (status: EquipmentStatus | null | undefined) => {
  return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.default;
};

type FilterButtonProps = {
  label: string;
  count: number;
  active: boolean;
  onPress: () => void;
  activeColor?: string;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  count,
  active,
  onPress,
  activeColor,
}) => (
  <TouchableOpacity
    className={`mr-2 flex-row items-center rounded-full px-3.5 py-2 ${active ? '' : 'bg-gray-100 dark:bg-neutral-700'
      }`}
    style={active ? { backgroundColor: activeColor || '#3b82f6' } : undefined}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      className={`text-[13px] font-medium ${active ? 'text-white' : 'text-gray-700 dark:text-gray-300'
        }`}
    >
      {label}
    </Text>
    <View
      className={`ml-1.5 min-w-[20px] items-center rounded-full px-1.5 py-0.5 ${active ? 'bg-white/25' : 'bg-gray-200 dark:bg-neutral-600'
        }`}
      style={!active && activeColor ? { backgroundColor: `${activeColor}20` } : undefined}
    >
      <Text
        className={`text-[11px] font-semibold ${active ? 'text-white' : 'text-gray-500'}`}
        style={!active && activeColor ? { color: activeColor } : undefined}
      >
        {count}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function Equipment() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { isDark } = useAppColorScheme();
  const [list, setList] = useState<Equipment[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const pageNumRef = useRef(1);

  const loadData = async (append = false) => {
    const page = append ? pageNumRef.current + 1 : 1;
    pageNumRef.current = page;

    const filter = {
      PageIndex: page,
      PageSize: PageSize,
      Conditions: '',
    };

    const { success, data, total } = await queryByFilter(moduleCode, {}, filter);

    if (success && Array.isArray(data)) {
      const newHasMore = list.length + data.length < (total || 0);
      setHasMore(newHasMore);
      setList((prev) => (append ? [...prev, ...data] : data));
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadData(false);
  }, []);

  const handleEquipmentPress = (item: Equipment) => {
    router.push(`/equipment/${item.ID}`);
  };

  const onRefresh = () => {
    pageNumRef.current = 1;
    loadData(false);
  };

  const onLoadMore = () => {
    if (!hasMore) return;
    loadData(true);
  };

  const filterCounts = useMemo(
    () => ({
      all: list.length,
      running: list.filter((e) => e.Status === 'running').length,
      repairing: list.filter((e) => e.Status === 'repairing').length,
      fault: list.filter((e) => e.Status === 'fault').length,
    }),
    [list]
  );

  const filteredList = useMemo(() => {
    if (activeFilter === 'all') return list;
    return list.filter((e) => e.Status === activeFilter);
  }, [list, activeFilter]);

  const renderEquipmentCard = ({ item }: { item: Equipment }) => {
    const statusConfig = getStatusConfig(item.Status);
    const healthRate = item.HealthRate ?? 0;
    const repairCount = item.RepairCount ?? 0;

    return (
      <TouchableOpacity
        className="mb-3 overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-neutral-800"
        onPress={() => handleEquipmentPress(item)}
        activeOpacity={0.7}
      >
        {/* 状态指示条 */}
        <View className="h-[3px] w-full" style={{ backgroundColor: statusConfig.text }} />

        <View className="p-4">
          {/* 顶部区域：图片 + 信息 + 状态 */}
          <View className="flex-row items-start">
            {/* 设备图片 */}
            <View className="size-[60px] overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-700">
              {item.ImageId ? (
                <Image
                  source={{ uri: `${Env.API_URL}/api/File/Img/${item.ImageId}` }}
                  className="size-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="flex-1 items-center justify-center">
                  <FontAwesome name="cogs" size={24} color="#9ca3af" />
                </View>
              )}
            </View>

            {/* 设备信息 */}
            <View className="ml-3 mr-2 flex-1">
              <Text
                className="mb-1 text-[15px] font-semibold text-gray-800 dark:text-gray-100"
                numberOfLines={1}
              >
                {item.MachineName}
              </Text>
              <Text className="mb-1.5 text-[13px] text-gray-500 dark:text-gray-400">
                {item.MachineNo}
              </Text>
              <View className="flex-row items-center">
                <FontAwesome name="map-marker" size={11} color="#9ca3af" />
                <Text
                  className="ml-1 flex-1 text-xs text-gray-400"
                  numberOfLines={1}
                >
                  {item.Location || '未设置'}
                </Text>
              </View>
            </View>

            {/* 状态标签 */}
            <View
              className={`flex-row items-center rounded-xl border px-2.5 py-1 ${statusConfig.bg} ${statusConfig.border}`}
            >
              <FontAwesome
                name={statusConfig.icon as any}
                size={10}
                color={statusConfig.text}
              />
              <Text
                className="ml-1 text-[11px] font-semibold"
                style={{ color: statusConfig.text }}
              >
                {statusConfig.label}
              </Text>
            </View>
          </View>

          {/* 分隔线 */}
          <View className="my-3.5 h-px bg-gray-100 dark:bg-neutral-700" />

          {/* 底部统计区域 */}
          <View className="flex-row items-center">
            {/* 健康度 */}
            <View className="flex-1 items-center">
              <View className="flex-row items-baseline">
                <Text
                  className="text-lg font-bold"
                  style={{ color: healthRate < 50 ? '#dc2626' : '#059669' }}
                >
                  {healthRate}
                </Text>
                <Text className="ml-0.5 text-[11px] text-gray-400">%</Text>
              </View>
              <Text className="mt-1 text-[11px] text-gray-400">健康度</Text>
              {/* 健康度进度条 */}
              <View className="mt-1.5 h-[3px] w-[70%] overflow-hidden rounded-sm bg-gray-200">
                <View
                  className="h-full rounded-sm"
                  style={{
                    width: `${Math.min(healthRate, 100)}%`,
                    backgroundColor: healthRate < 50 ? '#dc2626' : '#059669',
                  }}
                />
              </View>
            </View>

            {/* 分隔 */}
            <View className="h-8 w-px bg-gray-100 dark:bg-neutral-700" />

            {/* 维修次数 */}
            <View className="flex-1 items-center">
              <View className="flex-row items-baseline">
                <Text className="text-lg font-bold text-blue-500">{repairCount}</Text>
                <Text className="ml-0.5 text-[11px] text-gray-400">次</Text>
              </View>
              <Text className="mt-1 text-[11px] text-gray-400">本月维修</Text>
            </View>

            {/* 分隔 */}
            <View className="h-8 w-px bg-gray-100 dark:bg-neutral-700" />

            {/* 状态相关信息 */}
            <View className="flex-1 items-center">
              <Text
                className="text-[13px] font-semibold"
                style={{
                  color:
                    item.Status === 'repairing'
                      ? '#faad14'
                      : item.Status === 'fault'
                        ? '#f5222d'
                        : '#374151',
                }}
              >
                xxxxxx
              </Text>
              <Text className="mt-1 text-[11px] text-gray-400">
                {item.Status === 'repairing'
                  ? '维修状态'
                  : item.Status === 'fault'
                    ? '优先级'
                    : '距保养'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center py-16">
      <View className="mb-4 size-20 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-700">
        <FontAwesome
          name="inbox"
          size={40}
          color={isDark ? '#6b7280' : '#9ca3af'}
          group={GroupEnum.FontAwesome}
        />
      </View>
      <Text className="mb-2 text-[17px] font-semibold text-gray-700 dark:text-gray-100">
        暂无设备信息
      </Text>
      <Text className="text-sm text-gray-400">下拉刷新或添加新设备</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader
        title="设备"
        leftShown={false}
        right={
          <TouchableOpacity
            className="p-2"
            onPress={() => router.push('/equipment/add')}
          >
            <FontAwesome
              name="plus"
              size={20}
              color={isDark ? '#9ca3af' : '#6b7280'}
            />
          </TouchableOpacity>
        }
      />

      {/* 搜索和筛选区域 */}
      <View className="border-b border-gray-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
        {/* 搜索框 */}
        <View className="mb-3 flex-row items-center">
          <View className="relative flex-1">
            <FontAwesome
              name="search"
              size={14}
              color="#9ca3af"
              style={{ position: 'absolute', left: 12, top: 12, zIndex: 1 }}
            />
            <TextInput
              className="rounded-xl bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-700 dark:bg-neutral-700 dark:text-gray-100"
              placeholder="搜索设备名称、编号..."
              placeholderTextColor="#9ca3af"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity
            className="ml-2.5 rounded-xl bg-blue-500 p-3"
            activeOpacity={0.7}
          >
            <FontAwesome name="search" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* 筛选标签 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
            activeColor={STATUS_CONFIG.running.text}
          />
          <FilterButton
            label="维修中"
            count={filterCounts.repairing}
            active={activeFilter === 'repairing'}
            onPress={() => setActiveFilter('repairing')}
            activeColor={STATUS_CONFIG.repairing.text}
          />
          <FilterButton
            label="故障"
            count={filterCounts.fault}
            active={activeFilter === 'fault'}
            onPress={() => setActiveFilter('fault')}
            activeColor={STATUS_CONFIG.fault.text}
          />
          <TouchableOpacity
            className="flex-row items-center rounded-full bg-gray-100 px-3.5 py-2 dark:bg-neutral-700"
            activeOpacity={0.7}
          >
            <FontAwesome
              name="sliders"
              size={14}
              color={isDark ? '#d4d4d4' : '#374151'}
            />
            <Text className="ml-1.5 text-[13px] font-medium text-gray-700 dark:text-gray-300">
              筛选
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 设备列表 */}
      <RefreshListView
        data={filteredList}
        renderItem={renderEquipmentCard}
        keyExtractor={(item) => item.ID}
        showsVerticalScrollIndicator={false}
        hasMore={hasMore}
        ListEmptyComponent={EmptyState}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}
