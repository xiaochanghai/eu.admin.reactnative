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
    className={`flex-row items-start justify-between py-3.5 ${!isLast ? 'border-b border-gray-100 dark:border-neutral-800' : ''}`}
  >
    <Text className="mr-6 text-sm text-gray-500 dark:text-gray-400">
      {label}
    </Text>
    <Text className="flex-1 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
      {value || '—'}
    </Text>
  </View>
);
