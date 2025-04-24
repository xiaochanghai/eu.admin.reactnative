import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavHeader, SafeAreaView, ScrollView } from '@/components/ui';

// 分段控制器选项类型
type SegmentedControlOption = {
  key: string;
  label: string;
};

// 状态徽章组件
type StatusBadgeProps = {
  status: string;
  color: string;
  bgColor: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  color,
  bgColor,
}) => (
  <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
    <Text style={[styles.statusBadgeText, { color }]}>{status}</Text>
  </View>
);

// 订单项组件
type OrderItemProps = {
  orderNumber: string;
  customer: string;
  orderDate: string;
  deliveryDate: string;
  amount: string;
  status: string;
  statusColor: string;
  statusBgColor: string;
  onViewDetail?: () => void;
};

const OrderItem: React.FC<OrderItemProps> = ({
  orderNumber,
  customer,
  orderDate,
  deliveryDate,
  amount,
  status,
  statusColor,
  statusBgColor,
  onViewDetail,
}) => (
  <View style={styles.orderItem}>
    <View style={styles.flexRowBetween}>
      <Text style={styles.orderTitle}>订单 #{orderNumber}</Text>
      <StatusBadge
        status={status}
        color={statusColor}
        bgColor={statusBgColor}
      />
    </View>
    <Text style={styles.customerText}>客户：{customer}</Text>
    <View style={styles.flexRowBetween}>
      <Text style={styles.dateText}>订单日期：{orderDate}</Text>
      <Text style={styles.dateText}>交付日期：{deliveryDate}</Text>
    </View>
    <View style={styles.flexRowBetween}>
      <View style={styles.flexRow}>
        <Text style={styles.amountLabel}>订单金额：</Text>
        <Text style={styles.amountValue}>¥{amount}</Text>
      </View>
      <TouchableOpacity onPress={onViewDetail}>
        <Text style={styles.detailLink}>查看详情</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// 分段控制器组件
type SegmentedControlProps = {
  options: SegmentedControlOption[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onChange,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (containerWidth > 0) {
      const optionWidth = containerWidth / options.length;
      Animated.timing(slideAnim, {
        toValue: selectedIndex * optionWidth,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedIndex, containerWidth]);

  return (
    <View
      style={styles.segmentedControlContainer}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.segmentedControl}>
        <Animated.View
          style={[
            styles.segmentedControlSlider,
            {
              width: containerWidth > 0 ? containerWidth / options.length : 0,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        />
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.key}
            style={styles.segmentedControlOption}
            onPress={() => onChange(index)}
          >
            <Text
              style={[
                styles.segmentedControlText,
                index === selectedIndex
                  ? styles.segmentedControlActiveText
                  : null,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const Orders: React.FC = () => {
  // const navigation = useNavigation<OrdersScreenNavigationProp>();

  // 分段控制器选项
  const tabOptions: SegmentedControlOption[] = [
    { key: 'all-orders', label: '全部订单' },
    { key: 'pending-orders', label: '待处理' },
    { key: 'processing-orders', label: '生产中' },
    { key: 'completed-orders', label: '已完成' },
    { key: 'cancelled-orders', label: '已取消' },
  ];

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // 订单数据
  const orderStats = {
    total: 128,
    pending: 32,
    processing: 45,
    completed: 51,
    completionRate: 85.7,
    rateChange: 3.2,
  };

  // 订单列表数据
  const orderItems = [
    {
      id: '1',
      orderNumber: '2023112801',
      customer: '上海某电子有限公司',
      orderDate: '2023-11-28',
      deliveryDate: '2023-12-05',
      amount: '128,500',
      status: '已完成',
      statusColor: '#22c55e',
      statusBgColor: '#dcfce7',
    },
    {
      id: '2',
      orderNumber: '2023112702',
      customer: '北京智能科技有限公司',
      orderDate: '2023-11-27',
      deliveryDate: '2023-12-10',
      amount: '95,200',
      status: '生产中',
      statusColor: '#9333ea',
      statusBgColor: '#f3e8ff',
    },
    {
      id: '3',
      orderNumber: '2023112505',
      customer: '广州电子科技有限公司',
      orderDate: '2023-11-25',
      deliveryDate: '2023-12-15',
      amount: '76,800',
      status: '待处理',
      statusColor: '#f97316',
      statusBgColor: '#ffedd5',
    },
    {
      id: '4',
      orderNumber: '2023112403',
      customer: '深圳创新科技有限公司',
      orderDate: '2023-11-24',
      deliveryDate: '2023-12-01',
      amount: '112,350',
      status: '已完成',
      statusColor: '#22c55e',
      statusBgColor: '#dcfce7',
    },
    {
      id: '5',
      orderNumber: '2023112302',
      customer: '杭州智能家居有限公司',
      orderDate: '2023-11-23',
      deliveryDate: '2023-11-24',
      amount: '45,600',
      status: '已取消',
      statusColor: '#6b7280',
      statusBgColor: '#f3f4f6',
    },
  ];

  // 渲染当前选中的选项卡内容
  const renderTabContent = () => {
    switch (selectedTabIndex) {
      case 0: // 全部订单
        return (
          <>
            {/* 订单概览 */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>订单概览</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statsItem}>
                  <Text style={[styles.statsValue, { color: '#0066ff' }]}>
                    {orderStats.total}
                  </Text>
                  <Text style={styles.statsLabel}>总订单</Text>
                </View>
                <View style={styles.statsItem}>
                  <Text style={[styles.statsValue, { color: '#f97316' }]}>
                    {orderStats.pending}
                  </Text>
                  <Text style={styles.statsLabel}>待处理</Text>
                </View>
                <View style={styles.statsItem}>
                  <Text style={[styles.statsValue, { color: '#9333ea' }]}>
                    {orderStats.processing}
                  </Text>
                  <Text style={styles.statsLabel}>生产中</Text>
                </View>
                <View style={styles.statsItem}>
                  <Text style={[styles.statsValue, { color: '#22c55e' }]}>
                    {orderStats.completed}
                  </Text>
                  <Text style={styles.statsLabel}>已完成</Text>
                </View>
              </View>
              <View style={styles.completionRateCard}>
                <View style={styles.completionRateIcon}>
                  <FontAwesome name="pie-chart" size={20} color="#0066ff" />
                </View>
                <View>
                  <Text style={styles.completionRateTitle}>本月订单完成率</Text>
                  <View style={styles.flexRow}>
                    <Text style={styles.completionRateValue}>
                      {orderStats.completionRate}%
                    </Text>
                    <Text style={styles.completionRateChange}>
                      ↑ {orderStats.rateChange}%
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 搜索框 */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <FontAwesome
                  name="search"
                  size={16}
                  color="#9ca3af"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="搜索订单号、客户名称"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* 订单列表 */}
            <Text style={styles.sectionTitle}>订单列表</Text>
            <View style={styles.card}>
              {orderItems.map((item) => (
                <OrderItem
                  key={item.id}
                  orderNumber={item.orderNumber}
                  customer={item.customer}
                  orderDate={item.orderDate}
                  deliveryDate={item.deliveryDate}
                  amount={item.amount}
                  status={item.status}
                  statusColor={item.statusColor}
                  statusBgColor={item.statusBgColor}
                  onViewDetail={() =>
                    console.log(`查看订单 ${item.orderNumber} 详情`)
                  }
                />
              ))}
            </View>
          </>
        );
      case 1: // 待处理
        return (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>待处理订单</Text>
            <Text style={styles.placeholderText}>此处显示待处理订单信息</Text>
          </View>
        );
      case 2: // 生产中
        return (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>生产中订单</Text>
            <Text style={styles.placeholderText}>此处显示生产中订单信息</Text>
          </View>
        );
      case 3: // 已完成
        return (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>已完成订单</Text>
            <Text style={styles.placeholderText}>此处显示已完成订单信息</Text>
          </View>
        );
      case 4: // 已取消
        return (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>已取消订单</Text>
            <Text style={styles.placeholderText}>此处显示已取消订单信息</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* 顶部导航 */}
      <NavHeader
        title="订单"
        leftShown={false}
        right={
          <>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="search" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="filter" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="plus-circle" size={22} color="#0066ff" />
            </TouchableOpacity>
          </>
        }
      />

      {/* 内容区域 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 分段控制器 */}
        <SegmentedControl
          options={tabOptions}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        />

        {/* 选项卡内容 */}
        {renderTabContent()}

        {/* 底部间距 */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* 浮动按钮 */}
      <TouchableOpacity style={styles.floatingButton}>
        <FontAwesome name="plus" size={20} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerButton: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  segmentedControlContainer: {
    marginBottom: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 8,
    padding: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  segmentedControlSlider: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  segmentedControlOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  segmentedControlText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  segmentedControlActiveText: {
    color: '#000000',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statsItem: {
    alignItems: 'center',
    flex: 1,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statsLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  completionRateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf5ff',
    borderRadius: 8,
    padding: 12,
  },
  completionRateIcon: {
    marginRight: 12,
  },
  completionRateTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  completionRateValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0066ff',
    marginRight: 8,
  },
  completionRateChange: {
    fontSize: 12,
    color: '#22c55e',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 8,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  orderItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 16,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  customerText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#6b7280',
  },
  amountLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailLink: {
    fontSize: 14,
    color: '#0066ff',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  placeholderText: {
    color: '#6b7280',
  },
  floatingButton: {
    position: 'absolute',
    right: 24,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0066ff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  bottomSpacer: {
    height: 80,
  },
});

export default Orders;
