import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome as FontAwesomeIcon,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import React from 'react';
import { type StyleProp, type TextStyle } from 'react-native';

/**
 * 图标组类型枚举
 * 用于指定使用哪个图标库
 */
export enum GroupEnum {
  FontAwesome = 'FontAwesome',
  Entypo = 'Entypo',
  FontAwesome5 = 'FontAwesome5',
  EvilIcons = 'EvilIcons',
  AntDesign = 'AntDesign',
  MaterialCommunityIcons = 'MaterialCommunityIcons',
  Feather = 'Feather',
}

/**
 * 图标组类型
 * 用于限制可用的图标库类型
 */
export type IconGroup =
  | GroupEnum.Entypo
  | GroupEnum.FontAwesome5
  | GroupEnum.FontAwesome
  | GroupEnum.EvilIcons
  | GroupEnum.AntDesign
  | GroupEnum.MaterialCommunityIcons
  | GroupEnum.Feather;

/**
 * 各图标库的图标名称类型
 * 用于提供更好的类型检查
 */
type EntypoIconNames = React.ComponentProps<typeof Entypo>['name'];
type FontAwesome5IconNames = React.ComponentProps<typeof FontAwesome5>['name'];
type FontAwesomeIconNames = React.ComponentProps<
  typeof FontAwesomeIcon
>['name'];
type EvilIconsNames = React.ComponentProps<typeof EvilIcons>['name'];
type AntDesignIconNames = React.ComponentProps<typeof AntDesign>['name'];
type FeatherIconNames = React.ComponentProps<typeof Feather>['name'];
type MaterialCommunityIconNames = React.ComponentProps<
  typeof MaterialCommunityIcons
>['name'];

/**
 * 统一的图标名称类型
 * 包含所有支持的图标库的图标名称
 */
type IconName =
  | EntypoIconNames
  | FontAwesome5IconNames
  | FontAwesomeIconNames
  | EvilIconsNames
  | AntDesignIconNames
  | string; // 保留string类型以兼容可能的自定义图标

/**
 * FontAwesome图标组件的属性接口
 * @property {IconName} name - 图标名称
 * @property {number} [size=24] - 图标大小，默认为24
 * @property {string} [color] - 图标颜色
 * @property {StyleProp<TextStyle>} [style] - 自定义样式，使用React Native的样式类型
 * @property {string} [className] - 自定义CSS类名，用于Tailwind样式
 * @property {Group} [group] - 指定图标组，不指定时会自动判断
 */
type FontAwesomeIconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>; // 修改为React Native的样式类型
  className?: string;
  group?: IconGroup;
};

/**
 * FontAwesome5专用图标列表
 * 当图标名称在此列表中时，将自动使用FontAwesome5库
 */
const FA5_ICONS: string[] = [
  // 基础图标
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
 * 组件会按照以下优先级选择图标库：
 * 1. 如果图标名称在FA5_ICONS列表中，使用FontAwesome5
 * 2. 如果指定了group参数，使用指定的图标库
 * 3. 默认使用FontAwesome
 *
 * @example
 * // 基本用法
 * <FontAwesome name="user" size={20} color="#333" />
 *
 * // 使用className设置Tailwind样式
 * <FontAwesome name="user" className="text-blue-500" />
 *
 * // 指定图标组
 * <FontAwesome name="chevron-thin-right" group={GroupEnum.Entypo} />
 *
 * // 在不同场景下使用
 * <FontAwesome name="cogs" size={16} color="gray" /> // 自动使用FontAwesome5
 * <FontAwesome name="bell" size={16} /> // 自动使用FontAwesome
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
  // 创建通用的图标属性
  const iconProps = {
    size,
    color,
    style,
    className,
  };

  // 优先根据图标名称自动判断图标库
  if (isFA5Icon(name)) {
    return <FontAwesome5 name={name as FontAwesome5IconNames} {...iconProps} />;
  }

  // 其次根据指定的组类型选择图标库
  switch (group) {
    case GroupEnum.Entypo:
      return <Entypo name={name as EntypoIconNames} {...iconProps} />;
    case GroupEnum.FontAwesome5:
      return (
        <FontAwesome5 name={name as FontAwesome5IconNames} {...iconProps} />
      );
    case GroupEnum.EvilIcons:
      return <EvilIcons name={name as EvilIconsNames} {...iconProps} />;
    case GroupEnum.AntDesign:
      return <AntDesign name={name as AntDesignIconNames} {...iconProps} />;
    case GroupEnum.Feather:
      return <Feather name={name as FeatherIconNames} {...iconProps} />;

    case GroupEnum.MaterialCommunityIcons:
      return (
        <MaterialCommunityIcons
          name={name as MaterialCommunityIconNames}
          {...iconProps}
        />
      );
    default:
      // 默认使用FontAwesome
      return (
        <FontAwesomeIcon name={name as FontAwesomeIconNames} {...iconProps} />
      );
  }
};
