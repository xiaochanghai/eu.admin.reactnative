import { type ChatMode, type SystemPrompt } from './chat-types';

export type RouteParamList = {
  Bedrock: {
    sessionId?: number;
    tapIndex?: number;
    mode?: ChatMode;
  };
  Settings: NonNullable<unknown>;
  TokenUsage: NonNullable<unknown>;
  Prompt: {
    prompt?: SystemPrompt;
  };
};
