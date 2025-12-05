import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Platform } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';

import { useAppColorScheme } from '@/lib/hooks';

type Props = { hidden?: boolean };
export const FocusAwareStatusBar = ({ hidden = false }: Props) => {
  const isFocused = useIsFocused();
  const { colorScheme } = useAppColorScheme();

  if (Platform.OS === 'web') return null;

  return isFocused ? (
    <SystemBars
      style={colorScheme === 'light' ? 'dark' : 'light'}
      hidden={hidden}
    />
  ) : null;
};
