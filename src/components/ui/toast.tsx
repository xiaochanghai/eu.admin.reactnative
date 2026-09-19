/**
 * Toast 轻提示组件
 *
 * 提供全局的轻量级消息提示功能，支持四种类型：
 * - loading: 加载提示（带遮罩层，不自动关闭）
 * - success: 成功提示（2秒后自动关闭）
 * - error: 错误提示（2秒后自动关闭）
 * - info: 信息提示（2秒后自动关闭）
 *
 * 特性：
 * - 单例模式管理，全局统一展示
 * - 支持自定义持续时间
 * - 加载状态带遮罩层，防止用户操作
 * - 淡入淡出动画效果
 * - 自动队列管理，只显示最新的提示
 *
 * 使用方式：
 * 1. 在应用根组件中添加 <ToastContainer />
 * 2. 在任何地方调用 Toast 方法
 *
 * @example
 * // 在 App.tsx 或 _layout.tsx 中
 * import { ToastContainer } from '@/components/ui/toast';
 *
 * export default function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <ToastContainer />
 *     </>
 *   );
 * }
 *
 * @example
 * // 在业务代码中使用
 * import { Toast } from '@/components/ui/toast';
 *
 * // 加载提示
 * const loadingId = Toast.loading('加载中...');
 * // 异步操作完成后关闭
 * await fetchData();
 * Toast.hide(loadingId);
 *
 * // 成功提示（2秒后自动关闭）
 * Toast.success('操作成功');
 *
 * // 错误提示
 * Toast.error('操作失败，请重试');
 *
 * // 信息提示
 * Toast.info('这是一条提示信息');
 *
 * @example
 * // 自定义持续时间
 * Toast.success({
 *   content: '保存成功',
 *   duration: 3, // 3秒后关闭
 * });
 *
 * @example
 * // 手动关闭所有提示
 * Toast.hide();
 */
import React, { useEffect } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';

/**
 * Toast 配置类型
 */
export type ToastConfig = {
  /** 提示内容文本 */
  content: string;
  /** 持续时间（秒），0 表示不自动关闭 */
  duration?: number;
  /** 提示类型 */
  type?: 'loading' | 'success' | 'error' | 'info';
};

/**
 * Toast 项类型（内部使用）
 * 扩展了 ToastConfig，添加了内部管理所需的字段
 */
type ToastItem = ToastConfig & {
  /** 唯一标识符 */
  id: string;
  /** 是否可见 */
  visible: boolean;
};

/**
 * Toast 管理器类
 *
 * 使用单例模式管理全局 Toast 的显示和隐藏
 * 负责 Toast 的队列管理、定时器控制和状态通知
 *
 * @internal 内部类，不对外暴露
 */
class ToastManager {
  private static instance: ToastManager;
  /** Toast 队列 */
  private toasts: ToastItem[] = [];
  /** 状态监听器集合 */
  private listeners: Set<(toasts: ToastItem[]) => void> = new Set();
  /** 自动关闭定时器映射 */
  private timers: Map<string, ReturnType<typeof setTimeout>> = new Map();

  private constructor() {}

  /**
   * 获取 ToastManager 单例实例
   */
  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  /**
   * 订阅 Toast 状态变化
   * @param listener - 状态变化回调函数
   * @returns 取消订阅的函数
   */
  subscribe(listener: (toasts: ToastItem[]) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * 通知所有监听器状态已更新
   */
  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  /**
   * 显示一个 Toast
   * @param config - Toast 配置
   * @returns Toast 的唯一 ID，可用于手动关闭
   */
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

  /**
   * 隐藏 Toast
   * @param id - Toast ID，不传则关闭所有 Toast
   */
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

  /**
   * 显示加载提示
   * 默认不自动关闭，带遮罩层
   * @param config - 字符串或配置对象
   * @returns Toast ID
   */
  loading(config: string | ToastConfig): string {
    const toastConfig: ToastConfig =
      typeof config === 'string'
        ? { content: config, type: 'loading', duration: 0 }
        : { type: 'loading', duration: 0, ...config };

    return this.show(toastConfig);
  }

  /**
   * 显示成功提示
   * 默认2秒后自动关闭
   * @param config - 字符串或配置对象
   * @returns Toast ID
   */
  success(config: string | ToastConfig): string {
    const toastConfig: ToastConfig =
      typeof config === 'string'
        ? { content: config, type: 'success', duration: 2 }
        : { ...config, type: 'success' };

    return this.show(toastConfig);
  }

  /**
   * 显示错误提示
   * 默认2秒后自动关闭
   * @param config - 字符串或配置对象
   * @returns Toast ID
   */
  error(config: string | ToastConfig): string {
    const toastConfig: ToastConfig =
      typeof config === 'string'
        ? { content: config, type: 'error', duration: 2 }
        : { ...config, type: 'error' };

    return this.show(toastConfig);
  }

  /**
   * 显示信息提示
   * 默认2秒后自动关闭
   * @param config - 字符串或配置对象
   * @returns Toast ID
   */
  info(config: string | ToastConfig): string {
    const toastConfig: ToastConfig =
      typeof config === 'string'
        ? { content: config, type: 'info', duration: 2 }
        : { ...config, type: 'info' };

    return this.show(toastConfig);
  }
}

/**
 * Toast 容器组件
 *
 * 订阅 ToastManager 的状态变化，渲染当前的 Toast
 * 应该在应用的根组件中渲染，确保全局可用
 *
 * @component
 * @example
 * // 在 App.tsx 中
 * <View>
 *   <YourApp />
 *   <ToastContainer />
 * </View>
 */
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

  return <ToastItemComponent key={currentToast.id} {...currentToast} />;
};

/**
 * 单个 Toast 项组件
 *
 * 渲染单个 Toast 提示框，支持：
 * - 四种类型的图标和样式
 * - 淡入淡出动画效果
 * - 加载状态的遮罩层
 *
 * @internal 内部组件，不对外暴露
 */
const ToastItemComponent: React.FC<ToastItem> = ({
  content,
  type = 'info',
  visible,
}) => {
  // 使用状态管理透明度，实现淡入淡出效果
  const [opacity, setOpacity] = React.useState(0);

  // 监听 visible 变化，控制淡入淡出
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

  /**
   * 根据类型获取对应的图标
   */
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
        style={[styles.overlay, type === 'loading' && styles.overlayWithMask]}
      >
        <View style={[styles.toastContainer, { opacity }]}>
          <View style={styles.iconContainer}>{getIcon()}</View>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    </Modal>
  );
};

ToastItemComponent.displayName = 'ToastItemComponent';

/**
 * Toast 静态方法导出
 *
 * 提供全局调用的 Toast 方法
 *
 * @example
 * import { Toast } from '@/components/ui/toast';
 *
 * Toast.loading('加载中...');
 * Toast.success('操作成功');
 * Toast.error('操作失败');
 * Toast.info('提示信息');
 * Toast.hide(); // 关闭所有
 */
export const Toast = {
  /** 显示加载提示 */
  loading: (config: string | ToastConfig) =>
    ToastManager.getInstance().loading(config),
  /** 显示成功提示 */
  success: (config: string | ToastConfig) =>
    ToastManager.getInstance().success(config),
  /** 显示错误提示 */
  error: (config: string | ToastConfig) =>
    ToastManager.getInstance().error(config),
  /** 显示信息提示 */
  info: (config: string | ToastConfig) =>
    ToastManager.getInstance().info(config),
  /** 隐藏提示 */
  hide: (id?: string) => ToastManager.getInstance().hide(id),
};

/**
 * 导出容器组件
 * 需要在应用根组件中渲染此组件
 */
export { ToastContainer };

/**
 * Toast 组件样式
 */
const styles = StyleSheet.create({
  /** 遮罩层容器 */
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
  /** 带半透明遮罩的容器（loading 状态使用） */
  overlayWithMask: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    pointerEvents: 'auto',
  },
  /** Toast 主容器 */
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
  /** 图标容器 */
  iconContainer: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** 图标样式 */
  icon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  /** 内容文本样式 */
  content: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
