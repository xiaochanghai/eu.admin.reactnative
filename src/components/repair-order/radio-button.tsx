import { TouchableOpacity, View } from 'react-native';

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
  color = '#1890ff',
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center rounded-lg border-2 p-3 ${selected ? 'border-primary-500 bg-blue-50 dark:bg-blue-950/30' : 'border-gray-200 dark:border-neutral-700'}`}
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
