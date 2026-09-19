// src/utils/message.tsx
import { Toast } from '@/components/ui/toast';

/**
 * 显示信息提示
 * @param message 提示内容
 */
export const info = (message: string) => {
  Toast.info(message);
};

/**
 * 显示成功提示
 * @param message 提示内容
 */
export const success = (message: string) => Toast.success(message);

/**
 * 显示错误提示
 * @param message 提示内容
 */
export const error = (message: string) => Toast.error(message);

/**
 * 显示加载提示
 * @param message 提示文字
 * @param duration 持续时间（秒）
 */
export const loading = (message: string = '加载中...', duration: number = 30) =>
  Toast.loading({ content: message, duration });

/**
 * 隐藏加载提示
 */
export const hideLoading = () => Toast.hide();
