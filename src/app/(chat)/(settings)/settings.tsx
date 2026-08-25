import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, Switch, Text, View } from 'react-native';

import LogoutConfirmModal from '@/app/settings/components/logout-confirm-modal';
import {
  ChatIcon,
  ChatScreenHeader,
  ChatShell,
  loadChatPreferences,
  SectionDivider,
  SettingsRow,
  updateChatPreferences,
} from '@/features/chat';
import { useSelectedTheme } from '@/lib';
import { userInfo } from '@/lib/user';

export default function ChatSettingsScreen() {
  const router = useRouter();
  const account = userInfo.use.userInfo();
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const [haptics, setHaptics] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const version = Constants.expoConfig?.version ?? '1.0.0';

  useEffect(() => {
    setHaptics(loadChatPreferences().hapticsEnabled);
  }, []);

  const changeTheme = () => {
    const next =
      selectedTheme === 'system'
        ? 'light'
        : selectedTheme === 'light'
          ? 'dark'
          : 'system';
    setSelectedTheme(next);
  };

  const setHapticsEnabled = (value: boolean) => {
    setHaptics(value);
    updateChatPreferences({ hapticsEnabled: value });
  };

  return (
    <ChatShell>
      <ChatScreenHeader title="Settings" />
      <ScrollView className="flex-1 bg-white dark:bg-neutral-900">
        <View className="mx-5 mb-5 mt-4 rounded-xl bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
          <Text className="text-xs text-neutral-500 dark:text-neutral-400">
            Signed in as
          </Text>
          <Text
            selectable
            className="mt-1 text-[15px] text-neutral-900 dark:text-white"
          >
            {account?.UserName ?? 'EU Cloud User'}
          </Text>
        </View>
        <SettingsRow
          icon="person-circle-outline"
          label="Profile"
          onPress={() => router.push('/(chat)/(settings)/profile' as never)}
        />
        <SettingsRow
          icon="cash-outline"
          label="Billing"
          detail="Coming soon"
          disabled
        />
        <SettingsRow
          icon="stats-chart-outline"
          label="Usage"
          detail="Coming soon"
          disabled
        />
        <SectionDivider />
        <SettingsRow
          icon="options-outline"
          label="Capabilities"
          onPress={() =>
            router.push('/(chat)/(settings)/capabilities' as never)
          }
        />
        <SettingsRow
          icon="grid-outline"
          label="Connectors"
          detail="Coming soon"
          disabled
        />
        <SettingsRow
          icon="people-outline"
          label="Permissions"
          detail="Coming soon"
          disabled
        />
        <SectionDivider />
        <SettingsRow
          icon="contrast-outline"
          label="Appearance"
          detail={capitalize(selectedTheme)}
          onPress={changeTheme}
        />
        <SettingsRow
          icon="language-outline"
          label="Speech language"
          detail="Coming soon"
          disabled
        />
        <SettingsRow
          icon="notifications-outline"
          label="Notifications"
          onPress={() => router.push('/notification' as never)}
        />
        <SettingsRow
          icon="shield-checkmark-outline"
          label="Privacy policy"
          onPress={() => router.push('/privacy-policy' as never)}
        />
        <SettingsRow
          icon="link-outline"
          label="Shared links"
          detail="Coming soon"
          disabled
        />
        <SectionDivider />
        <View className="flex-row items-center px-5 py-3.5">
          <ChatIcon name="phone-portrait-outline" />
          <Text className="ml-4 flex-1 text-[17px] text-neutral-900 dark:text-white">
            Haptic feedback
          </Text>
          <Switch value={haptics} onValueChange={setHapticsEnabled} />
        </View>
        <SectionDivider />
        <SettingsRow
          icon="information-circle-outline"
          label="About EU Cloud"
          detail={`v${version}`}
          onPress={() => router.push('/about-us' as never)}
        />
        <SettingsRow
          icon="document-text-outline"
          label="User agreement"
          onPress={() => router.push('/user-agreement' as never)}
        />
        <SettingsRow
          icon="help-circle-outline"
          label="Help & support"
          onPress={() => void Linking.openURL('mailto:support@eu-cloud.com')}
        />
        <SectionDivider />
        <SettingsRow
          icon="log-out-outline"
          label="Log out"
          danger
          onPress={() => setShowLogoutConfirm(true)}
        />
        <View className="h-10" />
      </ScrollView>
      <LogoutConfirmModal
        visible={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
      />
    </ChatShell>
  );
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
