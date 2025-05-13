import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { SegmentedControl, type SegmentedControlOption } from '@/components';
import { NavHeader, ScrollView, Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';

// type TabType = 0 | 1 | 2 | 3;

interface NotificationItem {
  id: string;
  type: number;
  title: string;
  message: string;
  time: string;
  icon: string;
  iconBgColor: string;
  isUnread: boolean;
  date: 'today' | 'yesterday' | 'earlier';
}

const Notification = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const router = useRouter();

  // 模拟通知数据
  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 0,
      title: '库存预警',
      message: 'PCB板库存低于安全库存，请及时补货。',
      time: '10:30',
      icon: 'exclamation-triangle',
      iconBgColor: '#ef4444', // red-500
      isUnread: true,
      date: 'today',
    },
    {
      id: '2',
      type: 1,
      title: '订单完成',
      message: '订单 #2023112801 已完成生产，等待发货。',
      time: '09:45',
      icon: 'clipboard-check',
      iconBgColor: '#3b82f6', // blue-500
      isUnread: true,
      date: 'today',
    },
    {
      id: '3',
      type: 1,
      title: '任务分配',
      message: '您有一个新的生产任务 #PT20231129-02 需要处理。',
      time: '08:20',
      icon: 'tasks',
      iconBgColor: '#22c55e', // green-500
      isUnread: true,
      date: 'today',
    },
    {
      id: '4',
      type: 2,
      title: '数据报表',
      message: '11月生产效率分析报表已生成，请查看。',
      time: '昨天 16:30',
      icon: 'chart-line',
      iconBgColor: '#a855f7', // purple-500
      isUnread: false,
      date: 'yesterday',
    },
    {
      id: '5',
      type: 2,
      title: '系统维护',
      message: '系统将于今晚22:00-23:00进行例行维护，请提前做好准备。',
      time: '昨天 14:15',
      icon: 'bell',
      iconBgColor: '#eab308', // yellow-500
      isUnread: false,
      date: 'yesterday',
    },
    {
      id: '6',
      type: 2,
      title: '新成员加入',
      message: '李工程师已加入您的生产团队，请及时安排工作。',
      time: '11-27',
      icon: 'user-plus',
      iconBgColor: '#6366f1', // indigo-500
      isUnread: false,
      date: 'earlier',
    },
    {
      id: '7',
      type: 2,
      title: '系统更新',
      message: '系统已更新至v1.0.5版本，新增多项功能和优化，点击查看详情。',
      time: '11-25',
      icon: 'cogs',
      iconBgColor: '#f97316', // orange-500
      isUnread: false,
      date: 'earlier',
    },
  ];

  // 根据选中的选项卡筛选通知
  const filteredNotifications =
    selectedTabIndex === 0
      ? notifications
      : notifications.filter((item) => item.type === selectedTabIndex);

  // 按日期分组通知
  const todayNotifications = filteredNotifications.filter(
    (item) => item.date === 'today'
  );
  const yesterdayNotifications = filteredNotifications.filter(
    (item) => item.date === 'yesterday'
  );
  const earlierNotifications = filteredNotifications.filter(
    (item) => item.date === 'earlier'
  );

  // 处理查看详情
  const handleViewDetail = (id: string) => {
    router.push(`/notification/${id}`);
  };
  // 处理忽略通知
  const handleIgnore = (id: string) => {
    // 实际应用中这里会更新状态
    console.log('忽略通知:', id);
  };

  // 处理清除所有通知
  // const handleClearAll = () => {
  //   // 实际应用中这里会清除所有通知
  //   console.log('清除所有通知');
  // };

  // 渲染通知项
  const renderNotificationItem = (item: NotificationItem) => (
    <TouchableOpacity
      key={item.id}
      // className="mr-2 rounded-full bg-blue-50 px-2 py-1"
      onPress={() => handleViewDetail(item.id)}
    >
      <View className="border-b border-gray-100 py-4">
        <View className="flex-row">
          <View className="relative">
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
            {item.isUnread && (
              <View className="absolute right-0 top-0 size-2 rounded-full bg-red-500" />
            )}
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between">
              <Text className="font-medium">{item.title}</Text>
              <Text className="text-xs text-gray-500">{item.time}</Text>
            </View>
            <Text className="mt-1 text-sm text-gray-600">{item.message}</Text>
            <View className="mt-2 flex-row justify-end">
              {/* <Text className="text-xs text-blue-600">查看详情</Text> */}
              <TouchableOpacity
                className="rounded-full bg-gray-100 px-2 py-1"
                onPress={() => handleIgnore(item.id)}
              >
                <Text className="text-xs text-gray-600">忽略</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const tabOptions: SegmentedControlOption[] = [
    { key: 'production-plan', label: '全部' },
    { key: 'production-task', label: '系统通知' },
    { key: 'process-management', label: '任务提醒' },
    { key: 'process-management1', label: '预警信息' },
  ];
  return (
    <View className="flex-1 bg-gray-50">
      <NavHeader
        title="通知"
        right={
          <>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="cog" size={18} color="#6b7280" />
            </TouchableOpacity>
          </>
        }
      />
      <View className="mx-1 my-4">
        <SegmentedControl
          options={tabOptions}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        />
      </View>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 4, paddingBottom: 20 }}
      >
        {/* 今日通知 */}
        {todayNotifications.length > 0 && (
          <>
            <Text className="mb-3 text-lg font-semibold">今日通知</Text>
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              {todayNotifications.map(renderNotificationItem)}
            </View>
          </>
        )}

        {/* 昨日通知 */}
        {yesterdayNotifications.length > 0 && (
          <>
            <Text className="mb-3 text-lg font-semibold">昨日通知</Text>
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              {yesterdayNotifications.map(renderNotificationItem)}
            </View>
          </>
        )}

        {/* 更早通知 */}
        {earlierNotifications.length > 0 && (
          <>
            <Text className="mb-3 text-lg font-semibold">更早</Text>
            <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              {earlierNotifications.map(renderNotificationItem)}
            </View>
          </>
        )}

        {/* 清除按钮 */}
        {/* <TouchableOpacity
          className="mb-4 mt-6 w-full rounded-xl border border-gray-200 bg-white py-3 font-medium text-gray-600"
          onPress={handleClearAll}
        >
          <Text className="text-center font-medium text-gray-600">
            清除所有通知
          </Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  headerButton: {
    marginLeft: 16,
  },
});
export default Notification;
