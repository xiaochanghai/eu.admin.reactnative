import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

// 报表项组件
type ReportItemProps = {
  icon: string;
  iconColor: string;
  title: string;
  date: string;
  onPress: () => void;
};

export const ReportItem: React.FC<ReportItemProps> = ({
  icon,
  iconColor,
  title,
  date,
  onPress,
}) => {
  const { isDark } = useAppColorScheme();

  return (
    <View className="mb-2 flex-row items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
      <View className="flex-row items-center">
        <FontAwesome
          name={icon}
          size={20}
          color={iconColor}
          style={{ marginRight: 12 }}
        />
        <View>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</Text>
          <Text className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{date}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <FontAwesome name="download" size={16} color={isDark ? '#60a5fa' : '#0066ff'} />
      </TouchableOpacity>
    </View>
  );
};
