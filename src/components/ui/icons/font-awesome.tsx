import { FontAwesome as FontAwesomeIcon } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';

/**
 * FontAwesome图标组件的属性接口
 */
type FontAwesomeIconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

/**
 * 统一的FontAwesome图标组件
 * 自动识别并使用正确的图标库(FontAwesome或FontAwesome5)
 * @param name - 图标名称
 * @param size - 图标大小，默认为24
 * @param color - 图标颜色，默认为当前文本颜色
 * @param style - 自定义样式
 */
// FontAwesome5专用图标列表
const FA5_ICONS = [
  // 原有图标
  'palette',
  'shield-alt',
  'cloud-download-alt',
  'file-alt',
  'user-shield',
  // 项目中使用的其他FA5图标
  'clipboard-list',
  'clipboard-check',
  'exclamation-triangle',
  'boxes',
  'check-circle',
  'chart-line',
  'ellipsis-h',
  'cogs',
  'archive',
  'list',
  'truck',
  'users',
  'bar-chart',
  'plus-circle',
  'spinner',
  'chevron-right',
  'fingerprint',
  'plus',
  'user-edit',
  'headset',
  // 注意：普通FontAwesome图标如'bell', 'search', 'filter', 'qrcode', 'weixin'等
  // 不需要添加到此列表，它们将自动使用FontAwesome库
];

/**
 * 判断图标是否属于FontAwesome5
 * @param iconName - 图标名称
 * @returns 是否为FontAwesome5图标
 */
const isFA5Icon = (iconName: string): boolean => {
  return FA5_ICONS.includes(iconName);
};

/**
 * FontAwesome组件
 * 自动识别图标类型并选择正确的图标库
 * @param name - 图标名称
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
  // 自动判断是否使用FontAwesome5
  if (isFA5Icon(name)) {
    return <FontAwesome5 name={name} size={size} color={color} style={style} />;
  }

  // 默认使用FontAwesome
  return (
    <FontAwesomeIcon
      name={name as any}
      size={size}
      color={color}
      style={style}
    />
  );
};
