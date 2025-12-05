import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { NavHeader, ScrollView, Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

interface RelatedNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  iconBgColor: string;
}

const NotificationDetail = () => {
  // const notificationType1 = route.params?.type || 'warning';
  const local = useLocalSearchParams<{ type: string }>();
  const notificationType = local.type;
  const { isDark } = useAppColorScheme();

  // 通知详情状态
  const [notificationInfo, setNotificationInfo] = useState({
    title: '库存预警',
    time: '今天 10:30',
    date: '2023年11月29日',
    content:
      'PCB板库存低于安全库存，当前库存数量为25个，安全库存为50个，请及时补货。\n\n低库存可能导致生产计划延误，建议在3天内完成补货。',
    icon: 'exclamation-triangle',
    iconBgColor: '#ef4444', // red-500
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-800',
    badgeContent: '预警信息',
    actionText: '查看物料详情',
    relatedInfo: [
      { label: '物料编号', value: 'PCB-2023-1105' },
      { label: '当前库存', value: '25个', isAlert: true },
      { label: '安全库存', value: '50个' },
      { label: '最近一次入库', value: '2023-11-15' },
    ],
  });

  // 相关通知
  const relatedNotifications: RelatedNotification[] = [
    {
      id: '1',
      title: '库存预警',
      message: '电阻R0805库存不足，请及时补货。',
      time: '11-20',
      icon: 'exclamation-circle',
      iconBgColor: '#eab308', // yellow-500
    },
    {
      id: '2',
      title: '物料入库',
      message: 'PCB板已完成入库，入库数量100个。',
      time: '11-15',
      icon: 'truck',
      iconBgColor: '#3b82f6', // blue-500
    },
  ];

  // 根据通知类型设置样式和内容
  useEffect(() => {
    let updatedInfo = { ...notificationInfo };

    switch (notificationType) {
      case 'warning':
        updatedInfo = {
          ...updatedInfo,
          title: '库存预警',
          icon: 'exclamation-triangle',
          iconBgColor: '#ef4444', // red-500
          badgeBg: 'bg-red-100',
          badgeText: 'text-red-800',
          badgeContent: '预警信息',
          actionText: '查看物料详情',
        };
        break;
      case 'task':
        updatedInfo = {
          ...updatedInfo,
          title: '任务分配',
          content:
            '您有一个新的生产任务 #PT20231129-02 需要处理。请在今天下午3点前完成相关准备工作。',
          icon: 'tasks',
          iconBgColor: '#22c55e', // green-500
          badgeBg: 'bg-green-100',
          badgeText: 'text-green-800',
          badgeContent: '任务提醒',
          actionText: '处理任务',
        };
        break;
      case 'order':
        updatedInfo = {
          ...updatedInfo,
          title: '订单完成',
          content:
            '订单 #2023112801 已完成生产，等待发货。请安排物流部门进行后续处理。',
          icon: 'clipboard-check',
          iconBgColor: '#3b82f6', // blue-500
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-800',
          badgeContent: '订单通知',
          actionText: '查看订单',
        };
        break;
      case 'system':
        updatedInfo = {
          ...updatedInfo,
          title: '系统维护',
          content:
            '系统将于今晚22:00-23:00进行例行维护，请提前做好准备。维护期间系统将暂停服务。',
          icon: 'bell',
          iconBgColor: '#eab308', // yellow-500
          badgeBg: 'bg-yellow-100',
          badgeText: 'text-yellow-800',
          badgeContent: '系统通知',
          actionText: '了解详情',
        };
        break;
      case 'report':
        updatedInfo = {
          ...updatedInfo,
          title: '数据报表',
          content:
            '11月生产效率分析报表已生成，请查看。本月生产效率较上月提升5.2%。',
          icon: 'chart-line',
          iconBgColor: '#a855f7', // purple-500
          badgeBg: 'bg-purple-100',
          badgeText: 'text-purple-800',
          badgeContent: '数据报表',
          actionText: '查看报表',
        };
        break;
      case 'team':
        updatedInfo = {
          ...updatedInfo,
          title: '新成员加入',
          content: '李工程师已加入您的生产团队，请及时安排工作。',
          icon: 'user-plus',
          iconBgColor: '#6366f1', // indigo-500
          badgeBg: 'bg-indigo-100',
          badgeText: 'text-indigo-800',
          badgeContent: '团队通知',
          actionText: '查看团队',
        };
        break;
      case 'update':
        updatedInfo = {
          ...updatedInfo,
          title: '系统更新',
          content:
            '系统已更新至v1.0.5版本，新增多项功能和优化。主要更新内容包括：生产计划优化、库存预警阈值自定义、报表导出功能等。',
          icon: 'cogs',
          iconBgColor: '#f97316', // orange-500
          badgeBg: 'bg-orange-100',
          badgeText: 'text-orange-800',
          badgeContent: '系统更新',
          actionText: '查看更新',
        };
        break;
    }

    setNotificationInfo(updatedInfo);
  }, [notificationType]);

  // 处理主要操作按钮点击
  const handlePrimaryAction = () => {
    switch (notificationType) {
      case 'warning':
        // navigation.navigate('MaterialDetail', { id: 'PCB-2023-1105' });
        break;
      case 'order':
        // navigation.navigate('Orders');
        break;
      case 'task':
        // navigation.navigate('Production');
        break;
      case 'report':
        // navigation.navigate('Analytics');
        break;
      default:
      // navigation.navigate('Notifications');
    }
  };

  // 处理标记为已读
  const handleMarkAsRead = () => {
    // 实际应用中这里会更新通知状态
    console.log('标记为已读');
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
      <NavHeader
        title="通知详情"
        right={
          <>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome
                name="share-alt"
                size={18}
                color={isDark ? '#9ca3af' : '#6b7280'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome
                name="ellipsis-v"
                size={18}
                color={isDark ? '#9ca3af' : '#6b7280'}
              />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      >
        {/* 通知类型标签 */}
        <View className="mb-4">
          <Text
            className={`rounded-full px-3 py-1 text-xs font-medium ${notificationInfo.badgeBg} ${notificationInfo.badgeText} self-start`}
          >
            {notificationInfo.badgeContent}
          </Text>
        </View>

        {/* 通知详情卡片 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          <View className="flex-row items-start">
            <View
              className="w-15 h-15 mr-4 items-center justify-center rounded-xl"
              style={{ backgroundColor: notificationInfo.iconBgColor }}
            >
              <FontAwesome
                name={notificationInfo.icon}
                size={24}
                color="white"
                group={GroupEnum.FontAwesome5}
              />
            </View>
            <View className="flex-1">
              <View className="flex-row items-start justify-between">
                <Text className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {notificationInfo.title}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  {notificationInfo.time}
                </Text>
              </View>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {notificationInfo.date}
              </Text>
            </View>
          </View>

          <View className="mt-6">
            <Text className="mb-3 text-lg font-medium text-gray-900 dark:text-gray-100">详细内容</Text>
            <Text className="leading-relaxed text-gray-700 dark:text-gray-300">
              {notificationInfo.content}
            </Text>
          </View>

          {/* 相关信息 */}
          <View className="mt-6 border-t border-gray-100 pt-6 dark:border-neutral-700">
            <Text className="mb-3 text-lg font-medium text-gray-900 dark:text-gray-100">相关信息</Text>
            {notificationInfo.relatedInfo.map((item, index) => (
              <View key={index} className="mb-3 rounded-xl bg-gray-50 p-4 dark:bg-neutral-700">
                <View className="flex-row justify-between">
                  <Text className="font-medium text-gray-900 dark:text-gray-100">{item.label}</Text>
                  <Text
                    className={item.isAlert ? 'font-medium text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}
                  >
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 操作按钮 */}
        <View className="mb-6 flex-row space-x-3">
          <TouchableOpacity
            className="flex-1 items-center rounded-xl bg-blue-600 py-3"
            onPress={handlePrimaryAction}
          >
            <Text className="font-medium text-white">
              {notificationInfo.actionText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center rounded-xl bg-gray-100 py-3 dark:bg-neutral-700"
            onPress={handleMarkAsRead}
          >
            <Text className="font-medium text-gray-700 dark:text-gray-200">标记为已读</Text>
          </TouchableOpacity>
        </View>

        {/* 相关通知 */}
        <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">相关通知</Text>
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
          {relatedNotifications.map((item, index) => (
            <View
              key={item.id}
              className={`py-3 ${index < relatedNotifications.length - 1 ? 'border-b border-gray-100 dark:border-neutral-700' : ''}`}
            >
              <View className="flex-row">
                <View
                  className="mr-4 size-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: item.iconBgColor }}
                >
                  <FontAwesome
                    name={item.icon}
                    size={16}
                    color="white"
                    group={GroupEnum.FontAwesome5}
                  />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between">
                    <Text className="font-medium text-gray-900 dark:text-gray-100">{item.title}</Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400">{item.time}</Text>
                  </View>
                  <Text className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {item.message}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginLeft: 16,
  },
});
export default NotificationDetail;
