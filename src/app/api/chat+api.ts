import {
  anthropic,
  type AnthropicLanguageModelOptions,
} from '@ai-sdk/anthropic';
import { convertToModelMessages, streamText } from 'ai';

const MODEL_IDS = {
  'opus-4.6': 'claude-opus-4-6',
  'sonnet-4.6': 'claude-sonnet-4-6',
  'haiku-4.5': 'claude-haiku-4-5-20251001',
} as const;

const MAX_REQUEST_BYTES = 24 * 1024 * 1024;
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
const MAX_ATTACHMENTS_PER_MESSAGE = 4;
const AI_TIMEOUT_MS = 90_000;

type ChatModelId = keyof typeof MODEL_IDS;

export async function POST(request: Request) {
  const authentication = await authenticateRequest(request);
  if (!authentication.ok) return authentication.response;

  const parsedBody = await readJsonBody(request);
  if (!parsedBody.ok) return parsedBody.response;
  const body = parsedBody.value;

  if (!isChatRequest(body)) {
    return Response.json({ error: 'Invalid chat request' }, { status: 400 });
  }
  if (!isChatModelId(body.model)) {
    return Response.json({ error: 'Unsupported model' }, { status: 400 });
  }
  if (body.messages.length > 100) {
    return Response.json({ error: 'Too many messages' }, { status: 413 });
  }
  const attachmentError = validateAttachments(body.messages);
  if (attachmentError) return attachmentError;

  const { messages, model, extendedThinking } = body;
  const modelId = MODEL_IDS[model];
  let modelMessages: Awaited<ReturnType<typeof convertToModelMessages>>;
  try {
    modelMessages = await convertToModelMessages(messages);
  } catch {
    return Response.json({ error: 'Invalid message payload' }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error:
          'ANTHROPIC_API_KEY is not configured on the Expo server. Set it before starting Web.',
      },
      { status: 503 }
    );
  }

  const result = streamText({
    model: anthropic(modelId),
    messages: modelMessages,
    maxOutputTokens: 8192,
    abortSignal: AbortSignal.any([
      request.signal,
      AbortSignal.timeout(AI_TIMEOUT_MS),
    ]),
    providerOptions: extendedThinking
      ? {
          anthropic: {
            thinking: modelId.endsWith('4-6')
              ? { type: 'adaptive' }
              : { type: 'enabled', budgetTokens: 4096 },
          } satisfies AnthropicLanguageModelOptions,
        }
      : undefined,
  });

  return result.toUIMessageStreamResponse({
    onError: formatError,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

type AuthenticationResult =
  | { ok: true; userId: string }
  | { ok: false; response: Response };

async function authenticateRequest(
  request: Request
): Promise<AuthenticationResult> {
  const authorization = request.headers.get('authorization');
  if (!authorization?.match(/^Bearer\s+\S+$/i)) {
    return {
      ok: false,
      response: authError('Authentication required', 401),
    };
  }

  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    return {
      ok: false,
      response: authError('Authentication service is not configured', 503),
    };
  }

  try {
    const response = await fetch(
      new URL('/api/Authorize/CurrentUser', apiUrl),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: authorization,
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      }
    );
    if (!response.ok) {
      return {
        ok: false,
        response: authError('Invalid or expired access token', 401),
      };
    }

    const result = (await response.json()) as Record<string, unknown>;
    const user = result.Data as Record<string, unknown> | undefined;
    const userId = user?.UserId;
    if (
      result.Status !== 200 ||
      result.Success !== true ||
      typeof userId !== 'string' ||
      !userId
    ) {
      return {
        ok: false,
        response: authError('Invalid or expired access token', 401),
      };
    }
    return { ok: true, userId };
  } catch {
    return {
      ok: false,
      response: authError('Unable to verify access token', 503),
    };
  }
}

function authError(error: string, status: 401 | 503) {
  const headers: Record<string, string> = { 'Cache-Control': 'no-store' };
  if (status === 401) headers['WWW-Authenticate'] = 'Bearer';
  return Response.json(
    { error },
    {
      status,
      headers,
    }
  );
}

type JsonBodyResult =
  | { ok: true; value: unknown }
  | { ok: false; response: Response };

async function readJsonBody(request: Request): Promise<JsonBodyResult> {
  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return {
      ok: false,
      response: payloadTooLarge('Chat request exceeds the 24 MB limit.'),
    };
  }
  if (!request.body) {
    return {
      ok: false,
      response: Response.json({ error: 'Invalid JSON body' }, { status: 400 }),
    };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let byteLength = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return {
          ok: false,
          response: payloadTooLarge('Chat request exceeds the 24 MB limit.'),
        };
      }
      chunks.push(value);
    }
  } catch {
    return {
      ok: false,
      response: Response.json(
        { error: 'Unable to read request body' },
        { status: 400 }
      ),
    };
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return {
      ok: true,
      value: JSON.parse(
        new TextDecoder('utf-8', { fatal: true }).decode(bytes)
      ),
    };
  } catch {
    return {
      ok: false,
      response: Response.json({ error: 'Invalid JSON body' }, { status: 400 }),
    };
  }
}

function payloadTooLarge(error: string) {
  return Response.json(
    { error },
    { status: 413, headers: { 'Cache-Control': 'no-store' } }
  );
}

type ChatRequest = {
  messages: Parameters<typeof convertToModelMessages>[0];
  model: string;
  extendedThinking?: boolean;
};

function isChatModelId(value: string): value is ChatModelId {
  return Object.prototype.hasOwnProperty.call(MODEL_IDS, value);
}

function isChatRequest(value: unknown): value is ChatRequest {
  if (!value || typeof value !== 'object') return false;
  const request = value as Record<string, unknown>;
  return (
    Array.isArray(request.messages) &&
    request.messages.length > 0 &&
    request.messages.every(isUIMessageLike) &&
    typeof request.model === 'string' &&
    (request.extendedThinking === undefined ||
      typeof request.extendedThinking === 'boolean')
  );
}

function isUIMessageLike(value: unknown) {
  if (!value || typeof value !== 'object') return false;
  const message = value as Record<string, unknown>;
  return (
    typeof message.id === 'string' &&
    (message.role === 'user' ||
      message.role === 'assistant' ||
      message.role === 'system') &&
    Array.isArray(message.parts) &&
    message.parts.every(isUIMessagePartLike)
  );
}

function isUIMessagePartLike(value: unknown) {
  if (!value || typeof value !== 'object') return false;
  const part = value as Record<string, unknown>;
  if (typeof part.type !== 'string') return false;
  if (part.type === 'text' || part.type === 'reasoning') {
    return typeof part.text === 'string';
  }
  if (part.type === 'file') {
    return typeof part.mediaType === 'string' && typeof part.url === 'string';
  }
  return true;
}

function validateAttachments(messages: ChatRequest['messages']) {
  for (const message of messages) {
    const fileParts = message.parts.filter((part) => part.type === 'file');
    if (fileParts.length > MAX_ATTACHMENTS_PER_MESSAGE) {
      return payloadTooLarge(
        `A message can contain at most ${MAX_ATTACHMENTS_PER_MESSAGE} attachments.`
      );
    }
    for (const part of fileParts) {
      if (!part.url.startsWith('data:')) {
        return Response.json(
          { error: 'Attachments must be embedded data URLs.' },
          { status: 400, headers: { 'Cache-Control': 'no-store' } }
        );
      }
      try {
        if (dataUrlByteLength(part.url) > MAX_ATTACHMENT_BYTES) {
          return payloadTooLarge('An attachment exceeds the 4 MB limit.');
        }
      } catch {
        return Response.json(
          { error: 'Invalid attachment data URL.' },
          { status: 400, headers: { 'Cache-Control': 'no-store' } }
        );
      }
    }
  }
  return null;
}

function dataUrlByteLength(value: string) {
  const separator = value.indexOf(',');
  if (separator < 0) throw new Error('Invalid data URL');
  const metadata = value.slice(0, separator);
  const payload = value.slice(separator + 1);
  if (!metadata.endsWith(';base64')) {
    return new TextEncoder().encode(decodeURIComponent(payload)).byteLength;
  }
  const encoded = payload.replace(/\s/g, '');
  const padding = encoded.endsWith('==') ? 2 : encoded.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor((encoded.length * 3) / 4) - padding);
}

function formatError(error: unknown) {
  const value = error as
    | { message?: unknown; name?: unknown; statusCode?: unknown }
    | undefined;
  if (value?.name === 'AbortError' || value?.name === 'TimeoutError') {
    return 'The AI request timed out. Please try again.';
  }
  if (value?.statusCode === 429) {
    return 'The AI service is busy. Please try again shortly.';
  }
  if (value?.statusCode === 401 || value?.statusCode === 403) {
    return 'The AI service is temporarily unavailable.';
  }
  if (__DEV__ && typeof value?.message === 'string') return value.message;
  return 'Unable to generate a response. Please try again.';
}
