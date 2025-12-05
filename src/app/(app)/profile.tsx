import { Env } from '@env';
import { Link, useRouter } from 'expo-router';
import { Alert, Image, SafeAreaView, TouchableOpacity } from 'react-native';

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
  const router = useRouter();

  // 添加退出登录确认函数
  const handleLogout = () => {
    Alert.alert(
      '退出登录',
      '确定要退出登录吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          onPress: () => signOut(),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <View className="flex-1 bg-gray-100">
        <SafeAreaView className="flex-1">
          {/* 顶部导航 */}
          <NavHeader
            title="个人中心"
            leftShown={false}
            right={
              <Link href={`/settings`}>
                <FontAwesome name="cog" size={22} color="#666" />
              </Link>
            }
          />

          <ScrollView className="flex-1 px-4 pb-[86px]">
            {/* 用户信息卡片 */}
            <View className="mt-4 rounded-2xl bg-white p-5 shadow-md">
              <View className="flex-row items-center">
                <Image
                  source={{
                    uri: avatarFileUrl,
                  }}
                  className="mr-4 size-20 rounded-full border-4 border-white shadow"
                />
                <View className="flex-1">
                  <Text className="text-xl font-bold">
                    {userInfo?.UserName || '未设置用户名'}
                  </Text>
                  <Text className="text-sm text-gray-500">生产部门 · 经理</Text>
                  <View className="mt-2 flex-row">
                    <View className="rounded-xl bg-blue-100 px-3 py-1">
                      <Text className="text-xs font-medium text-blue-800">
                        管理员
                      </Text>
                    </View>
                    <View className="ml-2 rounded-xl bg-green-100 px-3 py-1">
                      <Text className="text-xs font-medium text-green-800">
                        已认证
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="mt-5 flex-row border-t border-gray-100 pt-4">
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
            <View className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
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
                onPress={() => {}}
              />
              <SettingItem
                icon="shield-alt"
                iconBgColor="#22c55e"
                title="账号安全"
                subtitle="修改密码和安全设置"
                hasNavigation={true}
                onPress={() => {}}
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
                onPress={() => {}}
                isLast={true}
              />
            </View>

            {/* 工作统计 */}
            <View className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
              <Text className="mb-4 text-lg font-semibold">工作统计</Text>
              <View className="mt-1">
                <ProgressBar
                  label="本月任务完成率"
                  value={85}
                  color="#3b82f6"
                />
                <ProgressBar
                  label="生产计划执行率"
                  value={92}
                  color="#22c55e"
                />
                <ProgressBar label="质检合格率" value={98} color="#a855f7" />
              </View>
            </View>

            {/* 退出登录按钮 */}
            <TouchableOpacity
              className="mb-8 mt-6 items-center rounded-xl border border-gray-200 bg-white py-3.5 shadow-sm"
              onPress={handleLogout} // 修改为使用handleLogout函数
            >
              <Text className="font-medium text-red-600" tx="settings.logout" />
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
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
      <Text className="text-sm">{label}</Text>
      <Text className="text-sm font-medium">{value}%</Text>
    </View>
    <View className="h-3 overflow-hidden rounded-full bg-gray-100">
      <View
        className="h-full rounded-full"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </View>
  </View>
);
