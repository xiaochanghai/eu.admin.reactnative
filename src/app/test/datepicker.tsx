import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Platform, StyleSheet, View } from 'react-native';

import { SafeAreaView, ScrollView, Text } from '@/components/ui';
import { Button } from '@/components/ui/button';
import {
  ControlledDatePicker,
  DatePickerInput,
} from '@/components/ui/input-date';

export default function DatePickerTest() {
  // 基本日期选择器状态
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [datetime, setDateTime] = useState<Date>(new Date());

  // 带限制的日期选择器
  const [limitedDate, setLimitedDate] = useState<Date>(new Date());
  const minDate = new Date(2020, 0, 1); // 2020-01-01
  const maxDate = new Date(2030, 11, 31); // 2030-12-31

  // 表单集成示例
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      birthday: new Date(1990, 0, 1),
      appointmentTime: new Date(),
      startDate: new Date(),
    },
  });

  const formValues = watch();

  const onSubmit = (data: any) => {
    console.log('表单提交数据:', data);
    alert(
      `表单提交成功！\n生日: ${formatDate(data.birthday, 'date')}\n预约时间: ${formatDate(data.appointmentTime, 'datetime')}\n开始日期: ${formatDate(data.startDate, 'date')}`
    );
  };

  const formatDate = (
    date: Date,
    mode: 'date' | 'time' | 'datetime'
  ): string => {
    if (!date) return '';
    const d = new Date(date);

    if (mode === 'time') {
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    } else if (mode === 'datetime') {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    } else {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'DatePicker 测试',
          headerTintColor: '#000',
          headerBackTitle: '返回',
        }}
      />
      <ScrollView className="flex-1 bg-gray-100">
        <SafeAreaView className="flex-1">
          <View style={styles.container}>
            {/* 基本日期选择器 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>日期选择器 (Date)</Text>

              <DatePickerInput
                label="选择日期"
                value={date}
                onChange={setDate}
                mode="date"
                testID="date-picker"
              />

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  选中的日期: {formatDate(date, 'date')}
                </Text>
              </View>
            </View>

            {/* 时间选择器 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>时间选择器 (Time)</Text>

              <DatePickerInput
                label="选择时间"
                value={time}
                onChange={setTime}
                mode="time"
                testID="time-picker"
              />

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  选中的时间: {formatDate(time, 'time')}
                </Text>
              </View>
            </View>

            {/* 日期时间选择器 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>日期时间选择器 (DateTime)</Text>

              <DatePickerInput
                label="选择日期和时间"
                value={datetime}
                onChange={setDateTime}
                mode="datetime"
                testID="datetime-picker"
              />

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  选中的日期时间: {formatDate(datetime, 'datetime')}
                </Text>
              </View>
            </View>

            {/* 带限制的日期选择器 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>带日期限制的选择器</Text>

              <DatePickerInput
                label="选择日期 (2020-2030)"
                value={limitedDate}
                onChange={setLimitedDate}
                mode="date"
                minDate={minDate}
                maxDate={maxDate}
                testID="limited-date-picker"
              />

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  最小日期: {formatDate(minDate, 'date')}
                </Text>
                <Text style={styles.infoText}>
                  最大日期: {formatDate(maxDate, 'date')}
                </Text>
                <Text style={styles.infoText}>
                  选中的日期: {formatDate(limitedDate, 'date')}
                </Text>
              </View>
            </View>

            {/* 必填字段示例 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>必填字段</Text>

              <DatePickerInput
                label="出生日期"
                value={date}
                onChange={setDate}
                mode="date"
                require
                testID="required-date-picker"
              />
            </View>

            {/* 禁用状态 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>禁用状态</Text>

              <DatePickerInput
                label="禁用的日期选择器"
                value={new Date()}
                mode="date"
                disabled
                testID="disabled-date-picker"
              />
            </View>

            {/* 表单集成示例 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                表单集成 (react-hook-form)
              </Text>

              <ControlledDatePicker
                name="birthday"
                control={control}
                label="生日"
                mode="date"
                require
                // rules={{
                //   required: '请选择生日',
                // }}
                maxDate={new Date()} // 不能选择未来日期
              />

              <ControlledDatePicker
                name="appointmentTime"
                control={control}
                label="预约时间"
                mode="datetime"
                require
                // rules={{
                //   required: '请选择预约时间',
                // }}
                minDate={new Date()} // 不能选择过去时间
              />

              <ControlledDatePicker
                name="startDate"
                control={control}
                label="开始日期"
                mode="date"
              />

              <View style={styles.formValuesBox}>
                <Text style={styles.formValuesTitle}>当前表单值:</Text>
                <Text style={styles.formValuesText}>
                  生日:{' '}
                  {formValues.birthday
                    ? formatDate(formValues.birthday, 'date')
                    : '未选择'}
                </Text>
                <Text style={styles.formValuesText}>
                  预约时间:{' '}
                  {formValues.appointmentTime
                    ? formatDate(formValues.appointmentTime, 'datetime')
                    : '未选择'}
                </Text>
                <Text style={styles.formValuesText}>
                  开始日期:{' '}
                  {formValues.startDate
                    ? formatDate(formValues.startDate, 'date')
                    : '未选择'}
                </Text>
              </View>

              <Button
                label="提交表单"
                onPress={handleSubmit(onSubmit)}
                className="mt-4"
              />
            </View>

            {/* 使用说明 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>使用说明</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  • mode=&quot;date&quot; - 仅选择日期
                </Text>
                <Text style={styles.infoText}>
                  • mode=&quot;time&quot; - 仅选择时间
                </Text>
                <Text style={styles.infoText}>
                  • mode=&quot;datetime&quot; - 选择日期和时间
                </Text>
                <Text style={styles.infoText}>
                  • minDate/maxDate - 限制可选日期范围
                </Text>
                <Text style={styles.infoText}>• disabled - 禁用选择器</Text>
                <Text style={styles.infoText}>• require - 显示必填标记</Text>
                <Text style={styles.infoText}>
                  • ControlledDatePicker - 与 react-hook-form 集成
                </Text>
              </View>
            </View>

            {/* 代码示例 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>代码示例</Text>
              <View style={styles.codeBox}>
                <Text style={styles.codeText}>
                  {`// 基本使用
import { DatePickerInput } from '@/components/ui';

const [date, setDate] = useState(new Date());

<DatePickerInput
  label="选择日期"
  value={date}
  onChange={setDate}
  mode="date"
/>

// 表单集成
import { ControlledDatePicker } from '@/components/ui';

<ControlledDatePicker
  name="birthday"
  control={control}
  label="生日"
  mode="date"
  rules={{ required: '请选择生日' }}
/>`}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },
  infoBox: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
    lineHeight: 20,
  },
  formValuesBox: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  formValuesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  formValuesText: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 4,
  },
  codeBox: {
    backgroundColor: '#1f2937',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  codeText: {
    fontSize: 12,
    color: '#e5e7eb',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    lineHeight: 18,
  },
});
