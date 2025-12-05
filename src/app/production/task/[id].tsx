import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavHeader } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

const ProductionTaskDetail = () => {
  const [activeTab, setActiveTab] = useState('basic-info');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <NavHeader
        title="任务详情"
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
        {/* 任务状态卡片 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
          <View className="mb-3 flex-row items-start justify-between">
            <View>
              <Text className="text-xl font-bold">连衣裙缝制任务</Text>
              <Text className="mt-1 text-sm text-gray-500">
                任务编号: T20230601-02
              </Text>
            </View>
            <View className="flex-row items-center rounded-full bg-orange-100 px-3 py-1">
              <FontAwesome
                name="play-circle"
                size={12}
                color="#9a3412"
                className="mr-1"
              />
              <Text className="text-xs font-semibold text-orange-800">
                进行中
              </Text>
            </View>
          </View>

          <View className="mb-4">
            <View className="mb-1 flex-row justify-between text-sm">
              <Text>任务进度</Text>
              <Text className="font-medium">65%</Text>
            </View>
            <View className="h-2 overflow-hidden rounded-full bg-gray-200">
              <View
                className="h-full rounded-full bg-blue-500"
                style={{ width: '65%' }}
              />
            </View>
          </View>

          <View className="mb-4 flex-row flex-wrap">
            <View className="mb-4 w-1/2">
              <Text className="text-xs text-gray-500">开始时间</Text>
              <Text className="font-medium">2023-06-06 08:00</Text>
            </View>
            <View className="mb-4 w-1/2">
              <Text className="text-xs text-gray-500">预计完成</Text>
              <Text className="font-medium">2023-06-20 17:30</Text>
            </View>
            <View className="mb-4 w-1/2">
              <Text className="text-xs text-gray-500">所属计划</Text>
              <Text className="font-medium">夏季新品连衣裙</Text>
            </View>
            <View className="mb-4 w-1/2">
              <Text className="text-xs text-gray-500">负责人</Text>
              <Text className="font-medium">李工</Text>
            </View>
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg bg-blue-600 py-3">
              <FontAwesome
                name="check-circle"
                size={16}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text className="text-sm font-medium text-white">完成任务</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg bg-gray-100 py-3">
              <FontAwesome
                name="pause-circle"
                size={16}
                color="#4b5563"
                style={{ marginRight: 8 }}
              />
              <Text className="text-sm font-medium text-gray-700">
                暂停任务
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 任务详情选项卡 */}
        <View className="mb-4 flex-row rounded-lg bg-gray-100 p-1">
          <TouchableOpacity
            className={`flex-1 items-center rounded-full px-4 py-2 ${activeTab === 'basic-info' ? 'bg-blue-600' : ''}`}
            onPress={() => setActiveTab('basic-info')}
          >
            <Text
              className={`text-sm font-medium ${activeTab === 'basic-info' ? 'text-white' : 'text-gray-700'}`}
            >
              基本信息
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center rounded-full px-4 py-2 ${activeTab === 'process' ? 'bg-blue-600' : ''}`}
            onPress={() => setActiveTab('process')}
          >
            <Text
              className={`text-sm font-medium ${activeTab === 'process' ? 'text-white' : 'text-gray-700'}`}
            >
              工序进度
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center rounded-full px-4 py-2 ${activeTab === 'resources' ? 'bg-blue-600' : ''}`}
            onPress={() => setActiveTab('resources')}
          >
            <Text
              className={`text-sm font-medium ${activeTab === 'resources' ? 'text-white' : 'text-gray-700'}`}
            >
              相关资源
            </Text>
          </TouchableOpacity>
        </View>

        {/* 基本信息内容 */}
        {activeTab === 'basic-info' && (
          <View className="rounded-2xl bg-white p-5 shadow-sm">
            <Text className="mb-3 text-lg font-semibold">任务详情</Text>

            <View className="mb-4">
              <Text className="mb-1 text-sm text-gray-500">任务描述</Text>
              <Text>
                完成夏季新品连衣裙的缝制工作，包括主体缝合、袖口处理和装饰缝制。需确保缝线平整，接缝牢固，符合质量标准。
              </Text>
            </View>

            <View className="mb-4 flex-row flex-wrap">
              <View className="mb-4 w-1/2">
                <Text className="text-xs text-gray-500">任务类型</Text>
                <Text className="font-medium">缝制加工</Text>
              </View>
              <View className="mb-4 w-1/2">
                <Text className="text-xs text-gray-500">优先级</Text>
                <Text className="font-medium text-orange-600">高</Text>
              </View>
              <View className="mb-4 w-1/2">
                <Text className="text-xs text-gray-500">计划产量</Text>
                <Text className="font-medium">2,500件</Text>
              </View>
              <View className="mb-4 w-1/2">
                <Text className="text-xs text-gray-500">已完成</Text>
                <Text className="font-medium">1,625件</Text>
              </View>
            </View>

            <View className="mb-4">
              <Text className="mb-1 text-sm text-gray-500">质量要求</Text>
              <View className="ml-5">
                <View className="mb-1 flex-row">
                  <View className="mr-2 mt-1.5 size-2 rounded-full bg-gray-400" />
                  <Text>缝线平整，无跳线、断线</Text>
                </View>
                <View className="mb-1 flex-row">
                  <View className="mr-2 mt-1.5 size-2 rounded-full bg-gray-400" />
                  <Text>接缝牢固，无开线现象</Text>
                </View>
                <View className="mb-1 flex-row">
                  <View className="mr-2 mt-1.5 size-2 rounded-full bg-gray-400" />
                  <Text>装饰部分对称美观</Text>
                </View>
                <View className="flex-row">
                  <View className="mr-2 mt-1.5 size-2 rounded-full bg-gray-400" />
                  <Text>符合尺寸规格要求</Text>
                </View>
              </View>
            </View>

            <View>
              <Text className="mb-1 text-sm text-gray-500">备注</Text>
              <Text>本批次为紧急订单，需优先安排生产，确保按时交付。</Text>
            </View>
          </View>
        )}

        {/* 工序进度内容 */}
        {activeTab === 'process' && (
          <View>
            <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
              <Text className="mb-3 text-lg font-semibold">工序流程</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="py-2"
              >
                <View className="flex-row items-center">
                  <View className="items-center">
                    <View className="w-15 h-15 items-center justify-center rounded-full bg-green-100">
                      <FontAwesome name="cut" size={24} color="#059669" />
                      <View className="absolute right-0 top-0 size-5 items-center justify-center rounded-full bg-green-500">
                        <FontAwesome name="check" size={10} color="white" />
                      </View>
                    </View>
                    <Text className="mt-2 text-xs font-medium">裁剪</Text>
                  </View>

                  <View className="mx-1 h-1 w-10 bg-green-500" />

                  <View className="items-center">
                    <View className="w-15 h-15 items-center justify-center rounded-full bg-blue-100">
                      <FontAwesome name="tshirt" size={24} color="#2563eb" />
                      <View className="absolute right-0 top-0 size-5 items-center justify-center rounded-full bg-blue-500">
                        <FontAwesome name="sync-alt" size={10} color="white" />
                      </View>
                    </View>
                    <Text className="mt-2 text-xs font-medium">缝制</Text>
                  </View>

                  <View className="mx-1 h-1 w-10 bg-gray-300" />

                  <View className="items-center">
                    <View className="w-15 h-15 items-center justify-center rounded-full bg-gray-100">
                      <FontAwesome
                        name="paint-brush"
                        size={24}
                        color="#6b7280"
                      />
                    </View>
                    <Text className="mt-2 text-xs font-medium">装饰</Text>
                  </View>

                  <View className="mx-1 h-1 w-10 bg-gray-300" />

                  <View className="items-center">
                    <View className="w-15 h-15 items-center justify-center rounded-full bg-gray-100">
                      <FontAwesome name="search" size={24} color="#6b7280" />
                    </View>
                    <Text className="mt-2 text-xs font-medium">质检</Text>
                  </View>

                  <View className="mx-1 h-1 w-10 bg-gray-300" />

                  <View className="items-center">
                    <View className="w-15 h-15 items-center justify-center rounded-full bg-gray-100">
                      <FontAwesome name="tags" size={24} color="#6b7280" />
                    </View>
                    <Text className="mt-2 text-xs font-medium">包装</Text>
                  </View>
                </View>
              </ScrollView>
            </View>

            <View className="rounded-2xl bg-white p-5 shadow-sm">
              <Text className="mb-3 text-lg font-semibold">任务日志</Text>

              <View className="pl-7">
                <View className="relative mb-6">
                  <View className="absolute left-0 top-0 -ml-7 mt-1 size-4 rounded-full bg-blue-600" />
                  <View className="absolute left-0 top-4 -ml-5 h-full w-0.5 bg-gray-200" />
                  <Text className="mb-1 text-xs text-gray-500">
                    2023-06-15 14:30
                  </Text>
                  <View className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                    <Text className="font-medium">生产进度更新</Text>
                    <Text className="text-sm">已完成1,625件，完成率65%</Text>
                    <Text className="mt-1 text-xs text-gray-500">
                      操作人: 李工
                    </Text>
                  </View>
                </View>

                <View className="relative mb-6">
                  <View className="absolute left-0 top-0 -ml-7 mt-1 size-4 rounded-full bg-blue-600" />
                  <View className="absolute left-0 top-4 -ml-5 h-full w-0.5 bg-gray-200" />
                  <Text className="mb-1 text-xs text-gray-500">
                    2023-06-10 09:15
                  </Text>
                  <View className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                    <Text className="font-medium">质量检查</Text>
                    <Text className="text-sm">抽检100件，合格率98%</Text>
                    <Text className="mt-1 text-xs text-gray-500">
                      操作人: 王质检
                    </Text>
                  </View>
                </View>

                <View className="relative">
                  <View className="absolute left-0 top-0 -ml-7 mt-1 size-4 rounded-full bg-blue-600" />
                  <Text className="mb-1 text-xs text-gray-500">
                    2023-06-06 08:00
                  </Text>
                  <View className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                    <Text className="font-medium">任务开始</Text>
                    <Text className="text-sm">开始连衣裙缝制任务</Text>
                    <Text className="mt-1 text-xs text-gray-500">
                      操作人: 李工
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* 相关资源内容 */}
        {activeTab === 'resources' && (
          <View>
            <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
              <Text className="mb-3 text-lg font-semibold">使用设备</Text>

              <View className="mb-3 flex-row items-center rounded-lg bg-gray-50 p-3">
                <View className="mr-3 size-10 items-center justify-center rounded-full bg-blue-100">
                  <FontAwesome name="cogs" size={20} color="#2563eb" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium">工业缝纫机</Text>
                  <Text className="text-xs text-gray-500">
                    设备编号: EQ-2023-056
                  </Text>
                </View>
                <View className="rounded-full bg-green-100 px-2 py-1">
                  <Text className="text-xs text-green-800">正常运行</Text>
                </View>
              </View>

              <View className="flex-row items-center rounded-lg bg-gray-50 p-3">
                <View className="mr-3 size-10 items-center justify-center rounded-full bg-blue-100">
                  <FontAwesome name="cogs" size={20} color="#2563eb" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium">锁边机</Text>
                  <Text className="text-xs text-gray-500">
                    设备编号: EQ-2023-078
                  </Text>
                </View>
                <View className="rounded-full bg-green-100 px-2 py-1">
                  <Text className="text-xs text-green-800">正常运行</Text>
                </View>
              </View>
            </View>

            <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
              <Text className="mb-3 text-lg font-semibold">材料清单</Text>

              <View className="mb-3 flex-row items-center rounded-lg bg-gray-50 p-3">
                <View className="mr-3 size-10 items-center justify-center rounded-full bg-amber-100">
                  <FontAwesome name="box" size={20} color="#d97706" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium">面料</Text>
                  <Text className="text-xs text-gray-500">
                    库存编号: M-2023-102
                  </Text>
                </View>
                <View className="rounded-full bg-green-100 px-2 py-1">
                  <Text className="text-xs text-green-800">充足</Text>
                </View>
              </View>

              <View className="flex-row items-center rounded-lg bg-gray-50 p-3">
                <View className="mr-3 size-10 items-center justify-center rounded-full bg-amber-100">
                  <FontAwesome name="box" size={20} color="#d97706" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium">缝线</Text>
                  <Text className="text-xs text-gray-500">
                    库存编号: M-2023-156
                  </Text>
                </View>
                <View className="rounded-full bg-yellow-100 px-2 py-1">
                  <Text className="text-xs text-yellow-800">偏低</Text>
                </View>
              </View>
            </View>

            <View className="rounded-2xl bg-white p-5 shadow-sm">
              <Text className="mb-3 text-lg font-semibold">相关文档</Text>

              <View className="mb-3 flex-row items-center rounded-lg bg-gray-50 p-3">
                <View className="mr-3 size-10 items-center justify-center rounded-full bg-indigo-100">
                  <FontAwesome name="file-alt" size={20} color="#4f46e5" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium">工艺说明书</Text>
                  <Text className="text-xs text-gray-500">PDF文档 · 2.5MB</Text>
                </View>
                <TouchableOpacity>
                  <FontAwesome name="download" size={18} color="#2563eb" />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center rounded-lg bg-gray-50 p-3">
                <View className="mr-3 size-10 items-center justify-center rounded-full bg-indigo-100">
                  <FontAwesome name="file-image" size={20} color="#4f46e5" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium">款式图</Text>
                  <Text className="text-xs text-gray-500">JPG图片 · 1.8MB</Text>
                </View>
                <TouchableOpacity>
                  <FontAwesome name="download" size={18} color="#2563eb" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      {/* 底部操作按钮 */}
      <View className="absolute inset-x-4 bottom-5 flex-row space-x-3">
        <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg bg-gray-100 py-3">
          <FontAwesome
            name="comment-alt"
            size={16}
            color="#4b5563"
            style={{ marginRight: 8 }}
          />
          <Text className="text-sm font-medium text-gray-700">添加备注</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg bg-red-50 py-3">
          <FontAwesome
            name="exclamation-triangle"
            size={16}
            color="#ef4444"
            style={{ marginRight: 8 }}
          />
          <Text className="text-sm font-medium text-red-600">报告问题</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductionTaskDetail;
