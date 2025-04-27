import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavHeader } from '@/components/ui';

import SettingItem from './components/setting-item';

const Settings: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" /> */}

      {/* 顶部导航 */}
      <NavHeader title="设置" />

      <ScrollView style={styles.content}>
        {/* 系统设置 */}
        <Text style={styles.sectionTitle}>系统设置</Text>
        <View style={styles.card}>
          <SettingItem
            icon="language"
            iconBgColor="#3b82f6"
            title="语言"
            subtitle="简体中文"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="palette"
            iconBgColor="#a855f7"
            title="主题"
            subtitle="浅色"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="font"
            iconBgColor="#22c55e"
            title="字体大小"
            subtitle="标准"
            hasNavigation
            onPress={() => {}}
            isLast
          />
        </View>

        {/* 通知设置 */}
        <Text style={styles.sectionTitle}>通知设置</Text>
        <View style={styles.card}>
          <SettingItem
            icon="bell"
            iconBgColor="#ef4444"
            title="推送通知"
            subtitle="接收所有通知"
            hasToggle
            defaultToggleValue={true}
            onToggleChange={(value) => console.log('推送通知:', value)}
          />

          <SettingItem
            icon="envelope"
            iconBgColor="#f97316"
            title="邮件通知"
            subtitle="仅接收重要通知"
            hasToggle
            defaultToggleValue={true}
            onToggleChange={(value) => console.log('邮件通知:', value)}
          />

          <SettingItem
            icon="volume-up"
            iconBgColor="#0ea5e9"
            title="声音提醒"
            hasToggle
            defaultToggleValue={true}
            onToggleChange={(value) => console.log('声音提醒:', value)}
            isLast
          />
        </View>

        {/* 隐私与安全 */}
        <Text style={styles.sectionTitle}>隐私与安全</Text>
        <View style={styles.card}>
          <SettingItem
            icon="lock"
            iconBgColor="#6366f1"
            title="修改密码"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="shield-alt"
            iconBgColor="#eab308"
            title="双因素认证"
            hasToggle
            defaultToggleValue={false}
            onToggleChange={(value) => console.log('双因素认证:', value)}
          />

          <SettingItem
            icon="user-shield"
            iconBgColor="#22c55e"
            title="隐私设置"
            hasNavigation
            onPress={() => {}}
            isLast
          />
        </View>

        {/* 数据与存储 */}
        <Text style={styles.sectionTitle}>数据与存储</Text>
        <View style={styles.card}>
          <SettingItem
            icon="database"
            iconBgColor="#6b7280"
            title="清除缓存"
            subtitle="当前缓存: 24MB"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="cloud-download-alt"
            iconBgColor="#0ea5e9"
            title="自动同步数据"
            hasToggle
            defaultToggleValue={true}
            onToggleChange={(value) => console.log('自动同步数据:', value)}
          />

          <SettingItem
            icon="wifi"
            iconBgColor="#a855f7"
            title="仅在WIFI下同步"
            hasToggle
            defaultToggleValue={true}
            onToggleChange={(value) => console.log('仅在WIFI下同步:', value)}
            isLast
          />
        </View>

        {/* 关于 */}
        <Text style={styles.sectionTitle}>关于</Text>
        <View style={styles.card}>
          <SettingItem
            icon="info-circle"
            iconBgColor="#3b82f6"
            title="关于优智云"
            subtitle="版本 2.0.1"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="file-alt"
            iconBgColor="#6b7280"
            title="用户协议"
            hasNavigation
            onPress={() => {}}
          />

          <SettingItem
            icon="question-circle"
            iconBgColor="#f97316"
            title="帮助中心"
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
