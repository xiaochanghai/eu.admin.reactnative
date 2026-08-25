import React, { useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  ChatIcon,
  ChatScreenHeader,
  ChatShell,
  useChatWorkspace,
} from '@/features/chat';

export default function ProjectsScreen() {
  const {
    assignConversationToProject,
    conversations,
    createProject,
    currentConversation,
    deleteProject,
    projects,
    renameProject,
  } = useChatWorkspace();
  const [creating, setCreating] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const counts = useMemo(
    () =>
      conversations.reduce<Record<string, number>>((result, conversation) => {
        if (conversation.projectId) {
          result[conversation.projectId] =
            (result[conversation.projectId] ?? 0) + 1;
        }
        return result;
      }, {}),
    [conversations]
  );

  const saveProject = () => {
    if (editingProjectId) {
      renameProject(editingProjectId, name);
      setEditingProjectId(null);
      setName('');
      setCreating(false);
      return;
    }
    const id = createProject(name);
    if (id && currentConversation) {
      assignConversationToProject(currentConversation.id, id);
    }
    setName('');
    setCreating(false);
  };

  const openCreateProject = () => {
    setEditingProjectId(null);
    setName('');
    setCreating(true);
  };

  const closeProjectEditor = () => {
    setCreating(false);
    setEditingProjectId(null);
    setName('');
  };

  return (
    <ChatShell>
      <ChatScreenHeader
        title="Projects"
        right={
          <Pressable
            accessibilityLabel="Create project"
            onPress={openCreateProject}
            className="size-10 items-center justify-center"
          >
            <ChatIcon name="add" size={24} />
          </Pressable>
        }
      />
      <ScrollView className="flex-1 bg-white dark:bg-neutral-900">
        <Text className="px-5 pb-2 pt-5 text-xs font-semibold uppercase tracking-[1.2px] text-neutral-500 dark:text-neutral-400">
          {currentConversation ? 'Move current chat to' : 'Your projects'}
        </Text>
        {currentConversation ? (
          <ProjectRow
            name="No project"
            count={conversations.filter((item) => !item.projectId).length}
            selected={!currentConversation.projectId}
            onPress={() =>
              assignConversationToProject(currentConversation.id, undefined)
            }
          />
        ) : null}
        {projects.map((project) => (
          <ProjectRow
            key={project.id}
            name={project.name}
            count={counts[project.id] ?? 0}
            selected={currentConversation?.projectId === project.id}
            onPress={
              currentConversation
                ? () =>
                    assignConversationToProject(
                      currentConversation.id,
                      project.id
                    )
                : undefined
            }
            onRename={() => {
              setEditingProjectId(project.id);
              setName(project.name);
              setCreating(true);
            }}
            onDelete={
              project.id === 'general'
                ? undefined
                : () =>
                    Alert.alert(
                      'Delete project',
                      `Delete "${project.name}"? Chats will be kept.`,
                      [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Delete',
                          style: 'destructive',
                          onPress: () => deleteProject(project.id),
                        },
                      ]
                    )
            }
          />
        ))}
        <Pressable
          onPress={openCreateProject}
          className="mx-5 mt-4 flex-row items-center justify-center rounded-xl border border-dashed border-neutral-300 py-3 dark:border-neutral-700"
        >
          <ChatIcon name="add" size={18} muted />
          <Text className="ml-2 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            New project
          </Text>
        </Pressable>
      </ScrollView>
      <Modal
        visible={creating}
        transparent
        animationType="fade"
        onRequestClose={closeProjectEditor}
      >
        <View className="flex-1 items-center justify-center bg-black/30 px-6">
          <View className="w-full max-w-md rounded-2xl bg-white p-5 dark:bg-neutral-800">
            <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
              {editingProjectId ? 'Rename project' : 'New project'}
            </Text>
            <TextInput
              autoFocus
              value={name}
              onChangeText={setName}
              onSubmitEditing={saveProject}
              placeholder="Project name"
              className="mt-4 h-12 rounded-xl bg-neutral-100 px-4 text-base text-neutral-900 dark:bg-neutral-700 dark:text-white"
            />
            <View className="mt-4 flex-row justify-end gap-2">
              <Pressable
                onPress={closeProjectEditor}
                className="rounded-lg px-4 py-2.5"
              >
                <Text className="text-neutral-600 dark:text-neutral-300">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                disabled={!name.trim()}
                onPress={saveProject}
                className="rounded-lg bg-neutral-900 px-4 py-2.5 disabled:opacity-40 dark:bg-white"
              >
                <Text className="font-medium text-white dark:text-neutral-900">
                  {editingProjectId ? 'Save' : 'Create'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ChatShell>
  );
}

function ProjectRow({
  name,
  count,
  selected,
  onPress,
  onRename,
  onDelete,
}: {
  name: string;
  count: number;
  selected: boolean;
  onPress?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-5 py-3.5 active:bg-neutral-100 dark:active:bg-neutral-800"
    >
      <View className="size-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <ChatIcon name="folder-outline" size={20} muted />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-[16px] text-neutral-900 dark:text-white">
          {name}
        </Text>
        <Text className="text-xs text-neutral-500">
          {count} {count === 1 ? 'chat' : 'chats'}
        </Text>
      </View>
      {selected ? <ChatIcon name="checkmark" size={20} /> : null}
      {onRename ? (
        <Pressable
          accessibilityLabel={`Rename ${name}`}
          onPress={onRename}
          className="ml-2 size-9 items-center justify-center"
        >
          <ChatIcon name="pencil-outline" size={18} muted />
        </Pressable>
      ) : null}
      {onDelete ? (
        <Pressable
          accessibilityLabel={`Delete ${name}`}
          onPress={onDelete}
          className="ml-2 size-9 items-center justify-center"
        >
          <ChatIcon name="trash-outline" size={18} danger />
        </Pressable>
      ) : null}
    </Pressable>
  );
}
