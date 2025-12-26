import { View } from 'react-native';

import { Text } from '../ui';
import { FontAwesome } from '../ui/icons';

// 进度项组件
export type ProgressItemProps = {
  Icon: string;
  IconColor: string;
  BgColor: string;
  Title: string;
  DealTime?: string;
  DealDesc?: string;
  IsCompleted: boolean;
};

export const ProgressItem: React.FC<ProgressItemProps> = ({
  Icon,
  IconColor,
  BgColor,
  Title,
  DealTime,
  DealDesc,
  IsCompleted,
}) => (
  <View className="mb-4 flex-row items-start">
    <View
      className="size-8 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: BgColor }}
    >
      <FontAwesome
        name={Icon as any}
        size={12}
        color={IsCompleted ? 'white' : IconColor}
      />
    </View>
    <View className="ml-3 flex-1">
      <View className="mb-1 flex-row items-center justify-between">
        <Text
          className={`text-sm font-semibold ${IsCompleted ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}`}
        >
          {Title}
        </Text>
        {DealTime && (
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {DealTime}
          </Text>
        )}
      </View>
      {DealDesc && (
        <Text className="text-xs text-gray-600 dark:text-gray-400">
          {DealDesc}
        </Text>
      )}
    </View>
  </View>
);
