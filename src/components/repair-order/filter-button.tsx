import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from '@/components/ui';

type FilterButtonProps = {
  label: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  count,
  isActive,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className={`mr-2 rounded-full px-3 py-1.5 ${isActive ? 'bg-primary-500' : 'bg-gray-100 dark:bg-neutral-700'}`}
  >
    <Text
      className={`whitespace-nowrap text-sm ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}
    >
      {label} {count}
    </Text>
  </TouchableOpacity>
);
