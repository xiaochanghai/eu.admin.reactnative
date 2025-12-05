import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { type Column, ResponsiveTable, ScrollableTable } from '@/components';
import { SafeAreaView, Text } from '@/components/ui';

// 定义数据类型
type ProductData = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
  location: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  description: string;
  tags: string;
  rating: number;
  sales: number;
};

export default function TableExample() {
  // 示例数据
  const sampleData: ProductData[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      category: 'Electronics',
      price: 999,
      stock: 50,
      supplier: 'Apple Inc.',
      location: 'Warehouse A',
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      description: 'Latest iPhone model',
      tags: 'smartphone, apple, premium',
      rating: 4.8,
      sales: 120,
    },
    {
      id: '2',
      name: 'MacBook Air M2',
      category: 'Computers',
      price: 1199,
      stock: 25,
      supplier: 'Apple Inc.',
      location: 'Warehouse B',
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      description: 'Lightweight laptop',
      tags: 'laptop, apple, portable',
      rating: 4.9,
      sales: 85,
    },
    // 添加更多数据...
  ];

  // 列定义
  const columns: Column<ProductData>[] = [
    { key: 'name', title: '产品名称', width: 120, align: 'left' as const },
    { key: 'category', title: '类别', width: 100, align: 'center' as const },
    { key: 'price', title: '价格', width: 80, align: 'right' as const },
    { key: 'stock', title: '库存', width: 60, align: 'center' as const },
    { key: 'supplier', title: '供应商', width: 120, align: 'left' as const },
    { key: 'location', title: '位置', width: 100, align: 'center' as const },
    { key: 'status', title: '状态', width: 80, align: 'center' as const },
    {
      key: 'createdAt',
      title: '创建时间',
      width: 100,
      align: 'center' as const,
    },
    {
      key: 'updatedAt',
      title: '更新时间',
      width: 100,
      align: 'center' as const,
    },
    { key: 'description', title: '描述', width: 150, align: 'left' as const },
    { key: 'tags', title: '标签', width: 120, align: 'left' as const },
    { key: 'rating', title: '评分', width: 60, align: 'center' as const },
    { key: 'sales', title: '销量', width: 60, align: 'center' as const },
  ];

  const handleRowPress = (row: ProductData) => {
    console.log('Row pressed:', row);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        <Text className="py-4 text-center text-2xl font-bold text-gray-900 dark:text-white">
          产品表格示例
        </Text>

        {/* 可横向滚动的表格 */}
        <View className="mx-4 mb-6">
          <Text className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            可横向滚动表格
          </Text>
          <View className="h-80 overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
            <ScrollableTable
              columns={columns}
              data={sampleData}
              onRowPress={handleRowPress}
            />
          </View>
        </View>

        {/* 响应式表格 */}
        <View className="mx-4 mb-6">
          <Text className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            响应式表格
          </Text>
          <View className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
            <ResponsiveTable
              columns={columns.map((col) => ({ ...col, flex: 1 }))}
              data={sampleData}
              onRowPress={handleRowPress}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
