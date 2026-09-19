import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type FileUIPart, type UIMessage } from 'ai';
import * as Haptics from 'expo-haptics';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getToken } from '@/lib/auth/utils';
import { generateUUID } from '@/lib/utils';

import { loadChatPreferences } from './chat-preferences';
import { loadChatState, saveChatState } from './chat-storage';
import {
  createStreamingStore,
  type StreamingStore,
} from './components/streaming-store';
import { CHAT_MODELS, type ChatModel, MOCK_RESPONSES } from './data';
import type {
  ChatAttachment,
  ChatConversation,
  ChatMessage,
  ChatProject,
} from './types';

type ChatContextValue = {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  pendingAttachments: ChatAttachment[];
  addAttachments: (attachments: ChatAttachment[]) => void;
  removeAttachment: (id: string) => void;
  clearAttachments: () => void;
  isGenerating: boolean;
  sendMessage: () => Promise<void>;
  stopGenerating: () => void;
  startNewChat: () => void;
  error: Error | null;
  clearError: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  models: ChatModel[];
  selectedModel: ChatModel;
  selectModel: (id: string) => void;
  extendedThinking: boolean;
  setExtendedThinking: (value: boolean) => void;
  streamingStore: StreamingStore;
  conversations: ChatConversation[];
  currentConversation: ChatConversation | null;
  openConversation: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  toggleStarConversation: (id: string) => void;
  archiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  projects: ChatProject[];
  createProject: (name: string) => string;
  renameProject: (id: string, name: string) => void;
  deleteProject: (id: string) => void;
  assignConversationToProject: (
    conversationId: string,
    projectId?: string
  ) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);
const USE_MOCK = process.env.EXPO_PUBLIC_MOCK_AI === '1';
const wait = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

function messageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

function messageAttachments(message: UIMessage): ChatAttachment[] {
  return message.parts.flatMap((part, index) =>
    part.type === 'file'
      ? [
          {
            id: `${message.id}-file-${index}`,
            name: part.filename ?? `Attachment ${index + 1}`,
            mediaType: part.mediaType,
            url: part.url,
          },
        ]
      : []
  );
}

function toUIMessage(message: ChatMessage): UIMessage {
  return {
    id: message.id,
    role: message.role,
    parts: [
      { type: 'text', text: message.content },
      ...(message.attachments ?? []).map(
        (attachment): FileUIPart => ({
          type: 'file',
          filename: attachment.name,
          mediaType: attachment.mediaType,
          url: attachment.url,
        })
      ),
    ],
  };
}

function titleFromPrompt(prompt: string, attachments: ChatAttachment[]) {
  const value = prompt.trim() || attachments[0]?.name || 'New chat';
  return value.length > 52 ? `${value.slice(0, 49)}…` : value;
}

export function ChatWorkspaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [input, setInput] = useState('');
  const [pendingAttachments, setPendingAttachments] = useState<
    ChatAttachment[]
  >([]);
  const [mockMessages, setMockMessages] = useState<ChatMessage[]>([]);
  const [mockGenerating, setMockGenerating] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('sonnet-4.6');
  const [extendedThinking, setExtendedThinking] = useState(true);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [projects, setProjects] = useState<ChatProject[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [hydrated, setHydrated] = useState(false);
  const responseIndex = useRef(0);
  const mockAbortRef = useRef<AbortController | null>(null);
  const hydratedRef = useRef(false);
  const streamingStore = useMemo(() => createStreamingStore(), []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: process.env.EXPO_PUBLIC_CHAT_API_URL ?? '/api/chat',
        headers: (): Record<string, string> => {
          const accessToken = getToken()?.access;
          return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
        },
      }),
    []
  );
  const ai = useChat({
    transport,
    experimental_throttle: 32,
  });

  const selectedModel =
    CHAT_MODELS.find((model) => model.id === selectedModelId) ?? CHAT_MODELS[1];
  const aiGenerating = ai.status === 'submitted' || ai.status === 'streaming';
  const aiMessages = useMemo<ChatMessage[]>(() => {
    const lastMessageIndex = ai.messages.length - 1;
    return ai.messages.map((message, index) => ({
      id: message.id,
      role: message.role === 'user' ? 'user' : 'assistant',
      content:
        aiGenerating && index === lastMessageIndex && message.role !== 'user'
          ? ''
          : messageText(message),
      attachments: messageAttachments(message),
    }));
  }, [ai.messages, aiGenerating]);
  const messages = USE_MOCK ? mockMessages : aiMessages;
  const isGenerating = USE_MOCK ? mockGenerating : aiGenerating;
  const currentConversation =
    conversations.find((item) => item.id === currentConversationId) ?? null;

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const saved = loadChatState();
    setConversations(saved.conversations);
    setProjects(
      saved.projects.length
        ? saved.projects
        : [{ id: 'general', name: 'General' }]
    );
    const active = saved.conversations.find(
      (item) => item.id === saved.currentConversationId
    );
    if (active) {
      setCurrentConversationId(active.id);
      if (USE_MOCK) setMockMessages(active.messages);
      else ai.setMessages(active.messages.map(toUIMessage));
    }
    setHydrated(true);
  }, [ai]);

  useEffect(() => {
    if (!hydrated) return;
    saveChatState({ conversations, projects, currentConversationId });
  }, [conversations, currentConversationId, hydrated, projects]);

  useEffect(() => {
    if (!hydrated || !currentConversationId) return;
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === currentConversationId
          ? { ...conversation, messages, updatedAt: Date.now() }
          : conversation
      )
    );
  }, [currentConversationId, hydrated, messages]);

  useEffect(() => {
    if (USE_MOCK) return;
    if (!aiGenerating) {
      streamingStore.set('');
      return;
    }
    const lastMessage = ai.messages[ai.messages.length - 1];
    streamingStore.set(
      lastMessage?.role === 'assistant' ? messageText(lastMessage) : ''
    );
  }, [ai.messages, aiGenerating, streamingStore]);

  const addAttachments = useCallback((attachments: ChatAttachment[]) => {
    setPendingAttachments((current) => {
      const ids = new Set(current.map((attachment) => attachment.id));
      return [
        ...current,
        ...attachments.filter((attachment) => !ids.has(attachment.id)),
      ].slice(0, 4);
    });
  }, []);

  const removeAttachment = useCallback((id: string) => {
    setPendingAttachments((current) =>
      current.filter((attachment) => attachment.id !== id)
    );
  }, []);

  const sendMockMessage = useCallback(
    async (prompt: string, attachments: ChatAttachment[]) => {
      const controller = new AbortController();
      mockAbortRef.current = controller;
      const stamp = Date.now();
      const assistantId = `${stamp + 1}`;
      setMockMessages((current) => [
        ...current,
        {
          id: `${stamp}`,
          role: 'user',
          content: prompt,
          attachments,
        },
        { id: assistantId, role: 'assistant', content: '' },
      ]);
      setMockGenerating(true);
      streamingStore.set('');

      const response =
        MOCK_RESPONSES[responseIndex.current % MOCK_RESPONSES.length];
      responseIndex.current += 1;
      let streamed = '';

      try {
        for (const token of response.split(/(?<=\s)/)) {
          if (controller.signal.aborted) break;
          await wait(30 + Math.random() * 40);
          if (controller.signal.aborted) break;
          streamed += token;
          streamingStore.set(streamed);
        }
      } finally {
        setMockMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? { ...message, content: streamed }
              : message
          )
        );
        streamingStore.set('');
        if (mockAbortRef.current === controller) mockAbortRef.current = null;
        setMockGenerating(false);
      }
    },
    [streamingStore]
  );

  const stopGenerating = useCallback(() => {
    if (USE_MOCK) {
      mockAbortRef.current?.abort();
      mockAbortRef.current = null;
      setMockGenerating(false);
      return;
    }
    ai.stop();
  }, [ai]);

  const sendMessage = useCallback(async () => {
    const prompt = input.trim();
    const attachments = pendingAttachments;
    if ((!prompt && attachments.length === 0) || isGenerating) return;

    let conversationId = currentConversationId;
    if (!conversationId) {
      conversationId = generateUUID();
      const now = Date.now();
      setConversations((current) => [
        {
          id: conversationId as string,
          title: titleFromPrompt(prompt, attachments),
          messages: [],
          starred: false,
          archived: false,
          createdAt: now,
          updatedAt: now,
        },
        ...current,
      ]);
      setCurrentConversationId(conversationId);
    }

    const effectivePrompt =
      prompt ||
      'Please analyze the attached file and summarize the key points.';
    setInput('');
    setPendingAttachments([]);
    const hapticsEnabled = loadChatPreferences().hapticsEnabled;
    if (hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }

    if (USE_MOCK) {
      await sendMockMessage(effectivePrompt, attachments);
    } else {
      await ai.sendMessage(
        {
          text: effectivePrompt,
          files: attachments.map(
            (attachment): FileUIPart => ({
              type: 'file',
              filename: attachment.name,
              mediaType: attachment.mediaType,
              url: attachment.url,
            })
          ),
        },
        {
          body: { model: selectedModelId, extendedThinking },
        }
      );
    }

    if (hapticsEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {}
      );
    }
  }, [
    ai,
    currentConversationId,
    extendedThinking,
    input,
    isGenerating,
    pendingAttachments,
    selectedModelId,
    sendMockMessage,
  ]);

  const startNewChat = useCallback(() => {
    mockAbortRef.current?.abort();
    mockAbortRef.current = null;
    setMockMessages([]);
    setMockGenerating(false);
    streamingStore.set('');
    ai.setMessages([]);
    setCurrentConversationId(null);
    setInput('');
    setPendingAttachments([]);
    setDrawerOpen(false);
    ai.clearError();
  }, [ai, streamingStore]);

  const openConversation = useCallback(
    (id: string) => {
      const conversation = conversations.find((item) => item.id === id);
      if (!conversation) return;
      mockAbortRef.current?.abort();
      setCurrentConversationId(id);
      if (USE_MOCK) setMockMessages(conversation.messages);
      else ai.setMessages(conversation.messages.map(toUIMessage));
      setPendingAttachments([]);
      setDrawerOpen(false);
      ai.clearError();
    },
    [ai, conversations]
  );

  const renameConversation = useCallback((id: string, title: string) => {
    const value = title.trim();
    if (!value) return;
    setConversations((current) =>
      current.map((item) =>
        item.id === id ? { ...item, title: value, updatedAt: Date.now() } : item
      )
    );
  }, []);

  const toggleStarConversation = useCallback((id: string) => {
    setConversations((current) =>
      current.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    );
  }, []);

  const archiveConversation = useCallback(
    (id: string) => {
      setConversations((current) =>
        current.map((item) =>
          item.id === id ? { ...item, archived: !item.archived } : item
        )
      );
      if (id === currentConversationId) startNewChat();
    },
    [currentConversationId, startNewChat]
  );

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((current) =>
        current.filter((conversation) => conversation.id !== id)
      );
      if (id === currentConversationId) startNewChat();
    },
    [currentConversationId, startNewChat]
  );

  const createProject = useCallback((name: string) => {
    const value = name.trim();
    if (!value) return '';
    const id = generateUUID();
    setProjects((current) => [...current, { id, name: value }]);
    return id;
  }, []);

  const renameProject = useCallback((id: string, name: string) => {
    const value = name.trim();
    if (!value) return;
    setProjects((current) =>
      current.map((project) =>
        project.id === id ? { ...project, name: value } : project
      )
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    if (id === 'general') return;
    setProjects((current) => current.filter((project) => project.id !== id));
    setConversations((current) =>
      current.map((conversation) =>
        conversation.projectId === id
          ? { ...conversation, projectId: undefined }
          : conversation
      )
    );
  }, []);

  const assignConversationToProject = useCallback(
    (conversationId: string, projectId?: string) => {
      setConversations((current) =>
        current.map((item) =>
          item.id === conversationId
            ? { ...item, projectId, updatedAt: Date.now() }
            : item
        )
      );
    },
    []
  );

  const value = useMemo<ChatContextValue>(
    () => ({
      messages,
      input,
      setInput,
      pendingAttachments,
      addAttachments,
      removeAttachment,
      clearAttachments: () => setPendingAttachments([]),
      isGenerating,
      sendMessage,
      stopGenerating,
      startNewChat,
      error: ai.error ?? null,
      clearError: ai.clearError,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      models: CHAT_MODELS,
      selectedModel,
      selectModel: setSelectedModelId,
      extendedThinking,
      setExtendedThinking,
      streamingStore,
      conversations,
      currentConversation,
      openConversation,
      renameConversation,
      toggleStarConversation,
      archiveConversation,
      deleteConversation,
      projects,
      createProject,
      renameProject,
      deleteProject,
      assignConversationToProject,
    }),
    [
      addAttachments,
      ai,
      archiveConversation,
      assignConversationToProject,
      conversations,
      createProject,
      currentConversation,
      deleteConversation,
      deleteProject,
      drawerOpen,
      extendedThinking,
      input,
      isGenerating,
      messages,
      openConversation,
      pendingAttachments,
      projects,
      removeAttachment,
      renameProject,
      renameConversation,
      selectedModel,
      sendMessage,
      startNewChat,
      stopGenerating,
      streamingStore,
      toggleStarConversation,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatWorkspace() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error(
      'useChatWorkspace must be used inside ChatWorkspaceProvider'
    );
  }
  return context;
}

export type { ChatAttachment, ChatConversation, ChatMessage, ChatProject };
