import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';
import { error, info } from '@/lib/message';

// 设备选项类型
type Equipment = {
  id: string;
  name: string;
  code: string;
  location: string;
};

// 设备数据
const equipmentList: Equipment[] = [
  { id: '1', name: '数控机床', code: 'CNC-01', location: 'A车间-1号线' },
  { id: '2', name: '数控机床', code: 'CNC-03', location: 'A车间-3号线' },
  { id: '3', name: '注塑机', code: 'IM-03', location: 'B车间-2号线' },
  { id: '4', name: '注塑机', code: 'IM-05', location: 'B车间-5号线' },
  { id: '5', name: '空压机', code: 'AC-01', location: '动力车间' },
  { id: '6', name: '空压机', code: 'AC-02', location: '动力车间' },
  { id: '7', name: '空压机', code: 'AC-05', location: '动力车间' },
  { id: '8', name: '传送带', code: 'CB-01', location: 'C车间-包装区' },
  { id: '9', name: '传送带', code: 'CB-02', location: 'C车间-包装区' },
  { id: '10', name: '混料机', code: 'MX-08', location: 'C车间-配料区' },
];

// 维修人员数据
const technicianList = [
  { id: '1', name: '张三', level: '高级技师' },
  { id: '2', name: '李四', level: '高级技师' },
  { id: '3', name: '王五', level: '中级技师' },
  { id: '4', name: '赵六', level: '中级技师' },
  { id: '5', name: '孙七', level: '初级技师' },
];

// 单选按钮组件
type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: string;
  color?: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onPress,
  icon,
  color = '#1890ff',
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center rounded-lg border-2 p-3 ${selected
        ? 'border-primary-500 bg-blue-50 dark:bg-blue-950/30'
        : 'border-gray-200 dark:border-neutral-700'
      }`}
    activeOpacity={0.7}
  >
    {icon && (
      <View
        className="mr-2 size-6 items-center justify-center"
        style={{ opacity: selected ? 1 : 0.5 }}
      >
        <FontAwesome name={icon as any} size={16} color={color} />
      </View>
    )}
    <Text
      className={`text-sm ${selected ? 'font-semibold text-gray-800 dark:text-gray-100' : 'text-gray-700 dark:text-gray-400'}`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// 优先级按钮组件
type PriorityButtonProps = {
  label: string;
  icon: string;
  color: string;
  selected: boolean;
  onPress: () => void;
};

const PriorityButton: React.FC<PriorityButtonProps> = ({
  label,
  icon,
  color,
  selected,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 items-center justify-center rounded-lg border-2 py-4 ${selected ? `border-[${color}]` : 'border-gray-200 dark:border-neutral-700'
      }`}
    style={
      selected
        ? { borderColor: color, backgroundColor: `${color}10` }
        : undefined
    }
    activeOpacity={0.7}
  >
    <FontAwesome
      name={icon as any}
      size={24}
      color={selected ? color : '#9ca3af'}
    />
    <Text
      className="mt-1 text-sm font-semibold"
      style={{ color: selected ? color : '#9ca3af' }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const AddRepairOrder: React.FC = () => {
  const router = useRouter();
  const { isDark } = useAppColorScheme();

  // 表单状态
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [faultType, setFaultType] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [impact, setImpact] = useState<string>('');
  const [faultDescription, setFaultDescription] = useState<string>('');
  const [expectedTime, setExpectedTime] = useState<string>('');
  const [assignedTechnician, setAssignedTechnician] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [needShutdown, setNeedShutdown] = useState<boolean>(false);

  // 显示设备选择器
  const [showEquipmentPicker, setShowEquipmentPicker] = useState(false);
  const [showTechnicianPicker, setShowTechnicianPicker] = useState(false);

  // 获取选中的设备
  const getSelectedEquipmentText = () => {
    if (!selectedEquipment) return '请选择需要维修的设备';
    const equipment = equipmentList.find((e) => e.id === selectedEquipment);
    return equipment
      ? `${equipment.name} ${equipment.code} (${equipment.location})`
      : '请选择需要维修的设备';
  };

  // 获取选中的技师
  const getSelectedTechnicianText = () => {
    if (!assignedTechnician) return '系统自动分配';
    const technician = technicianList.find((t) => t.id === assignedTechnician);
    return technician
      ? `${technician.name} - ${technician.level}`
      : '系统自动分配';
  };

  // 验证表单
  const validateForm = () => {
    if (!selectedEquipment) {
      error('请选择需要维修的设备');
      return false;
    }
    if (!faultType) {
      error('请选择故障类型');
      return false;
    }
    if (!priority) {
      error('请选择优先级');
      return false;
    }
    if (!impact) {
      error('请选择影响程度');
      return false;
    }
    if (!faultDescription.trim()) {
      error('请填写故障描述');
      return false;
    }
    if (!expectedTime) {
      error('请选择期望完成时间');
      return false;
    }
    return true;
  };

  // 保存草稿
  const handleSaveDraft = () => {
    Alert.alert('保存草稿', '是否保存为草稿？', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        onPress: () => {
          info('已保存为草稿');
          router.back();
        },
      },
    ]);
  };

  // 提交表单
  const handleSubmit = () => {
    if (!validateForm()) return;

    Alert.alert('提交工单', '确认提交维修工单吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        onPress: () => {
          const workOrderNo = `WO-${Date.now()}`;
          info(`维修工单提交成功！工单号：${workOrderNo}`);
          router.back();
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader title="新建维修单" />

      <ScrollView
        className="flex-1 p-4 pb-24"
        showsVerticalScrollIndicator={false}
      >
        {/* 设备信息 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="server" size={18} color="#1890ff" />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              设备信息
            </Text>
          </View>

          <View className="space-y-4">
            {/* 设备选择 */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                选择设备 <Text className="text-red-500">*</Text>
              </Text>
              <TouchableOpacity
                onPress={() => setShowEquipmentPicker(!showEquipmentPicker)}
                className="relative flex-row items-center justify-between rounded-lg border border-gray-300 px-4 py-3 dark:border-neutral-600"
                activeOpacity={0.7}
              >
                <Text
                  className={`flex-1 text-sm ${selectedEquipment ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}`}
                >
                  {getSelectedEquipmentText()}
                </Text>
                <FontAwesome name="chevron-down" size={12} color="#9ca3af" />
              </TouchableOpacity>

              {/* 设备列表 */}
              {showEquipmentPicker && (
                <View className="mt-2 max-h-48 rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-700">
                  <ScrollView>
                    {equipmentList.map((equipment) => (
                      <TouchableOpacity
                        key={equipment.id}
                        onPress={() => {
                          setSelectedEquipment(equipment.id);
                          setShowEquipmentPicker(false);
                        }}
                        className={`border-b border-gray-100 p-3 dark:border-neutral-600 ${selectedEquipment === equipment.id
                            ? 'bg-blue-50 dark:bg-blue-950/30'
                            : ''
                          }`}
                        activeOpacity={0.7}
                      >
                        <Text className="text-sm font-medium text-gray-800 dark:text-gray-100">
                          {equipment.name} {equipment.code}
                        </Text>
                        <Text className="text-xs text-gray-500 dark:text-gray-400">
                          {equipment.location}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* 或扫码选择 */}
            <TouchableOpacity
              className="flex-row items-center justify-center space-x-2 rounded-lg border-2 border-dashed border-primary-500 py-3"
              onPress={() => info('扫码功能开发中')}
              activeOpacity={0.7}
            >
              <FontAwesome name="qrcode" size={20} color="#1890ff" />
              <Text className="ml-2 text-sm font-semibold text-primary-500">
                扫描设备二维码
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 故障信息 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="exclamation-circle" size={18} color="#f5222d" />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              故障信息
            </Text>
          </View>

          <View className="space-y-4">
            {/* 故障类型 */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                故障类型 <Text className="text-red-500">*</Text>
              </Text>
              <View className="gap-2">
                <View className="flex-row gap-2">
                  <View className="flex-1">
                    <RadioButton
                      label="机械故障"
                      selected={faultType === 'mechanical'}
                      onPress={() => setFaultType('mechanical')}
                    />
                  </View>
                  <View className="flex-1">
                    <RadioButton
                      label="电气故障"
                      selected={faultType === 'electrical'}
                      onPress={() => setFaultType('electrical')}
                    />
                  </View>
                </View>
                <View className="flex-row gap-2">
                  <View className="flex-1">
                    <RadioButton
                      label="液压故障"
                      selected={faultType === 'hydraulic'}
                      onPress={() => setFaultType('hydraulic')}
                    />
                  </View>
                  <View className="flex-1">
                    <RadioButton
                      label="其他故障"
                      selected={faultType === 'other'}
                      onPress={() => setFaultType('other')}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* 优先级 */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                优先级 <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row gap-2">
                <PriorityButton
                  label="紧急"
                  icon="exclamation-triangle"
                  color="#f5222d"
                  selected={priority === 'urgent'}
                  onPress={() => setPriority('urgent')}
                />
                <PriorityButton
                  label="高"
                  icon="arrow-up"
                  color="#faad14"
                  selected={priority === 'high'}
                  onPress={() => setPriority('high')}
                />
                <PriorityButton
                  label="普通"
                  icon="minus"
                  color="#1890ff"
                  selected={priority === 'normal'}
                  onPress={() => setPriority('normal')}
                />
              </View>
            </View>

            {/* 影响程度 */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                影响程度 <Text className="text-red-500">*</Text>
              </Text>
              <View className="gap-2">
                <RadioButton
                  label="严重 - 停机"
                  selected={impact === 'shutdown'}
                  onPress={() => setImpact('shutdown')}
                />
                <RadioButton
                  label="中等 - 性能下降"
                  selected={impact === 'reduced'}
                  onPress={() => setImpact('reduced')}
                />
                <RadioButton
                  label="轻微 - 不影响生产"
                  selected={impact === 'minor'}
                  onPress={() => setImpact('minor')}
                />
              </View>
            </View>

            {/* 故障描述 */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                故障描述 <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={faultDescription}
                onChangeText={setFaultDescription}
                placeholder="请详细描述设备故障现象、发生时间、故障前设备运行情况等..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-100"
              />
              <View className="mt-1 flex-row items-center">
                <FontAwesome name="info-circle" size={12} color="#9ca3af" />
                <Text className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  建议包含:故障现象、发生时间、异常声音/气味等
                </Text>
              </View>
            </View>

            {/* 故障图片 */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                故障图片
              </Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className="aspect-square flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-neutral-600 dark:bg-neutral-700/50"
                  onPress={() => info('拍照功能开发中')}
                  activeOpacity={0.7}
                >
                  <FontAwesome name="camera" size={24} color="#9ca3af" />
                  <Text className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    拍照
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="aspect-square flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-neutral-600 dark:bg-neutral-700/50"
                  onPress={() => info('相册功能开发中')}
                  activeOpacity={0.7}
                >
                  <FontAwesome name="image" size={24} color="#9ca3af" />
                  <Text className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    相册
                  </Text>
                </TouchableOpacity>
                <View className="aspect-square flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-neutral-600 dark:bg-neutral-700/50">
                  <Text className="text-xs text-gray-400 dark:text-gray-500">
                    0/9
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 维修要求 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="clipboard" size={18} color="#1890ff" />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              维修要求
            </Text>
          </View>

          <View className="space-y-4">
            {/* 期望完成时间 */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                期望完成时间 <Text className="text-red-500">*</Text>
              </Text>
              <TouchableOpacity
                className="rounded-lg border border-gray-300 px-4 py-3 dark:border-neutral-600"
                onPress={() => info('日期选择器开发中')}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-sm ${expectedTime ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}`}
                >
                  {expectedTime || '请选择期望完成时间'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* 指定维修人员 */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                指定维修人员
              </Text>
              <TouchableOpacity
                onPress={() => setShowTechnicianPicker(!showTechnicianPicker)}
                className="relative flex-row items-center justify-between rounded-lg border border-gray-300 px-4 py-3 dark:border-neutral-600"
                activeOpacity={0.7}
              >
                <Text className="flex-1 text-sm text-gray-800 dark:text-gray-100">
                  {getSelectedTechnicianText()}
                </Text>
                <FontAwesome name="chevron-down" size={12} color="#9ca3af" />
              </TouchableOpacity>

              {/* 技师列表 */}
              {showTechnicianPicker && (
                <View className="mt-2 rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-700">
                  <TouchableOpacity
                    onPress={() => {
                      setAssignedTechnician('');
                      setShowTechnicianPicker(false);
                    }}
                    className={`border-b border-gray-100 p-3 dark:border-neutral-600 ${!assignedTechnician
                        ? 'bg-blue-50 dark:bg-blue-950/30'
                        : ''
                      }`}
                    activeOpacity={0.7}
                  >
                    <Text className="text-sm text-gray-800 dark:text-gray-100">
                      系统自动分配
                    </Text>
                  </TouchableOpacity>
                  {technicianList.map((technician) => (
                    <TouchableOpacity
                      key={technician.id}
                      onPress={() => {
                        setAssignedTechnician(technician.id);
                        setShowTechnicianPicker(false);
                      }}
                      className={`border-b border-gray-100 p-3 dark:border-neutral-600 ${assignedTechnician === technician.id
                          ? 'bg-blue-50 dark:bg-blue-950/30'
                          : ''
                        }`}
                      activeOpacity={0.7}
                    >
                      <Text className="text-sm text-gray-800 dark:text-gray-100">
                        {technician.name} - {technician.level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* 备注信息 */}
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                备注信息
              </Text>
              <TextInput
                value={remarks}
                onChangeText={setRemarks}
                placeholder="其他需要说明的信息..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-100"
              />
            </View>

            {/* 是否需要停机 */}
            <View className="flex-row items-center justify-between rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950/30">
              <View className="flex-row items-center">
                <FontAwesome name="power-off" size={16} color="#faad14" />
                <Text className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  维修需要停机
                </Text>
              </View>
              <Switch
                value={needShutdown}
                onValueChange={setNeedShutdown}
                trackColor={{ false: '#d1d5db', true: '#1890ff' }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>

        {/* 提交人信息 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="user" size={18} color="#1890ff" />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              提交人信息
            </Text>
          </View>

          <View className="space-y-3">
            <View className="flex-row justify-between border-b border-gray-100 py-2 dark:border-neutral-700">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                提交人
              </Text>
              <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                张工程师
              </Text>
            </View>
            <View className="flex-row justify-between border-b border-gray-100 py-2 dark:border-neutral-700">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                部门
              </Text>
              <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                设备维修部
              </Text>
            </View>
            <View className="flex-row justify-between py-2">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                联系方式
              </Text>
              <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                138****8888
              </Text>
            </View>
          </View>
        </View>

        {/* 温馨提示 */}
        <View className="mb-4 rounded-xl border-l-4 border-primary-500 bg-blue-50 p-4 dark:bg-blue-950/30">
          <View className="mb-2 flex-row items-center">
            <FontAwesome name="lightbulb-o" size={16} color="#faad14" />
            <Text className="ml-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
              温馨提示
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-xs text-gray-600 dark:text-gray-300">
              • 紧急维修单将优先分配给维修人员
            </Text>
            <Text className="text-xs text-gray-600 dark:text-gray-300">
              • 请准确描述故障现象，有助于快速维修
            </Text>
            <Text className="text-xs text-gray-600 dark:text-gray-300">
              • 上传故障图片可帮助维修人员提前准备工具和备件
            </Text>
            <Text className="text-xs text-gray-600 dark:text-gray-300">
              • 维修工单创建后可在"维修管理"中查看进度
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 底部固定操作栏 */}
      <View className="border-t border-gray-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 items-center rounded-lg border-2 border-gray-300 py-3 dark:border-neutral-600"
            onPress={handleSaveDraft}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <FontAwesome name="save" size={16} color="#6b7280" />
              <Text className="ml-2 font-semibold text-gray-700 dark:text-gray-300">
                存为草稿
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center rounded-lg bg-primary-500 py-3"
            onPress={handleSubmit}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <FontAwesome name="paper-plane" size={16} color="white" />
              <Text className="ml-2 font-semibold text-white">提交工单</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddRepairOrder;
