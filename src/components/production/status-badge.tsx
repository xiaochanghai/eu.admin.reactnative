import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/ui';

// 状态徽章组件
type StatusBadgeProps = {
  status: string;
  color: string;
  bgColor: string;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  color,
  bgColor,
}) => (
  <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
    <Text style={[styles.statusBadgeText, { color }]}>{status}</Text>
  </View>
);

const styles = StyleSheet.create({
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
