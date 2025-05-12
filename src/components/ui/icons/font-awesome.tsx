import {
  Entypo,
  EvilIcons,
  FontAwesome as FontAwesomeIcon,
  FontAwesome5,
} from '@expo/vector-icons';
import React from 'react';

/**
 * 图标组类型枚举
 * 用于指定使用哪个图标库
 */
export enum GroupEnum {
  FontAwesome = 'FontAwesome',
  Entypo = 'Entypo',
  FontAwesome5 = 'FontAwesome5',
  EvilIcons = 'EvilIcons',
}

/**
 * 图标组类型
 * 用于限制可用的图标库类型
 */
type Group =
  | GroupEnum.Entypo
  | GroupEnum.FontAwesome5
  | GroupEnum.FontAwesome
  | GroupEnum.EvilIcons;

/**
 * FontAwesome图标组件的属性接口
 * @property {string} name - 图标名称
 * @property {number} [size=24] - 图标大小
 * @property {string} [color] - 图标颜色
 * @property {React.CSSProperties} [style] - 自定义样式
 * @property {string} [className] - 自定义CSS类名
 * @property {Group} [group] - 指定图标组，不指定时会自动判断
 */
type FontAwesomeIconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string; // 添加className属性
  group?: Group;
};

/**
 * FontAwesome5专用图标列表
 * 当图标名称在此列表中时，将自动使用FontAwesome5库
 */
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
 * @param {string} iconName - 图标名称
 * @returns {boolean} 是否为FontAwesome5图标
 */
const isFA5Icon = (iconName: string): boolean => {
  return FA5_ICONS.includes(iconName);
};

/**
 * 统一的FontAwesome图标组件
 * 根据图标名称或指定的组类型自动选择正确的图标库
 *
 * @example
 * // 基本用法
 * <FontAwesome name="user" size={20} color="#333" />
 *
 * // 使用className设置样式
 * <FontAwesome name="user" className="large-icon" />
 *
 * // 指定图标组
 * <FontAwesome name="chevron-thin-right" group={GroupEnum.Entypo} />
 *
 * @param {FontAwesomeIconProps} props - 组件属性
 * @returns {React.ReactElement} 渲染的图标组件
 */
export const FontAwesome: React.FC<FontAwesomeIconProps> = ({
  name,
  size = 24,
  color,
  style,
  className,
  group,
}) => {
  // 优先根据图标名称自动判断图标库
  if (isFA5Icon(name)) {
    return (
      <FontAwesome5
        name={name}
        size={size}
        color={color}
        style={style}
        className={className}
      />
    );
  }

  // 其次根据指定的组类型选择图标库
  if (group === GroupEnum.Entypo) {
    return (
      <Entypo
        name={name as any}
        size={size}
        color={color}
        style={style as any}
        className={className}
      />
    );
  } else if (group === GroupEnum.FontAwesome5) {
    return (
      <FontAwesome5
        name={name}
        size={size}
        color={color}
        style={style}
        className={className}
      />
    );
  } else if (group === GroupEnum.EvilIcons) {
    return (
      <EvilIcons
        name={name as any}
        size={size}
        color={color}
        style={style as any}
        className={className}
      />
    );
  }

  // 默认使用FontAwesome
  return (
    <FontAwesomeIcon
      name={name as any}
      size={size}
      color={color}
      style={style as any}
      className={className}
    />
  );
};
