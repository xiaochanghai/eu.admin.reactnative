import { Ionicons } from '@expo/vector-icons';
import { LegendList, type LegendListRef } from '@legendapp/list';
import { MotiView } from 'moti';
import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Pressable, Text, View } from 'react-native';

import colors from '@/components/ui/colors';

import type { ChatMessage } from '../chat-context';

export function ConversationEmptyState() {
  return (
    <MotiView
      pointerEvents="none"
      className="absolute inset-0 items-center justify-center px-6 pb-24"
      from={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 320 }}
    >
      <Text className="text-center text-3xl font-semibold tracking-[-0.6px] text-neutral-900 dark:text-white">
        How can I help you today?
      </Text>
      <Text className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Send a message to get started
      </Text>
    </MotiView>
  );
}

export function Conversation({
  messages,
  renderMessage,
  children,
}: {
  messages: ChatMessage[];
  renderMessage: (message: ChatMessage) => ReactNode;
  children: ReactNode;
}) {
  const listRef = useRef<LegendListRef>(null);
  const atBottomRef = useRef(true);
  const lastContentHeightRef = useRef(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = useCallback(() => {
    atBottomRef.current = true;
    setShowScrollButton(false);
    listRef.current?.scrollToEnd({ animated: true });
  }, []);

  useEffect(() => {
    if (!atBottomRef.current) return;
    requestAnimationFrame(scrollToBottom);
  }, [messages, scrollToBottom]);

  return (
    <View className="relative flex-1 bg-white dark:bg-neutral-900">
      {messages.length === 0 ? <ConversationEmptyState /> : null}
      <LegendList
        ref={listRef}
        data={messages}
        renderItem={({ item }) => renderMessage(item)}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{
          width: '100%',
          maxWidth: 820,
          alignSelf: 'center',
          paddingHorizontal: 20,
          paddingBottom: 12,
          paddingTop: 28,
        }}
        keyboardShouldPersistTaps="handled"
        estimatedItemSize={96}
        onContentSizeChange={(_width, height) => {
          const heightIncreased = height > lastContentHeightRef.current;
          lastContentHeightRef.current = height;
          if (heightIncreased && atBottomRef.current) {
            requestAnimationFrame(scrollToBottom);
          }
        }}
        onScroll={(event) => {
          const { contentOffset, contentSize, layoutMeasurement } =
            event.nativeEvent;
          const distance =
            contentSize.height - layoutMeasurement.height - contentOffset.y;
          const atBottom = distance < 64;
          atBottomRef.current = atBottom;
          setShowScrollButton(!atBottom && contentSize.height > 0);
        }}
        scrollEventThrottle={16}
      />
      {showScrollButton ? (
        <MotiView
          from={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2"
        >
          <Pressable
            accessibilityLabel="Scroll to bottom"
            onPress={scrollToBottom}
            className="size-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            <Ionicons
              name="chevron-down"
              size={19}
              color={colors.neutral[500]}
            />
          </Pressable>
        </MotiView>
      ) : null}
      {children}
    </View>
  );
}
