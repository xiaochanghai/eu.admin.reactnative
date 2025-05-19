/* eslint-disable react/react-in-jsx-scope */
// import { zodResolver } from '@hookform/resolvers/zod';
import { Env } from '@env';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import type { SubmitHandler } from 'react-hook-form';
// import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { loginApi } from '@/api';
import { Image, Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';
import { signIn } from '@/lib';
import { translate } from '@/lib/i18n';
import { setUserInfo } from '@/lib/user';
import { message } from '@/utils';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

// export type LoginFormProps = {
//   onSubmit?: SubmitHandler<FormType>;
// };

export const LoginForm = () => {
  const router = useRouter();

  // const onSubmit1 = (data) => {
  //   console.log(data);
  //   signIn({ access: 'access-token', refresh: 'refresh-token' });
  //   router.push('/');
  // };
  // 处理登录
  const handleLogin = async () => {
    if (!username) {
      message.info(translate('login.username_null'));
      return;
    }
    if (!password) {
      message.info(translate('login.password_null'));
      return;
    }
    message.loading(translate('login.login_loading'));
    setSubmitBtnDisable(true);
    const { Success, Data } = await loginApi({
      UserAccount: username,
      Password: password,
    });
    if (Success) {
      signIn({
        access: Data.Token,
        userId: Data.UserId,
        refresh: 'refresh-token',
      });
      setUserInfo(Data.UserInfo);

      message.info(translate('login.login_success'));
      setTimeout(() => {
        router.push('/');
      }, 100);
    } else setSubmitBtnDisable(false);
  };

  // 状态管理
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 添加焦点状态
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // style={styles.keyboardAvoidingView}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* 顶部空间 */}
          <View className="h-[10%]" />

          {/* Logo和标题 */}
          <View className="mb-8 items-center">
            <View className="mb-4 size-20 items-center justify-center rounded-full bg-[#EBF5FF]">
              <Image
                className="size-16"
                source={require('../../assets/favicon.png')}
                contentFit="contain"
              />
            </View>
            <Text className="text-lg font-bold text-gray-800">{Env.NAME}</Text>

            <Text className="mt-2 text-base text-gray-500">
              {translate('login.sub_title')}
            </Text>
          </View>

          {/* 登录表单 */}
          <View className="w-full">
            {/* 用户名输入框 */}
            <View
              className={`mb-4 h-[50px] flex-row items-center rounded-xl border px-3 ${usernameFocused ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <FontAwesome
                name="user"
                size={20}
                color={usernameFocused || username ? '#e94538' : '#9ca3af'}
                className="mr-3"
              />
              <TextInput
                className="h-full flex-1 text-base text-gray-800"
                placeholder={translate('login.username_placeholder')}
                placeholderTextColor="#9ca3af"
                value={username}
                onChangeText={setUsername}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
              />
            </View>

            {/* 密码输入框 */}
            <View
              className={`mb-4 h-[50px] flex-row items-center rounded-xl border px-3 ${usernameFocused ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <FontAwesome
                name="lock"
                size={20}
                color={passwordFocused || password ? '#e94538' : '#9ca3af'}
                className="mr-3"
              />
              <TextInput
                className="h-full flex-1 text-base text-gray-800"
                placeholder={translate('login.password_placeholder')}
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </View>
            {/* <ControlledInput
              testID="name"
              control={control}
              name="name"
              label="Name"
            /> */}
            {/* <ControlledInput
              testID="password-input"
              control={control}
              name="password"
              label="Password"
              placeholder="***"
              secureTextEntry={true}
            /> */}

            {/* 记住我和忘记密码 */}
            {/* <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.rememberContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <FontAwesome name="check" size={12} color="white" />}
                </View>
                <Text style={styles.rememberText}>记住我</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.forgotPassword}>忘记密码?</Text>
              </TouchableOpacity>
            </View> */}

            {/* 登录按钮 */}
            <TouchableOpacity
              className="h-[50px] items-center justify-center rounded-xl bg-[#e94538] shadow-sm"
              onPress={handleLogin}
              disabled={submitBtnDisable}
              // onPress={onSubmit1(1)}
            >
              <Text
                className="text-base font-semibold text-white"
                tx="login.login_button"
              />
            </TouchableOpacity>

            {/* 其他登录方式 */}
            <View className="mt-8">
              <View className="flex-row items-center justify-center">
                <View className="h-px flex-1 bg-gray-200" />
                <Text
                  className="px-4 text-sm text-gray-500"
                  tx="login.other_login_way"
                />
                <View className="h-px flex-1 bg-gray-200" />
              </View>

              <View className="mt-6 flex-row justify-center">
                <TouchableOpacity className="mx-4 size-14 items-center justify-center rounded-full border border-gray-200">
                  <FontAwesome name="weixin" size={24} color="#07C160" />
                </TouchableOpacity>
                <TouchableOpacity className="mx-4 size-14 items-center justify-center rounded-full border border-gray-200">
                  <FontAwesome name="qrcode" size={24} color="#0066ff" />
                </TouchableOpacity>
                <TouchableOpacity className="mx-4 size-14 items-center justify-center rounded-full border border-gray-200">
                  <FontAwesome
                    name="fingerprint"
                    size={24}
                    color="#a855f7"
                    group={GroupEnum.Entypo}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* 底部 */}
          <View className="mt-auto items-center pb-6">
            <Text className="text-sm text-gray-500">
              还没有账号?
              <Text className="font-medium text-[#e94538]">联系管理员</Text>
            </Text>
            <Text className="mt-2 text-sm text-gray-500" tx="copyright" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  // optionsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 24,
  // },
  // rememberContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // checkbox: {
  //   width: 20,
  //   height: 20,
  //   borderRadius: 4,
  //   borderWidth: 1,
  //   borderColor: '#d1d5db',
  //   marginRight: 8,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // checkboxChecked: {
  //   backgroundColor: '#0066ff',
  //   borderColor: '#0066ff',
  // },
  // rememberText: {
  //   fontSize: 14,
  //   color: '#6b7280',
  // },
  // forgotPassword: {
  //   fontSize: 14,
  //   color: '#0066ff',
  // },
});
