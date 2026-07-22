import { Env } from '@env';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { NavHeader, ScrollView, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { userInfo as user } from '@/lib/user';

import LogoutConfirmModal from '../settings/components/logout-confirm-modal';
import SettingItem from '../settings/components/setting-item';

/**
 * 个人资料页面
 *
 * 展示用户信息、工作统计和功能菜单，包括：
 * 1. 用户信息卡片：头像、姓名、角色、徽章和统计数据
 * 2. 功能菜单：个人资料、账号安全、消息通知等
 * 3. 工作统计：任务完成率、计划执行率、质检合格率
 * 4. 退出登录按钮
 */
export default function Settings() {
  const userInfo = user.use.userInfo();
  let avatarFileUrl = 'https://randomuser.me/api/portraits/men/32.jpg';
  if (userInfo?.AvatarFileId != null)
    avatarFileUrl = Env.API_URL + '/api/File/Img/' + userInfo?.AvatarFileId;
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  return (
    <>
      <View className="flex-1 bg-gray-100 dark:bg-neutral-950">
        <NavHeader
          title="个人中心"
          leftShown={false}
          right={
            <Link href={`/settings`}>
              <View className="size-10 items-center justify-center rounded-full">
                <FontAwesome name="cog" size={20} color="#6b7280" />
              </View>
            </Link>
          }
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 用户信息卡片 */}
          <View className="rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: avatarFileUrl,
                }}
                className="mr-4 size-[72px] rounded-2xl border border-gray-100 dark:border-neutral-700"
              />
              <View className="flex-1">
                <Text className="text-xl font-bold dark:text-gray-100">
                  {userInfo?.UserName || '未设置用户名'}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  生产部门 · 经理
                </Text>
                <View className="mt-2 flex-row">
                  <View className="dark:bg-primary-950/40 rounded-full bg-primary-50 px-3 py-1">
                    <Text className="text-xs font-medium text-primary-700 dark:text-primary-300">
                      管理员
                    </Text>
                  </View>
                  <View className="ml-2 rounded-full bg-emerald-50 px-3 py-1 dark:bg-emerald-900/30">
                    <Text className="text-xs font-medium text-green-800 dark:text-green-300">
                      已认证
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="mt-5 flex-row border-t border-gray-100 pt-4 dark:border-neutral-700">
              <View className="flex-1 items-center">
                <Text className="text-lg font-bold dark:text-gray-100">28</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  待处理任务
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-lg font-bold dark:text-gray-100">15</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  今日完成
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-lg font-bold dark:text-gray-100">
                  98%
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  任务完成率
                </Text>
              </View>
            </View>
          </View>

          {/* 功能菜单 */}
          <View className="mt-3 rounded-2xl border border-gray-200/80 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            {Env.APP_ENV === 'development' && (
              <SettingItem
                icon="user-edit"
                iconBgColor="#3b82f6"
                title={'测试设备信息'}
                subtitle="查看设备和系统信息"
                hasNavigation={true}
                onPress={() => router.push('/test/device')}
              />
            )}
            <SettingItem
              icon="user-edit"
              iconBgColor="#3b82f6"
              title="个人资料"
              subtitle="修改个人信息和联系方式"
              hasNavigation={true}
            />
            <SettingItem
              icon="shield-alt"
              iconBgColor="#22c55e"
              title="账号安全"
              subtitle="修改密码和安全设置"
              hasNavigation={true}
              onPress={() => router.push('/test/datepicker')}
            />
            <SettingItem
              icon="bell"
              iconBgColor="#a855f7"
              title="消息通知"
              subtitle="设置接收的通知类型"
              hasNavigation={true}
              onPress={() => router.push('/notification')}
            />
            <SettingItem
              icon="headset"
              iconBgColor="#f59e0b"
              title="在线客服"
              subtitle="获取帮助和支持"
              hasNavigation={true}
              onPress={() => router.push('/settings/pdf')}
              isLast={true}
            />
          </View>

          {/* 工作统计 */}
          <View className="mt-3 rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <Text className="mb-4 text-base font-bold dark:text-gray-100">
              工作统计
            </Text>
            <View className="mt-1">
              <ProgressBar label="本月任务完成率" value={85} color="#543EF8" />
              <ProgressBar label="生产计划执行率" value={92} color="#543EF8" />
              <ProgressBar label="质检合格率" value={98} color="#543EF8" />
            </View>
          </View>

          {/* 退出登录按钮 */}
          <TouchableOpacity
            className="mt-3 min-h-[48px] items-center justify-center rounded-xl border border-red-200 bg-white dark:border-red-900/50 dark:bg-neutral-900"
            onPress={() => setShowLogoutConfirm(true)}
          >
            <Text
              className="font-medium text-red-600 dark:text-red-400"
              tx="settings.logout"
            />
          </TouchableOpacity>
        </ScrollView>

        {/* 退出确认弹窗 */}
        <LogoutConfirmModal
          visible={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
        />
      </View>
    </>
  );
}

/**
 * 进度条组件
 *
 * @param label - 进度条标签
 * @param value - 进度值（0-100）
 * @param color - 进度条颜色
 */
type ProgressBarProps = {
  label: string;
  value: number;
  color: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, color }) => (
  <View className="mb-4">
    <View className="mb-1.5 flex-row justify-between">
      <Text className="text-sm dark:text-gray-100">{label}</Text>
      <Text className="text-sm font-medium dark:text-gray-100">{value}%</Text>
    </View>
    <View className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-neutral-800">
      <View
        className="h-full rounded-full"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </View>
  </View>
);
