import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const ChatSend = ({ ...props }: SvgProps) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <G clip-path="url(#clip0_1503_2425)">
      <Path
        d="M9.69081 14.4577C9.71613 14.5208 9.76017 14.5747 9.81699 14.6121C9.87381 14.6494 9.94071 14.6685 10.0087 14.6668C10.0767 14.665 10.1425 14.6426 10.1974 14.6023C10.2522 14.5621 10.2934 14.506 10.3155 14.4417L14.6488 1.77503C14.6701 1.71596 14.6742 1.65203 14.6605 1.59073C14.6469 1.52943 14.616 1.47329 14.5716 1.42888C14.5272 1.38447 14.4711 1.35363 14.4098 1.33996C14.3485 1.32629 14.2845 1.33036 14.2255 1.3517L1.55881 5.68503C1.49447 5.70709 1.43842 5.74831 1.39819 5.80314C1.35795 5.85798 1.33545 5.92381 1.33371 5.9918C1.33197 6.05979 1.35107 6.12669 1.38845 6.18351C1.42582 6.24034 1.47968 6.28437 1.54281 6.3097L6.82947 8.4297C6.9966 8.49661 7.14844 8.59667 7.27585 8.72385C7.40326 8.85103 7.50359 9.00269 7.57081 9.1697L9.69081 14.4577Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.5695 1.43164L7.27615 8.72431"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1503_2425">
        <Rect width="16" height="16" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
