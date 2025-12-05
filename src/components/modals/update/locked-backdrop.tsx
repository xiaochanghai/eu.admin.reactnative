import { type BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
// 强制更新时使用的Backdrop：禁用点击关闭
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const renderLockedBackdrop = (props: BottomSheetBackdropProps) => {
  return (
    <AnimatedPressable
      // 屏蔽点击，防止关闭
      onPress={() => {}}
      entering={FadeIn.duration(50)}
      exiting={FadeOut.duration(20)}
      style={[props.style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
      accessibilityLabel="update modal backdrop"
      accessibilityHint="backdrop is locked in forced update"
      accessibilityRole="none"
    />
  );
};
export default renderLockedBackdrop;
