import React, { useState } from 'react';
import {

  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView, NavHeader } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
const QualityDetail = () => {
  const [activeTab, setActiveTab] = useState(0);

  // 选项卡内容
  const tabs = ['检验结果', '不良品分析', '操作记录', '检验标准'];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <NavHeader title="质量详情" />

      <ScrollView className="flex-1 p-4">
        {/* 质检任务基本信息 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-start justify-between">
            <Text className="text-lg font-semibold">智能手表主板质检</Text>
            <View className="rounded-full bg-blue-100 px-2 py-1">
              <Text className="text-xs font-medium text-blue-800">进行中</Text>
            </View>
          </View>

          <Text className="mb-3 text-sm text-gray-600">
            任务编号：QC20231128-01
          </Text>

          <View className="mb-3 grid grid-cols-2 gap-4">
            <View>
              <Text className="mb-1 text-xs text-gray-500">负责人</Text>
              <Text className="font-medium">王质检</Text>
            </View>
            <View>
              <Text className="mb-1 text-xs text-gray-500">截止日期</Text>
              <Text className="font-medium">2023-12-05</Text>
            </View>
            <View>
              <Text className="mb-1 text-xs text-gray-500">关联产品</Text>
              <Text className="font-medium">智能手表 SW-2023</Text>
            </View>
            <View>
              <Text className="mb-1 text-xs text-gray-500">批次号</Text>
              <Text className="font-medium">BT20231201-A</Text>
            </View>
          </View>

          <View className="mb-3">
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-sm">完成进度</Text>
              <Text className="font-medium">65%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded-sm bg-gray-200">
              <View
                className="h-full rounded-sm bg-blue-500"
                style={{ width: '65%' }}
              />
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3">
            <View className="flex-row items-start">
              <FontAwesome
                name="info-circle"
                size={16}
                color="#0066ff"
                style={{ marginTop: 2, marginRight: 8 }}
              />
              <View>
                <Text className="mb-1 text-sm font-medium">检验说明</Text>
                <Text className="text-xs text-gray-700">
                  本次质检针对智能手表主板进行全面检测，包括电路连通性、元器件焊接质量、功能测试等。
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 检验选项卡 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row space-x-2 pb-2">
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveTab(index)}
                className={`rounded-full px-4 py-2 ${activeTab === index ? 'bg-blue-600' : ''}`}
              >
                <Text
                  className={`whitespace-nowrap text-sm font-medium ${activeTab === index ? 'text-white' : 'text-gray-600'}`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 检验结果 */}
        {activeTab === 0 && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <Text className="mb-3 font-medium">检验结果统计</Text>

            <View className="mb-4 flex-row justify-between">
              <View className="items-center">
                <Text className="text-xl font-bold text-blue-600">650</Text>
                <Text className="text-xs text-gray-500">已检测</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-bold text-green-600">637</Text>
                <Text className="text-xs text-gray-500">合格</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-bold text-red-600">13</Text>
                <Text className="text-xs text-gray-500">不合格</Text>
              </View>
            </View>

            <View className="mb-3">
              <View className="mb-1 flex-row items-center justify-between">
                <Text className="text-sm">合格率</Text>
                <Text className="font-medium text-green-600">98.0%</Text>
              </View>
              <View className="h-1.5 overflow-hidden rounded-sm bg-gray-200">
                <View
                  className="h-full rounded-sm bg-green-500"
                  style={{ width: '98%' }}
                />
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View className="flex-row bg-gray-50">
                  <Text className="w-24 px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                    检验项目
                  </Text>
                  <Text className="w-20 px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                    标准值
                  </Text>
                  <Text className="w-20 px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                    合格率
                  </Text>
                  <Text className="w-20 px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                    状态
                  </Text>
                </View>

                <View className="border-b border-gray-200">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm">电路连通性</Text>
                    <Text className="w-20 px-2 py-3 text-sm">100%</Text>
                    <Text className="w-20 px-2 py-3 text-sm">99.5%</Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-green-100 px-2 py-0.5">
                        <Text className="text-xs text-green-800">合格</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="border-b border-gray-200">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm">元器件焊接</Text>
                    <Text className="w-20 px-2 py-3 text-sm">≥98%</Text>
                    <Text className="w-20 px-2 py-3 text-sm">97.2%</Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-red-100 px-2 py-0.5">
                        <Text className="text-xs text-red-800">不合格</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="border-b border-gray-200">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm">功能测试</Text>
                    <Text className="w-20 px-2 py-3 text-sm">≥99%</Text>
                    <Text className="w-20 px-2 py-3 text-sm">99.1%</Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-green-100 px-2 py-0.5">
                        <Text className="text-xs text-green-800">合格</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="border-b border-gray-200">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm">外观检查</Text>
                    <Text className="w-20 px-2 py-3 text-sm">≥95%</Text>
                    <Text className="w-20 px-2 py-3 text-sm">98.3%</Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-green-100 px-2 py-0.5">
                        <Text className="text-xs text-green-800">合格</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        {/* 不良品分析 */}
        {activeTab === 1 && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <Text className="mb-3 font-medium">不良品分析</Text>

            <View className="mb-4 flex-row items-center">
              <View className="h-24 w-1/3 items-center justify-center rounded-lg bg-red-50">
                <Text className="text-xl font-bold text-red-600">2.0%</Text>
                <Text className="text-xs text-gray-500">不良品率</Text>
              </View>
              <View className="w-2/3 pl-4">
                <Text className="mb-2 text-sm">主要不良原因：</Text>
                <View className="mb-1 flex-row items-center">
                  <View className="mr-2 size-2 rounded-full bg-red-500" />
                  <Text className="mr-2 text-xs text-gray-600">焊接不良</Text>
                  <Text className="text-xs font-medium">61.5%</Text>
                </View>
                <View className="mb-1 flex-row items-center">
                  <View className="mr-2 size-2 rounded-full bg-orange-500" />
                  <Text className="mr-2 text-xs text-gray-600">元器件损坏</Text>
                  <Text className="text-xs font-medium">23.1%</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="mr-2 size-2 rounded-full bg-yellow-500" />
                  <Text className="mr-2 text-xs text-gray-600">电路异常</Text>
                  <Text className="text-xs font-medium">15.4%</Text>
                </View>
              </View>
            </View>

            <View className="mb-3">
              <Text className="mb-2 text-sm font-medium">不良品标签</Text>
              <View className="flex-row flex-wrap">
                <View className="mb-2 mr-2 rounded bg-red-100 px-2 py-1">
                  <Text className="text-xs text-red-800">虚焊</Text>
                </View>
                <View className="mb-2 mr-2 rounded bg-red-100 px-2 py-1">
                  <Text className="text-xs text-red-800">焊接过热</Text>
                </View>
                <View className="mb-2 mr-2 rounded bg-orange-100 px-2 py-1">
                  <Text className="text-xs text-orange-800">电容损坏</Text>
                </View>
                <View className="mb-2 mr-2 rounded bg-orange-100 px-2 py-1">
                  <Text className="text-xs text-orange-800">电阻偏差</Text>
                </View>
                <View className="mb-2 mr-2 rounded bg-yellow-100 px-2 py-1">
                  <Text className="text-xs text-yellow-800">短路</Text>
                </View>
                <View className="mb-2 mr-2 rounded bg-yellow-100 px-2 py-1">
                  <Text className="text-xs text-yellow-800">开路</Text>
                </View>
              </View>
            </View>

            <View className="rounded-lg bg-yellow-50 p-3">
              <View className="flex-row items-start">
                <FontAwesome
                  name="exclamation-triangle"
                  size={16}
                  color="#ca8a04"
                  style={{ marginTop: 2, marginRight: 8 }}
                />
                <View>
                  <Text className="mb-1 text-sm font-medium">改进建议</Text>
                  <Text className="text-xs text-gray-700">
                    1. 调整焊接温度参数，避免虚焊和过热问题
                  </Text>
                  <Text className="text-xs text-gray-700">
                    2. 加强元器件进料检验，提高元器件质量
                  </Text>
                  <Text className="text-xs text-gray-700">
                    3. 优化电路设计，增强抗干扰能力
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* 操作记录 */}
        {activeTab === 2 && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <Text className="mb-3 font-medium">操作记录</Text>

            <View className="border-b border-gray-100 py-4">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="play-circle"
                    size={16}
                    color="#0066ff"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="font-medium">开始检验</Text>
                </View>
                <Text className="text-xs text-gray-500">2023-12-01 09:30</Text>
              </View>
              <Text className="ml-6 text-sm text-gray-600">
                王质检开始对批次BT20231201-A进行质量检验
              </Text>
            </View>

            <View className="border-b border-gray-100 py-4">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="exclamation-circle"
                    size={16}
                    color="#dc2626"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="font-medium">发现不良品</Text>
                </View>
                <Text className="text-xs text-gray-500">2023-12-01 11:45</Text>
              </View>
              <Text className="ml-6 text-sm text-gray-600">
                发现5件焊接不良产品，已标记并隔离
              </Text>
            </View>

            <View className="border-b border-gray-100 py-4">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="pause-circle"
                    size={16}
                    color="#ea580c"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="font-medium">暂停检验</Text>
                </View>
                <Text className="text-xs text-gray-500">2023-12-01 12:30</Text>
              </View>
              <Text className="ml-6 text-sm text-gray-600">午休暂停检验</Text>
            </View>

            <View className="border-b border-gray-100 py-4">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="play-circle"
                    size={16}
                    color="#0066ff"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="font-medium">继续检验</Text>
                </View>
                <Text className="text-xs text-gray-500">2023-12-01 13:30</Text>
              </View>
              <Text className="ml-6 text-sm text-gray-600">
                继续对批次BT20231201-A进行质量检验
              </Text>
            </View>

            <View className="py-4">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="file-alt"
                    size={16}
                    color="#16a34a"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="font-medium">生成中期报告</Text>
                </View>
                <Text className="text-xs text-gray-500">2023-12-02 17:00</Text>
              </View>
              <Text className="ml-6 text-sm text-gray-600">
                生成检验中期报告，当前合格率98.0%
              </Text>
            </View>
          </View>
        )}

        {/* 检验标准 */}
        {activeTab === 3 && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <Text className="mb-3 font-medium">检验标准</Text>

            <View className="mb-3">
              <Text className="mb-1 text-sm font-medium">参考标准</Text>
              <Text className="text-sm text-gray-700">IPC-A-610G 3级标准</Text>
            </View>

            <View className="mb-3">
              <Text className="mb-1 text-sm font-medium">检验项目</Text>
              <View className="mb-2 flex-row flex-wrap gap-2">
                <View className="rounded bg-gray-100 px-2 py-1">
                  <Text className="text-xs text-gray-800">电路连通性</Text>
                </View>
                <View className="rounded bg-gray-100 px-2 py-1">
                  <Text className="text-xs text-gray-800">元器件焊接</Text>
                </View>
                <View className="rounded bg-gray-100 px-2 py-1">
                  <Text className="text-xs text-gray-800">功能测试</Text>
                </View>
                <View className="rounded bg-gray-100 px-2 py-1">
                  <Text className="text-xs text-gray-800">外观检查</Text>
                </View>
              </View>
            </View>

            <View className="mb-3">
              <Text className="mb-1 text-sm font-medium">抽样方案</Text>
              <Text className="text-sm text-gray-700">
                GB/T 2828.1-2012 正常检验 II 级
              </Text>
            </View>

            <View className="mb-3">
              <Text className="mb-1 text-sm font-medium">合格判定</Text>
              <Text className="text-sm text-gray-700">
                AQL=1.0，批量1000pcs，抽检数量80pcs，接收数2，拒收数3
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 底部操作按钮 */}
      <View className="absolute inset-x-4 bottom-4">
        <View className="flex-row space-x-3">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg border border-gray-300 bg-white py-3">
            <FontAwesome
              name="file-export"
              size={16}
              color="#4b5563"
              style={{ marginRight: 8 }}
            />
            <Text className="text-sm font-medium text-gray-700">导出报告</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg bg-blue-600 py-3">
            <FontAwesome
              name="check-circle"
              size={16}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text className="text-sm font-medium text-white">完成检验</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QualityDetail;
