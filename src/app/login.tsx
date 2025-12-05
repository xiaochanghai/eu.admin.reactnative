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
    loading('用户登录中...');
    // const { success, token, userId, msg } = await loginApi(
    //   data.account,
    //   data.password
    // );
    const { Success, Data, Message } = await loginApi({
      UserAccount: data.account,
      Password: data.password,
    });
    if (Success) {
      success(Message || '登录成功');
      signIn({
        access: Data.Token,
        userId: Data.UserId,
        refresh: 'refresh-token',
      });
      setUserInfo(Data.UserInfo);

      router.replace("/");

    } else error(Message!);
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
