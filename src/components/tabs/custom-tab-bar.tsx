import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';

// Tab 高度常量
const TAB_HEIGHT = 60;

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

    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={label}
        testID={options.tabBarButtonTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={1}
        className="flex-1 items-center justify-center"
      >
        {options.tabBarIcon?.({ focused: isFocused })}
        <Text
          className={`mt-0.5 text-[12px] ${isFocused ? 'text-[#007bff] dark:text-[#007bff]' : 'text-gray-600 dark:text-gray-400'}`}
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
        className="-top-5 size-[60px] items-center justify-center rounded-full bg-[#007bff] shadow-lg dark:bg-purple-600"
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
    const insets = useSafeAreaInsets();

    const handleTabPress = useCallback(
      (routeName: string, isFocused: boolean) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: routeName,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(routeName);
        }
      },
      [navigation]
    );

    const handleTabLongPress = useCallback(
      (routeName: string) => {
        navigation.emit({
          type: 'tabLongPress',
          target: routeName,
        });
      },
      [navigation]
    );

    return (
      <View
        className="relative flex-row items-center justify-between border-t border-gray-300 bg-white px-0 dark:border-neutral-600 dark:bg-neutral-800"
        style={{
          height: TAB_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
        }}
      >
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
                onPress={() => handleTabPress(route.name, isFocused)}
                onLongPress={() => handleTabLongPress(route.name)}
              />
            );
          })}
        </View>
      </View>
    );
  }
);

CustomTabBar.displayName = 'CustomTabBar';
