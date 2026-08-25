export type ChatAttachment = {
  id: string;
  name: string;
  mediaType: string;
  url: string;
  size?: number;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: ChatAttachment[];
};

export type ChatConversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  starred: boolean;
  archived: boolean;
  createdAt: number;
  updatedAt: number;
  projectId?: string;
};

export type ChatProject = {
  id: string;
  name: string;
};
