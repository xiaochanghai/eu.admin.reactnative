/* eslint-disable react/react-in-jsx-scope */
import { useColorScheme } from 'nativewind';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import About from '@/components/profile/about';
import { BigDivider, Divider } from '@/components/profile/divider';
import Feedback from '@/components/profile/feedback';
import Help from '@/components/profile/help';
// import { Item } from '@/components/settings/item';
// import { ItemsContainer } from '@/components/settings/items-container';
import {
  colors,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { useAuth } from '@/lib';

// eslint-disable-next-line max-lines-per-function
export default function Settings() {
  const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  const user = {
    name: '张三',
    avatar: 'https://example.com/avatar.jpg',
    description: '微信号：weixin123',
  };
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1">
          {/* <Text className="text-xl font-bold">
            {translate('settings.title')}
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              padding: 16,
              // backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
            }}
          >
            <Image
              source={{
                uri: user?.avatar || 'https://via.placeholder.com/150',
              }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || '未登录'}</Text>
              <Text style={styles.userPosition}>{'职位信息'}</Text>
              <Text style={styles.userDepartment}>{'所属部门'}</Text>
            </View>
          </View>

          <BigDivider colorScheme={colorScheme} />

          <Feedback iconColor={iconColor} />
          <Divider colorScheme={colorScheme} />
          <Help iconColor={iconColor} />
          <Divider colorScheme={colorScheme} />
          <About iconColor={iconColor} />

          {/* <ItemsContainer title="settings.generale">
            <LanguageItem />
            <View
              className={
                colorScheme === 'dark' ? 'border-neutral-600' : 'bg-neutral-200'
              }
              style={{
                height: 1,
                marginLeft: 16,
              }}
            />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <Item
              text="settings.share"
              icon={<Share color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => {}} />
            <Item text="settings.terms" onPress={() => {}} />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer> */}

          {/* <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View> */}

          {/* 退出登录按钮 */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={signOut}
            className="m-10"
          >
            <Text style={styles.logoutButtonText} tx="settings.logout" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
// 样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  userPosition: {
    fontSize: 14,
    marginTop: 4,
  },
  userDepartment: {
    fontSize: 14,
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4f',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
