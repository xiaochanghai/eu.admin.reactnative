import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavHeader } from '@/components/ui';

const OrderDetail = () => {
  const [activeTab, setActiveTab] = useState('product-list');

  // 切换选项卡
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <NavHeader
        title="订单详情"
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

      <ScrollView className="flex-1 p-4">
        {/* 订单基本信息 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-start justify-between">
            <Text className="text-lg font-semibold">订单 #2023112702</Text>
            <View className="rounded-full bg-purple-100 px-2 py-1">
              <Text className="text-xs font-medium text-purple-800">
                生产中
              </Text>
            </View>
          </View>

          <View className="mb-4 flex-row flex-wrap">
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">客户</Text>
              <Text className="text-sm font-medium">北京智能科技有限公司</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">联系人</Text>
              <Text className="text-sm font-medium">张经理</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">联系电话</Text>
              <Text className="text-sm font-medium">138****5678</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">订单金额</Text>
              <Text className="text-sm font-medium text-red-600">¥95,200</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">订单日期</Text>
              <Text className="text-sm font-medium">2023-11-27</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">交付日期</Text>
              <Text className="text-sm font-medium">2023-12-10</Text>
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3">
            <Text className="mb-1 text-xs text-gray-500">收货地址</Text>
            <Text className="text-sm">北京市海淀区中关村科技园区8号楼5层</Text>
          </View>
        </View>

        {/* 选项卡 - 分段控制器样式 */}
        <View className="mb-4 flex-row rounded-lg bg-gray-200 p-1">
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'product-list' ? 'bg-white' : ''}`}
            onPress={() => handleTabChange('product-list')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'product-list' ? 'font-medium text-blue-600' : 'text-gray-600'}`}
            >
              产品明细
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
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'logistics-info' ? 'bg-white' : ''}`}
            onPress={() => handleTabChange('logistics-info')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'logistics-info' ? 'font-medium text-blue-600' : 'text-gray-600'}`}
            >
              物流信息
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'payment-info' ? 'bg-white' : ''}`}
            onPress={() => handleTabChange('payment-info')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'payment-info' ? 'font-medium text-blue-600' : 'text-gray-600'}`}
            >
              付款信息
            </Text>
          </TouchableOpacity>
        </View>

        {/* 选项卡内容区域 */}
        {/* 产品明细 */}
        {activeTab === 'product-list' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm">
            {/* 产品项目1 */}
            <View className="border-b border-gray-100 py-4">
              <View className="mb-2 flex-row">
                <View className="mr-3 size-16 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    source={{ uri: 'https://via.placeholder.com/64' }}
                    className="size-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1">
                  <Text className="mb-1 font-medium">智能手表 Pro</Text>
                  <Text className="mb-1 text-xs text-gray-500">
                    型号：SW-2023-Pro
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-600">¥1,280 × 50</Text>
                    <Text className="text-sm font-medium">¥64,000</Text>
                  </View>
                </View>
              </View>
              <View className="rounded bg-gray-50 p-2">
                <Text className="mb-1 text-xs text-gray-600">
                  规格：黑色 / 1.4英寸 / GPS+蜂窝网络
                </Text>
                <Text className="text-xs text-gray-600">
                  备注：包装需使用防震材料，单独包装
                </Text>
              </View>
            </View>

            {/* 产品项目2 */}
            <View className="border-b border-gray-100 py-4">
              <View className="mb-2 flex-row">
                <View className="mr-3 size-16 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    source={{ uri: 'https://via.placeholder.com/64' }}
                    className="size-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1">
                  <Text className="mb-1 font-medium">智能手表充电器</Text>
                  <Text className="mb-1 text-xs text-gray-500">
                    型号：SWC-2023
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-600">¥120 × 60</Text>
                    <Text className="text-sm font-medium">¥7,200</Text>
                  </View>
                </View>
              </View>
              <View className="rounded bg-gray-50 p-2">
                <Text className="text-xs text-gray-600">
                  规格：白色 / 磁吸式 / 5W
                </Text>
              </View>
            </View>

            {/* 产品项目3 */}
            <View className="py-4">
              <View className="mb-2 flex-row">
                <View className="mr-3 size-16 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    source={{ uri: 'https://via.placeholder.com/64' }}
                    className="size-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1">
                  <Text className="mb-1 font-medium">智能手表表带</Text>
                  <Text className="mb-1 text-xs text-gray-500">
                    型号：SWB-2023
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-600">¥200 × 120</Text>
                    <Text className="text-sm font-medium">¥24,000</Text>
                  </View>
                </View>
              </View>
              <View className="rounded bg-gray-50 p-2">
                <Text className="text-xs text-gray-600">
                  规格：米兰尼斯表带 / 黑色 / 42mm
                </Text>
              </View>
            </View>

            {/* 订单总计 */}
            <View className="mt-4 border-t border-gray-100 pt-4">
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm text-gray-600">商品总额</Text>
                <Text className="text-sm">¥95,200</Text>
              </View>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm text-gray-600">运费</Text>
                <Text className="text-sm">¥0</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-medium">订单总计</Text>
                <Text className="font-medium text-red-600">¥95,200</Text>
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
              <View className="h-1.5 overflow-hidden rounded bg-gray-200">
                <View
                  className="h-full rounded bg-blue-600"
                  style={{ width: '65%' }}
                />
              </View>
            </View>

            <View className="mb-4 flex-row">
              <View className="flex-1 items-center">
                <Text className="text-xl font-bold text-green-600">100%</Text>
                <Text className="text-xs text-gray-500">原料采购</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-xl font-bold text-blue-600">75%</Text>
                <Text className="text-xs text-gray-500">生产制造</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-xl font-bold text-gray-400">0%</Text>
                <Text className="text-xs text-gray-500">质检包装</Text>
              </View>
            </View>

            <Text className="mb-3 text-base font-medium">生产时间线</Text>

            {/* 时间线项目 */}
            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium">订单确认</Text>
              <Text className="text-xs text-gray-500">2023-11-27 14:30</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium">原料采购完成</Text>
              <Text className="text-xs text-gray-500">2023-11-29 16:45</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium">生产开始</Text>
              <Text className="text-xs text-gray-500">2023-11-30 09:15</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-blue-600" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium">智能手表组装中</Text>
              <Text className="text-xs text-gray-500">2023-12-02 11:30</Text>
              <Text className="mt-1 text-xs text-blue-600">
                已完成35台，剩余15台
              </Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-gray-200" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium text-gray-400">
                质量检测
              </Text>
              <Text className="text-xs text-gray-400">预计 2023-12-05</Text>
            </View>

            <View className="relative mb-4 pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-gray-200" />
              <View className="absolute bottom-0 left-3 top-3 w-0.5 bg-gray-200" />
              <Text className="text-sm font-medium text-gray-400">
                包装完成
              </Text>
              <Text className="text-xs text-gray-400">预计 2023-12-07</Text>
            </View>

            <View className="relative pl-7">
              <View className="absolute left-2 top-1 size-2.5 rounded-full bg-gray-200" />
              <Text className="text-sm font-medium text-gray-400">发货</Text>
              <Text className="text-xs text-gray-400">预计 2023-12-08</Text>
            </View>
          </View>
        )}

        {/* 物流信息 */}
        {activeTab === 'logistics-info' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm">
            <View className="mb-4 rounded-lg bg-gray-50 p-3">
              <Text className="mb-2 text-sm">
                订单尚未发货，预计发货日期：2023-12-08
              </Text>
              <Text className="text-xs text-gray-500">
                发货后将更新物流信息
              </Text>
            </View>

            <Text className="mb-3 text-base font-medium">收货信息</Text>

            <View className="mb-4">
              <Text className="mb-1 text-xs text-gray-500">收货人</Text>
              <Text className="text-sm">张经理</Text>
            </View>

            <View className="mb-4">
              <Text className="mb-1 text-xs text-gray-500">联系电话</Text>
              <Text className="text-sm">138****5678</Text>
            </View>

            <View className="mb-4">
              <Text className="mb-1 text-xs text-gray-500">收货地址</Text>
              <Text className="text-sm">
                北京市海淀区中关村科技园区8号楼5层
              </Text>
            </View>

            <View>
              <Text className="mb-1 text-xs text-gray-500">备注</Text>
              <Text className="text-sm">请在工作日送货，并提前电话联系</Text>
            </View>
          </View>
        )}

        {/* 付款信息 */}
        {activeTab === 'payment-info' && (
          <View className="rounded-2xl bg-white p-4 shadow-sm">
            <Text className="mb-3 text-base font-medium">付款状态</Text>

            <View className="mb-4 flex-row items-center rounded-lg bg-green-50 p-3">
              <FontAwesome
                name="check-circle"
                size={20}
                color="#16a34a"
                style={{ marginRight: 8 }}
              />
              <View>
                <Text className="text-sm font-medium">已支付定金</Text>
                <Text className="text-xs text-gray-500">
                  剩余尾款待发货前支付
                </Text>
              </View>
            </View>

            <View className="mb-4">
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm text-gray-600">订单总额</Text>
                <Text className="text-sm">¥95,200</Text>
              </View>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm text-gray-600">已付定金(30%)</Text>
                <Text className="text-sm text-green-600">¥28,560</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-medium">待付尾款</Text>
                <Text className="font-medium text-red-600">¥66,640</Text>
              </View>
            </View>

            <Text className="mb-3 text-base font-medium">付款记录</Text>

            <View className="overflow-hidden rounded-lg border border-gray-100">
              <View className="flex-row bg-gray-50 p-3">
                <Text className="flex-1 text-xs font-medium">付款时间</Text>
                <Text className="flex-1 text-xs font-medium">付款金额</Text>
                <Text className="flex-1 text-xs font-medium">付款方式</Text>
              </View>

              <View className="flex-row border-t border-gray-100 p-3">
                <Text className="flex-1 text-xs">2023-11-27</Text>
                <Text className="flex-1 text-xs">¥28,560</Text>
                <Text className="flex-1 text-xs">银行转账</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;
