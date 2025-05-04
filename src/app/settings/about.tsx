import { Env } from '@env';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { getVersion } from 'react-native-device-info';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { Image, NavHeader, Text, View } from '@/components/ui';
import { translate } from '@/lib/i18n';

export default function LoginForm() {
  const [updateId, setUpdateId] = useState<string | null>(null);
  useEffect(() => {
    if (Platform.OS !== 'web') {
      const updateId1 = Updates?.updateId;
      setUpdateId(updateId1);
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={10}
      >
        <NavHeader tx="settings.about.about_us" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* 顶部空间 */}
          <View style={styles.topSpace} />

          {/* Logo和标题 */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image
                source={require('../../../assets/favicon.png')}
                style={{ width: 60, height: 60 }}
                contentFit="contain"
              />
            </View>
            <Text style={styles.title}>{Env.NAME + ' V' + getVersion()}</Text>
            <Text style={styles.subtitle}>{translate('login.sub_title')}</Text>
            {updateId ? (
              <Text style={styles.subtitle}>版本ID：{updateId}</Text>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  copyright: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
});
