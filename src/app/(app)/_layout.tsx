/* eslint-disable react/no-unstable-nested-components */
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui';
import {
  Home as HomeIcon,
  Inventory as InventoryIcon,
  Order as OrderIcon,
  Production as ProductionIcon,
  Profile as ProfileIcon,
} from '@/components/ui/icons';
import { useAuth, useIsFirstTime } from '@/lib';

// 定义 Tab 配置
const tabConfig = [
  { name: 'index', title: '首页', icon: HomeIcon },
  { name: 'production', title: '生产', icon: ProductionIcon },
  // { name: 'add', title: 'add', icon: AddIcon },
  { name: 'inventory', title: '库存', icon: InventoryIcon },
  { name: 'order', title: '订单', icon: OrderIcon },
  { name: 'profile', title: '我的', icon: ProfileIcon },
];

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(hideSplash, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) return <Redirect href="/onboarding" />;
  if (status === 'signOut') return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{ tabBarStyle: styles.tabBar }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {tabConfig.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <IconWrapper IconComponent={icon} focused={focused} />
            ),
            tabBarButtonTestID: `${name}-tab`,
          }}
          // options={
          //   name === 'index'
          //     ? {
          //         title,
          //         headerShown: name === 'index',
          //         tabBarIcon: ({ focused }) => (
          //           <IconWrapper IconComponent={icon} focused={focused} />
          //         ),
          //         headerRight: () => <CreateNewPostLink />,
          //         tabBarButtonTestID: `${name}-tab`,
          //       }
          //     : {
          //         title,
          //         headerShown: name === 'index',
          //         tabBarIcon: ({ focused }) => (
          //           <IconWrapper IconComponent={icon} focused={focused} />
          //         ),
          //         tabBarButtonTestID: `${name}-tab`,
          //       }
          // }
        />
      ))}
    </Tabs>
  );
}

// const CreateNewPostLink = () => {
//   return (
//     <Link href="/feed/add-post" asChild>
//       <Pressable>
//         <Text className="px-3 text-primary-300">Create</Text>
//       </Pressable>
//     </Link>
//   );
// };

// 自定义 TabBar 组件
function CustomTabBar({ state, descriptors, navigation }: any) {
  const renderTabItem = (route: any, index: number) => {
    const isFocused = state.index === index;
    const { options } = descriptors[route.key];
    const label = options.title || '';
    const onPress = () =>
      navigation.navigate(route.name, { canPreventDefault: true });
    const onLongPress = () => navigation.emit({ type: 'tabLongPress' });

    return (
      <TouchableOpacity
        key={index}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={label}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tabItem}
      >
        {options.tabBarIcon && options.tabBarIcon({ focused: isFocused })}
        <Text style={[styles.label, isFocused && styles.focusedLabel]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 渲染五个均匀分布的部分 */}
      <View style={styles.fiveEqualParts}>
        {state.routes.map((route: any, index: number) => {
          // 如果是中间的 "add" Tab，则渲染悬浮按钮
          if (route.name === 'add') {
            return (
              <View key={index} style={styles.centerButtonContainer}>
                <TouchableOpacity
                  style={styles.centerButton}
                  onPress={() => console.log('Center button pressed')}
                >
                  <Text style={styles.centerButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            );
          }

          // 渲染普通的 Tab
          return renderTabItem(route, index);
        })}
      </View>
    </View>
  );
}

// 图标包装组件，用于动态渲染图标
function IconWrapper({
  IconComponent,
  focused,
}: {
  IconComponent: any;
  focused: boolean;
}) {
  return <IconComponent color={focused ? '#007bff' : '#666'} />;
}

// 样式
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 0, // 移除水平内边距以确保均匀分布
    position: 'relative',
  },
  fiveEqualParts: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // 确保五个部分均匀分布
    alignItems: 'center',
  },
  tabItem: {
    flex: 1, // 每个 Tab 占据相等的空间
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    color: '#666', // 默认文字颜色
  },
  focusedLabel: {
    color: '#007bff', // 选中时的文字颜色
  },
  centerButtonContainer: {
    width: '20%', // 中间按钮占据五分之一的空间
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // 添加阴影效果
    top: -20, // 让按钮稍微向上浮动
  },
  centerButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabBar: {
    shadowOffset: { width: 0, height: 0 }, // 移除默认阴影
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});
