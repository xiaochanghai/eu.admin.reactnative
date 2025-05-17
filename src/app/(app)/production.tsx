// import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { SegmentedControl, type SegmentedControlOption } from '@/components';
import {
  Equipment,
  Plans,
  Process,
  Report,
  Task,
} from '@/components/production';
import { NavHeader, SafeAreaView, ScrollView } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

const Production: React.FC = () => {
  // const router = useRouter();

  // 分段控制器状态
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabOptions: SegmentedControlOption[] = [
    { key: 'production-plan', label: '生产计划' },
    { key: 'production-task', label: '生产任务' },
    { key: 'process-management', label: '工序管理' },
    { key: 'equipment-management', label: '设备管理' },
    { key: 'production-report', label: '生产报表' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航 */}
      <NavHeader
        title="生产"
        leftShown={false}
        right={
          <>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="search" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="filter" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="plus-circle" size={22} color="#0066ff" />
            </TouchableOpacity>
          </>
        }
      />
      <View style={styles.content}>
        {/* 分段控制器 */}
        <SegmentedControl
          options={tabOptions}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        />

        {/* 选项卡内容 */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {selectedTabIndex === 0 && <Plans />}

          {selectedTabIndex === 1 && <Task />}

          {selectedTabIndex === 2 && <Process />}

          {selectedTabIndex === 3 && <Equipment />}

          {selectedTabIndex === 4 && <Report />}
        </ScrollView>
      </View>

      {/* 浮动按钮 */}
      <TouchableOpacity style={styles.floatingButton}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerButton: {
    marginLeft: 16,
  },

  scrollView: {
    flex: 1,
    marginTop: 16,
  },
  floatingButton: {
    position: 'absolute',
    right: 24,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0066ff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export default Production;
