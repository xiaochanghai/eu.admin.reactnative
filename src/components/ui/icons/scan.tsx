import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Scan = ({ ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M1.66644 7.49994V5.83325C1.66644 3.33321 3.33313 1.66653 5.83316 1.66653H14.1666C16.6666 1.66653 18.3333 3.33321 18.3333 5.83325V7.49994"
      stroke={props.color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.66644 12.5V14.1667C1.66644 16.6667 3.33313 18.3334 5.83316 18.3334H14.1666C16.6666 18.3334 18.3333 16.6667 18.3333 14.1667V12.5"
      stroke={props.color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.66644 9.99997H18.3333"
      stroke={props.color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
