import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { queryByFilter, queryLov } from '@/api';
import http from '@/api/common/http';
import { PriorityButton, RadioButton } from '@/components/repair-order';
import {
  DatePickerInput,
  FontAwesome,
  NavHeader,
  Text,
  View,
} from '@/components/ui';
import colors from '@/components/ui/colors';
import { QRCodeScanner } from '@/components/ui/qr-code-scanner';
import { isWeb } from '@/lib';
import { error, info } from '@/lib/message';
import { userInfo as userStore } from '@/lib/user';
import { type Equipment, type SmLov } from '@/types';

/** 维修人员类型 */
type Technician = {
  ID: string;
  EmployeeName: string;
  Phone?: string;
  Remark?: string;
};

const AddRepairOrder: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const userInfo = userStore.use.userInfo();

  // 表单状态
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [faultType, setFaultType] = useState<string>('');
  const [faultTypes, setFaultTypes] = useState<SmLov[]>([]);
  const [impactOptions, setImpactOptions] = useState<SmLov[]>([]);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [priority, setPriority] = useState<string>('');
  const [impact, setImpact] = useState<string>('');
  const [faultDescription, setFaultDescription] = useState<string>('');
  const [expectedTime, setExpectedTime] = useState<Date>();
  const [assignedTechnician, setAssignedTechnician] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [needShutdown, setNeedShutdown] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);

  // 维修人员列表
  const [technicianList, setTechnicianList] = useState<Technician[]>([]);

  // 显示设备选择器
  const [showEquipmentPicker, setShowEquipmentPicker] = useState(false);
  const [showTechnicianPicker, setShowTechnicianPicker] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  // 获取选中的设备
  const getSelectedEquipmentText = () => {
    if (!selectedEquipment) return '请选择需要维修的设备';
    const equipment = equipmentList.find((e) => e.ID === selectedEquipment);
    return equipment
      ? `${equipment.MachineName} ${equipment.MachineNo} (${equipment.Location})`
      : '请选择需要维修的设备';
  };

  // 获取选中的技师
  const getSelectedTechnicianText = () => {
    if (!assignedTechnician) return '系统自动分配';
    const technician = technicianList.find((t) => t.ID === assignedTechnician);
    return technician ? technician.EmployeeName : '系统自动分配';
  };

  /** 加载故障类型 LOV */
  const loadFaultType = async () => {
    const { Success, Data } = await queryLov('EquipmentFaultType');
    if (Success && Data) setFaultTypes(Data);
  };

  /** 加载影响程度 LOV */
  const loadImpactOptions = async () => {
    const { Success, Data } = await queryLov('RepairOrderImpact');
    if (Success && Data) setImpactOptions(Data);
  };

  /** 加载设备列表 */
  const loadEquipment = async () => {
    const { Success, Data } = await http.get<Equipment[]>(
      '/api/EmRepairOrder/GetEquipment'
    );
    if (Success && Data) setEquipmentList(Data);
  };

  /** 加载维修人员列表（从员工表查询） */
  const loadTechnicians = async () => {
    try {
      const result = await queryByFilter('SmEmployee', { pageSize: 100 }, {});
      if (result?.success && result.data) {
        setTechnicianList(
          (result.data as Technician[]).map((item) => ({
            ID: item.ID,
            EmployeeName: item.EmployeeName,
            Phone: item.Phone,
            Remark: item.Remark,
          }))
        );
      }
    } catch {
      // 查询失败时留空列表，用户可选择"系统自动分配"
    }
  };

  useEffect(() => {
    loadFaultType();
    loadImpactOptions();
    loadEquipment();
    loadTechnicians();
  }, []);

  // 处理扫码结果
  const handleScanResult = (data: string) => {
    setShowScanner(false);
    const parts = data.split('_');
    if (parts.length !== 2) {
      info(`无效的设备二维码！`);
      return;
    }

    // 根据扫描结果查找设备
    const equipment = equipmentList.find(
      (e) => e.MachineNo === parts[1] || e.ID === parts[1]
    );
    if (equipment) {
      setSelectedEquipment(equipment.ID);
      info(`已选择设备: ${equipment.MachineName}`);
    } else {
      error(`无效的设备二维码！`);
    }
  };

  // 取消扫码
  const handleCancelScan = () => {
    setShowScanner(false);
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

  /** 构建提交数据（字段名与后端 InsertEmRepairOrderInput 对齐） */
  const buildSubmitData = () => {
    // 如果选择了停机，将停机信息追加到备注
    const finalRemark = needShutdown
      ? [remarks, '【维修需要停机】'].filter(Boolean).join('\n')
      : remarks;

    return {
      EquipmentId: selectedEquipment,
      FaultType: faultType,
      Priority: priority,
      Impact: impact,
      FaultDesc: faultDescription.trim(),
      ExpectedCompleteTime: expectedTime?.toISOString(),
      AssignUserId: assignedTechnician || null,
      Remark: finalRemark.trim() || null,
    };
  };

  /** 执行提交 */
  const doSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = buildSubmitData();
      const { Success } = await http.post<string>(
        '/api/EmRepairOrder',
        payload
      );
      if (Success) {
        info('维修工单提交成功！');
        router.back();
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 提交表单
  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (isWeb) {
      const confirmed = window.confirm('确认提交维修工单吗？');
      if (confirmed) await doSubmit();
    } else {
      Alert.alert('提交工单', '确认提交维修工单吗？', [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          onPress: doSubmit,
        },
      ]);
    }
  };

  // 如果显示扫码界面，渲染 QRCodeScanner
  if (showScanner) {
    return (
      <QRCodeScanner onScan={handleScanResult} onCancel={handleCancelScan} />
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader title="新建维修单" />

      <ScrollView
        className="flex-1 p-4 pb-24"
        showsVerticalScrollIndicator={false}
      >
        {/* 设备信息 */}
        <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="server" size={18} color={colors.primary[600]} />
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
                        key={equipment.ID}
                        onPress={() => {
                          setSelectedEquipment(equipment.ID);
                          setShowEquipmentPicker(false);
                        }}
                        className={`border-b border-gray-100 p-3 dark:border-neutral-600 ${selectedEquipment === equipment.ID ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                        activeOpacity={0.7}
                      >
                        <Text className="text-sm font-medium text-gray-800 dark:text-gray-100">
                          {equipment.MachineName} {equipment.MachineNo}
                        </Text>
                        <Text className="text-xs text-gray-500 dark:text-gray-400">
                          {equipment.Location}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* 或扫码选择 */}
            <TouchableOpacity
              className="mt-4 flex-row items-center justify-center space-x-2 rounded-lg border-2 border-dashed border-primary-600 py-3"
              onPress={() => setShowScanner(true)}
              activeOpacity={0.7}
            >
              <FontAwesome
                name="qrcode"
                size={20}
                color={colors.primary[600]}
              />
              <Text className="ml-2 text-sm font-semibold text-primary-600">
                扫描设备二维码
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 故障信息 */}
        <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="exclamation-circle" size={18} color="#f5222d" />
            <Text className="ml-2 text-base font-semibold text-gray-800 dark:text-gray-100">
              故障信息
            </Text>
          </View>

          <View className="space-y-4">
            {/* 故障类型 */}
            {faultTypes && faultTypes.length > 0 && (
              <View>
                <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  故障类型 <Text className="text-red-500">*</Text>
                </Text>
                <View className="gap-2">
                  <View className="flex-row gap-2">
                    {faultTypes.map((item, index) => (
                      <View className="flex-1" key={index}>
                        <RadioButton
                          label={item.label}
                          selected={faultType === item.value}
                          onPress={() => setFaultType(item.value)}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

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
                  color={colors.primary[600]}
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
                {impactOptions.length > 0
                  ? impactOptions.map((item) => (
                      <RadioButton
                        key={item.value}
                        label={item.label}
                        selected={impact === item.value}
                        onPress={() => setImpact(item.value)}
                      />
                    ))
                  : // 后备：LOV 未返回时使用默认选项
                    [
                      { value: 'shutdown', label: '严重 - 停机' },
                      { value: 'reduced', label: '中等 - 性能下降' },
                      { value: 'minor', label: '轻微 - 不影响生产' },
                    ].map((item) => (
                      <RadioButton
                        key={item.value}
                        label={item.label}
                        selected={impact === item.value}
                        onPress={() => setImpact(item.value)}
                      />
                    ))}
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
                maxLength={256}
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
        <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome
              name="clipboard"
              size={18}
              color={colors.primary[600]}
            />
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
              <DatePickerInput
                value={expectedTime}
                onChange={(date) => setExpectedTime(date)}
                mode="datetime"
              />
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
                    className={`border-b border-gray-100 p-3 dark:border-neutral-600 ${!assignedTechnician ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                    activeOpacity={0.7}
                  >
                    <Text className="text-sm text-gray-800 dark:text-gray-100">
                      系统自动分配
                    </Text>
                  </TouchableOpacity>
                  {technicianList.map((technician) => (
                    <TouchableOpacity
                      key={technician.ID}
                      onPress={() => {
                        setAssignedTechnician(technician.ID);
                        setShowTechnicianPicker(false);
                      }}
                      className={`border-b border-gray-100 p-3 dark:border-neutral-600 ${assignedTechnician === technician.ID ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                      activeOpacity={0.7}
                    >
                      <Text className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {technician.EmployeeName}
                      </Text>
                      {technician.Phone && (
                        <Text className="text-xs text-gray-500 dark:text-gray-400">
                          {technician.Phone}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                  {technicianList.length === 0 && (
                    <View className="p-3">
                      <Text className="text-center text-sm text-gray-400 dark:text-gray-500">
                        暂无维修人员数据
                      </Text>
                    </View>
                  )}
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
                maxLength={300}
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
                trackColor={{ false: '#d1d5db', true: colors.primary[600] }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>

        {/* 提交人信息 */}
        <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
          <View className="mb-4 flex-row items-center">
            <FontAwesome name="user" size={18} color={colors.primary[600]} />
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
                {userInfo?.UserName || '-'}
              </Text>
            </View>
            <View className="flex-row justify-between py-2">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                用户ID
              </Text>
              <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {userInfo?.UserId || '-'}
              </Text>
            </View>
          </View>
        </View>

        {/* 温馨提示 */}
        <View className="mb-4 rounded-xl border-l-4 border-primary-600 bg-primary-50 p-4 dark:bg-primary-900/20">
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
              • 维修工单创建后可在&quot;维修管理&quot;中查看进度
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 底部固定操作栏 */}
      <View
        className="border-t border-gray-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="flex-row gap-3">
          <TouchableOpacity
            className={`flex-1 items-center rounded-xl py-3 ${submitting ? 'bg-primary-300' : 'bg-primary-600'}`}
            onPress={handleSubmit}
            disabled={submitting}
            activeOpacity={0.7}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <View className="flex-row items-center">
                <FontAwesome name="paper-plane" size={16} color="white" />
                <Text className="ml-2 font-semibold text-white">提交工单</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddRepairOrder;
