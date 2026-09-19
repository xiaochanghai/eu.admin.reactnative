import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/ui';

export type FilterButtonProps = {
  label: string;
  count: number;
  active: boolean;
  onPress: () => void;
  activeColor?: string;
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  count,
  active,
  onPress,
  activeColor,
}) => (
  <TouchableOpacity
    className={`mr-2 flex-row items-center rounded-full px-3.5 py-2 ${active ? '' : 'bg-gray-100 dark:bg-neutral-700'}`}
    style={active ? { backgroundColor: activeColor || '#3b82f6' } : undefined}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      className={`text-[13px] font-medium ${active ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}
    >
      {label}
    </Text>
    <View
      className={`ml-1.5 min-w-[20px] items-center rounded-full px-1.5 py-0.5 ${active ? 'bg-white/25' : 'bg-gray-200 dark:bg-neutral-600'}`}
      style={
        !active && activeColor
          ? { backgroundColor: `${activeColor}20` }
          : undefined
      }
    >
      <Text
        className={`text-[11px] font-semibold ${active ? 'text-white' : 'text-gray-500'}`}
        style={!active && activeColor ? { color: activeColor } : undefined}
      >
        {count}
      </Text>
    </View>
  </TouchableOpacity>
);
