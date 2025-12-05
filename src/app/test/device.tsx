import { Stack } from 'expo-router';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  getApplicationName,
  getBrand,
  getBundleId,
  getDeviceId,
  getSystemName,
  getSystemVersion,
  getUniqueId,
  getVersion,
} from 'react-native-device-info';

import { SafeAreaView, ScrollView, Text, View } from '@/components/ui';

export default function Style() {
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();
  const [uniqueId, setUniqueId] = useState('');
  const checkForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();

      alert('update.isAvailable:' + update.isAvailable);
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      alert('检查更新失败:' + error);
      if (error instanceof Error) {
        alert('错误信息:' + error.message);
        alert('错误堆栈:' + error.stack);
      }
    }
  };
  useEffect(() => {
    getUniqueId().then((uniqueId) => {
      setUniqueId(uniqueId);
    });
    // checkForUpdate();
  });

  useEffect(() => {
    if (isUpdatePending) {
      // Update has successfully downloaded; apply it now
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  // If true, we show the button to download and run the update
  const showDownloadButton = isUpdateAvailable;

  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? 'This app is running from built-in code'
    : 'This app is running an update';
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Device Info',
          headerTintColor: '#000',
          headerBackTitle: 'Feed',
        }}
      />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
          <View>
            <Text>获取设备唯一的ID:{uniqueId}</Text>
          </View>
          <View>
            <Text>获取App应用名称:{getApplicationName()}</Text>
          </View>
          <View>
            <Text>获取设备品牌类型:{getBrand()}</Text>
          </View>
          <View>
            <Text>设备型号:{getDeviceId()}</Text>
          </View>
          <View>
            <Text>获取应用包名:{getBundleId()}</Text>
          </View>
          <View>
            <Text>系统:{getSystemName()}</Text>
          </View>
          <View>
            <Text>系统版本号:{getSystemVersion()}</Text>
          </View>
          {/* <View>
            <Text>getUserAgentSync:{getUserAgentSync()}</Text>
          </View> */}
          <View>
            <Text>获取应用版本号,Android中对应versionName:{getVersion()}</Text>
          </View>

          <View>
            <Text>Updates Demo-updateId:{Updates?.updateId}</Text>
            <Text>{runTypeMessage}</Text>
            <TouchableOpacity
              onPress={() => {
                checkForUpdate();
              }}
            >
              <Text>checkForUpdate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert(2);
                Updates.checkForUpdateAsync();
              }}
            >
              <Text>Check manually for updates</Text>
            </TouchableOpacity>
            {showDownloadButton ? (
              <TouchableOpacity
                onPress={() => {
                  alert(1);
                  Updates.fetchUpdateAsync();
                }}
              >
                <Text>Download and run update</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
