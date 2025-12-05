import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Plus = ({ ...props }: SvgProps) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M3.3333 8H12.6665"
      stroke="#543EF8"
      strokeWidth="1.19998"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.99992 3.33301V12.6663"
      stroke="#543EF8"
      strokeWidth="1.19998"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
