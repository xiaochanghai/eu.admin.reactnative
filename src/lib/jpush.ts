/**
 * JPush (极光推送) Service
 * 封装极光推送的核心功能
 */

import JPushModule from 'jpush-react-native';
import { Platform } from 'react-native';

export interface JPushNotification {
  messageID: string;
  title?: string;
  content: string;
  extras: Record<string, any>;
  notificationId?: number;
  notificationEventType?: 'notificationArrived' | 'notificationOpened';
}

export interface JPushMessage {
  messageID: string;
  content: string;
  extras: Record<string, any>;
}

class JPushService {
  private isInitialized = false;
  private registrationId: string | null = null;

  /**
   * 初始化JPush
   * @param debug 是否开启调试模式
   */
  async init(debug: boolean = false): Promise<void> {
    if (this.isInitialized) {
      console.log('[JPush] Already initialized');
      return;
    }

    try {
      // 设置调试模式（必须在init之前调用）
      if (debug) {
        JPushModule.setLoggerEnable(true);
      }

      // 初始化JPush
      // Android: 不需要参数 (需要配置对象但可以是任意值)
      // iOS: 需要配置对象（已在原生代码中配置）
      if (Platform.OS === 'android') {
        // Android的init在原生代码中已经调用，这里不再需要
        console.log('[JPush] Android init handled in native code');
      } else {
        // iOS已经在AppDelegate中初始化
        console.log('[JPush] iOS init handled in AppDelegate');
      }

      this.isInitialized = true;
      console.log('[JPush] Initialized successfully');

      // 获取注册ID
      this.getRegistrationId();
    } catch (error) {
      console.error('[JPush] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * 获取设备的注册ID（用于服务端推送）
   */
  async getRegistrationId(): Promise<string> {
    return new Promise((resolve, reject) => {
      JPushModule.getRegistrationID((result: { registerID: string }) => {
        const registrationId = result.registerID;
        if (registrationId) {
          this.registrationId = registrationId;
          console.log('[JPush] Registration ID:', registrationId);
          resolve(registrationId);
        } else {
          // 如果获取失败，延迟重试
          setTimeout(() => {
            this.getRegistrationId().then(resolve).catch(reject);
          }, 1000);
        }
      });
    });
  }

  /**
   * 设置别名（用于标识特定用户）
   * @param alias 用户别名
   * @param sequence 请求序列号
   */
  setAlias(alias: string, sequence: number = Date.now()): void {
    JPushModule.setAlias({
      alias,
      sequence,
    });
  }

  /**
   * 删除别名
   * @param sequence 请求序列号
   */
  deleteAlias(sequence: number = Date.now()): void {
    JPushModule.deleteAlias({
      sequence,
    });
  }

  /**
   * 设置标签（覆盖之前的标签）
   * @param tags 标签数组
   * @param sequence 请求序列号
   */
  setTags(tags: string[], sequence: number = Date.now()): void {
    JPushModule.updateTags({
      tags,
      sequence,
    });
  }

  /**
   * 添加标签（不覆盖之前的标签）
   * @param tags 标签数组
   * @param sequence 请求序列号
   */
  addTags(tags: string[], sequence: number = Date.now()): void {
    JPushModule.addTags({
      tags,
      sequence,
    });
  }

  /**
   * 删除指定标签
   * @param tags 标签数组
   * @param sequence 请求序列号
   */
  deleteTags(tags: string[], sequence: number = Date.now()): void {
    JPushModule.deleteTag({
      tags,
      sequence,
    });
  }

  /**
   * 清空所有标签
   * @param sequence 请求序列号
   */
  cleanTags(sequence: number = Date.now()): void {
    JPushModule.deleteTags({
      sequence,
    });
  }

  /**
   * 获取所有标签
   * @param sequence 请求序列号
   */
  getAllTags(sequence: number = Date.now()): void {
    JPushModule.queryTags({
      sequence,
    });
  }

  /**
   * 设置角标数字（仅iOS）
   * @param badge 角标数字
   */
  setBadge(badge: number): void {
    JPushModule.setBadge({
      badge: badge,
      appBadge: badge,
    });
  }

  /**
   * 检查通知权限状态
   */
  async checkNotificationEnabled(): Promise<boolean> {
    return new Promise((resolve) => {
      JPushModule.isNotificationEnabled((isEnabled: boolean) => {
        resolve(isEnabled);
      });
    });
  }

  /**
   * 监听通知事件（接收和打开都在这里）
   * @param callback 回调函数
   * @returns 取消监听的函数
   */
  addNotificationListener(
    callback: (notification: JPushNotification) => void
  ): () => void {
    JPushModule.addNotificationListener((result: JPushNotification) => {
      console.log('[JPush] Notification event:', result);
      callback(result);
    });

    // 返回清理函数
    return () => {
      JPushModule.removeListener(callback);
    };
  }

  /**
   * 监听自定义消息事件
   * @param callback 回调函数
   * @returns 取消监听的函数
   */
  addCustomMessageListener(
    callback: (message: JPushMessage) => void
  ): () => void {
    JPushModule.addCustomMessageListener((result: JPushMessage) => {
      console.log('[JPush] Received custom message:', result);
      callback(result);
    });

    return () => {
      JPushModule.removeListener(callback);
    };
  }

  /**
   * 监听标签/别名操作结果
   * @param callback 回调函数
   * @returns 取消监听的函数
   */
  addTagAliasListener(
    callback: (result: {
      sequence: number;
      tags?: string[];
      alias?: string;
      errorCode: number;
    }) => void
  ): () => void {
    JPushModule.addTagAliasListener((result: any) => {
      console.log('[JPush] Tag/Alias operation result:', result);
      callback(result);
    });

    return () => {
      JPushModule.removeListener(callback);
    };
  }

  /**
   * 监听连接状态
   * @param callback 回调函数
   * @returns 取消监听的函数
   */
  addConnectEventListener(
    callback: (result: { connectEnable: boolean }) => void
  ): () => void {
    JPushModule.addConnectEventListener((result: any) => {
      console.log('[JPush] Connect event:', result);
      callback(result);
    });

    return () => {
      JPushModule.removeListener(callback);
    };
  }

  /**
   * 获取当前registrationId
   */
  getCurrentRegistrationId(): string | null {
    return this.registrationId;
  }

  /**
   * 清除所有通知（仅Android）
   */
  clearAllNotifications(): void {
    if (Platform.OS === 'android') {
      JPushModule.clearAllNotifications();
    }
  }

  /**
   * 清除指定通知（仅Android）
   * @param notificationId 通知ID
   */
  clearNotificationById(notificationId: string): void {
    if (Platform.OS === 'android') {
      JPushModule.clearNotificationById({ notificationId });
    }
  }

  /**
   * 设置推送时间限制（仅Android）
   * @param startHour 开始小时 (0-23)
   * @param endHour 结束小时 (0-23)
   */
  setPushTime(startHour: number, endHour: number): void {
    if (Platform.OS === 'android') {
      JPushModule.setPushTime({
        pushTimeDays: [0, 1, 2, 3, 4, 5, 6], // 0-6表示周日到周六
        pushTimeStartHour: startHour,
        pushTimeEndHour: endHour,
      });
    }
  }

  /**
   * 设置静默时间（仅Android）
   * @param startHour 开始小时 (0-23)
   * @param startMinute 开始分钟 (0-59)
   * @param endHour 结束小时 (0-23)
   * @param endMinute 结束分钟 (0-59)
   */
  setSilenceTime(
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ): void {
    if (Platform.OS === 'android') {
      JPushModule.setSilenceTime({
        silenceTimeStartHour: startHour,
        silenceTimeStartMinute: startMinute,
        silenceTimeEndHour: endHour,
        silenceTimeEndMinute: endMinute,
      });
    }
  }
}

// 导出单例
export const jpushService = new JPushService();

// 默认导出
export default jpushService;
