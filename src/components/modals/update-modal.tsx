/**
 * UpdateModal - 版本更新弹窗组件
 *
 * 功能特性:
 * - 支持强制更新和可选更新
 * - 火箭主题背景设计
 * - 平台特定的更新逻辑 (Android APK下载, iOS跳转App Store)
 * - 优雅的动画效果
 *
 * 使用示例:
 * ```tsx
 * import { UpdateModal, useUpdateModal } from '@/components/modals/update-modal';
 *
 * function App() {
 *   const { ref, present, dismiss } = useUpdateModal();
 *
 *   const handleShowUpdate = () => {
 *     present({
 *       version: '2.1.0',
 *       description: '新版本包含重要功能更新和性能优化',
 *       isForced: false,
 *       downloadUrl: 'https://example.com/app.apk', // Android APK URL
 *       appStoreUrl: 'https://apps.apple.com/app/id123456789' // iOS App Store URL
 *     });
 *   };
 *
 *   return (
 *     <>
 *       <Button onPress={handleShowUpdate} label="检查更新" />
 *       <UpdateModal ref={ref} />
 *     </>
 *   );
 * }
 * ```
 */

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system/legacy';
import * as IntentLauncher from 'expo-intent-launcher';
import * as React from 'react';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  View,
} from 'react-native';

import { Button } from '@/components/ui/button';
import { renderBackdrop } from '@/components/ui/modal';
import { Text } from '@/components/ui/text';
import { useAppColorScheme } from '@/lib/hooks';
import { isAndroid, isIos } from '@/lib/platform-utils';

import CloudDecoration from './update/cloud-decoration';
import renderLockedBackdrop from './update/locked-backdrop';
import RocketIcon from './update/rocket-icon';

// 更新信息类型定义
export type UpdateInfo = {
  version: string;
  description: string;
  isForced: boolean;
  downloadUrl?: string; // Android APK下载链接
  appStoreUrl?: string; // iOS App Store链接
  releaseNotes?: string[];
};

type UpdateModalProps = {
  onUpdateStart?: () => void;
  onUpdateCancel?: () => void;
  onUpdateComplete?: () => void;
};

// Hook for managing update modal
export const useUpdateModal = () => {
  const ref = React.useRef<
    BottomSheetModal & { presentUpdate?: (info: UpdateInfo) => void }
  >(null);

  const present = React.useCallback((info: UpdateInfo) => {
    if (ref.current?.presentUpdate) {
      ref.current.presentUpdate(info);
    }
  }, []);

  const dismiss = React.useCallback(() => {
    if (ref.current?.dismiss) {
      ref.current.dismiss();
    }
  }, []);

  return { ref, present, dismiss };
};

// Android APK下载和安装功能
const downloadAndInstallAPK = async (
  downloadUrl: string,
  onProgress?: (progress: number) => void
): Promise<void> => {
  try {
    // 请求存储权限
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '存储权限',
          message: '需要存储权限来下载更新文件',
          buttonNeutral: '稍后询问',
          buttonNegative: '取消',
          buttonPositive: '确定',
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('存储权限被拒绝');
      }
    }

    console.log('Starting APK download from:', downloadUrl);
    const fileUri = FileSystem.cacheDirectory + 'update.apk';
    console.log(`Downloading to: ${fileUri}`);

    // 使用 legacy API 的 createDownloadResumable，支持实时进度
    const downloadResumable = FileSystem.createDownloadResumable(
      downloadUrl,
      fileUri,
      {},
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        onProgress?.(progress);
      }
    );

    const downloadResult = await downloadResumable.downloadAsync();

    if (!downloadResult?.uri) {
      throw new Error('下载失败');
    }

    console.log('Download completed:', downloadResult.uri);

    // 注意：REQUEST_INSTALL_PACKAGES 权限在 Android 8.0+ 需要用户手动在设置中开启
    // 这里我们直接尝试安装，如果失败会抛出相应错误

    // 验证文件是否存在
    const fileInfo = await FileSystem.getInfoAsync(downloadResult.uri);
    console.log('File info:', fileInfo);

    if (!fileInfo.exists) {
      throw new Error('下载的文件不存在');
    }

    // 获取当前应用的包名
    const packageName =
      Constants.expoConfig?.android?.package || 'com.eucloud.erp';
    console.log('Package name:', packageName);
    console.log('Download URI:', downloadResult.uri);

    // 将 file:// URI 转换为 content:// URI（通过 FileProvider）
    const contentUri = await (FileSystem as any).getContentUriAsync(
      downloadResult.uri
    );
    console.log('Content URI:', contentUri);

    // 使用 ACTION_VIEW 打开安装器
    try {
      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: contentUri,
        type: 'application/vnd.android.package-archive',
        // FLAG_GRANT_READ_URI_PERMISSION | FLAG_ACTIVITY_NEW_TASK
        flags: 1 | 268435456,
      });
    } catch (intentError) {
      console.error('Install intent failed:', intentError);

      // 可能是"未知来源安装"权限未开启，尝试引导到设置
      try {
        await IntentLauncher.startActivityAsync(
          'android.settings.MANAGE_UNKNOWN_APP_SOURCES',
          { data: `package:${packageName}` }
        );
      } catch (settingsError) {
        const errorMessage =
          settingsError instanceof Error ? settingsError.message : '未知错误';
        throw new Error(`无法启动安装器: ${errorMessage}`);
      }
    }

    console.log('APK installation intent launched successfully');
  } catch (error) {
    console.error('APK下载安装错误:', error);
    throw error;
  }
};

// 主要更新弹窗组件
export const UpdateModal = React.forwardRef<BottomSheetModal, UpdateModalProps>(
  ({ onUpdateStart, onUpdateCancel, onUpdateComplete }, ref) => {
    const { isDark } = useAppColorScheme();
    const internalRef = React.useRef<BottomSheetModal>(null);
    const [updateInfo, setUpdateInfo] = React.useState<UpdateInfo | null>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [downloadProgress, setDownloadProgress] = React.useState(0);

    // 将内部 ref 暴露给外部 ref，并暴露 present 方法
    React.useImperativeHandle(
      ref,
      () => ({
        ...(internalRef.current as any),
        presentUpdate: (info: UpdateInfo) => {
          setUpdateInfo(info);
          // 等待下一帧，确保BottomSheet已挂载并计算完尺寸
          requestAnimationFrame(() => internalRef.current?.present());
        },
      }),
      []
    );

    // 处理更新逻辑
    const handleUpdate = React.useCallback(async () => {
      if (!updateInfo) return;

      setIsUpdating(true);
      setDownloadProgress(0);
      onUpdateStart?.();

      try {
        if (isAndroid && updateInfo.downloadUrl) {
          // Android: 应用内下载并安装APK
          await downloadAndInstallAPK(updateInfo.downloadUrl, (progress) => {
            setDownloadProgress(progress);
          });
        } else if (isIos && updateInfo.appStoreUrl) {
          // iOS: 跳转到App Store
          const supported = await Linking.canOpenURL(updateInfo.appStoreUrl);
          if (supported) {
            await Linking.openURL(updateInfo.appStoreUrl);
          } else {
            Alert.alert('错误', '无法打开App Store');
          }
        } else {
          Alert.alert('提示', '当前平台暂不支持自动更新');
        }

        onUpdateComplete?.();
      } catch (error) {
        console.error('Update error:', error);
        const errorMessage =
          error instanceof Error ? error.message : '未知错误';
        Alert.alert('更新失败', `${errorMessage}\n请稍后重试或手动下载更新`);
      } finally {
        setIsUpdating(false);
        setDownloadProgress(0);
      }
    }, [updateInfo, onUpdateStart, onUpdateComplete]);

    // 处理取消更新
    const handleCancel = React.useCallback(() => {
      onUpdateCancel?.();
      // 强制更新时不允许关闭弹窗
      if (!updateInfo?.isForced) {
        if (typeof ref === 'object' && ref?.current) {
          ref.current.dismiss();
        }
      }
    }, [updateInfo?.isForced, onUpdateCancel, ref]);

    const snapPoints = React.useMemo(() => ['70%'], []);

    return (
      <BottomSheetModal
        ref={internalRef} // 使用内部 ref
        snapPoints={snapPoints}
        enableDismissOnClose={!updateInfo?.isForced}
        enablePanDownToClose={!updateInfo?.isForced}
        backgroundStyle={{
          backgroundColor: isDark ? '#D97706' : '#F59E0B',
        }}
        backdropComponent={
          updateInfo?.isForced ? renderLockedBackdrop : renderBackdrop
        }
        handleComponent={() => null}
      >
        <BottomSheetView style={{ flex: 1 }}>
          {/* 背景容器 */}
          <View className="relative flex-1 overflow-hidden bg-transparent">
            {/* 云朵装饰 */}
            <CloudDecoration className="left-4 top-8" />
            <CloudDecoration className="right-8 top-16" />
            <CloudDecoration className="left-12 top-32" />

            {/* 内容区域 */}
            <View className="flex-1 items-center justify-center px-6">
              {/* 火箭图标 */}
              <View className="mb-6 pt-6">
                <RocketIcon />
              </View>

              {/* 标题 */}
              <Text className="mb-2 text-center text-3xl font-bold text-white">
                发现新版本
              </Text>

              {/* 版本号 */}
              <Text className="mb-6 text-center text-xl text-white/90">
                v{updateInfo?.version ?? ''}
              </Text>

              {/* 更新描述 */}
              <View className="mb-8 w-full rounded-2xl bg-white/20 p-4">
                <Text className="text-center text-base leading-6 text-white">
                  {updateInfo?.description ?? ''}
                </Text>

                {/* 更新日志 */}
                {updateInfo?.releaseNotes &&
                  updateInfo?.releaseNotes.length > 0 && (
                    <View className="mt-4">
                      <Text className="mb-2 font-semibold text-white">
                        更新内容：
                      </Text>
                      {updateInfo?.releaseNotes?.map((note, index) => (
                        <Text
                          key={index}
                          className="mb-1 text-sm text-white/90"
                        >
                          • {note}
                        </Text>
                      ))}
                    </View>
                  )}
              </View>

              {/* 强制更新提示 */}
              {updateInfo?.isForced && (
                <View className="mb-6 w-full rounded-xl bg-red-500/20 p-3">
                  <Text className="text-center text-sm text-white">
                    ⚠️ 这是一个重要更新，需要立即更新才能继续使用
                  </Text>
                </View>
              )}

              {/* 下载进度条 - 仅在Android下载时显示 */}
              {isUpdating && isAndroid && downloadProgress > 0 && (
                <View className="mb-4 w-full">
                  <View className="mb-2 h-2 rounded-full bg-white/20">
                    <View
                      className="h-2 rounded-full bg-white"
                      style={{ width: `${downloadProgress * 100}%` }}
                    />
                  </View>
                  <Text className="text-center text-sm text-white/90">
                    下载进度: {Math.round(downloadProgress * 100)}%
                  </Text>
                </View>
              )}

              {/* 按钮区域 */}
              <View className="w-full space-y-3">
                {/* 更新按钮 */}
                <Button
                  variant="primary"
                  size="lg"
                  label={
                    isUpdating
                      ? isAndroid
                        ? downloadProgress > 0
                          ? `下载中... ${Math.round(downloadProgress * 100)}%`
                          : '准备下载...'
                        : '正在更新...'
                      : '立即更新'
                  }
                  disabled={isUpdating}
                  onPress={handleUpdate}
                  className="bg-white"
                  textClassName="text-orange-500 font-bold"
                />

                {/* 取消按钮 - 仅在非强制更新时显示 */}
                {!updateInfo?.isForced && (
                  <Button
                    variant="ghost"
                    size="lg"
                    label="稍后提醒"
                    onPress={handleCancel}
                    className="border border-white/30 bg-transparent"
                    textClassName="text-white"
                  />
                )}
              </View>

              {/* 平台提示 */}
              <Text className="mb-8 mt-4 text-center text-xs text-white/70">
                {isAndroid
                  ? '将在应用内下载APK并自动安装'
                  : isIos
                    ? '将跳转到App Store进行更新'
                    : '请根据您的设备类型进行更新'}
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

UpdateModal.displayName = 'UpdateModal';
