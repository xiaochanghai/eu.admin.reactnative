import { LinearGradient } from 'expo-linear-gradient';
// import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';

// 信息行组件
type InfoRowProps = {
  label: string;
  value: string;
  isLast?: boolean;
};

const InfoRow: React.FC<InfoRowProps> = ({ label, value, isLast = false }) => (
  <View
    className={`flex-row justify-between py-2 ${!isLast ? 'border-b border-gray-100 dark:border-neutral-700' : ''}`}
  >
    <Text className="text-sm text-gray-500 dark:text-gray-400">{label}</Text>
    <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
      {value}
    </Text>
  </View>
);

// 进度项组件
type ProgressItemProps = {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  time?: string;
  description?: string;
  isCompleted: boolean;
};

const ProgressItem: React.FC<ProgressItemProps> = ({
  icon,
  iconColor,
  bgColor,
  title,
  time,
  description,
  isCompleted,
}) => (
  <View className="mb-4 flex-row items-start">
    <View
      className="size-8 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: bgColor }}
    >
      <FontAwesome
        name={icon as any}
        size={12}
        color={isCompleted ? 'white' : iconColor}
      />
    </View>
    <View className="ml-3 flex-1">
      <View className="mb-1 flex-row items-center justify-between">
        <Text
          className={`text-sm font-semibold ${isCompleted ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}`}
        >
          {title}
        </Text>
        {time && (
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {time}
          </Text>
        )}
      </View>
      {description && (
        <Text className="text-xs text-gray-600 dark:text-gray-400">
          {description}
        </Text>
      )}
    </View>
  </View>
);

// 备件项组件
type SparePartItemProps = {
  name: string;
  model: string;
  quantity: number;
  price: string;
};

const SparePartItem: React.FC<SparePartItemProps> = ({
  name,
  model,
  quantity,
  price,
}) => (
  <View className="mb-3 flex-row items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-neutral-700/50">
    <View>
      <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {name}
      </Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400">
        型号：{model}
      </Text>
    </View>
    <View className="items-end">
      <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        ×{quantity}
      </Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400">{price}</Text>
    </View>
  </View>
);

const RepairOrderDetail: React.FC = () => {
  // const router = useRouter();
  // const { id } = useLocalSearchParams();
  const { isDark } = useAppColorScheme();
  const insets = useSafeAreaInsets();

  // 维修进度数据
  const progressSteps = [
    {
      icon: 'check',
      iconColor: '#52c41a',
      bgColor: '#52c41a',
      title: '工单创建',
      time: '11-11 10:00',
      description: '张三 创建维修工单',
      isCompleted: true,
    },
    {
      icon: 'check',
      iconColor: '#52c41a',
      bgColor: '#52c41a',
      title: '工单分配',
      time: '11-11 10:15',
      description: '系统自动分配给李四',
      isCompleted: true,
    },
    {
      icon: 'wrench',
      iconColor: '#faad14',
      bgColor: '#faad14',
      title: '维修中',
      time: '11-11 10:30',
      description: '李四 开始维修，已申请备件',
      isCompleted: true,
    },
    {
      icon: 'clock-o',
      iconColor: '#9ca3af',
      bgColor: '#d1d5db',
      title: '维修完成',
      isCompleted: false,
    },
    {
      icon: 'user-circle',
      iconColor: '#9ca3af',
      bgColor: '#d1d5db',
      title: '验收确认',
      isCompleted: false,
    },
  ];

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

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader
        title="维修详情"
        // onBack={() => router.back()}
        right={
          <TouchableOpacity onPress={() => console.log('更多')}>
            <FontAwesome
              name="ellipsis-v"
              size={20}
              color={isDark ? '#9ca3af' : '#6b7280'}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 工单状态卡片 */}
        <LinearGradient
          colors={['#ef4444', '#dc2626']}
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
          <View className="mb-4">
            <View className="mb-2 flex-row items-center">
              <View className="rounded-full bg-white/20 px-3 py-1">
                <Text className="text-sm font-semibold text-white">紧急</Text>
              </View>
            </View>
            <Text className="mb-1 text-xl font-bold text-white">
              生产线A-03设备故障
            </Text>
            <Text className="text-sm text-red-100">工单号：WO-2024-0315</Text>
          </View>

          <View className="mt-4 flex-row border-t border-white/20 pt-4">
            <View className="flex-1 items-center">
              <Text className="mb-1 text-sm text-red-100">创建时间</Text>
              <Text className="text-base font-semibold text-white">
                11-11 10:00
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="mb-1 text-sm text-red-100">截止时间</Text>
              <Text className="text-base font-semibold text-white">
                今天 14:00
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="mb-1 text-sm text-red-100">剩余时间</Text>
              <Text className="text-base font-semibold text-white">2小时</Text>
            </View>
          </View>
        </LinearGradient>

        {/* 设备信息 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="server" size={18} color="#1890ff" />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              设备信息
            </Text>
          </View>
          <View>
            <InfoRow label="设备名称" value="数控机床 CNC-03" />
            <InfoRow label="设备编号" value="EQ-2024-003" />
            <InfoRow label="安装位置" value="A车间-3号线" isLast />
          </View>
        </View>

        {/* 故障信息 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
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
                  主轴无法启动，电机发出异常响声，检查发现主轴轴承磨损严重，需要紧急更换。
                </Text>
              </View>
            </View>
            <View className="mb-3">
              <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                故障类型
              </Text>
              <View className="self-start rounded-full bg-red-50 px-3 py-1 dark:bg-red-950/50">
                <Text className="text-sm text-red-500">机械故障</Text>
              </View>
            </View>
            <View className="mb-3">
              <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                影响程度
              </Text>
              <View className="self-start rounded-full bg-red-500 px-3 py-1">
                <Text className="text-sm text-white">严重 - 停机</Text>
              </View>
            </View>
            <View>
              <Text className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                故障图片
              </Text>
              <View className="flex-row gap-2">
                <View className="aspect-square w-[30%] items-center justify-center rounded-lg bg-gray-200 dark:bg-neutral-700">
                  <FontAwesome name="image" size={24} color="#9ca3af" />
                </View>
                <View className="aspect-square w-[30%] items-center justify-center rounded-lg bg-gray-200 dark:bg-neutral-700">
                  <FontAwesome name="image" size={24} color="#9ca3af" />
                </View>
                <View className="aspect-square w-[30%] items-center justify-center rounded-lg bg-gray-200 dark:bg-neutral-700">
                  <FontAwesome name="plus" size={24} color="#9ca3af" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 维修进度 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="tasks" size={18} color="#1890ff" />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              维修进度
            </Text>
          </View>
          <View>
            {progressSteps.map((step, index) => (
              <ProgressItem key={index} {...step} />
            ))}
          </View>
        </View>

        {/* 维修人员 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="user-circle" size={18} color="#1890ff" />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              维修人员
            </Text>
          </View>
          <View className="flex-row items-center rounded-lg bg-gray-50 p-3 dark:bg-neutral-700/50">
            <Image
              source={{
                uri: 'https://ui-avatars.com/api/?name=LS&background=1890ff&color=fff',
              }}
              style={{ width: 48, height: 48, borderRadius: 24 }}
            />
            <View className="ml-3 flex-1">
              <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                李四
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                高级维修技师 · 138****8888
              </Text>
            </View>
            <TouchableOpacity onPress={() => console.log('拨打电话')}>
              <FontAwesome name="phone" size={20} color="#1890ff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 备件使用 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="cube" size={18} color="#1890ff" />
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
              <Text className="text-base font-bold text-primary-500">¥700</Text>
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
            className="mr-3 flex-1 items-center rounded-lg border-2 border-primary-500 py-3"
            onPress={() => console.log('添加备注')}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <FontAwesome name="comment" size={16} color="#1890ff" />
              <Text className="ml-2 font-semibold text-primary-500 dark:text-blue-400">
                备注
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center rounded-lg bg-primary-500 py-3"
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

export default RepairOrderDetail;
