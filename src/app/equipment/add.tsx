import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import {
  Button,
  ControlledInput,
  NavHeader,
  Text,
  View,
} from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';
import { success } from '@/lib/message';

// 表单验证schema
const schema = z.object({
  name: z.string().min(1, '请输入设备名称'),
  code: z.string().min(1, '请输入设备编号'),
  type: z.string().min(1, '请选择设备类型'),
  model: z.string().optional(),
  department: z.string().min(1, '请选择所属部门'),
  location: z.string().min(1, '请输入安装位置'),
  installDate: z.string().optional(),
  responsible: z.string().optional(),
  phone: z.string().optional(),
  remark: z.string().optional(),
});

type FormType = z.infer<typeof schema>;

// 下拉选择组件
type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  required?: boolean;
  placeholder?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  options,
  onSelect,
  required = false,
  placeholder = '请选择',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <TouchableOpacity
        className={`min-h-[52px] flex-row items-center justify-between rounded-xl border bg-gray-50 px-4 dark:bg-neutral-900 ${isOpen ? 'border-primary-500' : 'border-gray-200 dark:border-neutral-700'}`}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text
          className={`${value ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}`}
        >
          {value || placeholder}
        </Text>
        <FontAwesome
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={12}
          color="#9ca3af"
        />
      </TouchableOpacity>
      {isOpen && (
        <View className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              className={`min-h-[48px] justify-center border-b border-gray-100 px-4 dark:border-neutral-700 ${option === value ? 'dark:bg-primary-950/30 bg-primary-50' : ''} ${index === options.length - 1 ? 'border-b-0' : ''}`}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              activeOpacity={0.7}
            >
              <Text
                className={`${option === value ? 'font-semibold text-primary-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'}`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// 图片上传占位组件
const ImageUpload: React.FC = () => {
  const { isDark } = useAppColorScheme();

  return (
    <View className="mb-1">
      <Text className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
        设备照片
      </Text>
      <TouchableOpacity
        className="min-h-[150px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-7 dark:border-neutral-600 dark:bg-neutral-900"
        onPress={() => console.log('选择图片')}
        activeOpacity={0.7}
      >
        <FontAwesome
          name="cloud-upload"
          size={30}
          color={isDark ? '#6b7280' : '#9ca3af'}
        />
        <Text className="mb-1 mt-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
          点击上传设备照片
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-500">
          支持 JPG、PNG 格式，最大 5MB
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function AddEquipment() {
  const router = useRouter();
  // const { isDark } = useAppColorScheme();
  const [equipmentType, setEquipmentType] = useState('');
  const [department, setDepartment] = useState('');
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      code: '',
      type: '',
      model: '',
      department: '',
      location: '',
      installDate: '',
      responsible: '',
      phone: '',
      remark: '',
    },
  });

  // 同步选择器的值到表单
  React.useEffect(() => {
    setValue('type', equipmentType);
  }, [equipmentType, setValue]);

  React.useEffect(() => {
    setValue('department', department);
  }, [department, setValue]);

  const onSubmit = (data: FormType) => {
    console.log('提交设备数据:', data);
    // TODO: 调用API保存设备信息
    success('设备添加成功');
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-100/70 dark:bg-neutral-950">
      {/* 顶部导航 */}
      <NavHeader title="添加设备" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 px-1">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            建立设备档案
          </Text>
          <Text className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-400">
            完善基础资料，便于后续点检、保养与维修追踪。
          </Text>
        </View>
        {/* 基本信息 */}
        <View className="mb-3 rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <View className="mb-5 flex-row items-center">
            <View className="dark:bg-primary-950/40 mr-3 size-8 items-center justify-center rounded-lg bg-primary-50">
              <FontAwesome name="cube" size={14} color="#543EF8" />
            </View>
            <View>
              <Text className="text-base font-bold text-gray-900 dark:text-white">
                基本信息
              </Text>
              <Text className="mt-0.5 text-xs text-gray-400">
                名称、编号与设备分类
              </Text>
            </View>
          </View>

          <ControlledInput
            name="name"
            label="设备名称"
            control={control}
            placeholder="请输入设备名称"
            testID="equipment-name"
          />

          <ControlledInput
            name="code"
            label="设备编号"
            control={control}
            placeholder="请输入设备编号"
            testID="equipment-code"
          />

          <SelectField
            label="设备类型"
            value={equipmentType}
            options={[
              '加工设备',
              '检测设备',
              '动力设备',
              '运输设备',
              '其他设备',
            ]}
            onSelect={setEquipmentType}
            required
            placeholder="请选择设备类型"
          />

          <ControlledInput
            name="model"
            label="品牌型号"
            control={control}
            placeholder="请输入品牌型号"
            testID="equipment-model"
          />
        </View>

        {/* 位置信息 */}
        <View className="mb-3 rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <View className="mb-5 flex-row items-center">
            <View className="dark:bg-primary-950/40 mr-3 size-8 items-center justify-center rounded-lg bg-primary-50">
              <FontAwesome name="map-marker" size={15} color="#543EF8" />
            </View>
            <View>
              <Text className="text-base font-bold text-gray-900 dark:text-white">
                位置信息
              </Text>
              <Text className="mt-0.5 text-xs text-gray-400">
                设备归属与安装区域
              </Text>
            </View>
          </View>

          <SelectField
            label="所属部门"
            value={department}
            options={['生产部', '技术部', '质量部', '动力部']}
            onSelect={setDepartment}
            required
            placeholder="请选择所属部门"
          />

          <ControlledInput
            name="location"
            label="安装位置"
            control={control}
            placeholder="请输入安装位置"
            testID="equipment-location"
          />
        </View>

        {/* 其他信息 */}
        <View className="rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <View className="mb-5 flex-row items-center">
            <View className="dark:bg-primary-950/40 mr-3 size-8 items-center justify-center rounded-lg bg-primary-50">
              <FontAwesome name="sliders" size={14} color="#543EF8" />
            </View>
            <View>
              <Text className="text-base font-bold text-gray-900 dark:text-white">
                补充信息
              </Text>
              <Text className="mt-0.5 text-xs text-gray-400">
                责任人、日期与设备照片
              </Text>
            </View>
          </View>

          <ControlledInput
            name="installDate"
            label="启用日期"
            control={control}
            placeholder="请选择启用日期 (如：2024-01-01)"
            testID="equipment-install-date"
          />

          <ControlledInput
            name="responsible"
            label="责任人"
            control={control}
            placeholder="请输入责任人"
            testID="equipment-responsible"
          />

          <ControlledInput
            name="phone"
            label="联系电话"
            control={control}
            placeholder="请输入联系电话"
            testID="equipment-phone"
            keyboardType="phone-pad"
          />

          <ControlledInput
            name="remark"
            label="备注"
            control={control}
            placeholder="请输入备注信息"
            multiline
            numberOfLines={4}
            testID="equipment-remark"
          />

          <ImageUpload />
        </View>
      </ScrollView>

      {/* 底部固定操作栏 */}
      <View
        className="border-t border-gray-200 bg-white px-4 pt-3 dark:border-neutral-800 dark:bg-neutral-900"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      >
        <View className="flex-row">
          <TouchableOpacity
            className="mr-3 min-h-[48px] flex-1 items-center justify-center rounded-xl border border-gray-300 dark:border-neutral-600"
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Text className="font-semibold text-gray-700 dark:text-gray-200">
              取消
            </Text>
          </TouchableOpacity>
          <View className="flex-1">
            <Button
              label="保存"
              variant="primary"
              size="lg"
              className="my-0 rounded-xl"
              textClassName="text-base font-semibold"
              onPress={handleSubmit(onSubmit)}
              testID="save-equipment-button"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
