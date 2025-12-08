import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { NavHeader, ScrollView, Text, View, SafeAreaView } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

const EquipmentDetail = () => {
  const [activeTab, setActiveTab] = useState('running-data');
  const { isDark } = useAppColorScheme();

  // 切换选项卡
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <NavHeader title="设备明细" />
      <ScrollView className="flex-1 p-4">
        {/* 设备基本信息卡片 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-3 flex-row items-start justify-between">
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">贴片机 #SMT-2023-01</Text>
            <View className="rounded-full bg-green-100 px-2 py-1 dark:bg-green-900/30">
              <Text className="text-xs font-medium text-green-800 dark:text-green-300">运行中</Text>
            </View>
          </View>

          <View className="mb-4 flex-row flex-wrap">
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">负责人</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">张工程师</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">位置</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">生产车间A区</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">品牌型号</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">松下 NPM-W2</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">购入日期</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">2022-05-15</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">运行状态</Text>
              <Text className="text-sm font-medium text-green-600 dark:text-green-400">正常</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">今日产能</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">850件</Text>
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <View className="flex-row items-center">
              <FontAwesome
                name="bell"
                size={16}
                color={isDark ? '#60a5fa' : '#3b82f6'}
                className="mr-2"
              />
              <View>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">设备警报</Text>
                <Text className="text-sm text-gray-700 dark:text-gray-300">无异常警报</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 选项卡 - 分段控制器样式 */}
        <View className="mb-10 flex-row rounded-lg bg-gray-200 p-1 dark:bg-gray-700">
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'running-data' ? 'bg-white dark:bg-gray-600' : ''}`}
            onPress={() => handleTabChange('running-data')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'running-data' ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              运行数据
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'maintenance-records' ? 'bg-white dark:bg-gray-600' : ''}`}
            onPress={() => handleTabChange('maintenance-records')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'maintenance-records' ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              维护记录
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'performance-params' ? 'bg-white dark:bg-gray-600' : ''}`}
            onPress={() => handleTabChange('performance-params')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'performance-params' ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              性能参数
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 rounded-md px-3 py-2 ${activeTab === 'fault-records' ? 'bg-white dark:bg-gray-600' : ''}`}
            onPress={() => handleTabChange('fault-records')}
          >
            <Text
              className={`text-center text-sm ${activeTab === 'fault-records' ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            >
              故障记录
            </Text>
          </TouchableOpacity>
        </View>

        {/* 选项卡内容区域 */}
        {/* 运行数据 */}
        {activeTab === 'running-data' && (
          <View>
            {/* 设备监控 */}
            <View className="mb-10 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
              <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">设备监控</Text>

              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">实时监控</Text>
                <View className="flex h-40 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-700">
                  <View className="items-center">
                    <FontAwesome
                      name="video-camera"
                      size={24}
                      color={isDark ? '#60a5fa' : '#3b82f6'}
                    />
                    <Text className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      设备实时监控画面
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mb-3 flex-row flex-wrap">
                <View className="mb-3 w-1/2">
                  <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                    今日运行时长
                  </Text>
                  <Text className="font-medium text-gray-900 dark:text-gray-100">8.5小时</Text>
                </View>
                <View className="mb-3 w-1/2">
                  <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">今日产能</Text>
                  <Text className="font-medium text-gray-900 dark:text-gray-100">850件</Text>
                </View>
                <View className="mb-3 w-1/2">
                  <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                    平均贴片速度
                  </Text>
                  <Text className="font-medium text-gray-900 dark:text-gray-100">0.1秒/个</Text>
                </View>
                <View className="mb-3 w-1/2">
                  <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">良品率</Text>
                  <Text className="font-medium text-gray-900 dark:text-gray-100">99.2%</Text>
                </View>
              </View>

              <View className="mb-4 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="check-circle"
                    size={16}
                    color="#16a34a"
                    className="mr-2"
                  />
                  <View>
                    <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">设备状态良好</Text>
                    <Text className="text-sm text-gray-700 dark:text-gray-300">
                      下次计划维护时间：2023-12-15
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* 维护记录 */}
        {activeTab === 'maintenance-records' && (
          <View className="mb-10 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">维护记录</Text>

            <ScrollView horizontal className="mb-3">
              <View className="border-b border-gray-200 dark:border-gray-700">
                <View className="flex-row bg-gray-50 dark:bg-gray-700">
                  <Text className="w-24 px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    日期
                  </Text>
                  <Text className="w-24 px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    维护类型
                  </Text>
                  <Text className="w-24 px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    维护人员
                  </Text>
                  <Text className="w-32 px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    维护内容
                  </Text>
                  <Text className="w-20 px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    状态
                  </Text>
                </View>

                <View className="border-t border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">2023-11-15</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">例行保养</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">王工程师</Text>
                    <Text className="w-32 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">
                      清洁、润滑、校准
                    </Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-blue-100 px-2 py-1 dark:bg-blue-900/30">
                        <Text className="text-center text-xs text-blue-800 dark:text-blue-300">
                          已完成
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="border-t border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">2023-10-20</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">部件更换</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">李工程师</Text>
                    <Text className="w-32 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">更换吸嘴组件</Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-blue-100 px-2 py-1 dark:bg-blue-900/30">
                        <Text className="text-center text-xs text-blue-800 dark:text-blue-300">
                          已完成
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="border-t border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">2023-09-10</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">例行保养</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">王工程师</Text>
                    <Text className="w-32 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">
                      清洁、润滑、校准
                    </Text>
                    <View className="w-20 px-2 py-3">
                      <View className="rounded-full bg-blue-100 px-2 py-1 dark:bg-blue-900/30">
                        <Text className="text-center text-xs text-blue-800 dark:text-blue-300">
                          已完成
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        {/* 性能参数 */}
        {activeTab === 'performance-params' && (
          <View className="mb-10 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">性能参数</Text>

            <View className="mb-3 flex-row flex-wrap">
              <View className="mb-3 w-1/2">
                <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">设备温度</Text>
                <Text className="font-medium text-gray-900 dark:text-gray-100">42°C</Text>
              </View>
              <View className="mb-3 w-1/2">
                <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">电机转速</Text>
                <Text className="font-medium text-gray-900 dark:text-gray-100">1200 RPM</Text>
              </View>
              <View className="mb-3 w-1/2">
                <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">电压</Text>
                <Text className="font-medium text-gray-900 dark:text-gray-100">220V</Text>
              </View>
              <View className="mb-3 w-1/2">
                <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">电流</Text>
                <Text className="font-medium text-gray-900 dark:text-gray-100">5.2A</Text>
              </View>
            </View>

            <View className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <View className="flex-row items-center">
                <FontAwesome
                  name="bell"
                  size={16}
                  color={isDark ? '#60a5fa' : '#3b82f6'}
                  className="mr-2"
                />
                <View>
                  <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">设备警报</Text>
                  <Text className="text-sm text-gray-700 dark:text-gray-300">无异常警报</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* 故障记录 */}
        {activeTab === 'fault-records' && (
          <View className="mb-10 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <Text className="mb-3 font-medium text-gray-900 dark:text-gray-100">故障记录</Text>

            <ScrollView horizontal className="mb-3">
              <View className="border-b border-gray-200 dark:border-gray-700">
                <View className="flex-row bg-gray-50 dark:bg-gray-700">
                  <Text className="w-24 px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    日期
                  </Text>
                  <Text className="w-24 px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    故障类型
                  </Text>
                  <Text className="w-24 px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    处理人员
                  </Text>
                  <Text className="w-24 px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    处理方法
                  </Text>
                  <Text className="w-20 px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    停机时长
                  </Text>
                </View>

                <View className="border-t border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">2023-11-05</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">吸嘴堵塞</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">王工程师</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">清洗吸嘴</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">2小时</Text>
                  </View>
                </View>

                <View className="border-t border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">2023-10-12</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">供料器卡料</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">李工程师</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">调整供料器</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">1.5小时</Text>
                  </View>
                </View>

                <View className="border-t border-gray-200 dark:border-gray-700">
                  <View className="flex-row">
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">2023-09-25</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">视觉系统异常</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">张工程师</Text>
                    <Text className="w-24 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">重新校准</Text>
                    <Text className="w-20 px-2 py-3 text-sm text-gray-900 dark:text-gray-100">3小时</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EquipmentDetail;
