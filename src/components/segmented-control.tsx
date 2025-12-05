import { useEffect, useMemo, useRef, useState } from 'react';
import {
  type LayoutChangeEvent,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

import { useAppColorScheme } from '@/lib';

// 启用 Android 的 LayoutAnimation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
  const defaultActiveColor = activeColor || '#0066ff';
  const defaultInactiveColor = inactiveColor || (isDark ? '#9ca3af' : '#6b7280');
  const defaultBackgroundColor = backgroundColor || (isDark ? '#262626' : '#e5e7eb');
  const defaultSliderColor = sliderColor || (isDark ? '#404040' : 'white');

  // 内层容器的 padding
  const PADDING = 2;

  // 内层容器宽度状态
  const [innerContainerWidth, setInnerContainerWidth] = useState(0);

  // 滑块的 left 位置
  const [sliderLeft, setSliderLeft] = useState(0);

  // 标记是否已经初始化过滑块位置
  const isInitialized = useRef(false);

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
      const initialLeft = PADDING + selectedIndex * calculatedOptionWidth;
      setSliderLeft(initialLeft);
      isInitialized.current = true;
    }

    setInnerContainerWidth(width);
  };

  // 当选中索引或容器宽度变化时，更新滑块位置
  useEffect(() => {
    if (innerContainerWidth > 0) {
      // 配置平滑动画
      LayoutAnimation.configureNext({
        duration: 250,
        create: { type: 'easeInEaseOut', property: 'opacity' },
        update: { type: 'spring', springDamping: 0.7 },
        delete: { type: 'easeInEaseOut', property: 'opacity' },
      });

      // 滑块位置 = padding偏移 + index * 选项宽度
      const leftPosition = PADDING + selectedIndex * optionWidth;
      setSliderLeft(leftPosition);
    }
  }, [selectedIndex, innerContainerWidth, optionWidth]);

  return (
    <View
      style={[styles.segmentedControlContainer, { backgroundColor: defaultBackgroundColor }]}
    >
      <View
        style={[styles.segmentedControl, { backgroundColor: defaultBackgroundColor }]}
        onLayout={handleLayout}
      >
        <View
          style={[
            styles.segmentedControlSlider,
            {
              left: sliderLeft,
              width: optionWidth,
              backgroundColor: defaultSliderColor,
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
                    color: isSelected ? defaultActiveColor : defaultInactiveColor,
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
    borderRadius: 8,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 2,
    position: 'relative',
    height: 40,
  },
  segmentedControlOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  segmentedControlSlider: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  segmentedControlText: {
    fontSize: 14,
  },
});
