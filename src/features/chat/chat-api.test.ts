import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { POST } from '@/app/api/chat+api';

const mockConvertToModelMessages = jest.fn(
  async (messages: unknown) => messages
);
const mockStreamText = jest.fn();

jest.mock('@ai-sdk/anthropic', () => ({
  anthropic: jest.fn(() => ({ modelId: 'test-model' })),
}));

jest.mock('ai', () => ({
  convertToModelMessages: (...args: unknown[]) =>
    mockConvertToModelMessages(args[0]),
  streamText: (...args: unknown[]) => mockStreamText(...args),
}));

const validMessage = {
  id: 'message-1',
  role: 'user',
  parts: [{ type: 'text', text: 'Hello' }],
};

function request(body: string, token?: string, headers?: HeadersInit) {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body,
  });
}

function validBody(parts: Record<string, unknown>[] = validMessage.parts) {
  return JSON.stringify({
    messages: [{ ...validMessage, parts }],
    model: 'sonnet-4.6',
  });
}

describe('chat API security limits', () => {
  beforeEach(() => {
    process.env.API_URL = 'https://auth.example';
    delete process.env.ANTHROPIC_API_KEY;
    mockConvertToModelMessages.mockClear();
    mockStreamText.mockClear();
    jest.spyOn(global, 'fetch').mockImplementation(async (_input, init) => {
      const authorization = new Headers(init?.headers).get('authorization');
      const userId = authorization?.replace(/^Bearer\s+/i, '') ?? 'unknown';
      return Response.json({
        Status: 200,
        Success: true,
        Data: { UserId: userId },
      });
    });
  });

  it('rejects requests without an access token before parsing the body', async () => {
    const response = await POST(request('{'));

    expect(response.status).toBe(401);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects a declared request body larger than 24 MB', async () => {
    const response = await POST(
      request(validBody(), 'body-limit-user', {
        'Content-Length': String(24 * 1024 * 1024 + 1),
      })
    );

    expect(response.status).toBe(413);
    expect(mockStreamText).not.toHaveBeenCalled();
  });

  it('rejects oversized embedded attachments on the server', async () => {
    const encoded = 'A'.repeat(Math.ceil(((4 * 1024 * 1024 + 1) * 4) / 3));
    const response = await POST(
      request(
        validBody([
          {
            type: 'file',
            filename: 'large.pdf',
            mediaType: 'application/pdf',
            url: `data:application/pdf;base64,${encoded}`,
          },
        ]),
        'attachment-limit-user'
      )
    );

    expect(response.status).toBe(413);
    expect(mockStreamText).not.toHaveBeenCalled();
  });

  it('rejects more than four attachments in one message', async () => {
    const parts = Array.from({ length: 5 }, (_, index) => ({
      type: 'file',
      filename: `file-${index}.txt`,
      mediaType: 'text/plain',
      url: 'data:text/plain;base64,SGVsbG8=',
    }));
    const response = await POST(
      request(validBody(parts), 'attachment-count-user')
    );

    expect(response.status).toBe(413);
  });
});
