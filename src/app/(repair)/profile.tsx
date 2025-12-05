import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum, type IconGroup } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

import LogoutConfirmModal from '../settings/components/logout-confirm-modal';

// 统计项组件
type StatItemProps = {
  value: string;
  label: string;
};

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <View className="items-center">
    <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100">
      {value}
    </Text>
    <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
      {label}
    </Text>
  </View>
);

// 进度条组件
type ProgressBarProps = {
  label: string;
  current: number;
  total: number;
  color: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  current,
  total,
  color,
}) => {
  const percentage = (current / total) * 100;
  return (
    <View className="mb-3">
      <View className="mb-1 flex-row justify-between">
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          {label}
        </Text>
        <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {current}/{total}
        </Text>
      </View>
      <View className="h-2 w-full rounded-full bg-gray-200 dark:bg-neutral-700">
        <View
          className="h-2 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </View>
    </View>
  );
};

// 待办任务组件
type TodoTaskItemProps = {
  icon: string;
  title: string;
  time: string;
  status: string;
  bgColor: string;
  iconBgColor: string;
  statusBgColor: string;
};

const TodoTaskItem: React.FC<TodoTaskItemProps> = ({
  icon,
  title,
  time,
  status,
  bgColor,
  iconBgColor,
  statusBgColor,
}) => (
  <View
    className="mb-3 flex-row items-center justify-between rounded-lg p-3"
    style={{ backgroundColor: bgColor }}
  >
    <View className="flex-row items-center">
      <View
        className="mr-3 size-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: iconBgColor }}
      >
        <FontAwesome name={icon as any} size={16} color="white" />
      </View>
      <View>
        <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400">{time}</Text>
      </View>
    </View>
    <View
      className="rounded-full px-2 py-1"
      style={{ backgroundColor: statusBgColor }}
    >
      <Text className="text-xs text-white">{status}</Text>
    </View>
  </View>
);

// 功能网格菜单项
type MenuGridItemProps = {
  icon: string;
  iconColor: string;
  bgColor: string;
  label: string;
  onPress?: () => void;
};

const MenuGridItem: React.FC<MenuGridItemProps> = ({
  icon,
  iconColor,
  bgColor,
  label,
  onPress,
}) => (
  <TouchableOpacity
    className="items-center"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      className="mx-auto mb-2 size-12 items-center justify-center rounded-xl"
      style={{ backgroundColor: bgColor }}
    >
      <FontAwesome name={icon as any} size={20} color={iconColor} />
    </View>
    <Text className="text-xs text-gray-600 dark:text-gray-400">{label}</Text>
  </TouchableOpacity>
);

// 菜单列表项
type MenuListItemProps = {
  icon: string;
  iconGroup?: IconGroup;
  iconColor: string;
  bgColor: string;
  label: string;
  showBadge?: boolean;
  badgeCount?: number;
  textColor?: string;
  onPress?: () => void;
  isLast?: boolean;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  icon,
  iconColor,
  bgColor,
  label,
  showBadge = false,
  badgeCount,
  textColor = '#374151',
  onPress,
  isLast = false,
  iconGroup,
}) => (
  <TouchableOpacity
    className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-gray-100 dark:border-neutral-700' : ''}`}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="flex-row items-center">
      <View
        className="mr-3 size-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: bgColor }}
      >
        <FontAwesome
          name={icon as any}
          size={16}
          color={iconColor}
          group={iconGroup}
        />
      </View>
      <Text className="dark:text-gray-200" style={{ color: textColor }}>
        {label}
      </Text>
    </View>
    <View className="flex-row items-center">
      {showBadge && badgeCount && (
        <View className="mr-2 rounded-full bg-red-500 px-2 py-1">
          <Text className="text-xs font-bold text-white">{badgeCount}</Text>
        </View>
      )}
      <FontAwesome name="chevron-right" size={14} color="#9ca3af" />
    </View>
  </TouchableOpacity>
);

const Profile: React.FC = () => {
  const router = useRouter();
  const { isDark } = useAppColorScheme();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
      {/* 顶部导航 */}
      <NavHeader
        title="我的"
        leftShown={false}
        right={
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/settings')}
          >
            <FontAwesome
              name="cog"
              size={20}
              color={isDark ? '#9ca3af' : '#6b7280'}
            />
          </TouchableOpacity>
        }
      />

      <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* 顶部个人信息卡片 */}
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingHorizontal: 24,
              paddingTop: 24,
              paddingBottom: 80,
            }}
          >
            <View className="flex-row items-center">
              <View className="mr-4 size-20 items-center justify-center rounded-full bg-white shadow-lg">
                <FontAwesome name="user" size={32} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-2xl font-bold text-white">
                  张工程师
                </Text>
                <Text className="text-sm text-blue-100">工号：EMP20231101</Text>
                <Text className="text-sm text-blue-100">部门：设备维修部</Text>
              </View>
            </View>
          </LinearGradient>

          {/* 统计卡片 */}
          <View className="px-4" style={{ marginTop: -48 }}>
            <View className="rounded-2xl bg-white p-4 shadow-lg dark:bg-neutral-800">
              <View className="flex-row justify-around">
                <StatItem value="156" label="维修任务" />
                <StatItem value="89" label="保养任务" />
                <StatItem value="234" label="点检次数" />
                <StatItem value="98%" label="完成率" />
              </View>
            </View>
          </View>

          {/* 本月工作统计 */}
          <View className="mb-4 px-4 pt-4">
            <View className="rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="font-bold text-gray-800 dark:text-gray-100">
                  本月工作统计
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  2024年11月
                </Text>
              </View>
              <ProgressBar
                label="维修工单"
                current={18}
                total={20}
                color="#3b82f6"
              />
              <ProgressBar
                label="保养任务"
                current={12}
                total={15}
                color="#22c55e"
              />
              <ProgressBar
                label="点检巡检"
                current={25}
                total={28}
                color="#a855f7"
              />
            </View>
          </View>

          {/* 我的待办 */}
          <View className="mb-4 px-4">
            <View className="rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="font-bold text-gray-800 dark:text-gray-100">
                  我的待办
                </Text>
                <TouchableOpacity onPress={() => router.push('/(repair)')}>
                  <View className="flex-row items-center">
                    <Text className="text-xs text-blue-500 dark:text-blue-400">
                      查看全部{' '}
                    </Text>
                    <FontAwesome
                      name="chevron-right"
                      size={10}
                      color="#3b82f6"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <TodoTaskItem
                icon="wrench"
                title="设备#001紧急维修"
                time="30分钟前"
                status="紧急"
                bgColor="#fef2f2"
                iconBgColor="#ef4444"
                statusBgColor="#ef4444"
              />
              <TodoTaskItem
                icon="clipboard-check"
                title="生产线A保养计划"
                time="明天到期"
                status="待处理"
                bgColor="#fff7ed"
                iconBgColor="#f97316"
                statusBgColor="#f97316"
              />
              <TodoTaskItem
                icon="search"
                title="车间日常巡检"
                time="今天 14:00"
                status="进行中"
                bgColor="#eff6ff"
                iconBgColor="#3b82f6"
                statusBgColor="#3b82f6"
              />
            </View>
          </View>

          {/* 功能菜单 */}
          <View className="mb-4 px-4">
            <View className="rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800">
              <View className="flex-row justify-around">
                <MenuGridItem
                  icon="wrench"
                  iconColor="#3b82f6"
                  bgColor="#eff6ff"
                  label="我的维修"
                />
                <MenuGridItem
                  icon="clipboard-check"
                  iconColor="#22c55e"
                  bgColor="#f0fdf4"
                  label="我的保养"
                />
                <MenuGridItem
                  icon="tasks"
                  iconColor="#a855f7"
                  bgColor="#faf5ff"
                  label="我的点检"
                />
                <MenuGridItem
                  icon="check"
                  iconColor="#f97316"
                  bgColor="#fff7ed"
                  label="我的巡检"
                />
              </View>
            </View>
          </View>

          {/* 个人信息 */}
          <View className="mb-4 px-4">
            <View className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-neutral-800">
              <MenuListItem
                icon="user"
                iconColor="#3b82f6"
                bgColor="#eff6ff"
                label="个人信息"
              />
              <MenuListItem
                icon="certificate"
                iconColor="#22c55e"
                bgColor="#f0fdf4"
                label="我的资质"
              />
              <MenuListItem
                icon="list-ol"
                iconColor="#a855f7"
                bgColor="#faf5ff"
                label="工作记录"
              />
              <MenuListItem
                icon="chart-line"
                iconColor="#f97316"
                bgColor="#fff7ed"
                label="绩效考核"
                isLast
              />
            </View>
          </View>

          {/* 其他功能 */}
          <View className="mb-4 px-4">
            <View className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-neutral-800">
              <MenuListItem
                icon="bell"
                iconColor="#ef4444"
                bgColor="#fef2f2"
                label="消息通知"
                showBadge
                badgeCount={5}
                onPress={() => router.push('/notification')}
              />
              <MenuListItem
                icon="cog"
                iconColor="#6b7280"
                bgColor="#f3f4f6"
                label="系统设置"
                onPress={() => router.push('/settings')}
              />
              <MenuListItem
                icon="question-circle"
                iconColor="#3b82f6"
                bgColor="#eff6ff"
                label="帮助与反馈"
              />
              <MenuListItem
                icon="log-out"
                iconGroup={GroupEnum.Feather}
                iconColor="#ef4444"
                bgColor="#fef2f2"
                label="退出登录"
                textColor="#dc2626"
                onPress={() => setShowLogoutConfirm(true)}
                isLast
              />
            </View>
          </View>

          {/* 底部空间 - 为底部导航留出空间 */}
          <View className="h-[70px]" />
        </ScrollView>

        {/* 退出确认弹窗 */}
        <LogoutConfirmModal
          visible={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
        />
      </View>
    </>
  );
};

export default Profile;
