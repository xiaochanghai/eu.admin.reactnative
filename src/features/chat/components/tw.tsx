import { cssInterop } from 'nativewind';
import { KeyboardGestureArea as NativeKeyboardGestureArea } from 'react-native-keyboard-controller';

export const KeyboardGestureArea = cssInterop(NativeKeyboardGestureArea, {
  className: { target: 'style' },
});
