// import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavHeader, SafeAreaView } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

const Quality = () => {
  const router = useRouter();
  const { isDark } = useAppColorScheme();

  // const navigation = useNavigation();
  const [activeMainTab, setActiveMainTab] = useState('quality-overview');
  const [activeSubTab, setActiveSubTab] = useState('质检任务');
  const [activeInspectionTab, setActiveInspectionTab] = useState('全部');

  // 主选项卡内容
  const mainTabs = [
    { id: 'quality-overview', title: '质量概览' },
    { id: 'quality-inspection', title: '质量检验' },
    { id: 'defect-management', title: '缺陷管理' },
    { id: 'quality-report', title: '质量报表' },
  ];

  // 子选项卡内容
  const subTabs = [
    '质检任务',
    '质检报告',
    '不良品分析',
    '质量标准',
    '质量报表',
  ];
  const inspectionTabs = ['全部', '待检验', '检验中', '已完成', '异常'];

  // 渲染主选项卡
  const renderMainTabs = () => (
    <View className="mb-4 flex-row overflow-hidden rounded-full bg-white dark:bg-gray-800">
      {mainTabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          className={`flex-1 items-center px-3 py-2 ${activeMainTab === tab.id ? 'bg-blue-600' : 'bg-white dark:bg-gray-800'}`}
          onPress={() => setActiveMainTab(tab.id)}
        >
          <Text
            className={`text-sm font-medium ${activeMainTab === tab.id ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // 渲染子选项卡
  const renderSubTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
    >
      <View className="flex-row space-x-2">
        {subTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`rounded-full px-4 py-2 ${activeSubTab === tab ? 'bg-blue-600' : 'bg-white dark:bg-gray-800'}`}
            onPress={() => setActiveSubTab(tab)}
          >
            <Text
              className={`whitespace-nowrap text-sm font-medium ${activeSubTab === tab ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  // 渲染检验任务选项卡
  const renderInspectionTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
    >
      <View className="flex-row space-x-2">
        {inspectionTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`rounded-full px-4 py-2 ${activeInspectionTab === tab ? 'bg-blue-600' : 'bg-white dark:bg-gray-800'}`}
            onPress={() => setActiveInspectionTab(tab)}
          >
            <Text
              className={`whitespace-nowrap text-sm font-medium ${activeInspectionTab === tab ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  // 渲染质量概览内容
  const renderQualityOverview = () => (
    <View>
      {renderSubTabs()}

      {/* 质量概览卡片 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">质量概览</Text>
        <View className="mb-3 flex-row">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">今日质检</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-green-600 dark:text-green-400">98.5%</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">合格率</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400">5</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">待处理</Text>
          </View>
        </View>
        <View className="flex-row items-center rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <FontAwesome
            name="chart-line"
            size={20}
            color={isDark ? '#60a5fa' : '#0066ff'}
            style={{ marginRight: 12 }}
          />
          <View>
            <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">本月质量趋势</Text>
            <View className="flex-row items-center">
              <Text className="mr-2 text-lg font-bold text-blue-600 dark:text-blue-400">良好</Text>
              <Text className="text-xs text-green-500">↑ 1.2%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 质检任务列表 */}
      <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">质检任务</Text>

      {/* 任务项目1 */}
      <TouchableOpacity onPress={() => router.push(`/quality/1`)}>
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-2 flex-row items-start justify-between">
            <Text className="font-medium text-gray-900 dark:text-gray-100">智能手表主板质检</Text>
            <View className="rounded-full bg-blue-100 px-2 py-1 dark:bg-blue-900/30">
              <Text className="text-xs font-medium text-blue-800 dark:text-blue-300">进行中</Text>
            </View>
          </View>
          <Text className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            任务编号：QC20231128-01
          </Text>
          <View className="mb-3 flex-row justify-between text-sm text-gray-600 dark:text-gray-400">
            <Text className="text-gray-600 dark:text-gray-400">负责人：王质检</Text>
            <Text className="text-gray-600 dark:text-gray-400">截止日期：2023-12-05</Text>
          </View>
          <View className="mb-2">
            <View className="mb-1 flex-row justify-between text-sm">
              <Text className="text-gray-900 dark:text-gray-100">完成进度</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">65%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <View
                className="h-full rounded-full bg-blue-500"
                style={{ width: '65%' }}
              />
            </View>
          </View>
          <View className="flex-row items-center justify-between text-sm">
            <View className="flex-row">
              <Text className="text-gray-600 dark:text-gray-400">计划检测：</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">1000</Text>
              <Text className="ml-3 text-gray-600 dark:text-gray-400">已完成：</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">650</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-blue-600 dark:text-blue-400">详情</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      {/* 任务项目2 */}
      <TouchableOpacity onPress={() => router.push(`/quality/1`)}>
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-2 flex-row items-start justify-between">
            <Text className="font-medium text-gray-900 dark:text-gray-100">智能音箱外壳质检</Text>
            <View className="rounded-full bg-green-100 px-2 py-1 dark:bg-green-900/30">
              <Text className="text-xs font-medium text-green-800 dark:text-green-300">已完成</Text>
            </View>
          </View>
          <Text className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            任务编号：QC20231125-03
          </Text>
          <View className="mb-3 flex-row justify-between text-sm text-gray-600 dark:text-gray-400">
            <Text className="text-gray-600 dark:text-gray-400">负责人：李质检</Text>
            <Text className="text-gray-600 dark:text-gray-400">完成日期：2023-11-28</Text>
          </View>
          <View className="mb-2">
            <View className="mb-1 flex-row justify-between text-sm">
              <Text className="text-gray-900 dark:text-gray-100">合格率</Text>
              <Text className="font-medium text-green-600 dark:text-green-400">99.2%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <View
                className="h-full rounded-full bg-green-500"
                style={{ width: '99.2%' }}
              />
            </View>
          </View>
          <View className="flex-row items-center justify-between text-sm">
            <View className="flex-row">
              <Text className="text-gray-600 dark:text-gray-400">检测数量：</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">2000</Text>
              <Text className="ml-3 text-gray-600 dark:text-gray-400">不合格：</Text>
              <Text className="font-medium text-red-600 dark:text-red-400">16</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-blue-600 dark:text-blue-400">查看报告</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {/* 不良品分析 */}
      <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">不良品分析</Text>
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-4 flex-row items-center">
          <View className="h-24 w-1/3 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <Text className="text-xl font-bold text-blue-600 dark:text-blue-400">1.5%</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">不良品率</Text>
          </View>
          <View className="w-2/3 pl-4">
            <Text className="mb-2 text-sm text-gray-900 dark:text-gray-100">主要不良原因：</Text>
            <View className="mb-1 flex-row items-center">
              <View className="mr-2 size-2 rounded-full bg-red-500" />
              <Text className="mr-2 text-xs text-gray-600 dark:text-gray-400">焊接不良</Text>
              <Text className="text-xs font-medium text-gray-900 dark:text-gray-100">45%</Text>
            </View>
            <View className="mb-1 flex-row items-center">
              <View className="mr-2 size-2 rounded-full bg-orange-500" />
              <Text className="mr-2 text-xs text-gray-600 dark:text-gray-400">外观瑕疵</Text>
              <Text className="text-xs font-medium text-gray-900 dark:text-gray-100">30%</Text>
            </View>
            <View className="flex-row items-center">
              <View className="mr-2 size-2 rounded-full bg-yellow-500" />
              <Text className="mr-2 text-xs text-gray-600 dark:text-gray-400">功能异常</Text>
              <Text className="text-xs font-medium text-gray-900 dark:text-gray-100">25%</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Text className="text-sm text-blue-600 dark:text-blue-400">查看详细分析</Text>
        </TouchableOpacity>
      </View>

      {/* 质量改进建议 */}
      <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">质量改进建议</Text>
      <View className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="border-b border-gray-100 py-4 dark:border-gray-700">
          <View className="mb-1 flex-row items-start justify-between">
            <Text className="font-medium text-gray-900 dark:text-gray-100">优化焊接工艺参数</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">2023-11-28</Text>
          </View>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            针对焊接不良问题，建议调整焊接温度和时间参数，并加强操作人员培训。
          </Text>
        </View>

        <View className="border-b border-gray-100 py-4 dark:border-gray-700">
          <View className="mb-1 flex-row items-start justify-between">
            <Text className="font-medium text-gray-900 dark:text-gray-100">更新外观检测标准</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">2023-11-25</Text>
          </View>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            建议更新外观检测标准，增加细节检查项，并引入自动化视觉检测系统辅助人工检测。
          </Text>
        </View>

        <View className="py-4">
          <View className="mb-1 flex-row items-start justify-between">
            <Text className="font-medium text-gray-900 dark:text-gray-100">加强功能测试覆盖率</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">2023-11-22</Text>
          </View>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            针对功能异常问题，建议增加测试用例覆盖率，并在生产线上增加中间测试环节。
          </Text>
        </View>
      </View>
    </View>
  );

  // 渲染质量检验内容
  const renderQualityInspection = () => (
    <View>
      {/* 质量检验概览 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">质量检验概览</Text>
        <View className="mb-3 flex-row">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">15</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">待检验</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400">8</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">检验中</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-green-600 dark:text-green-400">42</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400">已完成</Text>
          </View>
        </View>
        <View className="flex-row items-center rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <FontAwesome
            name="clipboard-check"
            size={20}
            color={isDark ? '#60a5fa' : '#0066ff'}
            style={{ marginRight: 12 }}
          />
          <View>
            <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">本周检验完成率</Text>
            <View className="flex-row items-center">
              <Text className="mr-2 text-lg font-bold text-blue-600 dark:text-blue-400">
                92.5%
              </Text>
              <Text className="text-xs text-green-500">↑ 3.2%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 检验任务筛选 */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">检验任务</Text>
        <View className="flex-row space-x-2">
          <TouchableOpacity className="flex-row items-center rounded-md border border-gray-300 bg-white px-3 py-1 dark:border-gray-600 dark:bg-gray-800">
            <FontAwesome
              name="filter"
              size={12}
              color={isDark ? '#9ca3af' : '#6b7280'}
              style={{ marginRight: 4 }}
            />
            <Text className="text-sm text-gray-900 dark:text-gray-100">筛选</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center rounded-md border border-gray-300 bg-white px-3 py-1 dark:border-gray-600 dark:bg-gray-800">
            <FontAwesome
              name="sort"
              size={12}
              color={isDark ? '#9ca3af' : '#6b7280'}
              style={{ marginRight: 4 }}
            />
            <Text className="text-sm text-gray-900 dark:text-gray-100">排序</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 任务状态选项卡 */}
      {renderInspectionTabs()}

      {/* 检验任务1 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-2 flex-row items-start justify-between">
          <Text className="font-medium text-gray-900 dark:text-gray-100">智能手表主板检验</Text>
          <View className="rounded-full bg-yellow-100 px-2 py-1 dark:bg-yellow-900/30">
            <Text className="text-xs font-medium text-yellow-800 dark:text-yellow-300">待检验</Text>
          </View>
        </View>
        <Text className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          任务编号：QI20231201-01
        </Text>
        <View className="mb-3 flex-row justify-between text-sm text-gray-600 dark:text-gray-400">
          <Text className="text-gray-600 dark:text-gray-400">负责人：王质检</Text>
          <Text className="text-gray-600 dark:text-gray-400">截止日期：2023-12-05</Text>
        </View>
        <View className="flex-row items-center justify-between text-sm">
          <View className="flex-row">
            <Text className="text-gray-600 dark:text-gray-400">批次号：</Text>
            <Text className="font-medium text-gray-900 dark:text-gray-100">BT20231201-A</Text>
            <Text className="ml-3 text-gray-600 dark:text-gray-400">计划数量：</Text>
            <Text className="font-medium text-gray-900 dark:text-gray-100">500</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-600 dark:text-blue-400">开始检验</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 检验任务2 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <View className="mb-2 flex-row items-start justify-between">
          <Text className="font-medium text-gray-900 dark:text-gray-100">智能音箱电路板检验</Text>
          <View className="rounded-full bg-blue-100 px-2 py-1 dark:bg-blue-900/30">
            <Text className="text-xs font-medium text-blue-800 dark:text-blue-300">检验中</Text>
          </View>
        </View>
        <Text className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          任务编号：QI20231130-02
        </Text>
        <View className="mb-3 flex-row justify-between text-sm text-gray-600 dark:text-gray-400">
          <Text className="text-gray-600 dark:text-gray-400">负责人：李质检</Text>
          <Text className="text-gray-600 dark:text-gray-400">截止日期：2023-12-03</Text>
        </View>
        <View className="mb-2">
          <View className="mb-1 flex-row justify-between text-sm">
            <Text className="text-gray-900 dark:text-gray-100">完成进度</Text>
            <Text className="font-medium text-gray-900 dark:text-gray-100">70%</Text>
          </View>
          <View className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <View
              className="h-full rounded-full bg-blue-500"
              style={{ width: '70%' }}
            />
          </View>
        </View>
        <View className="flex-row items-center justify-between text-sm">
          <View className="flex-row">
            <Text className="text-gray-600 dark:text-gray-400">已检验：</Text>
            <Text className="font-medium text-gray-900 dark:text-gray-100">350</Text>
            <Text className="ml-3 text-gray-600 dark:text-gray-400">不合格：</Text>
            <Text className="font-medium text-red-600 dark:text-red-400">12</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-600 dark:text-blue-400">继续检验</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // 渲染缺陷管理内容（简化版）
  const renderDefectManagement = () => (
    <View className="items-center justify-center py-8">
      <FontAwesome name="exclamation-triangle" size={50} color={isDark ? '#fbbf24' : '#f59e0b'} />
      <Text className="mb-2 mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">缺陷管理</Text>
      <Text className="px-8 text-center text-sm text-gray-500 dark:text-gray-400">
        此部分内容正在开发中，敬请期待
      </Text>
    </View>
  );

  // 渲染质量报表内容（简化版）
  const renderQualityReport = () => (
    <View className="items-center justify-center py-8">
      <FontAwesome name="chart-bar" size={50} color={isDark ? '#60a5fa' : '#3b82f6'} />
      <Text className="mb-2 mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">质量报表</Text>
      <Text className="px-8 text-center text-sm text-gray-500 dark:text-gray-400">
        此部分内容正在开发中，敬请期待
      </Text>
    </View>
  );

  // 根据当前选中的选项卡渲染内容
  const renderContent = () => {
    switch (activeMainTab) {
      case 'quality-overview':
        return renderQualityOverview();
      case 'quality-inspection':
        return renderQualityInspection();
      case 'defect-management':
        return renderDefectManagement();
      case 'quality-report':
        return renderQualityReport();
      default:
        return renderQualityOverview();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <NavHeader title="质量管理" />

      <ScrollView className="flex-1 p-4">
        {/* 分段控制器 */}
        {renderMainTabs()}

        {/* 内容区域 */}
        {renderContent()}
      </ScrollView>

      {/* 浮动按钮 */}
      <TouchableOpacity
        className="absolute bottom-20 right-6 size-14 items-center justify-center rounded-full bg-blue-600 shadow-lg"
        style={{ elevation: 5 }}
      >
        <FontAwesome name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Quality;
