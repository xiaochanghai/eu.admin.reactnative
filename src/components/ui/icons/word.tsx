import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

export const Word = ({ ...props }: SvgProps) => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <Rect x="8" y="2" width="24" height="28" rx="2" fill="#2FB776" />
    <Path
      d="M8 23H32V28C32 29.1046 31.1046 30 30 30H10C8.89543 30 8 29.1046 8 28V23Z"
      fill="url(#paint0_linear_2295_34623)"
    />
    <Rect x="20" y="16" width="12" height="7" fill="#229C5B" />
    <Rect x="20" y="9" width="12" height="7" fill="#27AE68" />
    <Path d="M8 4C8 2.89543 8.89543 2 10 2H20V9H8V4Z" fill="#1D854F" />
    <Rect x="8" y="9" width="12" height="7" fill="#197B43" />
    <Rect x="8" y="16" width="12" height="7" fill="#1B5B38" />
    <Path
      d="M8 12C8 10.3431 9.34315 9 11 9H17C18.6569 9 20 10.3431 20 12V24C20 25.6569 18.6569 27 17 27H8V12Z"
      fill="black"
      fillOpacity="0.3"
    />
    <Rect
      y="7"
      width="18"
      height="18"
      rx="2"
      fill="url(#paint1_linear_2295_34623)"
    />
    <Path
      d="M13 21L10.1821 15.9L12.8763 11H10.677L9.01375 14.1286L7.37801 11H5.10997L7.81787 15.9L5 21H7.19931L8.97251 17.6857L10.732 21H13Z"
      fill="white"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2295_34623"
        x1="8"
        y1="26.5"
        x2="32"
        y2="26.5"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stop-color="#163C27" />
        <Stop offset="1" stop-color="#2A6043" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2295_34623"
        x1="0"
        y1="16"
        x2="18"
        y2="16"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stop-color="#185A30" />
        <Stop offset="1" stop-color="#176F3D" />
      </LinearGradient>
    </Defs>
  </Svg>
);
