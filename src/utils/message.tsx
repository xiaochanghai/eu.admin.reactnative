import { showMessage } from 'react-native-flash-message';

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
