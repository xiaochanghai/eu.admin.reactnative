import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { getVersion } from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavHeader, Text } from '@/components/ui';

import LogoutConfirmModal from './components/logout-confirm-modal';
import SettingItem from './components/setting-item';

const Settings: React.FC = () => {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    // 安全区域视图，确保内容不会被设备的缺口遮挡
    <View className="flex-1 bg-[#f5f5f5] dark:bg-neutral-900">
      {/* 顶部导航栏 */}
      <NavHeader tx="settings.title" />

      {/* 主要内容区域 */}
      <ScrollView className="flex-1 p-4">
        {/* 系统设置部分 */}
        <Text
          className="mb-3 mt-2 text-lg font-semibold text-[#333] dark:text-gray-100"
          tx="settings.system.title"
        />
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <SettingItem
            icon="language"
            iconBgColor="#3b82f6"
            tx="settings.system.language"
            subtitle="简体中文"
            hasNavigation
            onPress={() => { }}
          />

          <SettingItem
            icon="palette"
            iconBgColor="#a855f7"
            tx="settings.system.theme"
            subtitle="浅色"
            hasNavigation
            onPress={() => { }}
          />

          <SettingItem
            icon="font"
            iconBgColor="#22c55e"
            title="字体大小"
            tx="settings.system.font_size"
            subtitle="标准"
            hasNavigation
            onPress={() => { }}
            isLast
          />
        </View>

        {/* 通知设置部分 */}
        <Text
          className="mb-3 mt-2 text-lg font-semibold text-[#333] dark:text-gray-100"
          tx="settings.notification.title"
        />
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
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

        {/* 隐私与安全部分 */}
        <Text
          className="mb-3 mt-2 text-lg font-semibold text-[#333] dark:text-gray-100"
          tx="settings.privacy_security.title"
        />
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <SettingItem
            icon="lock"
            iconBgColor="#6366f1"
            tx="settings.privacy_security.password"
            hasNavigation
            onPress={() => { }}
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
            onPress={() => { }}
            isLast
          />
        </View>

        {/* 数据与存储部分 */}
        <Text
          className="mb-3 mt-2 text-lg font-semibold text-[#333] dark:text-gray-100"
          tx="settings.data_storage.title"
        />
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <SettingItem
            icon="database"
            iconBgColor="#6b7280"
            tx="settings.data_storage.clear_cache"
            subtitle="当前缓存: 24MB"
            hasNavigation
            onPress={() => { }}
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

        {/* 关于应用部分 */}
        <Text
          className="mb-3 mt-2 text-lg font-semibold text-[#333] dark:text-gray-100"
          tx="settings.about.title"
        />
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
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
            onPress={() => { }}
          />

          <SettingItem
            icon="headset"
            iconBgColor="#ef4444"
            tx="settings.about.contact_support"
            onPress={() => { }}
          />
          <SettingItem
            icon="question-circle"
            iconBgColor="#f97316"
            tx="settings.about.help"
            hasNavigation
            onPress={() => { }}
            isLast
          />
        </View>

        {/* 退出登录按钮 */}
        <TouchableOpacity
          className="my-6 items-center rounded-xl bg-[#ef4444] py-3.5"
          style={{ marginBottom: insets.bottom }}
          onPress={() => setShowLogoutConfirm(true)}
        >
          <Text className="font-medium text-white" tx="settings.logout" />
        </TouchableOpacity>
      </ScrollView>

      {/* 退出确认弹窗 */}
      <LogoutConfirmModal
        visible={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
      />
    </View>
  );
};

export default Settings;
