import { BlurView, type BlurViewProps } from 'expo-blur';
import React from 'react';
import { StyleSheet } from 'react-native';

export function BlurRaw(props: BlurViewProps) {
  return <BlurView {...props} style={[StyleSheet.absoluteFill, props.style]} />;
}
