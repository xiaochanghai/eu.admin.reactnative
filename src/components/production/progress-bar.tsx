import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '@/components/ui';

// 进度条组件
type ProgressBarProps = {
  progress: number;
  color: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
}) => (
  <View style={styles.progressBar}>
    <View
      style={[
        styles.progressValue,
        { width: `${progress}%`, backgroundColor: color },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerButton: {
    marginLeft: 16,
  },

  scrollView: {
    flex: 1,
    marginTop: 16,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
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
  tabContent: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  tabContentText: {
    fontSize: 16,
    color: '#6b7280',
  },
  // 工序流程图样式
  processFlowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  processFlowTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  processFlowBatch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  processFlowBatchLabel: {
    fontSize: 14,
    color: '#0066ff',
    fontWeight: '500',
  },
  processFlowBatchValue: {
    fontSize: 14,
  },
  processFlowScroll: {
    marginBottom: 12,
  },
  processFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    minWidth: '100%',
  },
  processNode: {
    alignItems: 'center',
    width: 64,
    marginHorizontal: 8,
  },
  processNodeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  statusIconCompleted: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIconInProgress: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0066ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  processNodeLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  processNodeStatus: {
    fontSize: 12,
    color: '#6b7280',
  },
  processNodeStatusInProgress: {
    color: '#0066ff',
  },
  processFlowLineCompleted: {
    width: 48,
    height: 2,
    backgroundColor: '#22c55e',
  },
  processFlowLinePending: {
    width: 48,
    height: 2,
    backgroundColor: '#e5e7eb',
  },
  processFlowInfo: {
    backgroundColor: '#ebf5ff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  processFlowInfoIcon: {
    marginRight: 8,
  },
  processFlowInfoText: {
    fontSize: 14,
  },
  processFlowInfoValue: {
    fontWeight: '500',
  },
  // 工序管理样式
  processInfoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  processInfoItem: {
    flex: 1,
  },
  processInfoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  processInfoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  processEquipment: {
    backgroundColor: '#ebf5ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  processEquipmentLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  processEquipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  processEquipmentIcon: {
    marginRight: 8,
  },
  processEquipmentText: {
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
  // 报表样式
  reportDateSelector: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginTop: 12,
  },
  reportDateButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  reportDateButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  reportDateButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  reportDateButtonTextActive: {
    color: '#0066ff',
    fontWeight: '500',
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
  reportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  reportItem: {
    width: '50%',
    marginBottom: 12,
  },
  reportItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066ff',
    marginBottom: 4,
  },
  reportItemLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  reportChart: {
    marginBottom: 12,
  },
  reportChartTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  chartPlaceholder: {
    height: 160,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  reportDownloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  reportDownloadIcon: {
    marginRight: 12,
  },
  reportDownloadText: {
    fontSize: 14,
    color: '#333',
  },
});
