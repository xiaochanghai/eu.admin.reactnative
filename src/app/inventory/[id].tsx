import React, { useState } from 'react';
import {
  Dimensions,
  // Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { NavHeader, ScrollView, Text, View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

type TabType = 'info' | 'records' | 'usage';

interface RecordItem {
  type: string;
  date: string;
  quantity: string;
  operator: string;
  document: string;
  isInbound: boolean;
}

interface UsageProduct {
  name: string;
  quantityPerUnit: string;
  monthlyConsumption: string;
}

interface RelatedMaterial {
  name: string;
  code: string;
  quantity: number;
  safetyStock: number;
  status: 'normal' | 'warning' | 'danger';
}

const InventoryDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('info');

  // 模拟数据
  const materialData = {
    id: 'RM-10K-0805',
    name: '电阻 10kΩ',
    category: '原材料',
    tag: '常用',
    currentStock: 5000,
    unit: '个',
    safetyStock: 1000,
    status: '充足',
    spec: '0805封装 10kΩ ±1%',
    category_detail: '电子元件 / 电阻',
    supplier: '深圳市电子元件有限公司',
    purchaseCycle: '3天',
    price: 0.05,
    stockValue: 250.0,
    location: 'A区-03-12',
    remark: '主板电路常用电阻',
  };

  const records: RecordItem[] = [
    {
      type: '入库',
      date: '2023-06-15 14:30',
      quantity: '+2,000个',
      operator: '张工',
      document: 'PO-20230610-001',
      isInbound: true,
    },
    {
      type: '出库',
      date: '2023-06-10 09:15',
      quantity: '-500个',
      operator: '李工',
      document: 'WO-20230608-002',
      isInbound: false,
    },
    {
      type: '入库',
      date: '2023-06-01 11:20',
      quantity: '+3,500个',
      operator: '张工',
      document: 'PO-20230525-003',
      isInbound: true,
    },
  ];

  const usageProducts: UsageProduct[] = [
    {
      name: '智能控制器 A1',
      quantityPerUnit: '每件用量: 8个',
      monthlyConsumption: '月消耗: 约2,400个',
    },
    {
      name: '电源模块',
      quantityPerUnit: '每件用量: 4个',
      monthlyConsumption: '月消耗: 约800个',
    },
    {
      name: '主板组件',
      quantityPerUnit: '每件用量: 12个',
      monthlyConsumption: '月消耗: 约1,200个',
    },
  ];

  const relatedMaterials: RelatedMaterial[] = [
    {
      name: '电阻 1kΩ',
      code: 'RM-1K-0805',
      quantity: 4200,
      safetyStock: 1000,
      status: 'normal',
    },
    {
      name: '电阻 100kΩ',
      code: 'RM-100K-0805',
      quantity: 3800,
      safetyStock: 1000,
      status: 'normal',
    },
    {
      name: '电容 0.1uF',
      code: 'CM-0.1UF-0805',
      quantity: 1500,
      safetyStock: 1200,
      status: 'warning',
    },
  ];

  // 库存趋势图数据
  const stockData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        data: [3000, 4500, 2800, 5000, 3500, 5000],
        color: () => `rgba(59, 130, 246, 1)`,
        strokeWidth: 2,
      },
      {
        data: [100, 800, 200, 1000, 800, 1000],
        color: () => `rgba(239, 68, 68, 1)`,
        strokeWidth: 2,
        withDots: false,
      },
    ],
    legend: ['库存量', '安全库存'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: () => `rgba(59, 130, 246, 0.6)`,
    labelColor: () => `rgba(107, 114, 128, 1)`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#3b82f6',
    },
  };

  const screenWidth = Dimensions.get('window').width - 40; // 考虑内边距

  // 详情行组件
  const DetailRow = ({ label = '', value = '', isLast = false }) => (
    <View
      className={`flex-row py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}
    >
      <Text className="w-1/3 text-sm text-gray-500">{label}</Text>
      <Text className="w-2/3 text-sm">{value}</Text>
    </View>
  );

  // 获取库存状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '充足':
        return { bg: 'bg-green-500', text: 'text-green-600' };
      case '警告':
        return { bg: 'bg-yellow-500', text: 'text-yellow-600' };
      case '不足':
        return { bg: 'bg-red-500', text: 'text-red-600' };
      default:
        return { bg: 'bg-green-500', text: 'text-green-600' };
    }
  };

  const statusColor = getStatusColor(materialData.status);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <View>
            <DetailRow label="规格型号" value={materialData.spec} />
            <DetailRow label="类别" value={materialData.category_detail} />
            <DetailRow label="单位" value={materialData.unit} />
            <DetailRow label="供应商" value={materialData.supplier} />
            <DetailRow label="采购周期" value={materialData.purchaseCycle} />
            <DetailRow
              label="单价"
              value={`¥${materialData.price.toFixed(2)}`}
            />
            <DetailRow
              label="库存价值"
              value={`¥${materialData.stockValue.toFixed(2)}`}
            />
            <DetailRow label="存放位置" value={materialData.location} />
            <DetailRow label="备注" value={materialData.remark} isLast />
          </View>
        );
      case 'records':
        return (
          <View>
            {records.map((record, index) => (
              <View
                key={index}
                className={`py-3 ${index < records.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <View className="mb-1 flex-row items-center justify-between">
                  <Text className="font-medium">{record.type}</Text>
                  <Text className="text-sm text-gray-500">{record.date}</Text>
                </View>
                <Text
                  className={`mb-1 text-sm ${record.isInbound ? 'text-green-600' : 'text-red-600'}`}
                >
                  数量: {record.quantity}
                </Text>
                <Text className="text-sm text-gray-600">
                  操作人: {record.operator}
                </Text>
                <Text className="text-sm text-gray-600">
                  关联单据: {record.document}
                </Text>
              </View>
            ))}
          </View>
        );
      case 'usage':
        return (
          <View>
            <Text className="text-md mb-3 font-semibold">近期使用产品</Text>
            <View className="space-y-3">
              {usageProducts.map((product, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between"
                >
                  <View className="flex-row items-center">
                    <FontAwesome
                      name="cube"
                      size={16}
                      className="mr-2 text-blue-500"
                    />
                    <View>
                      <Text className="font-medium">{product.name}</Text>
                      <Text className="text-xs text-gray-500">
                        {product.quantityPerUnit}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-sm">{product.monthlyConsumption}</Text>
                </View>
              ))}
            </View>

            <Text className="text-md mb-3 mt-4 font-semibold">消耗预测</Text>
            <View className="rounded-lg bg-blue-50 p-3">
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="text-sm">预计月消耗</Text>
                <Text className="font-medium">约4,500个</Text>
              </View>
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="text-sm">当前库存可用</Text>
                <Text className="font-medium">约1.1个月</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm">建议补货时间</Text>
                <Text className="font-medium text-orange-600">2周内</Text>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <NavHeader
        title="库存详情"
        right={
          <>
            <TouchableOpacity>
              <FontAwesome name="plus" size={12} />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4 pb-20"
      >
        {/* 物料基本信息卡片 */}
        <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <View className="mb-4 flex-row items-center">
            <View className="mr-4 flex size-20 items-center justify-center rounded-lg bg-gray-200">
              <FontAwesome name="microchip" size={32} color="#9ca3af" />
            </View>
            <View>
              <Text className="text-xl font-semibold">{materialData.name}</Text>
              <Text className="mt-1 text-sm text-gray-500">
                编号: {materialData.id}
              </Text>
              <View className="mt-2 flex-row items-center">
                <View className="mr-2 rounded-full bg-green-100 px-2 py-1">
                  <Text className="text-xs font-medium text-green-800">
                    {materialData.category}
                  </Text>
                </View>
                <View className="rounded-full bg-blue-100 px-2 py-1">
                  <Text className="text-xs font-medium text-blue-800">
                    {materialData.tag}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* 库存状态 */}
          <View className="mb-4 flex-row items-center justify-between rounded-lg bg-blue-50 p-3">
            <View>
              <Text className="text-sm text-gray-600">当前库存</Text>
              <Text className="mt-1 text-xl font-bold text-blue-600">
                {materialData.currentStock.toLocaleString()}
                <Text className="ml-1 text-sm font-normal">
                  {materialData.unit}
                </Text>
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-600">安全库存</Text>
              <Text className="mt-1 text-lg font-medium text-gray-700">
                {materialData.safetyStock.toLocaleString()}
                <Text className="ml-1 text-sm font-normal">
                  {materialData.unit}
                </Text>
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-600">状态</Text>
              <View className="mt-1 flex-row items-center">
                <View
                  className={`mr-1 size-3 rounded-full ${statusColor.bg}`}
                />
                <Text className={`font-medium ${statusColor.text}`}>
                  {materialData.status}
                </Text>
              </View>
            </View>
          </View>

          {/* 快捷操作按钮 */}
          <View className="flex-row justify-between">
            <TouchableOpacity className="mr-2 flex-1 items-center justify-center rounded-lg bg-blue-600 py-2">
              <FontAwesome
                name="sign-in"
                size={16}
                color="#ffffff"
                className="mb-1"
              />
              <Text className="text-xs text-white">入库</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-2 flex-1 items-center justify-center rounded-lg bg-orange-500 py-2">
              <FontAwesome
                name="sign-out"
                size={16}
                color="#ffffff"
                className="mb-1"
              />
              <Text className="text-xs text-white">出库</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-2 flex-1 items-center justify-center rounded-lg bg-green-500 py-2">
              <FontAwesome
                name="exchange"
                size={16}
                color="#ffffff"
                className="mb-1"
              />
              <Text className="text-xs text-white">调拨</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center justify-center rounded-lg bg-purple-500 py-2">
              <FontAwesome
                name="qrcode"
                size={16}
                color="#ffffff"
                className="mb-1"
              />
              <Text className="text-xs text-white">扫码</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 库存趋势图 */}
        <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <Text className="mb-3 text-lg font-semibold">库存趋势</Text>
          <LineChart
            data={stockData}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            // yAxisLabel="$"
            // yAxisSuffix="k"
            // yAxisInterval={1} // optional, defaults to 1
            // className="rounded-lg"
            withInnerLines={false}
            withOuterLines={true}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            withDots={true}
            withShadow={false}
            segments={4}

            //
          />
        </View>

        {/* 详细信息选项卡 */}
        <View className="mb-4 overflow-hidden rounded-lg bg-white shadow-sm">
          <View className="flex-row border-b border-gray-100">
            <TouchableOpacity
              className={`flex-1 items-center px-4 py-2 ${activeTab === 'info' ? 'border-b-2 border-blue-600' : ''}`}
              onPress={() => setActiveTab('info')}
            >
              <Text
                className={`text-sm font-medium ${activeTab === 'info' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                基本信息
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 items-center px-4 py-2 ${activeTab === 'records' ? 'border-b-2 border-blue-600' : ''}`}
              onPress={() => setActiveTab('records')}
            >
              <Text
                className={`text-sm font-medium ${activeTab === 'records' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                出入库记录
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 items-center px-4 py-2 ${activeTab === 'usage' ? 'border-b-2 border-blue-600' : ''}`}
              onPress={() => setActiveTab('usage')}
            >
              <Text
                className={`text-sm font-medium ${activeTab === 'usage' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                使用情况
              </Text>
            </TouchableOpacity>
          </View>

          <View className="p-4">{renderTabContent()}</View>
        </View>

        {/* 相关物料 */}
        <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold">相关物料</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600">查看全部</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-3">
            {relatedMaterials.map((material, index) => {
              let indicatorColor = 'bg-green-500';
              if (material.status === 'warning') {
                indicatorColor = 'bg-yellow-500';
              } else if (material.status === 'danger') {
                indicatorColor = 'bg-red-500';
              }

              return (
                <View
                  key={index}
                  className="flex-row items-center justify-between"
                >
                  <View className="flex-row items-center">
                    <View
                      className={`mr-2 size-2 rounded-full ${indicatorColor}`}
                    />
                    <View>
                      <Text className="font-medium">{material.name}</Text>
                      <Text className="text-xs text-gray-500">
                        编号: {material.code}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="font-medium">
                      {material.quantity.toLocaleString()}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      安全库存: {material.safetyStock.toLocaleString()}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InventoryDetail;
