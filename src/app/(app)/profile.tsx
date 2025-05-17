import { Env } from '@env';
import { Link, useRouter } from 'expo-router';
import { Image, SafeAreaView, TouchableOpacity } from 'react-native';

import { NavHeader, ScrollView, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAuth } from '@/lib';
import { userInfo as user } from '@/lib/user';

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
  const signOut = useAuth.use.signOut();
  const userInfo = user.use.userInfo();
  let avatarFileUrl = 'https://randomuser.me/api/portraits/men/32.jpg';
  if (userInfo?.AvatarFileId != null)
    avatarFileUrl = Env.API_URL + '/api/File/Img/' + userInfo?.AvatarFileId;
  // console.log(avatarFileUrl);
  // const { colorScheme } = useColorScheme();
  // const iconColor =
  //   colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  const router = useRouter();

  return (
    <>
      {/* <FocusAwareStatusBar /> */}
      <SafeAreaView className="flex-1 bg-gray-100">
        {/* 顶部导航 */}
        <NavHeader
          title="我的"
          leftShown={false}
          right={
            <Link href={`/settings`}>
              <FontAwesome name="cog" size={22} color="#666" />
            </Link>
          }
        />
        <ScrollView className="flex-1 p-4 pb-[86px]">
          {/* 用户信息卡片 */}
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: avatarFileUrl,
                }}
                className="mr-4 size-16 rounded-full"
              />
              <View className="flex-1">
                <Text className="text-xl font-bold">{userInfo?.UserName}</Text>
                <Text className="text-sm text-gray-500">生产部门 · 经理</Text>
                <View className="mt-1 flex-row">
                  <View className="rounded-xl bg-blue-100 px-2 py-0.5">
                    <Text className="text-xs text-blue-800">管理员</Text>
                  </View>
                  <View className="ml-2 rounded-xl bg-green-100 px-2 py-0.5">
                    <Text className="text-xs text-green-800">已认证</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="mt-4 flex-row border-t border-gray-100 pt-4">
              <View className="flex-1 items-center">
                <Text className="text-lg font-bold">28</Text>
                <Text className="text-xs text-gray-500">待处理任务</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-lg font-bold">15</Text>
                <Text className="text-xs text-gray-500">今日完成</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-lg font-bold">98%</Text>
                <Text className="text-xs text-gray-500">任务完成率</Text>
              </View>
            </View>
          </View>

          {/* 功能菜单 */}
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <SettingItem
              icon="user-edit"
              iconBgColor="#3b82f6"
              title="测试设备信息"
              subtitle="修改个人信息和联系方式"
              // text="profile.about"
              onPress={() => router.push('/test/device')}
            />
            <SettingItem
              icon="user-edit"
              iconBgColor="#3b82f6"
              title="个人资料"
              subtitle="修改个人信息和联系方式"
              // text="profile.about"
              onPress={() => {}}
            />
            <SettingItem
              icon="shield-alt"
              iconBgColor="#22c55e"
              title="账号安全"
              subtitle="修改密码和安全设置"
              // text="profile.about"
              onPress={() => {}}
            />
            <SettingItem
              icon="bell"
              iconBgColor="#a855f7"
              title="消息通知"
              subtitle="设置接收的通知类型"
              onPress={() => router.push('/notification')}
              isLast={true}
            />
          </View>

          {/* 工作统计 */}
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <Text className="mb-3 text-lg font-semibold">工作统计</Text>
            <View className="mt-1">
              <ProgressBar label="本月任务完成率" value={85} color="#3b82f6" />
              <ProgressBar label="生产计划执行率" value={92} color="#22c55e" />
              <ProgressBar label="质检合格率" value={98} color="#a855f7" />
            </View>
          </View>

          {/* 退出登录按钮 */}
          <TouchableOpacity
            className="mb-8 mt-6 items-center rounded-xl border border-gray-200 bg-red-600 py-3"
            onPress={() => signOut()}
          >
            <Text className="font-medium text-white" tx="settings.logout" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
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
  <View className="mb-3">
    <View className="mb-1 flex-row justify-between">
      <Text className="text-sm">{label}</Text>
      <Text className="text-sm font-medium">{value}%</Text>
    </View>
    <View className="h-2 overflow-hidden rounded bg-gray-200">
      <View
        className="h-full rounded"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </View>
  </View>
);
