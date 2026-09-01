// import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { SegmentedControl, type SegmentedControlOption } from '@/components';
import {
  Equipment,
  Plans,
  Process,
  Report,
  Task,
} from '@/components/production';
import { NavHeader, ScrollView } from '@/components/ui';
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
    <View className="flex-1 bg-gray-100 dark:bg-neutral-950">
      {/* 顶部导航 */}
      <NavHeader
        title="生产"
        leftShown={false}
        right={
          <>
            <TouchableOpacity className="size-10 items-center justify-center rounded-full">
              <FontAwesome name="search" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity className="size-10 items-center justify-center rounded-full">
              <FontAwesome name="filter" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity className="size-10 items-center justify-center rounded-full">
              <FontAwesome name="plus-circle" size={22} color="#543EF8" />
            </TouchableOpacity>
          </>
        }
      />

      {/* 分段控制器 - 固定在顶部 */}
      <View className="border-b border-gray-200/70 bg-white px-4 pb-3 pt-2 dark:border-neutral-800 dark:bg-neutral-900">
        <SegmentedControl
          options={tabOptions}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        />
      </View>

      {/* 选项卡内容 */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 96 }}
      >
        {selectedTabIndex === 0 && <Plans />}

        {selectedTabIndex === 1 && <Task />}

        {selectedTabIndex === 2 && <Process />}

        {selectedTabIndex === 3 && <Equipment />}

        {selectedTabIndex === 4 && <Report />}
      </ScrollView>

      {/* 报表页不需要新增操作，避免悬浮按钮遮挡图表。 */}
      {selectedTabIndex !== 4 && (
        <TouchableOpacity className="absolute bottom-5 right-5 size-14 items-center justify-center rounded-2xl bg-primary-600 shadow-lg dark:bg-primary-600">
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Production;
