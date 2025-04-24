import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { SegmentedControl, type SegmentedControlOption } from '@/components';
import { NavHeader, SafeAreaView, ScrollView } from '@/components/ui';

// 状态徽章组件
// type StatusBadgeProps = {
//   status: string;
//   color: string;
//   bgColor: string;
// };

// const StatusBadge: React.FC<StatusBadgeProps> = ({ status, color, bgColor }) => (
//   <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
//     <Text style={[styles.statusBadgeText, { color }]}>{status}</Text>
//   </View>
// );

// 库存项组件
type InventoryItemProps = {
  name: string;
  code: string;
  quantity: number;
  safetyStock: number;
  status: 'normal' | 'warning' | 'danger';
};

const InventoryItem: React.FC<InventoryItemProps> = ({
  name,
  code,
  quantity,
  safetyStock,
  status,
}) => {
  let indicatorColor = '#22c55e'; // 绿色 - 正常
  let textColor = 'black';

  if (status === 'warning') {
    indicatorColor = '#eab308'; // 黄色 - 警告
  } else if (status === 'danger') {
    indicatorColor = '#ef4444'; // 红色 - 危险
    textColor = '#ef4444';
  }

  return (
    <View style={styles.inventoryItem}>
      <View style={styles.flex1}>
        <View style={styles.flexRow}>
          <View
            style={[styles.stockIndicator, { backgroundColor: indicatorColor }]}
          />
          <Text style={styles.itemName}>{name}</Text>
        </View>
        <Text style={styles.itemCode}>编号：{code}</Text>
      </View>
      <View style={styles.textRight}>
        <Text
          style={[
            styles.itemQuantity,
            status === 'danger' ? { color: textColor } : null,
          ]}
        >
          {quantity}
        </Text>
        <Text style={styles.safetyStockText}>安全库存：{safetyStock}</Text>
      </View>
    </View>
  );
};

// 预警项组件
type AlertItemProps = {
  name: string;
  message: string;
  type: 'danger' | 'warning';
};

const AlertItem: React.FC<AlertItemProps> = ({ name, message, type }) => {
  const bgColor = type === 'danger' ? '#fef2f2' : '#fffbeb';
  const iconColor = type === 'danger' ? '#ef4444' : '#eab308';
  const icon =
    type === 'danger' ? 'exclamation-circle' : 'exclamation-triangle';

  return (
    <View style={[styles.alertItem, { backgroundColor: bgColor }]}>
      <View style={styles.alertIconContainer}>
        <FontAwesome name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.flex1}>
        <Text style={styles.alertTitle}>{name}</Text>
        <Text style={styles.alertMessage}>{message}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.alertAction}>补货</Text>
      </TouchableOpacity>
    </View>
  );
};

const Inventory: React.FC = () => {
  // const navigation = useNavigation<InventoryScreenNavigationProp>();

  // 分段控制器选项
  const tabOptions: SegmentedControlOption[] = [
    { key: 'inventory-overview', label: '库存概览' },
    { key: 'raw-materials', label: '原材料' },
    { key: 'semi-finished', label: '半成品' },
    { key: 'finished-products', label: '成品' },
    { key: 'inventory-report', label: '库存报表' },
  ];

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // 库存预警数据
  const alertItems = [
    {
      name: 'PCB板',
      message: '库存低于安全库存（20/100）',
      type: 'danger' as const,
    },
    {
      name: '电容 0.1uF',
      message: '库存低于安全库存（150/500）',
      type: 'danger' as const,
    },
    {
      name: '塑料外壳 A型',
      message: '库存接近安全库存（220/300）',
      type: 'warning' as const,
    },
  ];

  // 库存列表数据
  const inventoryItems = [
    {
      name: '电阻 10kΩ',
      code: 'RM-10K-0805',
      quantity: 5000,
      safetyStock: 1000,
      status: 'normal' as const,
    },
    {
      name: '电容 1uF',
      code: 'CM-1UF-0805',
      quantity: 3200,
      safetyStock: 800,
      status: 'normal' as const,
    },
    {
      name: '塑料外壳 A型',
      code: 'CS-A-001',
      quantity: 220,
      safetyStock: 300,
      status: 'warning' as const,
    },
    {
      name: 'PCB板',
      code: 'PCB-ST-001',
      quantity: 20,
      safetyStock: 100,
      status: 'danger' as const,
    },
    {
      name: 'LED灯 白色',
      code: 'LED-W-5MM',
      quantity: 1500,
      safetyStock: 500,
      status: 'normal' as const,
    },
  ];

  // 原材料列表数据
  const rawMaterialItems = [
    {
      name: '电阻 10kΩ',
      code: 'RM-10K-0805',
      quantity: 5000,
      safetyStock: 1000,
      status: 'normal' as const,
    },
    {
      name: '电容 1uF',
      code: 'CM-1UF-0805',
      quantity: 3200,
      safetyStock: 800,
      status: 'normal' as const,
    },
    {
      name: 'PCB板',
      code: 'PCB-ST-001',
      quantity: 20,
      safetyStock: 100,
      status: 'danger' as const,
    },
  ];

  // 半成品列表数据
  const semiFinishedItems = [
    {
      name: '主板组件',
      code: 'SF-MB-001',
      quantity: 120,
      safetyStock: 50,
      status: 'normal' as const,
    },
    {
      name: '电源模块',
      code: 'SF-PM-002',
      quantity: 45,
      safetyStock: 40,
      status: 'warning' as const,
    },
  ];

  // 成品列表数据
  const finishedProductItems = [
    {
      name: '智能控制器 A1',
      code: 'FP-SC-A1',
      quantity: 85,
      safetyStock: 30,
      status: 'normal' as const,
    },
    {
      name: '智能控制器 B2',
      code: 'FP-SC-B2',
      quantity: 65,
      safetyStock: 25,
      status: 'normal' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* 顶部导航 */}
      <NavHeader
        title="库存"
        leftShown={false}
        right={
          <>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="search" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="filter" size={18} color="#6b7280" />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="qrcode" size={22} color="#0066ff" />
            </TouchableOpacity> */}
          </>
        }
      />

      <View style={styles.content}>
        {/* 分段控制器 */}
        <SegmentedControl
          options={tabOptions}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* 库存概览 */}
          {selectedTabIndex === 0 && (
            <View>
              {/* 库存概览卡片 */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>库存概览</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#0066ff' }]}>
                      152
                    </Text>
                    <Text style={styles.statLabel}>物料种类</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#22c55e' }]}>
                      87%
                    </Text>
                    <Text style={styles.statLabel}>库存健康度</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#ef4444' }]}>
                      3
                    </Text>
                    <Text style={styles.statLabel}>库存预警</Text>
                  </View>
                </View>
                <View style={styles.infoBox}>
                  <FontAwesome
                    name="info-circle"
                    size={20}
                    color="#0066ff"
                    style={styles.infoIcon}
                  />
                  <View>
                    <Text style={styles.infoTitle}>本月库存周转率</Text>
                    <View style={styles.flexRow}>
                      <Text style={styles.infoValue}>4.2</Text>
                      <Text style={styles.infoTrend}>↑ 0.3</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* 库存预警 */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>库存预警</Text>
                  <TouchableOpacity>
                    <Text style={styles.cardLink}>查看全部</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.alertList}>
                  {alertItems.map((item, index) => (
                    <AlertItem
                      key={index}
                      name={item.name}
                      message={item.message}
                      type={item.type}
                    />
                  ))}
                </View>
              </View>

              {/* 库存列表 */}
              <Text style={styles.sectionTitle}>库存列表</Text>

              <View style={styles.card}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="搜索物料"
                    placeholderTextColor="#9ca3af"
                  />
                  <FontAwesome
                    name="search"
                    size={16}
                    color="#9ca3af"
                    style={styles.searchIcon}
                  />
                </View>

                {/* 库存项目列表 */}
                {inventoryItems.map((item, index) => (
                  <InventoryItem
                    key={index}
                    name={item.name}
                    code={item.code}
                    quantity={item.quantity}
                    safetyStock={item.safetyStock}
                    status={item.status}
                  />
                ))}
              </View>
            </View>
          )}

          {/* 原材料 */}
          {selectedTabIndex === 1 && (
            <View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>原材料库存</Text>
                <Text style={styles.cardDescription}>
                  此处显示原材料库存信息
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="搜索原材料"
                    placeholderTextColor="#9ca3af"
                  />
                  <FontAwesome
                    name="search"
                    size={16}
                    color="#9ca3af"
                    style={styles.searchIcon}
                  />
                </View>

                {/* 原材料项目列表 */}
                {rawMaterialItems.map((item, index) => (
                  <InventoryItem
                    key={index}
                    name={item.name}
                    code={item.code}
                    quantity={item.quantity}
                    safetyStock={item.safetyStock}
                    status={item.status}
                  />
                ))}
              </View>
            </View>
          )}

          {/* 半成品 */}
          {selectedTabIndex === 2 && (
            <View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>半成品库存</Text>
                <Text style={styles.cardDescription}>
                  此处显示半成品库存信息
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="搜索半成品"
                    placeholderTextColor="#9ca3af"
                  />
                  <FontAwesome
                    name="search"
                    size={16}
                    color="#9ca3af"
                    style={styles.searchIcon}
                  />
                </View>

                {/* 半成品项目列表 */}
                {semiFinishedItems.map((item, index) => (
                  <InventoryItem
                    key={index}
                    name={item.name}
                    code={item.code}
                    quantity={item.quantity}
                    safetyStock={item.safetyStock}
                    status={item.status}
                  />
                ))}
              </View>
            </View>
          )}

          {/* 成品 */}
          {selectedTabIndex === 3 && (
            <View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>成品库存</Text>
                <Text style={styles.cardDescription}>此处显示成品库存信息</Text>
              </View>

              <View style={styles.card}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="搜索成品"
                    placeholderTextColor="#9ca3af"
                  />
                  <FontAwesome
                    name="search"
                    size={16}
                    color="#9ca3af"
                    style={styles.searchIcon}
                  />
                </View>

                {/* 成品项目列表 */}
                {finishedProductItems.map((item, index) => (
                  <InventoryItem
                    key={index}
                    name={item.name}
                    code={item.code}
                    quantity={item.quantity}
                    safetyStock={item.safetyStock}
                    status={item.status}
                  />
                ))}
              </View>
            </View>
          )}

          {/* 库存报表 */}
          {selectedTabIndex === 4 && (
            <View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>库存报表</Text>
                <Text style={styles.cardDescription}>此处显示库存报表信息</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardSubtitle}>库存周转率</Text>
                <View style={styles.reportItem}>
                  <View style={styles.reportRow}>
                    <Text style={styles.reportLabel}>原材料</Text>
                    <Text style={styles.reportValue}>4.5</Text>
                  </View>
                  <View style={styles.reportRow}>
                    <Text style={styles.reportLabel}>半成品</Text>
                    <Text style={styles.reportValue}>3.8</Text>
                  </View>
                  <View style={styles.reportRow}>
                    <Text style={styles.reportLabel}>成品</Text>
                    <Text style={styles.reportValue}>5.2</Text>
                  </View>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardSubtitle}>库存价值分布</Text>
                <View style={styles.reportItem}>
                  <View style={styles.reportRow}>
                    <Text style={styles.reportLabel}>原材料</Text>
                    <Text style={styles.reportValue}>¥125,000</Text>
                  </View>
                  <View style={styles.reportRow}>
                    <Text style={styles.reportLabel}>半成品</Text>
                    <Text style={styles.reportValue}>¥85,000</Text>
                  </View>
                  <View style={styles.reportRow}>
                    <Text style={styles.reportLabel}>成品</Text>
                    <Text style={styles.reportValue}>¥210,000</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* 浮动按钮 */}
      <TouchableOpacity style={styles.floatingButton}>
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerButton: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollView: {
    flex: 1,
    marginTop: 16,
  },
  segmentedControlContainer: {
    // backgroundColor: '#000',
  },
  flex1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  alertMessage: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  alertAction: {
    fontSize: 14,
    color: '#0066ff',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 10,
    fontSize: 14,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
  },
  inventoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reportItem: {
    marginTop: 12,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
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
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  segmentedControlText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  segmentedControlActiveText: {
    color: '#0066ff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  cardLink: {
    fontSize: 14,
    color: '#0066ff',
    fontWeight: '500',
  },
  alertList: {
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066ff',
    marginRight: 8,
  },
  infoTrend: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '500',
  },
  itemCode: {
    fontSize: 14,
    color: '#6b7280',
  },
  itemQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  safetyStockText: {
    fontSize: 12,
    color: '#6b7280',
  },
  textRight: {
    alignItems: 'flex-end',
  },
  floatingButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0066ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reportContainer: {
    marginTop: 12,
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  reportDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reportLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  reportValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  equipmentInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
  },
  equipmentInfoItem: {
    width: '50%',
    marginBottom: 12,
  },
  equipmentInfoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  equipmentInfoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  equipmentAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  equipmentAlertIcon: {
    marginRight: 12,
  },
  equipmentAlertTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  equipmentAlertText: {
    fontSize: 14,
    color: '#6b7280',
  },
  equipmentAlertError: {
    backgroundColor: '#fef2f2',
  },
  equipmentAlertTitleError: {
    color: '#ef4444',
  },
});

export default Inventory;
