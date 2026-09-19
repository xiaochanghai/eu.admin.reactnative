import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import {
  type ChatMessage,
  ChatMessageView,
  ChatShell,
  Conversation,
  MainHeader,
  PromptInput,
  useChatWorkspace,
} from '@/features/chat';

export default function ChatScreen() {
  const { messages, isGenerating, streamingStore } = useChatWorkspace();
  const renderMessage = useCallback(
    (message: ChatMessage) => (
      <ChatMessageView
        message={message}
        isGenerating={
          isGenerating && message.id === messages[messages.length - 1]?.id
        }
        streamingStore={streamingStore}
      />
    ),
    [isGenerating, messages, streamingStore]
  );

  return (
    <ChatShell>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <MainHeader />
        <Conversation messages={messages} renderMessage={renderMessage}>
          <PromptInput />
        </Conversation>
      </KeyboardAvoidingView>
    </ChatShell>
  );
}
