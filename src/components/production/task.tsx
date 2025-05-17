import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProgressBar } from './progress-bar';
import { StatusBadge } from './status-badge';

export const Task = () => {
  return (
    <View>
      {/* 任务概览 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>任务概览</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#0066ff' }]}>24</Text>
            <Text style={styles.statLabel}>任务总数</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#22c55e' }]}>12</Text>
            <Text style={styles.statLabel}>进行中</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#f97316' }]}>5</Text>
            <Text style={styles.statLabel}>待分配</Text>
          </View>
        </View>
        <View style={styles.completionRateCard}>
          <FontAwesome
            name="users"
            size={20}
            color="#0066ff"
            style={styles.completionRateIcon}
          />
          <View style={styles.completionRateContent}>
            <Text style={styles.completionRateLabel}>员工任务完成率</Text>
            <View style={styles.completionRateValue}>
              <Text style={styles.completionRatePercentage}>82.3%</Text>
              <Text style={styles.completionRateTrend}>↑ 3.7%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 生产任务列表 */}
      <Text style={styles.sectionTitle}>生产任务列表</Text>

      {/* 任务项目1 */}
      <View style={styles.card}>
        <View style={styles.planItemHeader}>
          <Text style={styles.planItemTitle}>主板元器件贴装任务</Text>
          <StatusBadge status="进行中" color="#22c55e" bgColor="#dcfce7" />
        </View>
        <Text style={styles.planItemCode}>任务编号：TA20231205-01</Text>
        <View style={styles.planItemInfo}>
          <Text style={styles.planItemInfoText}>负责人：李技术员</Text>
          <Text style={styles.planItemInfoText}>截止日期：2023-12-10</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>完成进度</Text>
            <Text style={styles.progressValue}>70%</Text>
          </View>
          <ProgressBar progress={70} color="#22c55e" />
        </View>
        <View style={styles.planItemFooter}>
          <View style={styles.planItemStats}>
            <Text style={styles.planItemStatsText}>所属计划：</Text>
            <Text style={styles.planItemStatsValue}>PP20231128-01</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.planItemLink}>详情</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 任务项目2 */}
      <View style={styles.card}>
        <View style={styles.planItemHeader}>
          <Text style={styles.planItemTitle}>电路板焊接任务</Text>
          <StatusBadge status="待分配" color="#f97316" bgColor="#ffedd5" />
        </View>
        <Text style={styles.planItemCode}>任务编号：TA20231205-02</Text>
        <View style={styles.planItemInfo}>
          <Text style={styles.planItemInfoText}>负责人：待分配</Text>
          <Text style={styles.planItemInfoText}>截止日期：2023-12-12</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>完成进度</Text>
            <Text style={styles.progressValue}>0%</Text>
          </View>
          <ProgressBar progress={0} color="#f97316" />
        </View>
        <View style={styles.planItemFooter}>
          <View style={styles.planItemStats}>
            <Text style={styles.planItemStatsText}>所属计划：</Text>
            <Text style={styles.planItemStatsValue}>PP20231128-01</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.planItemLink}>详情</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 任务项目3 */}
      <View style={styles.card}>
        <View style={styles.planItemHeader}>
          <Text style={styles.planItemTitle}>音箱外壳注塑任务</Text>
          <StatusBadge status="进行中" color="#22c55e" bgColor="#dcfce7" />
        </View>
        <Text style={styles.planItemCode}>任务编号：TA20231204-03</Text>
        <View style={styles.planItemInfo}>
          <Text style={styles.planItemInfoText}>负责人：王技术员</Text>
          <Text style={styles.planItemInfoText}>截止日期：2023-12-15</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>完成进度</Text>
            <Text style={styles.progressValue}>45%</Text>
          </View>
          <ProgressBar progress={45} color="#22c55e" />
        </View>
        <View style={styles.planItemFooter}>
          <View style={styles.planItemStats}>
            <Text style={styles.planItemStatsText}>所属计划：</Text>
            <Text style={styles.planItemStatsValue}>PP20231130-02</Text>
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
});
