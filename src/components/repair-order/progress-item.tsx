import { View } from 'react-native';

import { Text } from '../ui';
import { FontAwesome } from '../ui/icons';

// 进度项组件
type ProgressItemProps = {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  time?: string;
  description?: string;
  isCompleted: boolean;
};

export const ProgressItem: React.FC<ProgressItemProps> = ({
  icon,
  iconColor,
  bgColor,
  title,
  time,
  description,
  isCompleted,
}) => (
  <View className="mb-4 flex-row items-start">
    <View
      className="size-8 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: bgColor }}
    >
      <FontAwesome
        name={icon as any}
        size={12}
        color={isCompleted ? 'white' : iconColor}
      />
    </View>
    <View className="ml-3 flex-1">
      <View className="mb-1 flex-row items-center justify-between">
        <Text
          className={`text-sm font-semibold ${isCompleted ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}`}
        >
          {title}
        </Text>
        {time && (
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {time}
          </Text>
        )}
      </View>
      {description && (
        <Text className="text-xs text-gray-600 dark:text-gray-400">
          {description}
        </Text>
      )}
    </View>
  </View>
);
