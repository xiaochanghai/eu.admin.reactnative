/**
 * useJPush Hook
 * 提供在React组件中使用极光推送的便捷方式
 */

import { useEffect, useState } from 'react';

import { isWeb } from '@/lib';

import jpushService, {
  type JPushMessage,
  type JPushNotification,
} from '../jpush';

export interface UseJPushOptions {
  /** 通知事件回调（包含接收和打开） */
  onNotification?: (notification: JPushNotification) => void;
  /** 自定义消息回调 */
  onCustomMessage?: (message: JPushMessage) => void;
  /** 别名（用户ID） */
  alias?: string;
  /** 标签 */
  tags?: string[];
}

/**
 * useJPush Hook
 * 在组件中使用极光推送功能
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { registrationId, setAlias, setTags } = useJPush({
 *     onNotification: (notification) => {
 *       console.log('Notification:', notification);
 *       // 根据 notificationEventType 判断是接收还是打开
 *       if (notification.notificationEventType === 'notificationOpened') {
 *         // 用户点击了通知
 *       }
 *     },
 *     alias: user?.id,
 *     tags: ['vip', 'android'],
 *   });
 *
 *   return <View>...</View>;
 * }
 * ```
 */
export function useJPush(options: UseJPushOptions = {}) {
  const { onNotification, onCustomMessage, alias, tags } = options;

  const [registrationId, setRegistrationId] = useState<string | null>(null);

  // 初始化监听器
  useEffect(() => {
    // 只在非 Web 环境下初始化 JPush
    if (isWeb) {
      return;
    }

    let removeNotificationListener: (() => void) | undefined;
    let removeCustomMessageListener: (() => void) | undefined;

    // 设置通知监听器（包含接收和打开事件）
    if (onNotification) {
      removeNotificationListener =
        jpushService.addNotificationListener(onNotification);
    }

    // 设置自定义消息监听器
    if (onCustomMessage) {
      removeCustomMessageListener =
        jpushService.addCustomMessageListener(onCustomMessage);
    }

    // 获取Registration ID
    jpushService.getRegistrationId().then((id) => {
      setRegistrationId(id);
    });

    // 清理监听器
    return () => {
      removeNotificationListener?.();
      removeCustomMessageListener?.();
    };
  }, [onNotification, onCustomMessage]);

  // 设置别名
  useEffect(() => {
    if (!isWeb && alias) {
      jpushService.setAlias(alias);
    }
  }, [alias]);

  // 设置标签
  useEffect(() => {
    if (!isWeb && tags && tags.length > 0) {
      jpushService.setTags(tags);
    }
  }, [tags]);

  return {
    /** 当前设备的Registration ID */
    registrationId,
    /** 设置别名 */
    setAlias: (newAlias: string) => jpushService.setAlias(newAlias),
    /** 删除别名 */
    deleteAlias: () => jpushService.deleteAlias(),
    /** 设置标签（覆盖） */
    setTags: (newTags: string[]) => jpushService.setTags(newTags),
    /** 添加标签 */
    addTags: (newTags: string[]) => jpushService.addTags(newTags),
    /** 删除标签 */
    deleteTags: (tagsToDelete: string[]) =>
      jpushService.deleteTags(tagsToDelete),
    /** 清空所有标签 */
    cleanTags: () => jpushService.cleanTags(),
    /** 设置角标 */
    setBadge: (badge: number) => jpushService.setBadge(badge),
    /** 检查通知权限 */
    checkNotificationEnabled: () => jpushService.checkNotificationEnabled(),
    /** 清除所有通知（仅Android） */
    clearAllNotifications: () => jpushService.clearAllNotifications(),
    /** 清除指定通知（仅Android） */
    clearNotificationById: (notificationId: string) =>
      jpushService.clearNotificationById(notificationId),
  };
}

export default useJPush;
