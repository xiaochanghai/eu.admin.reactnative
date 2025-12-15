import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Alert } from 'react-native';

import { QRCodeScanner } from '@/components/ui/qr-code-scanner';
import { NavHeader } from '@/components/ui';

export default function QRScannerScreen() {
  const router = useRouter();

  const handleScan = React.useCallback(
    (data: string) => {
      console.log('Scanned data:', data);
      router.back();
      // 处理扫描结果
      if (isValidUrl(data)) {
        Alert.alert('扫描成功', `检测到链接: ${data}`, [
          { text: '取消', style: 'cancel' },
          {
            text: '打开链接',
            onPress: () => {
              Linking.openURL(data).catch(() => {
                Alert.alert('错误', '无法打开此链接');
              });
            },
          },
        ]);
      } else {
        let parts = data.split('_');
        if (parts.length !== 2) {
          Alert.alert('扫描成功', `检测到: ${data}`, [
            { text: '确定', onPress: () => { } },
          ]);
        } else {
          console.log('parts[0]:' + parts[0]);
          if (parts[0] === "Equip") {
            router.push({
              pathname: `/equipment/[id]`,
              params: { id: parts[1] }
            });
          }
        }
      }
    },
    [router]
  );

  const handleCancel = React.useCallback(() => {
    router.back();
  }, [router]);

  return <><NavHeader
    title="扫一扫"
  /><QRCodeScanner onScan={handleScan} onCancel={handleCancel} /></>;
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}
