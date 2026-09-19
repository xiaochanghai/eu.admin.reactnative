import { describe, expect, it, jest } from '@jest/globals';

import { type PersistedChatState, sanitizeChatState } from './chat-storage';

jest.mock('@/lib/storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('chat history persistence', () => {
  it('does not persist base64 attachment payloads', () => {
    const state: PersistedChatState = {
      conversations: [
        {
          id: 'conversation-1',
          title: 'Attachment chat',
          starred: false,
          archived: false,
          createdAt: 1,
          updatedAt: 1,
          messages: [
            {
              id: 'message-1',
              role: 'user',
              content: 'Review this file',
              attachments: [
                {
                  id: 'attachment-1',
                  name: 'large.pdf',
                  mediaType: 'application/pdf',
                  url: 'data:application/pdf;base64,AAAA',
                  size: 3,
                },
              ],
            },
          ],
        },
      ],
      projects: [{ id: 'general', name: 'General' }],
      currentConversationId: 'conversation-1',
    };

    const sanitized = sanitizeChatState(state);

    expect(sanitized.conversations[0].messages[0].attachments).toBeUndefined();
    expect(state.conversations[0].messages[0].attachments).toHaveLength(1);
  });
});
