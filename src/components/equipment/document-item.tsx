import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

export type DocumentItemProps = {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  title: string;
  size: string;
  date: string;
  onPress: () => void;
};

export const DocumentItem: React.FC<DocumentItemProps> = ({
  icon,
  iconColor,
  iconBgColor,
  title,
  size,
  date,
  onPress,
}) => (
  <TouchableOpacity
    className="mb-3 flex-row items-center rounded-lg border border-gray-200 p-3 dark:border-neutral-700"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      className="mr-3 size-10 items-center justify-center rounded-lg"
      style={{ backgroundColor: iconBgColor }}
    >
      <FontAwesome name={icon as any} size={18} color={iconColor} />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400">
        {size} · {date}
      </Text>
    </View>
    <FontAwesome name="download" size={16} color="#1890ff" />
  </TouchableOpacity>
);
