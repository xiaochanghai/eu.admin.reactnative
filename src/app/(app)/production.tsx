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
            <TouchableOpacity className="ml-4">
              <FontAwesome name="search" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <FontAwesome name="filter" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <FontAwesome name="plus-circle" size={22} color="#0066ff" />
            </TouchableOpacity>
          </>
        }
      />

      {/* 分段控制器 - 固定在顶部 */}
      <View className="px-4 pt-4">
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
        contentContainerStyle={{ paddingTop: 16 }}
      >
        {selectedTabIndex === 0 && <Plans />}

        {selectedTabIndex === 1 && <Task />}

        {selectedTabIndex === 2 && <Process />}

        {selectedTabIndex === 3 && <Equipment />}

        {selectedTabIndex === 4 && <Report />}

        {/* 底部间距 */}
        <View className="h-20" />
      </ScrollView>

      {/* 浮动按钮 */}
      <TouchableOpacity className="absolute bottom-20 right-6 size-14 items-center justify-center rounded-full bg-blue-600 shadow-lg dark:bg-purple-600">
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Production;

