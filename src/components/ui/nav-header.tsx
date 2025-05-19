import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Platform } from 'react-native';

import { FontAwesome, GroupEnum } from '@/components/ui/icons';
import type { TxKeyPath } from '@/lib/i18n';
import { translate } from '@/lib/i18n';

export type NavHeaderProps = {
  leftShown?: boolean;
  title?: string;
  headerBackTitle?: string;
  right?: React.ReactNode;
  tx?: TxKeyPath;
};
export const NavHeader = ({
  leftShown = true,
  title = 'Demo',
  headerBackTitle = '',
  right = null,
  tx,
}: NavHeaderProps) => {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        <Stack.Screen
          options={{
            title: tx ? translate(tx) : title,
            headerTintColor: '#000',
            headerBackTitle: headerBackTitle,
            headerBackButtonDisplayMode: 'minimal',
            headerTitleAlign: 'center',
            headerRight: () =>
              right && (
                <View
                  style={leftShown ? styles.headerRight2 : styles.headerRight1}
                >
                  {right && <>{right}</>}
                </View>
              ),
          }}
        />
      ) : (
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            header: () => (
              <View style={styles.header}>
                <View style={styles.headerSide}>
                  {leftShown && (
                    <TouchableOpacity onPress={() => router.back()}>
                      <FontAwesome
                        name="left"
                        size={24}
                        color="black"
                        group={GroupEnum.AntDesign}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {/* 中间标题 */}
                <View style={styles.headerCenter}>
                  <Text style={styles.headerTitle}>{title}</Text>
                </View>

                {/* 右侧按钮 */}
                <View style={styles.headerRight}>{right && <>{right}</>}</View>
              </View>
            ),
            title,
          }}
        />
      )}
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
  headerSide: {
    width: 90, // 与右侧按钮区域宽度相同，保持平衡
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 90, // 固定宽度，确保与左侧空白区域平衡
    justifyContent: 'flex-end',
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
