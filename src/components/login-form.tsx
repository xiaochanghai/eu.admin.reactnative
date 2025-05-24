import { Env } from '@env';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { loginApi } from '@/api';
import { Image, Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';
import { signIn } from '@/lib';
import { translate } from '@/lib/i18n';
import { setUserInfo } from '@/lib/user';
import { message } from '@/utils';

export const LoginForm = () => {
  const router = useRouter();

  // 状态管理
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  // 表单验证
  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = translate('login.username_null');
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = translate('login.password_null');
      isValid = false;
    }
    // else if (password.length < 6) {
    //   newErrors.password = translate('login.password_too_short');
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  // 处理登录
  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    message.loading(translate('login.login_loading'));

    try {
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

        message.success(translate('login.login_success'));
        setTimeout(() => {
          router.push('/');
        }, 100);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      // message.error(translate('login.login_failed'));
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <ScrollView className="flex-1 px-4">
          {/* 顶部空间 */}
          <View className="h-[10%]" />

          {/* Logo和标题 */}
          <View className="mb-10 items-center">
            <View className="mb-5 size-20 items-center justify-center rounded-full bg-[#EBF5FF] shadow-sm">
              <Image
                className="size-16"
                source={require('../../assets/favicon.png')}
                contentFit="contain"
              />
            </View>
            <Text className="text-xl font-bold text-gray-800">{Env.NAME}</Text>
            <Text className="mt-2 text-base text-gray-500">
              {translate('login.sub_title')}
            </Text>
          </View>

          {/* 登录表单 */}
          <View className="w-full">
            {/* 用户名输入框 */}
            <View
              className={`mb-4 overflow-hidden rounded-xl border ${usernameFocused ? 'border-blue-500 bg-blue-50' : errors.username ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
            >
              <View className="flex-row items-center px-4 py-3">
                <FontAwesome
                  name="user"
                  size={20}
                  color={usernameFocused || username ? '#3b82f6' : '#9ca3af'}
                  className="mr-3"
                />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder={translate('login.username_placeholder')}
                  placeholderTextColor="#9ca3af"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    if (errors.username) setErrors({ ...errors, username: '' });
                  }}
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                  returnKeyType="next"
                />
              </View>
              {errors.username ? (
                <Text className="bg-red-50 px-4 py-1 text-xs text-red-500">
                  {errors.username}
                </Text>
              ) : null}
            </View>

            {/* 密码输入框 */}
            <View
              className={`mb-6 overflow-hidden rounded-xl border ${passwordFocused ? 'border-blue-500 bg-blue-50' : errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
            >
              <View className="flex-row items-center px-4 py-3">
                <FontAwesome
                  name="lock"
                  size={20}
                  color={passwordFocused || password ? '#3b82f6' : '#9ca3af'}
                  className="mr-3"
                />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder={translate('login.password_placeholder')}
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
              </View>
              {errors.password ? (
                <Text className="bg-red-50 px-4 py-1 text-xs text-red-500">
                  {errors.password}
                </Text>
              ) : null}
            </View>

            {/* 登录按钮 */}
            <TouchableOpacity
              className={`h-[50px] items-center justify-center rounded-xl shadow-sm ${isLoading ? 'bg-blue-400' : 'bg-blue-500 active:bg-blue-600'}`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text
                  className="text-base font-semibold text-white"
                  tx="login.login_button"
                />
              )}
            </TouchableOpacity>

            {/* 其他登录方式 */}
            <View className="mt-10">
              <View className="flex-row items-center justify-center">
                <View className="h-px flex-1 bg-gray-200" />
                <Text
                  className="px-4 text-sm text-gray-500"
                  tx="login.other_login_way"
                />
                <View className="h-px flex-1 bg-gray-200" />
              </View>

              <View className="mt-6 flex-row justify-center">
                <TouchableOpacity className="mx-4 size-14 items-center justify-center rounded-full border border-gray-200 shadow-sm active:bg-gray-50">
                  <FontAwesome name="weixin" size={24} color="#07C160" />
                </TouchableOpacity>
                <TouchableOpacity className="mx-4 size-14 items-center justify-center rounded-full border border-gray-200 shadow-sm active:bg-gray-50">
                  <FontAwesome name="qrcode" size={24} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity className="mx-4 size-14 items-center justify-center rounded-full border border-gray-200 shadow-sm active:bg-gray-50">
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
          <View className="mt-auto items-center py-8">
            <Text className="text-sm text-gray-500">
              还没有账号?
              <Text className="font-medium text-blue-500"> 联系管理员</Text>
            </Text>
            <Text className="mt-2 text-sm text-gray-400" tx="copyright" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
