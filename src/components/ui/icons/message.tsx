import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

import colors from '../colors';

export function Message() {
  return <Icon color={colors.neutral[900]} />;
}
export function MessageDark() {
  return <Icon color={colors.neutral[300]} />;
}

function Icon({ ...props }: SvgProps) {
  const strokeColor = props.color;
  return (
    <Svg width="24" height="24" viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        d="M6.58321 16.7575C8.17371 17.5734 10.0033 17.7944 11.7423 17.3807C13.4813 16.9669 15.0154 15.9457 16.0681 14.501C17.1208 13.0562 17.6228 11.283 17.4838 9.50091C17.3448 7.71877 16.5738 6.04489 15.3098 4.7809C14.0458 3.5169 12.3719 2.74593 10.5898 2.6069C8.80764 2.46787 7.03444 2.96993 5.58972 4.0226C4.145 5.07528 3.12376 6.60934 2.71003 8.34836C2.2963 10.0874 2.5173 11.917 3.33318 13.5075L1.6665 18.4242L6.58321 16.7575Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66653 10.0908H6.67487"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99991 10.0908H10.0082"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.3333 10.0908H13.3416"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
