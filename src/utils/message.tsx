// src/utils/message.tsx
import { ActivityIndicator } from 'react-native';
import { hideMessage, showMessage } from 'react-native-flash-message';

/**
 * @message 提示内容
 */
export const info = (message: string) => {
  showMessage({
    message,
    type: 'info',
  });
};

/**
 * @message 提示内容
 */
export const error = (message: string) => {
  showMessage({
    message,
    type: 'danger',
  });
};

/**
 * @message 加载提示内容
 * @param message 提示文字
 */
export const loading = (message: string = '加载中...') => {
  showMessage({
    message,
    type: 'default',
    icon: () => (
      <ActivityIndicator
        color="#fff"
        size="small"
        style={{ paddingRight: 5 }}
      />
    ),
    duration: 0, // 不自动隐藏
    hideOnPress: false,
  });
};

/**
 * 隐藏加载提示
 */
export const hideLoading = () => {
  hideMessage();
};
