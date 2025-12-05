import * as React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { View } from 'react-native';

import { type PhotoItem, PhotoPickerGrid } from './photo-picker-grid';
import { Text } from './text';

export interface ControlledPhotoPickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  maxCount?: number;
  columns?: number;
  allowCamera?: boolean;
  disabled?: boolean;
  require?: boolean;
  testID?: string;
}

export function ControlledPhotoPicker<T extends FieldValues>({
  name,
  control,
  label,
  maxCount = 9,
  columns = 3,
  allowCamera = true,
  disabled = false,
  require = false,
  testID,
}: ControlledPhotoPickerProps<T>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <View className="mb-4">
      <PhotoPickerGrid
        label={label}
        value={(value as PhotoItem[]) || []}
        onChange={onChange}
        maxCount={maxCount}
        columns={columns}
        allowCamera={allowCamera}
        disabled={disabled}
        require={require}
        testID={testID}
      />
      {error && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {error.message}
        </Text>
      )}
    </View>
  );
}
