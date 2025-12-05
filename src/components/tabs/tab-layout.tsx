import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { type ComponentType, memo, useEffect, useMemo } from 'react';

import { useAuth, useIsFirstTime } from '@/lib';

import { CustomTabBar } from './custom-tab-bar';
import { IconWrapper } from './icon-wrapper';

// 闪屏隐藏延迟时间(毫秒)
const SPLASH_HIDE_DELAY = 1000;

// 图标组件的基础 props 类型
export interface IconProps {
  color?: string;
  size?: number;
  focused?: boolean;
}

// Tab 配置接口
export interface TabConfig {
  name: string;
  title: string;
  icon: ComponentType<IconProps>;
  headerShown?: boolean;
  options?: Partial<BottomTabNavigationOptions>;
}

interface TabLayoutProps {
  /** Tab 配置数组 */
  tabConfig: TabConfig[];
  /** 在组件挂载时执行的副作用函数 */
  onMount?: () => void;
  /** 自定义屏幕选项 */
  screenOptions?: Partial<BottomTabNavigationOptions>;
}

/**
 * 通用的 Tab 布局组件
 * 处理认证状态、首次访问、闪屏等通用逻辑
 */
export const TabLayout = memo(
  ({ tabConfig, onMount, screenOptions }: TabLayoutProps) => {
    const status = useAuth.use.status();
    const [isFirstTime] = useIsFirstTime();

    // 统一处理闪屏隐藏逻辑
    useEffect(() => {
      // 等待认证状态初始化完成
      if (status === 'idle') return;

      // 需要重定向时立即隐藏（首次访问或未登录）
      if (isFirstTime || status === 'signOut') {
        SplashScreen.hideAsync();
        return;
      }

      // 正常进入应用时延迟隐藏，提供更好的视觉体验
      const timer = setTimeout(() => {
        SplashScreen.hideAsync();
      }, SPLASH_HIDE_DELAY);

      return () => clearTimeout(timer);
    }, [status, isFirstTime]);

    // 组件挂载时执行自定义逻辑
    useEffect(() => {
      onMount?.();
    }, [onMount]);

    // 合并屏幕选项
    const mergedScreenOptions = useMemo(
      () => ({
        headerShown: false,
        ...screenOptions,
      }),
      [screenOptions]
    );

    // 认证守卫
    if (isFirstTime) return <Redirect href="/onboarding" />;
    if (status === 'signOut') return <Redirect href="/login" />;

    return (
      <Tabs
        screenOptions={mergedScreenOptions}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        {tabConfig.map(({ name, title, icon, headerShown, options }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title,
              headerShown: headerShown ?? true,
              tabBarIcon: ({ focused }) => (
                <IconWrapper IconComponent={icon} focused={focused} />
              ),
              tabBarButtonTestID: `${name}-tab`,
              ...options,
            }}
          />
        ))}
      </Tabs>
    );
  }
);

TabLayout.displayName = 'TabLayout';
