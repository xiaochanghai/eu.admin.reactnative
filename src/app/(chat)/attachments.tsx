import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Switch, Text, View } from 'react-native';

import {
  AndroidGrabber,
  ChatIcon,
  ChatScreenHeader,
  ChatShell,
  SectionDivider,
  SettingsRow,
  useChatWorkspace,
} from '@/features/chat';
import {
  documentToAttachment,
  imageToAttachment,
  MAX_ATTACHMENT_BYTES,
  MAX_ATTACHMENTS,
  validateAttachmentSizes,
} from '@/features/chat/attachment-picker';

function AttachmentButton({
  icon,
  label,
  onPress,
}: {
  icon: 'camera-outline' | 'image-outline' | 'document-outline';
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center rounded-2xl bg-neutral-100 py-4 active:opacity-70 dark:bg-neutral-800"
    >
      <ChatIcon name={icon} size={24} />
      <Text className="mt-2 text-sm text-neutral-900 dark:text-white">
        {label}
      </Text>
    </Pressable>
  );
}

export default function AttachmentsScreen() {
  const router = useRouter();
  const { addAttachments, currentConversation, pendingAttachments, projects } =
    useChatWorkspace();
  const [research, setResearch] = useState(false);
  const [webSearch, setWebSearch] = useState(true);

  const addPickedAssets = async (
    values: {
      name: string;
      size?: number;
      convert: () => ReturnType<typeof documentToAttachment>;
    }[]
  ) => {
    const oversized = validateAttachmentSizes(values);
    if (oversized) {
      Alert.alert(
        'File too large',
        `${oversized.name} exceeds the ${MAX_ATTACHMENT_BYTES / 1024 / 1024} MB limit.`
      );
      return;
    }
    const available = MAX_ATTACHMENTS - pendingAttachments.length;
    if (available <= 0) {
      Alert.alert(
        'Attachment limit',
        `You can attach up to ${MAX_ATTACHMENTS} files.`
      );
      return;
    }
    try {
      const attachments = await Promise.all(
        values.slice(0, available).map((value) => value.convert())
      );
      addAttachments(attachments);
      if (router.canGoBack()) router.back();
      else router.replace('/(chat)' as never);
    } catch (error) {
      Alert.alert(
        'Unable to attach file',
        error instanceof Error ? error.message : 'Please try another file.'
      );
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera permission required');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      base64: true,
      quality: 0.8,
    });
    if (result.canceled) return;
    await addPickedAssets(
      result.assets.map((asset) => ({
        name: asset.fileName ?? 'Camera image',
        size: asset.fileSize,
        convert: () => imageToAttachment(asset),
      }))
    );
  };

  const openPhotos = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo permission required');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: MAX_ATTACHMENTS,
      base64: true,
      quality: 0.8,
    });
    if (result.canceled) return;
    await addPickedAssets(
      result.assets.map((asset) => ({
        name: asset.fileName ?? 'Photo',
        size: asset.fileSize,
        convert: () => imageToAttachment(asset),
      }))
    );
  };

  const openFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'text/*', 'application/json', 'text/csv'],
      copyToCacheDirectory: true,
      multiple: true,
      base64: true,
    });
    if (result.canceled) return;
    await addPickedAssets(
      result.assets.map((asset) => ({
        name: asset.name,
        size: asset.size,
        convert: () => documentToAttachment(asset),
      }))
    );
  };

  return (
    <ChatShell>
      <ChatScreenHeader title="Add to chat" />
      <ScrollView className="flex-1 bg-white dark:bg-neutral-900">
        <AndroidGrabber />
        <View className="flex-row gap-3 px-5 pb-5 pt-6">
          <AttachmentButton
            icon="camera-outline"
            label="Camera"
            onPress={openCamera}
          />
          <AttachmentButton
            icon="image-outline"
            label="Photos"
            onPress={openPhotos}
          />
          <AttachmentButton
            icon="document-outline"
            label="Files"
            onPress={openFiles}
          />
        </View>
        <ToggleRow
          icon="sparkles-outline"
          label="Research"
          value={research}
          onValueChange={setResearch}
        />
        <ToggleRow
          icon="globe-outline"
          label="Web search"
          badge="Beta"
          value={webSearch}
          onValueChange={setWebSearch}
        />
        <SectionDivider />
        <SettingsRow
          icon="archive-outline"
          label="Add to project"
          detail={
            projects.find(
              (project) => project.id === currentConversation?.projectId
            )?.name ?? 'None'
          }
          onPress={() => router.push('/(chat)/projects' as never)}
        />
        <SettingsRow
          icon="color-palette-outline"
          label="Choose style"
          detail="Normal"
        />
        <SettingsRow
          icon="construct-outline"
          label="Tool access"
          detail="Auto"
        />
      </ScrollView>
    </ChatShell>
  );
}

function ToggleRow({
  icon,
  label,
  badge,
  value,
  onValueChange,
}: {
  icon: 'sparkles-outline' | 'globe-outline';
  label: string;
  badge?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View className="flex-row items-center px-5 py-3.5">
      <ChatIcon name={icon} />
      <Text className="ml-4 flex-1 text-[17px] text-neutral-900 dark:text-white">
        {label}
      </Text>
      {badge && (
        <View className="mr-3 rounded-md bg-neutral-100 px-2 py-1 dark:bg-neutral-800">
          <Text className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
            {badge}
          </Text>
        </View>
      )}
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}
