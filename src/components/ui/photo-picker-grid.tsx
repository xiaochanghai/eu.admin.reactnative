import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import {
  ActionSheetIOS,
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import http from '@/api/common/http';
import { isWeb } from '@/lib';
import { useAppColorScheme } from '@/lib/hooks';
import { error, loading, success as successMessage } from '@/lib/message';

import { Text } from './text';

export type PhotoItem = {
  presignedUrl: string;
  width?: number;
  height?: number;
  originalFilename?: string;
  fileSize?: number;
  fileType?: string;
  fileId?: string | number;
};

export interface PhotoPickerGridProps {
  label?: string;
  value?: PhotoItem[];
  onChange?: (items: PhotoItem[]) => void;
  maxCount?: number; // 默认 9
  columns?: number; // 默认 3
  gap?: number; // 间距，默认 8
  tileSize?: number; // 单格大小（正方形），默认自动按列数分配
  allowCamera?: boolean; // 是否允许拍照，默认 true
  disabled?: boolean;
  // 自定义渲染（可选）
  renderAddTile?: () => React.ReactNode;
  renderRemoveIcon?: () => React.ReactNode;
  testID?: string;
  require?: boolean;
}

export const PhotoPickerGrid: React.FC<PhotoPickerGridProps> = ({
  label = '照片上传',
  value = [],
  onChange,
  maxCount = 9,
  columns = 3,
  gap = 8,
  tileSize,
  allowCamera = true,
  disabled = false,
  renderAddTile,
  renderRemoveIcon,
  testID,
  require = false,
}) => {
  const { isDark } = useAppColorScheme();
  const [items, setItems] = React.useState<PhotoItem[]>(value);
  const [androidSheetVisible, setAndroidSheetVisible] = React.useState(false);

  const remaining = Math.max(0, maxCount - items.length);

  const update = (next: PhotoItem[]) => {
    setItems(next);
    onChange?.(next);
  };

  /** 权限处理：相册 & 相机 */
  const ensureMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('权限不足', '需要相册权限以选择或保存图片');
      return false;
    }
    return true;
  };

  const ensureCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('权限不足', '需要相机权限以进行拍照');
      return false;
    }
    // 拍照保存到相册时，iOS 需要相册写入权限（iOS 14+ 已合并）
    return ensureMediaLibraryPermission();
  };

  /** 将 expo-image-picker 的 Asset 映射到 PhotoItem（用于 UI 展示/回显） */
  // const toPhotoItem = (a: ImagePicker.ImagePickerAsset): PhotoItem => ({
  //   presignedUrl: a.uri,
  //   width: a.width,
  //   height: a.height,
  //   originalFilename: (a as any).fileName ?? undefined, // iOS/Web 可能存在
  //   fileSize: (a as any).fileSize ?? undefined,         // iOS/Web 可能存在
  //   fileType: (a as any).mimeType ?? (a.type === 'image' ? 'image/jpeg' : undefined),
  // });

  /** 上传到你服务器（保持你原来的接口逻辑） */
  const uploadFile = async (assets: ImagePicker.ImagePickerAsset[]) => {
    for (let i = 0; i < (assets?.length || 0); i++) {
      const file = assets[i];
      const formData = new FormData();

      if (isWeb) {
        const blob = await fetch(file.uri).then((r) => r.blob());
        formData.append('file', blob);
      } else {
        const mime = (file as any).mimeType ?? 'image/jpeg';
        const name =
          (file as any).fileName ??
          `photo_${Date.now()}.${mime.includes('png')
            ? 'png'
            : mime.includes('heic')
              ? 'heic'
              : 'jpg'
          }`;
        const filePart: any = {
          uri: file.uri,
          type: mime,
          name,
        };
        formData.append('file', filePart);
      }

      const { success, fileId } = await http.postForm<any>(
        '/server/common/upload',
        formData
      );
      if (success) {
        try {
          const res: any = await http.post('/server/common/get_file_info', {
            file_id: fileId,
          });
          if (res.success) {
            update(
              [
                ...items,
                {
                  presignedUrl: res.presignedUrl,
                  fileId: res.fileId,
                  originalFilename: res.originalFilename,
                  fileSize: res.fileSize ?? 0,
                  fileType: res.fileType,
                },
              ].slice(0, maxCount)
            );
          } else {
            error(res.message || '上传失败');
          }
        } catch (e) {
          console.error('get_file_info 失败:', e);
        }
      }
    }
    successMessage('上传成功');
  };

  /** 从相册选择 */
  const openLibrary = async () => {
    if (remaining <= 0) return;
    const ok = await ensureMediaLibraryPermission();
    if (!ok) {
      console.error('无权限');
      return;
    }

    // iOS14+/Web 支持多选；Android 多数机型仅单选（SDK 限制）
    const allowsMulti = Platform.OS === 'ios' || isWeb;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.9,
      base64: false,
      allowsMultipleSelection: allowsMulti,
      selectionLimit: remaining, // iOS/Web 生效
      orderedSelection: true,
    });

    if (!res.canceled && res.assets?.length) {
      loading('加载中...', 300);
      // 上传服务器
      await uploadFile(res.assets.slice(0, remaining));
      // 👉 如果你希望“先本地显示，再上传成功后替换为服务器URL”，可先 update([...items, ...res.assets.map(toPhotoItem)])
    }
  };

  /** 拍照 */
  const openCamera = async () => {
    if (remaining <= 0) return;
    const ok = await ensureCameraPermission();
    if (!ok) return;

    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.9,
      base64: false,
      allowsEditing: false,
    });

    if (!res.canceled && res.assets?.length) {
      loading('加载中...', 300);
      await uploadFile(res.assets.slice(0, 1));
    }
  };

  const handleAdd = () => {
    if (disabled) return;
    if (allowCamera) {
      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['取消', '拍照', '从相册选择'],
            cancelButtonIndex: 0,
          },
          (index) => {
            if (index === 1) openCamera();
            if (index === 2) openLibrary();
          }
        );
      } else {
        setAndroidSheetVisible(true);
      }
    } else {
      openLibrary();
    }
  };

  const removeAt = (idx: number) => {
    if (disabled) return;
    const next = items.slice();
    next.splice(idx, 1);
    update(next);
  };

  // 计算单格尺寸（若未指定 tileSize，则按列数 + 间距粗略计算）
  const size = tileSize ?? Math.floor((200 - gap * (columns - 1)) / columns);

  const renderAdd = () => {
    if (items.length >= maxCount || disabled) return null;
    return (
      <Pressable
        testID="photo-add-tile"
        style={[
          styles.tile,
          {
            width: size,
            height: size,
            borderStyle: 'dashed',
            backgroundColor: isDark ? '#262626' : '#f3f4f6',
            borderColor: isDark ? '#525252' : '#9CA3AF',
          },
        ]}
        onPress={handleAdd}
        disabled={disabled}
      >
        {renderAddTile ? (
          renderAddTile()
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-3xl text-neutral-500 dark:text-neutral-400">
              ＋
            </Text>
            <Text className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {items.length}/{maxCount}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <>
      {label && (
        <View className="flex-row ">
          <Text
            testID={testID ? `${testID}-label` : undefined}
            className="mb-1 text-lg text-gray-600 dark:text-neutral-100"
          >
            {label}
          </Text>
          <Text className="mb-1 text-lg text-red-500 dark:text-neutral-100">
            {require && '*'}
          </Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap }}>
        {items.map((it, idx) => (
          <View
            key={it.fileId ?? `${it.presignedUrl}-${idx}`}
            style={{ width: size, height: size }}
          >
            <Pressable
              testID={`photo-tile-${idx}`}
              style={styles.tile}
              disabled={disabled}
              onPress={() => { }}
            >
              <Image
                source={{ uri: it.presignedUrl }}
                style={{ width: size, height: size, borderRadius: 10 }}
                resizeMode="cover"
              />
              {!disabled && (
                <Pressable
                  hitSlop={8}
                  onPress={() => removeAt(idx)}
                  style={styles.removeBtn}
                >
                  {renderRemoveIcon ? (
                    renderRemoveIcon()
                  ) : (
                    <Text className="text-xs text-white">×</Text>
                  )}
                </Pressable>
              )}
            </Pressable>
          </View>
        ))}
        {renderAdd()}
      </View>

      {/* Android 仿 ActionSheet */}
      <Modal
        visible={androidSheetVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setAndroidSheetVisible(false)}
      >
        <Pressable
          style={styles.sheetMask}
          onPress={() => setAndroidSheetVisible(false)}
        >
          <View
            style={[
              styles.sheetContent,
              { backgroundColor: isDark ? '#262626' : '#fff' },
            ]}
          >
            <Pressable
              style={[
                styles.sheetBtn,
                { backgroundColor: isDark ? '#262626' : '#fff' },
              ]}
              onPress={() => {
                setAndroidSheetVisible(false);
                openCamera();
              }}
            >
              <Text className="text-center text-base text-gray-900 dark:text-white">
                拍照
              </Text>
            </Pressable>
            <View style={styles.sheetDivider} />
            <Pressable
              style={[
                styles.sheetBtn,
                { backgroundColor: isDark ? '#262626' : '#fff' },
              ]}
              onPress={() => {
                setAndroidSheetVisible(false);
                openLibrary();
              }}
            >
              <Text className="text-center text-base text-gray-900 dark:text-white">
                从相册选择
              </Text>
            </Pressable>
            <View style={styles.sheetGap} />
            <Pressable
              style={[
                styles.sheetBtn,
                styles.sheetCancel,
                { backgroundColor: isDark ? '#404040' : '#f3f4f6' },
              ]}
              onPress={() => setAndroidSheetVisible(false)}
            >
              <Text className="text-center text-base text-neutral-600 dark:text-neutral-400">
                取消
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  tile: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    // backgroundColor will be set dynamically based on theme
  },
  removeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  sheetContent: {
    // backgroundColor will be set dynamically based on theme
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 24,
  },
  sheetBtn: {
    paddingVertical: 14,
    borderRadius: 8,
    // backgroundColor will be set dynamically based on theme
  },
  sheetDivider: {
    height: 8,
  },
  sheetGap: {
    height: 12,
  },
  sheetCancel: {
    // backgroundColor will be set dynamically based on theme
  },
});
