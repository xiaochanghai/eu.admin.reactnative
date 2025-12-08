import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavHeader, SafeAreaView } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

const OrderDetail = () => {
  const [activeTab, setActiveTab] = useState('product-list');
  const { isDark } = useAppColorScheme();

  // 切换选项卡
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <NavHeader
        title="订单详情"
        right={
          <>
            <TouchableOpacity className="mr-4">
              <FontAwesome name="share-alt" size={18} color={isDark ? '#9ca3af' : '#4b5563'} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="ellipsis-v" size={18} color={isDark ? '#9ca3af' : '#4b5563'} />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView className="flex-1 p-4">
        {/* 订单基本信息 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-3 flex-row items-start justify-between">
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">订单 #2023112702</Text>
            <View className="rounded-full bg-purple-100 px-2 py-1 dark:bg-purple-900/30">
              <Text className="text-xs font-medium text-purple-800 dark:text-purple-300">
                生产中
              </Text>
            </View>
          </View>

          <View className="mb-4 flex-row flex-wrap">
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">客户</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">北京智能科技有限公司</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">联系人</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">张经理</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">联系电话</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">138****5678</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">订单金额</Text>
              <Text className="text-sm font-medium text-red-600 dark:text-red-400">¥95,200</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">订单日期</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">2023-11-27</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">交付日期</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">2023-12-10</Text>
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">收货地址</Text>
            <Text className="text-sm text-gray-900 dark:text-gray-100">北京市海淀区中关村科技园区8号楼5层</Text>
          </View>
        </View>

        {/* 选项卡 - 分段控制器样式 */}
        <View className="mb-4 flex-row rounded-lg bg-gray-200 p-1 dark:bg-gray-700">
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'product-list' ? 'bg-white dark:bg-gray-600' : ''}`}
            onPress={() => handleTabChange('product-list')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'product-list' ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              产品明细
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'production-progress' ? 'bg-white dark:bg-gray-600' : ''}`}
            onPress={() => handleTabChange('production-progress')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'production-progress' ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              生产进度
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'logistics-info' ? 'bg-white dark:bg-gray-600' : ''}`}
            onPress={() => handleTabChange('logistics-info')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'logistics-info' ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              物流信息
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'payment-info' ? 'bg-white dark:bg-gray-600' : ''}`}
            onPress={() => handleTabChange('payment-info')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'payment-info' ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              付款信息
            </Text>
          </TouchableOpacity>
        </View>

        {/* 选项卡内容区域 */}
        {/* 产品明细 */}
        {activeTab === 'product-list' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            {/* 产品项目1 */}
            <View className="border-b border-gray-100 py-4 dark:border-gray-700">
              <View className="mb-2 flex-row">
                <View className="mr-3 size-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                  <Image
                    source={{ uri: 'https://via.placeholder.com/64' }}
                    className="size-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1">
                  <Text className="mb-1 font-medium text-gray-900 dark:text-gray-100">智能手表 Pro</Text>
                  <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                    型号：SW-2023-Pro
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-600 dark:text-gray-300">¥1,280 × 50</Text>
                    <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">¥64,000</Text>
                  </View>
                </View>
              </View>
              <View className="rounded bg-gray-50 p-2 dark:bg-gray-700">
                <Text className="mb-1 text-xs text-gray-600 dark:text-gray-300">
                  规格：黑色 / 1.4英寸 / GPS+蜂窝网络
                </Text>
                <Text className="text-xs text-gray-600 dark:text-gray-300">
                  备注：包装需使用防震材料，单独包装
                </Text>
              </View>
            </View>

            {/* 产品项目2 */}
            <View className="border-b border-gray-100 py-4 dark:border-gray-700">
              <View className="mb-2 flex-row">
                <View className="mr-3 size-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                  <Image
                    source={{ uri: 'https://via.placeholder.com/64' }}
                    className="size-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1">
                  <Text className="mb-1 font-medium text-gray-900 dark:text-gray-100">智能手表充电器</Text>
                  <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                    型号：SWC-2023
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-600 dark:text-gray-300">¥120 × 60</Text>
                    <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">¥7,200</Text>
                  </View>
                </View>
              </View>
              <View className="rounded bg-gray-50 p-2 dark:bg-gray-700">
                <Text className="text-xs text-gray-600 dark:text-gray-300">
                  规格：白色 / 磁吸式 / 5W
                </Text>
              </View>
            </View>

            {/* 产品项目3 */}
            <View className="py-4">
              <View className="mb-2 flex-row">
                <View className="mr-3 size-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                  <Image
                    source={{ uri: 'https://via.placeholder.com/64' }}
                    className="size-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1">
                  <Text className="mb-1 font-medium text-gray-900 dark:text-gray-100">智能手表表带</Text>
                  <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                    型号：SWB-2023
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-600 dark:text-gray-300">¥200 × 120</Text>
                    <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">¥24,000</Text>
                  </View>
                </View>
              </View>
              <View className="rounded bg-gray-50 p-2 dark:bg-gray-700">
                <Text className="text-xs text-gray-600 dark:text-gray-300">
                  规格：米兰尼斯表带 / 黑色 / 42mm
                </Text>
              </View>
            </View>

            {/* 订单总计 */}
            <View className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-700">
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm text-gray-600 dark:text-gray-300">商品总额</Text>
                <Text className="text-sm text-gray-900 dark:text-gray-100">¥95,200</Text>
              </View>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm text-gray-600 dark:text-gray-300">运费</Text>
                <Text className="text-sm text-gray-900 dark:text-gray-100">¥0</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-medium text-gray-900 dark:text-gray-100">订单总计</Text>
                <Text className="font-medium text-red-600 dark:text-red-400">¥95,200</Text>
              </View>
            </View>
          </View>
        )}

        {/* 生产进度 */}
        {activeTab === 'production-progress' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 text-base font-medium text-gray-900 dark:text-gray-100">生产进度概览</Text>

            <View className="mb-4">
              <View className="mb-1 flex-row justify-between text-sm">
                <Text className="text-gray-900 dark:text-gray-100">总体进度</Text>
                <Text className="text-gray-900 dark:text-gray-100">65%</Text>
              </View>
              <View className="h-1.5 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
                <View
                  className="h-full rounded bg-blue-600"
                  style={{ width: '65%' }}
                />
              </View>
            </View>

            <View className="mb-4 flex-row">
              <View className="flex-1 items-center">
                <Text className="text-xl font-bold text-green-600 dark:text-green-400">100%</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">原料采购</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-xl font-bold text-blue-600 dark:text-blue-400">75%</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">生产制造</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-xl font-bold text-gray-400">0%</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">质检包装</Text>
              </View>
            </View>

            <Text className="mb-3 text-base font-medium text-gray-900 dark:text-gray-100">生产时间线</Text>

            {/* 时间线项目 */}
            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200 dark:bg-gray-600" />
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">订单确认</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">2023-11-27 14:30</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200 dark:bg-gray-600" />
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">原料采购完成</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">2023-11-29 16:45</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200 dark:bg-gray-600" />
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">生产开始</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">2023-11-30 09:15</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200 dark:bg-gray-600" />
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">智能手表组装中</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">2023-12-02 11:30</Text>
              <Text className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                已完成35台，剩余15台
              </Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-gray-200 dark:bg-gray-600" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200 dark:bg-gray-600" />
              <Text className="text-sm font-medium text-gray-400">
                质量检测
              </Text>
              <Text className="text-xs text-gray-400">预计 2023-12-05</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-gray-200 dark:bg-gray-600" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200 dark:bg-gray-600" />
              <Text className="text-sm font-medium text-gray-400">
                包装完成
              </Text>
              <Text className="text-xs text-gray-400">预计 2023-12-07</Text>
            </View>

            <View className="relative pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-gray-200 dark:bg-gray-600" />
              <Text className="text-sm font-medium text-gray-400">发货</Text>
              <Text className="text-xs text-gray-400">预计 2023-12-08</Text>
            </View>
          </View>
        )}

        {/* 物流信息 */}
        {activeTab === 'logistics-info' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <View className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
              <Text className="mb-2 text-sm text-gray-900 dark:text-gray-100">
                订单尚未发货，预计发货日期：2023-12-08
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                发货后将更新物流信息
              </Text>
            </View>

            <Text className="mb-3 text-base font-medium text-gray-900 dark:text-gray-100">收货信息</Text>

            <View className="mb-4">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">收货人</Text>
              <Text className="text-sm text-gray-900 dark:text-gray-100">张经理</Text>
            </View>

            <View className="mb-4">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">联系电话</Text>
              <Text className="text-sm text-gray-900 dark:text-gray-100">138****5678</Text>
            </View>

            <View className="mb-4">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">收货地址</Text>
              <Text className="text-sm text-gray-900 dark:text-gray-100">
                北京市海淀区中关村科技园区8号楼5层
              </Text>
            </View>

            <View>
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">备注</Text>
              <Text className="text-sm text-gray-900 dark:text-gray-100">请在工作日送货，并提前电话联系</Text>
            </View>
          </View>
        )}

        {/* 付款信息 */}
        {activeTab === 'payment-info' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 text-base font-medium text-gray-900 dark:text-gray-100">付款状态</Text>

            <View className="mb-4 flex-row items-center rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              <FontAwesome
                name="check-circle"
                size={20}
                color="#16a34a"
                style={{ marginRight: 8 }}
              />
              <View>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">已支付定金</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  剩余尾款待发货前支付
                </Text>
              </View>
            </View>

            <View className="mb-4">
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm text-gray-600 dark:text-gray-300">订单总额</Text>
                <Text className="text-sm text-gray-900 dark:text-gray-100">¥95,200</Text>
              </View>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm text-gray-600 dark:text-gray-300">已付定金(30%)</Text>
                <Text className="text-sm text-green-600 dark:text-green-400">¥28,560</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-medium text-gray-900 dark:text-gray-100">待付尾款</Text>
                <Text className="font-medium text-red-600 dark:text-red-400">¥66,640</Text>
              </View>
            </View>

            <Text className="mb-3 text-base font-medium text-gray-900 dark:text-gray-100">付款记录</Text>

            <View className="overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700">
              <View className="flex-row bg-gray-50 p-3 dark:bg-gray-700">
                <Text className="flex-1 text-xs font-medium text-gray-900 dark:text-gray-100">付款时间</Text>
                <Text className="flex-1 text-xs font-medium text-gray-900 dark:text-gray-100">付款金额</Text>
                <Text className="flex-1 text-xs font-medium text-gray-900 dark:text-gray-100">付款方式</Text>
              </View>

              <View className="flex-row border-t border-gray-100 p-3 dark:border-gray-700">
                <Text className="flex-1 text-xs text-gray-900 dark:text-gray-100">2023-11-27</Text>
                <Text className="flex-1 text-xs text-gray-900 dark:text-gray-100">¥28,560</Text>
                <Text className="flex-1 text-xs text-gray-900 dark:text-gray-100">银行转账</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;
