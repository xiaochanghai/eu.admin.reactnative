import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { NavHeader } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';
// import { LineChart } from 'react-native-chart-kit';

type TabType = 'info' | 'records' | 'docs';

interface RecordItem {
  type: string;
  orderNumber: string;
  quantity: string;
  date: string;
  isInbound: boolean;
}

interface DocumentItem {
  name: string;
  type: string;
  icon: string;
  size: string;
  uploadDate: string;
}

interface RelatedMaterial {
  name: string;
  code: string;
  spec: string;
  stock: string;
}

const MaterialDetail = () => {
  const [activeTab, setActiveTab] = useState<TabType>('info');

  // 模拟数据
  const materialData = {
    id: 'M10023',
    name: '铝合金型材 AL6061',
    category: '原材料',
    tag: '常用',
    currentStock: 120,
    unit: '根',
    safetyStock: 50,
    status: '充足',
    spec: '20mm×40mm×6000mm',
    material: '铝合金 6061-T6',
    price: 185.0,
    supplier: '广州市恒鑫金属材料有限公司',
    location: 'A区-03-B12',
    createDate: '2023-05-18',
    remark: '用于机器框架结构，需按图纸要求切割',
  };

  const records: RecordItem[] = [
    {
      type: '入库',
      orderNumber: 'RK20230612-001',
      quantity: '+30根',
      date: '2023-06-12 14:30',
      isInbound: true,
    },
    {
      type: '出库',
      orderNumber: 'CK20230605-008',
      quantity: '-15根',
      date: '2023-06-05 09:15',
      isInbound: false,
    },
    {
      type: '入库',
      orderNumber: 'RK20230528-003',
      quantity: '+50根',
      date: '2023-05-28 16:45',
      isInbound: true,
    },
    {
      type: '出库',
      orderNumber: 'CK20230520-012',
      quantity: '-25根',
      date: '2023-05-20 11:30',
      isInbound: false,
    },
  ];

  const documents: DocumentItem[] = [
    {
      name: '产品规格书',
      type: 'PDF文档',
      icon: 'file-pdf',
      size: '2.5MB',
      uploadDate: '2023-05-18上传',
    },
    {
      name: '材质检测报告',
      type: 'Excel文档',
      icon: 'file-excel',
      size: '1.2MB',
      uploadDate: '2023-05-18上传',
    },
    {
      name: '材料图片',
      type: 'JPG图片',
      icon: 'file-image',
      size: '3.8MB',
      uploadDate: '2023-05-18上传',
    },
    {
      name: '供应商信息',
      type: 'TXT文档',
      icon: 'file-alt',
      size: '0.5MB',
      uploadDate: '2023-05-18上传',
    },
  ];

  const relatedMaterials: RelatedMaterial[] = [
    {
      name: '铝合金型材 AL6063',
      code: 'M10024',
      spec: '30mm×60mm×6000mm',
      stock: '85根',
    },
    {
      name: '铝合金型材 AL6082',
      code: 'M10025',
      spec: '20mm×40mm×6000mm',
      stock: '65根',
    },
  ];

  // 价格趋势图数据
  // const priceData = {
  //   labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  //   datasets: [
  //     {
  //       data: [175, 180, 182, 190, 188, 185],
  //       color: () => `rgba(59, 130, 246, 1)`,
  //       strokeWidth: 2,
  //     },
  //   ],
  // };

  // const chartConfig = {
  //   backgroundGradientFrom: '#ffffff',
  //   backgroundGradientTo: '#ffffff',
  //   decimalPlaces: 0,
  //   color: () => `rgba(59, 130, 246, 0.6)`,
  //   labelColor: () => `rgba(107, 114, 128, 1)`,
  //   style: {
  //     borderRadius: 16,
  //   },
  //   propsForDots: {
  //     r: '4',
  //     strokeWidth: '2',
  //     stroke: '#3b82f6',
  //   },
  // };

  // const screenWidth = Dimensions.get('window').width - 40; // 考虑内边距
  const tab = 'text-sm font-medium text-gray-600';
  const tabActive = 'text-sm font-medium text-blue-600';
  const tabTouchable = 'flex-1 items-center px-4 py-2';
  const tabTouchableActive =
    'flex-1 items-center border-b-2 border-blue-600 px-4 py-2';
  const fastOption2 = 'flex-1 items-center justify-center rounded-lg py-2';
  const fastOption1 = `mr-2 ${fastOption2}`;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <View>
            <DetailRow label="规格型号" value={materialData.spec} />
            <DetailRow label="材质" value={materialData.material} />
            <DetailRow label="单位" value={materialData.unit} />
            <DetailRow
              label="单价"
              value={`¥ ${materialData.price.toFixed(2)}`}
            />
            <DetailRow label="供应商" value={materialData.supplier} />
            <DetailRow label="存放位置" value={materialData.location} />
            <DetailRow label="创建时间" value={materialData.createDate} />
            <DetailRow label="备注" value={materialData.remark} isLast />
          </View>
        );
      case 'records':
        return (
          <View>
            {records.map((record, index) => (
              <View
                key={index}
                className={
                  index < records.length - 1
                    ? 'border-b border-gray-100 py-3'
                    : 'py-3'
                }
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="font-medium">{record.type}</Text>
                    <Text className="mt-1 text-xs text-gray-500">
                      单号: {record.orderNumber}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text
                      className={
                        record.isInbound
                          ? 'text-sm font-medium text-green-600'
                          : 'text-sm font-medium text-red-600'
                      }
                    >
                      {record.quantity}
                    </Text>
                    <Text className="mt-1 text-xs text-gray-500">
                      {record.date}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
      case 'docs':
        return (
          <View>
            {documents.map((doc, index) => (
              <View
                key={index}
                className={
                  index < records.length - 1
                    ? 'border-b border-gray-100 py-3'
                    : 'py-3'
                }
              >
                <View className="flex-row items-center">
                  <FontAwesome
                    name={doc.icon}
                    size={20}
                    color={
                      doc.icon === 'file-pdf'
                        ? '#ef4444'
                        : doc.icon === 'file-excel'
                          ? '#22c55e'
                          : doc.icon === 'file-image'
                            ? '#3b82f6'
                            : '#6b7280'
                    }
                    className="mr-3"
                    group={GroupEnum.FontAwesome5}
                  />
                  <View>
                    <Text className="font-medium">{doc.name}</Text>
                    <Text className="mt-1 text-xs text-gray-500">
                      {doc.type} · {doc.size} · {doc.uploadDate}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 " style={{ backgroundColor: '#f5f5f5' }}>
      <NavHeader
        title="物料详情"
        right={
          <>
            <TouchableOpacity className="mr-4">
              <FontAwesome name="share-alt" size={18} color="#4b5563" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="ellipsis-v" size={18} color="#4b5563" />
            </TouchableOpacity>
          </>
        }
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      >
        {/* 物料基本信息卡片 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <View className="mb-4 flex-row items-center">
            <View className="mr-4 size-20 items-center justify-center rounded-lg bg-gray-200">
              <FontAwesome
                name="cube"
                size={30}
                color="#9ca3af"
                group={GroupEnum.FontAwesome5}
              />
            </View>
            <View>
              <Text className="text-xl font-semibold">{materialData.name}</Text>
              <Text className="mt-1 text-sm text-gray-500">
                编号: {materialData.id}
              </Text>
              <View className="mt-2 flex-row items-center">
                <View className="mr-2 rounded-full bg-green-100 px-2 py-1">
                  <Text className="text-xs text-green-800">
                    {materialData.category}
                  </Text>
                </View>
                <View className="rounded-full bg-blue-100 px-2 py-1">
                  <Text className="text-xs text-blue-800">
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
              <View className="mt-1 flex-row items-end">
                <Text className="text-xl font-bold text-blue-600">
                  {materialData.currentStock}
                </Text>
                <Text className="ml-1 text-sm font-normal text-blue-600">
                  {materialData.unit}
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-sm text-gray-600">安全库存</Text>
              <View className="mt-1 flex-row items-end">
                <Text className="text-lg font-medium text-gray-700">
                  {materialData.safetyStock}
                </Text>
                <Text className="ml-1 text-sm font-normal text-gray-700">
                  {materialData.unit}
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-sm text-gray-600">状态</Text>
              <View className="mt-1 flex-row items-center">
                <View
                  className="mr-1 size-3 rounded-full"
                  style={[{ backgroundColor: '#22c55e' }]}
                />
                <Text className="font-medium text-green-600">
                  {materialData.status}
                </Text>
              </View>
            </View>
          </View>

          {/* 快捷操作按钮 */}
          <View className="flex-row">
            <TouchableOpacity
              className={fastOption1}
              style={[{ backgroundColor: '#2563eb' }]}
            >
              <FontAwesome
                name="sign-in-alt"
                size={16}
                color="white"
                className="mb-1"
                group={GroupEnum.FontAwesome5}
              />
              <Text className="text-xs text-white">入库</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={fastOption1}
              style={[{ backgroundColor: '#f97316' }]}
            >
              <FontAwesome
                name="sign-out-alt"
                size={16}
                color="white"
                className="mb-1"
                group={GroupEnum.FontAwesome5}
              />
              <Text className="text-xs text-white">出库</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={fastOption1}
              style={[{ backgroundColor: '#22c55e' }]}
            >
              <FontAwesome
                name="exchange-alt"
                size={16}
                color="white"
                className="mb-1"
                group={GroupEnum.FontAwesome5}
              />
              <Text className="text-xs text-white">调拨</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={fastOption2}
              style={[{ backgroundColor: '#a855f7' }]}
            >
              <FontAwesome
                name="qrcode"
                size={16}
                color="white"
                className="mb-1"
                group={GroupEnum.FontAwesome5}
              />
              <Text className="text-xs text-white">扫码</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 详细信息选项卡 */}
        <View className="mb-4 overflow-hidden rounded-lg bg-white">
          <View className="flex-row border-b border-gray-200">
            <TouchableOpacity
              className={
                activeTab === 'info' ? tabTouchableActive : tabTouchable
              }
              onPress={() => setActiveTab('info')}
            >
              <Text className={activeTab === 'info' ? tabActive : tab}>
                基本信息
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={
                activeTab === 'records' ? tabTouchableActive : tabTouchable
              }
              onPress={() => setActiveTab('records')}
            >
              <Text className={activeTab === 'records' ? tabActive : tab}>
                出入库记录
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={
                activeTab === 'docs' ? tabTouchableActive : tabTouchable
              }
              onPress={() => setActiveTab('docs')}
            >
              <Text className={activeTab === 'docs' ? tabActive : tab}>
                相关文档
              </Text>
            </TouchableOpacity>
          </View>

          <View className="p-4">{renderTabContent()}</View>
        </View>

        {/* 价格趋势图 */}
        {/* <View style={tw('bg-white rounded-2xl shadow-sm p-4 mb-4')}>
          <Text style={tw('text-lg font-semibold mb-3')}>价格趋势</Text>
          <LineChart
            data={priceData}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={tw('rounded-lg')}
            fromZero={false}
            withInnerLines={false}
            withOuterLines={true}
            withVerticalLines={false}
          />
        </View> */}

        {/* 相关物料 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <Text className="mb-3 text-lg font-semibold">相关物料</Text>

          {relatedMaterials.map((material, index) => (
            <TouchableOpacity
              key={index}
              className={
                index < relatedMaterials.length - 1
                  ? 'border-b border-gray-100 py-3'
                  : 'py-3'
              }
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="font-medium">{material.name}</Text>
                  <Text className="mt-1 text-xs text-gray-500">
                    编号: {material.code} | 规格: {material.spec}
                  </Text>
                </View>
                <View>
                  <Text className="text-sm font-medium">
                    库存: {material.stock}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const DetailRow = ({ label = '', value = '', isLast = false }) => (
  <View
    className={
      !isLast ? 'flex-row border-b border-gray-100 py-3' : 'flex-row py-3'
    }
  >
    <Text className="w-3/10 text-sm text-gray-500">{label}</Text>
    <Text className="w-7/10 text-sm">{value}</Text>
  </View>
);

export default MaterialDetail;
