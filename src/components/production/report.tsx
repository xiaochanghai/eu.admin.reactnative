import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ReportDateSelector from './report-date-selector';

export const Report = () => {
  return (
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
            <Text style={styles.chartPlaceholderText}>产量数据图表</Text>
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
            <Text style={styles.chartPlaceholderText}>设备状态图表</Text>
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
          <Text style={styles.reportDownloadText}>下载本月生产报表</Text>
        </TouchableOpacity>
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
