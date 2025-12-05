import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { SegmentedControl, type SegmentedControlOption } from '@/components';
import {
  Inventory,
  OverView,
  Production,
  Quality,
  Sales,
} from '@/components/analytics';
import { NavHeader, ScrollView, View } from '@/components/ui';

// 图表图例项组件
// type ChartLegendItemProps = {
//   color: string;
//   label: string;
// };

// const ChartLegendItem: React.FC<ChartLegendItemProps> = ({ color, label }) => (
//   <View className="flex-row items-center">
//     <View
//       className="mr-1 size-3 rounded-full"
//       style={{ backgroundColor: color }}
//     />
//     <Text className="text-xs text-gray-500">{label}</Text>
//   </View>
// );

const Analytics: React.FC = () => {
  // 分段控制器选项
  const segmentedOptions: SegmentedControlOption[] = [
    { key: 'overview', label: '总览' },
    { key: 'production-analytics', label: '生产分析' },
    { key: 'sales-analytics', label: '销售分析' },
    { key: 'inventory-analytics', label: '库存分析' },
    { key: 'quality-analytics', label: '质量分析' },
  ];

  // 当前选中的选项
  const [activeSegment, setActiveSegment] = useState(0);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <NavHeader
        title="数据分析"
        // right={
        //   <>
        //     <TouchableOpacity>
        //       <FontAwesome name="plus" size={12} />
        //     </TouchableOpacity>
        //   </>
        // }
      />
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 分段控制器 */}
        <View className="mb-4">
          <SegmentedControl
            options={segmentedOptions}
            selectedIndex={activeSegment}
            onChange={setActiveSegment}
          />
        </View>

        {/* 总览选项卡内容 */}
        {activeSegment === 0 && <OverView />}
        {activeSegment === 1 && <Production />}
        {activeSegment === 2 && <Sales />}
        {activeSegment === 3 && <Inventory />}
        {activeSegment === 4 && <Quality />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analytics;
