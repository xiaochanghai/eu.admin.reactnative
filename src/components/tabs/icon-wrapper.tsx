import React from 'react';

interface IconWrapperProps {
  IconComponent: any;
  focused: boolean;
}

export function IconWrapper({ IconComponent, focused }: IconWrapperProps) {
  return <IconComponent color={focused ? '#007bff' : '#666'} />;
}
