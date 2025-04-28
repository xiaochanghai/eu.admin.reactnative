// import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { getUniqueId } from 'react-native-device-info';

// import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { recordDevice } from '@/lib/device';
export default function Login() {
  useEffect(() => {
    getUniqueId().then((uniqueId) => {
      //console.log('1211:' + uniqueId)
      recordDevice(uniqueId);
    });
  });
  // const router = useRouter();
  // const signIn = useAuth.use.signIn();

  // const onSubmit: LoginFormProps['onSubmit'] = (data) => {
  //   console.log(data);
  //   signIn({ access: 'access-token', refresh: 'refresh-token' });
  //   router.push('/');
  // };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm />
    </>
  );
}
