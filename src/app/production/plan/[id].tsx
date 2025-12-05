import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavHeader, SafeAreaView } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

const ProductionPlanDetail = () => {
  const [activeTab, setActiveTab] = useState('plan-details');

  // 切换选项卡
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <NavHeader
        title="计划详情"
        right={
          <>
            <TouchableOpacity className="mr-4">
              <FontAwesome name="share-alt" size={18} color="#4b5563" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="ellipsis-v" size={18} color="#4b5563" />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView className="mb-20 flex-1 p-4">
        {/* 计划基本信息 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-start justify-between">
            <Text className="text-lg font-semibold">智能手表主板生产计划</Text>
            <View className="rounded-full bg-purple-100 px-2 py-1">
              <Text className="text-xs font-medium text-purple-800">
                进行中
              </Text>
            </View>
          </View>

          <View className="mb-4 flex-row flex-wrap">
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">计划编号</Text>
              <Text className="text-sm font-medium">PP20231128-01</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">负责人</Text>
              <Text className="text-sm font-medium">王工程师</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">开始日期</Text>
              <Text className="text-sm font-medium">2023-11-30</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">截止日期</Text>
              <Text className="text-sm font-medium">2023-12-15</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">计划产量</Text>
              <Text className="text-sm font-medium">1000件</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">已完成</Text>
              <Text className="text-sm font-medium text-blue-600">
                650件 (65%)
              </Text>
            </View>
          </View>

          <View className="mb-3">
            <View className="mb-1 flex-row justify-between text-sm">
              <Text>完成进度</Text>
              <Text>65%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded-full bg-gray-200">
              <View className="h-full bg-blue-600" style={{ width: '65%' }} />
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3">
            <Text className="mb-1 text-xs text-gray-500">计划描述</Text>
            <Text className="text-sm">
              智能手表主板生产计划，包括PCB制作、元器件采购、SMT贴片和功能测试等工序。本批次为1000件，优先级高。
            </Text>
          </View>
        </View>

        {/* 选项卡 - 分段控制器样式 */}
        <View className="mb-4 flex-row rounded-lg bg-gray-200 p-1">
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'plan-details' ? 'bg-white' : ''}`}
            onPress={() => handleTabChange('plan-details')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'plan-details' ? 'font-medium text-blue-600' : 'text-gray-600'}`}
            >
              计划详情
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'production-progress' ? 'bg-white' : ''}`}
            onPress={() => handleTabChange('production-progress')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'production-progress' ? 'font-medium text-blue-600' : 'text-gray-600'}`}
            >
              生产进度
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'material-info' ? 'bg-white' : ''}`}
            onPress={() => handleTabChange('material-info')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'material-info' ? 'font-medium text-blue-600' : 'text-gray-600'}`}
            >
              物料信息
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'team-info' ? 'bg-white' : ''}`}
            onPress={() => handleTabChange('team-info')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'team-info' ? 'font-medium text-blue-600' : 'text-gray-600'}`}
            >
              团队信息
            </Text>
          </TouchableOpacity>
        </View>

        {/* 选项卡内容区域 */}
        {/* 计划详情 */}
        {activeTab === 'plan-details' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm">
            <Text className="mb-3 text-base font-medium">工序安排</Text>

            {/* 工序1 */}
            <View className="mb-3 overflow-hidden rounded-lg border border-gray-100">
              <View className="flex-row items-center justify-between bg-gray-50 p-3">
                <Text className="font-medium">PCB制板</Text>
                <View className="rounded-full bg-green-100 px-2 py-1">
                  <Text className="text-xs font-medium text-green-800">
                    已完成
                  </Text>
                </View>
              </View>
              <View className="p-3">
                <View className="mb-2 flex-row justify-between">
                  <View>
                    <Text className="text-xs text-gray-500">负责人</Text>
                    <Text className="text-sm">李工程师</Text>
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500">完成时间</Text>
                    <Text className="text-sm">2023-12-02</Text>
                  </View>
                </View>
                <Text className="mb-1 text-xs text-gray-500">备注</Text>
                <Text className="text-sm">
                  PCB制板工序已完成，质检合格率98.5%
                </Text>
              </View>
            </View>

            {/* 工序2 */}
            <View className="mb-3 overflow-hidden rounded-lg border border-gray-100">
              <View className="flex-row items-center justify-between bg-gray-50 p-3">
                <Text className="font-medium">SMT贴片</Text>
                <View className="rounded-full bg-purple-100 px-2 py-1">
                  <Text className="text-xs font-medium text-purple-800">
                    进行中
                  </Text>
                </View>
              </View>
              <View className="p-3">
                <View className="mb-2 flex-row justify-between">
                  <View>
                    <Text className="text-xs text-gray-500">负责人</Text>
                    <Text className="text-sm">张工程师</Text>
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500">预计完成</Text>
                    <Text className="text-sm">2023-12-08</Text>
                  </View>
                </View>
                <Text className="mb-1 text-xs text-gray-500">进度</Text>
                <Text className="text-sm">已完成650块主板贴片，正在进行中</Text>
              </View>
            </View>

            {/* 工序3 */}
            <View className="overflow-hidden rounded-lg border border-gray-100">
              <View className="flex-row items-center justify-between bg-gray-50 p-3">
                <Text className="font-medium">功能测试</Text>
                <View className="rounded-full bg-orange-100 px-2 py-1">
                  <Text className="text-xs font-medium text-orange-800">
                    待开始
                  </Text>
                </View>
              </View>
              <View className="p-3">
                <View className="mb-2 flex-row justify-between">
                  <View>
                    <Text className="text-xs text-gray-500">负责人</Text>
                    <Text className="text-sm">赵工程师</Text>
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500">预计开始</Text>
                    <Text className="text-sm">2023-12-09</Text>
                  </View>
                </View>
                <Text className="mb-1 text-xs text-gray-500">备注</Text>
                <Text className="text-sm">等待SMT贴片完成后进行功能测试</Text>
              </View>
            </View>
          </View>
        )}

        {/* 生产进度 */}
        {activeTab === 'production-progress' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm">
            <Text className="mb-3 text-base font-medium">生产进度概览</Text>

            <View className="mb-4">
              <View className="mb-1 flex-row justify-between text-sm">
                <Text>总体进度</Text>
                <Text>65%</Text>
              </View>
              <View className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                <View className="h-full bg-blue-600" style={{ width: '65%' }} />
              </View>
            </View>

            <View className="mb-4 flex-row justify-between">
              <View className="items-center">
                <Text className="text-xl font-bold text-green-600">100%</Text>
                <Text className="text-xs text-gray-500">PCB制板</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-bold text-blue-600">65%</Text>
                <Text className="text-xs text-gray-500">SMT贴片</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-bold text-gray-400">0%</Text>
                <Text className="text-xs text-gray-500">功能测试</Text>
              </View>
            </View>

            <Text className="mb-3 text-base font-medium">生产时间线</Text>

            {/* 时间线项目 */}
            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-4 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium">计划创建</Text>
              <Text className="text-xs text-gray-500">2023-11-28 10:30</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-4 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium">物料准备完成</Text>
              <Text className="text-xs text-gray-500">2023-11-29 16:45</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-4 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium">PCB制板开始</Text>
              <Text className="text-xs text-gray-500">2023-11-30 09:15</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-4 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium">PCB制板完成</Text>
              <Text className="text-xs text-gray-500">2023-12-02 11:30</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-4 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium">SMT贴片开始</Text>
              <Text className="text-xs text-gray-500">2023-12-03 08:00</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-4 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium">SMT贴片进行中</Text>
              <Text className="text-xs text-gray-500">2023-12-05 14:30</Text>
              <Text className="mt-1 text-xs text-blue-600">
                已完成650件，剩余350件
              </Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-gray-200" />
              <View className="absolute bottom-0 left-3 top-4 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium text-gray-400">
                SMT贴片完成
              </Text>
              <Text className="text-xs text-gray-400">预计 2023-12-08</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-gray-200" />
              <View className="absolute bottom-0 left-3 top-4 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium text-gray-400">
                功能测试
              </Text>
              <Text className="text-xs text-gray-400">
                预计 2023-12-09 - 2023-12-13
              </Text>
            </View>

            <View className="relative pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-gray-200" />
              <Text className="text-sm font-medium text-gray-400">
                计划完成
              </Text>
              <Text className="text-xs text-gray-400">预计 2023-12-15</Text>
            </View>
          </View>
        )}

        {/* 物料信息 */}
        {activeTab === 'material-info' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm">
            <Text className="mb-3 text-base font-medium">物料清单</Text>

            {/* 物料项目1 */}
            <View className="border-b border-gray-100 py-3">
              <View className="mb-1 flex-row justify-between">
                <Text className="font-medium">PCB空板</Text>
                <Text className="text-sm text-green-600">已到货</Text>
              </View>
              <Text className="mb-1 text-sm text-gray-600">
                规格：4层板 / FR-4 / 1.6mm
              </Text>
              <View className="flex-row justify-between text-sm">
                <Text>需求数量：1050片</Text>
                <Text>库存数量：1100片</Text>
              </View>
            </View>

            {/* 物料项目2 */}
            <View className="border-b border-gray-100 py-3">
              <View className="mb-1 flex-row justify-between">
                <Text className="font-medium">主控芯片</Text>
                <Text className="text-sm text-green-600">已到货</Text>
              </View>
              <Text className="mb-1 text-sm text-gray-600">
                型号：STM32F103RCT6
              </Text>
              <View className="flex-row justify-between text-sm">
                <Text>需求数量：1000个</Text>
                <Text>库存数量：1200个</Text>
              </View>
            </View>

            {/* 物料项目3 */}
            <View className="border-b border-gray-100 py-3">
              <View className="mb-1 flex-row justify-between">
                <Text className="font-medium">电容</Text>
                <Text className="text-sm text-green-600">已到货</Text>
              </View>
              <Text className="mb-1 text-sm text-gray-600">
                规格：0402 / 0.1uF
              </Text>
              <View className="flex-row justify-between text-sm">
                <Text>需求数量：10000个</Text>
                <Text>库存数量：12000个</Text>
              </View>
            </View>

            {/* 物料项目4 */}
            <View className="border-b border-gray-100 py-3">
              <View className="mb-1 flex-row justify-between">
                <Text className="font-medium">电阻</Text>
                <Text className="text-sm text-green-600">已到货</Text>
              </View>
              <Text className="mb-1 text-sm text-gray-600">
                规格：0402 / 10K
              </Text>
              <View className="flex-row justify-between text-sm">
                <Text>需求数量：8000个</Text>
                <Text>库存数量：9500个</Text>
              </View>
            </View>

            {/* 物料项目5 */}
            <View className="py-3">
              <View className="mb-1 flex-row justify-between">
                <Text className="font-medium">蓝牙模块</Text>
                <Text className="text-sm text-green-600">已到货</Text>
              </View>
              <Text className="mb-1 text-sm text-gray-600">型号：BLE4.2</Text>
              <View className="flex-row justify-between text-sm">
                <Text>需求数量：1000个</Text>
                <Text>库存数量：1050个</Text>
              </View>
            </View>
          </View>
        )}

        {/* 团队信息 */}
        {activeTab === 'team-info' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm">
            <Text className="mb-3 text-base font-medium">团队成员</Text>

            {/* 团队成员1 */}
            <View className="flex-row border-b border-gray-100 py-3">
              <View className="mr-3 size-10 items-center justify-center rounded-full bg-gray-200">
                <FontAwesome name="user" size={16} color="#9ca3af" />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text className="font-medium">王工程师</Text>
                  <Text className="text-sm text-blue-600">项目负责人</Text>
                </View>
                <Text className="text-sm text-gray-600">
                  电子工程部 / 高级工程师
                </Text>
              </View>
            </View>

            {/* 团队成员2 */}
            <View className="flex-row border-b border-gray-100 py-3">
              <View className="mr-3 size-10 items-center justify-center rounded-full bg-gray-200">
                <FontAwesome name="user" size={16} color="#9ca3af" />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text className="font-medium">李工程师</Text>
                  <Text className="text-sm text-gray-600">PCB制板负责人</Text>
                </View>
                <Text className="text-sm text-gray-600">
                  电子工程部 / 工程师
                </Text>
              </View>
            </View>

            {/* 团队成员3 */}
            <View className="flex-row border-b border-gray-100 py-3">
              <View className="mr-3 size-10 items-center justify-center rounded-full bg-gray-200">
                <FontAwesome name="user" size={16} color="#9ca3af" />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text className="font-medium">张工程师</Text>
                  <Text className="text-sm text-gray-600">SMT贴片负责人</Text>
                </View>
                <Text className="text-sm text-gray-600">
                  生产部 / 高级技术员
                </Text>
              </View>
            </View>

            {/* 团队成员4 */}
            <View className="flex-row border-b border-gray-100 py-3">
              <View className="mr-3 size-10 items-center justify-center rounded-full bg-gray-200">
                <FontAwesome name="user" size={16} color="#9ca3af" />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text className="font-medium">赵工程师</Text>
                  <Text className="text-sm text-gray-600">功能测试负责人</Text>
                </View>
                <Text className="text-sm text-gray-600">
                  质量部 / 测试工程师
                </Text>
              </View>
            </View>

            {/* 团队成员5 */}
            <View className="flex-row py-3">
              <View className="mr-3 size-10 items-center justify-center rounded-full bg-gray-200">
                <FontAwesome name="user" size={16} color="#9ca3af" />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text className="font-medium">刘经理</Text>
                  <Text className="text-sm text-gray-600">物料采购</Text>
                </View>
                <Text className="text-sm text-gray-600">采购部 / 采购经理</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 底部操作按钮 */}
      <View className="absolute inset-x-4 bottom-5 flex-row space-x-3">
        <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg border border-gray-300 bg-white py-3">
          <FontAwesome
            name="edit"
            size={16}
            color="#4b5563"
            style={{ marginRight: 8 }}
          />
          <Text className="font-medium text-gray-700">编辑计划</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg bg-blue-600 py-3">
          <FontAwesome
            name="check-circle"
            size={16}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text className="font-medium text-white">更新进度</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductionPlanDetail;
