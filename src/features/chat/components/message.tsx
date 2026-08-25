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
      from={{ opacity: 0, translateY: 6 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 180 }}
      className={assistant ? 'mb-6' : 'mb-6 items-end'}
    >
      <View
        className={
          assistant
            ? 'w-full'
            : 'max-w-[86%] rounded-3xl rounded-br-lg bg-neutral-100 px-4 py-3 dark:bg-neutral-800'
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
