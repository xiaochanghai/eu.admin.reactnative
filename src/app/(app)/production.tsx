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
    <SafeAreaView className="flex-1 bg-gray-100">
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
      <View className="flex-1 p-4">
        {/* 分段控制器 */}
        <SegmentedControl
          options={tabOptions}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        />

        {/* 选项卡内容 */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mt-4 flex-1"
        >
          {selectedTabIndex === 0 && <Plans />}

          {selectedTabIndex === 1 && <Task />}

          {selectedTabIndex === 2 && <Process />}

          {selectedTabIndex === 3 && <Equipment />}

          {selectedTabIndex === 4 && <Report />}
        </ScrollView>
      </View>

      {/* 浮动按钮 */}
      <TouchableOpacity className="absolute bottom-20 right-6 size-14 items-center justify-center rounded-full bg-blue-600 shadow-lg">
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Production;
