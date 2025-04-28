import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    getUniqueId().then((uniqueId) => {
      setUniqueId(uniqueId);
    });
  });
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Add Post',
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
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
