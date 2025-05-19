import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@/components/ui/icons';

import { StatusBadge } from './status-badge';

export const Equipment = () => {
  return (
    <View>
      {/* 设备概览 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          设备概览
        </Text>
        <View className="mb-3 flex-row justify-between">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-blue-600">32</Text>
            <Text className="mt-1 text-xs text-gray-500">设备总数</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-green-500">25</Text>
            <Text className="mt-1 text-xs text-gray-500">运行中</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-red-500">2</Text>
            <Text className="mt-1 text-xs text-gray-500">故障</Text>
          </View>
        </View>
        <View className="flex-row items-center rounded-xl bg-blue-50 p-3">
          <FontAwesome
            name="wrench"
            size={20}
            color="#0066ff"
            className="mr-3"
          />
          <View className="flex-1">
            <Text className="text-sm font-medium">设备综合效率(OEE)</Text>
            <View className="flex-row items-center">
              <Text className="mr-2 text-lg font-bold text-blue-600">
                87.2%
              </Text>
              <Text className="text-xs text-green-500">↑ 2.1%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 设备列表 */}
      <Text className="mb-3 text-lg font-semibold text-gray-800">设备列表</Text>

      {/* 设备项目1 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-2 flex-row items-start justify-between">
          <Text className="text-base font-medium text-gray-800">
            SMT贴片机#2
          </Text>
          <StatusBadge status="运行中" color="#22c55e" bgColor="#dcfce7" />
        </View>
        <Text className="mb-2 text-sm text-gray-500">
          设备编号：EQ20230501-02
        </Text>

        <View className="mb-3 flex-row flex-wrap">
          <View className="mb-2 w-1/2">
            <Text className="mb-1 text-xs text-gray-500">设备温度</Text>
            <Text className="text-sm font-medium">42°C</Text>
          </View>
          <View className="mb-2 w-1/2">
            <Text className="mb-1 text-xs text-gray-500">电机转速</Text>
            <Text className="text-sm font-medium">1200 RPM</Text>
          </View>
          <View className="mb-2 w-1/2">
            <Text className="mb-1 text-xs text-gray-500">电压</Text>
            <Text className="text-sm font-medium">220V</Text>
          </View>
          <View className="mb-2 w-1/2">
            <Text className="mb-1 text-xs text-gray-500">电流</Text>
            <Text className="text-sm font-medium">5.2A</Text>
          </View>
        </View>

        <View className="mb-3 flex-row items-start rounded-xl bg-blue-50 p-3">
          <FontAwesome
            name="bell"
            size={16}
            color="#0066ff"
            className="mr-2 mt-0.5"
          />
          <View>
            <Text className="mb-1 text-sm font-medium">设备警报</Text>
            <Text className="text-sm">无异常警报</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-500">今日运行：</Text>
            <Text className="mr-3 text-sm font-medium">8.5小时</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 设备项目2 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-2 flex-row items-start justify-between">
          <Text className="text-base font-medium text-gray-800">
            波峰焊接机#1
          </Text>
          <StatusBadge status="故障" color="#ef4444" bgColor="#fee2e2" />
        </View>
        <Text className="mb-2 text-sm text-gray-500">
          设备编号：EQ20230602-05
        </Text>

        <View className="mb-3 flex-row flex-wrap">
          <View className="mb-2 w-1/2">
            <Text className="mb-1 text-xs text-gray-500">设备温度</Text>
            <Text className="text-sm font-medium">68°C</Text>
          </View>
          <View className="mb-2 w-1/2">
            <Text className="mb-1 text-xs text-gray-500">电机转速</Text>
            <Text className="text-sm font-medium">0 RPM</Text>
          </View>
          <View className="mb-2 w-1/2">
            <Text className="mb-1 text-xs text-gray-500">电压</Text>
            <Text className="text-sm font-medium">0V</Text>
          </View>
          <View className="mb-2 w-1/2">
            <Text className="mb-1 text-xs text-gray-500">电流</Text>
            <Text className="text-sm font-medium">0A</Text>
          </View>
        </View>

        <View className="mb-3 flex-row items-start rounded-xl bg-red-50 p-3">
          <FontAwesome
            name="exclamation-triangle"
            size={16}
            color="#ef4444"
            className="mr-2 mt-0.5"
          />
          <View>
            <Text className="mb-1 text-sm font-medium text-red-500">
              设备警报
            </Text>
            <Text className="text-sm">温控系统异常，需要维修</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-500">停机时间：</Text>
            <Text className="mr-3 text-sm font-medium">2.5小时</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600">详情</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 设备维护计划 */}
      <Text className="mb-3 text-lg font-semibold text-gray-800">
        设备维护计划
      </Text>
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View className="flex-row border-b border-gray-200 bg-gray-100 py-2">
              <Text className="w-30 px-2 text-xs font-medium uppercase text-gray-500">
                设备名称
              </Text>
              <Text className="w-30 px-2 text-xs font-medium uppercase text-gray-500">
                维护类型
              </Text>
              <Text className="w-30 px-2 text-xs font-medium uppercase text-gray-500">
                计划日期
              </Text>
              <Text className="w-30 px-2 text-xs font-medium uppercase text-gray-500">
                负责人
              </Text>
              <Text className="w-30 px-2 text-xs font-medium uppercase text-gray-500">
                状态
              </Text>
            </View>
            <View className="flex-row border-b border-gray-200 py-2">
              <Text className="w-30 px-2 text-sm">SMT贴片机#2</Text>
              <Text className="w-30 px-2 text-sm">例行保养</Text>
              <Text className="w-30 px-2 text-sm">2023-12-15</Text>
              <Text className="w-30 px-2 text-sm">王工程师</Text>
              <View className="w-30 justify-center px-2">
                <StatusBadge
                  status="已计划"
                  color="#0066ff"
                  bgColor="#ebf5ff"
                />
              </View>
            </View>
            <View className="flex-row border-b border-gray-200 py-2">
              <Text className="w-30 px-2 text-sm">回流焊机#3</Text>
              <Text className="w-30 px-2 text-sm">故障维修</Text>
              <Text className="w-30 px-2 text-sm">2023-12-05</Text>
              <Text className="w-30 px-2 text-sm">张工程师</Text>
              <View className="w-30 justify-center px-2">
                <StatusBadge status="紧急" color="#ef4444" bgColor="#fee2e2" />
              </View>
            </View>
            <View className="flex-row border-b border-gray-200 py-2">
              <Text className="w-30 px-2 text-sm">PCB切割机#1</Text>
              <Text className="w-30 px-2 text-sm">例行保养</Text>
              <Text className="w-30 px-2 text-sm">2023-12-20</Text>
              <Text className="w-30 px-2 text-sm">李工程师</Text>
              <View className="w-30 justify-center px-2">
                <StatusBadge
                  status="已计划"
                  color="#0066ff"
                  bgColor="#ebf5ff"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
