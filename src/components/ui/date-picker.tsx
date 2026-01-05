/**
 * 自定义日期选择器组件
 *
 * 提供了一个原生的、可定制的日期/时间选择器，支持三种模式：
 * - date: 仅日期选择（年月日）
 * - time: 仅时间选择（时分）
 * - datetime: 日期时间选择（年月日时分）
 *
 * 特性：
 * - 底部滑出式模态框设计
 * - 滚动选择器，支持吸附效果
 * - 支持最小/最大日期限制
 * - 自定义日期格式化
 * - 支持禁用状态
 * - 中文界面
 *
 * @example
 * // 基本使用
 * const [date, setDate] = useState(new Date());
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   mode="date"
 * >
 *   <Text>选择日期</Text>
 * </DatePicker>
 *
 * @example
 * // 时间选择器
 * <DatePicker
 *   value={time}
 *   onChange={setTime}
 *   mode="time"
 * />
 *
 * @example
 * // 带日期范围限制
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   mode="date"
 *   minDate={new Date(2020, 0, 1)}
 *   maxDate={new Date(2030, 11, 31)}
 * />
 */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { Text } from './text';

/**
 * 日期选择器的模式类型
 * - date: 日期模式（年月日）
 * - time: 时间模式（时分）
 * - datetime: 日期时间模式（年月日时分）
 */
export type DatePickerMode = 'date' | 'time' | 'datetime';

/**
 * 格式化日期为字符串
 *
 * 支持自定义格式和默认格式：
 * - 自定义格式：使用占位符 YYYY, MM, DD, HH, mm, ss
 * - 默认格式：根据 mode 自动选择合适的格式
 *
 * @param date - 要格式化的日期对象
 * @param mode - 日期模式，默认为 'date'
 * @param format - 自定义格式字符串（可选）
 * @returns 格式化后的日期字符串
 *
 * @example
 * formatDateValue(new Date(), 'date'); // "2024-01-05"
 * formatDateValue(new Date(), 'time'); // "14:30"
 * formatDateValue(new Date(), 'date', 'YYYY年MM月DD日'); // "2024年01月05日"
 */
export const formatDateValue = (
  date: Date,
  mode: DatePickerMode = 'date',
  format?: string
): string => {
  if (format) {
    // 自定义格式化
    return format
      .replace('YYYY', date.getFullYear().toString())
      .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
      .replace('DD', String(date.getDate()).padStart(2, '0'))
      .replace('HH', String(date.getHours()).padStart(2, '0'))
      .replace('mm', String(date.getMinutes()).padStart(2, '0'))
      .replace('ss', String(date.getSeconds()).padStart(2, '0'));
  }

  // 默认格式化
  switch (mode) {
    case 'time':
      return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    case 'datetime':
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    case 'date':
    default:
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
};

/**
 * 日期选择器组件的属性接口
 */
export interface DatePickerProps {
  /** 当前选中的日期值 */
  value?: Date;
  /** 日期变化回调函数 */
  onChange?: (date: Date) => void;
  /** 自定义日期格式字符串（如：'YYYY-MM-DD'） */
  format?: string;
  /** 最小可选日期 */
  minDate?: Date;
  /** 最大可选日期 */
  maxDate?: Date;
  /** 是否禁用选择器 */
  disabled?: boolean;
  /** 选择器模式：date | time | datetime */
  mode?: DatePickerMode;
  /** 自定义触发器内容，默认显示格式化后的日期 */
  children?: React.ReactNode;
}

/**
 * 日期选择器组件
 *
 * 一个功能完整的日期/时间选择器，使用底部滑出模态框展示
 * 提供流畅的滚动选择体验
 *
 * @component
 * @example
 * const [date, setDate] = useState(new Date());
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   mode="datetime"
 *   minDate={new Date(2020, 0, 1)}
 *   maxDate={new Date(2025, 11, 31)}
 * >
 *   <TouchableOpacity>
 *     <Text>{formatDateValue(date, 'datetime')}</Text>
 *   </TouchableOpacity>
 * </DatePicker>
 */
export const DatePicker = React.forwardRef<any, DatePickerProps>(
  (
    {
      value = new Date(),
      onChange,
      format,
      minDate,
      maxDate,
      disabled = false,
      mode = 'date',
      children,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [tempDate, setTempDate] = useState(value);

    // 同步外部 value 到内部临时状态
    useEffect(() => {
      setTempDate(value);
    }, [value]);

    /**
     * 确认选择
     * 将临时选择的日期传递给外部，并关闭模态框
     */
    const handleConfirm = () => {
      onChange?.(tempDate);
      setVisible(false);
    };

    /**
     * 取消选择
     * 恢复到原始值，并关闭模态框
     */
    const handleCancel = () => {
      setTempDate(value);
      setVisible(false);
    };

    /**
     * 根据模式获取模态框标题
     */
    const getTitle = () => {
      switch (mode) {
        case 'time':
          return '选择时间';
        case 'datetime':
          return '选择日期时间';
        case 'date':
        default:
          return '选择日期';
      }
    };

    return (
      <>
        <Pressable
          ref={ref}
          onPress={() => !disabled && setVisible(true)}
          disabled={disabled}
        >
          {children || <Text>{formatDateValue(value, mode, format)}</Text>}
        </Pressable>

        <Modal
          visible={visible}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <Pressable
            className="flex-1 justify-end bg-black/50"
            onPress={handleCancel}
          >
            <Pressable
              className="rounded-t-2xl bg-white"
              style={{ paddingBottom: Platform.OS === 'ios' ? 34 : 16 }}
            >
              {/* Header */}
              <View className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3">
                <TouchableOpacity onPress={handleCancel}>
                  <Text className="text-base text-gray-500">取消</Text>
                </TouchableOpacity>
                <Text className="text-base font-semibold text-gray-800">
                  {getTitle()}
                </Text>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text className="text-base font-semibold text-blue-600">
                    确定
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Date Picker */}
              {mode === 'date' || mode === 'datetime' ? (
                <View>
                  {mode === 'datetime' && (
                    <View className="px-4 pb-2 pt-3">
                      <Text className="text-center text-sm font-semibold text-gray-500">
                        日期
                      </Text>
                    </View>
                  )}
                  <DateSelector
                    date={tempDate}
                    onChange={setTempDate}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                </View>
              ) : null}

              {mode === 'time' || mode === 'datetime' ? (
                <View>
                  {mode === 'datetime' && (
                    <View className="px-4 pb-2 pt-3">
                      <Text className="text-center text-sm font-semibold text-gray-500">
                        时间
                      </Text>
                    </View>
                  )}
                  <TimeSelector date={tempDate} onChange={setTempDate} />
                </View>
              ) : null}
            </Pressable>
          </Pressable>
        </Modal>
      </>
    );
  }
);

DatePicker.displayName = 'DatePicker';

/**
 * 日期选择器组件
 *
 * 提供年月日的滚动选择功能
 * 支持最小/最大日期范围限制
 *
 * @internal 内部组件，不对外暴露
 */
const DateSelector: React.FC<{
  /** 当前日期 */
  date: Date;
  /** 日期变化回调 */
  onChange: (date: Date) => void;
  /** 最小可选日期 */
  minDate?: Date;
  /** 最大可选日期 */
  maxDate?: Date;
}> = ({ date, onChange, minDate, maxDate }) => {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDate();

  // 计算年份范围（默认前后50年）
  const minYear = minDate?.getFullYear() || currentYear - 50;
  const maxYear = maxDate?.getFullYear() || currentYear + 50;

  // 生成年份、月份、日期数组
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  /**
   * 获取指定年月的天数
   */
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth + 1) },
    (_, i) => i + 1
  );

  /**
   * 处理年份变化
   */
  const handleYearChange = (year: number) => {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    onChange(newDate);
  };

  /**
   * 处理月份变化
   */
  const handleMonthChange = (month: number) => {
    const newDate = new Date(date);
    newDate.setMonth(month - 1);
    onChange(newDate);
  };

  /**
   * 处理日期变化
   */
  const handleDayChange = (day: number) => {
    const newDate = new Date(date);
    newDate.setDate(day);
    onChange(newDate);
  };

  return (
    <View className="flex-row items-center justify-center py-4">
      <PickerColumn
        data={years.map((y) => ({ label: `${y}年`, value: y }))}
        selectedValue={currentYear}
        onSelect={handleYearChange}
      />
      <PickerColumn
        data={months.map((m) => ({ label: `${m}月`, value: m }))}
        selectedValue={currentMonth + 1}
        onSelect={handleMonthChange}
      />
      <PickerColumn
        data={days.map((d) => ({ label: `${d}日`, value: d }))}
        selectedValue={currentDay}
        onSelect={handleDayChange}
      />
    </View>
  );
};

/**
 * 时间选择器组件
 *
 * 提供时分的滚动选择功能
 * 使用24小时制
 *
 * @internal 内部组件，不对外暴露
 */
const TimeSelector: React.FC<{
  /** 当前日期时间 */
  date: Date;
  /** 时间变化回调 */
  onChange: (date: Date) => void;
}> = ({ date, onChange }) => {
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();

  // 生成小时（0-23）和分钟（0-59）数组
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  /**
   * 处理小时变化
   */
  const handleHourChange = (hour: number) => {
    const newDate = new Date(date);
    newDate.setHours(hour);
    onChange(newDate);
  };

  /**
   * 处理分钟变化
   */
  const handleMinuteChange = (minute: number) => {
    const newDate = new Date(date);
    newDate.setMinutes(minute);
    onChange(newDate);
  };

  return (
    <View className="flex-row items-center justify-center py-4">
      <PickerColumn
        data={hours.map((h) => ({
          label: String(h).padStart(2, '0'),
          value: h,
        }))}
        selectedValue={currentHour}
        onSelect={handleHourChange}
      />
      <Text className="mx-2 text-2xl font-semibold text-gray-800">:</Text>
      <PickerColumn
        data={minutes.map((m) => ({
          label: String(m).padStart(2, '0'),
          value: m,
        }))}
        selectedValue={currentMinute}
        onSelect={handleMinuteChange}
      />
    </View>
  );
};

/**
 * 滚动选择列组件
 *
 * 提供垂直滚动选择功能，支持：
 * - 吸附到选项（snapToInterval）
 * - 点击直接选择
 * - 滚动惯性选择
 * - 视觉高亮当前选中项
 *
 * @internal 内部组件，不对外暴露
 */
const PickerColumn: React.FC<{
  /** 选项数据列表 */
  data: { label: string; value: number }[];
  /** 当前选中的值 */
  selectedValue: number;
  /** 选择回调函数 */
  onSelect: (value: number) => void;
}> = ({ data, selectedValue, onSelect }) => {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [containerHeight] = useState(200);
  const itemHeight = 40;

  // 初始化时滚动到选中项
  useEffect(() => {
    const index = data.findIndex((item) => item.value === selectedValue);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: index * itemHeight,
        animated: false,
      });
    }
  }, []);

  return (
    <View className="relative flex-1" style={{ height: containerHeight }}>
      {/* 选中项指示器 */}
      <View className="absolute inset-x-2 top-1/2 z-0 -mt-5 h-10 rounded-lg bg-gray-100" />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight} // 吸附到每个选项
        decelerationRate="fast" // 快速减速，增强吸附效果
        onMomentumScrollEnd={(event) => {
          // 滚动结束时，根据位置计算并选择对应的项
          const index = Math.round(
            event.nativeEvent.contentOffset.y / itemHeight
          );
          if (data[index]) {
            onSelect(data[index].value);
          }
        }}
        contentContainerStyle={{
          // 顶部和底部留白，使选中项居中显示
          paddingVertical: (containerHeight - itemHeight) / 2,
        }}
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.value}
            className="items-center justify-center"
            style={{ height: itemHeight }}
            onPress={() => {
              onSelect(item.value);
              const index = data.findIndex((d) => d.value === item.value);
              scrollViewRef.current?.scrollTo({
                y: index * itemHeight,
                animated: true,
              });
            }}
          >
            <Text
              className={`text-base ${
                item.value === selectedValue
                  ? 'text-lg font-semibold text-gray-800'
                  : 'text-gray-500'
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
