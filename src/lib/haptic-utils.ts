import * as Haptics from 'expo-haptics';
import { ImpactFeedbackStyle, NotificationFeedbackType } from 'expo-haptics';

import { isWeb } from '@/lib';

let hapticFeedbackEnabled = true;

export { ImpactFeedbackStyle, NotificationFeedbackType };

export function impact(method: ImpactFeedbackStyle) {
  if (!hapticFeedbackEnabled || isWeb) return;

  Haptics.impactAsync(method);
}
export function notification(method: NotificationFeedbackType) {
  if (!hapticFeedbackEnabled || isWeb) return;

  Haptics.notificationAsync(method);
}
export function selection() {
  if (!hapticFeedbackEnabled || isWeb) return;

  Haptics.selectionAsync();
}
