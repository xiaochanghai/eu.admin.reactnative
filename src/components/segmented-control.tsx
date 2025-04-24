import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  type LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
  activeColor = '#0066ff',
  inactiveColor = '#6b7280',
  backgroundColor = '#e5e7eb',
  sliderColor = 'white',
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // 计算每个选项的宽度
  const optionWidth = useMemo(() => {
    return containerWidth > 0 ? containerWidth / options.length : 0;
  }, [containerWidth, options.length]);

  // 处理容器布局变化
  const handleLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setContainerWidth(width);
  };

  // 当选中索引或容器宽度变化时，更新滑块位置
  useEffect(() => {
    if (containerWidth > 0) {
      Animated.spring(slideAnim, {
        toValue: selectedIndex * optionWidth,
        // duration: 250, // 移除这一行，因为它不是 SpringAnimationConfig 的有效属性
        useNativeDriver: false,
        friction: 8,
        tension: 50,
      }).start();
    }
  }, [selectedIndex, containerWidth, optionWidth, slideAnim]);

  return (
    <View
      style={[styles.segmentedControlContainer, { backgroundColor }]}
      onLayout={handleLayout}
    >
      <View style={[styles.segmentedControl, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.segmentedControlSlider,
            {
              width: optionWidth,
              transform: [{ translateX: slideAnim }],
              backgroundColor: sliderColor,
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
                    color: isSelected ? activeColor : inactiveColor,
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
    // backgroundColor: '#f5f5f5',
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
