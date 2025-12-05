import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { SafeAreaView, ScrollView, Text } from '@/components/ui';
import { Toast } from '@/components/ui/toast';

export default function ToastTest() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // 显示 Loading Toast
  const showLoading = () => {
    const id = Toast.loading('加载中...');
    setLoadingId(id);
  };

  // 显示自定义时长的 Loading
  const showLoadingWithDuration = () => {
    const id = Toast.loading({ content: '3秒后自动关闭', duration: 3 });
    setLoadingId(id);
  };

  // 关闭特定 Loading
  const hideLoading = () => {
    if (loadingId) {
      Toast.hide(loadingId);
      setLoadingId(null);
    }
  };

  // 关闭所有 Toast
  const hideAll = () => {
    Toast.hide();
    setLoadingId(null);
  };

  // 显示 Success Toast
  const showSuccess = () => {
    Toast.success('操作成功！');
  };

  // 显示自定义时长的 Success
  const showSuccessWithDuration = () => {
    Toast.success({ content: '保存成功，5秒后关闭', duration: 5 });
  };

  // 显示 Error Toast
  const showError = () => {
    Toast.error('操作失败！');
  };

  // 显示自定义时长的 Error
  const showErrorWithDuration = () => {
    Toast.error({ content: '网络错误，请重试', duration: 3 });
  };

  // 显示 Info Toast
  const showInfo = () => {
    Toast.info('这是一条提示信息');
  };

  // 显示自定义时长的 Info
  const showInfoWithDuration = () => {
    Toast.info({ content: '温馨提示：请注意查看', duration: 4 });
  };

  // 连续显示多个 Toast
  const showMultiple = () => {
    Toast.info('第一条消息');
    setTimeout(() => {
      Toast.success('第二条消息');
    }, 500);
    setTimeout(() => {
      Toast.error('第三条消息');
    }, 1000);
  };

  // 模拟异步操作
  const simulateAsyncOperation = () => {
    const id = Toast.loading('正在处理...');
    setTimeout(() => {
      Toast.hide(id);
      Toast.success('处理完成！');
    }, 2000);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Toast 测试',
          headerTintColor: '#000',
          headerBackTitle: '返回',
        }}
      />
      <ScrollView className="flex-1 bg-gray-100">
        <SafeAreaView className="flex-1">
          <View style={styles.container}>
            {/* Loading Toast 测试 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Loading Toast</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={showLoading}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>显示 Loading</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={showLoadingWithDuration}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>显示 Loading (3秒)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={hideLoading}
                activeOpacity={0.7}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  关闭当前 Loading
                </Text>
              </TouchableOpacity>
            </View>

            {/* Success Toast 测试 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Success Toast</Text>

              <TouchableOpacity
                style={[styles.button, styles.successButton]}
                onPress={showSuccess}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>显示成功提示</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.successButton]}
                onPress={showSuccessWithDuration}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>显示成功提示 (5秒)</Text>
              </TouchableOpacity>
            </View>

            {/* Error Toast 测试 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Error Toast</Text>

              <TouchableOpacity
                style={[styles.button, styles.errorButton]}
                onPress={showError}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>显示错误提示</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.errorButton]}
                onPress={showErrorWithDuration}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>显示错误提示 (3秒)</Text>
              </TouchableOpacity>
            </View>

            {/* Info Toast 测试 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Info Toast</Text>

              <TouchableOpacity
                style={[styles.button, styles.infoButton]}
                onPress={showInfo}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>显示信息提示</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.infoButton]}
                onPress={showInfoWithDuration}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>显示信息提示 (4秒)</Text>
              </TouchableOpacity>
            </View>

            {/* 综合测试 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>综合测试</Text>

              <TouchableOpacity
                style={[styles.button, styles.warningButton]}
                onPress={showMultiple}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>连续显示多个 Toast</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.warningButton]}
                onPress={simulateAsyncOperation}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>模拟异步操作</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.dangerButton]}
                onPress={hideAll}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>关闭所有 Toast</Text>
              </TouchableOpacity>
            </View>

            {/* 使用说明 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>使用说明</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  • Loading Toast 默认不会自动关闭，需要手动关闭
                </Text>
                <Text style={styles.infoText}>
                  • Success/Error/Info Toast 默认 2 秒后自动关闭
                </Text>
                <Text style={styles.infoText}>
                  • 可以通过 duration 参数自定义显示时长
                </Text>
                <Text style={styles.infoText}>
                  • Toast.hide(id) 关闭指定 Toast
                </Text>
                <Text style={styles.infoText}>
                  • Toast.hide() 关闭所有 Toast
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },
  button: {
    backgroundColor: '#0066ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#6b7280',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  successButton: {
    backgroundColor: '#10b981',
  },
  errorButton: {
    backgroundColor: '#ef4444',
  },
  infoButton: {
    backgroundColor: '#3b82f6',
  },
  warningButton: {
    backgroundColor: '#f59e0b',
  },
  dangerButton: {
    backgroundColor: '#dc2626',
  },
  infoBox: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoText: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 4,
    lineHeight: 20,
  },
});
