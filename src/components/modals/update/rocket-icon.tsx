import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

// 火箭图标组件 - 优化版本
const RocketIcon = () => {
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);
  const flameOpacity = useSharedValue(1);
  const flameScale = useSharedValue(1);

  React.useEffect(() => {
    // 火箭轻微摇摆动画 - 更自然的摆动
    rotation.value = withRepeat(
      withTiming(8, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );

    // 火箭上下浮动动画 - 营造飞行效果
    translateY.value = withRepeat(
      withTiming(-15, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // 火焰闪烁透明度动画
    flameOpacity.value = withRepeat(
      withTiming(0.6, { duration: 400, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // 火焰缩放动画
    flameScale.value = withRepeat(
      withTiming(1.2, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [flameOpacity, flameScale, rotation, translateY]);

  const rocketAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const flameAnimatedStyle = useAnimatedStyle(() => ({
    opacity: flameOpacity.value,
    transform: [
      { scaleY: flameScale.value },
      { scaleX: interpolate(flameScale.value, [1, 1.2], [1, 0.95]) },
    ],
  }));

  return (
    <View className="items-center justify-center">
      <Animated.View style={rocketAnimatedStyle}>
        <Svg width={100} height={120} viewBox="0 0 100 120" fill="none">
          {/* 火箭主体 - 使用渐变色效果 */}
          <Path
            d="M50 10 C56 10, 62 16, 62 26 L62 70 C62 74, 58 78, 54 78 L46 78 C42 78, 38 74, 38 70 L38 26 C38 16, 44 10, 50 10 Z"
            fill="#F3F4F6"
          />

          {/* 火箭主体阴影 */}
          <Path
            d="M50 15 C53 15, 55 18, 55 23 L55 70 C55 72, 53 74, 51 74 L49 74 C47 74, 45 72, 45 70 L45 23 C45 18, 47 15, 50 15 Z"
            fill="#E5E7EB"
            opacity="0.5"
          />

          {/* 火箭头部 - 更锐利的设计 */}
          <Path
            d="M50 3 C54 3, 58 6, 60 12 L60 26 L40 26 L40 12 C42 6, 46 3, 50 3 Z"
            fill="#FFFFFF"
          />

          {/* 火箭头部高光 */}
          <Path
            d="M50 8 C52 8, 54 10, 55 14 L55 22 L45 22 L45 14 C46 10, 48 8, 50 8 Z"
            fill="#F9FAFB"
            opacity="0.8"
          />

          {/* 火箭窗口 - 更大更明显 */}
          <Path
            d="M50 22 C55 22, 58 25, 58 30 C58 35, 55 38, 50 38 C45 38, 42 35, 42 30 C42 25, 45 22, 50 22 Z"
            fill="#3B82F6"
          />

          {/* 窗口内部反光 */}
          <Path
            d="M50 24 C53 24, 55 26, 55 29 C55 32, 53 34, 50 34 C47 34, 45 32, 45 29 C45 26, 47 24, 50 24 Z"
            fill="#60A5FA"
          />

          {/* 窗口高光 */}
          <Path
            d="M48 26 C49 26, 50 27, 50 28 C50 29, 49 30, 48 30 C47 30, 46 29, 46 28 C46 27, 47 26, 48 26 Z"
            fill="#DBEAFE"
          />

          {/* 火箭装饰线条 */}
          <Path
            d="M40 45 L60 45"
            stroke="#D1D5DB"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <Path
            d="M42 55 L58 55"
            stroke="#D1D5DB"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* 左翼 - 更立体的设计 */}
          <Path d="M38 55 L30 68 L38 75 L38 55 Z" fill="#EF4444" />
          <Path d="M38 58 L33 68 L38 72 L38 58 Z" fill="#DC2626" />

          {/* 右翼 */}
          <Path d="M62 55 L70 68 L62 75 L62 55 Z" fill="#EF4444" />
          <Path d="M62 58 L67 68 L62 72 L62 58 Z" fill="#DC2626" />

          {/* 翼部高光 */}
          <Path d="M38 57 L35 63 L38 67 Z" fill="#F87171" opacity="0.6" />
          <Path d="M62 57 L65 63 L62 67 Z" fill="#F87171" opacity="0.6" />
        </Svg>

        {/* 火焰效果 - 独立的动画层 */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: -20,
              left: 0,
              right: 0,
              alignItems: 'center',
            },
            flameAnimatedStyle,
          ]}
        >
          <Svg width={60} height={50} viewBox="0 0 60 50" fill="none">
            {/* 外层火焰 - 红色 */}
            <Path
              d="M20 5 L15 20 C14 25, 15 30, 18 35 L22 42 L28 30 L30 15 L28 5 Z"
              fill="#EF4444"
            />
            <Path
              d="M40 5 L45 20 C46 25, 45 30, 42 35 L38 42 L32 30 L30 15 L32 5 Z"
              fill="#EF4444"
            />

            {/* 中层火焰 - 橙色 */}
            <Path
              d="M23 8 L20 20 C19 24, 20 28, 22 32 L25 38 L28 28 L30 15 L28 8 Z"
              fill="#F97316"
            />
            <Path
              d="M37 8 L40 20 C41 24, 40 28, 38 32 L35 38 L32 28 L30 15 L32 8 Z"
              fill="#F97316"
            />

            {/* 内层火焰 - 黄色 */}
            <Path
              d="M26 10 L24 20 C23 23, 24 26, 26 29 L28 33 L30 25 L30 15 L28 10 Z"
              fill="#FBBF24"
            />
            <Path
              d="M34 10 L36 20 C37 23, 36 26, 34 29 L32 33 L30 25 L30 15 L32 10 Z"
              fill="#FBBF24"
            />

            {/* 火焰核心 - 白色 */}
            <Path
              d="M28 15 L27 22 C26 24, 27 26, 28 28 L30 30 L32 28 C33 26, 34 24, 33 22 L32 15 Z"
              fill="#FEF3C7"
            />
          </Svg>
        </Animated.View>
      </Animated.View>
    </View>
  );
};
export default RocketIcon;
