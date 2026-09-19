import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import colors from '@/components/ui/colors';

import type { ChatAttachment } from '../types';

function formatBytes(size?: number) {
  if (!size) return '';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function AttachmentCard({
  attachment,
  onRemove,
  compact = false,
}: {
  attachment: ChatAttachment;
  onRemove?: () => void;
  compact?: boolean;
}) {
  const image = attachment.mediaType.startsWith('image/');

  if (image && !compact) {
    return (
      <View className="mr-2 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700">
        <Image
          source={{ uri: attachment.url }}
          contentFit="cover"
          style={{ width: 180, height: 128 }}
        />
        <Text
          numberOfLines={1}
          className="max-w-[180px] bg-white px-2.5 py-2 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
        >
          {attachment.name}
        </Text>
      </View>
    );
  }

  return (
    <View className="mr-2 flex-row items-center rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800">
      <Ionicons
        name={image ? 'image-outline' : 'document-text-outline'}
        size={18}
        color={colors.neutral[500]}
      />
      <View className="ml-2 max-w-[150px]">
        <Text
          numberOfLines={1}
          className="text-xs font-medium text-neutral-800 dark:text-neutral-100"
        >
          {attachment.name}
        </Text>
        {attachment.size ? (
          <Text className="text-[10px] text-neutral-500">
            {formatBytes(attachment.size)}
          </Text>
        ) : null}
      </View>
      {onRemove ? (
        <Pressable
          accessibilityLabel={`Remove ${attachment.name}`}
          onPress={onRemove}
          className="ml-2 size-6 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700"
        >
          <Ionicons name="close" size={14} color={colors.neutral[500]} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function PendingAttachments({
  attachments,
  onRemove,
}: {
  attachments: ChatAttachment[];
  onRemove: (id: string) => void;
}) {
  if (!attachments.length) return null;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-1"
      contentContainerStyle={{ paddingHorizontal: 6, paddingTop: 4 }}
    >
      {attachments.map((attachment) => (
        <AttachmentCard
          key={attachment.id}
          attachment={attachment}
          compact
          onRemove={() => onRemove(attachment.id)}
        />
      ))}
    </ScrollView>
  );
}

export function MessageAttachments({
  attachments,
}: {
  attachments?: ChatAttachment[];
}) {
  if (!attachments?.length) return null;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-3 max-w-full"
    >
      {attachments.map((attachment) => (
        <AttachmentCard key={attachment.id} attachment={attachment} />
      ))}
    </ScrollView>
  );
}
