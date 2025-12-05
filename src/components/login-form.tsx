import { Env } from '@env';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as z from 'zod';

// import { LanguageSelector } from '@/components/language-selector';
import {
  Button,
  Checkbox,
  ControlledInputWithIcon,
  Image,
  Text,
  View,
} from '@/components/ui';
import colors from '@/components/ui/colors';
import {
  Eye,
  EyeOff,
  FontAwesome,
  GroupEnum,
  Lock,
  User,
} from '@/components/ui/icons';
// import type { Language } from '@/lib/i18n/resources';
import { isIos } from '@/lib';
import { useAppColorScheme } from '@/lib/hooks';
// import { useSelectedLanguage } from '@/lib';
import { translate } from '@/lib/i18n';
import { getItem, removeItem, setItem } from '@/lib/storage';

const schema = z.object({
  account: z
    .string({
      required_error: translate('login.username_placeholder'),
    })
    .min(1, translate('login.username_placeholder')),
  password: z
    .string({
      required_error: translate('login.password_placeholder'),
    })
    .min(1, translate('login.password_placeholder')),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => { } }: LoginFormProps) => {
  // const { language, setLanguage } = useSelectedLanguage();
  const { isDark } = useAppColorScheme();
  const insets = useSafeAreaInsets();

  const { handleSubmit, control, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { account: '', password: '' },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  type SavedCredentials = {
    account: string;
    password: string;
    remember: boolean;
  };

  const REMEMBER_KEY = 'login/credentials';

  useEffect(() => {
    const saved = getItem<SavedCredentials>(REMEMBER_KEY);
    if (saved?.remember) {
      setValue('account', saved.account);
      setValue('password', saved.password);
      setRememberPassword(true);
    }
  }, [setValue]);

  const handleFormSubmit: SubmitHandler<FormType> = async (data) => {
    if (rememberPassword) {
      setItem<SavedCredentials>(REMEMBER_KEY, {
        account: data.account,
        password: data.password,
        remember: true,
      });
    } else {
      await removeItem(REMEMBER_KEY);
    }
    await onSubmit(data);
  };

  // const handleLanguageChange = (languageCode: string) =>
  //   setLanguage(languageCode as Language);
  const iconColor = colors.neutral[isDark ? 300 : 900];
  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <KeyboardAvoidingView
        enabled={isIos}
        behavior={isIos ? 'padding' : undefined}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1 bg-white dark:bg-neutral-900"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
        >
          {/* 顶部空间 */}
          {/* <View className="h-[20%]" /> */}
          {/* Header with Language Selector */}
          <View className="z-50 flex-row items-center justify-between px-6 py-8 ">
            <View style={{ height: 50 }} />
            {/* <LanguageSelector
              currentLanguage={language}
              onLanguageChange={handleLanguageChange}
            /> */}
          </View>
          {/* Logo和标题 */}
          <View className="mb-10 mt-5 items-center">
            <View className="size-24 items-center justify-center rounded-full">
              <Image
                className="size-20"
                source={require('../../assets/favicon.png')}
                contentFit="contain"
              />
            </View>
            <Text className="mt-5 text-2xl font-bold text-gray-800">
              {Env.NAME}
            </Text>
            <Text className="mt-2 text-xl text-gray-500">
              {translate('login.sub_title')}
            </Text>
          </View>

          {/* Login Form Section */}
          <View className="pb-30 flex-1 px-6">
            <ControlledInputWithIcon
              testID="account-input"
              control={control}
              name="account"
              placeholder={translate('login.username_placeholder')}
              leftIcon={
                <User
                  color={iconColor}
                  className="size-6 text-gray-400 dark:text-gray-500"
                />
              }
            />

            <ControlledInputWithIcon
              testID="password-input"
              control={control}
              name="password"
              placeholder={translate('login.password_placeholder')}
              secureTextEntry={!showPassword}
              leftIcon={
                <Lock
                  color={iconColor}
                  className="size-6 text-gray-400 dark:text-gray-500"
                />
              }
              rightIcon={
                showPassword ? (
                  <Eye
                    color={iconColor}
                    className="size-5 text-gray-400 dark:text-gray-500"
                  />
                ) : (
                  <EyeOff className="size-5 text-gray-400 dark:text-gray-500" />
                )
              }
              onRightIconPress={togglePasswordVisibility}
            />

            {/* Remember Password Checkbox */}
            <View className="mb-6 px-6">
              <Checkbox
                checked={rememberPassword}
                onChange={setRememberPassword}
                label={translate('login.remember_password')}
                accessibilityLabel="Remember password"
              />
            </View>

            {/* Login Button */}
            <Button
              testID="login-button"
              label={translate('login.login_button')}
              onPress={handleSubmit(handleFormSubmit)}
              className="h-14 rounded-full"
              style={{
                backgroundColor: colors.primary[isDark ? 700 : 600],
              }}
              textClassName="font-light text-white text-2xl"
            />
          </View>

          {/* 其他登录方式 */}
          <View className="mt-10">
            <View className="flex-row items-center justify-center">
              <View className="h-px flex-1 bg-gray-200" />
              <Text
                className="px-4 text-lg text-gray-500"
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

          {/* 底部 */}
          <View
            className="mt-auto items-center py-8"
            style={{ paddingBottom: insets.bottom }}
          >
            <Text className="text-lg text-gray-500">
              还没有账号?
              <Text className="font-lg text-blue-500"> 联系管理员</Text>
            </Text>
            <Text className="mt-2 text-lg text-gray-400" tx="copyright" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
