import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import type { ComponentProps, ReactNode } from 'react';
import React, { useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LogoutConfirmModal from '@/app/settings/components/logout-confirm-modal';
import colors from '@/components/ui/colors';
import { useAppColorScheme } from '@/lib/hooks';

import { useChatWorkspace } from './chat-context';
import {
  AccountDropdown,
  ChatRowContextMenu,
  RailTooltip,
} from './chat-web-menus';
import { DrawerLayout } from './components/drawer-layout';

type IconName = ComponentProps<typeof Ionicons>['name'];

export function ChatIcon({
  name,
  size = 20,
  muted = false,
  danger = false,
}: {
  name: IconName;
  size?: number;
  muted?: boolean;
  danger?: boolean;
}) {
  const { isDark } = useAppColorScheme();
  const color = danger
    ? colors.danger[500]
    : muted
      ? colors.neutral[isDark ? 400 : 500]
      : colors.neutral[isDark ? 100 : 900];
  return <Ionicons name={name} size={size} color={color} />;
}

function SidebarContent({
  collapsed = false,
  onCollapse,
}: {
  collapsed?: boolean;
  onCollapse?: () => void;
}) {
  const { isDark } = useAppColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const {
    archiveConversation,
    closeDrawer,
    conversations,
    currentConversation,
    deleteConversation,
    openConversation,
    renameConversation,
    startNewChat,
    toggleStarConversation,
  } = useChatWorkspace();
  const recentChats = useMemo(
    () =>
      conversations
        .filter((chat) => !chat.archived)
        .sort((left, right) => right.updatedAt - left.updatedAt)
        .slice(0, 12),
    [conversations]
  );

  const navigate = (href: string) => {
    closeDrawer();
    router.push(href as never);
  };

  const newChat = () => {
    startNewChat();
    router.replace('/(chat)' as never);
  };

  if (collapsed) {
    return (
      <SafeAreaView
        className="flex-1 items-center bg-neutral-100 py-2 dark:bg-neutral-800"
        edges={['top', 'bottom', 'left']}
      >
        <RailButton
          label="Expand sidebar"
          icon="menu-outline"
          onPress={onCollapse}
        />
        <RailButton label="New chat" icon="create-outline" onPress={newChat} />
        <RailButton
          label="Chats"
          icon="chatbubbles-outline"
          onPress={() => navigate('/(chat)/chats')}
        />
        <RailButton
          label="Projects"
          icon="folder-outline"
          onPress={() => navigate('/(chat)/projects')}
        />
        <RailButton
          label="Settings"
          icon="settings-outline"
          onPress={() => navigate('/(chat)/(settings)/settings')}
        />
        <View className="flex-1" />
        <RailButton
          label="Profile"
          icon="person-circle-outline"
          onPress={() => navigate('/(chat)/(settings)/profile')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-100 dark:bg-neutral-800"
      edges={['top', 'bottom', 'left']}
    >
      <View className="flex-row items-center px-4 pb-4 pt-2">
        <Text className="flex-1 text-[28px] font-bold text-neutral-900 dark:text-white">
          Chat
        </Text>
        {onCollapse && (
          <Pressable
            accessibilityLabel="Collapse sidebar"
            onPress={onCollapse}
            className="mr-1 size-9 items-center justify-center rounded-lg active:bg-neutral-200 dark:active:bg-neutral-700"
          >
            <ChatIcon name="chevron-back-outline" size={18} muted />
          </Pressable>
        )}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <SidebarLink
          label="Chats"
          icon="chatbubbles-outline"
          active={pathname.includes('chats')}
          onPress={() => navigate('/(chat)/chats')}
        />
        <SidebarLink
          label="Settings"
          icon="settings-outline"
          active={pathname.includes('settings')}
          onPress={() => navigate('/(chat)/(settings)/settings')}
        />
        <SidebarLink
          label="Projects"
          icon="folder-outline"
          active={pathname.includes('projects')}
          onPress={() => navigate('/(chat)/projects')}
        />

        <Text className="px-6 pb-2 pt-6 text-xs font-semibold uppercase tracking-[1.2px] text-neutral-500 dark:text-neutral-400">
          Recents
        </Text>
        {recentChats.map((chat) => (
          <ChatRowContextMenu
            key={chat.id}
            pinned={chat.starred}
            onPin={() => toggleStarConversation(chat.id)}
            onRename={() => {
              const title = globalThis.prompt?.('Rename chat', chat.title);
              if (!title?.trim()) return;
              renameConversation(chat.id, title);
            }}
            onShare={() => {
              void globalThis.navigator?.share?.({ title: chat.title });
            }}
            onArchive={() => archiveConversation(chat.id)}
            onDelete={() => {
              if (!globalThis.confirm?.(`Delete "${chat.title}"?`)) return;
              deleteConversation(chat.id);
            }}
          >
            <Pressable
              onPress={() => {
                openConversation(chat.id);
                navigate('/(chat)');
              }}
              className={`mx-2 rounded-xl px-4 py-2.5 hover:bg-neutral-200 active:bg-neutral-200 dark:hover:bg-neutral-700 dark:active:bg-neutral-700 ${
                currentConversation?.id === chat.id
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : ''
              }`}
            >
              <Text
                numberOfLines={1}
                className="text-[15px] text-neutral-700 dark:text-neutral-200"
              >
                {chat.title}
              </Text>
            </Pressable>
          </ChatRowContextMenu>
        ))}
      </ScrollView>

      <View className="flex-row items-center border-t border-neutral-200 px-3 py-2 dark:border-neutral-700">
        <AccountDropdown
          onProfile={() => navigate('/(chat)/(settings)/profile')}
          onSettings={() => navigate('/(chat)/(settings)/settings')}
          onLogout={() => setShowLogoutConfirm(true)}
        >
          <Pressable
            accessibilityLabel="Account menu"
            onPress={() => {
              if (Platform.OS !== 'web') setAccountMenuOpen(true);
            }}
            className="min-w-0 flex-1 flex-row items-center rounded-xl p-1 hover:opacity-70 active:opacity-60"
          >
            <View className="size-8 items-center justify-center rounded-full bg-neutral-300 dark:bg-neutral-600">
              <Text className="text-xs font-semibold text-neutral-900 dark:text-white">
                EU
              </Text>
            </View>
            <View className="ml-3 min-w-0 flex-1">
              <Text className="text-sm font-medium text-neutral-900 dark:text-white">
                EU Cloud User
              </Text>
            </View>
            <View className="size-9 items-center justify-center">
              <ChatIcon name="ellipsis-horizontal" size={18} muted />
            </View>
          </Pressable>
        </AccountDropdown>
        <Pressable
          accessibilityLabel="New chat"
          onPress={newChat}
          className="ml-2 size-10 items-center justify-center rounded-full bg-neutral-900 active:opacity-70 dark:bg-white"
        >
          <Ionicons
            name="create-outline"
            size={19}
            color={colors.neutral[isDark ? 900 : 50]}
          />
        </Pressable>
      </View>
      {Platform.OS !== 'web' && (
        <Modal
          visible={accountMenuOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setAccountMenuOpen(false)}
        >
          <Pressable
            onPress={() => setAccountMenuOpen(false)}
            className="flex-1 justify-end bg-black/30 p-4 md:items-start"
          >
            <View className="w-full max-w-[280px] overflow-hidden rounded-2xl bg-white py-1 shadow-lg dark:bg-neutral-800">
              <AccountAction
                icon="person-outline"
                label="Profile"
                onPress={() => {
                  setAccountMenuOpen(false);
                  navigate('/(chat)/(settings)/profile');
                }}
              />
              <AccountAction
                icon="settings-outline"
                label="Settings"
                onPress={() => {
                  setAccountMenuOpen(false);
                  navigate('/(chat)/(settings)/settings');
                }}
              />
              <View className="mx-3 h-px bg-neutral-200 dark:bg-neutral-700" />
              <AccountAction
                icon="log-out-outline"
                label="Sign out"
                danger
                onPress={() => {
                  setAccountMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
              />
            </View>
          </Pressable>
        </Modal>
      )}
      <LogoutConfirmModal
        visible={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
      />
    </SafeAreaView>
  );
}

function AccountAction({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: IconName;
  label: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-4 py-3 active:bg-neutral-100 dark:active:bg-neutral-700"
    >
      <ChatIcon name={icon} danger={danger} />
      <Text
        className={`ml-3 text-[15px] ${
          danger ? 'text-red-500' : 'text-neutral-900 dark:text-white'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function RailButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: IconName;
  onPress?: () => void;
}) {
  return (
    <RailTooltip label={label}>
      <Pressable
        accessibilityLabel={label}
        onPress={onPress}
        className="mb-1 size-10 items-center justify-center rounded-xl active:bg-neutral-200 dark:active:bg-neutral-700"
      >
        <ChatIcon name={icon} size={20} />
      </Pressable>
    </RailTooltip>
  );
}

function SidebarLink({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: IconName;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`mx-2 flex-row items-center rounded-xl px-4 py-3 active:bg-neutral-200 dark:active:bg-neutral-700 ${
        active ? 'bg-neutral-200 dark:bg-neutral-700' : ''
      }`}
    >
      <ChatIcon name={icon} size={19} />
      <Text className="ml-3 text-base text-neutral-900 dark:text-white">
        {label}
      </Text>
    </Pressable>
  );
}

export function ChatShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const desktop = width >= 900;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { drawerOpen, closeDrawer, openDrawer } = useChatWorkspace();

  if (!desktop) {
    return (
      <DrawerLayout
        open={drawerOpen}
        onOpen={openDrawer}
        onClose={closeDrawer}
        drawerContent={<SidebarContent />}
      >
        <View className="flex-1 overflow-hidden bg-white dark:bg-neutral-900">
          {children}
        </View>
      </DrawerLayout>
    );
  }

  return (
    <View className="flex-1 flex-row bg-neutral-100 dark:bg-neutral-800">
      <MotiView
        animate={{ width: sidebarCollapsed ? 52 : 280 }}
        transition={{ type: 'timing', duration: 260 }}
      >
        <SidebarContent
          collapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed((value) => !value)}
        />
      </MotiView>
      <View className="min-w-0 flex-1">
        {Platform.OS === 'web' && (
          <View className="h-14 flex-row items-center justify-end bg-neutral-100 px-3 dark:bg-neutral-800">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open EU Cloud"
              onPress={() => router.replace('/(app)' as never)}
              className="h-8 items-center justify-center rounded-lg bg-neutral-900 px-4 active:opacity-80 dark:bg-white"
            >
              <Text className="text-[13px] font-medium text-white dark:text-neutral-900">
                Launch now
              </Text>
            </Pressable>
          </View>
        )}
        <View className="min-h-0 flex-1 overflow-hidden bg-white dark:bg-neutral-900 md:rounded-tl-2xl md:border-l md:border-t md:border-neutral-200 dark:md:border-neutral-700">
          {children}
        </View>
      </View>
    </View>
  );
}

export function ChatHeader() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { openDrawer, selectedModel, extendedThinking } = useChatWorkspace();

  if (Platform.OS === 'web' && width >= 900) return null;

  return (
    <SafeAreaView edges={['top']} className="bg-white dark:bg-neutral-900">
      <View className="h-14 flex-row items-center px-3">
        <Pressable
          accessibilityLabel="Open drawer"
          onPress={openDrawer}
          className="size-10 items-center justify-center rounded-xl active:bg-neutral-100 dark:active:bg-neutral-800"
        >
          <ChatIcon name="menu-outline" size={24} />
        </Pressable>
        <Pressable
          onPress={() => router.push('/(chat)/model-picker' as never)}
          className="mx-auto items-center rounded-xl px-3 py-1 active:bg-neutral-100 dark:active:bg-neutral-800"
        >
          <View className="flex-row items-center">
            <Text className="text-base font-semibold text-neutral-900 dark:text-white">
              {selectedModel.label}
            </Text>
            <View className="ml-1">
              <ChatIcon name="chevron-down" size={14} />
            </View>
          </View>
          {extendedThinking && (
            <Text className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Extended
            </Text>
          )}
        </Pressable>
        <Pressable className="size-10 items-center justify-center rounded-xl active:bg-neutral-100 dark:active:bg-neutral-800">
          <ChatIcon name="glasses-outline" size={22} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export function ChatScreenHeader({
  title,
  right,
}: {
  title: string;
  right?: ReactNode;
}) {
  const router = useRouter();
  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(chat)' as never);
  };

  return (
    <SafeAreaView edges={['top']} className="bg-white dark:bg-neutral-900">
      <View className="h-14 flex-row items-center border-b border-neutral-100 px-3 dark:border-neutral-800">
        <Pressable
          onPress={goBack}
          className="size-10 items-center justify-center rounded-xl active:bg-neutral-100 dark:active:bg-neutral-800"
        >
          <ChatIcon name="chevron-back" size={24} />
        </Pressable>
        <Text className="flex-1 text-center text-[17px] font-semibold text-neutral-900 dark:text-white">
          {title}
        </Text>
        <View className="size-10 items-center justify-center">{right}</View>
      </View>
    </SafeAreaView>
  );
}

export function SectionDivider() {
  return <View className="mx-5 h-px bg-neutral-200 dark:bg-neutral-800" />;
}

export function SettingsRow({
  icon,
  label,
  detail,
  onPress,
  showChevron = false,
  danger,
  disabled = false,
}: {
  icon: IconName;
  label: string;
  detail?: string;
  onPress?: () => void;
  showChevron?: boolean;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className="flex-row items-center px-5 py-3.5 active:bg-neutral-100 disabled:opacity-50 dark:active:bg-neutral-800"
    >
      <ChatIcon name={icon} danger={danger} />
      <Text
        className={`ml-4 flex-1 text-[17px] ${
          danger ? 'text-red-500' : 'text-neutral-900 dark:text-neutral-100'
        }`}
      >
        {label}
      </Text>
      {detail && (
        <Text className="mr-2 text-[15px] text-neutral-500 dark:text-neutral-400">
          {detail}
        </Text>
      )}
      {!disabled && (onPress || showChevron) && (
        <ChatIcon name="chevron-forward" size={16} muted />
      )}
    </Pressable>
  );
}
