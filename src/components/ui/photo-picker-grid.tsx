import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import {
  ActionSheetIOS,
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  View,
} from 'react-native';

import http from '@/api/common/http';
import { isWeb } from '@/lib';
import { useAppColorScheme } from '@/lib/hooks';
import { error, loading, success as successMessage } from '@/lib/message';

import { Text } from './text';

// 配置常量
const UPLOAD_QUALITY = 0.9;
const DEFAULT_MAX_COUNT = 9;
const DEFAULT_COLUMNS = 3;
const DEFAULT_GAP = 8;
const SUPPORTS_MULTIPLE_SELECTION = Platform.OS === 'ios' || isWeb;

// 类型定义
export type PhotoItem = {
  presignedUrl: string;
  width?: number;
  height?: number;
  originalFilename?: string;
  fileSize?: number;
  fileType?: string;
  fileId?: string | number;
};

interface UploadResponse {
  success: boolean;
  fileId: string | number;
  message?: string;
}

// FileInfo 数据结构（不包含外层的 Success/Message/Data）
interface FileInfoData {
  presignedUrl: string;
  fileId: string | number;
  originalFilename: string;
  fileSize?: number;
  fileType: string;
}

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
  maxCount = DEFAULT_MAX_COUNT,
  columns = DEFAULT_COLUMNS,
  gap = DEFAULT_GAP,
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

  // 同步外部 value 变化
  React.useEffect(() => {
    setItems(value);
  }, [value]);

  const remaining = Math.max(0, maxCount - items.length);

  const update = React.useCallback(
    (nextOrUpdater: PhotoItem[] | ((prev: PhotoItem[]) => PhotoItem[])) => {
      if (typeof nextOrUpdater === 'function') {
        setItems((prev) => {
          const next = nextOrUpdater(prev);
          onChange?.(next);
          return next;
        });
      } else {
        setItems(nextOrUpdater);
        onChange?.(nextOrUpdater);
      }
    },
    [onChange]
  );

  /** 权限处理：相册 & 相机 */
  const ensureMediaLibraryPermission = React.useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('权限不足', '需要相册权限以选择或保存图片');
      return false;
    }
    return true;
  }, []);

  const ensureCameraPermission = React.useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('权限不足', '需要相机权限以进行拍照');
      return false;
    }
    // 拍照保存到相册时，iOS 需要相册写入权限（iOS 14+ 已合并）
    return ensureMediaLibraryPermission();
  }, [ensureMediaLibraryPermission]);

  /** 将 expo-image-picker 的 Asset 映射到 PhotoItem（用于 UI 展示/回显） */
  // const toPhotoItem = (a: ImagePicker.ImagePickerAsset): PhotoItem => ({
  //   presignedUrl: a.uri,
  //   width: a.width,
  //   height: a.height,
  //   originalFilename: (a as any).fileName ?? undefined, // iOS/Web 可能存在
  //   fileSize: (a as any).fileSize ?? undefined,         // iOS/Web 可能存在
  //   fileType: (a as any).mimeType ?? (a.type === 'image' ? 'image/jpeg' : undefined),
  // });

  /** 上传到服务器 */
  const uploadFile = React.useCallback(
    async (assets: ImagePicker.ImagePickerAsset[]) => {
      const results: PhotoItem[] = [];
      let hasError = false;

      for (const asset of assets) {
        try {
          const formData = new FormData();

          if (isWeb) {
            const blob = await fetch(asset.uri).then((r) => r.blob());
            formData.append('file', blob);
          } else {
            const mime = (asset as any).mimeType ?? 'image/jpeg';
            const name =
              (asset as any).fileName ??
              `photo_${Date.now()}.${
                mime.includes('png')
                  ? 'png'
                  : mime.includes('heic')
                    ? 'heic'
                    : 'jpg'
              }`;
            const filePart: any = {
              uri: asset.uri,
              type: mime,
              name,
            };
            formData.append('file', filePart);
          }

          const uploadRes = await http.postForm<UploadResponse>(
            '/server/common/upload',
            formData
          );

          if (!uploadRes.success) {
            error(uploadRes.message || '上传失败');
            hasError = true;
            continue;
          }

          const fileInfoRes = await http.post<FileInfoData>(
            '/server/common/get_file_info',
            { file_id: uploadRes.fileId }
          );

          if (!fileInfoRes.Success) {
            error(fileInfoRes.Message || '获取文件信息失败');
            hasError = true;
            continue;
          }

          results.push({
            presignedUrl: fileInfoRes.Data.presignedUrl,
            fileId: fileInfoRes.Data.fileId,
            originalFilename: fileInfoRes.Data.originalFilename,
            fileSize: fileInfoRes.Data.fileSize ?? 0,
            fileType: fileInfoRes.Data.fileType,
          });
        } catch (e) {
          console.error('上传失败:', e);
          error('上传失败，请重试');
          hasError = true;
        }
      }

      if (results.length > 0) {
        // 使用函数式更新避免闭包问题
        update((prevItems) => [...prevItems, ...results].slice(0, maxCount));

        if (!hasError) {
          successMessage('上传成功');
        } else {
          successMessage(`已上传 ${results.length}/${assets.length} 张`);
        }
      } else if (hasError) {
        error('所有图片上传失败');
      }
    },
    [update, maxCount]
  );

  /** 从相册选择 */
  const openLibrary = React.useCallback(async () => {
    if (remaining <= 0) return;
    const ok = await ensureMediaLibraryPermission();
    if (!ok) {
      console.error('无权限');
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: UPLOAD_QUALITY,
      base64: false,
      allowsMultipleSelection: SUPPORTS_MULTIPLE_SELECTION,
      selectionLimit: remaining, // iOS/Web 生效
      orderedSelection: true,
    });

    if (!res.canceled && res.assets?.length) {
      loading('加载中...', 300);
      await uploadFile(res.assets.slice(0, remaining));
    }
  }, [remaining, uploadFile, ensureMediaLibraryPermission]);

  /** 拍照 */
  const openCamera = React.useCallback(async () => {
    if (remaining <= 0) return;
    const ok = await ensureCameraPermission();
    if (!ok) return;

    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: UPLOAD_QUALITY,
      base64: false,
      allowsEditing: false,
    });

    if (!res.canceled && res.assets?.length) {
      loading('加载中...', 300);
      await uploadFile(res.assets.slice(0, 1));
    }
  }, [remaining, uploadFile, ensureCameraPermission]);

  const handleAdd = React.useCallback(() => {
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
  }, [disabled, allowCamera, openCamera, openLibrary]);

  const removeAt = React.useCallback(
    (idx: number) => {
      if (disabled) return;
      update((prevItems) => {
        const next = prevItems.slice();
        next.splice(idx, 1);
        return next;
      });
    },
    [disabled, update]
  );

  // 计算单格尺寸（若未指定 tileSize，则按列数 + 间距粗略计算）
  const size = tileSize ?? Math.floor((200 - gap * (columns - 1)) / columns);

  const renderAdd = () => {
    if (items.length >= maxCount || disabled) return null;
    return (
      <Pressable
        testID="photo-add-tile"
        className="overflow-hidden rounded-lg border border-dashed"
        style={{
          width: size,
          height: size,
          backgroundColor: isDark ? '#262626' : '#f3f4f6',
          borderColor: isDark ? '#525252' : '#9CA3AF',
        }}
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
            key={it.fileId?.toString() ?? it.presignedUrl}
            style={{ width: size, height: size }}
          >
            <Pressable
              testID={`photo-tile-${idx}`}
              className="overflow-hidden rounded-lg border"
              disabled={disabled}
              onPress={() => {}}
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
                  className="absolute right-1.5 top-1.5 size-5 items-center justify-center rounded-full bg-black/55"
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
          className="flex-1 justify-end bg-black/25"
          onPress={() => setAndroidSheetVisible(false)}
        >
          <View
            className="px-3 pb-6 pt-3"
            style={{ backgroundColor: isDark ? '#262626' : '#fff' }}
          >
            <Pressable
              className="rounded-lg py-3.5"
              style={{ backgroundColor: isDark ? '#262626' : '#fff' }}
              onPress={() => {
                setAndroidSheetVisible(false);
                openCamera();
              }}
            >
              <Text className="text-center text-base text-gray-900 dark:text-white">
                拍照
              </Text>
            </Pressable>
            <View className="h-2" />
            <Pressable
              className="rounded-lg py-3.5"
              style={{ backgroundColor: isDark ? '#262626' : '#fff' }}
              onPress={() => {
                setAndroidSheetVisible(false);
                openLibrary();
              }}
            >
              <Text className="text-center text-base text-gray-900 dark:text-white">
                从相册选择
              </Text>
            </Pressable>
            <View className="h-3" />
            <Pressable
              className="rounded-lg py-3.5"
              style={{ backgroundColor: isDark ? '#404040' : '#f3f4f6' }}
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
