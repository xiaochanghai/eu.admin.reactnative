import React from 'react';

import colors from '@/components/ui/colors';

interface IconWrapperProps {
  IconComponent: any;
  focused: boolean;
}

export function IconWrapper({ IconComponent, focused }: IconWrapperProps) {
  return <IconComponent color={focused ? colors.primary[600] : '#9ca3af'} />;
}
