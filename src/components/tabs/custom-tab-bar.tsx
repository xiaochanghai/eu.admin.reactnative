import { useTheme } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/tabs';
import { memo, useCallback } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';

import { TabBarSurface } from './tab-bar-surface';

// TabItem 组件
interface TabItemProps {
  route: any;
  isFocused: boolean;
  options: any;
  onPress: () => void;
  onLongPress: () => void;
}

const TabItem = memo(
  ({ route, isFocused, options, onPress, onLongPress }: TabItemProps) => {
    const label = options.title || route.name;
    const theme = useTheme();

    return (
      <TouchableOpacity
        accessibilityRole="tab"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={label}
        testID={options.tabBarButtonTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={1}
        className="flex-1 items-center justify-center"
        style={
          Platform.OS === 'ios'
            ? {
                minHeight: 54,
                borderRadius: 28,
                backgroundColor: isFocused
                  ? theme.dark
                    ? 'rgba(255,255,255,0.12)'
                    : 'rgba(0,0,0,0.06)'
                  : 'transparent',
              }
            : undefined
        }
      >
        {options.tabBarIcon?.({ focused: isFocused })}
        <Text
          className={`mt-1 text-[11px] ${isFocused ? 'font-semibold' : 'text-gray-500 dark:text-gray-500'}`}
          style={isFocused ? { color: theme.colors.primary } : undefined}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
);

TabItem.displayName = 'TabItem';

// CenterButton 组件 (预留用于未来的悬浮按钮功能)
interface CenterButtonProps {
  onPress?: () => void;
}

const CenterButton = memo(({ onPress }: CenterButtonProps) => {
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <View className="h-full w-1/5 items-center justify-center">
      <TouchableOpacity
        className="-top-5 size-[60px] items-center justify-center rounded-full bg-primary-600 shadow-lg dark:bg-primary-600"
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text className="text-2xl font-bold text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
});

CenterButton.displayName = 'CenterButton';

// CustomTabBar 主组件
export const CustomTabBar = memo(
  ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const handleTabPress = useCallback(
      (
        route: BottomTabBarProps['state']['routes'][number],
        isFocused: boolean
      ) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      },
      [navigation]
    );

    const handleTabLongPress = useCallback(
      (route: BottomTabBarProps['state']['routes'][number]) => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      },
      [navigation]
    );

    return (
      <TabBarSurface>
        <View className="flex-1 flex-row items-center justify-between">
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];

            // 如果是中间的 "add" Tab，则渲染悬浮按钮
            if (route.name === 'add') {
              return (
                <CenterButton
                  key={route.key}
                  onPress={() => console.log('Center button pressed')}
                />
              );
            }

            // 渲染普通的 Tab
            return (
              <TabItem
                key={route.key}
                route={route}
                isFocused={isFocused}
                options={options}
                onPress={() => handleTabPress(route, isFocused)}
                onLongPress={() => handleTabLongPress(route)}
              />
            );
          })}
        </View>
      </TabBarSurface>
    );
  }
);

CustomTabBar.displayName = 'CustomTabBar';
