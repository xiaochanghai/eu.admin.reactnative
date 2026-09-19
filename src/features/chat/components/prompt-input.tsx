import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import colors from '@/components/ui/colors';
import { useAppColorScheme } from '@/lib/hooks';

import { useChatWorkspace } from '../chat-context';
import { PendingAttachments } from './attachments';
import { TouchableGlass } from './touchable-glass';

export function PromptInput() {
  const router = useRouter();
  const { isDark } = useAppColorScheme();
  const {
    input,
    setInput,
    sendMessage,
    stopGenerating,
    isGenerating,
    selectedModel,
    pendingAttachments,
    removeAttachment,
    error,
    clearError,
  } = useChatWorkspace();
  const hasContent = input.trim().length > 0 || pendingAttachments.length > 0;

  return (
    <View className="w-full max-w-[820px] self-center px-3 pb-3 md:px-5 md:pb-5">
      {error ? (
        <Pressable
          accessibilityLabel="Dismiss error"
          onPress={clearError}
          className="mb-2 flex-row items-center rounded-xl bg-red-50 px-3 py-2.5 dark:bg-red-950/40"
        >
          <View className="mr-2 size-2 rounded-full bg-red-500" />
          <Text
            numberOfLines={2}
            className="flex-1 text-xs text-red-700 dark:text-red-300"
          >
            {error.message || 'Something went wrong'}
          </Text>
          <Ionicons name="close" size={16} color={colors.danger[500]} />
        </Pressable>
      ) : null}
      <TouchableGlass
        style={{
          borderRadius: 26,
          borderWidth: 1,
          borderColor: isDark ? colors.neutral[700] : colors.neutral[200],
        }}
      >
        <View className="px-3 py-2">
          <PendingAttachments
            attachments={pendingAttachments}
            onRemove={removeAttachment}
          />
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Chat with Agent..."
            placeholderTextColor={colors.neutral[500]}
            multiline
            maxLength={4000}
            className="max-h-40 min-h-14 p-2 text-[15px] leading-6 text-neutral-900 dark:text-white"
            style={{ textAlignVertical: 'top' }}
          />
          <View className="flex-row items-center">
            <Pressable
              accessibilityLabel="Add attachment"
              onPress={() => router.push('/(chat)/attachments' as never)}
              className="size-9 items-center justify-center rounded-xl active:bg-neutral-100 dark:active:bg-neutral-700"
            >
              <Ionicons
                name="add"
                size={23}
                color={colors.neutral[isDark ? 300 : 700]}
              />
            </Pressable>
            <Pressable
              onPress={() => router.push('/(chat)/model-picker' as never)}
              className="ml-1 rounded-xl p-2 active:bg-neutral-100 dark:active:bg-neutral-700"
            >
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">
                {selectedModel.label}
              </Text>
            </Pressable>
            <View className="flex-1" />
            <Pressable
              accessibilityLabel={
                isGenerating ? 'Stop generating' : 'Send message'
              }
              onPress={isGenerating ? stopGenerating : sendMessage}
              disabled={!isGenerating && !hasContent}
              className={`size-9 items-center justify-center rounded-full ${
                !isGenerating && !hasContent
                  ? 'bg-neutral-200 dark:bg-neutral-700'
                  : 'bg-neutral-900 active:opacity-70 dark:bg-white'
              }`}
            >
              {isGenerating ? (
                <View className="size-3 rounded-[3px] bg-white dark:bg-neutral-900" />
              ) : (
                <Ionicons
                  name="arrow-up"
                  size={19}
                  color={
                    !hasContent
                      ? colors.neutral[500]
                      : isDark
                        ? colors.neutral[900]
                        : '#fff'
                  }
                />
              )}
            </Pressable>
          </View>
        </View>
      </TouchableGlass>
    </View>
  );
}
