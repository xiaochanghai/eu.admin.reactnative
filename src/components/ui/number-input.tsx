import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import {
  I18nManager,
  StyleSheet,
  TextInput as NTextInput,
  View,
} from 'react-native';
import { tv } from 'tailwind-variants';

import colors from './colors';
import { Text } from './text';

const numberInputTv = tv({
  slots: {
    container: 'mb-2',
    label: 'mb-1 text-lg text-gray-600 dark:text-neutral-100',
    input:
      'mt-0 w-full rounded-lg border-[0.5px] border-neutral-300 bg-white px-4 py-3 text-lg leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white',
    inputContainer: 'relative w-full flex-row items-center ',
    rightElement: 'absolute right-3 z-10',
  },

  variants: {
    focused: {
      true: {
        input: 'border-2 border-[#543EF8] shadow-[0_4px_12px_rgba(84,62,248,0.7)]',
      },
    },
    error: {
      true: {
        input: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'bg-neutral-200',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export interface NumberInputProps extends Omit<TextInputProps, 'keyboardType'> {
  label?: string;
  disabled?: boolean;
  require?: boolean;
  error?: string;
  rightElement?: React.ReactNode;
  min?: number;
  max?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
}

type TRule<T extends FieldValues> =
  | Omit<
    RegisterOptions<T>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  | undefined;

type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type NumberInputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

interface ControlledNumberInputProps<T extends FieldValues>
  extends NumberInputProps,
  NumberInputControllerType<T> { }

export const NumberInput = React.forwardRef<NTextInput, NumberInputProps>(
  (props, ref) => {
    const {
      label,
      error,
      testID,
      rightElement,
      require,
      min,
      max,
      allowDecimals = true,
      allowNegative = false,
      onChangeText,
      value,
      ...inputProps
    } = props;

    const [isFocussed, setIsFocussed] = React.useState(false);
    const onBlur = React.useCallback(() => setIsFocussed(false), []);
    const onFocus = React.useCallback(() => setIsFocussed(true), []);

    const styles = React.useMemo(
      () =>
        numberInputTv({
          error: Boolean(error),
          focused: isFocussed,
          disabled: Boolean(props.disabled),
        }),
      [error, isFocussed, props.disabled]
    );

    const handleChangeText = React.useCallback(
      (text: string) => {
        // 移除非数字字符，保留小数点和负号
        let cleanedText = text.replace(/[^\d.-]/g, '');

        // 处理负数
        if (!allowNegative) {
          cleanedText = cleanedText.replace(/-/g, '');
        }

        // 处理小数
        if (!allowDecimals) {
          cleanedText = cleanedText.replace(/\./g, '');
        } else {
          // 确保只有一个小数点
          const parts = cleanedText.split('.');
          if (parts.length > 2) {
            cleanedText = parts[0] + '.' + parts.slice(1).join('');
          }
        }

        // 转换为数字进行验证
        const numValue = parseFloat(cleanedText);

        // 验证最小值和最大值
        if (!isNaN(numValue)) {
          if (min !== undefined && numValue < min) {
            return; // 如果低于最小值则不更新
          }
          if (max !== undefined && numValue > max) {
            return; // 如果高于最大值则不更新
          }
        }

        // 处理空字符串或单个负号
        if (cleanedText === '' || cleanedText === '-') {
          onChangeText?.(cleanedText);
          return;
        }

        // 只允许有效数字
        if (!isNaN(numValue) || cleanedText === '') {
          onChangeText?.(cleanedText);
        }
      },
      [onChangeText, min, max, allowDecimals, allowNegative]
    );

    const keyboardType = allowDecimals ? 'decimal-pad' : 'numeric';

    return (
      <View className={styles.container()}>
        {label && (
          <View className="flex-row ">
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
        <View className={styles.inputContainer()}>
          <NTextInput
            testID={testID}
            ref={ref}
            placeholderTextColor={colors.neutral[400]}
            className={styles.input()}
            onBlur={onBlur}
            onFocus={onFocus}
            keyboardType={keyboardType}
            onChangeText={handleChangeText}
            value={value}
            {...inputProps}
            style={StyleSheet.flatten([
              { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
              { textAlign: I18nManager.isRTL ? 'right' : 'left' },
              inputProps.style,
              { fontSize: 16, lineHeight: 19 },
              ...(error
                ? [
                  {
                    shadowColor: 'rgba(239,68,68,0.7)',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.7,
                    shadowRadius: 6,
                    elevation: 8,
                  },
                ]
                : isFocussed
                  ? [
                    {
                      shadowColor: 'rgba(84,62,248,0.7)',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.7,
                      shadowRadius: 6,
                      elevation: 8,
                    },
                  ]
                  : []),
            ])}
          />
          {rightElement && (
            <View className={styles.rightElement()}>{rightElement}</View>
          )}
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

// 仅用于 react-hook-form
export function ControlledNumberInput<T extends FieldValues>(
  props: ControlledNumberInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <NumberInput
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
