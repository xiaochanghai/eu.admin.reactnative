// import { Pressable } from '@/components/ui';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAppColorScheme } from '@/lib/hooks';

interface PrivacyModalProps {
  visible: boolean;
  onAgree: () => void;
  onDisagree: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({
  visible,
  onAgree,
  onDisagree,
}) => {
  const router = useRouter();
  const { isDark } = useAppColorScheme();

  const privacyPolicyText1 = `
    1.我们可能会申请系统设备权限收集设备信息、日志信息，用于推送和安全风控并申请存储权限，用于保存和读取你上传的内容。
    2.麦克风、相册(上传、存储)等权限均不会默认或强制开启收集信息。你有权拒绝开启，拒绝授权不会影响App提供基本服务。
    3.我们不会将你的个人信息提供给任何第三方，除非事先获得你的同意或法律法规另有规定。
    4.我们会采取合理的技术措施保护你的个人信息安全，防止信息的丢失、被盗用、被篡改或泄露。
    5.你可以随时访问、更正或删除你的个人信息，或注销账号。如有任何疑问，请通过应用内的“反馈与帮助”联系我们。
    6.我们可能会不时更新本指引。我们会在应用内显著位置发布更新通知，并在必要时征求你的同意。
    7.如果你不同意本指引的任何内容，可以选择拒绝并卸载应用程序。
    8.感谢你对我们的支持与信任！我们将竭尽全力保护你的个人信息安全。`;

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onDisagree}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: isDark ? '#262626' : 'white' },
          ]}
        >
          <Text
            style={[styles.title, { color: isDark ? '#f3f4f6' : '#111827' }]}
          >
            隐私政策与服务条款
          </Text>
          <ScrollView
            style={[
              styles.scrollView,
              { borderColor: isDark ? '#404040' : '#e5e7eb' },
            ]}
          >
            <View className="flex-row flex-wrap">
              <Text
                style={[
                  styles.policyText,
                  { color: isDark ? '#d1d5db' : '#374151' },
                ]}
              >
                {' '}
                本个人信息保护指引将通过
              </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push('/user-agreement');
                }}
              >
                <Text
                  style={[
                    styles.policyText,
                    { color: isDark ? '#60a5fa' : '#2563eb' },
                  ]}
                >
                  《用户协议》
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.policyText,
                  { color: isDark ? '#d1d5db' : '#374151' },
                ]}
              >
                与
              </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push('/privacy-policy');
                }}
              >
                <Text
                  style={[
                    styles.policyText,
                    { color: isDark ? '#60a5fa' : '#2563eb' },
                  ]}
                >
                  《隐私政策》
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.policyText,
                  { color: isDark ? '#d1d5db' : '#374151' },
                ]}
              >
                帮助你了解我们如何收集处理个人信息。
              </Text>
            </View>
            <Text
              style={[
                styles.policyText,
                { color: isDark ? '#d1d5db' : '#374151' },
              ]}
            >
              {privacyPolicyText1}
            </Text>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[
                styles.button,
                styles.disagreeButton,
                {
                  backgroundColor: isDark ? '#404040' : '#f9fafb',
                  borderColor: isDark ? '#525252' : '#d1d5db',
                },
              ]}
              onPress={onDisagree}
            >
              <Text
                style={[
                  styles.buttonTextDisagree,
                  { color: isDark ? '#e5e7eb' : '#374151' },
                ]}
              >
                拒绝
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                styles.agreeButton,
                { backgroundColor: isDark ? '#1d4ed8' : '#2563eb' },
              ]}
              onPress={onAgree}
            >
              <Text style={styles.buttonTextAgree}>同意</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    height: '55%',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  policyText: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 2,
    width: '45%',
  },
  disagreeButton: {
    borderWidth: 1,
  },
  agreeButton: {},
  buttonTextDisagree: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextAgree: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PrivacyModal;
