import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { NavHeader } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';
// import { LineChart } from 'react-native-chart-kit';

/**
 * 标签类型定义
 */
type TabType = 'info' | 'records' | 'docs';

/**
 * 出入库记录项接口
 */
interface RecordItem {
  type: string;
  orderNumber: string;
  quantity: string;
  date: string;
  isInbound: boolean;
}

/**
 * 文档项接口
 */
interface DocumentItem {
  name: string;
  type: string;
  icon: string;
  size: string;
  uploadDate: string;
}

/**
 * 相关物料接口
 */
interface RelatedMaterial {
  name: string;
  code: string;
  spec: string;
  stock: string;
}

/**
 * 物料数据接口
 */
interface MaterialData {
  id: string;
  name: string;
  category: string;
  tag: string;
  currentStock: number;
  unit: string;
  safetyStock: number;
  status: string;
  spec: string;
  material: string;
  price: number;
  supplier: string;
  location: string;
  createDate: string;
  remark: string;
}

/**
 * 详情行属性接口
 */
interface DetailRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

/**
 * 物料详情组件
 */
const MaterialDetail = () => {
  // 当前激活的标签页
  const [activeTab, setActiveTab] = useState<TabType>('info');

  // 模拟数据 - 物料基本信息
  const materialData: MaterialData = {
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

  // 模拟数据 - 出入库记录
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

  // 模拟数据 - 相关文档
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

  // 模拟数据 - 相关物料
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

  // 样式常量
  const styles = {
    tab: 'text-sm font-medium text-gray-600',
    tabActive: 'text-sm font-medium text-blue-600',
    tabTouchable: 'flex-1 items-center px-4 py-2',
    tabTouchableActive:
      'flex-1 items-center border-b-2 border-blue-600 px-4 py-2',
    fastOption: 'items-center justify-center rounded-lg py-2',
    fastOptionWithMargin: 'mr-2 items-center justify-center rounded-lg py-2',
    listItemBorder: 'border-b border-gray-100 py-3',
    listItemNoBorder: 'py-3',
  };

  /**
   * 渲染标签页内容
   */
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
              <RecordListItem
                key={index}
                record={record}
                isLast={index === records.length - 1}
              />
            ))}
          </View>
        );
      case 'docs':
        return (
          <View>
            {documents.map((doc, index) => (
              <DocumentListItem
                key={index}
                document={doc}
                isLast={index === documents.length - 1}
              />
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
                  style={{ backgroundColor: '#22c55e' }}
                />
                <Text className="font-medium text-green-600">
                  {materialData.status}
                </Text>
              </View>
            </View>
          </View>

          {/* 快捷操作按钮 */}
          <View className="flex-row">
            <ActionButton
              icon="sign-in-alt"
              label="入库"
              color="#2563eb"
              className={styles.fastOptionWithMargin}
            />
            <ActionButton
              icon="sign-out-alt"
              label="出库"
              color="#f97316"
              className={styles.fastOptionWithMargin}
            />
            <ActionButton
              icon="exchange-alt"
              label="调拨"
              color="#22c55e"
              className={styles.fastOptionWithMargin}
            />
            <ActionButton
              icon="qrcode"
              label="扫码"
              color="#a855f7"
              className={styles.fastOption}
            />
          </View>
        </View>

        {/* 详细信息选项卡 */}
        <View className="mb-4 overflow-hidden rounded-lg bg-white">
          <View className="flex-row border-b border-gray-200">
            <TabButton
              label="基本信息"
              isActive={activeTab === 'info'}
              onPress={() => setActiveTab('info')}
              styles={styles}
            />
            <TabButton
              label="出入库记录"
              isActive={activeTab === 'records'}
              onPress={() => setActiveTab('records')}
              styles={styles}
            />
            <TabButton
              label="相关文档"
              isActive={activeTab === 'docs'}
              onPress={() => setActiveTab('docs')}
              styles={styles}
            />
          </View>

          <View className="p-4">{renderTabContent()}</View>
        </View>

        {/* 相关物料 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <Text className="mb-3 text-lg font-semibold">相关物料</Text>

          {relatedMaterials.map((material, index) => (
            <RelatedMaterialItem
              key={index}
              material={material}
              isLast={index === relatedMaterials.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

/**
 * 详情行组件
 */
const DetailRow = ({
  label = '',
  value = '',
  isLast = false,
}: DetailRowProps) => (
  <View
    className={
      !isLast ? 'flex-row border-b border-gray-100 py-3' : 'flex-row py-3'
    }
  >
    <Text className="w-3/10 text-sm text-gray-500">{label}</Text>
    <Text className="w-7/10 text-sm">{value}</Text>
  </View>
);

/**
 * 出入库记录项组件
 */
interface RecordListItemProps {
  record: RecordItem;
  isLast: boolean;
}

const RecordListItem = ({ record, isLast }: RecordListItemProps) => (
  <View className={!isLast ? 'border-b border-gray-100 py-3' : 'py-3'}>
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
        <Text className="mt-1 text-xs text-gray-500">{record.date}</Text>
      </View>
    </View>
  </View>
);

/**
 * 文档列表项组件
 */
interface DocumentListItemProps {
  document: DocumentItem;
  isLast: boolean;
}

const DocumentListItem = ({ document, isLast }: DocumentListItemProps) => {
  /**
   * 获取文档图标颜色
   * @param iconName 图标名称
   * @returns 对应的颜色代码
   */
  const getDocIconColor = (iconName: string): string => {
    switch (iconName) {
      case 'file-pdf':
        return '#ef4444'; // 红色
      case 'file-excel':
        return '#22c55e'; // 绿色
      case 'file-image':
        return '#3b82f6'; // 蓝色
      default:
        return '#6b7280'; // 灰色
    }
  };
  // 获取图标颜色
  const iconColor = getDocIconColor(document.icon);

  return (
    <View className={!isLast ? 'border-b border-gray-100 py-3' : 'py-3'}>
      <View className="flex-row items-center">
        <FontAwesome
          name={document.icon}
          size={20}
          color={iconColor}
          className="mr-3"
          group={GroupEnum.FontAwesome5}
        />
        <View>
          <Text className="font-medium">{document.name}</Text>
          <Text className="mt-1 text-xs text-gray-500">
            {document.type} · {document.size} · {document.uploadDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

/**
 * 相关物料项组件
 */
interface RelatedMaterialItemProps {
  material: RelatedMaterial;
  isLast: boolean;
}

const RelatedMaterialItem = ({
  material,
  isLast,
}: RelatedMaterialItemProps) => (
  <TouchableOpacity
    className={!isLast ? 'border-b border-gray-100 py-3' : 'py-3'}
  >
    <View className="flex-row items-center justify-between">
      <View>
        <Text className="font-medium">{material.name}</Text>
        <Text className="mt-1 text-xs text-gray-500">
          编号: {material.code} | 规格: {material.spec}
        </Text>
      </View>
      <View>
        <Text className="text-sm font-medium">库存: {material.stock}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

/**
 * 操作按钮组件
 */
interface ActionButtonProps {
  icon: string;
  label: string;
  color: string;
  className: string;
}

const ActionButton = ({ icon, label, color, className }: ActionButtonProps) => (
  <TouchableOpacity
    className={className}
    style={{ backgroundColor: color, flex: 1 }}
  >
    <FontAwesome
      name={icon}
      size={16}
      color="white"
      className="mb-1"
      group={GroupEnum.FontAwesome5}
    />
    <Text className="text-xs text-white">{label}</Text>
  </TouchableOpacity>
);

/**
 * 标签按钮组件
 */
interface TabButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  styles: Record<string, string>;
}

const TabButton = ({ label, isActive, onPress, styles }: TabButtonProps) => (
  <TouchableOpacity
    className={isActive ? styles.tabTouchableActive : styles.tabTouchable}
    onPress={onPress}
  >
    <Text className={isActive ? styles.tabActive : styles.tab}>{label}</Text>
  </TouchableOpacity>
);

export default MaterialDetail;
