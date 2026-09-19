import { useRouter } from 'expo-router';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { queryByFilter } from '@/api';
import { RefreshListView } from '@/components/refresh-list-view';
import {
  FilterButton,
  StatCard,
  type StatCardData,
  type WorkOrder,
  WorkOrderCard,
  type WorkOrderStatus,
} from '@/components/repair-order';
import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { formatRelativeDate } from '@/lib';
import { useAppColorScheme } from '@/lib/hooks';

const PageSize = 10;
const moduleCode = 'EM_REPAIR_ORDER_MNG';

type RepairOrderRecord = {
  // Fields returned by queryByFilter for repair orders
  ID?: string;
  OrderNo?: string;
  MachineName?: string;
  FaultType?: string;
  Priority?: string;
  Impact?: string;
  FaultDesc?: string;
  ExpectedCompleteTime?: string;
  AssignUserName?: string;
  CreatedTime?: string;
  CreatedName?: string;
  StartTime?: string;
  CompleteTime?: string;
  Status?: WorkOrderStatus;
  // Compatibility fallbacks for WorkOrder mapping
  StatusLabel?: string;
  Id?: string;
  id?: string;
  RepairOrderId?: string;
  Title?: string;
  Name?: string;
  EquipmentName?: string;
  AssetName?: string;
  Description?: string;
  Assignee?: string;
  Handler?: string;
  CreatedBy?: string;
  CreatedOn?: string;
  UpdateTime?: string;
  Deadline?: string;
};

const STATUS_META: Record<
  WorkOrderStatus,
  { label: string; color: string; gradient: [string, string] }
> = {
  Wait: {
    label: '待处理',
    color: '#f5222d',
    gradient: ['#ef4444', '#dc2626'],
  },
  processing: {
    label: '处理中',
    color: '#faad14',
    gradient: ['#f97316', '#ea580c'],
  },
  review: {
    label: '待审核',
    color: '#1890ff',
    gradient: ['#6554ee', '#4736c7'],
  },
  completed: {
    label: '已完成',
    color: '#52c41a',
    gradient: ['#22c55e', '#16a34a'],
  },
  all: {
    label: '全部',
    color: '#6b7280',
    gradient: ['#9ca3af', '#6b7280'],
  },
};

const RepairOrder: React.FC = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<WorkOrderStatus>('all');
  const { isDark } = useAppColorScheme();
  const [list, setList] = useState<WorkOrder[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const pageRef = useRef(1);

  const mapToWorkOrder = useCallback((item: RepairOrderRecord): WorkOrder => {
    const statusMeta = item.Status
      ? STATUS_META[item.Status]
      : STATUS_META.processing;
    return {
      id:
        String(item.ID ?? item.Id ?? item.id ?? item.RepairOrderId) ||
        Math.random().toString(),
      status: item.Status,
      statusLabel: item.StatusLabel ?? statusMeta.label,
      statusColor: statusMeta.color,
      title: item.Title ?? item.OrderNo ?? item.Name ?? '维修工单',
      equipmentName:
        item.EquipmentName ?? item.MachineName ?? item.AssetName ?? '未填写',
      description: item.FaultDesc ?? item.Description ?? '暂无描述',
      assignee: item.Assignee ?? item.Handler ?? item.CreatedBy ?? '未分配',
      timeAgo:
        formatRelativeDate(item.CreatedTime, { showTime: true }) ??
        formatRelativeDate(item.UpdateTime, { showTime: true }) ??
        '刚刚',
      deadline:
        formatRelativeDate(item.ExpectedCompleteTime, { showTime: true }) ??
        item.Deadline,
    };
  }, []);

  const loadData = useCallback(
    async (append = false) => {
      const page = append ? pageRef.current + 1 : 1;
      pageRef.current = page;

      const filter = {
        PageIndex: page,
        PageSize: PageSize,
        Conditions: '',
      };

      setRefreshing(!append);

      try {
        const { success, data, total } = await queryByFilter(
          moduleCode,
          {},
          filter
        );
        if (success && Array.isArray(data)) {
          const orders = data.map(mapToWorkOrder);
          setList((prev) => {
            const next = append ? [...prev, ...orders] : orders;
            setHasMore(next.length < (total || next.length));
            return next;
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error('加载维修工单失败', err);
        setHasMore(false);
      } finally {
        setRefreshing(false);
      }
    },
    [mapToWorkOrder]
  );

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  const filterCounts = useMemo(
    () => ({
      all: list.length,
      Wait: list.filter((order) => order.status === 'Wait').length,
      processing: list.filter((order) => order.status === 'processing').length,
      review: list.filter((order) => order.status === 'review').length,
      completed: list.filter((order) => order.status === 'completed').length,
    }),
    [list]
  );

  const stats: StatCardData[] = [
    {
      label: STATUS_META.Wait.label,
      value: filterCounts.Wait,
      gradientColors: STATUS_META.Wait.gradient,
    },
    {
      label: STATUS_META.processing.label,
      value: filterCounts.processing,
      gradientColors: STATUS_META.processing.gradient,
    },
    {
      label: STATUS_META.review.label,
      value: filterCounts.review,
      gradientColors: STATUS_META.review.gradient,
    },
    {
      label: STATUS_META.completed.label,
      value: filterCounts.completed,
      gradientColors: STATUS_META.completed.gradient,
    },
  ];

  const filteredOrders =
    activeFilter === 'all'
      ? list
      : list.filter((order) => order.status === activeFilter);

  // 处理工单点击
  const handleOrderPress = (orderId: string) => {
    router.push(`/repair-order/${orderId}`);
    console.log('Order pressed:', orderId);
  };

  const onRefresh = () => {
    pageRef.current = 1;
    loadData(false);
  };

  const onLoadMore = () => {
    if (!hasMore) return;
    loadData(true);
  };

  const renderOrderCard = ({ item }: { item: WorkOrder }) => (
    <WorkOrderCard order={item} onPress={() => handleOrderPress(item.id)} />
  );

  const ListHeader = () => (
    <View className="px-4 pb-3 pt-4">
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

      <View className="rounded-2xl border border-gray-200/80 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pb-2"
        >
          <FilterButton
            label="全部"
            count={filterCounts.all}
            isActive={activeFilter === 'all'}
            onPress={() => setActiveFilter('all')}
          />
          <FilterButton
            label="待处理"
            count={filterCounts.Wait}
            isActive={activeFilter === 'Wait'}
            onPress={() => setActiveFilter('Wait')}
          />
          <FilterButton
            label="处理中"
            count={filterCounts.processing}
            isActive={activeFilter === 'processing'}
            onPress={() => setActiveFilter('processing')}
          />
          <FilterButton
            label="待审核"
            count={filterCounts.review}
            isActive={activeFilter === 'review'}
            onPress={() => setActiveFilter('review')}
          />
          <FilterButton
            label="已完成"
            count={filterCounts.completed}
            isActive={activeFilter === 'completed'}
            onPress={() => setActiveFilter('completed')}
          />
        </ScrollView>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center py-16">
      <View className="mb-4 size-20 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-700">
        <FontAwesome
          name="inbox"
          size={40}
          color={isDark ? '#6b7280' : '#9ca3af'}
        />
      </View>
      <Text className="mb-2 text-[17px] font-semibold text-gray-700 dark:text-gray-100">
        暂无维修工单
      </Text>
      <Text className="text-sm text-gray-400">下拉刷新或新建工单</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100/70 dark:bg-neutral-950">
      {/* 顶部导航 */}
      <NavHeader
        title="维修"
        leftShown={false}
        right={
          <TouchableOpacity
            className="size-10 items-center justify-center rounded-full"
            onPress={() => router.push('/repair-order/add')}
          >
            <FontAwesome name="plus" size={20} color="#543EF8" />
          </TouchableOpacity>
        }
      />

      <RefreshListView
        data={filteredOrders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyState}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        hasMore={hasMore}
        refreshing={refreshing}
        estimatedItemSize={200}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      />
    </View>
  );
};

export default RepairOrder;
