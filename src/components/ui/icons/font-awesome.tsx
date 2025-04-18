import { FontAwesome as FontAwesomeIcon } from '@expo/vector-icons';
import React from 'react';

type FontAwesomeIconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

/**
 * FontAwesomeIcon组件
 * 封装FontAwesome图标库，提供统一的接口
 * @param name - FontAwesome图标名称
 * @param size - 图标大小，默认为24
 * @param color - 图标颜色，默认为当前文本颜色
 * @param style - 自定义样式
 */
export const FontAwesome: React.FC<FontAwesomeIconProps> = ({
  name,
  size = 24,
  color,
  style,
}) => {
  return (
    <FontAwesomeIcon
      name={name as any}
      size={size}
      color={color}
      style={style}
    />
  );
};
