import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { getVersion } from 'react-native-device-info';

import { NavHeader } from '@/components/ui';
import { Text } from '@/components/ui';

import SettingItem from './components/setting-item';

const Settings: React.FC = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" /> */}

      {/* 顶部导航 */}
      <NavHeader tx="settings.title" />

      <ScrollView style={styles.content}>
        {/* 系统设置 */}
        <Text style={styles.sectionTitle} tx="settings.system.title" />
        <View style={styles.card}>
          <SettingItem
            icon="language"
            iconBgColor="#3b82f6"
            tx="settings.system.language"
            subtitle="简体中文"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="palette"
            iconBgColor="#a855f7"
            tx="settings.system.theme"
            subtitle="浅色"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="font"
            iconBgColor="#22c55e"
            title="字体大小"
            tx="settings.system.font_size"
            subtitle="标准"
            hasNavigation
            onPress={() => {}}
            isLast
          />
        </View>

        {/* 通知设置 */}
        <Text style={styles.sectionTitle} tx="settings.notification.title" />
        <View style={styles.card}>
          <SettingItem
            icon="bell"
            iconBgColor="#ef4444"
            tx="settings.notification.notification"
            subtx="settings.notification.sub_notification"
            hasToggle
            defaultToggleValue={true}
            onToggleChange={(value) => console.log('推送通知:', value)}
          />

          <SettingItem
            icon="envelope"
            iconBgColor="#f97316"
            tx="settings.notification.email"
            subtx="settings.notification.sub_email"
            hasToggle
            defaultToggleValue={true}
            onToggleChange={(value) => console.log('邮件通知:', value)}
          />

          <SettingItem
            icon="volume-up"
            iconBgColor="#0ea5e9"
            tx="settings.notification.sound"
            hasToggle
            defaultToggleValue={true}
            onToggleChange={(value) => console.log('声音提醒:', value)}
            isLast
          />
        </View>

        {/* 隐私与安全 */}
        <Text
          style={styles.sectionTitle}
          tx="settings.privacy_security.title"
        />
        <View style={styles.card}>
          <SettingItem
            icon="lock"
            iconBgColor="#6366f1"
            tx="settings.privacy_security.password"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="shield-alt"
            iconBgColor="#eab308"
            tx="settings.privacy_security.2FA"
            hasToggle
            defaultToggleValue={false}
            onToggleChange={(value) => console.log('双因素认证:', value)}
          />

          <SettingItem
            icon="user-shield"
            iconBgColor="#22c55e"
            tx="settings.privacy_security.privacy"
            hasNavigation
            onPress={() => {}}
            isLast
          />
        </View>

        {/* 数据与存储 */}
        <Text style={styles.sectionTitle} tx="settings.data_storage.title" />
        <View style={styles.card}>
          <SettingItem
            icon="database"
            iconBgColor="#6b7280"
            tx="settings.data_storage.clear_cache"
            subtitle="当前缓存: 24MB"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="cloud-download-alt"
            iconBgColor="#0ea5e9"
            tx="settings.data_storage.auto_sync"
            hasToggle
            defaultToggleValue={true}
            onToggleChange={(value) => console.log('自动同步数据:', value)}
          />

          <SettingItem
            icon="wifi"
            iconBgColor="#a855f7"
            tx="settings.data_storage.wifi_only_sync"
            hasToggle
            defaultToggleValue={true}
            onToggleChange={(value) => console.log('仅在WIFI下同步:', value)}
            isLast
          />
        </View>

        {/* 关于 */}
        <Text style={styles.sectionTitle} tx="settings.about.title" />
        <View style={styles.card}>
          <SettingItem
            icon="info-circle"
            iconBgColor="#3b82f6"
            tx="settings.about.about_us"
            subtitle={'V' + getVersion()}
            hasNavigation
            onPress={() => {
              router.push('/settings/about');
            }}
          />

          <SettingItem
            icon="file-alt"
            iconBgColor="#6b7280"
            tx="settings.about.user_agreement"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="headset"
            iconBgColor="#ef4444"
            tx="settings.about.contact_support"
            onPress={() => {}}
          />
          <SettingItem
            icon="question-circle"
            iconBgColor="#f97316"
            tx="settings.about.help"
            hasNavigation
            onPress={() => {}}
            isLast
          />
        </View>

        {/* 退出登录按钮 */}
        <TouchableOpacity
          style={styles.logoutButton}
          // onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutButtonText}>退出登录</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
    padding: 16,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 24,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Settings;
