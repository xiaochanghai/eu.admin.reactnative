/* eslint-disable react/react-in-jsx-scope */
// import { zodResolver } from '@hookform/resolvers/zod';
import { Env } from '@env';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
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
import { signIn } from '@/lib';
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
      message.error('用户名/手机号不能为空！');
      return;
    }
    if (!password) {
      message.error('密码不能为空！');
      return;
    }
    message.loading('数据提交中...');
    const { Success, Data } = await loginApi({
      UserAccount: username,
      Password: password,
    });
    message.hideLoading();
    if (Success) {
      signIn({
        access: Data.Token,
        userId: Data.UserId,
        refresh: 'refresh-token',
      });
      router.push('/');
    }
  };

  // 状态管理
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 添加焦点状态
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={10}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* 顶部空间 */}
          <View style={styles.topSpace} />

          {/* Logo和标题 */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image
                source={require('../../assets/favicon.png')}
                style={{ width: 60, height: 60 }}
                contentFit="contain"
              />
            </View>
            <Text style={styles.title}>{Env.NAME}</Text>
            <Text style={styles.subtitle}>智能制造管理系统</Text>
          </View>

          {/* 登录表单 */}
          <View style={styles.formContainer}>
            {/* 用户名输入框 */}
            <View
              style={[
                styles.inputGroup,
                usernameFocused && styles.inputGroupFocused,
              ]}
            >
              <FontAwesome
                name="user"
                size={20}
                color={usernameFocused || username ? '#e94538' : '#9ca3af'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="用户名/手机号"
                placeholderTextColor="#9ca3af"
                value={username}
                onChangeText={setUsername}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
              />
            </View>

            {/* 密码输入框 */}
            <View
              style={[
                styles.inputGroup,
                passwordFocused && styles.inputGroupFocused,
              ]}
            >
              <FontAwesome
                name="lock"
                size={20}
                color={passwordFocused || password ? '#e94538' : '#9ca3af'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="密码"
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
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={!username || !password}
              // onPress={onSubmit1(1)}
            >
              <Text style={styles.loginButtonText}>登 录</Text>
            </TouchableOpacity>

            {/* 其他登录方式 */}
            <View style={styles.otherLoginContainer}>
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>其他登录方式</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="weixin" size={24} color="#07C160" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="qrcode" size={24} color="#0066ff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  {/* <FontAwesome name="fingerprint" size={24} color="#a855f7" /> */}
                  <Entypo name="fingerprint" size={24} color="#a855f7" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 底部 */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              还没有账号? <Text style={styles.footerLink}>联系管理员</Text>
            </Text>
            <Text style={styles.copyright}>© 2025 苏州优智云科技有限公司</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  topSpace: {
    height: '10%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 50,
  },
  // 添加焦点样式
  inputGroupFocused: {
    borderColor: '#0066ff',
    backgroundColor: '#f0f7ff',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0066ff',
    borderColor: '#0066ff',
  },
  rememberText: {
    fontSize: 14,
    color: '#6b7280',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#0066ff',
  },
  loginButton: {
    backgroundColor: '#e94538',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  otherLoginContainer: {
    marginTop: 32,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#6b7280',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  footerLink: {
    color: '#e94538',
    fontWeight: '500',
  },
  copyright: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
});
