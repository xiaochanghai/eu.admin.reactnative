import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

// import colors from '../colors';

// export function Home() {
//   return <Icon color={colors.neutral[900]} />;
// }
// export function HomeDark() {
//   return <Icon color={colors.neutral[300]} />;
// }


export function Home({ ...props }: SvgProps) {
  const strokeColor = props.color;
  return (
    <Svg width={24} height={24} viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        d="M12.5001 17.5909V10.9242C12.5001 10.7032 12.4123 10.4912 12.256 10.335C12.0997 10.1787 11.8878 10.0909 11.6668 10.0909H8.3334C8.11239 10.0909 7.90042 10.1787 7.74414 10.335C7.58786 10.4912 7.50006 10.7032 7.50006 10.9242V17.5909"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.50002 8.42416C2.49996 8.18172 2.5528 7.94218 2.65485 7.72225C2.75689 7.50233 2.90569 7.30732 3.09086 7.15082L8.92424 2.15161C9.22507 1.89737 9.60621 1.75787 10.0001 1.75787C10.394 1.75787 10.7751 1.89737 11.0759 2.15161L16.9093 7.15082C17.0945 7.30732 17.2433 7.50233 17.3453 7.72225C17.4474 7.94218 17.5002 8.18172 17.5001 8.42416V15.9242C17.5001 16.3663 17.3246 16.7902 17.012 17.1027C16.6994 17.4153 16.2755 17.5909 15.8335 17.5909H4.1667C3.72467 17.5909 3.30075 17.4153 2.98818 17.1027C2.67562 16.7902 2.50002 16.3663 2.50002 15.9242V8.42416Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
