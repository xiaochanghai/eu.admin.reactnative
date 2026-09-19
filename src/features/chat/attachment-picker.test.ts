import { describe, expect, it, jest } from '@jest/globals';
import type { DocumentPickerAsset } from 'expo-document-picker';

import {
  documentToAttachment,
  MAX_ATTACHMENT_BYTES,
} from './attachment-picker';

jest.mock('expo-file-system', () => ({
  File: class MockFile {
    size = 0;

    async base64() {
      return '';
    }
  },
}));

jest.mock('@/lib/utils', () => ({
  generateUUID: () => 'attachment-id',
}));

function asset(base64: string, size?: number): DocumentPickerAsset {
  return {
    name: 'attachment.pdf',
    uri: 'file:///attachment.pdf',
    mimeType: 'application/pdf',
    base64,
    lastModified: 0,
    size,
  };
}

describe('attachment size validation', () => {
  it('uses the encoded payload size when picker metadata is missing', async () => {
    const encoded = 'A'.repeat(Math.ceil(((MAX_ATTACHMENT_BYTES + 1) * 4) / 3));

    await expect(documentToAttachment(asset(encoded))).rejects.toThrow(
      'exceeds the 4 MB limit'
    );
  });

  it('rejects an oversized payload even when declared size is smaller', async () => {
    const encoded = 'A'.repeat(Math.ceil(((MAX_ATTACHMENT_BYTES + 1) * 4) / 3));

    await expect(documentToAttachment(asset(encoded, 100))).rejects.toThrow(
      'exceeds the 4 MB limit'
    );
  });

  it('stores the measured payload size when metadata is missing', async () => {
    const attachment = await documentToAttachment(asset('aGVsbG8='));

    expect(attachment.size).toBe(5);
  });
});
