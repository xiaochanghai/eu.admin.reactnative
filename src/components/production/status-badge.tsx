import React from 'react';

import { Text, View } from '@/components/ui';

/**
 * StatusBadge 组件 - 用于显示状态标签
 *
 * 该组件创建一个圆角标签，用于展示各种状态信息（如：进行中、已完成、待处理等）
 * 支持自定义文本颜色和背景颜色
 */
type StatusBadgeProps = {
  /** 状态文本 */
  status: string;
  /** 文本颜色 */
  color: string;
  /** 背景颜色 */
  bgColor: string;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  color,
  bgColor,
}) => (
  <View className="rounded-full px-2 py-1" style={{ backgroundColor: bgColor }}>
    <Text className="text-xs font-medium" style={{ color }}>
      {status}
    </Text>
  </View>
);
