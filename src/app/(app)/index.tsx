import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { userInfo as user } from '@/lib/user';

// 活动项组件
type ActivityItemProps = {
  icon: string;
  iconBgColor: string;
  title: string;
  subtitle: string;
  time: string;
};

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  iconBgColor,
  title,
  subtitle,
  time,
}) => (
  <View className="mb-4 flex-row items-start">
    <View
      className="mr-3 size-9 items-center justify-center rounded-lg"
      style={{ backgroundColor: iconBgColor }}
    >
      <FontAwesome name={icon as any} size={16} color="white" />
    </View>
    <View className="flex-1">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-sm font-medium text-gray-800 dark:text-gray-100">
          {title}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400">{time}</Text>
      </View>
      <Text className="text-xs text-gray-500 dark:text-gray-400">
        {subtitle}
      </Text>
    </View>
  </View>
);

// 模块项组件
type ModuleItemProps = {
  icon: string;
  bgColor: string;
  title: string;
  onPress?: () => void;
};

const ModuleItem: React.FC<ModuleItemProps> = ({
  icon,
  bgColor,
  title,
  onPress,
}) => (
  <TouchableOpacity className="mb-4 w-[23%] items-center" onPress={onPress}>
    <View
      className="mb-2 size-[50px] items-center justify-center rounded-xl"
      style={{ backgroundColor: bgColor }}
    >
      <FontAwesome name={icon as any} size={24} color="white" />
    </View>
    <Text className="text-center text-xs text-gray-500 dark:text-gray-400">
      {title}
    </Text>
  </TouchableOpacity>
);

const Home: React.FC = () => {
  const userInfo = user.use.userInfo();
  const fetchUserInfo = user.use.fetchUserInfo();
  useEffect(() => {
    if (userInfo == null) {
      fetchUserInfo();
    }
  }, [userInfo, fetchUserInfo]);
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100 dark:bg-neutral-950">
      {/* 顶部导航 */}
      <NavHeader
        title="首页"
        leftShown={false}
        right={
          <TouchableOpacity
            className="relative"
            onPress={() => router.push('/notification')}
          >
            <FontAwesome name="bell" size={20} color="#6b7280" />
            <View className="absolute -right-[5px] -top-[5px] size-4 items-center justify-center rounded-full bg-red-500">
              <Text className="text-[10px] font-bold text-white">3</Text>
            </View>
          </TouchableOpacity>
        }
      />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 欢迎信息 */}
        {userInfo?.WeekName && (
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              你好，{userInfo?.UserName}
            </Text>
            <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              今天是{userInfo?.WeekName}，祝您工作顺利
            </Text>
          </View>
        )}

        {/* 数据概览 */}
        <View className="mb-6 flex-row flex-wrap justify-between">
          <View className="mb-3 w-[48%] rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              今日订单
            </Text>
            <Text className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
              28
            </Text>
            <Text className="mt-1 text-xs text-green-500">↑ 12.5%</Text>
          </View>
          <View className="mb-3 w-[48%] rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              生产任务
            </Text>
            <Text className="mt-2 text-2xl font-bold text-orange-500 dark:text-orange-400">
              15
            </Text>
            <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              进行中: 8
            </Text>
          </View>
          <View className="mb-3 w-[48%] rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              库存预警
            </Text>
            <Text className="mt-2 text-2xl font-bold text-red-500 dark:text-red-400">
              3
            </Text>
            <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              点击查看详情
            </Text>
          </View>
          <View className="mb-3 w-[48%] rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              质检合格率
            </Text>
            <Text className="mt-2 text-2xl font-bold text-green-500 dark:text-green-400">
              98.5%
            </Text>
            <Text className="mt-1 text-xs text-green-500">↑ 1.2%</Text>
          </View>
        </View>

        {/* 功能模块 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <Text className="mb-4 text-lg font-semibold dark:text-gray-100">
            功能模块
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <ModuleItem
              icon="cube"
              bgColor="#3b82f6"
              title="物料管理"
              onPress={() => router.push('/material')}
            />
            <ModuleItem
              icon="cogs"
              bgColor="#3b82f6"
              title="生产管理"
              onPress={() => router.push('/production')}
            />
            <ModuleItem
              icon="boxes"
              bgColor="#22c55e"
              title="库存管理"
              onPress={() => router.push('/inventory')}
            />
            <ModuleItem
              icon="clipboard-list"
              bgColor="#f97316"
              title="订单管理"
              onPress={() => router.push('/order')}
            />
            <ModuleItem
              icon="check-circle"
              bgColor="#a855f7"
              title="质量控制"
              onPress={() => router.push('/quality')}
            />
            <ModuleItem
              icon="chart-line"
              bgColor="#ef4444"
              title="数据分析"
              onPress={() => router.push('/analytics')}
            />
            <ModuleItem
              icon="users"
              bgColor="#eab308"
              title="人员管理"
              onPress={() => { }}
            />
            <ModuleItem
              icon="truck"
              bgColor="#6366f1"
              title="物流管理"
              onPress={() => { }}
            />
            {/* <ModuleItem
              icon="truck"
              bgColor="#7423de"
              title="工序管理"
              onPress={() => router.push('/process')}
            />
            <ModuleItem
              icon="truck"
              bgColor="#7423de"
              title="设备管理"
              onPress={() => router.push('/equipment')}
            /> */}
            <ModuleItem
              icon="ellipsis-h"
              bgColor="#6b7280"
              title="更多功能"
              onPress={() => { }}
            />
          </View>
        </View>

        {/* 最近活动 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold dark:text-gray-100">
              最近活动
            </Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600 dark:text-blue-400">
                查看全部
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <ActivityItem
              icon="clipboard-check"
              iconBgColor="#3b82f6"
              title="订单 #2023112801 已完成"
              subtitle="客户：上海某电子有限公司"
              time="10:30"
            />
            <ActivityItem
              icon="exclamation-triangle"
              iconBgColor="#ef4444"
              title="原材料库存不足预警"
              subtitle="PCB板库存低于安全库存"
              time="09:15"
            />
            <ActivityItem
              icon="tasks"
              iconBgColor="#22c55e"
              title="生产任务 #PT20231128-05 已开始"
              subtitle="负责人：李工程师"
              time="昨天"
            />
          </View>
        </View>

        {/* 底部空间 - 为底部导航留出空间 */}
        <View className="h-[70px]" />
      </ScrollView>
    </View>
  );
};

export default Home;
