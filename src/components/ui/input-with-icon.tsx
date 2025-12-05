import * as React from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import {
  I18nManager,
  Pressable,
  StyleSheet,
  TextInput as NTextInput,
  View,
} from 'react-native';
import { tv } from 'tailwind-variants';

import colors from './colors';
import { type InputControllerType } from './input';
import { Text } from './text';

const inputTv = tv({
  slots: {
    container: 'mb-4 w-full',
    input:
      'w-full rounded-full border border-neutral-300 bg-white p-4 font-inter text-lg leading-5 text-black focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white',
    inputContainer: 'relative w-full flex-row items-center',
    leftIcon: 'absolute left-4 z-10',
    rightIcon: 'absolute right-4 z-10',
  },
  variants: {
    focused: {
      true: {
        input: 'border border-[#f28b25]',
      }, // 不再设置边框色
    },
    error: {
      true: {
        input: 'border-red-500',
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

export interface InputWithIconProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  disabled?: boolean;
  error?: string;
}
interface ControlledInputWithIconProps<T extends FieldValues>
  extends InputWithIconProps,
  InputControllerType<T> { }

export const InputWithIcon = React.forwardRef<NTextInput, InputWithIconProps>(
  (props, ref) => {
    const {
      leftIcon,
      rightIcon,
      onRightIconPress,
      error,
      testID,
      ...inputProps
    } = props;
    const [isFocussed, setIsFocussed] = React.useState(false);
    const onBlur = React.useCallback(() => setIsFocussed(false), []);
    const onFocus = React.useCallback(() => setIsFocussed(true), []);

    const styles = React.useMemo(
      () =>
        inputTv({
          error: Boolean(error),
          focused: isFocussed,
          disabled: Boolean(props.disabled),
        }),
      [error, isFocussed, props.disabled]
    );

    return (
      <View className={styles.container()}>
        <View className={styles.inputContainer()}>
          {leftIcon && <View className={styles.leftIcon()}>{leftIcon}</View>}
          <NTextInput
            testID={testID}
            ref={ref}
            placeholderTextColor={colors.neutral[400]}
            className={styles.input()}
            onBlur={onBlur}
            onFocus={onFocus}
            style={[
              ...(leftIcon ? [{ paddingLeft: 48 }] : []),
              ...(rightIcon ? [{ paddingRight: 48 }] : []),
              StyleSheet.flatten([
                { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
                { textAlign: I18nManager.isRTL ? 'right' : 'left' },
                inputProps.style,
              ]),
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
                      shadowColor: 'rgba(242, 139, 37,0.7)', // 紫色阴影
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.7,
                      shadowRadius: 6,
                      elevation: 8,
                    },
                  ]
                  : []),
            ]}
            {...inputProps}
          />
          {rightIcon && (
            <Pressable
              className={styles.rightIcon()}
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
            >
              {rightIcon}
            </Pressable>
          )}
        </View>
        {error && (
          <Text
            testID={testID ? `${testID}-error` : undefined}
            className="mt-1 text-sm text-red-500"
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);

// only used with react-hook-form
export function ControlledInputWithIcon<T extends FieldValues>(
  props: ControlledInputWithIconProps<T>
) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <InputWithIcon
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
