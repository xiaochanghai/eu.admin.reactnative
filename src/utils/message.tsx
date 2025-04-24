// src/utils/message.tsx
import { Toast } from '@ant-design/react-native';

import { FontAwesome } from '@/components/ui/icons';

/**
 * @message 提示内容
 */
export const info = (message: string, icon: string = '') => {
  if (icon)
    Toast.show({
      content: '上传中',
      icon: <FontAwesome name={icon as any} size={16} color="white" />,
    });
  else Toast.show(message);
};
/**
 * @message 提示内容
 */
export const success = (message: string) => Toast.success(message);

/**
 * @message 提示内容
 */
export const error = (message: string) => Toast.fail(message);
/**
 * @message 加载提示内容
 * @param message 提示文字
 */
export const loading = (message: string = '加载中...') =>
  Toast.loading({ content: message, duration: 15 });

/**
 * 隐藏加载提示
 */
export const hideLoading = () => Toast.removeAll();
