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
    <View className="min-h-[64px] flex-row items-center justify-between border-b border-neutral-100 py-3 dark:border-neutral-800">
      <View className="mr-3 flex-1 flex-row items-center">
        <View className="mr-3 size-9 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
          <FontAwesome name={icon} size={17} color={iconColor} />
        </View>
        <View>
          <Text className="text-sm font-semibold text-neutral-900 dark:text-white">
            {title}
          </Text>
          <Text className="mt-1 text-[11px] text-neutral-400">{date}</Text>
        </View>
      </View>
      <TouchableOpacity
        className="size-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/20"
        onPress={onPress}
        activeOpacity={0.65}
      >
        <FontAwesome
          name="download"
          size={16}
          color={isDark ? '#A8A2FF' : '#6D57FF'}
        />
      </TouchableOpacity>
    </View>
  );
};
