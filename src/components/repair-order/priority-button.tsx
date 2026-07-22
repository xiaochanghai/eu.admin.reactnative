import { TouchableOpacity } from 'react-native';

import { Text } from '../ui';
import { FontAwesome } from '../ui/icons';

// 优先级按钮组件
type PriorityButtonProps = {
  label: string;
  icon: string;
  color: string;
  selected: boolean;
  onPress: () => void;
};

export const PriorityButton: React.FC<PriorityButtonProps> = ({
  label,
  icon,
  color,
  selected,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 items-center justify-center rounded-xl border-2 py-4 ${selected ? '' : 'border-gray-200 dark:border-neutral-700'}`}
    style={
      selected
        ? { borderColor: color, backgroundColor: `${color}10` }
        : undefined
    }
    activeOpacity={0.7}
  >
    <FontAwesome
      name={icon as any}
      size={24}
      color={selected ? color : '#9ca3af'}
    />
    <Text
      className="mt-1 text-sm font-semibold"
      style={{ color: selected ? color : '#9ca3af' }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
