// ✅ 修正：LinearGradient 应从 react-native-linear-gradient 导入
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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
        ({count})
      </Text>
    </Text>
  </TouchableOpacity>
);

// ✅ 移除 EquipmentCardProps 类型定义，直接在 renderItem 中内联使用
export default function Equipment() {
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { isDark } = useAppColorScheme();
  const [list, setList] = useState<Equipment[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true); // 初始可加载
  const pageNumRef = useRef(1);

  async function loadData(append = false) {
    const page = append ? pageNumRef.current + 1 : 1;
    pageNumRef.current = page;

    let filter = {
      PageIndex: page,
      PageSize: PageSize,
      Conditions: '',
    };

    const { success, data, total } = await queryByFilter(
      moduleCode,
      {},
      filter
    );

    if (success && Array.isArray(data)) {
      // ✅ 根据 total 判断是否还有更多数据
      const newHasMore = list.length + data.length < (total || 0);
      setHasMore(newHasMore);

      setList((prev) => (append ? [...prev, ...data] : data));
    } else {
      setHasMore(false);
    }
  }

  useEffect(() => {
    loadData(false);
  }, []);

  const handleMessagePress = (item: Equipment) => {
    console.log('Equipment pressed:', item);
  };

  const onRefresh = () => {
    pageNumRef.current = 1;
    loadData(false);
  };

  const onLoadMore = () => {
    if (!hasMore) return;
    loadData(true);
  };

  // ✅ 正确的 renderItem 函数：接收 { item }
  const renderEquipmentCard = ({ item }: { item: Equipment }) => {
    const getStatusConfig = (status: EquipmentStatus | null | undefined) => {
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
        default:
          return {
            bgColor: 'rgba(156, 163, 175, 0.1)',
            textColor: '#9ca3af',
            icon: 'question-circle',
            label: '未知',
          };
      }
    };

    const statusConfig = getStatusConfig(item.Status);

    return (
      <TouchableOpacity
        className="mb-3 rounded-xl bg-white shadow-sm dark:bg-neutral-800"
        onPress={() => handleMessagePress(item)} // ✅ 传入 onPress
        activeOpacity={0.7}
      >
        <View className="p-4" style={{ margin: 10 }}>
          {/* 顶部信息 */}
          <View className="mb-3 flex-row items-start justify-between">
            <View className="flex-1 flex-row items-start">

              {item.ImageId ? <Image
                source={{
                  uri: Env.API_URL + '/api/File/Img/' + item.ImageId,
                }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              /> : <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
              </View>}
              <View className="flex-1">
                <Text className="mb-1 text-base font-semibold text-gray-800 dark:text-gray-100">
                  {item.MachineName}
                </Text>
                <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  编号：{item.MachineNo}
                </Text>
                <View className="flex-row items-center">
                  <FontAwesome name="map-marker" size={10} color="#9ca3af" />
                  <Text className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                    {item.Location}
                  </Text>
                  <FontAwesome
                    name="calendar"
                    size={10}
                    color="#9ca3af"
                    style={{ marginLeft: 12 }}
                  />
                  <Text className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                    {item.StopDate}
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
                style={{ color: 33 < 50 ? '#f5222d' : '#374151' }}
              >
                33%
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                健康度
              </Text>
            </View>
            <View className="flex-1 items-center border-x border-gray-100 dark:border-neutral-700">
              <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                122次
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
                    item.Status === 'repairing'
                      ? '#faad14'
                      : item.Status === 'fault'
                        ? '#f5222d'
                        : '#374151',
                }}
              >
                xxxxxx
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                {item.Status === 'repairing'
                  ? '维修状态'
                  : item.Status === 'fault'
                    ? '优先级'
                    : '距保养'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity >
    );
  };

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View className="mb-6 size-20 items-center justify-center rounded-full border-2 border-purple-500 bg-white dark:border-purple-400 dark:bg-neutral-800">
        <FontAwesome
          name="bell"
          size={32}
          color={isDark ? '#C084FC' : '#8B5CF6'}
          group={GroupEnum.FontAwesome}
        />
      </View>
      <Text className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
        暂无设备信息
      </Text>
      <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
        暂无设备数据，请稍后刷新
      </Text>
    </View>
  );
  const filterCounts = {
    all: list.length,
    running: list.filter((e) => e.Status === 'running').length,
    repairing: list.filter((e) => e.Status === 'repairing').length,
    fault: list.filter((e) => e.Status === 'fault').length,
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
      {/* ✅ 传递 renderItem 函数，而非组件 */}
      <RefreshListView
        data={list}
        renderItem={renderEquipmentCard}
        keyExtractor={(item) => item.ID}
        showsVerticalScrollIndicator={false}
        hasMore={hasMore}
        ListEmptyComponent={EmptyState}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        style={{ margin: 10 }}
      />
    </View>
  );
}
