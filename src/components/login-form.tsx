import { Env } from '@env';
import { zodResolver } from '@hookform/resolvers/zod';
import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
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
import { Eye, EyeOff } from '@/components/ui/icons';
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

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  // const { language, setLanguage } = useSelectedLanguage();
  const { isDark } = useAppColorScheme();
  const insets = useSafeAreaInsets();

  const { handleSubmit, control, setValue, formState } = useForm<FormType>({
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
  const iconColor = colors.neutral[isDark ? 300 : 600];
  const focusColor = isDark ? colors.neutral[100] : colors.neutral[900];

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
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: Math.max(insets.top, 24),
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
        >
          <View className="flex-1 justify-center py-10">
            <MotiView
              className="mb-10 w-full max-w-[420px] items-center self-center"
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 450 }}
            >
              <View className="mb-8 size-14 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-black dark:border-neutral-700">
                <Image
                  className="size-11"
                  source={require('../../assets/favicon.png')}
                  contentFit="contain"
                />
              </View>
              <Text className="text-center text-[32px] font-semibold leading-10 tracking-[-0.6px] text-neutral-900 dark:text-white">
                欢迎回来
              </Text>
              <Text className="mt-3 text-center text-base leading-6 text-neutral-500 dark:text-neutral-400">
                登录 {Env.NAME}，继续你的工作
              </Text>
            </MotiView>

            <MotiView
              className="w-full max-w-[420px] self-center"
              from={{ opacity: 0, translateY: 14 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 450, delay: 100 }}
            >
              <ControlledInputWithIcon
                testID="account-input"
                control={control}
                name="account"
                placeholder={translate('login.username_placeholder')}
                autoComplete="username"
                autoCorrect={false}
                returnKeyType="next"
                focusColor={focusColor}
                containerClassName="mb-4"
                inputClassName="h-14 rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
              />

              <ControlledInputWithIcon
                testID="password-input"
                control={control}
                name="password"
                placeholder={translate('login.password_placeholder')}
                secureTextEntry={!showPassword}
                autoComplete="current-password"
                returnKeyType="done"
                onSubmitEditing={handleSubmit(handleFormSubmit)}
                focusColor={focusColor}
                containerClassName="mb-3"
                inputClassName="h-14 rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
                rightIcon={
                  showPassword ? (
                    <Eye
                      color={iconColor}
                      className="size-5 text-gray-400 dark:text-gray-500"
                    />
                  ) : (
                    <EyeOff
                      color={iconColor}
                      className="size-5 text-gray-400 dark:text-gray-500"
                    />
                  )
                }
                onRightIconPress={togglePasswordVisibility}
              />

              <View className="mb-5 mt-1">
                <Checkbox
                  checked={rememberPassword}
                  onChange={setRememberPassword}
                  label={translate('login.remember_password')}
                  accessibilityLabel="Remember password"
                  className="self-start"
                />
              </View>

              <Button
                testID="login-button"
                label={translate('login.login_button')}
                onPress={handleSubmit(handleFormSubmit)}
                loading={formState.isSubmitting}
                disabled={formState.isSubmitting}
                className="h-14 rounded-xl bg-neutral-900 active:opacity-80 dark:bg-white"
                textClassName="text-base font-semibold text-white dark:text-neutral-900"
              />
              <Text className="mt-5 text-center text-sm leading-5 text-neutral-500 dark:text-neutral-400">
                账号由企业管理员统一创建和管理
              </Text>
            </MotiView>
          </View>

          <View
            className="items-center pb-6"
            style={{ paddingBottom: Math.max(insets.bottom, 20) }}
          >
            <Text className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              还没有账号？请联系管理员
            </Text>
            <Text
              className="mt-2 text-center text-xs text-neutral-400 dark:text-neutral-500"
              tx="copyright"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
