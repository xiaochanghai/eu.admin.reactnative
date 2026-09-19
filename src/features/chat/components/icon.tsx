import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import React from 'react';
import { type StyleProp, StyleSheet, type TextStyle } from 'react-native';

function IconBase({
  icon: IconComponent,
  style,
  strokeWidth,
}: {
  icon: LucideIcon;
  style?: StyleProp<TextStyle>;
  strokeWidth?: number;
  className?: string;
}) {
  const flatStyle = StyleSheet.flatten(style) ?? {};
  const size = Number(flatStyle.width ?? flatStyle.height ?? 24);
  const color = String(flatStyle.color ?? 'currentColor');

  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} />;
}

export const Icon = cssInterop(IconBase, {
  className: { target: 'style' },
});
