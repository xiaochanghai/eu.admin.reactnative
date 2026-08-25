import { LegendList, type LegendListRef } from '@legendapp/list';
import { MotiView } from 'moti';
import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from '@/components/ui/colors';

import type { ChatMessage } from '../chat-context';
import { SymbolImage } from './symbol-image';
import { TouchableGlass } from './touchable-glass';
import { KeyboardGestureArea } from './tw';

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
  const insets = useSafeAreaInsets();
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
    <View className="flex-1 bg-white dark:bg-neutral-900">
      {messages.length === 0 ? <ConversationEmptyState /> : null}
      <KeyboardGestureArea
        interpolator="ios"
        showOnSwipeUp
        enableSwipeToDismiss
        className="flex-1"
      >
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
            paddingBottom: Math.max(12, insets.bottom),
            paddingTop: 28,
          }}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          maintainVisibleContentPosition
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
      </KeyboardGestureArea>
      {showScrollButton ? (
        <MotiView
          from={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-24 right-5"
        >
          <TouchableGlass
            accessibilityLabel="Scroll to bottom"
            onPress={scrollToBottom}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          >
            <View className="flex-1 items-center justify-center">
              <SymbolImage
                name="chevron.down"
                fallback="chevron-down"
                size={18}
                color={colors.neutral[500]}
              />
            </View>
          </TouchableGlass>
        </MotiView>
      ) : null}
      {children}
    </View>
  );
}
