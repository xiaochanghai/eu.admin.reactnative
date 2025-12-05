import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Line, Path } from 'react-native-svg';

export const EyeOff = ({ ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65661 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1747 15.0074 10.8016 14.8565C10.4286 14.7056 10.0887 14.4811 9.80385 14.1962C9.51901 13.9114 9.29451 13.5714 9.14359 13.1984C8.99267 12.8253 8.91856 12.4247 8.92563 12.0219C8.9327 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88"
      stroke="#D1D1D1"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="1"
      y1="1"
      x2="23"
      y2="23"
      stroke="#D1D1D1"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
