/* eslint-disable react/react-in-jsx-scope */
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView, Text, View } from '@/components/ui';
import { useIsFirstTime } from '@/lib/hooks';

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
  }, []);

  // 处理开始使用按钮点击
  const handleGetStarted = () => {
    setIsFirstTime(false);
    router.replace('/login');
    // navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* 背景粒子效果 */}
      <View style={styles.particles}>
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

      <View style={styles.contentWrapper}>
        {/* 版本标识 */}
        <Animated.View style={[styles.versionBadge, { opacity: fadeAnim }]}>
          {/* <FontAwesome name="code-branch" size={12} color="#0066ff" style={{ marginRight: 4 }} /> */}
          <Text style={styles.versionText}>v2.0.1</Text>
        </Animated.View>

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
            style={[
              styles.logoContainer,
              { transform: [{ translateY: floatAnim }] },
            ]}
          >
            <View style={styles.logoGlow} />
            <LinearGradient
              colors={['#EBF5FF', '#E1F0FF']}
              style={styles.logoCircle}
            >
              <FontAwesome name="industry" size={50} color="#0066ff" />
            </LinearGradient>
          </Animated.View>
          <Text style={styles.title}>优智云</Text>
          <Text style={styles.subtitle}>智能制造管理系统</Text>
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
          <Text style={styles.welcomeTitle}>欢迎使用轻智造ERP系统</Text>
          <Text style={styles.welcomeText}>
            高效、智能的制造业管理解决方案，助力企业数字化转型，提升生产效率
          </Text>
        </Animated.View>

        {/* 功能特点 */}
        <View style={styles.featuresGrid}>
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
            style={styles.startButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#0066ff', '#0052cc']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>开始使用</Text>
              <FontAwesome
                name="arrow-right"
                size={16}
                color="white"
                style={{ marginLeft: 8 }}
              />
            </LinearGradient>
            {/* <Button
              label="Let's Get Started "
              onPress={() => {
                setIsFirstTime(false);
                router.replace('/login');
              }}
            /> */}
          </TouchableOpacity>
          <Text style={styles.buttonHint}>点击按钮进入登录页面</Text>
        </Animated.View>

        {/* 底部 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2023 轻智造科技有限公司</Text>
        </View>
      </View>
    </SafeAreaView>
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
  }, []);

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
      <View style={styles.featureIcon}>
        <FontAwesome name={icon as any} size={24} color="#0066ff" />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 0,
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(0,102,255,0.1)',
    borderRadius: 50,
  },
  versionBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,102,255,0.1)',
    zIndex: 10,
  },
  versionText: {
    fontSize: 12,
    color: '#0066ff',
    fontWeight: '500',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  logoGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: -10,
    left: -10,
    borderRadius: 60,
    backgroundColor: 'rgba(0,102,255,0.3)',
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 8,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.8)',
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
    backgroundColor: 'rgba(0,102,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#0066ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  buttonSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#0066ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonHint: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    marginTop: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default Welcome;
