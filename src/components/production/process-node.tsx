import React from 'react';

import { Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';

/**
 * 工序流程节点组件属性
 * @property icon - 节点图标名称
 * @property label - 节点标签文本
 * @property status - 节点状态：已完成(completed)、进行中(inProgress)、待开始(pending)
 */
type ProcessNodeProps = {
  icon: string;
  label: string;
  status: 'completed' | 'inProgress' | 'pending';
};

/**
 * 工序流程节点组件
 * 用于显示生产流程中的各个工序节点及其状态
 */
export const ProcessNode: React.FC<ProcessNodeProps> = ({
  icon,
  label,
  status,
}) => {
  // 根据状态设置不同的图标、文本和颜色
  let statusIcon = null;
  let statusText = '';
  let bgColor = '#ebf5ff';
  let iconColor = '#0066ff';

  if (status === 'completed') {
    // 已完成状态
    statusIcon = (
      <View className="absolute -right-1 -top-1 size-6 items-center justify-center rounded-full bg-green-500">
        <FontAwesome name="check" size={10} color="white" />
      </View>
    );
    statusText = '已完成';
    bgColor = '#ebf5ff';
  } else if (status === 'inProgress') {
    // 进行中状态
    statusIcon = (
      <View className="absolute -right-1 -top-1 size-6 items-center justify-center rounded-full bg-blue-600">
        <FontAwesome name="spinner" size={10} color="white" />
      </View>
    );
    statusText = '进行中';
    bgColor = '#dcfce7';
    iconColor = '#22c55e';
  } else {
    // 待开始状态
    statusText = '待开始';
  }

  return (
    <View className="mx-2 w-16 items-center">
      {/* 节点圆圈 - 包含图标和状态指示器 */}
      <View
        className="relative mb-2 size-16 items-center justify-center rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        {icon === 'box' ? (
          <FontAwesome
            name={icon as any}
            size={20}
            color={iconColor}
            group={GroupEnum.Entypo}
          />
        ) : (
          <FontAwesome name={icon as any} size={20} color={iconColor} />
        )}

        {statusIcon}
      </View>
      {/* 节点标签 */}
      <Text className="mb-0.5 text-xs font-medium">{label}</Text>
      {/* 节点状态文本 - 根据状态显示不同颜色 */}
      <Text
        className={`text-xs ${status === 'inProgress' ? 'text-blue-600' : 'text-gray-500'}`}
      >
        {statusText}
      </Text>
    </View>
  );
};
