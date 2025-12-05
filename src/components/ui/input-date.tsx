import * as React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { tv } from 'tailwind-variants';

import colors from './colors';
import { DatePicker } from './date-picker';
import { type RuleType } from './input';
import { Text } from './text';

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

export interface DatePickerInputProps {
  label?: string;
  disabled?: boolean;
  require?: boolean;
  error?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  testID?: string;
}

export type DatePickerControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

interface ControlledDatePickerProps<T extends FieldValues>
  extends DatePickerInputProps,
  DatePickerControllerType<T> { }

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
      ...restProps
    } = props;
    const [isFocussed, setIsFocussed] = React.useState(false);

    const styles = React.useMemo(
      () =>
        datepickerTv({
          error: Boolean(error),
          focused: isFocussed,
          disabled: Boolean(props.disabled),
        }),
      [error, isFocussed, props.disabled]
    );

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

    // 在组件外部添加这个函数
    const formatDate = (
      date1: Date,
      formatType: 'date' | 'time' | 'datetime'
    ) => {
      // debugger
      let date = new Date(date1);
      if (formatType === 'time') {
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      } else if (formatType === 'datetime') {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      } else {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
            activeOpacity={props.disabled ? 1 : 0.7}
            className={styles.picker()}
            onPress={() => {
              if (!props.disabled) {
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
              disabled={props.disabled}
            >
              {value ? (
                <Text className={styles.valueText()}>
                  {formatDate(value, mode)}
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

// 与 react-hook-form 集成的控制组件
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
