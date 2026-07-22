import { useTheme } from 'expo-router';
import React from 'react';

import colors from '@/components/ui/colors';

interface IconWrapperProps {
  IconComponent: any;
  focused: boolean;
}

export function IconWrapper({ IconComponent, focused }: IconWrapperProps) {
  const theme = useTheme();

  return (
    <IconComponent
      color={focused ? theme.colors.primary : colors.neutral[400]}
    />
  );
}
