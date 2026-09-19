import { Redirect, Tabs } from 'expo-router';
import type { BottomTabNavigationOptions } from 'expo-router/tabs';
import { type ComponentType, memo, useEffect, useMemo } from 'react';

import { useAuth, useIsFirstTime } from '@/lib';

import { CustomTabBar } from './custom-tab-bar';
import { IconWrapper } from './icon-wrapper';

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
 * 处理认证状态、首次访问等通用逻辑
 */
export const TabLayout = memo(
  ({ tabConfig, onMount, screenOptions }: TabLayoutProps) => {
    const status = useAuth.use.status();
    const [isFirstTime] = useIsFirstTime();

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
              headerShadowVisible: false,
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
