import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

// 工序流程节点组件
type ProcessNodeProps = {
  icon: string;
  label: string;
  status: 'completed' | 'inProgress' | 'pending';
};

export const ProcessNode: React.FC<ProcessNodeProps> = ({
  icon,
  label,
  status,
}) => {
  let statusIcon = null;
  let statusText = '';
  let bgColor = '#ebf5ff';
  let iconColor = '#0066ff';

  if (status === 'completed') {
    statusIcon = (
      <View style={styles.statusIconCompleted}>
        <FontAwesome name="check" size={10} color="white" />
      </View>
    );
    statusText = '已完成';
    bgColor = '#ebf5ff';
  } else if (status === 'inProgress') {
    statusIcon = (
      <View style={styles.statusIconInProgress}>
        <FontAwesome name="spinner" size={10} color="white" />
      </View>
    );
    statusText = '进行中';
    bgColor = '#dcfce7';
    iconColor = '#22c55e';
  } else {
    statusText = '待开始';
  }

  return (
    <View style={styles.processNode}>
      <View style={[styles.processNodeCircle, { backgroundColor: bgColor }]}>
        <FontAwesome name={icon as any} size={20} color={iconColor} />
        {statusIcon}
      </View>
      <Text style={styles.processNodeLabel}>{label}</Text>
      <Text
        style={[
          styles.processNodeStatus,
          status === 'inProgress' ? styles.processNodeStatusInProgress : null,
        ]}
      >
        {statusText}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  processNode: {
    alignItems: 'center',
    width: 64,
    marginHorizontal: 8,
  },
  processNodeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  statusIconCompleted: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIconInProgress: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0066ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  processNodeLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  processNodeStatus: {
    fontSize: 12,
    color: '#6b7280',
  },
  processNodeStatusInProgress: {
    color: '#0066ff',
  },
  processFlowLineCompleted: {
    width: 48,
    height: 2,
    backgroundColor: '#22c55e',
  },
  processFlowLinePending: {
    width: 48,
    height: 2,
    backgroundColor: '#e5e7eb',
  },
});
