import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  AndroidGrabber,
  ChatIcon,
  ChatScreenHeader,
  ChatShell,
  SectionDivider,
  useChatWorkspace,
} from '@/features/chat';

export default function ModelPickerScreen() {
  const router = useRouter();
  const {
    archiveConversation,
    currentConversation,
    deleteConversation,
    extendedThinking,
    models,
    renameConversation,
    selectedModel,
    selectModel,
    setExtendedThinking,
    toggleStarConversation,
  } = useChatWorkspace();
  const [renaming, setRenaming] = useState(false);
  const [title, setTitle] = useState('');

  const rename = () => {
    if (currentConversation) {
      renameConversation(currentConversation.id, title);
    }
    setRenaming(false);
  };

  const remove = () => {
    if (!currentConversation) return;
    Alert.alert('Delete chat', `Delete "${currentConversation.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteConversation(currentConversation.id);
          router.replace('/(chat)' as never);
        },
      },
    ]);
  };

  return (
    <ChatShell>
      <ChatScreenHeader title="Chat options" />
      <ScrollView className="flex-1 bg-white dark:bg-neutral-900">
        <AndroidGrabber />
        <Text className="px-5 py-2 text-xs font-semibold uppercase tracking-[1.2px] text-neutral-500 dark:text-neutral-400">
          Model
        </Text>
        {models.map((model) => (
          <Pressable
            key={model.id}
            accessibilityRole="radio"
            accessibilityState={{ selected: selectedModel.id === model.id }}
            onPress={() => selectModel(model.id)}
            className="flex-row items-center px-5 py-3.5 active:bg-neutral-100 dark:active:bg-neutral-800"
          >
            <View className="min-w-0 flex-1">
              <Text className="text-[17px] text-neutral-900 dark:text-white">
                {model.label}
              </Text>
              <Text className="mt-0.5 text-[13px] text-neutral-500 dark:text-neutral-400">
                {model.subtitle}
              </Text>
            </View>
            {selectedModel.id === model.id ? (
              <ChatIcon name="checkmark" size={20} />
            ) : null}
          </Pressable>
        ))}

        <SectionDivider />

        <View className="pt-2">
          <ActionRow
            icon="folder-outline"
            label="Add to project"
            disabled={!currentConversation}
            onPress={() => router.push('/(chat)/projects' as never)}
          />
          <ActionRow
            icon={currentConversation?.starred ? 'star' : 'star-outline'}
            label={currentConversation?.starred ? 'Unstar' : 'Star'}
            disabled={!currentConversation}
            onPress={() =>
              currentConversation &&
              toggleStarConversation(currentConversation.id)
            }
          />
          <ActionRow
            icon="pencil-outline"
            label="Rename"
            disabled={!currentConversation}
            onPress={() => {
              if (!currentConversation) return;
              setTitle(currentConversation.title);
              setRenaming(true);
            }}
          />
          <ActionRow
            icon="archive-outline"
            label={currentConversation?.archived ? 'Unarchive' : 'Archive'}
            disabled={!currentConversation}
            onPress={() => {
              if (!currentConversation) return;
              archiveConversation(currentConversation.id);
              router.replace('/(chat)' as never);
            }}
          />
          <ActionRow
            icon="trash-outline"
            label="Delete"
            disabled={!currentConversation}
            danger
            onPress={remove}
          />
        </View>

        <SectionDivider />

        <View className="flex-row items-center px-5 py-4">
          <ChatIcon name="sparkles-outline" />
          <View className="ml-4 flex-1">
            <Text className="text-[17px] text-neutral-900 dark:text-white">
              Extended thinking
            </Text>
            <Text className="mt-0.5 text-[13px] text-neutral-500 dark:text-neutral-400">
              Think longer for complex tasks
            </Text>
          </View>
          <Switch
            value={extendedThinking}
            onValueChange={setExtendedThinking}
          />
        </View>
      </ScrollView>
      <Modal
        visible={renaming}
        transparent
        animationType="fade"
        onRequestClose={() => setRenaming(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/30 px-6">
          <View className="w-full max-w-md rounded-2xl bg-white p-5 dark:bg-neutral-800">
            <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
              Rename chat
            </Text>
            <TextInput
              autoFocus
              value={title}
              onChangeText={setTitle}
              onSubmitEditing={rename}
              className="mt-4 h-12 rounded-xl bg-neutral-100 px-4 text-base text-neutral-900 dark:bg-neutral-700 dark:text-white"
            />
            <View className="mt-4 flex-row justify-end gap-2">
              <Pressable
                onPress={() => setRenaming(false)}
                className="rounded-lg px-4 py-2.5"
              >
                <Text className="text-neutral-600 dark:text-neutral-300">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                disabled={!title.trim()}
                onPress={rename}
                className="rounded-lg bg-neutral-900 px-4 py-2.5 disabled:opacity-40 dark:bg-white"
              >
                <Text className="font-medium text-white dark:text-neutral-900">
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ChatShell>
  );
}

function ActionRow({
  icon,
  label,
  danger,
  disabled,
  onPress,
}: {
  icon:
    | 'folder-outline'
    | 'archive-outline'
    | 'star'
    | 'star-outline'
    | 'pencil-outline'
    | 'trash-outline';
  label: string;
  danger?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className="flex-row items-center px-5 py-3.5 active:bg-neutral-100 disabled:opacity-40 dark:active:bg-neutral-800"
    >
      <ChatIcon name={icon} danger={danger} />
      <Text
        className={`ml-4 text-[17px] ${
          danger ? 'text-red-500' : 'text-neutral-900 dark:text-white'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
