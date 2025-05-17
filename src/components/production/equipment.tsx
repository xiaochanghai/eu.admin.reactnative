import { FontAwesome } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { StatusBadge } from './status-badge';

export const Equipment = () => {
  return (
    <View>
      {/* 设备概览 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>设备概览</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#0066ff' }]}>32</Text>
            <Text style={styles.statLabel}>设备总数</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#22c55e' }]}>25</Text>
            <Text style={styles.statLabel}>运行中</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#ef4444' }]}>2</Text>
            <Text style={styles.statLabel}>故障</Text>
          </View>
        </View>
        <View style={styles.completionRateCard}>
          <FontAwesome
            name="wrench"
            size={20}
            color="#0066ff"
            style={styles.completionRateIcon}
          />
          <View style={styles.completionRateContent}>
            <Text style={styles.completionRateLabel}>设备综合效率(OEE)</Text>
            <View style={styles.completionRateValue}>
              <Text style={styles.completionRatePercentage}>87.2%</Text>
              <Text style={styles.completionRateTrend}>↑ 2.1%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 设备列表 */}
      <Text style={styles.sectionTitle}>设备列表</Text>

      {/* 设备项目1 */}
      <View style={styles.card}>
        <View style={styles.planItemHeader}>
          <Text style={styles.planItemTitle}>SMT贴片机#2</Text>
          <StatusBadge status="运行中" color="#22c55e" bgColor="#dcfce7" />
        </View>
        <Text style={styles.planItemCode}>设备编号：EQ20230501-02</Text>

        <View style={styles.equipmentInfoGrid}>
          <View style={styles.equipmentInfoItem}>
            <Text style={styles.equipmentInfoLabel}>设备温度</Text>
            <Text style={styles.equipmentInfoValue}>42°C</Text>
          </View>
          <View style={styles.equipmentInfoItem}>
            <Text style={styles.equipmentInfoLabel}>电机转速</Text>
            <Text style={styles.equipmentInfoValue}>1200 RPM</Text>
          </View>
          <View style={styles.equipmentInfoItem}>
            <Text style={styles.equipmentInfoLabel}>电压</Text>
            <Text style={styles.equipmentInfoValue}>220V</Text>
          </View>
          <View style={styles.equipmentInfoItem}>
            <Text style={styles.equipmentInfoLabel}>电流</Text>
            <Text style={styles.equipmentInfoValue}>5.2A</Text>
          </View>
        </View>

        <View style={styles.equipmentAlert}>
          <FontAwesome
            name="bell"
            size={16}
            color="#0066ff"
            style={styles.equipmentAlertIcon}
          />
          <View>
            <Text style={styles.equipmentAlertTitle}>设备警报</Text>
            <Text style={styles.equipmentAlertText}>无异常警报</Text>
          </View>
        </View>

        <View style={styles.planItemFooter}>
          <View style={styles.planItemStats}>
            <Text style={styles.planItemStatsText}>今日运行：</Text>
            <Text style={styles.planItemStatsValue}>8.5小时</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.planItemLink}>详情</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 设备项目2 */}
      <View style={styles.card}>
        <View style={styles.planItemHeader}>
          <Text style={styles.planItemTitle}>波峰焊接机#1</Text>
          <StatusBadge status="故障" color="#ef4444" bgColor="#fee2e2" />
        </View>
        <Text style={styles.planItemCode}>设备编号：EQ20230602-05</Text>

        <View style={styles.equipmentInfoGrid}>
          <View style={styles.equipmentInfoItem}>
            <Text style={styles.equipmentInfoLabel}>设备温度</Text>
            <Text style={styles.equipmentInfoValue}>68°C</Text>
          </View>
          <View style={styles.equipmentInfoItem}>
            <Text style={styles.equipmentInfoLabel}>电机转速</Text>
            <Text style={styles.equipmentInfoValue}>0 RPM</Text>
          </View>
          <View style={styles.equipmentInfoItem}>
            <Text style={styles.equipmentInfoLabel}>电压</Text>
            <Text style={styles.equipmentInfoValue}>0V</Text>
          </View>
          <View style={styles.equipmentInfoItem}>
            <Text style={styles.equipmentInfoLabel}>电流</Text>
            <Text style={styles.equipmentInfoValue}>0A</Text>
          </View>
        </View>

        <View style={[styles.equipmentAlert, styles.equipmentAlertError]}>
          <FontAwesome
            name="exclamation-triangle"
            size={16}
            color="#ef4444"
            style={styles.equipmentAlertIcon}
          />
          <View>
            <Text
              style={[
                styles.equipmentAlertTitle,
                styles.equipmentAlertTitleError,
              ]}
            >
              设备警报
            </Text>
            <Text style={styles.equipmentAlertText}>
              温控系统异常，需要维修
            </Text>
          </View>
        </View>

        <View style={styles.planItemFooter}>
          <View style={styles.planItemStats}>
            <Text style={styles.planItemStatsText}>停机时间：</Text>
            <Text style={styles.planItemStatsValue}>2.5小时</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.planItemLink}>详情</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 设备维护计划 */}
      <Text style={styles.sectionTitle}>设备维护计划</Text>
      <View style={styles.card}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.maintenanceTable}>
            <View style={styles.maintenanceTableHeader}>
              <Text style={styles.maintenanceTableHeaderCell}>设备名称</Text>
              <Text style={styles.maintenanceTableHeaderCell}>维护类型</Text>
              <Text style={styles.maintenanceTableHeaderCell}>计划日期</Text>
              <Text style={styles.maintenanceTableHeaderCell}>负责人</Text>
              <Text style={styles.maintenanceTableHeaderCell}>状态</Text>
            </View>
            <View style={styles.maintenanceTableRow}>
              <Text style={styles.maintenanceTableCell}>SMT贴片机#2</Text>
              <Text style={styles.maintenanceTableCell}>例行保养</Text>
              <Text style={styles.maintenanceTableCell}>2023-12-15</Text>
              <Text style={styles.maintenanceTableCell}>王工程师</Text>
              <View style={styles.maintenanceTableCellStatus}>
                <StatusBadge
                  status="已计划"
                  color="#0066ff"
                  bgColor="#ebf5ff"
                />
              </View>
            </View>
            <View style={styles.maintenanceTableRow}>
              <Text style={styles.maintenanceTableCell}>回流焊机#3</Text>
              <Text style={styles.maintenanceTableCell}>故障维修</Text>
              <Text style={styles.maintenanceTableCell}>2023-12-05</Text>
              <Text style={styles.maintenanceTableCell}>张工程师</Text>
              <View style={styles.maintenanceTableCellStatus}>
                <StatusBadge status="紧急" color="#ef4444" bgColor="#fee2e2" />
              </View>
            </View>
            <View style={styles.maintenanceTableRow}>
              <Text style={styles.maintenanceTableCell}>PCB切割机#1</Text>
              <Text style={styles.maintenanceTableCell}>例行保养</Text>
              <Text style={styles.maintenanceTableCell}>2023-12-20</Text>
              <Text style={styles.maintenanceTableCell}>李工程师</Text>
              <View style={styles.maintenanceTableCellStatus}>
                <StatusBadge
                  status="已计划"
                  color="#0066ff"
                  bgColor="#ebf5ff"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  completionRateCard: {
    backgroundColor: '#ebf5ff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completionRateIcon: {
    marginRight: 12,
  },
  completionRateContent: {
    flex: 1,
  },
  completionRateLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  completionRateValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completionRatePercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066ff',
    marginRight: 8,
  },
  completionRateTrend: {
    fontSize: 12,
    color: '#22c55e',
  },
  planItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  planItemCode: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  planItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  planItemInfoText: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressValue: {
    height: '100%',
    borderRadius: 3,
  },
  planItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planItemStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planItemStatsText: {
    fontSize: 14,
    color: '#6b7280',
  },
  planItemStatsValue: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 12,
  },
  planItemLink: {
    color: '#0066ff',
    fontSize: 14,
  },
  // 设备管理样式
  equipmentInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  equipmentInfoItem: {
    width: '50%',
    marginBottom: 8,
  },
  equipmentInfoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  equipmentInfoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  equipmentAlert: {
    backgroundColor: '#ebf5ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  equipmentAlertError: {
    backgroundColor: '#fee2e2',
  },
  equipmentAlertIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  equipmentAlertTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  equipmentAlertTitleError: {
    color: '#ef4444',
  },
  equipmentAlertText: {
    fontSize: 14,
  },
  // 设备维护计划表格样式
  maintenanceTable: {
    width: '100%',
  },
  maintenanceTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  maintenanceTableHeaderCell: {
    width: 120,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  maintenanceTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  maintenanceTableCell: {
    width: 120,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  maintenanceTableCellStatus: {
    width: 120,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
});
