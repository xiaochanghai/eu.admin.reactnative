import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Toast 配置类型
export type ToastConfig = {
  content: string;
  duration?: number;
  type?: 'loading' | 'success' | 'error' | 'info';
};

// Toast 项类型
type ToastItem = ToastConfig & {
  id: string;
  visible: boolean;
};

// Toast 管理器类
class ToastManager {
  private static instance: ToastManager;
  private toasts: ToastItem[] = [];
  private listeners: Set<(toasts: ToastItem[]) => void> = new Set();
  private timers: Map<string, ReturnType<typeof setTimeout>> = new Map();

  private constructor() {}

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  subscribe(listener: (toasts: ToastItem[]) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  show(config: ToastConfig): string {
    const id = Date.now().toString() + Math.random();
    const toast: ToastItem = {
      id,
      visible: true,
      ...config,
    };

    this.toasts.push(toast);
    this.notify();

    // 如果设置了持续时间，自动关闭（duration > 0 时生效）
    if (config.duration && config.duration > 0) {
      const timer = setTimeout(() => {
        this.hide(id);
      }, config.duration * 1000);
      this.timers.set(id, timer);
    }

    return id;
  }

  hide(id?: string) {
    if (id) {
      // 清除定时器
      const timer = this.timers.get(id);
      if (timer) {
        clearTimeout(timer);
        this.timers.delete(id);
      }

      // 移除 toast
      this.toasts = this.toasts.filter((t) => t.id !== id);
    } else {
      // 清除所有定时器
      this.timers.forEach((timer) => clearTimeout(timer));
      this.timers.clear();

      // 清除所有 toast
      this.toasts = [];
    }
    this.notify();
  }

  loading(config: string | ToastConfig): string {
    const toastConfig: ToastConfig =
      typeof config === 'string'
        ? { content: config, type: 'loading', duration: 0 }
        : { type: 'loading', duration: 0, ...config };

    return this.show(toastConfig);
  }

  success(config: string | ToastConfig): string {
    const toastConfig: ToastConfig =
      typeof config === 'string'
        ? { content: config, type: 'success', duration: 2 }
        : { ...config, type: 'success' };

    return this.show(toastConfig);
  }

  error(config: string | ToastConfig): string {
    const toastConfig: ToastConfig =
      typeof config === 'string'
        ? { content: config, type: 'error', duration: 2 }
        : { ...config, type: 'error' };

    return this.show(toastConfig);
  }

  info(config: string | ToastConfig): string {
    const toastConfig: ToastConfig =
      typeof config === 'string'
        ? { content: config, type: 'info', duration: 2 }
        : { ...config, type: 'info' };

    return this.show(toastConfig);
  }
}

// Toast 容器组件
const ToastContainer: React.FC = () => {
  const manager = ToastManager.getInstance();
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = manager.subscribe(setToasts);
    return unsubscribe;
  }, [manager]);

  // 只显示最新的一个 Toast
  const currentToast = toasts.length > 0 ? toasts[toasts.length - 1] : null;

  if (!currentToast) {
    return null;
  }

  return <ToastItem key={currentToast.id} {...currentToast} />;
};

// 单个 Toast 项组件
const ToastItem: React.FC<ToastItem> = ({ content, type = 'info', visible }) => {
  // 直接使用状态管理 opacity，不使用 Animated
  const [opacity, setOpacity] = React.useState(0);

  useEffect(() => {
    if (visible) {
      // 使用 setTimeout 模拟淡入效果
      const timer = setTimeout(() => {
        setOpacity(1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
    }
  }, [visible]);

  const getIcon = () => {
    switch (type) {
      case 'loading':
        return <ActivityIndicator size="small" color="#fff" />;
      case 'success':
        return <Text style={styles.icon}>✓</Text>;
      case 'error':
        return <Text style={styles.icon}>✕</Text>;
      case 'info':
      default:
        return <Text style={styles.icon}>ⓘ</Text>;
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      presentationStyle="overFullScreen"
    >
      <View
        style={[
          styles.overlay,
          type === 'loading' && styles.overlayWithMask,
        ]}>
        <View style={[styles.toastContainer, { opacity }]}>
          <View style={styles.iconContainer}>{getIcon()}</View>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    </Modal>
  );
};

// 导出 Toast 实例
export const Toast = {
  loading: (config: string | ToastConfig) =>
    ToastManager.getInstance().loading(config),
  success: (config: string | ToastConfig) =>
    ToastManager.getInstance().success(config),
  error: (config: string | ToastConfig) =>
    ToastManager.getInstance().error(config),
  info: (config: string | ToastConfig) =>
    ToastManager.getInstance().info(config),
  hide: (id?: string) => ToastManager.getInstance().hide(id),
};

// 导出容器组件（可选，如果需要在应用根部渲染）
export { ToastContainer };

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    pointerEvents: 'box-none',
    zIndex: 9999,
  },
  overlayWithMask: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    pointerEvents: 'auto',
  },
  toastContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    padding: 16,
    minWidth: 120,
    maxWidth: 280,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
