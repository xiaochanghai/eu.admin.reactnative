import type { DocumentPickerAsset } from 'expo-document-picker';
import { File as ExpoFile } from 'expo-file-system';
import type { ImagePickerAsset } from 'expo-image-picker';

import { generateUUID } from '@/lib/utils';

import type { ChatAttachment } from './types';

export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
export const MAX_ATTACHMENTS = 4;

function mediaTypeFromName(name: string) {
  const extension = name.split('.').pop()?.toLowerCase();
  const values: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    pdf: 'application/pdf',
    txt: 'text/plain',
    md: 'text/markdown',
    csv: 'text/csv',
    json: 'application/json',
  };
  return values[extension ?? ''] ?? 'application/octet-stream';
}

function base64ByteLength(value: string) {
  const encoded = value.replace(/\s/g, '');
  const padding = encoded.endsWith('==') ? 2 : encoded.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor((encoded.length * 3) / 4) - padding);
}

function dataUrlByteLength(value: string) {
  const separator = value.indexOf(',');
  if (separator < 0) throw new Error('Invalid attachment data URL.');
  const metadata = value.slice(0, separator);
  const payload = value.slice(separator + 1);
  return metadata.endsWith(';base64')
    ? base64ByteLength(payload)
    : new TextEncoder().encode(decodeURIComponent(payload)).byteLength;
}

function assertAttachmentSize(name: string, size: number) {
  if (size > MAX_ATTACHMENT_BYTES) {
    throw new Error(
      `${name} exceeds the ${MAX_ATTACHMENT_BYTES / 1024 / 1024} MB limit.`
    );
  }
}

async function attachmentData(
  name: string,
  uri: string,
  mediaType: string,
  declaredSize?: number,
  base64?: string
) {
  if (declaredSize !== undefined) assertAttachmentSize(name, declaredSize);

  if (uri.startsWith('data:')) {
    const size = dataUrlByteLength(uri);
    assertAttachmentSize(name, size);
    return { size, url: uri };
  }

  const file = new ExpoFile(uri);
  const fileSize = file.size > 0 ? file.size : undefined;
  if (fileSize !== undefined) assertAttachmentSize(name, fileSize);

  const encoded = base64 ?? (await file.base64());
  const encodedSize = base64ByteLength(encoded);
  assertAttachmentSize(name, encodedSize);
  return {
    size: fileSize ?? encodedSize,
    url: `data:${mediaType};base64,${encoded}`,
  };
}

export async function documentToAttachment(
  asset: DocumentPickerAsset
): Promise<ChatAttachment> {
  const mediaType = asset.mimeType ?? mediaTypeFromName(asset.name);
  const data = await attachmentData(
    asset.name,
    asset.uri,
    mediaType,
    asset.size,
    asset.base64
  );
  return {
    id: generateUUID(),
    name: asset.name,
    mediaType,
    ...data,
  };
}

export async function imageToAttachment(
  asset: ImagePickerAsset
): Promise<ChatAttachment> {
  const name = asset.fileName ?? `image-${Date.now()}.jpg`;
  const mediaType = asset.mimeType ?? mediaTypeFromName(name);
  const data = await attachmentData(
    name,
    asset.uri,
    mediaType,
    asset.fileSize,
    asset.base64 ?? undefined
  );
  return {
    id: generateUUID(),
    name,
    mediaType,
    ...data,
  };
}

export function validateAttachmentSizes(
  values: { name: string; size?: number }[]
) {
  return values.find(
    (value) => value.size !== undefined && value.size > MAX_ATTACHMENT_BYTES
  );
}
