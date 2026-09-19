import React, { useEffect, useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import colors from '@/components/ui/colors';
import {
  ChatScreenHeader,
  ChatShell,
  loadChatPreferences,
  SectionDivider,
  updateChatPreferences,
} from '@/features/chat';

export default function ChatProfileScreen() {
  const [fullName, setFullName] = useState('EU Cloud User');
  const [nickname, setNickname] = useState('EU User');
  const [preferences, setPreferences] = useState(
    "I'm a product builder and software developer."
  );
  const [saved, setSaved] = useState<'profile' | 'preferences' | null>(null);

  useEffect(() => {
    const profile = loadChatPreferences().profile;
    setFullName(profile.fullName);
    setNickname(profile.nickname);
    setPreferences(profile.personalPreferences);
  }, []);

  const save = (section: 'profile' | 'preferences') => {
    updateChatPreferences({
      profile: {
        fullName: fullName.trim(),
        nickname: nickname.trim(),
        personalPreferences: preferences.trim(),
      },
    });
    setSaved(section);
  };

  const requestAccountDeletion = () => {
    const subject = encodeURIComponent('EU Cloud account deletion request');
    void Linking.openURL(`mailto:support@eu-cloud.com?subject=${subject}`);
  };

  return (
    <ChatShell>
      <ChatScreenHeader title="Profile" />
      <ScrollView
        className="flex-1 bg-white dark:bg-neutral-900"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        keyboardDismissMode="interactive"
      >
        <FieldLabel>Full Name</FieldLabel>
        <ProfileInput
          value={fullName}
          onChangeText={(value) => {
            setFullName(value);
            setSaved(null);
          }}
        />
        <FieldLabel>Nickname</FieldLabel>
        <ProfileInput
          value={nickname}
          onChangeText={(value) => {
            setNickname(value);
            setSaved(null);
          }}
        />
        <Pressable
          disabled={!fullName.trim() || !nickname.trim()}
          onPress={() => save('profile')}
          className="mt-6 items-center rounded-xl bg-neutral-900 py-3.5 active:opacity-80 disabled:opacity-40 dark:bg-white"
        >
          <Text className="text-[17px] font-semibold text-white dark:text-neutral-900">
            {saved === 'profile' ? 'Profile saved' : 'Update Profile'}
          </Text>
        </Pressable>
        <View className="my-6">
          <SectionDivider />
        </View>
        <FieldLabel>Personal Preferences</FieldLabel>
        <TextInput
          value={preferences}
          onChangeText={(value) => {
            setPreferences(value);
            setSaved(null);
          }}
          multiline
          placeholderTextColor={colors.neutral[500]}
          className="min-h-[140px] rounded-xl bg-neutral-100 px-4 py-3 text-[15px] leading-6 text-neutral-900 dark:bg-neutral-800 dark:text-white"
          style={{ textAlignVertical: 'top' }}
        />
        <Text className="mt-2 text-[13px] leading-5 text-neutral-500 dark:text-neutral-400">
          Saved on this device. AI personalization will use it after the chat
          backend is enabled.
        </Text>
        <Pressable
          onPress={() => save('preferences')}
          className="mt-4 items-center rounded-xl bg-neutral-100 py-3.5 active:opacity-80 dark:bg-neutral-800"
        >
          <Text className="text-[17px] font-semibold text-neutral-600 dark:text-neutral-300">
            {saved === 'preferences' ? 'Preferences saved' : 'Save Preferences'}
          </Text>
        </Pressable>
        <View className="my-6">
          <SectionDivider />
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={requestAccountDeletion}
          className="flex-row items-center py-1 active:opacity-60"
        >
          <Text className="text-[17px] text-red-500">
            Request account deletion
          </Text>
        </Pressable>
      </ScrollView>
    </ChatShell>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text className="mb-2 mt-5 text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
      {children}
    </Text>
  );
}

function ProfileInput({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={colors.neutral[500]}
      className="rounded-xl bg-neutral-100 px-4 py-3 text-[17px] text-neutral-900 dark:bg-neutral-800 dark:text-white"
    />
  );
}
