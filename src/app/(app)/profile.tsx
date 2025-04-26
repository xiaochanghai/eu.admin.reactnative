/* eslint-disable react/react-in-jsx-scope */
// import { useColorScheme } from 'nativewind';
import { Env } from '@env';
import { Link } from 'expo-router';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// import { Item } from '@/components/settings/item';
// import { ItemsContainer } from '@/components/settings/items-container';
import { NavHeader, ScrollView, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
// import About from '@/components/profile/about';
// import { BigDivider, Divider } from '@/components/profile/divider';
// import Feedback from '@/components/profile/feedback';
// import Help from '@/components/profile/help';
import type { TxKeyPath } from '@/lib';
import { useAuth } from '@/lib';
import { userInfo as user } from '@/lib/user';

export default function Settings() {
  const signOut = useAuth.use.signOut();
  const userInfo = user.use.userInfo();
  let avatarFileUrl = 'https://randomuser.me/api/portraits/men/32.jpg';
  if (userInfo?.AvatarFileId != null)
    avatarFileUrl = Env.API_URL + 'api/File/Img/' + userInfo?.AvatarFileId;
  // const { colorScheme } = useColorScheme();
  // const iconColor =
  //   colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  return (
    <>
      {/* <FocusAwareStatusBar /> */}
      <SafeAreaView style={styles.container}>
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
        <ScrollView style={styles.content}>
          {/* 用户信息卡片 */}
          <View style={styles.card}>
            <View style={styles.userInfoContainer}>
              <Image
                source={{
                  uri: avatarFileUrl,
                }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userInfo?.UserName}</Text>
                <Text style={styles.userRole}>生产部门 · 经理</Text>
                <View style={styles.badgeContainer}>
                  <View style={styles.adminBadge}>
                    <Text style={styles.adminBadgeText}>管理员</Text>
                  </View>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedBadgeText}>已认证</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>28</Text>
                <Text style={styles.statLabel}>待处理任务</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>15</Text>
                <Text style={styles.statLabel}>今日完成</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>98%</Text>
                <Text style={styles.statLabel}>任务完成率</Text>
              </View>
            </View>
          </View>

          {/* 功能菜单 */}
          <View style={styles.card}>
            <MenuItem
              icon="user-edit"
              color="#3b82f6"
              title="个人资料"
              subtitle="修改个人信息和联系方式"
              // text="profile.about"
              onPress={() => {}}
            />
            <MenuItem
              icon="shield-alt"
              color="#22c55e"
              title="账号安全"
              subtitle="修改密码和安全设置"
              // text="profile.about"
              onPress={() => {}}
            />
            <MenuItem
              icon="bell"
              color="#a855f7"
              title="消息通知"
              subtitle="设置接收的通知类型"
              onPress={() => {}}
              // text="profile.about"
              isLast={true}
            />
          </View>

          {/* 工作统计 */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>工作统计</Text>
            <View style={styles.progressContainer}>
              <ProgressBar label="本月任务完成率" value={85} color="#3b82f6" />
              <ProgressBar label="生产计划执行率" value={92} color="#22c55e" />
              <ProgressBar label="质检合格率" value={98} color="#a855f7" />
            </View>
          </View>

          {/* 其他选项 */}
          <View style={styles.card}>
            <MenuItem
              icon="question-circle"
              color="#eab308"
              title="帮助中心"
              // text="profile.about"
              onPress={() => {}}
            />
            <MenuItem
              icon="headset"
              color="#ef4444"
              title="联系客服"
              // text="profile.about"
              onPress={() => {}}
            />
            <MenuItem
              icon="info-circle"
              color="#6b7280"
              title="关于我们"
              // text="profile.about"
              onPress={() => {}}
              isLast={true}
            />
          </View>

          {/* 退出登录按钮 */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              signOut();
            }}
            className="m-10"
          >
            {/* <Text style={styles.logoutButtonText}>退出登录1</Text> */}
            <Text style={styles.logoutButtonText} tx="settings.logout" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// 菜单项组件
type MenuItemProps = {
  icon: string;
  color: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  isLast?: boolean;
  text?: TxKeyPath;
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  color,
  title,
  subtitle,
  onPress,
  isLast = false,
  text,
}) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast ? styles.menuItemLast : null]}
    onPress={onPress}
  >
    <View style={[styles.menuIcon, { backgroundColor: color }]}>
      <FontAwesome name={icon as any} size={18} color="white" />
    </View>
    <View style={styles.menuContent}>
      <Text style={styles.menuTitle} tx={text}>
        {title}
      </Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    <FontAwesome name="chevron-right" size={14} color="#9ca3af" />
  </TouchableOpacity>
);

// 进度条组件
type ProgressBarProps = {
  label: string;
  value: number;
  color: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, color }) => (
  <View style={styles.progressItem}>
    <View style={styles.progressHeader}>
      <Text style={styles.progressLabel}>{label}</Text>
      <Text style={styles.progressValue}>{value}%</Text>
    </View>
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${value}%`, backgroundColor: color },
        ]}
      />
    </View>
  </View>
);
// 样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 86, // 为底部导航留出空间
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 14,
    color: '#6b7280',
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  adminBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  adminBadgeText: {
    fontSize: 12,
    color: '#1e40af',
  },
  verifiedBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  verifiedBadgeText: {
    fontSize: 12,
    color: '#166534',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressItem: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  logoutButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  logoutButtonText: {
    color: '#dc2626',
    fontWeight: '500',
    fontSize: 16,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingBottom: 20, // 适配底部安全区域
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#6b7280',
  },
  navTextActive: {
    color: '#0066ff',
  },
});
