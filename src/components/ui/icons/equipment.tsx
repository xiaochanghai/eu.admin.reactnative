import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Equipment = ({ ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 1024 1024" fill="none" {...props}>
    <Path
      d="M128 328h768a96 96 0 0 0 0-192H128a96 96 0 0 0 0 192z m720-152a56 56 0 1 1-56 56 56 56 0 0 1 56-56z m-152 0a56 56 0 1 1-56 56 56 56 0 0 1 56-56zM896 416H128a96 96 0 0 0 0 192h768a96 96 0 0 0 0-192z m-200 152a56 56 0 1 1 56-56 56 56 0 0 1-56 56z m152 0a56 56 0 1 1 56-56 56 56 0 0 1-56 56zM896 696H128a96 96 0 0 0 0 192h768a96 96 0 0 0 0-192z m-200 152a56 56 0 1 1 56-56 56 56 0 0 1-56 56z m152 0a56 56 0 1 1 56-56 56 56 0 0 1-56 56z"
      fill={props.color ?? '#000000'}
    />
  </Svg>
);
