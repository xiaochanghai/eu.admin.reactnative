import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

export type WorkOrderStatus =
  | 'Wait'
  | 'processing'
  | 'review'
  | 'completed'
  | 'all';

export type WorkOrder = {
  id: string;
  status?: WorkOrderStatus;
  statusLabel: string;
  statusColor: string;
  title: string;
  equipmentName: string;
  description: string;
  assignee: string;
  timeAgo: string;
  deadline?: string;
};

type WorkOrderCardProps = {
  order: WorkOrder;
  onPress: () => void;
};

export const WorkOrderCard: React.FC<WorkOrderCardProps> = ({
  order,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="mb-3 rounded-xl bg-white p-4 shadow-sm dark:bg-neutral-800"
  >
    <View className="mb-3 flex-1">
      <View className="mb-2 flex-row items-center">
        <View
          className="mr-2 rounded px-2 py-1"
          style={{ backgroundColor: order.statusColor }}
        >
          <Text className="text-xs font-semibold text-white">
            {order.statusLabel}
          </Text>
        </View>
        <Text
          className="flex-1 text-base font-semibold text-gray-800 dark:text-gray-100"
          numberOfLines={1}
        >
          {order.title}
        </Text>
      </View>
      <Text className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        设备：{order.equipmentName}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400">
        故障描述：{order.description}
      </Text>
    </View>

    <View className="flex-row items-center justify-between border-t border-gray-100 pt-3 dark:border-neutral-700">
      <View className="flex-row items-center space-x-4">
        <View className="flex-row items-center">
          <FontAwesome name="user" size={12} color="#9ca3af" />
          <Text className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            {order.assignee}
          </Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome name="clock-o" size={12} color="#9ca3af" />
          <Text className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            {order.timeAgo}
          </Text>
        </View>
      </View>
      {order.deadline && (
        <Text
          className="text-sm font-semibold"
          style={{ color: order.statusColor }}
        >
          {order.deadline}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);
