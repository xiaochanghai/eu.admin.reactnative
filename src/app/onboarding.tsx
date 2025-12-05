import { Env } from '@env';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  ViewToken,
} from 'react-native';

import { Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';
import { useIsFirstTime } from '@/lib/hooks';

// 引导页数据类型
type OnboardingItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradientColors: [string, string];
  features: string[];
};

// 引导页数据
const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: '智能生产管理',
    description: '数字化生产管控，实时掌握生产全流程',
    icon: 'industry',
    gradientColors: ['#3b82f6', '#2563eb'],
    features: [
      '实时生产监控',
      '生产计划排程',
      '工单进度跟踪',
      '产能分析优化',
    ],
  },
  {
    id: '2',
    title: '质量管理',
    description: '全流程质量管控，确保产品卓越品质',
    icon: 'check-circle',
    gradientColors: ['#22c55e', '#16a34a'],
    features: [
      '质检流程管理',
      '不良品追溯',
      '质量数据分析',
      '质量报告生成',
    ],
  },
  {
    id: '3',
    title: '设备智能运维',
    description: '预防性维护，保障设备高效运转',
    icon: 'cogs',
    gradientColors: ['#a855f7', '#9333ea'],
    features: [
      '设备状态监控',
      '预防性维护',
      '故障快速响应',
      '维修记录管理',
    ],
  },
  {
    id: '4',
    title: '数据决策支持',
    description: '数据驱动决策，移动协同办公',
    icon: 'chart-bar',
    gradientColors: ['#f59e0b', '#d97706'],
    features: [
      '生产数据可视化',
      '智能决策分析',
      '移动协同办公',
      '实时消息推送',
    ],
  },
];

// 引导页项组件
type OnboardingSlideProps = {
  item: OnboardingItem;
  width: number;
};

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ item, width }) => (
  <View style={{ width }} className="flex-1 items-center justify-center px-8">
    <LinearGradient
      colors={item.gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: 140,
        height: 140,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <FontAwesome name={item.icon as any} size={64} color="white" />
    </LinearGradient>

    <Text className="mb-3 text-center text-3xl font-bold text-gray-900 dark:text-white">
      {item.title}
    </Text>

    <Text className="mb-8 text-center text-base text-gray-600 dark:text-gray-400">
      {item.description}
    </Text>

    <View className="w-full space-y-3">
      {item.features.map((feature, index) => (
        <View key={index} className="flex-row items-center">
          <View
            className="mr-3 size-8 items-center justify-center rounded-full"
            style={{ backgroundColor: item.gradientColors[0] }}
          >
            <FontAwesome name="check" size={14} color="white" />
          </View>
          <Text className="flex-1 text-base text-gray-700 dark:text-gray-300">
            {feature}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

// 分页指示器
type PaginatorProps = {
  data: OnboardingItem[];
  currentIndex: number;
};

const Paginator: React.FC<PaginatorProps> = ({ data, currentIndex }) => (
  <View className="flex-row justify-center py-6">
    {data.map((_, index) => (
      <View
        key={index}
        className={`mx-1 h-2 rounded-full ${
          index === currentIndex
            ? 'w-8 bg-primary-500'
            : 'w-2 bg-gray-300 dark:bg-neutral-600'
        }`}
      />
    ))}
  </View>
);

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  const { isDark } = useAppColorScheme();
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: nextIndex * width,
          animated: true,
        });
      }, 100);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    setIsFirstTime(false);
    router.replace(Env.LOGIN_REQUIRED === true ? '/login' : '/');
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#171717' : '#f9fafb'}
      />

      {/* 跳过按钮 */}
      {currentIndex < onboardingData.length - 1 && (
        <TouchableOpacity
          onPress={handleSkip}
          className="absolute right-6 top-12 z-10"
          activeOpacity={0.7}
        >
          <Text className="text-base font-semibold text-primary-500">
            跳过
          </Text>
        </TouchableOpacity>
      )}

      {/* 轮播内容 */}
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={({ item }) => (
            <OnboardingSlide item={item} width={width} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
        />
      </View>

      {/* 底部控制区域 */}
      <View className="pb-8">
        {/* 分页指示器 */}
        <Paginator data={onboardingData} currentIndex={currentIndex} />

        {/* 按钮区域 */}
        <View className="px-8">
          <TouchableOpacity
            onPress={handleNext}
            className="items-center rounded-full bg-primary-500 py-4 shadow-lg"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <Text className="text-base font-semibold text-white">
                {currentIndex === onboardingData.length - 1
                  ? '立即开始'
                  : '下一步'}
              </Text>
              {currentIndex < onboardingData.length - 1 && (
                <FontAwesome
                  name="arrow-right"
                  size={16}
                  color="white"
                  style={{ marginLeft: 8 }}
                />
              )}
            </View>
          </TouchableOpacity>

          {/* 底部提示 */}
          {currentIndex === onboardingData.length - 1 && (
            <Text className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              开始您的智能制造之旅
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
