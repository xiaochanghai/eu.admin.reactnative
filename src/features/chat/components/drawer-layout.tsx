import * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Keyboard, Pressable, useWindowDimensions } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import colors from '@/components/ui/colors';
import { useAppColorScheme } from '@/lib/hooks';

const APP_BAR_WIDTH = 56;
const MAX_DRAWER_WIDTH = 360;
const SWIPE_EDGE_WIDTH = 32;
const SWIPE_MIN_OFFSET = 5;
const SWIPE_MIN_DISTANCE = 60;
const SWIPE_MIN_VELOCITY = 500;

type DrawerLayoutProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  drawerContent: ReactNode;
  children: ReactNode;
};

function clamp(value: number, start: number, end: number) {
  'worklet';
  return Math.min(Math.max(value, start), end);
}

function dismissKeyboard() {
  Keyboard.dismiss();
}

export function DrawerLayout({
  open,
  onOpen,
  onClose,
  drawerContent,
  children,
}: DrawerLayoutProps) {
  const { isDark } = useAppColorScheme();
  const { width } = useWindowDimensions();
  const drawerWidth = Math.min(MAX_DRAWER_WIDTH, width - APP_BAR_WIDTH);
  const translationX = useSharedValue(open ? 0 : -drawerWidth);
  const startX = useSharedValue(0);
  const openValue = useSharedValue(open);

  const finish = useCallback(
    (nextOpen: boolean) => {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (nextOpen) {
        dismissKeyboard();
        onOpen();
      } else {
        onClose();
      }
    },
    [onClose, onOpen]
  );

  const settle = useCallback(
    (nextOpen: boolean, velocity = 0) => {
      'worklet';
      translationX.value = withSpring(nextOpen ? 0 : -drawerWidth, {
        velocity,
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
      });
    },
    [drawerWidth, translationX]
  );

  useEffect(() => {
    openValue.value = open;
    settle(open);
    if (open) dismissKeyboard();
  }, [open, openValue, settle]);

  const pan = useMemo(() => {
    const gesture = Gesture.Pan()
      .onBegin(() => {
        'worklet';
        startX.value = translationX.value;
      })
      .onStart(() => {
        'worklet';
        runOnJS(dismissKeyboard)();
      })
      .onChange((event) => {
        'worklet';
        translationX.value = clamp(
          startX.value + event.translationX,
          -drawerWidth,
          0
        );
      })
      .onEnd((event) => {
        'worklet';
        const movedFarEnough =
          Math.abs(event.translationX) > SWIPE_MIN_DISTANCE;
        const movedFastEnough =
          Math.abs(event.translationX) > SWIPE_MIN_OFFSET &&
          Math.abs(event.velocityX) > SWIPE_MIN_VELOCITY;
        const direction =
          event.velocityX === 0 ? event.translationX : event.velocityX;
        const nextOpen =
          movedFarEnough || movedFastEnough ? direction > 0 : openValue.value;

        settle(nextOpen, event.velocityX);
        runOnJS(finish)(nextOpen);
      })
      .activeOffsetX([-SWIPE_MIN_OFFSET, SWIPE_MIN_OFFSET])
      .failOffsetY([-SWIPE_MIN_OFFSET, SWIPE_MIN_OFFSET]);

    if (!open) gesture.hitSlop({ left: 0, width: SWIPE_EDGE_WIDTH });
    return gesture;
  }, [drawerWidth, finish, open, openValue, settle, startX, translationX]);

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value + drawerWidth }],
  }));
  const drawerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(translationX.value, [-drawerWidth, 0], [0.95, 1]),
      },
    ],
  }));
  const overlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translationX.value, [-drawerWidth, 0], [0, 1]),
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={{
            flex: 1,
            overflow: 'hidden',
            backgroundColor: colors.neutral[isDark ? 800 : 100],
          }}
        >
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: drawerWidth,
              },
              drawerStyle,
            ]}
          >
            {drawerContent}
          </Animated.View>
          <Animated.View
            style={[
              {
                flex: 1,
                overflow: 'hidden',
                backgroundColor: colors.neutral[isDark ? 900 : 50],
              },
              contentStyle,
            ]}
          >
            {children}
            <Animated.View
              pointerEvents={open ? 'auto' : 'none'}
              style={[
                {
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
                overlayStyle,
              ]}
            >
              <Pressable
                accessibilityLabel="Close drawer"
                accessibilityRole="button"
                className="flex-1"
                onPress={onClose}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
