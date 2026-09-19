import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import http from '@/api/common/http';
import { InfoRow } from '@/components/equipment';
import {
  ProgressItem,
  type ProgressItemProps,
  SparePartItem,
} from '@/components/repair-order';
import { NavHeader, Text, View } from '@/components/ui';
import colors from '@/components/ui/colors';
import { FontAwesome } from '@/components/ui/icons';
import { formatRelativeDate } from '@/lib';

type Equipment = {
  ID: string;
  MachineName?: string;
  MachineNo?: string;
  Location?: string;
};
// 维修工单详情类型
type RepairOrderDetail = {
  ID: string;
  OrderNo: string;
  Equipment?: Equipment;
  FaultType?: string;
  FaultDesc?: string;
  Priority?: string;
  Impact?: string;
  Status?: string;
  CreatedTime?: string;
  ExpectedCompleteTime?: string;
  StartTime?: string;
  CompleteTime?: string;
  AssignUserName?: string;
  AssignUserPhone?: string;
  AssignUserLevel?: string;
  CreatedName?: string;
  Remark?: string;
  ImageIds?: string[];
  ProgressSteps?: ProgressItemProps[];
};

const RepairOrderDetailView: React.FC = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  // 状态管理
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<RepairOrderDetail | null>(null);

  // 获取维修工单详情
  const fetchDetail = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const { Success, Data } = await http.get<RepairOrderDetail>(
        `/api/EmRepairOrder/${id}`
      );
      if (Success && Data) {
        setDetail(Data);
      }
    } catch (err) {
      console.error('获取维修工单详情失败:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  // 备件数据
  const spareParts = [
    {
      name: '主轴轴承',
      model: 'SKF-6210',
      quantity: 2,
      price: '¥580',
    },
    {
      name: '润滑脂',
      model: 'NLGI-2',
      quantity: 1,
      price: '¥120',
    },
  ];

  // 加载中状态
  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
        <NavHeader title="维修详情" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary[600]} />
          <Text className="mt-4 text-sm text-gray-500">加载中...</Text>
        </View>
      </View>
    );
  }

  // 无数据状态
  if (!detail) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
        <NavHeader title="维修详情" />
        <View className="flex-1 items-center justify-center">
          <FontAwesome name="exclamation-circle" size={48} color="#9ca3af" />
          <Text className="mt-4 text-sm text-gray-500">未找到工单信息</Text>
        </View>
      </View>
    );
  }

  // 优先级配置
  const getPriorityConfig = (priority?: string) => {
    const configs: Record<string, { label: string; colors: string[] }> = {
      urgent: { label: '紧急', colors: ['#ef4444', '#dc2626'] },
      high: { label: '高', colors: ['#f97316', '#ea580c'] },
      normal: {
        label: '普通',
        colors: [colors.primary[600], colors.primary[800]],
      },
    };
    return configs[priority || 'normal'] || configs.normal;
  };

  const priorityConfig = getPriorityConfig(detail.Priority);

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader
        title="维修详情"
        right={
          <TouchableOpacity onPress={() => console.log('更多')}>
            <FontAwesome name="ellipsis-v" size={20} color={colors.white} />
          </TouchableOpacity>
        }
      />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 工单状态卡片 */}
        <LinearGradient
          colors={priorityConfig.colors as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          {/* 顶部：优先级和工单号 */}
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="rounded-full bg-white/25 px-3 py-1.5">
                <Text className="text-xs font-bold text-white">
                  {priorityConfig.label}
                </Text>
              </View>
              {detail.Status && (
                <View className="rounded-full bg-white/15 px-3 py-1.5">
                  <Text className="text-xs text-white/90">{detail.Status}</Text>
                </View>
              )}
            </View>
            <FontAwesome name="wrench" size={20} color="white" />
          </View>

          <View className="mb-5">
            <Text className="text-xs text-white/75">工单号</Text>
            <Text className="mt-1 text-lg font-bold text-white">
              {detail.OrderNo}
            </Text>
          </View>

          {/* 时间信息 */}
          <View className="flex-row gap-3 border-t border-white/20 pt-4">
            <View className="flex-1">
              <View className="mb-2 flex-row items-center">
                <FontAwesome name="calendar" size={12} color={colors.white} />
                <Text className="ml-1.5 text-xs text-white/75">创建时间</Text>
              </View>
              <Text className="text-sm font-semibold text-white">
                {detail.CreatedTime
                  ? formatRelativeDate(detail.CreatedTime)
                  : '-'}
              </Text>
            </View>
            <View className="flex-1">
              <View className="mb-2 flex-row items-center">
                <FontAwesome
                  name="flag-checkered"
                  size={12}
                  color={colors.white}
                />
                <Text className="ml-1.5 text-xs text-white/75">截止时间</Text>
              </View>
              <Text className="text-sm font-semibold text-white">
                {detail.ExpectedCompleteTime
                  ? formatRelativeDate(detail.ExpectedCompleteTime)
                  : '-'}
              </Text>
            </View>
            <View className="flex-1">
              <View className="mb-2 flex-row items-center">
                <FontAwesome name="clock-o" size={12} color={colors.white} />
                <Text className="ml-1.5 text-xs text-white/75">剩余</Text>
              </View>
              <Text className="text-sm font-bold text-white">
                {detail.ExpectedCompleteTime
                  ? (() => {
                      const remaining =
                        new Date(detail.ExpectedCompleteTime).getTime() -
                        Date.now();
                      const hours = Math.floor(remaining / (1000 * 60 * 60));
                      return hours > 0 ? `${hours}小时` : '已逾期';
                    })()
                  : '-'}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* 设备信息 */}
        <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="server" size={18} color={colors.primary[600]} />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              设备信息
            </Text>
          </View>
          <View>
            <InfoRow
              label="设备名称"
              value={detail.Equipment?.MachineName || '-'}
            />
            <InfoRow
              label="设备编号"
              value={detail.Equipment?.MachineNo || '-'}
            />
            <InfoRow
              label="安装位置"
              value={detail.Equipment?.Location || '-'}
              isLast
            />
          </View>
        </View>

        {/* 故障信息 */}
        <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="exclamation-circle" size={18} color="#f5222d" />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              故障信息
            </Text>
          </View>
          <View>
            <View className="mb-3">
              <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                故障描述
              </Text>
              <View className="rounded-lg bg-gray-50 p-3 dark:bg-neutral-700/50">
                <Text className="text-sm text-gray-800 dark:text-gray-100">
                  {detail.FaultDesc || '暂无描述'}
                </Text>
              </View>
            </View>
            {detail.FaultType && (
              <View className="mb-3">
                <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  故障类型
                </Text>
                <View className="self-start rounded-full bg-red-50 px-3 py-1 dark:bg-red-950/50">
                  <Text className="text-sm text-red-500">
                    {detail.FaultType}
                  </Text>
                </View>
              </View>
            )}
            {detail.Impact && (
              <View className="mb-3">
                <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  影响程度
                </Text>
                <View className="self-start rounded-full bg-red-500 px-3 py-1">
                  <Text className="text-sm text-white">{detail.Impact}</Text>
                </View>
              </View>
            )}
            {detail.ImageIds && detail.ImageIds.length > 0 && (
              <View>
                <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  故障图片
                </Text>
                <View className="flex-row gap-2">
                  {detail.ImageIds.map((imageId, index) => (
                    <View
                      key={index}
                      className="aspect-square w-[30%] items-center justify-center rounded-lg bg-gray-200 dark:bg-neutral-700"
                    >
                      <FontAwesome name="image" size={24} color="#9ca3af" />
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* 维修进度 */}
        <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="tasks" size={18} color={colors.primary[600]} />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              维修进度
            </Text>
          </View>
          <View>
            {detail.ProgressSteps?.map((step, index) => (
              <ProgressItem key={index} {...step} />
            ))}
          </View>
        </View>

        {/* 维修人员 */}
        <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome
              name="user-circle"
              size={18}
              color={colors.primary[600]}
            />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              维修人员
            </Text>
          </View>
          {detail.AssignUserName ? (
            <View className="flex-row items-center rounded-lg bg-gray-50 p-3 dark:bg-neutral-700/50">
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(detail.AssignUserName)}&background=F28B25&color=fff`,
                }}
                style={{ width: 48, height: 48, borderRadius: 24 }}
              />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {detail.AssignUserName}
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  {detail.AssignUserLevel || '维修技师'}
                  {detail.AssignUserPhone && ` · ${detail.AssignUserPhone}`}
                </Text>
              </View>
              {detail.AssignUserPhone && (
                <TouchableOpacity onPress={() => console.log('拨打电话')}>
                  <FontAwesome
                    name="phone"
                    size={20}
                    color={colors.primary[600]}
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View className="rounded-lg bg-gray-50 p-3 dark:bg-neutral-700/50">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                暂未分配维修人员
              </Text>
            </View>
          )}
        </View>

        {/* 备件使用 */}
        <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="cube" size={18} color={colors.primary[600]} />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              备件使用
            </Text>
          </View>
          <View>
            {spareParts.map((part, index) => (
              <SparePartItem key={index} {...part} />
            ))}
            <View className="mt-3 flex-row justify-between border-t border-gray-200 pt-3 dark:border-neutral-700">
              <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                合计
              </Text>
              <Text className="text-base font-bold text-primary-600">¥700</Text>
            </View>
          </View>
        </View>

        {/* 底部空间 */}
        <View className="h-[100px]" />
      </ScrollView>

      {/* 底部固定操作栏 */}
      <View
        className="border-t border-gray-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="flex-row">
          <TouchableOpacity
            className="mr-3 flex-1 items-center rounded-xl border-2 border-primary-600 py-3"
            onPress={() => console.log('添加备注')}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <FontAwesome
                name="comment"
                size={16}
                color={colors.primary[600]}
              />
              <Text className="ml-2 font-semibold text-primary-600 dark:text-primary-400">
                备注
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center rounded-xl bg-primary-600 py-3"
            onPress={() => console.log('完成维修')}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <FontAwesome name="check" size={16} color="white" />
              <Text className="ml-2 font-semibold text-white">完成维修</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RepairOrderDetailView;
