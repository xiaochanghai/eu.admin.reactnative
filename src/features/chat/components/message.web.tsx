import { MotiView } from 'moti';
import React from 'react';
import { Text, View } from 'react-native';

import type { ChatMessage } from '../chat-context';
import { ChatMarkdown } from '../markdown';
import { MessageAttachments } from './attachments';
import { StreamingMessage } from './streaming-message';
import type { StreamingStore } from './streaming-store';

export function ChatMessageView({
  message,
  isGenerating,
  streamingStore,
}: {
  message: ChatMessage;
  isGenerating: boolean;
  streamingStore: StreamingStore;
}) {
  const assistant = message.role === 'assistant';

  return (
    <MotiView
      from={{ opacity: 0, translateY: 5 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 180 }}
      className={assistant ? 'mb-7 flex-row' : 'mb-7 items-end'}
    >
      {assistant ? (
        <View className="mr-3 mt-0.5 size-8 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
          <Text className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-300">
            AI
          </Text>
        </View>
      ) : null}
      <View
        className={
          assistant
            ? 'min-w-0 flex-1 pt-1'
            : 'max-w-[82%] rounded-3xl rounded-br-lg bg-neutral-100 px-4 py-3 dark:bg-neutral-800'
        }
      >
        <MessageAttachments attachments={message.attachments} />
        {assistant ? (
          isGenerating && !message.content ? (
            <StreamingMessage store={streamingStore} />
          ) : (
            <ChatMarkdown>{message.content}</ChatMarkdown>
          )
        ) : (
          <Text
            selectable
            className="text-[15px] leading-6 text-neutral-900 dark:text-neutral-100"
          >
            {message.content}
          </Text>
        )}
      </View>
    </MotiView>
  );
}
