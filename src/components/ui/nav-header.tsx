import { Stack, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useAppColorScheme } from '@/lib/hooks';
import type { TxKeyPath } from '@/lib/i18n';
import { translate } from '@/lib/i18n';

import { FontAwesome, GroupEnum } from './icons';

export type NavHeaderProps = {
  leftShown?: boolean;
  title?: string;
  headerBackTitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  tx?: TxKeyPath;
};
export const NavHeader = ({
  leftShown = true,
  title = 'Demo',
  headerBackTitle = '',
  left = null,
  right = null,
  tx,
}: NavHeaderProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { isDark } = useAppColorScheme();

  return (
    <>
      {/* <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#171717' : '#ffffff'}
      /> */}
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
        animated={false}
      />
      <Stack.Screen
        options={{
          title: tx ? translate(tx) : title,
          headerTintColor: isDark ? '#fff' : '#000',
          headerBackTitle: headerBackTitle,
          headerBackButtonDisplayMode: 'minimal',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: isDark ? '#171717' : '#ffffff',
          },
          headerRight: () =>
            right && (
              <View
                style={leftShown ? styles.headerRight2 : styles.headerRight1}
              >
                {right && <>{right}</>}
              </View>
            ),
          headerLeft: () =>
            left ? (
              <View className="ml-4">{left && <>{left}</>}</View>
            ) : (
              leftShown && (
                <TouchableOpacity
                  onPress={() => router.back()}
                  className={pathName == '/chat' ? 'ml-4' : ''}
                >
                  <FontAwesome
                    name="left"
                    size={24}
                    color={isDark ? '#fff' : '#000'}
                    group={GroupEnum.AntDesign}
                  />
                </TouchableOpacity>
              )
            ),
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    // paddingBottom: 10,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerRight1: {
    marginRight: 10,

    flexDirection: 'row',
    alignItems: 'center',
    width: 90, // 固定宽度，确保与左侧空白区域平衡
    justifyContent: 'flex-end',
  },

  headerRight2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 90, // 固定宽度，确保与左侧空白区域平衡
    justifyContent: 'flex-end',
  },
});
