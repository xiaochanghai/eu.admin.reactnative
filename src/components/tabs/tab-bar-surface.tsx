import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Android and Web retain the existing tab bar layout.
export function TabBarSurface({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="relative flex-row items-center justify-between border-t border-gray-200 bg-white px-0 dark:border-neutral-800 dark:bg-neutral-900"
      style={{ height: 54 + insets.bottom, paddingBottom: insets.bottom }}
    >
      {children}
    </View>
  );
}
