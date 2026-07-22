import { useEffect, useMemo, useRef, useState } from 'react';
import {
  type LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useAppColorScheme } from '@/lib';

// 分段控制器选项类型
export type SegmentedControlOption = {
  key: string;
  label: string;
};
// 分段控制器组件
type SegmentedControlProps = {
  options: SegmentedControlOption[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  sliderColor?: string;
};

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onChange,
  activeColor,
  inactiveColor,
  backgroundColor,
  sliderColor,
}) => {
  const { isDark } = useAppColorScheme();

  // 根据主题设置默认颜色
  const defaultActiveColor = activeColor || '#543EF8';
  const defaultInactiveColor =
    inactiveColor || (isDark ? '#9ca3af' : '#6b7280');
  const defaultBackgroundColor =
    backgroundColor || (isDark ? '#171717' : '#f3f4f6');
  const defaultSliderColor = sliderColor || (isDark ? '#303030' : 'white');

  // 内层容器的 padding
  const PADDING = 2;

  // 内层容器宽度状态
  const [innerContainerWidth, setInnerContainerWidth] = useState(0);

  // 标记是否已经初始化过滑块位置
  const isInitialized = useRef(false);
  const sliderTranslateX = useSharedValue(0);

  // 计算每个选项的实际宽度（基于内容区）
  const optionWidth = useMemo(() => {
    if (innerContainerWidth === 0) return 0;
    // 内容区宽度 = 总宽度 - 左右padding
    const contentWidth = innerContainerWidth - PADDING * 2;
    return contentWidth / options.length;
  }, [innerContainerWidth, options.length]);

  // 处理内层容器布局变化
  const handleLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;

    // 只在首次布局时设置滑块位置
    if (!isInitialized.current) {
      const contentWidth = width - PADDING * 2;
      const calculatedOptionWidth = contentWidth / options.length;
      sliderTranslateX.value = selectedIndex * calculatedOptionWidth;
      isInitialized.current = true;
    }

    setInnerContainerWidth(width);
  };

  // 当选中索引或容器宽度变化时，更新滑块位置
  useEffect(() => {
    if (innerContainerWidth > 0) {
      sliderTranslateX.value = withTiming(selectedIndex * optionWidth, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [selectedIndex, innerContainerWidth, optionWidth, sliderTranslateX]);

  const animatedSliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sliderTranslateX.value }],
  }));

  return (
    <View
      style={[
        styles.segmentedControlContainer,
        { backgroundColor: defaultBackgroundColor },
      ]}
    >
      <View
        style={[
          styles.segmentedControl,
          { backgroundColor: defaultBackgroundColor },
        ]}
        onLayout={handleLayout}
      >
        <Animated.View
          style={[
            styles.segmentedControlSlider,
            animatedSliderStyle,
            {
              left: PADDING,
              width: optionWidth,
              backgroundColor: defaultSliderColor,
              opacity: optionWidth > 0 ? 1 : 0,
            },
          ]}
        />
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          return (
            <TouchableOpacity
              key={option.key}
              style={styles.segmentedControlOption}
              onPress={() => onChange(index)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentedControlText,
                  {
                    color: isSelected
                      ? defaultActiveColor
                      : defaultInactiveColor,
                    fontWeight: isSelected ? '600' : '500',
                  },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  segmentedControlContainer: {
    borderRadius: 12,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 3,
    position: 'relative',
    height: 44,
  },
  segmentedControlOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  segmentedControlSlider: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentedControlText: {
    fontSize: 13,
  },
});
