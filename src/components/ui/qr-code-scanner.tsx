import type { BarcodeScanningResult } from 'expo-camera';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, SafeAreaView } from '@/components/ui';

type Props = {
  onScan: (data: string) => void;
  onCancel: () => void;
};

export function QRCodeScanner({ onScan, onCancel }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = React.useState(true);
  const scanningValue = useRef<boolean>(true);

  const handleBarCodeScanned = React.useCallback(
    ({ data }: BarcodeScanningResult) => {
      console.log('scanning:', scanning);
      console.log('scanningValue:', scanningValue.current);
      if (!scanningValue.current) return;
      scanningValue.current = false;

      setScanning(false);
      onScan(data);
    },
    [scanning, onScan]
  );

  if (!permission) {
    // 相机权限正在加载
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-white">获取相机权限中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    // 没有相机权限
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="mb-4 text-center text-lg">
            需要相机权限来扫描二维码
          </Text>
          <Button
            label="授权相机权限"
            variant="primary"
            onPress={requestPermission}
          />
          <Button
            label="返回"
            variant="outline"
            onPress={onCancel}
            className="mt-2"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanning ? handleBarCodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        {/* 扫描框覆盖层 */}
        <View className="flex-1">
          {/* 顶部区域 */}
          <View className="flex-1 bg-black/50" />

          {/* 中间扫描区域 */}
          <View className="flex-row">
            <View className="flex-1 bg-black/50" />
            <View className="relative size-64">
              {/* 扫描框四个角 */}
              <View className="absolute left-0 top-0 size-8 border-l-4 border-t-4 border-white" />
              <View className="absolute right-0 top-0 size-8 border-r-4 border-t-4 border-white" />
              <View className="absolute bottom-0 left-0 size-8 border-b-4 border-l-4 border-white" />
              <View className="absolute bottom-0 right-0 size-8 border-b-4 border-r-4 border-white" />
            </View>
            <View className="flex-1 bg-black/50" />
          </View>

          {/* 底部区域 */}
          <View className="flex-1 items-center justify-start bg-black/50 pt-8">
            <Text className="mb-4 text-lg text-white">
              将二维码放入扫描框内
            </Text>
            <TouchableOpacity
              onPress={onCancel}
              className="rounded-lg bg-white/20 px-6 py-3"
            >
              <Text className="text-lg text-white">取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}
