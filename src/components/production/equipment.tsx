import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@/components/ui/icons';

import { StatusBadge } from './status-badge';

// 设备状态类型定义
type EquipmentStatus = '运行中' | '故障' | '待机' | '维护中';

// 设备数据接口定义
interface EquipmentItem {
  id: string; // 设备唯一标识
  name: string; // 设备名称
  code: string; // 设备编号
  status: EquipmentStatus; // 设备状态
  temperature: string; // 设备温度
  motorSpeed: string; // 电机转速
  voltage: string; // 电压
  current: string; // 电流
  alert: {
    hasAlert: boolean; // 是否有警报
    message: string; // 警报信息
  };
  runningInfo: {
    label: string; // 运行信息标签
    value: string; // 运行信息值
  };
}

// 维护计划接口定义
interface MaintenancePlan {
  id: string; // 计划唯一标识
  equipmentName: string; // 设备名称
  type: string; // 维护类型
  date: string; // 计划日期
  responsible: string; // 负责人
  status: string; // 状态
  statusColor: string; // 状态颜色
  statusBgColor: string; // 状态背景色
}

export const Equipment = () => {
  const router = useRouter();
  // 状态颜色映射
  const statusColorMap = {
    运行中: { color: '#22c55e', bgColor: '#dcfce7' },
    故障: { color: '#ef4444', bgColor: '#fee2e2' },
    待机: { color: '#f59e0b', bgColor: '#fef3c7' },
    维护中: { color: '#6366f1', bgColor: '#e0e7ff' },
  };

  // 设备数据
  const equipmentData: EquipmentItem[] = [
    {
      id: '1',
      name: 'SMT贴片机#2',
      code: 'EQ20230501-02',
      status: '运行中',
      temperature: '42°C',
      motorSpeed: '1200 RPM',
      voltage: '220V',
      current: '5.2A',
      alert: {
        hasAlert: false,
        message: '无异常警报',
      },
      runningInfo: {
        label: '今日运行：',
        value: '8.5小时',
      },
    },
    {
      id: '2',
      name: '波峰焊接机#1',
      code: 'EQ20230602-05',
      status: '故障',
      temperature: '68°C',
      motorSpeed: '0 RPM',
      voltage: '0V',
      current: '0A',
      alert: {
        hasAlert: true,
        message: '温控系统异常，需要维修',
      },
      runningInfo: {
        label: '停机时间：',
        value: '2.5小时',
      },
    },
    // 可以根据需要添加更多设备数据
  ];

  // 维护计划数据
  const maintenancePlans: MaintenancePlan[] = [
    {
      id: '1',
      equipmentName: 'SMT贴片机#2',
      type: '例行保养',
      date: '2023-12-15',
      responsible: '王工程师',
      status: '已计划',
      statusColor: '#0066ff',
      statusBgColor: '#ebf5ff',
    },
    {
      id: '2',
      equipmentName: '回流焊机#3',
      type: '故障维修',
      date: '2023-12-05',
      responsible: '张工程师',
      status: '紧急',
      statusColor: '#ef4444',
      statusBgColor: '#fee2e2',
    },
    {
      id: '3',
      equipmentName: 'PCB切割机#1',
      type: '例行保养',
      date: '2023-12-20',
      responsible: '李工程师',
      status: '已计划',
      statusColor: '#0066ff',
      statusBgColor: '#ebf5ff',
    },
  ];

  // 处理设备详情点击事件
  const handleEquipmentDetail = (equipmentId: string) => {
    // 这里可以添加导航到设备详情页面的逻辑
    router.push(`/production/equipment/${equipmentId}`);
  };

  return (
    <View>
      {/* 设备概览 - 显示设备总数、运行状态和效率信息 */}
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

      {/* 设备列表标题 */}
      <Text className="mb-3 text-lg font-semibold text-gray-800">设备列表</Text>

      {/* 设备列表 - 使用map函数循环渲染设备数据 */}
      {equipmentData.map((equipment) => (
        <TouchableOpacity
          key={equipment.id}
          className="mb-4 rounded-2xl bg-white p-4 shadow-sm"
          onPress={() => handleEquipmentDetail(equipment.id)}
        >
          {/* 设备名称和状态 */}
          <View className="mb-2 flex-row items-start justify-between">
            <Text className="text-base font-medium text-gray-800">
              {equipment.name}
            </Text>
            <StatusBadge
              status={equipment.status}
              color={statusColorMap[equipment.status].color}
              bgColor={statusColorMap[equipment.status].bgColor}
            />
          </View>

          {/* 设备编号 */}
          <Text className="mb-2 text-sm text-gray-500">
            设备编号：{equipment.code}
          </Text>

          {/* 设备参数信息 - 温度、转速、电压、电流 */}
          <View className="mb-3 flex-row flex-wrap">
            <View className="mb-2 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">设备温度</Text>
              <Text className="text-sm font-medium">
                {equipment.temperature}
              </Text>
            </View>
            <View className="mb-2 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">电机转速</Text>
              <Text className="text-sm font-medium">
                {equipment.motorSpeed}
              </Text>
            </View>
            <View className="mb-2 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">电压</Text>
              <Text className="text-sm font-medium">{equipment.voltage}</Text>
            </View>
            <View className="mb-2 w-1/2">
              <Text className="mb-1 text-xs text-gray-500">电流</Text>
              <Text className="text-sm font-medium">{equipment.current}</Text>
            </View>
          </View>

          {/* 设备警报信息 - 根据是否有警报显示不同样式 */}
          <View
            className={`mb-3 flex-row items-start rounded-xl ${equipment.alert.hasAlert ? 'bg-red-50' : 'bg-blue-50'} p-3`}
          >
            <FontAwesome
              name={equipment.alert.hasAlert ? 'exclamation-triangle' : 'bell'}
              size={16}
              color={equipment.alert.hasAlert ? '#ef4444' : '#0066ff'}
              className="mr-2 mt-0.5"
            />
            <View>
              <Text
                className={`mb-1 text-sm font-medium ${equipment.alert.hasAlert ? 'text-red-500' : ''}`}
              >
                设备警报
              </Text>
              <Text className="text-sm">{equipment.alert.message}</Text>
            </View>
          </View>

          {/* 运行信息和详情按钮 */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-500">
                {equipment.runningInfo.label}
              </Text>
              <Text className="mr-3 text-sm font-medium">
                {equipment.runningInfo.value}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* 设备维护计划标题 */}
      <Text className="mb-3 text-lg font-semibold text-gray-800">
        设备维护计划
      </Text>

      {/* 设备维护计划表格 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* 表头 - 确保宽度类名与表内容一致 */}
            <View className="flex-row border-b border-gray-200 bg-gray-100 py-2">
              <Text className="w-[120px] px-2 text-xs font-medium uppercase text-gray-500">
                设备名称
              </Text>
              <Text className="w-[120px] px-2 text-xs font-medium uppercase text-gray-500">
                维护类型
              </Text>
              <Text className="w-[120px] px-2 text-xs font-medium uppercase text-gray-500">
                计划日期
              </Text>
              <Text className="w-[120px] px-2 text-xs font-medium uppercase text-gray-500">
                负责人
              </Text>
              <Text className="w-[120px] px-2 text-xs font-medium uppercase text-gray-500">
                状态
              </Text>
            </View>

            {/* 表格内容 - 使用map函数循环渲染维护计划数据，确保宽度与表头一致 */}
            {maintenancePlans.map((plan) => (
              <View
                key={plan.id}
                className="flex-row border-b border-gray-200 py-2"
              >
                <Text className="w-[120px] px-2 text-sm">
                  {plan.equipmentName}
                </Text>
                <Text className="w-[120px] px-2 text-sm">{plan.type}</Text>
                <Text className="w-[120px] px-2 text-sm">{plan.date}</Text>
                <Text className="w-[120px] px-2 text-sm">
                  {plan.responsible}
                </Text>
                <View className="w-[120px] justify-center px-2">
                  <StatusBadge
                    status={plan.status}
                    color={plan.statusColor}
                    bgColor={plan.statusBgColor}
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
