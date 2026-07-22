import { Env } from '@env';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { queryDetail } from '@/api';
import {
  DocumentItem,
  InfoRow,
  MaintenancePlanItem,
  RepairRecordItem,
  StatCard,
} from '@/components/equipment';
import { ImageGallery, NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';
import { formatDateShort, formatFileSize, getFileIconInfo } from '@/lib/utils';
import { type Equipment } from '@/types';

const EquipmentDetail: React.FC = () => {
  // const router = useRouter();
  // const { id } = useLocalSearchParams();
  const { isDark } = useAppColorScheme();
  const insets = useSafeAreaInsets();
  const local = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<Equipment>({} as Equipment);

  const loadData = useCallback(async () => {
    const { Success, Data } = await queryDetail<Equipment>(
      '/api/EmEquipment',
      local.id
    );
    if (Success) setData(Data);
  }, [local.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 快捷操作按钮数据
  const quickActions = [
    {
      icon: 'wrench',
      iconColor: '#f97316',
      bgColor: '#fff7ed',
      label: '报修',
      onPress: () => console.log('报修'),
    },
    {
      icon: 'cog',
      iconColor: '#52c41a',
      bgColor: '#f0fdf4',
      label: '保养',
      onPress: () => console.log('保养'),
    },
    {
      icon: 'clipboard-check',
      iconColor: '#a855f7',
      bgColor: '#faf5ff',
      label: '点检',
      onPress: () => console.log('点检'),
    },
  ];

  // 维修记录数据
  const repairRecords = [
    {
      title: '定期维护保养',
      description: '更换润滑油、清洁过滤器',
      assignee: '张三',
      date: '2024-10-28',
      status: '已完成',
      statusColor: '#52c41a',
      borderColor: '#52c41a',
      bgColor: '#f0fdf4',
    },
    {
      title: '主轴轴承异响',
      description: '更换主轴轴承',
      assignee: '李四',
      date: '2024-10-15',
      status: '处理中',
      statusColor: '#faad14',
      borderColor: '#faad14',
      bgColor: '#fff7ed',
    },
    {
      title: '电气系统检查',
      description: '检查电路、更换接触器',
      assignee: '王五',
      date: '2024-09-20',
      status: '已完成',
      statusColor: '#6b7280',
      borderColor: '#9ca3af',
      bgColor: '#f9fafb',
    },
  ];

  // 保养计划数据
  const maintenancePlans = [
    {
      title: '月度保养',
      date: '2024-11-16',
      daysLeft: '5天后',
      borderColor: '#1890ff',
      bgColor: '#eff6ff',
      textColor: '#1890ff',
    },
    {
      title: '季度保养',
      date: '2024-12-15',
      daysLeft: '34天后',
      borderColor: '#9ca3af',
      bgColor: '#f9fafb',
      textColor: '#6b7280',
    },
    {
      title: '年度大修',
      date: '2025-05-15',
      daysLeft: '185天后',
      borderColor: '#9ca3af',
      bgColor: '#f9fafb',
      textColor: '#6b7280',
    },
  ];

  return (
    <View className="flex-1 bg-gray-100/70 dark:bg-neutral-950">
      {/* 顶部导航 */}
      <NavHeader
        title="设备详情"
        // onBack={() => router.back()}
        right={
          <View className="flex-row items-center">
            <TouchableOpacity
              className="mr-1 size-10 items-center justify-center rounded-full"
              onPress={() => console.log('分享')}
            >
              <FontAwesome
                name="share-alt"
                size={20}
                color={isDark ? '#9ca3af' : '#6b7280'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="size-10 items-center justify-center rounded-full"
              onPress={() => console.log('更多')}
            >
              <FontAwesome
                name="ellipsis-v"
                size={20}
                color={isDark ? '#9ca3af' : '#6b7280'}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 设备基本信息卡片 */}
        {data && (
          <LinearGradient
            colors={isDark ? ['#28233f', '#17171c'] : ['#6554ee', '#4736c7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 20,
              padding: 20,
              marginBottom: 12,
            }}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1 flex-row items-start">
                {/*  */}
                {data.ImageId ? (
                  <Image
                    source={{
                      uri: `${Env.API_URL}/api/File/Img/${data.ImageId}`,
                    }}
                    className="mr-4 size-[68px] items-center justify-center rounded-2xl bg-white/15"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="mr-4 size-[68px] items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                    <FontAwesome name="server" size={28} color="white" />
                  </View>
                )}
                <View className="flex-1">
                  <Text
                    className="mb-1 text-xl font-bold tracking-tight text-white"
                    numberOfLines={2}
                  >
                    {data.MachineName || '未命名设备'}
                  </Text>
                  <Text className="mb-2 text-sm text-white/65">
                    {data.MachineNo || '暂无设备编号'}
                  </Text>
                  <Text className="text-xs text-white/70">
                    位置：{data.Location ?? '未设置'}
                  </Text>
                </View>
              </View>
              <View className="ml-2 flex-row items-center rounded-full border border-emerald-300/30 bg-emerald-400/20 px-2.5 py-1.5">
                <FontAwesome name="circle" size={6} color="white" />
                <Text className="ml-1 text-xs font-semibold text-emerald-50">
                  运行中
                </Text>
              </View>
            </View>

            <View className="mt-5 flex-row rounded-2xl border border-white/10 bg-black/10 py-4">
              <View className="flex-1 items-center px-1">
                <Text className="mb-1 text-xl font-bold text-white">98%</Text>
                <Text className="text-[11px] text-white/60">健康度</Text>
              </View>
              <View className="flex-1 items-center border-x border-white/20">
                <Text className="mb-1 text-xl font-bold text-white">2,845</Text>
                <Text className="text-[11px] text-white/60">运行时长(h)</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="mb-1 text-xl font-bold text-white">5天</Text>
                <Text className="text-[11px] text-white/60">距下次保养</Text>
              </View>
            </View>
          </LinearGradient>
        )}

        {/* 快捷操作 */}
        <View className="mb-6 flex-row rounded-2xl border border-gray-200/80 bg-white px-2 py-3 dark:border-neutral-800 dark:bg-neutral-900">
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              className="flex-1 items-center py-1"
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <View
                className="mx-auto mb-2 size-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: isDark ? '#262626' : action.bgColor }}
              >
                <FontAwesome
                  name={action.icon as any}
                  size={20}
                  color={action.iconColor}
                />
              </View>
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 设备图片 */}
        {data?.ImageIds && data.ImageIds.length > 0 && (
          <View className="mb-3 rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <FontAwesome name="image" size={16} color="#543EF8" />
                <Text className="ml-2 text-base font-bold text-gray-900 dark:text-white">
                  设备图片
                </Text>
              </View>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                共 {data.ImageIds.length} 张
              </Text>
            </View>
            <ImageGallery imageIds={data.ImageIds} />
          </View>
        )}

        {/* 设备信息 */}
        {data && (
          <View className="mb-3 rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <View className="mb-4 flex-row items-center">
              <FontAwesome name="info-circle" size={16} color="#543EF8" />
              <Text className="ml-2 text-base font-bold text-gray-900 dark:text-white">
                设备信息
              </Text>
            </View>
            <View>
              <InfoRow label="设备名称" value={data.MachineName} />
              <InfoRow label="设备编号" value={data.MachineNo} />
              <InfoRow label="设备类型" value={data.MachineType} />
              <InfoRow label="品牌型号" value={data.BrandModel} />
              <InfoRow label="所属部门" value={data.DeptName} />
              <InfoRow label="安装位置" value={data.Location} />
              <InfoRow label="启用日期" value={data.StartDate1} />
              <InfoRow label="责任人" value={data.UseManagerName} isLast />
            </View>
          </View>
        )}
        {/* 维修统计 */}
        <View className="mb-3 rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="bar-chart-o" size={16} color="#543EF8" />
            <Text className="ml-2 text-base font-bold text-gray-900 dark:text-white">
              维修统计
            </Text>
          </View>
          <View className="flex-row flex-wrap">
            {data.RepairStats?.map((stat, index) => (
              <View
                key={index}
                className="w-[48%]"
                style={{
                  marginRight: index % 2 === 0 ? 8 : 0,
                  marginBottom: 16,
                }}
              >
                <StatCard {...stat} isDark={isDark} />
              </View>
            ))}
          </View>
        </View>

        {/* 维修记录 */}
        <View className="mb-3 rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <FontAwesome name="history" size={16} color="#543EF8" />
              <Text className="ml-2 text-base font-bold text-gray-900 dark:text-white">
                维修记录
              </Text>
            </View>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => console.log('查看全部')}
            >
              <Text className="text-sm text-primary-500 dark:text-blue-400">
                查看全部
              </Text>
              <FontAwesome name="chevron-right" size={10} color="#543EF8" />
            </TouchableOpacity>
          </View>
          <View>
            {repairRecords.map((record, index) => (
              <RepairRecordItem key={index} {...record} isDark={isDark} />
            ))}
          </View>
        </View>

        {/* 保养计划 */}
        <View className="mb-3 rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <FontAwesome name="calendar" size={16} color="#543EF8" />
              <Text className="ml-2 text-base font-bold text-gray-900 dark:text-white">
                保养计划
              </Text>
            </View>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => console.log('查看全部')}
            >
              <Text className="text-sm text-primary-500 dark:text-blue-400">
                查看全部
              </Text>
              <FontAwesome name="chevron-right" size={10} color="#543EF8" />
            </TouchableOpacity>
          </View>
          <View>
            {maintenancePlans.map((plan, index) => (
              <MaintenancePlanItem key={index} {...plan} isDark={isDark} />
            ))}
          </View>
        </View>

        {/* 设备文档 */}
        {data?.Attachments && data.Attachments.length > 0 && (
          <View className="rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <View className="mb-4 flex-row items-center">
              <FontAwesome name="folder" size={16} color="#543EF8" />
              <Text className="ml-2 text-base font-bold text-gray-900 dark:text-white">
                设备文档
              </Text>
            </View>
            <View>
              {data.Attachments.map((attachment) => {
                const iconInfo = getFileIconInfo(attachment.FileExt);
                return (
                  <DocumentItem
                    key={attachment.ID}
                    {...iconInfo}
                    title={
                      attachment.OriginalFileName ||
                      attachment.FileName ||
                      '未知文件'
                    }
                    size={formatFileSize(attachment.Length)}
                    date={formatDateShort(attachment.CreatedTime)}
                    onPress={() =>
                      console.log('下载', attachment.OriginalFileName)
                    }
                  />
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* 底部固定操作栏 */}
      <View
        className="border-t border-gray-200 bg-white px-4 pt-3 dark:border-neutral-800 dark:bg-neutral-900"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      >
        <View className="flex-row">
          <TouchableOpacity
            className="mr-3 min-h-[48px] flex-1 items-center justify-center rounded-xl bg-primary-600"
            onPress={() => console.log('编辑设备')}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <FontAwesome name="edit" size={16} color="white" />
              <Text className="ml-2 font-semibold text-white">编辑设备</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="min-h-[48px] flex-1 items-center justify-center rounded-xl border border-primary-500"
            onPress={() => console.log('生成二维码')}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <FontAwesome name="qrcode" size={16} color="#1890ff" />
              <Text className="ml-2 font-semibold text-primary-500 dark:text-blue-400">
                生成二维码
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EquipmentDetail;
