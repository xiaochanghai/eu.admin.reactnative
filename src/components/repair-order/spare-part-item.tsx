import { Text, View } from '../ui';

// 备件项组件
type SparePartItemProps = {
  name: string;
  model: string;
  quantity: number;
  price: string;
};

export const SparePartItem: React.FC<SparePartItemProps> = ({
  name,
  model,
  quantity,
  price,
}) => (
  <View className="mb-3 flex-row items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-neutral-700/50">
    <View>
      <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {name}
      </Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400">
        型号：{model}
      </Text>
    </View>
    <View className="items-end">
      <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        ×{quantity}
      </Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400">{price}</Text>
    </View>
  </View>
);
