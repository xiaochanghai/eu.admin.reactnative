import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/ui';

type InventoryItemProps = {
  name: string;
  code: string;
  quantity: number;
  safetyStock: number;
  status: 'normal' | 'warning' | 'danger';
  onViewDetail?: () => void;
};

const Item = ({
  name,
  code,
  quantity,
  safetyStock,
  status,
  onViewDetail,
}: InventoryItemProps) => {
  let indicatorColor = '#22c55e'; // 绿色 - 正常
  let textColor = 'text-black dark:text-gray-100';

  if (status === 'warning') {
    indicatorColor = '#eab308'; // 黄色 - 警告
  } else if (status === 'danger') {
    indicatorColor = '#ef4444'; // 红色 - 危险
    textColor = 'text-red-500 dark:text-red-400';
  }

  return (
    <TouchableOpacity onPress={onViewDetail}>
      <View className="flex-row justify-between border-b border-gray-100 py-3 dark:border-neutral-700">
        <View className="flex-1">
          <View className="flex-row items-center">
            <View
              className="mr-2 size-2 rounded-full"
              style={{ backgroundColor: indicatorColor }}
            />
            <Text className="text-base font-medium dark:text-gray-100">{name}</Text>
          </View>
          <Text className="text-sm text-gray-500 dark:text-gray-400">编号：{code}</Text>
        </View>
        <View className="items-end">
          <Text
            className={`text-lg font-bold ${textColor}`}
          >
            {quantity}
          </Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">安全库存：{safetyStock}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

