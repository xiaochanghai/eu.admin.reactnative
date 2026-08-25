import { Ionicons } from '@expo/vector-icons';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import React, { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

export function SymbolImage({
  name,
  fallback,
  size = 20,
  color,
}: {
  name: SymbolViewProps['name'];
  fallback: IoniconName;
  size?: number;
  color: string;
}) {
  if (Platform.OS === 'ios') {
    return (
      <SymbolView
        name={name}
        tintColor={color}
        resizeMode="scaleAspectFit"
        style={{ width: size, height: size }}
      />
    );
  }

  return <Ionicons name={fallback} size={size} color={color} />;
}
