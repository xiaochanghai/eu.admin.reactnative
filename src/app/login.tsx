// import { useRouter } from 'expo-router';
import React from 'react';

import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';

export default function Login() {
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm />
    </>
  );
}
