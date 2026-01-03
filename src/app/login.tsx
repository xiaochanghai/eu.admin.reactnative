import { useRouter } from 'expo-router';
import React from 'react';

import { loginApi } from '@/api';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib';
import { error, loading, success } from '@/lib/message';
import { setUserInfo } from '@/lib/user';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    try {
      loading('用户登录中...');

      const { Success, Data, Message } = await loginApi({
        UserAccount: data.account,
        Password: data.password,
      });

      if (Success && Data) {
        success(Message || '登录成功');
        signIn({
          access: Data.Token,
          userId: Data.UserId,
          refresh: 'refresh-token',
        });
        setUserInfo(Data.UserInfo);
        router.replace('/');
      } else error(Message || '登录失败，请重试');
    } catch (err) {
      console.error('Login error:', err);
      error('登录失败，请检查网络连接后重试');
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
