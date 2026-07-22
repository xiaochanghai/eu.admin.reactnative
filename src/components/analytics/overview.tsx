import React from 'react';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

import { Text, View } from '@/components/ui';
import { useAppColorScheme } from '@/lib';

import {
  AnalyticsSection,
  getAnalyticsChartConfig,
  PeriodHeader,
  ResponsiveChart,
} from './analytics-ui';
import { KpiCard } from './kpi-card';
import { ReportItem } from './report-item';

const salesData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
  datasets: [{ data: [60, 75, 45, 80, 65, 90, 70, 85, 95] }],
};

const productionOrderData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
  datasets: [
    {
      data: [40, 30, 45, 50, 65, 60, 70, 72, 85],
      color: (opacity = 1) => `rgba(109, 87, 255, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [30, 40, 35, 45, 55, 50, 60, 65, 75],
      color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ['订单量', '生产量'],
};

const getProductCategoryData = (isDark: boolean) => [
  {
    name: '智能手表',
    population: 45,
    color: '#6D57FF',
    legendFontColor: isDark ? '#a3a3a3' : '#737373',
    legendFontSize: 11,
  },
  {
    name: '智能音箱',
    population: 25,
    color: '#22c55e',
    legendFontColor: isDark ? '#a3a3a3' : '#737373',
    legendFontSize: 11,
  },
  {
    name: '智能门锁',
    population: 15,
    color: '#f59e0b',
    legendFontColor: isDark ? '#a3a3a3' : '#737373',
    legendFontSize: 11,
  },
  {
    name: '其他产品',
    population: 15,
    color: '#a3a3a3',
    legendFontColor: isDark ? '#a3a3a3' : '#737373',
    legendFontSize: 11,
  },
];

export const OverView = () => {
  const { isDark } = useAppColorScheme();
  const chartConfig = getAnalyticsChartConfig(isDark);

  return (
    <View>
      <PeriodHeader
        title="本月经营概览"
        description="覆盖销售、生产、库存与质量核心指标"
      />

      <View className="mb-2 flex-row flex-wrap justify-between">
        <KpiCard
          title="总订单金额"
          value="¥1,258,600"
          trend="↑ 12.5%"
          color="#6D57FF"
        />
        <KpiCard
          title="生产完成率"
          value="78.5%"
          trend="↑ 5.2%"
          color="#22c55e"
        />
        <KpiCard title="库存周转率" value="4.2" trend="↑ 0.3" color="#f59e0b" />
        <KpiCard
          title="质检合格率"
          value="98.5%"
          trend="↑ 1.2%"
          color="#8b5cf6"
        />
      </View>

      <AnalyticsSection
        title="销售趋势"
        description="近 9 个月销售额，单位：万元"
      >
        <ResponsiveChart>
          {(width) => (
            <BarChart
              data={salesData}
              width={width}
              height={220}
              yAxisLabel="¥"
              yAxisSuffix="万"
              chartConfig={chartConfig}
              fromZero
              showBarTops={false}
              withInnerLines
              style={{ marginLeft: -10 }}
            />
          )}
        </ResponsiveChart>
      </AnalyticsSection>

      <AnalyticsSection
        title="生产与订单对比"
        description="订单需求与实际产出走势"
      >
        <ResponsiveChart>
          {(width) => (
            <LineChart
              data={productionOrderData}
              width={width}
              height={220}
              chartConfig={chartConfig}
              bezier
              withShadow={false}
              style={{ marginLeft: -10 }}
            />
          )}
        </ResponsiveChart>
      </AnalyticsSection>

      <AnalyticsSection title="产品类别分布" description="按本月订单金额统计">
        <ResponsiveChart>
          {(width) => (
            <PieChart
              data={getProductCategoryData(isDark)}
              width={width}
              height={196}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="8"
              center={[8, 0]}
              absolute
            />
          )}
        </ResponsiveChart>
      </AnalyticsSection>

      <AnalyticsSection
        title="数据报表"
        description="可下载的最新月度资料"
        actionLabel="全部报表"
      >
        <View className="border-t border-neutral-100 pt-1 dark:border-neutral-800">
          <ReportItem
            icon="file-pdf-o"
            iconColor="#ef4444"
            title="月度销售报表"
            date="2023年11月 · PDF"
            onPress={() => {}}
          />
          <ReportItem
            icon="file-excel-o"
            iconColor="#22c55e"
            title="生产效率分析"
            date="2023年11月 · XLSX"
            onPress={() => {}}
          />
          <ReportItem
            icon="file-powerpoint-o"
            iconColor="#f97316"
            title="质量控制报告"
            date="2023年11月 · PPTX"
            onPress={() => {}}
          />
          <Text className="mt-1 text-[11px] text-neutral-400">
            报表数据与当前筛选周期同步
          </Text>
        </View>
      </AnalyticsSection>
    </View>
  );
};
