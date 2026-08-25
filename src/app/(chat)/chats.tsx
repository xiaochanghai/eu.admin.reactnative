import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  Share,
  Text,
  TextInput,
  View,
} from 'react-native';

import colors from '@/components/ui/colors';
import {
  type ChatConversation,
  ChatIcon,
  ChatScreenHeader,
  ChatShell,
  useChatWorkspace,
} from '@/features/chat';

type FilterMode = 'active' | 'starred' | 'archived';

function formatAge(timestamp: number) {
  const days = Math.max(0, Math.floor((Date.now() - timestamp) / 86_400_000));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return days < 7 ? `${days} days ago` : `${Math.round(days / 7)} weeks ago`;
}

export default function ChatsScreen() {
  const router = useRouter();
  const {
    archiveConversation,
    conversations,
    deleteConversation,
    openConversation,
    renameConversation,
    toggleStarConversation,
  } = useChatWorkspace();
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('active');
  const [actionChat, setActionChat] = useState<ChatConversation | null>(null);
  const [renameChat, setRenameChat] = useState<ChatConversation | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const filtered = useMemo(
    () =>
      conversations
        .filter((chat) => {
          if (filterMode === 'archived') return chat.archived;
          if (filterMode === 'starred') return chat.starred && !chat.archived;
          return !chat.archived;
        })
        .filter((chat) =>
          chat.title.toLowerCase().includes(search.trim().toLowerCase())
        )
        .sort((left, right) => right.updatedAt - left.updatedAt),
    [conversations, filterMode, search]
  );

  const beginRename = (item: ChatConversation) => {
    setActionChat(null);
    setRenameChat(item);
    setRenameValue(item.title);
  };

  const saveRename = () => {
    if (renameChat) renameConversation(renameChat.id, renameValue);
    setRenameChat(null);
  };

  const deleteChat = (item: ChatConversation) => {
    setActionChat(null);
    Alert.alert('Delete Chat', `Delete "${item.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteConversation(item.id),
      },
    ]);
  };

  return (
    <ChatShell>
      <ChatScreenHeader title="Chats" />
      <View className="flex-1 bg-white dark:bg-neutral-900">
        <View className="mx-5 mt-3 flex-row items-center rounded-xl bg-neutral-100 px-3 dark:bg-neutral-800">
          <ChatIcon name="search" size={18} muted />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search chats"
            placeholderTextColor={colors.neutral[500]}
            className="h-11 flex-1 px-2 text-base text-neutral-900 dark:text-white"
          />
        </View>
        <View className="flex-row gap-2 px-5 py-3">
          {(['active', 'starred', 'archived'] as const).map((mode) => (
            <Pressable
              key={mode}
              onPress={() => setFilterMode(mode)}
              className={`rounded-full px-3 py-1.5 ${
                filterMode === mode
                  ? 'bg-neutral-900 dark:bg-white'
                  : 'bg-neutral-100 dark:bg-neutral-800'
              }`}
            >
              <Text
                className={`text-xs capitalize ${
                  filterMode === mode
                    ? 'text-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}
              >
                {mode}
              </Text>
            </Pressable>
          ))}
        </View>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 28 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                openConversation(item.id);
                router.replace('/(chat)' as never);
              }}
              onLongPress={() => setActionChat(item)}
              className="flex-row items-center px-5 py-4 active:bg-neutral-100 dark:active:bg-neutral-800"
            >
              <View className="mr-3 size-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <ChatIcon name="chatbubble-outline" size={19} muted />
              </View>
              <View className="min-w-0 flex-1">
                <Text
                  numberOfLines={1}
                  className="text-[16px] text-neutral-900 dark:text-white"
                >
                  {item.title}
                </Text>
                <Text className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  {formatAge(item.updatedAt)} · {item.messages.length} messages
                </Text>
              </View>
              <Pressable
                onPress={() => toggleStarConversation(item.id)}
                className="size-10 items-center justify-center rounded-xl active:bg-neutral-100 dark:active:bg-neutral-800"
              >
                <ChatIcon
                  name={item.starred ? 'star' : 'star-outline'}
                  size={18}
                  muted={!item.starred}
                />
              </Pressable>
              <Pressable
                accessibilityLabel={`More actions for ${item.title}`}
                onPress={() => setActionChat(item)}
                className="size-10 items-center justify-center rounded-xl active:bg-neutral-100 dark:active:bg-neutral-800"
              >
                <ChatIcon name="ellipsis-horizontal" size={19} muted />
              </Pressable>
            </Pressable>
          )}
          ListEmptyComponent={
            <View className="items-center px-8 pt-24">
              <ChatIcon name="chatbubble-ellipses-outline" size={38} muted />
              <Text className="mt-4 text-center text-neutral-500 dark:text-neutral-400">
                No chats here yet
              </Text>
            </View>
          }
        />
        <Modal
          visible={Boolean(actionChat)}
          transparent
          animationType="fade"
          onRequestClose={() => setActionChat(null)}
        >
          <Pressable
            onPress={() => setActionChat(null)}
            className="flex-1 justify-end bg-black/30 p-4"
          >
            <View className="overflow-hidden rounded-2xl bg-white dark:bg-neutral-800">
              <ActionRow
                icon={actionChat?.starred ? 'star' : 'star-outline'}
                label={actionChat?.starred ? 'Unstar' : 'Star'}
                onPress={() => {
                  if (actionChat) toggleStarConversation(actionChat.id);
                  setActionChat(null);
                }}
              />
              <ActionRow
                icon="pencil-outline"
                label="Rename"
                onPress={() => actionChat && beginRename(actionChat)}
              />
              <ActionRow
                icon="share-outline"
                label="Share"
                onPress={() => {
                  if (actionChat) {
                    void Share.share({
                      title: actionChat.title,
                      message: actionChat.messages
                        .map((message) => `${message.role}: ${message.content}`)
                        .join('\n\n'),
                    });
                  }
                  setActionChat(null);
                }}
              />
              <ActionRow
                icon="archive-outline"
                label={actionChat?.archived ? 'Unarchive' : 'Archive'}
                onPress={() => {
                  if (actionChat) archiveConversation(actionChat.id);
                  setActionChat(null);
                }}
              />
              <ActionRow
                icon="trash-outline"
                label="Delete"
                danger
                onPress={() => actionChat && deleteChat(actionChat)}
              />
            </View>
          </Pressable>
        </Modal>
        <Modal
          visible={Boolean(renameChat)}
          transparent
          animationType="fade"
          onRequestClose={() => setRenameChat(null)}
        >
          <View className="flex-1 items-center justify-center bg-black/30 px-6">
            <View className="w-full max-w-md rounded-2xl bg-white p-5 dark:bg-neutral-800">
              <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
                Rename Chat
              </Text>
              <TextInput
                autoFocus
                value={renameValue}
                onChangeText={setRenameValue}
                onSubmitEditing={saveRename}
                className="mt-4 h-12 rounded-xl bg-neutral-100 px-4 text-base text-neutral-900 dark:bg-neutral-700 dark:text-white"
              />
              <View className="mt-4 flex-row justify-end gap-2">
                <Pressable
                  onPress={() => setRenameChat(null)}
                  className="rounded-lg px-4 py-2.5"
                >
                  <Text className="text-neutral-600 dark:text-neutral-300">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={saveRename}
                  className="rounded-lg bg-neutral-900 px-4 py-2.5 dark:bg-white"
                >
                  <Text className="font-medium text-white dark:text-neutral-900">
                    Rename
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ChatShell>
  );
}

function ActionRow({
  icon,
  label,
  onPress,
  danger,
}: {
  icon:
    | 'star'
    | 'star-outline'
    | 'pencil-outline'
    | 'share-outline'
    | 'archive-outline'
    | 'trash-outline';
  label: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-5 py-4 active:bg-neutral-100 dark:active:bg-neutral-700"
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
