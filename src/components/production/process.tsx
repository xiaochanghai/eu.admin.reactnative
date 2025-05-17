import { FontAwesome } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ProcessNode } from './process-node';
import { ProgressBar } from './progress-bar';
import { StatusBadge } from './status-badge';

export const Process = () => {
  return (
    <View>
      {/* 工序概览 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>工序概览</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#0066ff' }]}>18</Text>
            <Text style={styles.statLabel}>工序总数</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#22c55e' }]}>10</Text>
            <Text style={styles.statLabel}>使用中</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#f97316' }]}>2</Text>
            <Text style={styles.statLabel}>待优化</Text>
          </View>
        </View>
      </View>

      {/* 工序流程图 */}
      <View style={styles.card}>
        <View style={styles.processFlowHeader}>
          <Text style={styles.processFlowTitle}>智能手表生产工序流程</Text>
          <View style={styles.processFlowBatch}>
            <Text style={styles.processFlowBatchLabel}>当前批次：</Text>
            <Text style={styles.processFlowBatchValue}>B20231204-01</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.processFlowScroll}
        >
          <View style={styles.processFlow}>
            <ProcessNode icon="box" label="原料准备" status="completed" />
            <View style={styles.processFlowLineCompleted} />
            <ProcessNode icon="cut" label="PCB切割" status="completed" />
            <View style={styles.processFlowLineCompleted} />
            <ProcessNode
              icon="microchip"
              label="元器件贴装"
              status="inProgress"
            />
            <View style={styles.processFlowLinePending} />
            <ProcessNode icon="fire" label="回流焊接" status="pending" />
            <View style={styles.processFlowLinePending} />
            <ProcessNode
              icon="check-circle"
              label="功能测试"
              status="pending"
            />
          </View>
        </ScrollView>

        <View style={styles.processFlowInfo}>
          <FontAwesome
            name="info-circle"
            size={16}
            color="#0066ff"
            style={styles.processFlowInfoIcon}
          />
          <View>
            <Text style={styles.processFlowInfoText}>
              当前进度：
              <Text style={styles.processFlowInfoValue}>40%</Text> |
              预计完成时间：
              <Text style={styles.processFlowInfoValue}>2023-12-05 18:00</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* 工序列表 */}
      <Text style={styles.sectionTitle}>工序列表</Text>

      {/* 工序项目1 */}
      <View style={styles.card}>
        <View style={styles.planItemHeader}>
          <Text style={styles.planItemTitle}>元器件贴装</Text>
          <StatusBadge status="使用中" color="#22c55e" bgColor="#dcfce7" />
        </View>
        <Text style={styles.planItemCode}>工序编号：PR20231201-03</Text>

        <View style={styles.processInfoGrid}>
          <View style={styles.processInfoItem}>
            <Text style={styles.processInfoLabel}>负责人</Text>
            <Text style={styles.processInfoValue}>王工程师</Text>
          </View>
          <View style={styles.processInfoItem}>
            <Text style={styles.processInfoLabel}>标准工时</Text>
            <Text style={styles.processInfoValue}>45分钟/批次</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>设备利用率</Text>
            <Text style={styles.progressValue}>85%</Text>
          </View>
          <ProgressBar progress={85} color="#22c55e" />
        </View>

        <View style={styles.processEquipment}>
          <Text style={styles.processEquipmentLabel}>关联设备</Text>
          <View style={styles.processEquipmentItem}>
            <FontAwesome
              name="microchip"
              size={16}
              color="#0066ff"
              style={styles.processEquipmentIcon}
            />
            <Text style={styles.processEquipmentText}>SMT贴片机#2</Text>
          </View>
        </View>

        <View style={styles.planItemFooter}>
          <View style={styles.planItemStats}>
            <Text style={styles.planItemStatsText}>良品率：</Text>
            <Text style={styles.planItemStatsValue}>98.3%</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.planItemLink}>详情</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 工序项目2 */}
      <View style={styles.card}>
        <View style={styles.planItemHeader}>
          <Text style={styles.planItemTitle}>电路板焊接</Text>
          <StatusBadge status="使用中" color="#22c55e" bgColor="#dcfce7" />
        </View>
        <Text style={styles.planItemCode}>工序编号：PR20231201-04</Text>

        <View style={styles.processInfoGrid}>
          <View style={styles.processInfoItem}>
            <Text style={styles.processInfoLabel}>负责人</Text>
            <Text style={styles.processInfoValue}>李工程师</Text>
          </View>
          <View style={styles.processInfoItem}>
            <Text style={styles.processInfoLabel}>标准工时</Text>
            <Text style={styles.processInfoValue}>60分钟/批次</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>设备利用率</Text>
            <Text style={styles.progressValue}>75%</Text>
          </View>
          <ProgressBar progress={75} color="#22c55e" />
        </View>

        <View style={styles.processEquipment}>
          <Text style={styles.processEquipmentLabel}>关联设备</Text>
          <View style={styles.processEquipmentItem}>
            <FontAwesome
              name="fire"
              size={16}
              color="#f97316"
              style={styles.processEquipmentIcon}
            />
            <Text style={styles.processEquipmentText}>波峰焊接机#1</Text>
          </View>
        </View>

        <View style={styles.planItemFooter}>
          <View style={styles.planItemStats}>
            <Text style={styles.planItemStatsText}>良品率：</Text>
            <Text style={styles.planItemStatsValue}>97.5%</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.planItemLink}>详情</Text>
          </TouchableOpacity>
        </View>
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
});
