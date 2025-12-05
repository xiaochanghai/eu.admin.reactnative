import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const ChatSettings = ({ ...props }: SvgProps) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <G clip-path="url(#clip0_1503_2414)">
      <Path
        d="M13.9996 2.66699H9.33299"
        stroke="#543EF8"
        strokeWidth="1.19998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66636 2.66699H1.99974"
        stroke="#543EF8"
        strokeWidth="1.19998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.9996 8H7.99968"
        stroke="#543EF8"
        strokeWidth="1.19998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.33304 8H1.99974"
        stroke="#543EF8"
        strokeWidth="1.19998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.9996 13.333H10.6663"
        stroke="#543EF8"
        strokeWidth="1.19998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.99968 13.333H1.99974"
        stroke="#543EF8"
        strokeWidth="1.19998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.33299 1.33301V3.99965"
        stroke="#543EF8"
        strokeWidth="1.19998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.33304 6.66699V9.33363"
        stroke="#543EF8"
        strokeWidth="1.19998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.6663 12V14.6666"
        stroke="#543EF8"
        strokeWidth="1.19998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1503_2414">
        <Rect
          width="15.9998"
          height="15.9998"
          fill="white"
          transform="translate(-0.000244141)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
