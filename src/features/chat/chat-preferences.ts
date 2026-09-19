import { getItem, setItem } from '@/lib/storage';

const CHAT_PREFERENCES_KEY = 'eucloud/chat-preferences/v1';

export type ToolAccessMode = 'auto' | 'on-demand' | 'always';

export type ChatProfilePreferences = {
  fullName: string;
  nickname: string;
  personalPreferences: string;
};

export type ChatCapabilitiesPreferences = {
  artifacts: boolean;
  code: boolean;
  web: boolean;
  searchChats: boolean;
  memory: boolean;
  toolAccess: ToolAccessMode;
};

export type ChatPreferences = {
  profile: ChatProfilePreferences;
  capabilities: ChatCapabilitiesPreferences;
  hapticsEnabled: boolean;
};

export const DEFAULT_CHAT_PREFERENCES: ChatPreferences = {
  profile: {
    fullName: 'EU Cloud User',
    nickname: 'EU User',
    personalPreferences: "I'm a product builder and software developer.",
  },
  capabilities: {
    artifacts: true,
    code: true,
    web: true,
    searchChats: true,
    memory: true,
    toolAccess: 'auto',
  },
  hapticsEnabled: true,
};

export function loadChatPreferences(): ChatPreferences {
  try {
    const stored = getItem<Partial<ChatPreferences>>(CHAT_PREFERENCES_KEY);
    return {
      ...DEFAULT_CHAT_PREFERENCES,
      ...stored,
      profile: {
        ...DEFAULT_CHAT_PREFERENCES.profile,
        ...stored?.profile,
      },
      capabilities: {
        ...DEFAULT_CHAT_PREFERENCES.capabilities,
        ...stored?.capabilities,
      },
    };
  } catch {
    return DEFAULT_CHAT_PREFERENCES;
  }
}

export function updateChatPreferences(
  update: Partial<ChatPreferences>
): ChatPreferences {
  const current = loadChatPreferences();
  const next = {
    ...current,
    ...update,
    profile: update.profile ?? current.profile,
    capabilities: update.capabilities ?? current.capabilities,
  };
  setItem(CHAT_PREFERENCES_KEY, next);
  return next;
}
