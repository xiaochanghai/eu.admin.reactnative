/**
 * 日期选择器输入组件
 *
 * 提供了两个主要组件：
 * 1. DatePickerInput - 独立的日期选择器输入组件
 * 2. ControlledDatePicker - 与 react-hook-form 集成的受控日期选择器
 *
 * @example
 * // 基本使用
 * <DatePickerInput
 *   label="选择日期"
 *   value={date}
 *   onChange={setDate}
 *   mode="date"
 * />
 *
 * @example
 * // 与 react-hook-form 集成
 * <ControlledDatePicker
 *   name="birthDate"
 *   control={control}
 *   label="出生日期"
 *   mode="date"
 *   rules={{ required: '请选择出生日期' }}
 * />
 *
 * @example
 * // 日期时间选择器
 * <DatePickerInput
 *   label="预约时间"
 *   value={dateTime}
 *   onChange={setDateTime}
 *   mode="datetime"
 *   format="YYYY年MM月DD日 HH:mm"
 * />
 */
import * as React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { tv } from 'tailwind-variants';

import colors from './colors';
import { DatePicker, formatDateValue } from './date-picker';
import { type RuleType } from './input';
import { Text } from './text';

/**
 * 日期选择器的样式变体配置
 * 使用 tailwind-variants 定义不同状态下的样式
 */
const datepickerTv = tv({
  slots: {
    container: 'mb-2',
    label: 'mb-1 text-lg text-gray-600 dark:text-neutral-100',
    picker:
      'mt-0 w-full rounded-lg border-[0.5px] border-neutral-300 bg-white px-4 py-3 text-lg leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white',
    pickerContainer: 'relative w-full flex-row items-center',
    valueText: 'text-lg text-black dark:text-white',
  },

  variants: {
    focused: {
      true: {
        picker:
          'border-2 border-[#543EF8] shadow-[0_4px_12px_rgba(84,62,248,0.7)]',
      },
    },
    error: {
      true: {
        picker: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    disabled: {
      true: {
        picker: 'bg-neutral-200',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

/**
 * 日期选择器输入组件的属性接口
 */
export interface DatePickerInputProps {
  /** 输入框标签文本 */
  label?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否必填（显示红色星号） */
  require?: boolean;
  /** 错误提示信息 */
  error?: string;
  /** 当前选中的日期值 */
  value?: Date;
  /** 日期变化回调函数 */
  onChange?: (date: Date) => void;
  /** 选择器模式：date(日期) | time(时间) | datetime(日期时间) */
  mode?: 'date' | 'time' | 'datetime';
  /** 自定义日期格式字符串，如 'YYYY-MM-DD' */
  format?: string;
  /** 最小可选日期 */
  minDate?: Date;
  /** 最大可选日期 */
  maxDate?: Date;
  /** 测试ID，用于自动化测试 */
  testID?: string;
}

/**
 * react-hook-form 控制器类型定义
 */
export type DatePickerControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

/**
 * 受控日期选择器组件的属性接口
 * 结合了 DatePickerInputProps 和 DatePickerControllerType
 */
interface ControlledDatePickerProps<T extends FieldValues>
  extends DatePickerInputProps,
    DatePickerControllerType<T> {}

/**
 * 日期选择器输入组件
 *
 * 带标签、错误提示和视觉反馈的日期选择器输入框
 * 支持日期、时间、日期时间三种模式
 *
 * @component
 * @example
 * const [date, setDate] = useState(new Date());
 *
 * return (
 *   <DatePickerInput
 *     label="选择日期"
 *     value={date}
 *     onChange={setDate}
 *     mode="date"
 *     require
 *   />
 * );
 */
export const DatePickerInput = React.forwardRef<any, DatePickerInputProps>(
  (props, ref) => {
    const {
      label,
      error,
      testID,
      require,
      value,
      onChange,
      mode = 'date',
      format,
      minDate,
      maxDate,
      disabled,
    } = props;
    const [isFocussed, setIsFocussed] = React.useState(false);

    const styles = React.useMemo(
      () =>
        datepickerTv({
          error: Boolean(error),
          focused: isFocussed,
          disabled: Boolean(disabled),
        }),
      [error, isFocussed, disabled]
    );

    /**
     * 获取日期格式字符串
     * 如果用户提供了自定义格式，使用自定义格式
     * 否则根据 mode 返回默认格式
     */
    const getFormat = () => {
      if (format) return format;
      switch (mode) {
        case 'date':
          return 'YYYY-MM-DD';
        case 'time':
          return 'HH:mm';
        case 'datetime':
          return 'YYYY-MM-DD HH:mm';
        default:
          return 'YYYY-MM-DD';
      }
    };

    /**
     * 获取占位符文本
     * 根据不同的 mode 返回对应的中文占位符
     */
    const getPlaceholder = () => {
      switch (mode) {
        case 'time':
          return '请选择时间';
        case 'datetime':
          return '请选择日期时间';
        case 'date':
        default:
          return '请选择日期';
      }
    };

    return (
      <View className={styles.container()}>
        {label && (
          <View className="flex-row">
            <Text
              testID={testID ? `${testID}-label` : undefined}
              className={styles.label()}
            >
              {label}
            </Text>
            <Text className={styles.label() + ' text-red-500'}>
              {require && '*'}
            </Text>
          </View>
        )}
        <View className={styles.pickerContainer()}>
          <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.7}
            className={styles.picker()}
            onPress={() => {
              if (!disabled) {
                setIsFocussed(true);
              }
            }}
            style={StyleSheet.flatten([
              ...(error
                ? [
                    {
                      shadowColor: 'rgba(239,68,68,0.7)', // 红色阴影 (tailwind red-500)
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.7,
                      shadowRadius: 6,
                      elevation: 8,
                    },
                  ]
                : isFocussed
                  ? [
                      {
                        shadowColor: 'rgba(84,62,248,0.7)', // 紫色阴影
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.7,
                        shadowRadius: 6,
                        elevation: 8,
                      },
                    ]
                  : []),
            ])}
          >
            <DatePicker
              ref={ref}
              value={value || new Date()}
              mode={mode}
              format={getFormat()}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
            >
              {value ? (
                <Text className={styles.valueText()}>
                  {formatDateValue(value, mode)}
                </Text>
              ) : (
                <Text
                  className={styles.valueText()}
                  style={{ color: colors.neutral[400] }}
                >
                  {getPlaceholder()}
                </Text>
              )}
            </DatePicker>
          </TouchableOpacity>
        </View>
        {error && (
          <Text
            testID={testID ? `${testID}-error` : undefined}
            className="text-sm text-danger-400 dark:text-danger-600"
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);

DatePickerInput.displayName = 'DatePickerInput';

/**
 * 与 react-hook-form 集成的受控日期选择器组件
 *
 * 自动处理表单字段的值管理、验证和错误显示
 *
 * @component
 * @example
 * import { useForm } from 'react-hook-form';
 *
 * interface FormData {
 *   birthDate: Date;
 *   appointmentTime: Date;
 * }
 *
 * function MyForm() {
 *   const { control } = useForm<FormData>();
 *
 *   return (
 *     <>
 *       <ControlledDatePicker
 *         name="birthDate"
 *         control={control}
 *         label="出生日期"
 *         mode="date"
 *         rules={{ required: '请选择出生日期' }}
 *       />
 *
 *       <ControlledDatePicker
 *         name="appointmentTime"
 *         control={control}
 *         label="预约时间"
 *         mode="datetime"
 *       />
 *     </>
 *   );
 * }
 */
export function ControlledDatePicker<T extends FieldValues>(
  props: ControlledDatePickerProps<T>
) {
  const { name, control, rules, ...datePickerProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <DatePickerInput
      ref={field.ref}
      value={field.value}
      onChange={(date) => field.onChange(date)}
      {...datePickerProps}
      error={fieldState.error?.message}
    />
  );
}
