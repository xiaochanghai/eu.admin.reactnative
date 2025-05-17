import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProgressBar } from './progress-bar';
import { StatusBadge } from './status-badge';

/**
 * 生产计划项组件属性
 * @property title - 计划标题
 * @property code - 计划编号
 * @property manager - 负责人
 * @property deadline - 截止日期
 * @property progress - 进度百分比
 * @property total - 计划总量
 * @property completed - 已完成量
 * @property status - 状态文本
 * @property statusColor - 状态文本颜色
 * @property statusBgColor - 状态背景色
 * @property onViewDetail - 查看详情回调函数
 */
type PlanItemProps = {
  title: string;
  code: string;
  manager: string;
  deadline: string;
  progress: number;
  total: number;
  completed: number;
  status: string;
  statusColor: string;
  statusBgColor: string;
  onViewDetail?: () => void;
};

/**
 * 生产计划项组件
 * 显示单个生产计划的基本信息和进度
 */
export const PlanItem: React.FC<PlanItemProps> = ({
  title,
  code,
  manager,
  deadline,
  progress,
  total,
  completed,
  status,
  statusColor,
  statusBgColor,
  onViewDetail,
}) => (
  <TouchableOpacity onPress={onViewDetail} activeOpacity={0.7}>
    <View style={styles.card}>
      {/* 标题和状态区域 */}
      <View style={styles.planItemHeader}>
        <Text style={styles.planItemTitle}>{title}</Text>
        <StatusBadge
          status={status}
          color={statusColor}
          bgColor={statusBgColor}
        />
      </View>

      {/* 计划编号 */}
      <Text style={styles.planItemCode}>计划编号：{code}</Text>

      {/* 负责人和截止日期 */}
      <View style={styles.planItemInfo}>
        <Text style={styles.planItemInfoText}>负责人：{manager}</Text>
        <Text style={styles.planItemInfoText}>截止日期：{deadline}</Text>
      </View>

      {/* 进度条区域 */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>完成进度</Text>
          <Text style={styles.progressValue}>{progress}%</Text>
        </View>
        <ProgressBar progress={progress} color={statusColor} />
      </View>

      {/* 底部统计和详情链接 */}
      <View style={styles.planItemFooter}>
        <View style={styles.planItemStats}>
          <Text style={styles.planItemStatsText}>计划产量：</Text>
          <Text style={styles.planItemStatsValue}>{total}</Text>
          <Text style={styles.planItemStatsText}>已完成：</Text>
          <Text style={styles.planItemStatsValue}>{completed}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.planItemLink}>详情</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

export const Plans = () => {
  const router = useRouter();
  const planItems = [
    {
      title: '智能手表主板生产计划',
      code: 'PP20231128-01',
      manager: '王工程师',
      deadline: '2023-12-15',
      progress: 65,
      total: 1000,
      completed: 650,
      status: '进行中',
      statusColor: '#22c55e',
      statusBgColor: '#dcfce7',
      id: 1,
    },
    {
      title: '智能音箱外壳注塑计划',
      code: 'PP20231125-03',
      manager: '李工程师',
      deadline: '2023-12-10',
      progress: 42,
      total: 2000,
      completed: 840,
      status: '进行中',
      statusColor: '#22c55e',
      statusBgColor: '#dcfce7',
      id: 2,
    },
    {
      title: '智能门锁电路板生产计划',
      code: 'PP20231202-03',
      manager: '张工程师',
      deadline: '2023-12-25',
      progress: 0,
      total: 500,
      completed: 0,
      status: '待开始',
      statusColor: '#f97316',
      statusBgColor: '#ffedd5',
      id: 3,
    },
  ];

  return (
    <>
      {/* 生产概览 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>生产概览</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#0066ff' }]}>15</Text>
            <Text style={styles.statLabel}>计划总数</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#22c55e' }]}>8</Text>
            <Text style={styles.statLabel}>进行中</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#f97316' }]}>3</Text>
            <Text style={styles.statLabel}>待开始</Text>
          </View>
        </View>
        <View style={styles.completionRateCard}>
          <FontAwesome
            name="line-chart"
            size={20}
            color="#0066ff"
            style={styles.completionRateIcon}
          />
          <View style={styles.completionRateContent}>
            <Text style={styles.completionRateLabel}>本月生产完成率</Text>
            <View style={styles.completionRateValue}>
              <Text style={styles.completionRatePercentage}>78.5%</Text>
              <Text style={styles.completionRateTrend}>↑ 5.2%</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>生产计划列表</Text>
      {/* 生产计划列表 */}

      {planItems.map((item) => (
        <PlanItem
          key={item.id}
          title={item.title}
          code={item.code}
          manager={item.manager}
          deadline={item.deadline}
          progress={item.progress}
          total={item.total}
          completed={item.completed}
          status={item.status}
          statusColor={item.statusColor}
          statusBgColor={item.statusBgColor}
          onViewDetail={() => router.push(`/production/${item.id}`)}
        />
      ))}
    </>
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
});
