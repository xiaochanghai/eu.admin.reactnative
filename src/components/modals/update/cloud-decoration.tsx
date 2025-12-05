import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

// 云朵装饰组件
const CloudDecoration = ({ className }: { className?: string }) => (
  <View className={`absolute ${className}`}>
    <Svg width={40} height={24} viewBox="0 0 40 24" fill="none">
      <Path
        d="M8 16 C4 16, 2 14, 2 11 C2 8, 4 6, 8 6 C9 4, 11 2, 14 2 C17 2, 19 4, 20 6 C23 6, 25 8, 25 11 C25 14, 23 16, 20 16 L8 16 Z"
        fill="rgba(255, 255, 255, 0.3)"
      />
    </Svg>
  </View>
);
export default CloudDecoration;
