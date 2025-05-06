import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

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
      style={[styles.settingItem, isLast && styles.settingItemLast]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      {/* 左侧内容区域 */}
      <View style={styles.settingItemLeft}>
        <View style={[styles.settingIcon, { backgroundColor: iconBgColor }]}>
          <FontAwesome name={icon} size={18} color="white" />
        </View>
        <View>
          <Text style={styles.settingTitle}>{tx ? translate(tx) : title}</Text>
          {(subtitle || subtx) && (
            <Text style={styles.settingSubtitle}>
              {subtx ? translate(subtx) : subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* 右侧功能区域 */}
      {hasToggle && (
        <Switch
          trackColor={{ false: '#e5e7eb', true: '#0066ff' }}
          thumbColor="#ffffff"
          ios_backgroundColor="#e5e7eb"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      )}

      {hasNavigation && (
        <FontAwesome name="chevron-right" size={14} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );
};

// 样式定义
const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
});

export default SettingItem;
