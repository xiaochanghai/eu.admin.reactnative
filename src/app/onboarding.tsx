import { Env } from '@env';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getVersion } from 'react-native-device-info';

import {
  FocusAwareStatusBar,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { useIsFirstTime } from '@/lib/hooks';
import { translate } from '@/lib/i18n';

const { width, height } = Dimensions.get('window');

const Welcome: React.FC = () => {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  // 动画值
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // 粒子动画数组
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * width,
    y: Math.random() * height,
    duration: Math.random() * 15000 + 10000,
    delay: Math.random() * 5000,
  }));

  useEffect(() => {
    // 启动动画
    Animated.parallel([
      // 淡入动画
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // 滑入动画
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      // 缩放动画
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // 浮动动画
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  });

  // 处理开始使用按钮点击
  const handleGetStarted = () => {
    setIsFirstTime(false);
    router.replace('/login');
    // navigation.navigate('Login');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <SafeAreaView className="flex-1 bg-gray-100">
          {/* 背景粒子效果 */}
          <View className="absolute inset-0 z-0 overflow-hidden">
            {particles.map((particle) => (
              <Animated.View
                key={particle.id}
                style={[
                  styles.particle,
                  {
                    width: particle.size,
                    height: particle.size,
                    left: particle.x,
                    top: particle.y,
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -height],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>

          <View className="relative z-10 flex-1">
            {/* 版本标识 */}
            {(Platform.OS === 'ios' || Platform.OS === 'android') && (
              <Animated.View
                style={[styles.versionBadge, { opacity: fadeAnim }]}
              >
                <Text className="text-sm font-medium text-[#F7952B]">
                  V{getVersion()}
                </Text>
              </Animated.View>
            )}

            {/* 顶部空间 */}
            <View style={{ height: height * 0.08 }} />

            {/* Logo和标题 */}
            <Animated.View
              style={[
                styles.logoSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Animated.View
                className="relative mb-5"
                style={[{ transform: [{ translateY: floatAnim }] }]}
              >
                <View style={styles.logoGlow} />

                <LinearGradient
                  colors={['#EBF5FF', '#E1F0FF']}
                  style={styles.logoCircle}
                >
                  <Image
                    source={require('../../assets/favicon.png')}
                    style={{ width: 80, height: 80 }}
                    contentFit="contain"
                  />
                </LinearGradient>
              </Animated.View>

              <Text className="mt-4 text-2xl font-bold text-[#333]">
                {Env.NAME}
              </Text>
              <Text className="mt-4 text-xl font-bold text-[#6b7280]">
                {translate('login.sub_title')}
              </Text>
            </Animated.View>

            {/* 欢迎信息 */}
            <Animated.View
              style={[
                styles.welcomeSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text className="mb-3 text-center text-2xl font-semibold text-gray-700">
                欢迎使用轻智造ERP系统
              </Text>
              <Text className="max-w-[320px] text-center text-base leading-6 text-gray-500">
                高效、智能的制造业管理解决方案，助力企业数字化转型，提升生产效率
              </Text>
            </Animated.View>

            {/* 功能特点 */}
            <View className="mb-8 flex-row flex-wrap justify-between px-4">
              <FeatureCard
                icon="cogs"
                title="生产管理"
                description="实时监控生产进度，优化生产流程"
                delay={200}
              />
              <FeatureCard
                icon="archive"
                title="库存管理"
                description="精准追踪库存变动，降低库存成本"
                delay={400}
              />
              <FeatureCard
                icon="list"
                title="订单管理"
                description="高效处理订单流程，提升客户满意度"
                delay={600}
              />
              <FeatureCard
                icon="line-chart"
                title="数据分析"
                description="深度分析业务数据，辅助决策制定"
                delay={800}
              />
            </View>

            {/* 开始使用按钮 */}
            <Animated.View
              style={[
                styles.buttonSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <TouchableOpacity
                className="overflow-hidden rounded-2xl shadow-lg"
                style={{
                  shadowColor: '#F7952B',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 4,
                }}
                onPress={handleGetStarted}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#F7952B', '#E94934']}
                  className="flex-row items-center justify-center py-4"
                >
                  <Text className="text-lg font-semibold text-white">
                    开始使用
                  </Text>
                  <FontAwesome
                    name="arrow-right"
                    size={16}
                    color="white"
                    style={{ marginLeft: 8 }}
                  />
                </LinearGradient>
              </TouchableOpacity>
              <Text className="mt-3 text-center text-sm text-gray-500">
                点击按钮进入登录页面
              </Text>
            </Animated.View>

            {/* 底部 */}
            <View className="mt-auto items-center pb-6">
              <Text className="text-base text-gray-500">
                © 2025 苏州优智云科技有限公司
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

// 功能卡片组件
type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  delay: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 延迟启动动画
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  });

  return (
    <Animated.View
      style={[
        styles.featureCard,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View
        className="mb-3 size-14 items-center justify-center rounded-2xl bg-[#F7952B] shadow-sm"
        style={{
          shadowColor: '#F7952B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <FontAwesome name={icon as any} size={24} color="#fff" />
      </View>
      <Text className="mb-1.5 text-base font-semibold text-gray-700">
        {title}
      </Text>

      <Text className="text-sm leading-5 text-gray-500">{description}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(0,102,255,0.1)',
    borderRadius: 50,
  },
  versionBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    // backgroundColor: 'rgba(255,255,255,0.8)',
    // paddingVertical: 6,
    // paddingHorizontal: 12,
    // borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
    // borderWidth: 1,
    // borderColor: 'rgba(0,102,255,0.1)',
    zIndex: 10,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  logoGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: -10,
    left: -10,
    borderRadius: 60,
    backgroundColor: 'rgba(240,123,28,0.3)',
    opacity: 0.5,
    zIndex: -1,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F7952B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#F7952B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
});

export default Welcome;
