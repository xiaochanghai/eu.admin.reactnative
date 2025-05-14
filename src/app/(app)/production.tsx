import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SegmentedControl, type SegmentedControlOption } from '@/components';
import { NavHeader, SafeAreaView, ScrollView } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

import ReportDateSelector from '../report-date-selector';

// 进度条组件
type ProgressBarProps = {
  progress: number;
  color: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => (
  <View style={styles.progressBar}>
    <View
      style={[
        styles.progressValue,
        { width: `${progress}%`, backgroundColor: color },
      ]}
    />
  </View>
);

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

// 生产计划项组件
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
};

const PlanItem: React.FC<PlanItemProps> = ({
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
}) => (
  <View style={styles.card}>
    <View style={styles.planItemHeader}>
      <Text style={styles.planItemTitle}>{title}</Text>
      <StatusBadge
        status={status}
        color={statusColor}
        bgColor={statusBgColor}
      />
    </View>
    <Text style={styles.planItemCode}>计划编号：{code}</Text>
    <View style={styles.planItemInfo}>
      <Text style={styles.planItemInfoText}>负责人：{manager}</Text>
      <Text style={styles.planItemInfoText}>截止日期：{deadline}</Text>
    </View>
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>完成进度</Text>
        <Text style={styles.progressValue}>{progress}%</Text>
      </View>
      <ProgressBar progress={progress} color={statusColor} />
    </View>
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
);

// 工序流程节点组件
type ProcessNodeProps = {
  icon: string;
  label: string;
  status: 'completed' | 'inProgress' | 'pending';
};

const ProcessNode: React.FC<ProcessNodeProps> = ({ icon, label, status }) => {
  let statusIcon = null;
  let statusText = '';
  let bgColor = '#ebf5ff';
  let iconColor = '#0066ff';

  if (status === 'completed') {
    statusIcon = (
      <View style={styles.statusIconCompleted}>
        <FontAwesome name="check" size={10} color="white" />
      </View>
    );
    statusText = '已完成';
    bgColor = '#ebf5ff';
  } else if (status === 'inProgress') {
    statusIcon = (
      <View style={styles.statusIconInProgress}>
        <FontAwesome name="spinner" size={10} color="white" />
      </View>
    );
    statusText = '进行中';
    bgColor = '#dcfce7';
    iconColor = '#22c55e';
  } else {
    statusText = '待开始';
  }

  return (
    <View style={styles.processNode}>
      <View style={[styles.processNodeCircle, { backgroundColor: bgColor }]}>
        <FontAwesome name={icon as any} size={20} color={iconColor} />
        {statusIcon}
      </View>
      <Text style={styles.processNodeLabel}>{label}</Text>
      <Text
        style={[
          styles.processNodeStatus,
          status === 'inProgress' ? styles.processNodeStatusInProgress : null,
        ]}
      >
        {statusText}
      </Text>
    </View>
  );
};

const Production: React.FC = () => {
  // const navigation = useNavigation<ProductionScreenNavigationProp>();

  // 分段控制器状态
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabOptions: SegmentedControlOption[] = [
    { key: 'production-plan', label: '生产计划' },
    { key: 'production-task', label: '生产任务' },
    { key: 'process-management', label: '工序管理' },
    { key: 'equipment-management', label: '设备管理' },
    { key: 'production-report', label: '生产报表' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* 顶部导航 */}
      <NavHeader
        title="生产"
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
      <View style={styles.content}>
        {/* 分段控制器 */}
        <SegmentedControl
          options={tabOptions}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        />

        {/* 选项卡内容 */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {selectedTabIndex === 0 && (
            <View>
              {/* 生产概览 */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>生产概览</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#0066ff' }]}>
                      15
                    </Text>
                    <Text style={styles.statLabel}>计划总数</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#22c55e' }]}>
                      8
                    </Text>
                    <Text style={styles.statLabel}>进行中</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#f97316' }]}>
                      3
                    </Text>
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
                    <Text style={styles.completionRateLabel}>
                      本月生产完成率
                    </Text>
                    <View style={styles.completionRateValue}>
                      <Text style={styles.completionRatePercentage}>78.5%</Text>
                      <Text style={styles.completionRateTrend}>↑ 5.2%</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* 生产计划列表 */}
              <Text style={styles.sectionTitle}>生产计划列表</Text>

              {/* 计划项目1 */}
              <PlanItem
                title="智能手表主板生产计划"
                code="PP20231128-01"
                manager="王工程师"
                deadline="2023-12-15"
                progress={65}
                total={1000}
                completed={650}
                status="进行中"
                statusColor="#22c55e"
                statusBgColor="#dcfce7"
              />

              {/* 计划项目2 */}
              <PlanItem
                title="智能音箱外壳注塑计划"
                code="PP20231125-03"
                manager="李工程师"
                deadline="2023-12-10"
                progress={42}
                total={2000}
                completed={840}
                status="进行中"
                statusColor="#22c55e"
                statusBgColor="#dcfce7"
              />

              {/* 计划项目3 */}
              <PlanItem
                title="智能门锁电路板生产计划"
                code="PP20231202-03"
                manager="张工程师"
                deadline="2023-12-25"
                progress={0}
                total={500}
                completed={0}
                status="待开始"
                statusColor="#f97316"
                statusBgColor="#ffedd5"
              />
            </View>
          )}

          {selectedTabIndex === 1 && (
            <View>
              {/* 任务概览 */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>任务概览</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#0066ff' }]}>
                      24
                    </Text>
                    <Text style={styles.statLabel}>任务总数</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#22c55e' }]}>
                      12
                    </Text>
                    <Text style={styles.statLabel}>进行中</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#f97316' }]}>
                      5
                    </Text>
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
                    <Text style={styles.completionRateLabel}>
                      员工任务完成率
                    </Text>
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
                  <StatusBadge
                    status="进行中"
                    color="#22c55e"
                    bgColor="#dcfce7"
                  />
                </View>
                <Text style={styles.planItemCode}>任务编号：TA20231205-01</Text>
                <View style={styles.planItemInfo}>
                  <Text style={styles.planItemInfoText}>负责人：李技术员</Text>
                  <Text style={styles.planItemInfoText}>
                    截止日期：2023-12-10
                  </Text>
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
                  <StatusBadge
                    status="待分配"
                    color="#f97316"
                    bgColor="#ffedd5"
                  />
                </View>
                <Text style={styles.planItemCode}>任务编号：TA20231205-02</Text>
                <View style={styles.planItemInfo}>
                  <Text style={styles.planItemInfoText}>负责人：待分配</Text>
                  <Text style={styles.planItemInfoText}>
                    截止日期：2023-12-12
                  </Text>
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
                  <StatusBadge
                    status="进行中"
                    color="#22c55e"
                    bgColor="#dcfce7"
                  />
                </View>
                <Text style={styles.planItemCode}>任务编号：TA20231204-03</Text>
                <View style={styles.planItemInfo}>
                  <Text style={styles.planItemInfoText}>负责人：王技术员</Text>
                  <Text style={styles.planItemInfoText}>
                    截止日期：2023-12-15
                  </Text>
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
          )}

          {selectedTabIndex === 2 && (
            <View>
              {/* 工序概览 */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>工序概览</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#0066ff' }]}>
                      18
                    </Text>
                    <Text style={styles.statLabel}>工序总数</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#22c55e' }]}>
                      10
                    </Text>
                    <Text style={styles.statLabel}>使用中</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#f97316' }]}>
                      2
                    </Text>
                    <Text style={styles.statLabel}>待优化</Text>
                  </View>
                </View>
              </View>

              {/* 工序流程图 */}
              <View style={styles.card}>
                <View style={styles.processFlowHeader}>
                  <Text style={styles.processFlowTitle}>
                    智能手表生产工序流程
                  </Text>
                  <View style={styles.processFlowBatch}>
                    <Text style={styles.processFlowBatchLabel}>当前批次：</Text>
                    <Text style={styles.processFlowBatchValue}>
                      B20231204-01
                    </Text>
                  </View>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.processFlowScroll}
                >
                  <View style={styles.processFlow}>
                    <ProcessNode
                      icon="box"
                      label="原料准备"
                      status="completed"
                    />
                    <View style={styles.processFlowLineCompleted} />
                    <ProcessNode
                      icon="cut"
                      label="PCB切割"
                      status="completed"
                    />
                    <View style={styles.processFlowLineCompleted} />
                    <ProcessNode
                      icon="microchip"
                      label="元器件贴装"
                      status="inProgress"
                    />
                    <View style={styles.processFlowLinePending} />
                    <ProcessNode
                      icon="fire"
                      label="回流焊接"
                      status="pending"
                    />
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
                      <Text style={styles.processFlowInfoValue}>
                        2023-12-05 18:00
                      </Text>
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
                  <StatusBadge
                    status="使用中"
                    color="#22c55e"
                    bgColor="#dcfce7"
                  />
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
                  <StatusBadge
                    status="使用中"
                    color="#22c55e"
                    bgColor="#dcfce7"
                  />
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
                    <Text style={styles.processEquipmentText}>
                      波峰焊接机#1
                    </Text>
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
          )}

          {selectedTabIndex === 3 && (
            <View>
              {/* 设备概览 */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>设备概览</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#0066ff' }]}>
                      32
                    </Text>
                    <Text style={styles.statLabel}>设备总数</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#22c55e' }]}>
                      25
                    </Text>
                    <Text style={styles.statLabel}>运行中</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: '#ef4444' }]}>
                      2
                    </Text>
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
                    <Text style={styles.completionRateLabel}>
                      设备综合效率(OEE)
                    </Text>
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
                  <StatusBadge
                    status="运行中"
                    color="#22c55e"
                    bgColor="#dcfce7"
                  />
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
                  <StatusBadge
                    status="故障"
                    color="#ef4444"
                    bgColor="#fee2e2"
                  />
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

                <View
                  style={[styles.equipmentAlert, styles.equipmentAlertError]}
                >
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
                      <Text style={styles.maintenanceTableHeaderCell}>
                        设备名称
                      </Text>
                      <Text style={styles.maintenanceTableHeaderCell}>
                        维护类型
                      </Text>
                      <Text style={styles.maintenanceTableHeaderCell}>
                        计划日期
                      </Text>
                      <Text style={styles.maintenanceTableHeaderCell}>
                        负责人
                      </Text>
                      <Text style={styles.maintenanceTableHeaderCell}>
                        状态
                      </Text>
                    </View>
                    <View style={styles.maintenanceTableRow}>
                      <Text style={styles.maintenanceTableCell}>
                        SMT贴片机#2
                      </Text>
                      <Text style={styles.maintenanceTableCell}>例行保养</Text>
                      <Text style={styles.maintenanceTableCell}>
                        2023-12-15
                      </Text>
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
                      <Text style={styles.maintenanceTableCell}>
                        回流焊机#3
                      </Text>
                      <Text style={styles.maintenanceTableCell}>故障维修</Text>
                      <Text style={styles.maintenanceTableCell}>
                        2023-12-05
                      </Text>
                      <Text style={styles.maintenanceTableCell}>张工程师</Text>
                      <View style={styles.maintenanceTableCellStatus}>
                        <StatusBadge
                          status="紧急"
                          color="#ef4444"
                          bgColor="#fee2e2"
                        />
                      </View>
                    </View>
                    <View style={styles.maintenanceTableRow}>
                      <Text style={styles.maintenanceTableCell}>
                        PCB切割机#1
                      </Text>
                      <Text style={styles.maintenanceTableCell}>例行保养</Text>
                      <Text style={styles.maintenanceTableCell}>
                        2023-12-20
                      </Text>
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
          )}

          {selectedTabIndex === 4 && (
            <View>
              {/* 报表概览 */}
              <View style={styles.reportHeader}>
                <Text style={styles.sectionTitle}>生产报表</Text>
                <ReportDateSelector />
              </View>

              {/* 生产数据 */}
              <View style={styles.card}>
                <View style={styles.reportHeader}>
                  <Text style={styles.reportTitle}>生产数据</Text>
                  <Text style={styles.reportDate}>2023-12-05</Text>
                </View>

                <View style={styles.reportGrid}>
                  <View style={styles.reportItem}>
                    <Text style={styles.reportItemValue}>1,250</Text>
                    <Text style={styles.reportItemLabel}>计划产量</Text>
                  </View>
                  <View style={styles.reportItem}>
                    <Text style={styles.reportItemValue}>1,180</Text>
                    <Text style={styles.reportItemLabel}>实际产量</Text>
                  </View>
                  <View style={styles.reportItem}>
                    <Text style={styles.reportItemValue}>94.4%</Text>
                    <Text style={styles.reportItemLabel}>计划完成率</Text>
                  </View>
                  <View style={styles.reportItem}>
                    <Text style={styles.reportItemValue}>98.3%</Text>
                    <Text style={styles.reportItemLabel}>良品率</Text>
                  </View>
                </View>

                <View style={styles.reportChart}>
                  <Text style={styles.reportChartTitle}>各产品线产量对比</Text>
                  <View style={styles.chartPlaceholder}>
                    <FontAwesome name="bar-chart" size={40} color="#0066ff" />
                    <Text style={styles.chartPlaceholderText}>
                      产量数据图表
                    </Text>
                  </View>
                </View>
              </View>

              {/* 设备运行报表 */}
              <View style={styles.card}>
                <View style={styles.reportHeader}>
                  <Text style={styles.reportTitle}>设备运行报表</Text>
                  <Text style={styles.reportDate}>2023-12-05</Text>
                </View>

                <View style={styles.reportGrid}>
                  <View style={styles.reportItem}>
                    <Text style={styles.reportItemValue}>32</Text>
                    <Text style={styles.reportItemLabel}>设备总数</Text>
                  </View>
                  <View style={styles.reportItem}>
                    <Text style={styles.reportItemValue}>28</Text>
                    <Text style={styles.reportItemLabel}>运行设备</Text>
                  </View>
                  <View style={styles.reportItem}>
                    <Text style={styles.reportItemValue}>87.5%</Text>
                    <Text style={styles.reportItemLabel}>设备利用率</Text>
                  </View>
                  <View style={styles.reportItem}>
                    <Text style={styles.reportItemValue}>4.2h</Text>
                    <Text style={styles.reportItemLabel}>平均运行</Text>
                  </View>
                </View>

                <View style={styles.reportChart}>
                  <Text style={styles.reportChartTitle}>设备运行状态分布</Text>
                  <View style={styles.chartPlaceholder}>
                    <FontAwesome name="pie-chart" size={40} color="#0066ff" />
                    <Text style={styles.chartPlaceholderText}>
                      设备状态图表
                    </Text>
                  </View>
                </View>
              </View>

              {/* 报表下载 */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>生产报表</Text>
                <TouchableOpacity style={styles.reportDownloadButton}>
                  <FontAwesome
                    name="file-pdf-o"
                    size={20}
                    color="#ef4444"
                    style={styles.reportDownloadIcon}
                  />
                  <Text style={styles.reportDownloadText}>
                    下载本月生产报表
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* 浮动按钮 */}
      <TouchableOpacity style={styles.floatingButton}>
        <FontAwesome name="plus" size={24} color="white" />
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

export default Production;
