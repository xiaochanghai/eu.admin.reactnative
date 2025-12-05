import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

import colors from '../colors';

export const LoginOut = ({
  color = colors.neutral[500],
  ...props
}: SvgProps) => (
  <Svg width="80" height="80" viewBox="0 0 80 80" fill="none" {...props}>
    <Path
      d="M30 70H16.6667C14.8986 70 13.2029 69.2976 11.9526 68.0474C10.7024 66.7971 10 65.1014 10 63.3333V16.6667C10 14.8986 10.7024 13.2029 11.9526 11.9526C13.2029 10.7024 14.8986 10 16.6667 10H30"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M53.3334 56.6667L70 40L53.3334 23.3334"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M70 40H30"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
