import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';

import {
  type ChatCapabilitiesPreferences,
  ChatIcon,
  ChatScreenHeader,
  ChatShell,
  DEFAULT_CHAT_PREFERENCES,
  loadChatPreferences,
  SectionDivider,
  updateChatPreferences,
} from '@/features/chat';

type CapabilityIcon =
  | 'cube-outline'
  | 'code-slash-outline'
  | 'globe-outline'
  | 'search-outline'
  | 'bulb-outline';

export default function CapabilitiesScreen() {
  const [capabilities, setCapabilities] = useState<ChatCapabilitiesPreferences>(
    DEFAULT_CHAT_PREFERENCES.capabilities
  );

  useEffect(() => {
    setCapabilities(loadChatPreferences().capabilities);
  }, []);

  const updateCapability = <Key extends keyof ChatCapabilitiesPreferences>(
    key: Key,
    value: ChatCapabilitiesPreferences[Key]
  ) => {
    const next = { ...capabilities, [key]: value };
    setCapabilities(next);
    updateChatPreferences({ capabilities: next });
  };

  return (
    <ChatShell>
      <ChatScreenHeader title="Capabilities" />
      <ScrollView className="flex-1 bg-white dark:bg-neutral-900">
        <View className="mx-5 mb-2 mt-4 rounded-xl bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
          <Text className="text-[13px] leading-5 text-neutral-500 dark:text-neutral-400">
            Preferences are saved on this device. Tool execution becomes
            available when its backend integration is configured.
          </Text>
        </View>
        <CapabilityToggle
          icon="cube-outline"
          label="Artifacts"
          description="Required by code execution"
          value={capabilities.artifacts}
          onValueChange={(value) => updateCapability('artifacts', value)}
        />
        <CapabilityToggle
          icon="code-slash-outline"
          label="Code execution and file creation"
          description="Allow Agent to execute code and create and edit docs, spreadsheets, presentations, PDFs, and data reports."
          value={capabilities.code}
          onValueChange={(value) => updateCapability('code', value)}
        />
        <CapabilityToggle
          icon="globe-outline"
          label="Web search"
          description="Agent will automatically search the web when it determines it needs current information"
          value={capabilities.web}
          onValueChange={(value) => updateCapability('web', value)}
        />
        <SectionDivider />
        <Text className="px-5 pb-2 pt-6 text-xs font-semibold uppercase tracking-[1.1px] text-neutral-500 dark:text-neutral-400">
          Memory
        </Text>
        <CapabilityToggle
          icon="search-outline"
          label="Search and reference chats"
          description="Allow Agent to search for relevant details in past chats. Learn more."
          value={capabilities.searchChats}
          onValueChange={(value) => updateCapability('searchChats', value)}
        />
        <CapabilityToggle
          icon="bulb-outline"
          label="Generate memory from chat history"
          description="Allow Agent to remember relevant context from your chats. This setting controls memory for both chats and projects. Learn more."
          value={capabilities.memory}
          onValueChange={(value) => updateCapability('memory', value)}
        />
        <View className="mx-5 mt-4 flex-row items-center rounded-xl bg-neutral-100 px-4 py-3.5 dark:bg-neutral-800">
          <View className="flex-1">
            <Text className="text-[15px] font-medium text-neutral-900 dark:text-white">
              View your memory
            </Text>
            <Text className="mt-0.5 text-[13px] text-neutral-500 dark:text-neutral-400">
              Stored locally on this device
            </Text>
          </View>
          <ChatIcon name="chevron-forward" size={16} muted />
        </View>
        <View className="mt-6">
          <SectionDivider />
        </View>
        <Text className="px-5 pb-2 pt-6 text-xs font-semibold uppercase tracking-[1.1px] text-neutral-500 dark:text-neutral-400">
          Tool access
        </Text>
        <ToolAccessOption
          label="Auto"
          description="Agent chooses for you"
          selected={capabilities.toolAccess === 'auto'}
          onPress={() => updateCapability('toolAccess', 'auto')}
        />
        <ToolAccessOption
          label="On demand"
          description="Load when needed. More messages, lower accuracy"
          selected={capabilities.toolAccess === 'on-demand'}
          onPress={() => updateCapability('toolAccess', 'on-demand')}
        />
        <ToolAccessOption
          label="Always available"
          selected={capabilities.toolAccess === 'always'}
          onPress={() => updateCapability('toolAccess', 'always')}
        />
        <View className="h-10" />
      </ScrollView>
    </ChatShell>
  );
}

function ToolAccessOption({
  label,
  description,
  selected,
  onPress,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      className="flex-row items-center px-5 py-3 active:bg-neutral-100 dark:active:bg-neutral-800"
    >
      <View className="flex-1 pr-4">
        <Text className="text-[17px] text-neutral-900 dark:text-white">
          {label}
        </Text>
        {description ? (
          <Text className="mt-0.5 text-[13px] leading-5 text-neutral-500 dark:text-neutral-400">
            {description}
          </Text>
        ) : null}
      </View>
      {selected ? <ChatIcon name="checkmark" size={20} /> : null}
    </Pressable>
  );
}

function CapabilityToggle({
  icon,
  label,
  description,
  value,
  onValueChange,
}: {
  icon: CapabilityIcon;
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View className="flex-row items-start px-5 py-4">
      <View className="mt-0.5">
        <ChatIcon name={icon} />
      </View>
      <View className="ml-4 flex-1 pr-3">
        <Text className="text-[17px] text-neutral-900 dark:text-white">
          {label}
        </Text>
        <Text className="mt-1 text-[13px] leading-5 text-neutral-500 dark:text-neutral-400">
          {description}
        </Text>
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}
