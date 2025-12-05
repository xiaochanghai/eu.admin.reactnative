import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Alert } from 'react-native';

import { QRCodeScanner } from '@/components/ui/qr-code-scanner';

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
            { text: '确定', onPress: () => {} },
          ]);
        } else {
          console.log('parts[0]:' + parts[0]);
          if (Number(parts[0]) === 1) {
            Alert.alert('扫描成功', `检测到打样单，是否确认提交？`, [
              {
                text: '确定',
                onPress: () => {
                  // router.push({
                  //   pathname: '/chat',
                  //   params: {
                  //     actualText: '打样提交',
                  //     text: `prompt:scan_sample(),value:${parts[1]},CurrentTime: ${formatDate(new Date())}`,
                  //   },
                  // });
                },
              },
              { text: '取消', onPress: () => {} },
            ]);
          } else if (Number(parts[0]) === 2) {
            Alert.alert('扫描成功', `检测到排料单，是否确认提交？`, [
              {
                text: '确定',
                onPress: () => {
                  // router.push({
                  //   pathname: '/chat',
                  //   params: {
                  //     actualText: '排料提交',
                  //     text: `prompt:scan_marker(),value:${parts[1]},CurrentTime: ${formatDate(new Date())}`,
                  //   },
                  // });
                },
              },
              { text: '取消', onPress: () => {} },
            ]);
          }
          //
          // console.log(parts); // 输出: ['1', '33']
        }
      }
    },
    [router]
  );

  const handleCancel = React.useCallback(() => {
    router.back();
  }, [router]);

  return <QRCodeScanner onScan={handleScan} onCancel={handleCancel} />;
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}
