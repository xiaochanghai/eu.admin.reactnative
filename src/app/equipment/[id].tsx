import { Env } from '@env';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { queryDetail } from '@/api';
import { useLocalSearchParams } from 'expo-router';

import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';
import { type Equipment } from '@/types';

// 信息行组件
type InfoRowProps = {
  label: string;
  value?: string;
  isLast?: boolean;
};

const InfoRow: React.FC<InfoRowProps> = ({ label, value, isLast = false }) => (
  <View
    className={`flex-row items-center justify-between py-2 ${!isLast ? 'border-b border-gray-100 dark:border-neutral-700' : ''}`}
  >
    <Text className="text-sm text-gray-500 dark:text-gray-400">{label}</Text>
    <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
      {value}
    </Text>
  </View>
);

// 统计卡片组件
type StatCardProps = {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
  isDark: boolean;
};

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  bgColor,
  textColor,
  isDark,
}) => {
  // 在暗黑模式下使用半透明的深色背景
  const darkBgColor = isDark ? 'rgba(64, 64, 64, 0.5)' : bgColor;

  return (
    <View
      className="rounded-xl p-4 text-center"
      style={{ backgroundColor: darkBgColor }}
    >
      <Text className="mb-1 text-2xl font-bold" style={{ color: textColor }}>
        {value}
      </Text>
      <Text className="text-sm text-gray-600 dark:text-gray-400">{label}</Text>
    </View>
  );
};

// 维修记录项组件
type RepairRecordItemProps = {
  title: string;
  description: string;
  assignee: string;
  date: string;
  status: string;
  statusColor: string;
  borderColor: string;
  bgColor: string;
  isDark: boolean;
};

const RepairRecordItem: React.FC<RepairRecordItemProps> = ({
  title,
  description,
  assignee,
  date,
  status,
  statusColor,
  borderColor,
  bgColor,
  isDark,
}) => {
  // 在暗黑模式下使用半透明的深色背景
  const darkBgColor = isDark ? 'rgba(64, 64, 64, 0.3)' : bgColor;

  return (
    <View
      className="mb-3 rounded-lg p-3"
      style={{
        backgroundColor: darkBgColor,
        borderLeftWidth: 4,
        borderLeftColor: borderColor,
      }}
    >
      <View className="mb-2 flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="mb-1 text-sm font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400">
            {description}
          </Text>
        </View>
        <View
          className="ml-2 rounded px-2 py-1"
          style={{ backgroundColor: statusColor }}
        >
          <Text className="text-xs text-white">{status}</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <FontAwesome name="user" size={10} color="#9ca3af" />
          <Text className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            {assignee}
          </Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome name="clock-o" size={10} color="#9ca3af" />
          <Text className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
};

// 保养计划项组件
type MaintenancePlanItemProps = {
  title: string;
  date: string;
  daysLeft: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  isDark: boolean;
};

const MaintenancePlanItem: React.FC<MaintenancePlanItemProps> = ({
  title,
  date,
  daysLeft,
  borderColor,
  bgColor,
  textColor,
  isDark,
}) => {
  // 在暗黑模式下使用半透明的深色背景
  const darkBgColor = isDark ? 'rgba(64, 64, 64, 0.3)' : bgColor;

  return (
    <View
      className="mb-3 flex-row items-center rounded-lg p-3"
      style={{
        backgroundColor: darkBgColor,
        borderLeftWidth: 4,
        borderLeftColor: borderColor,
      }}
    >
      <View className="flex-1">
        <Text className="mb-1 text-sm font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </Text>
        <Text className="text-xs text-gray-600 dark:text-gray-400">
          下次保养时间：{date}
        </Text>
      </View>
      <Text className="text-xs font-semibold" style={{ color: textColor }}>
        {daysLeft}
      </Text>
    </View>
  );
};

// 文档项组件
type DocumentItemProps = {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  title: string;
  size: string;
  date: string;
  onPress: () => void;
};

const DocumentItem: React.FC<DocumentItemProps> = ({
  icon,
  iconColor,
  iconBgColor,
  title,
  size,
  date,
  onPress,
}) => (
  <TouchableOpacity
    className="mb-3 flex-row items-center rounded-lg border border-gray-200 p-3 dark:border-neutral-700"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      className="mr-3 size-10 items-center justify-center rounded-lg"
      style={{ backgroundColor: iconBgColor }}
    >
      <FontAwesome name={icon as any} size={18} color={iconColor} />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400">
        {size} · {date}
      </Text>
    </View>
    <FontAwesome name="download" size={16} color="#1890ff" />
  </TouchableOpacity>
);

const EquipmentDetail: React.FC = () => {
  // const router = useRouter();
  // const { id } = useLocalSearchParams();
  const { isDark } = useAppColorScheme();
  const insets = useSafeAreaInsets();
  const local = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<Equipment>({} as Equipment);

  const loadData = async () => {
    const { Success, Data } = await queryDetail<Equipment>("/api/EmEquipment", local.id);
    if (Success) setData(Data)
  };

  useEffect(() => {
    loadData();
  }, []);

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

  // 维修统计数据
  const repairStats = [
    {
      value: '12次',
      label: '累计维修',
      bgColor: '#eff6ff',
      textColor: '#1890ff',
    },
    {
      value: '8次',
      label: '累计保养',
      bgColor: '#f0fdf4',
      textColor: '#52c41a',
    },
    {
      value: '2次',
      label: '本月维修',
      bgColor: '#fff7ed',
      textColor: '#faad14',
    },
    {
      value: '¥8,500',
      label: '维修成本',
      bgColor: '#faf5ff',
      textColor: '#a855f7',
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

  // 文档数据
  const documents = [
    {
      icon: 'file-pdf-o',
      iconColor: '#ef4444',
      iconBgColor: '#fef2f2',
      title: '设备说明书.pdf',
      size: '2.5 MB',
      date: '2023-05-15',
    },
    {
      icon: 'file-word-o',
      iconColor: '#3b82f6',
      iconBgColor: '#eff6ff',
      title: '维护手册.docx',
      size: '1.8 MB',
      date: '2023-05-15',
    },
    {
      icon: 'file-excel-o',
      iconColor: '#22c55e',
      iconBgColor: '#f0fdf4',
      title: '备件清单.xlsx',
      size: '0.3 MB',
      date: '2023-05-15',
    },
  ];

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader
        title="设备详情"
        // onBack={() => router.back()}
        right={
          <View className="flex-row items-center">
            <TouchableOpacity
              className="mr-3"
              onPress={() => console.log('分享')}
            >
              <FontAwesome
                name="share-alt"
                size={20}
                color={isDark ? '#9ca3af' : '#6b7280'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('更多')}>
              <FontAwesome
                name="ellipsis-v"
                size={20}
                color={isDark ? '#9ca3af' : '#6b7280'}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 设备基本信息卡片 */}
        {data && (<LinearGradient
          colors={['#3b82f6', '#2563eb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 16,
            padding: 24,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View className="mb-4 flex-row items-start justify-between">
            <View className="flex-1 flex-row items-start">
              {/*  */}
              {data.ImageId ? (
                <Image
                  source={{ uri: `${Env.API_URL}/api/File/Img/${data.ImageId}` }}
                  className="mr-4 size-16 items-center justify-center rounded-xl bg-white/20"
                  resizeMode="cover"
                />
              ) : (
                <View className="mr-4 size-16 items-center justify-center rounded-xl bg-white/20">
                  <FontAwesome name="server" size={28} color="white" />
                </View>
              )}
              <View className="flex-1">
                <Text className="mb-2 text-2xl font-bold text-white">
                  {data.MachineName}
                </Text>
                <Text className="mb-1 text-sm text-blue-100">
                  {data.MachineNo}
                </Text>
                <Text className="text-sm text-blue-100">位置：{data.Location}</Text>
              </View>
            </View>
            <View className="ml-2 flex-row items-center rounded-full bg-green-500 px-3 py-1.5">
              <FontAwesome name="circle" size={6} color="white" />
              <Text className="ml-1 text-sm font-semibold text-white">
                运行中
              </Text>
            </View>
          </View>

          <View className="mt-6 flex-row">
            <View className="flex-1 items-center">
              <Text className="mb-1 text-3xl font-bold text-white">98%</Text>
              <Text className="text-sm text-blue-100">健康度</Text>
            </View>
            <View className="flex-1 items-center border-x border-white/20">
              <Text className="mb-1 text-3xl font-bold text-white">2,845</Text>
              <Text className="text-sm text-blue-100">运行时长(h)</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="mb-1 text-3xl font-bold text-white">5天</Text>
              <Text className="text-sm text-blue-100">距下次保养</Text>
            </View>
          </View>
        </LinearGradient>)}

        {/* 快捷操作 */}
        <View className="mb-4 flex-row">
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              className="flex-1 items-center rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800"
              style={{ marginRight: index < quickActions.length - 1 ? 12 : 0 }}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <View
                className="mx-auto mb-2 size-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: action.bgColor }}
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

        {/* 设备信息 */}
        {data && (<View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="info-circle" size={18} color="#1890ff" />
            <Text className="ml-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              设备信息
            </Text>
          </View>
          <View>
            <InfoRow label="设备名称" value={data.MachineName} />
            <InfoRow label="设备编号" value={data.MachineNo} />
            <InfoRow label="设备类型" value="加工设备" />
            <InfoRow label="品牌型号" value="发那科 FANUC-18i" />
            <InfoRow label="所属部门" value="生产部" />
            <InfoRow label="安装位置" value={data.Location} />
            <InfoRow label="启用日期" value="2023-05-15" />
            <InfoRow label="责任人" value="张三 (13800138000)" isLast />
          </View>
        </View>
        )}
        {/* 维修统计 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="bar-chart-o" size={18} color="#1890ff" />
            <Text className="ml-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              维修统计1
            </Text>
          </View>
          <View className="flex-row flex-wrap">
            {repairStats.map((stat, index) => (
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
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <FontAwesome name="history" size={18} color="#1890ff" />
              <Text className="ml-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
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
              <FontAwesome name="chevron-right" size={10} color="#1890ff" />
            </TouchableOpacity>
          </View>
          <View>
            {repairRecords.map((record, index) => (
              <RepairRecordItem key={index} {...record} isDark={isDark} />
            ))}
          </View>
        </View>

        {/* 保养计划 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <FontAwesome name="calendar" size={18} color="#1890ff" />
              <Text className="ml-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
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
              <FontAwesome name="chevron-right" size={10} color="#1890ff" />
            </TouchableOpacity>
          </View>
          <View>
            {maintenancePlans.map((plan, index) => (
              <MaintenancePlanItem key={index} {...plan} isDark={isDark} />
            ))}
          </View>
        </View>

        {/* 设备文档 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="folder" size={18} color="#1890ff" />
            <Text className="ml-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              设备文档
            </Text>
          </View>
          <View>
            {documents.map((doc, index) => (
              <DocumentItem
                key={index}
                {...doc}
                onPress={() => console.log('下载', doc.title)}
              />
            ))}
          </View>
        </View>

        {/* 底部空间 */}
        <View className="h-[100px]" />
      </ScrollView>

      {/* 底部固定操作栏 */}
      <View
        className="border-t border-gray-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="flex-row">
          <TouchableOpacity
            className="mr-3 flex-1 items-center rounded-lg bg-primary-500 py-3"
            onPress={() => console.log('编辑设备')}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <FontAwesome name="edit" size={16} color="white" />
              <Text className="ml-2 font-semibold text-white">编辑设备</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center rounded-lg border-2 border-primary-500 py-3"
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
