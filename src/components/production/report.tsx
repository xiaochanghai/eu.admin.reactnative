import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@/components/ui/icons';

import ReportDateSelector from './report-date-selector';

// 产品线数据类型定义
interface ProductLineData {
  id: string;
  name: string;
  plannedOutput: number;
  actualOutput: number;
  completionRate: number;
  color: string;
}

// 设备状态数据类型定义
interface EquipmentStatusData {
  id: string;
  status: string;
  count: number;
  percentage: number;
  color: string;
}

/**
 * 生产报表组件
 * 展示生产数据、设备运行报表和报表下载功能
 */
export const Report = () => {
  // 产品线产量数据
  const productLineData: ProductLineData[] = [
    {
      id: '1',
      name: '产品线A',
      plannedOutput: 450,
      actualOutput: 425,
      completionRate: 94.4,
      color: '#3B82F6',
    },
    {
      id: '2',
      name: '产品线B',
      plannedOutput: 380,
      actualOutput: 365,
      completionRate: 96.1,
      color: '#10B981',
    },
    {
      id: '3',
      name: '产品线C',
      plannedOutput: 320,
      actualOutput: 290,
      completionRate: 90.6,
      color: '#F59E0B',
    },
    {
      id: '4',
      name: '产品线D',
      plannedOutput: 280,
      actualOutput: 275,
      completionRate: 98.2,
      color: '#EF4444',
    },
  ];

  // 设备状态数据
  const equipmentStatusData: EquipmentStatusData[] = [
    {
      id: '1',
      status: '运行中',
      count: 18,
      percentage: 56.3,
      color: '#10B981',
    },
    {
      id: '2',
      status: '待机',
      count: 8,
      percentage: 25.0,
      color: '#F59E0B',
    },
    {
      id: '3',
      status: '维护中',
      count: 4,
      percentage: 12.5,
      color: '#3B82F6',
    },
    {
      id: '4',
      status: '故障',
      count: 2,
      percentage: 6.2,
      color: '#EF4444',
    },
  ];

  // 计算最大产量用于比例计算
  const maxOutput = Math.max(
    ...productLineData.map((item) => item.plannedOutput)
  );
  // 图表最大高度（像素）
  const maxChartHeight = 80;

  // 处理产品线详情点击事件
  const handleProductLineDetail = (productLine: ProductLineData) => {
    console.log('查看产品线详情:', productLine.name);
    // 这里可以添加导航到详情页面的逻辑
  };

  // 处理设备状态详情点击事件
  const handleEquipmentStatusDetail = (status: EquipmentStatusData) => {
    console.log('查看设备状态详情:', status.status);
    // 这里可以添加导航到详情页面的逻辑
  };

  return (
    <View>
      {/* 报表概览 - 标题和日期选择器 */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">生产报表</Text>
        <ReportDateSelector />
      </View>

      {/* 生产数据卡片 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-semibold">生产数据</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">2023-12-05</Text>
        </View>

        {/* 生产数据统计网格 */}
        <View className="mb-4 flex-row flex-wrap">
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600 dark:text-blue-400">1,250</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">计划产量</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600 dark:text-blue-400">1,180</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">实际产量</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600 dark:text-blue-400">94.4%</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">计划完成率</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600 dark:text-blue-400">98.3%</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">良品率</Text>
          </View>
        </View>

        {/* 产品线产量对比图表 */}
        <View className="mb-3">
          <Text className="mb-3 text-sm font-medium">各产品线产量对比</Text>

          {/* 图表容器 */}
          <View className="rounded-xl bg-gray-50 p-4 dark:bg-neutral-700">
            {/* 图表标题和图例 */}
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xs font-medium text-gray-600 dark:text-gray-400">
                产量 (件)
              </Text>
              <View className="flex-row items-center">
                <View className="mr-4 flex-row items-center">
                  <View className="mr-1 size-3 rounded-sm bg-blue-500" />
                  <Text className="text-xs text-gray-600 dark:text-gray-400">计划</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="mr-1 size-3 rounded-sm bg-green-500" />
                  <Text className="text-xs text-gray-600 dark:text-gray-400">实际</Text>
                </View>
              </View>
            </View>

            {/* 柱状图容器 - 修复高度和布局问题 */}
            <View className="mb-4">
              {productLineData.map((item, index) => {
                // 计算柱状图高度（使用固定像素值）
                const plannedHeight =
                  (item.plannedOutput / maxOutput) * maxChartHeight;
                const actualHeight =
                  (item.actualOutput / maxOutput) * maxChartHeight;

                return (
                  <TouchableOpacity
                    key={item.id + index}
                    onPress={() => handleProductLineDetail(item)}
                    className="mb-3 flex-row items-end"
                  >
                    {/* 产品线名称 */}
                    <View className="w-20">
                      <Text
                        className="text-xs font-medium text-gray-600 dark:text-gray-400"
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                    </View>

                    {/* 柱状图区域 */}
                    <View
                      className="ml-3 flex-1 flex-row items-end"
                      style={{ height: maxChartHeight + 10 }}
                    >
                      {/* 计划产量柱 */}
                      <View className="mr-2 w-8 justify-end">
                        <View
                          className="w-full rounded-t-sm bg-blue-500"
                          style={{ height: plannedHeight }}
                        />
                        <View className="h-1 w-full bg-gray-300" />
                      </View>

                      {/* 实际产量柱 */}
                      <View className="mr-3 w-8 justify-end">
                        <View
                          className="w-full rounded-t-sm bg-green-500"
                          style={{ height: actualHeight }}
                        />
                        <View className="h-1 w-full bg-gray-300" />
                      </View>

                      {/* 数值显示 */}
                      <View className="flex-1 justify-center">
                        <Text className="text-xs font-medium text-gray-800 dark:text-gray-100">
                          实际: {item.actualOutput}
                        </Text>
                        <Text className="text-xs text-gray-600 dark:text-gray-400">
                          计划: {item.plannedOutput}
                        </Text>
                        <Text className="text-xs font-medium text-green-600">
                          {item.completionRate}%
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* 图表底部说明 */}
            <View className="border-t border-gray-200 pt-2">
              <Text className="text-center text-xs text-gray-500 dark:text-gray-400">
                点击产品线查看详细信息
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 设备运行报表卡片 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-semibold">设备运行报表</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">2023-12-05</Text>
        </View>

        {/* 设备运行数据统计网格 */}
        <View className="mb-4 flex-row flex-wrap">
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600 dark:text-blue-400">32</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">设备总数</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600 dark:text-blue-400">28</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">运行设备</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600 dark:text-blue-400">87.5%</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">设备利用率</Text>
          </View>
          <View className="mb-3 w-1/2">
            <Text className="mb-1 text-lg font-bold text-blue-600 dark:text-blue-400">4.2h</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">平均运行</Text>
          </View>
        </View>

        {/* 设备运行状态分布图表 */}
        <View className="mb-3">
          <Text className="mb-3 text-sm font-medium">设备运行状态分布</Text>

          {/* 图表容器 */}
          <View className="rounded-xl bg-gray-50 p-4 dark:bg-neutral-700">
            {/* 中心饼图区域 */}
            <View className="mb-4 items-center">
              {/* 饼图中心圆 */}
              <View className="relative size-32 items-center justify-center">
                {/* 背景圆 */}
                <View className="absolute size-32 rounded-full bg-gray-200" />

                {/* 状态分布环形图 - 使用多个扇形模拟 */}
                <View className="absolute size-32 items-center justify-center">
                  {/* 运行中 - 绿色 (56.3%) */}
                  <View
                    className="absolute size-32 rounded-full"
                    style={{
                      backgroundColor: '#10B981',
                      transform: [{ rotate: '0deg' }],
                    }}
                  />

                  {/* 待机 - 黄色 (25%) */}
                  <View
                    className="absolute size-32 rounded-full"
                    style={{
                      backgroundColor: '#F59E0B',
                      transform: [{ rotate: '203deg' }],
                    }}
                  />

                  {/* 维护中 - 蓝色 (12.5%) */}
                  <View
                    className="absolute size-32 rounded-full"
                    style={{
                      backgroundColor: '#3B82F6',
                      transform: [{ rotate: '293deg' }],
                    }}
                  />

                  {/* 故障 - 红色 (6.2%) */}
                  <View
                    className="absolute size-32 rounded-full"
                    style={{
                      backgroundColor: '#EF4444',
                      transform: [{ rotate: '338deg' }],
                    }}
                  />
                </View>

                {/* 中心白色圆 */}
                <View className="size-16 items-center justify-center rounded-full bg-white">
                  <Text className="text-xs font-bold text-gray-800 dark:text-gray-100">32台</Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">设备</Text>
                </View>
              </View>
            </View>

            {/* 状态图例和数据 */}
            <View className="space-y-2">
              {equipmentStatusData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleEquipmentStatusDetail(item)}
                  className="flex-row items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-neutral-700"
                >
                  <View className="flex-1 flex-row items-center">
                    {/* 状态颜色指示器 */}
                    <View
                      className="mr-3 size-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />

                    {/* 状态名称 */}
                    <Text className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {item.status}
                    </Text>
                  </View>

                  {/* 数量和百分比 */}
                  <View className="items-end">
                    <Text className="text-sm font-bold text-gray-800 dark:text-gray-100">
                      {item.count}台
                    </Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400">
                      {item.percentage}%
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* 图表底部说明 */}
            <View className="mt-3 border-t border-gray-200 pt-2">
              <Text className="text-center text-xs text-gray-500 dark:text-gray-400">
                点击状态查看详细设备列表
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 报表下载卡片 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
        <Text className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
          生产报表
        </Text>
        <TouchableOpacity className="flex-row items-center border-b border-gray-100 py-3">
          <FontAwesome
            name="file-pdf-o"
            size={20}
            color="#ef4444"
            style={{ marginRight: 12 }}
          />
          <Text className="text-sm text-gray-800 dark:text-gray-100">下载本月生产报表</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
