import React from 'react';

import { View } from '@/components/ui';

/**
 * 进度条组件
 * 用于显示完成百分比的可视化进度条
 * @param progress - 进度百分比（0-100）
 * @param color - 进度条颜色
 */
type ProgressBarProps = {
  progress: number;
  color: string;
};

/**
 * 进度条组件
 * 根据传入的进度百分比和颜色显示一个水平进度条
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
}) => (
  <View className="h-1.5 overflow-hidden rounded bg-gray-200">
    <View
      className="h-full rounded"
      style={{
        width: `${progress}%`,
        backgroundColor: color,
      }}
    />
  </View>
);
