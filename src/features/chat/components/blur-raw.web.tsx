import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

export function BlurRaw(props: ViewProps) {
  return (
    <View
      {...props}
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: 'rgba(255,255,255,0.88)' },
        props.style,
      ]}
    />
  );
}
