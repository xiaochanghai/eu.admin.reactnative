import { TouchableOpacity, View } from 'react-native';

import colors from '@/components/ui/colors';

import { Text } from '../ui';
import { FontAwesome } from '../ui/icons';

// 单选按钮组件
type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: string;
  color?: string;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onPress,
  icon,
  color = colors.primary[600],
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center rounded-xl border-2 p-3 ${selected ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800'}`}
    activeOpacity={0.7}
  >
    {icon && (
      <View
        className="mr-2 size-6 items-center justify-center"
        style={{ opacity: selected ? 1 : 0.5 }}
      >
        <FontAwesome name={icon as any} size={16} color={color} />
      </View>
    )}
    <Text
      className={`text-sm ${selected ? 'font-semibold text-gray-800 dark:text-gray-100' : 'text-gray-700 dark:text-gray-400'}`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
