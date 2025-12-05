import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum, LoginOut } from '@/components/ui/icons';
import { useAppColorScheme, useAuth } from '@/lib';
import { clearUserInfo } from '@/lib/user';

/**
 * 退出确认弹窗组件
 *
 * 用于确认用户退出登录操作的模态弹窗
 * 包含现代化的设计和暗色模式支持
 */

type LogoutConfirmModalProps = {
  /** 控制弹窗显示/隐藏 */
  visible: boolean;
  /** 关闭弹窗的回调函数 */
  onClose: () => void;
  /** 确认退出后的回调函数（可选，默认执行标准退出流程） */
  onConfirm?: () => void;
};

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const router = useRouter();
  const signOut = useAuth.use.signOut();
  const { isDark } = useAppColorScheme();

  const handleConfirm = () => {
    onClose();

    if (onConfirm) {
      // 如果提供了自定义确认回调，执行它
      onConfirm();
    } else {
      // 默认退出流程
      signOut();
      clearUserInfo();
      router.replace('/login');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 items-center justify-end bg-black/40 px-5"
      >
        <TouchableOpacity
          activeOpacity={1}
          className="mx-4 mb-6 w-full rounded-2xl bg-white p-2 shadow-lg dark:bg-neutral-800"
          onPress={() => { }}
        >
          {/* 顶部拖拽指示器 */}
          <TouchableOpacity className="w-full items-center justify-center">
            <Text
              style={{
                width: 35,
                height: 5,
                backgroundColor: isDark ? '#525252' : '#A3A3A3',
                borderRadius: 3,
              }}
            />
          </TouchableOpacity>

          {/* 关闭按钮 */}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="关闭"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            onPress={onClose}
            className="absolute left-3 top-3 size-10 items-center justify-center rounded-full bg-[#F5F5F5] dark:bg-neutral-700"
          >
            <FontAwesome
              name="arrow-left"
              size={18}
              color={isDark ? '#D4D4D4' : '#737373'}
              group={GroupEnum.AntDesign}
            />
          </TouchableOpacity>

          {/* 内容区域 */}
          <View className="items-center p-6">
            {/* 图标 */}
            <View className="mb-4 rounded-full bg-red-50 p-4 dark:bg-red-950">
              <LoginOut width={32} height={32} color="#EF4444" />
            </View>

            {/* 标题 */}
            <Text className="mb-2 text-2xl font-semibold text-neutral-900 dark:text-white">
              确定要退出登录吗？
            </Text>

            {/* 副标题 */}
            <Text className="mb-5 text-center text-base text-neutral-500 dark:text-gray-400">
              退出登录后将无法接收及时的消息提示。
            </Text>

            {/* 确认按钮 */}
            <TouchableOpacity
              className="mx-3 w-full items-center justify-center rounded-full bg-primary-600 py-3.5 shadow-sm"
              onPress={handleConfirm}
            >
              <Text className="font-medium text-white" tx="settings.logout" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
export default LogoutConfirmModal;
