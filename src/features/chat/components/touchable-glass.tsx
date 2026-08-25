import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import React, { type ReactNode } from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';

import { useAppColorScheme } from '@/lib/hooks';

type TouchableGlassProps = Omit<PressableProps, 'children' | 'style'> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function TouchableGlass({
  children,
  style,
  ...props
}: TouchableGlassProps) {
  const { isDark } = useAppColorScheme();
  const content = <View style={styles.content}>{children}</View>;

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.pressable,
        style,
        pressed && styles.pressed,
      ]}
    >
      {isLiquidGlassAvailable() ? (
        <GlassView
          isInteractive
          glassEffectStyle="regular"
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <BlurView
          intensity={80}
          tint={
            isDark ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight'
          }
          style={StyleSheet.absoluteFill}
        />
      )}
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.72,
  },
  content: {
    zIndex: 1,
  },
});
