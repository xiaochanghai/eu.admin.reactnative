import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@/components/ui/icons';
import type { TxKeyPath } from '@/lib/i18n';
import { translate } from '@/lib/i18n';

/**
 * 设置项组件属性定义
 * @property icon - 图标名称(FontAwesome)
 * @property iconBgColor - 图标背景色
 * @property title - 主标题文本
 * @property subtitle - 副标题文本(可选)
 * @property hasToggle - 是否显示开关(默认false)
 * @property defaultToggleValue - 开关默认状态(默认false)
 * @property onToggleChange - 开关状态变化回调
 * @property hasNavigation - 是否显示导航箭头(默认false)
 * @property onPress - 点击回调函数
 * @property isLast - 是否是列表最后一项(默认false)
 * @property tx - 主标题国际化键值
 * @property subtx - 副标题国际化键值
 */
type SettingItemProps = {
  icon: string;
  iconBgColor: string;
  title?: string;
  subtitle?: string;
  hasToggle?: boolean;
  defaultToggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  hasNavigation?: boolean;
  onPress?: () => void;
  isLast?: boolean;
  tx?: TxKeyPath;
  subtx?: TxKeyPath;
};

/**
 * 设置项组件
 * 一个通用的设置项UI组件，支持图标、标题、开关和导航箭头
 */
const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  iconBgColor,
  title,
  subtitle,
  hasToggle = false,
  defaultToggleValue = false,
  onToggleChange,
  hasNavigation = false,
  onPress,
  isLast = false,
  tx,
  subtx,
}) => {
  // 开关状态管理
  const [isEnabled, setIsEnabled] = useState(defaultToggleValue);

  /**
   * 切换开关状态
   */
  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onToggleChange?.(newValue); // 可选链调用
  };

  return (
    <TouchableOpacity
      // 使用条件类名：基础样式 + 最后一项样式（无底部边框）
      className={`flex-row items-center justify-between py-4 ${isLast ? '' : 'border-b border-[#f0f0f0]'}`}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      {/* 左侧内容区域：图标和文本 */}
      <View className="flex-row items-center">
        {/* 图标容器 */}
        <View
          className="mr-4 size-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: iconBgColor }} // 保留动态背景色
        >
          <FontAwesome name={icon} size={18} color="white" />
        </View>

        {/* 文本内容区域 */}
        <View>
          {/* 主标题 - 优先使用国际化文本 */}
          <Text className="text-base font-medium text-[#333]">
            {tx ? translate(tx) : title}
          </Text>

          {/* 副标题（如果存在） */}
          {(subtitle || subtx) && (
            <Text className="mt-0.5 text-xs text-[#9ca3af]">
              {subtx ? translate(subtx) : subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* 右侧功能区域 */}
      {/* 开关控件（如果启用） */}
      {hasToggle && (
        <Switch
          trackColor={{ false: '#e5e7eb', true: '#0066ff' }}
          thumbColor="#ffffff"
          ios_backgroundColor="#e5e7eb"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      )}

      {/* 导航箭头（如果启用） */}
      {hasNavigation && (
        <FontAwesome name="chevron-right" size={14} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;
