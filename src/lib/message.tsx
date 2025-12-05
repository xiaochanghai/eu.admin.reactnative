// src/utils/message.tsx
import { Toast } from '@/components/ui/toast';

/**
 * @message 提示内容
 */
export const info = (message: string, icon: string = '') => {
  // 注意：自定义 Toast 暂不支持自定义图标
  Toast.info(message);
};
/**
 * @message 提示内容
 */
export const success = (message: string) => Toast.success(message);

/**
 * @message 提示内容
 */
export const error = (message: string) => Toast.error(message);
/**
 * @message 加载提示内容
 * @param message 提示文字
 */
export const loading = (message: string = '加载中...', duration: number = 15) =>
  Toast.loading({ content: message, duration });

/**
 * 隐藏加载提示
 */
export const hideLoading = () => Toast.hide();
