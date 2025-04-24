import AntDesign from '@expo/vector-icons/AntDesign';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export type NavHeaderProps = {
  leftShown?: boolean;
  title?: string;
  right?: React.ReactNode;
};
export const NavHeader = ({
  leftShown = true,
  title = 'Demo',
  right = null,
}: NavHeaderProps) => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          header: () => (
            <View style={styles.header}>
              <View style={styles.headerSide}>
                {leftShown && (
                  <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="left" size={24} color="black" />
                  </TouchableOpacity>
                )}
              </View>

              {/* 中间标题 */}
              <View style={styles.headerCenter}>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>

              {/* 右侧按钮 */}
              <View style={styles.headerRight}>
                {right && <>{right}</>}

                {/* <TouchableOpacity style={styles.headerButton}>
                  <FontAwesome name="search" size={18} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                  <FontAwesome name="filter" size={18} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                  <FontAwesome name="plus-circle" size={22} color="#0066ff" />
                </TouchableOpacity> */}
              </View>
            </View>
          ),
          title,
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
  headerButton: {
    marginLeft: 16,
  },
});
