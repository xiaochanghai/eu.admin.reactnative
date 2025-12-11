import React from 'react';

import { Text, View } from '@/components/ui';

export type InfoRowProps = {
  label: string;
  value?: string;
  isLast?: boolean;
};

export const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  isLast = false,
}) => (
  <View
    className={`flex-row items-center justify-between py-2 ${!isLast ? 'border-b border-gray-100 dark:border-neutral-700' : ''}`}
  >
    <Text className="text-sm text-gray-500 dark:text-gray-400">{label}</Text>
    <Text className="text-sm font-semibold text-gray-800 dark:text-gray-100">
      {value}
    </Text>
  </View>
);
