// import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { getUniqueId } from 'react-native-device-info';

import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { setUniqueId } from '@/lib/auth/utils';
import { recordDevice } from '@/lib/device';

export default function Login() {
  useEffect(() => {
    if (Platform.OS !== 'web')
      getUniqueId().then((uniqueId) => {
        //console.log('1211:' + uniqueId)
        setUniqueId(uniqueId);
        recordDevice(uniqueId);
      });
  });
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm />
    </>
  );
}
