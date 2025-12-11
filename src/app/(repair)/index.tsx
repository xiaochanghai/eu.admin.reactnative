import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';
import { userInfo as user } from '@/lib/user';

// 数据统计卡片组件
type StatCardProps = {
  icon: string;
  label: string;
  value: string;
  subtitle: string;
  gradientColors: [string, string, ...string[]];
};

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subtitle,
  gradientColors,
}) => (
  <View className="mb-3 w-[48%]">
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View className="mb-2 flex-row items-center justify-between">
        <FontAwesome
          name={icon as any}
          size={24}
          color="rgba(255,255,255,0.8)"
        />
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <Text className="text-xs text-white">{label}</Text>
        </View>
      </View>
      <Text className="mb-1 text-3xl font-bold text-white">{value}</Text>
      <Text style={{ fontSize: 14, color: 'white', opacity: 0.9 }}>
        {subtitle}
      </Text>
    </LinearGradient>
  </View>
);

// 快捷入口组件
type QuickAccessItemProps = {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  onPress?: () => void;
};

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({
  icon,
  iconColor,
  bgColor,
  title,
  onPress,
}) => (
  <TouchableOpacity
    className="w-1/4 items-center p-3"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      className="mb-2 size-14 items-center justify-center rounded-xl"
      style={{ backgroundColor: bgColor }}
    >
      <FontAwesome name={icon as any} size={24} color={iconColor} />
    </View>
    <Text className="text-center text-sm text-gray-700 dark:text-gray-200">
      {title}
    </Text>
  </TouchableOpacity>
);

// 待办任务组件
type TodoItemProps = {
  icon: string;
  title: string;
  deadline: string;
  status: string;
  statusColor: string;
  bgColor: string;
  borderColor: string;
  iconBgColor: string;
};

const TodoItem: React.FC<TodoItemProps> = ({
  icon,
  title,
  deadline,
  status,
  statusColor,
  bgColor,
  borderColor,
  iconBgColor,
}) => (
  <View
    className="mb-3 flex-row items-center rounded-lg p-3"
    style={{
      backgroundColor: bgColor,
      borderLeftWidth: 4,
      borderLeftColor: borderColor,
    }}
  >
    <View
      className="size-10 items-center justify-center rounded-lg"
      style={{ backgroundColor: iconBgColor }}
    >
      <FontAwesome name={icon as any} size={16} color="white" />
    </View>
    <View className="ml-3 flex-1">
      <View className="flex-row items-center justify-between">
        <Text
          className="flex-1 text-sm font-semibold text-gray-800 dark:text-gray-100"
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          className="ml-2 text-xs font-semibold"
          style={{ color: statusColor }}
        >
          {status}
        </Text>
      </View>
      <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {deadline}
      </Text>
    </View>
  </View>
);

// 动态条目组件
type ActivityItemProps = {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  userName: string;
  action: string;
  detail: string;
};

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  iconColor,
  iconBgColor,
  userName,
  action,
  detail,
}) => (
  <View className="mb-4 flex-row items-start">
    <View
      className="size-8 items-center justify-center rounded-full"
      style={{ backgroundColor: iconBgColor }}
    >
      <FontAwesome name={icon as any} size={14} color={iconColor} />
    </View>
    <View className="ml-3 flex-1">
      <Text className="text-sm text-gray-700 dark:text-gray-200">
        <Text className="font-semibold">{userName}</Text> {action}
      </Text>
      <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {detail}
      </Text>
    </View>
  </View>
);

const RepairHome: React.FC = () => {
  const userInfo = user.use.userInfo();
  const fetchUserInfo = user.use.fetchUserInfo();
  const { isDark } = useAppColorScheme();
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader
        title="首页"
        leftShown={false}
        right={
          <TouchableOpacity
            className="relative"
            onPress={() => router.push('/notification')}
          >
            <FontAwesome
              name="bell"
              size={20}
              color={isDark ? '#9ca3af' : '#6b7280'}
            />
            <View className="absolute -right-1 -top-1 size-5 items-center justify-center rounded-full bg-red-500">
              <Text className="text-[10px] font-bold text-white">3</Text>
            </View>
          </TouchableOpacity>
        }
      />

      <ScrollView
        className="flex-1 px-4 py-6"
        showsVerticalScrollIndicator={false}
      >
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
        {/* 数据概览卡片 */}
        <View className="mb-6 flex-row flex-wrap justify-between">
          <StatCard
            icon="database"
            label="总数"
            value="156"
            subtitle="设备总数"
            gradientColors={['#3b82f6', '#2563eb']}
          />
          <StatCard
            icon="check-circle"
            label="正常"
            value="142"
            subtitle="运行正常"
            gradientColors={['#22c55e', '#16a34a']}
          />
          <StatCard
            icon="wrench"
            label="维修中"
            value="8"
            subtitle="维修中"
            gradientColors={['#f97316', '#ea580c']}
          />
          <StatCard
            icon="exclamation-triangle"
            label="异常"
            value="6"
            subtitle="故障设备"
            gradientColors={['#ef4444', '#dc2626']}
          />
        </View>

        {/* 快捷入口 */}
        <View className="mb-6 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="th-large" size={18} color="#1890ff" />
            <Text className="ml-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              快捷入口
            </Text>
          </View>
          <View className="flex-row flex-wrap">
            <QuickAccessItem
              icon="database"
              iconColor="#1890ff"
              bgColor="#eff6ff"
              title="设备管理"
              onPress={() => router.push('/equipment')}
            />
            <QuickAccessItem
              icon="wrench"
              iconColor="#f97316"
              bgColor="#fff7ed"
              title="设备维修"
              onPress={() => router.push('/repair-order')}
            />
            <QuickAccessItem
              icon="cog"
              iconColor="#22c55e"
              bgColor="#f0fdf4"
              title="设备保养"
              onPress={() => { }}
            />
            <QuickAccessItem
              icon="clipboard-check"
              iconColor="#a855f7"
              bgColor="#faf5ff"
              title="点检"
              onPress={() => { }}
            />
            <QuickAccessItem
              icon="check"
              iconColor="#6366f1"
              bgColor="#eef2ff"
              title="巡检"
              onPress={() => { }}
            />
            <QuickAccessItem
              icon="chart-line"
              iconColor="#ec4899"
              bgColor="#fdf2f8"
              title="数据分析"
              onPress={() => router.push('/analytics')}
            />
            <QuickAccessItem
              icon="qrcode"
              iconColor="#faad14"
              bgColor="#fefce8"
              title="扫码"
              onPress={() => { }}
            />
            <QuickAccessItem
              icon="ellipsis-h"
              iconColor="#6b7280"
              bgColor="#f3f4f6"
              title="更多"
              onPress={() => { }}
            />
          </View>
        </View>

        {/* 待办任务 */}
        <View className="mb-6 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <FontAwesome name="tasks" size={18} color="#1890ff" />
              <Text className="ml-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
                待办任务
              </Text>
              <View className="ml-2 rounded-full bg-red-500 px-2 py-1">
                <Text className="text-xs font-bold text-white">5</Text>
              </View>
            </View>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text className="text-sm text-blue-600 dark:text-blue-400">
                  查看全部
                </Text>
                <FontAwesome
                  name="chevron-right"
                  size={12}
                  color="#2563eb"
                  style={{ marginLeft: 4 }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <TodoItem
            icon="exclamation"
            title="紧急维修：生产线A-03设备故障"
            deadline="截止时间：今天 14:00"
            status="紧急"
            statusColor="#f5222d"
            bgColor="#fef2f2"
            borderColor="#f5222d"
            iconBgColor="#f5222d"
          />
          <TodoItem
            icon="clock-o"
            title="保养提醒：空压机月度保养"
            deadline="截止时间：明天 17:00"
            status="待处理"
            statusColor="#faad14"
            bgColor="#fff7ed"
            borderColor="#faad14"
            iconBgColor="#faad14"
          />
          <TodoItem
            icon="clipboard-check"
            title="今日巡检：车间设备巡检"
            deadline="已完成 8/15 项"
            status="进行中"
            statusColor="#1890ff"
            bgColor="#eff6ff"
            borderColor="#1890ff"
            iconBgColor="#1890ff"
          />
        </View>

        {/* 最近动态 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <FontAwesome name="history" size={18} color="#1890ff" />
              <Text className="ml-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
                最近动态
              </Text>
            </View>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text className="text-sm text-blue-600 dark:text-blue-400">
                  查看全部
                </Text>
                <FontAwesome
                  name="chevron-right"
                  size={12}
                  color="#2563eb"
                  style={{ marginLeft: 4 }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <ActivityItem
            icon="check"
            iconColor="#22c55e"
            iconBgColor="rgba(34, 197, 94, 0.1)"
            userName="张三"
            action="完成了维修工单"
            detail="生产线B-05设备维修 · 5分钟前"
          />
          <ActivityItem
            icon="plus"
            iconColor="#1890ff"
            iconBgColor="rgba(24, 144, 255, 0.1)"
            userName="李四"
            action="新增了设备"
            detail="数控机床CNC-08 · 1小时前"
          />
          <ActivityItem
            icon="wrench"
            iconColor="#faad14"
            iconBgColor="rgba(250, 173, 20, 0.1)"
            userName="王五"
            action="创建了维修工单"
            detail="注塑机IM-12异常 · 2小时前"
          />
        </View>

        {/* 底部空间 - 为底部导航留出空间 */}
        <View className="h-[70px]" />
      </ScrollView>
    </View>
  );
};

export default RepairHome;
