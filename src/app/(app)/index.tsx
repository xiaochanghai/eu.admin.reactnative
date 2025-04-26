/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';
import { userInfo as user } from '@/lib/user';

// 活动项组件
type ActivityItemProps = {
  icon: string;
  iconBgColor: string;
  title: string;
  subtitle: string;
  time: string;
};

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  iconBgColor,
  title,
  subtitle,
  time,
}) => (
  <View style={styles.activityItem}>
    <View style={[styles.activityIcon, { backgroundColor: iconBgColor }]}>
      <FontAwesome name={icon as any} size={16} color="white" />
    </View>
    <View style={styles.activityContent}>
      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
      <Text style={styles.activitySubtitle}>{subtitle}</Text>
    </View>
  </View>
);

// 模块项组件
type ModuleItemProps = {
  icon: string;
  bgColor: string;
  title: string;
  onPress?: () => void;
};

const ModuleItem: React.FC<ModuleItemProps> = ({
  icon,
  bgColor,
  title,
  onPress,
}) => (
  <TouchableOpacity style={styles.moduleItem} onPress={onPress}>
    <View style={[styles.moduleIcon, { backgroundColor: bgColor }]}>
      <FontAwesome name={icon as any} size={24} color="white" />
      {/* <Entypo name={icon as any} size={24} color="white" /> */}
    </View>
    <Text style={styles.moduleText}>{title}</Text>
  </TouchableOpacity>
);

const Home: React.FC = () => {
  const userInfo = user.use.userInfo();
  const setInfo = user.use.setInfo();
  useEffect(() => {
    if (userInfo == null) setInfo(null);
  });
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" /> */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* <FocusAwareStatusBar /> */}

      {/* 顶部导航 */}

      <NavHeader
        title="首页"
        leftShown={false}
        right={
          <TouchableOpacity
            style={styles.notificationButton}
            // onPress={() => navigation.navigate('Notifications')}
          >
            <FontAwesome name="bell" size={20} color="#6b7280" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 欢迎信息 */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>你好，{userInfo?.UserName}</Text>
          <Text style={styles.welcomeSubtitle}>
            今天是{userInfo?.WeekName}，祝您工作顺利
          </Text>
        </View>

        {/* 数据概览 */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>今日订单</Text>
            <Text style={[styles.statValue, { color: '#0066ff' }]}>28</Text>
            <Text style={styles.statTrend}>↑ 12.5%</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>生产任务</Text>
            <Text style={[styles.statValue, { color: '#f97316' }]}>15</Text>
            <Text style={styles.statInfo}>进行中: 8</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>库存预警</Text>
            <Text style={[styles.statValue, { color: '#ef4444' }]}>3</Text>
            <Text style={styles.statInfo}>点击查看详情</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>质检合格率</Text>
            <Text style={[styles.statValue, { color: '#22c55e' }]}>98.5%</Text>
            <Text style={styles.statTrend}>↑ 1.2%</Text>
          </View>
        </View>

        {/* 功能模块 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>功能模块</Text>
          <View style={styles.moduleGrid}>
            <ModuleItem
              icon="cogs"
              bgColor="#3b82f6"
              title="生产管理"
              // onPress={() => navigation.navigate('Production')}
            />
            <ModuleItem
              icon="boxes"
              bgColor="#22c55e"
              title="库存管理"
              // onPress={() => navigation.navigate('Inventory')}
            />
            <ModuleItem
              icon="clipboard-list"
              bgColor="#f97316"
              title="订单管理"
              // onPress={() => navigation.navigate('Orders')}
            />
            <ModuleItem
              icon="check-circle"
              bgColor="#a855f7"
              title="质量控制"
              // onPress={() => navigation.navigate('Quality')}
            />
            <ModuleItem
              icon="chart-line"
              bgColor="#ef4444"
              title="数据分析"
              // onPress={() => navigation.navigate('Analytics')}
            />
            <ModuleItem
              icon="users"
              bgColor="#eab308"
              title="人员管理"
              onPress={() => {}}
            />
            <ModuleItem
              icon="truck"
              bgColor="#6366f1"
              title="物流管理"
              onPress={() => {}}
            />
            <ModuleItem
              icon="ellipsis-h"
              bgColor="#6b7280"
              title="更多功能"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* 最近活动 */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>最近活动</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>查看全部</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesContainer}>
            <ActivityItem
              icon="clipboard-check"
              iconBgColor="#3b82f6"
              title="订单 #2023112801 已完成"
              subtitle="客户：上海某电子有限公司"
              time="10:30"
            />
            <ActivityItem
              icon="exclamation-triangle"
              iconBgColor="#ef4444"
              title="原材料库存不足预警"
              subtitle="PCB板库存低于安全库存"
              time="09:15"
            />
            <ActivityItem
              icon="tasks"
              iconBgColor="#22c55e"
              title="生产任务 #PT20231128-05 已开始"
              subtitle="负责人：李工程师"
              time="昨天"
            />
          </View>
        </View>

        {/* 底部空间 - 为底部导航留出空间 */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  notificationButton: {
    marginRight: 16,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ef4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statTrend: {
    fontSize: 12,
    color: '#22c55e',
    marginTop: 4,
  },
  statInfo: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  moduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  moduleIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  moduleText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionLink: {
    fontSize: 14,
    color: '#0066ff',
  },
  activitiesContainer: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  activitySubtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  bottomSpace: {
    height: 70,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingBottom: 10, // 为底部安全区域留出空间
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#6b7280',
  },
  navTextActive: {
    color: '#0066ff',
  },
});

export default Home;
