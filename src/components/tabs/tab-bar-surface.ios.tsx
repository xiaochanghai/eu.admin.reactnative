import { BlurView } from 'expo-blur';
import {
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from 'expo-glass-effect';
import { useTheme } from 'expo-router';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function TabBarSurface({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  const { dark, colors } = useTheme();
  // Start opaque until the user's accessibility preference is known.
  const [reduceTransparency, setReduceTransparency] = useState(true);

  useEffect(() => {
    let active = true;
    let preferenceChanged = false;
    const subscription = AccessibilityInfo.addEventListener(
      'reduceTransparencyChanged',
      (enabled) => {
        preferenceChanged = true;
        setReduceTransparency(enabled);
      }
    );
    AccessibilityInfo.isReduceTransparencyEnabled().then(
      (enabled) => {
        if (active && !preferenceChanged) setReduceTransparency(enabled);
      },
      () => {} // Keep the opaque fallback if the preference cannot be read.
    );
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  let surface;
  if (reduceTransparency) {
    surface = (
      <View style={[styles.capsule, { backgroundColor: colors.card }]}>
        {children}
      </View>
    );
  } else if (isGlassEffectAPIAvailable() && isLiquidGlassAvailable()) {
    surface = (
      <GlassView
        glassEffectStyle="regular"
        colorScheme={dark ? 'dark' : 'light'}
        isInteractive
        style={styles.capsule}
      >
        {children}
      </GlassView>
    );
  } else {
    surface = (
      <BlurView
        intensity={80}
        tint={dark ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight'}
        style={[styles.capsule, styles.blurClip]}
      >
        {children}
      </BlurView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 8),
          paddingLeft: Math.max(insets.left, 12),
          paddingRight: Math.max(insets.right, 12),
        },
      ]}
    >
      {surface}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 8 },
  capsule: {
    minHeight: 62,
    borderRadius: 32,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  blurClip: { overflow: 'hidden' },
});
