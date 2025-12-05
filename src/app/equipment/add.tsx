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
    <View className="mb-4">
      <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <TouchableOpacity
        className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800"
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
        <View className="mt-2 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              className={`border-b border-gray-100 px-4 py-3 dark:border-neutral-700 ${index === options.length - 1 ? 'border-b-0' : ''}`}
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
    <View className="mb-4">
      <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        设备照片
      </Text>
      <TouchableOpacity
        className="items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 dark:border-neutral-600 dark:bg-neutral-800/50"
        onPress={() => console.log('选择图片')}
        activeOpacity={0.7}
      >
        <FontAwesome
          name="cloud-upload"
          size={40}
          color={isDark ? '#6b7280' : '#9ca3af'}
        />
        <Text className="mb-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
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
  const { isDark } = useAppColorScheme();
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
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      {/* 顶部导航 */}
      <NavHeader title="添加设备" />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* 基本信息 */}
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <Text className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-100">
            基本信息
          </Text>

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
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <Text className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-100">
            位置信息
          </Text>

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
        <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800">
          <Text className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-100">
            其他信息
          </Text>

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

        {/* 底部空间 */}
        <View className="h-[100px]" />
      </ScrollView>

      {/* 底部固定操作栏 */}
      <View
        className="border-t border-gray-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="flex-row">
          <TouchableOpacity
            className="mr-3 flex-1 items-center rounded-lg border-2 border-gray-300 py-3 dark:border-neutral-600"
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
              onPress={handleSubmit(onSubmit)}
              testID="save-equipment-button"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
