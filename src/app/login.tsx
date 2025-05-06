// import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
export default function Login() {
  return (
    <>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      <FocusAwareStatusBar />
      <LoginForm />
    </>
  );
}
