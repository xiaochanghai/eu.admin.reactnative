import { getItem, setItem } from '@/lib/storage';

import type { ChatConversation, ChatProject } from './types';

const CHAT_STATE_KEY = 'eucloud/chat-workspace/v1';

export type PersistedChatState = {
  conversations: ChatConversation[];
  projects: ChatProject[];
  currentConversationId: string | null;
};

const EMPTY_STATE: PersistedChatState = {
  conversations: [],
  projects: [{ id: 'general', name: 'General' }],
  currentConversationId: null,
};

export function loadChatState(): PersistedChatState {
  try {
    const state = getItem<PersistedChatState>(CHAT_STATE_KEY);
    if (!state || !Array.isArray(state.conversations)) return EMPTY_STATE;
    const normalized = sanitizeChatState({
      conversations: state.conversations,
      projects: Array.isArray(state.projects) ? state.projects : [],
      currentConversationId: state.currentConversationId ?? null,
    });
    if (hasPersistedAttachments(state)) {
      setItem(CHAT_STATE_KEY, normalized);
    }
    return normalized;
  } catch {
    return EMPTY_STATE;
  }
}

export function saveChatState(state: PersistedChatState) {
  try {
    setItem(CHAT_STATE_KEY, sanitizeChatState(state));
  } catch (error) {
    // Web storage can reject large attachment payloads. Keep the live chat usable
    // and report the persistence failure without crashing the application.
    console.warn('Unable to persist chat workspace', error);
  }
}

export function sanitizeChatState(
  state: PersistedChatState
): PersistedChatState {
  return {
    ...state,
    conversations: state.conversations.map((conversation) => ({
      ...conversation,
      messages: conversation.messages.map((message) => {
        const persisted = { ...message };
        delete persisted.attachments;
        return persisted;
      }),
    })),
  };
}

function hasPersistedAttachments(state: PersistedChatState) {
  return state.conversations.some((conversation) =>
    conversation.messages.some(
      (message) => message.attachments && message.attachments.length > 0
    )
  );
}
