import React, { useState } from 'react';
import {

  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView, NavHeader } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

const QualityDetail = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { isDark } = useAppColorScheme();

  // 选项卡内容
  const tabs = ['检验结果', '不良品分析', '操作记录', '检验标准'];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <NavHeader title="质量详情" />

      <ScrollView className="flex-1 p-4">
        {/* 质检任务基本信息 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-3 flex-row items-start justify-between">
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">智能手表主板质检</Text>
            <View className="rounded-full bg-blue-100 px-2 py-1 dark:bg-blue-900/30">
              <Text className="text-xs font-medium text-blue-800 dark:text-blue-300">进行中</Text>
            </View>
          </View>

          <Text className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            任务编号：QC20231128-01
          </Text>

          <View className="mb-3 grid grid-cols-2 gap-4">
            <View>
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">负责人</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">王质检</Text>
            </View>
            <View>
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">截止日期</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">2023-12-05</Text>
            </View>
            <View>
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">关联产品</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">智能手表 SW-2023</Text>
            </View>
            <View>
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">批次号</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">BT20231201-A</Text>
            </View>
          </View>

          <View className="mb-3">
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-sm text-gray-900 dark:text-gray-100">完成进度</Text>
              <Text className="font-medium text-gray-900 dark:text-gray-100">65%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-700">
              <View
                className="h-full rounded-sm bg-blue-500"
                style={{ width: '65%' }}
              />
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <View className="flex-row items-start">
              <FontAwesome
                name="info-circle"
                size={16}
                color={isDark ? '#60a5fa' : '#0066ff'}
                style={{ marginTop: 2, marginRight: 8 }}
              />
              <View>
                <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">检验说明</Text>
                <Text className="text-xs text-gray-700 dark:text-gray-300">
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
                className={`rounded-full px-4 py-2 ${activeTab === index ? 'bg-blue-600' : 'bg-white dark:bg-gray-800'}`}
              >
                <Text
                  className={`whitespace-nowrap text-sm font-medium ${activeTab === index ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 检验结果 */}
        {activeTab === 0 && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">检验结果统计</Text>

            <View className="mb-4 flex-row justify-between">
              <View className="items-center">
                <Text className="text-xl font-bold text-blue-600 dark:text-blue-400">650</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">已检测</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-bold text-green-600 dark:text-green-400">637</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">合格</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-bold text-red-600 dark:text-red-400">13</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">不合格</Text>
              </View>
            </View>

            <View className="mb-3">
              <View className="mb-1 flex-row items-center justify-between">
                <Text className="text-sm text-gray-900 dark:text-gray-100">合格率</Text>
                <Text className="font-medium text-green-600 dark:text-green-400">98.0%</Text>
              </View>
              <View className="h-1.5 overflow-hidden rounded-sm bg-gray-200 dark:bg-gray-700">
                <View
                  className="h-full rounded-sm bg-green-500"
                  style={{ width: '98%' }}
                />
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View className="flex-row bg-gray-50 dark:bg-gray-700">
                  <Text className="w-24 px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    检验项目
                  </Text>
                  <Text className="w-20 px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    标准值
                  </Text>
                  <Text className="w-20 px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    合格率
                  </Text>
                  <Text className="w-20 px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    状态
                  </Text>
                </View>

                <View className="border-b border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">电路连通性</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">100%</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">99.5%</Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-green-100 px-2 py-0.5 dark:bg-green-900/30">
                        <Text className="text-xs text-green-800 dark:text-green-300">合格</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="border-b border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">元器件焊接</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">≥98%</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">97.2%</Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-red-100 px-2 py-0.5 dark:bg-red-900/30">
                        <Text className="text-xs text-red-800 dark:text-red-300">不合格</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="border-b border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">功能测试</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">≥99%</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">99.1%</Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-green-100 px-2 py-0.5 dark:bg-green-900/30">
                        <Text className="text-xs text-green-800 dark:text-green-300">合格</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="border-b border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">外观检查</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">≥95%</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">98.3%</Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-green-100 px-2 py-0.5 dark:bg-green-900/30">
                        <Text className="text-xs text-green-800 dark:text-green-300">合格</Text>
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
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">不良品分析</Text>

            <View className="mb-4 flex-row items-center">
              <View className="h-24 w-1/3 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20">
                <Text className="text-xl font-bold text-red-600 dark:text-red-400">2.0%</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">不良品率</Text>
              </View>
              <View className="w-2/3 pl-4">
                <Text className="mb-2 text-sm text-gray-900 dark:text-gray-100">主要不良原因：</Text>
                <View className="mb-1 flex-row items-center">
                  <View className="mr-2 size-2 rounded-full bg-red-500" />
                  <Text className="mr-2 text-xs text-gray-600 dark:text-gray-400">焊接不良</Text>
                  <Text className="text-xs font-medium text-gray-900 dark:text-gray-100">61.5%</Text>
                </View>
                <View className="mb-1 flex-row items-center">
                  <View className="mr-2 size-2 rounded-full bg-orange-500" />
                  <Text className="mr-2 text-xs text-gray-600 dark:text-gray-400">元器件损坏</Text>
                  <Text className="text-xs font-medium text-gray-900 dark:text-gray-100">23.1%</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="mr-2 size-2 rounded-full bg-yellow-500" />
                  <Text className="mr-2 text-xs text-gray-600 dark:text-gray-400">电路异常</Text>
                  <Text className="text-xs font-medium text-gray-900 dark:text-gray-100">15.4%</Text>
                </View>
              </View>
            </View>

            <View className="mb-3">
              <Text className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">不良品标签</Text>
              <View className="flex-row flex-wrap">
                <View className="mb-2 mr-2 rounded bg-red-100 px-2 py-1 dark:bg-red-900/30">
                  <Text className="text-xs text-red-800 dark:text-red-300">虚焊</Text>
                </View>
                <View className="mb-2 mr-2 rounded bg-red-100 px-2 py-1 dark:bg-red-900/30">
                  <Text className="text-xs text-red-800 dark:text-red-300">焊接过热</Text>
                </View>
                <View className="mb-2 mr-2 rounded bg-orange-100 px-2 py-1 dark:bg-orange-900/30">
                  <Text className="text-xs text-orange-800 dark:text-orange-300">电容损坏</Text>
                </View>
                <View className="mb-2 mr-2 rounded bg-orange-100 px-2 py-1 dark:bg-orange-900/30">
                  <Text className="text-xs text-orange-800 dark:text-orange-300">电阻偏差</Text>
                </View>
                <View className="mb-2 mr-2 rounded bg-yellow-100 px-2 py-1 dark:bg-yellow-900/30">
                  <Text className="text-xs text-yellow-800 dark:text-yellow-300">短路</Text>
                </View>
                <View className="mb-2 mr-2 rounded bg-yellow-100 px-2 py-1 dark:bg-yellow-900/30">
                  <Text className="text-xs text-yellow-800 dark:text-yellow-300">开路</Text>
                </View>
              </View>
            </View>

            <View className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
              <View className="flex-row items-start">
                <FontAwesome
                  name="exclamation-triangle"
                  size={16}
                  color={isDark ? '#fbbf24' : '#ca8a04'}
                  style={{ marginTop: 2, marginRight: 8 }}
                />
                <View>
                  <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">改进建议</Text>
                  <Text className="text-xs text-gray-700 dark:text-gray-300">
                    1. 调整焊接温度参数，避免虚焊和过热问题
                  </Text>
                  <Text className="text-xs text-gray-700 dark:text-gray-300">
                    2. 加强元器件进料检验，提高元器件质量
                  </Text>
                  <Text className="text-xs text-gray-700 dark:text-gray-300">
                    3. 优化电路设计，增强抗干扰能力
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* 操作记录 */}
        {activeTab === 2 && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">操作记录</Text>

            <View className="border-b border-gray-100 py-4 dark:border-gray-700">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="play-circle"
                    size={16}
                    color={isDark ? '#60a5fa' : '#0066ff'}
                    style={{ marginRight: 8 }}
                  />
                  <Text className="font-medium text-gray-900 dark:text-gray-100">开始检验</Text>
                </View>
                <Text className="text-xs text-gray-500 dark:text-gray-400">2023-12-01 09:30</Text>
              </View>
              <Text className="ml-6 text-sm text-gray-600 dark:text-gray-400">
                王质检开始对批次BT20231201-A进行质量检验
              </Text>
            </View>

            <View className="border-b border-gray-100 py-4 dark:border-gray-700">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="exclamation-circle"
                    size={16}
                    color={isDark ? '#f87171' : '#dc2626'}
                    style={{ marginRight: 8 }}
                  />
                  <Text className="font-medium text-gray-900 dark:text-gray-100">发现不良品</Text>
                </View>
                <Text className="text-xs text-gray-500 dark:text-gray-400">2023-12-01 11:45</Text>
              </View>
              <Text className="ml-6 text-sm text-gray-600 dark:text-gray-400">
                发现5件焊接不良产品，已标记并隔离
              </Text>
            </View>

            <View className="border-b border-gray-100 py-4 dark:border-gray-700">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="pause-circle"
                    size={16}
                    color={isDark ? '#fb923c' : '#ea580c'}
                    style={{ marginRight: 8 }}
                  />
                  <Text className="font-medium text-gray-900 dark:text-gray-100">暂停检验</Text>
                </View>
                <Text className="text-xs text-gray-500 dark:text-gray-400">2023-12-01 12:30</Text>
              </View>
              <Text className="ml-6 text-sm text-gray-600 dark:text-gray-400">午休暂停检验</Text>
            </View>

            <View className="border-b border-gray-100 py-4 dark:border-gray-700">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="play-circle"
                    size={16}
                    color={isDark ? '#60a5fa' : '#0066ff'}
                    style={{ marginRight: 8 }}
                  />
                  <Text className="font-medium text-gray-900 dark:text-gray-100">继续检验</Text>
                </View>
                <Text className="text-xs text-gray-500 dark:text-gray-400">2023-12-01 13:30</Text>
              </View>
              <Text className="ml-6 text-sm text-gray-600 dark:text-gray-400">
                继续对批次BT20231201-A进行质量检验
              </Text>
            </View>

            <View className="py-4">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="file-alt"
                    size={16}
                    color={isDark ? '#4ade80' : '#16a34a'}
                    style={{ marginRight: 8 }}
                  />
                  <Text className="font-medium text-gray-900 dark:text-gray-100">生成中期报告</Text>
                </View>
                <Text className="text-xs text-gray-500 dark:text-gray-400">2023-12-02 17:00</Text>
              </View>
              <Text className="ml-6 text-sm text-gray-600 dark:text-gray-400">
                生成检验中期报告，当前合格率98.0%
              </Text>
            </View>
          </View>
        )}

        {/* 检验标准 */}
        {activeTab === 3 && (
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">检验标准</Text>

            <View className="mb-3">
              <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">参考标准</Text>
              <Text className="text-sm text-gray-700 dark:text-gray-300">IPC-A-610G 3级标准</Text>
            </View>

            <View className="mb-3">
              <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">检验项目</Text>
              <View className="mb-2 flex-row flex-wrap gap-2">
                <View className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
                  <Text className="text-xs text-gray-800 dark:text-gray-300">电路连通性</Text>
                </View>
                <View className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
                  <Text className="text-xs text-gray-800 dark:text-gray-300">元器件焊接</Text>
                </View>
                <View className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
                  <Text className="text-xs text-gray-800 dark:text-gray-300">功能测试</Text>
                </View>
                <View className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
                  <Text className="text-xs text-gray-800 dark:text-gray-300">外观检查</Text>
                </View>
              </View>
            </View>

            <View className="mb-3">
              <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">抽样方案</Text>
              <Text className="text-sm text-gray-700 dark:text-gray-300">
                GB/T 2828.1-2012 正常检验 II 级
              </Text>
            </View>

            <View className="mb-3">
              <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">合格判定</Text>
              <Text className="text-sm text-gray-700 dark:text-gray-300">
                AQL=1.0，批量1000pcs，抽检数量80pcs，接收数2，拒收数3
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 底部操作按钮 */}
      <View className="absolute inset-x-4 bottom-4">
        <View className="flex-row space-x-3">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-lg border border-gray-300 bg-white py-3 dark:border-gray-600 dark:bg-gray-800">
            <FontAwesome
              name="file-export"
              size={16}
              color={isDark ? '#9ca3af' : '#4b5563'}
              style={{ marginRight: 8 }}
            />
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">导出报告</Text>
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
