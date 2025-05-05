import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { NavHeader, ScrollView, Text, View } from '@/components/ui';

// 模拟物料数据
const materialData = [
  {
    id: '1',
    name: '铝合金型材',
    code: 'M001',
    category: '原材料',
    stock: 2500,
    unit: '米',
    status: '正常',
    lastUpdated: '2023-05-15',
  },
  {
    id: '2',
    name: '不锈钢板材',
    code: 'M002',
    category: '原材料',
    stock: 1200,
    unit: '张',
    status: '正常',
    lastUpdated: '2023-05-14',
  },
  {
    id: '3',
    name: '塑料颗粒',
    code: 'M003',
    category: '原材料',
    stock: 500,
    unit: '千克',
    status: '低库存',
    lastUpdated: '2023-05-13',
  },
  {
    id: '4',
    name: '电机',
    code: 'M004',
    category: '零部件',
    stock: 350,
    unit: '个',
    status: '正常',
    lastUpdated: '2023-05-12',
  },
  {
    id: '5',
    name: '控制板',
    code: 'M005',
    category: '零部件',
    stock: 120,
    unit: '块',
    status: '低库存',
    lastUpdated: '2023-05-11',
  },
  {
    id: '6',
    name: '螺丝',
    code: 'M006',
    category: '辅料',
    stock: 10000,
    unit: '个',
    status: '正常',
    lastUpdated: '2023-05-10',
  },
  {
    id: '7',
    name: '包装盒',
    code: 'M007',
    category: '包装材料',
    stock: 800,
    unit: '个',
    status: '正常',
    lastUpdated: '2023-05-09',
  },
  {
    id: '8',
    name: '标签',
    code: 'M008',
    category: '包装材料',
    stock: 5000,
    unit: '张',
    status: '正常',
    lastUpdated: '2023-05-08',
  },
];

// 物料分类数据
const categories = [
  { id: '1', name: '全部', icon: 'apps' },
  { id: '2', name: '原材料', icon: 'cube' },
  { id: '3', name: '零部件', icon: 'cog' },
  { id: '4', name: '辅料', icon: 'tools' },
  { id: '5', name: '包装材料', icon: 'box' },
];

const Materials = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [filteredMaterials, setFilteredMaterials] = useState(materialData);

  // 筛选物料
  const filterMaterials = (category: string, searchQuery: string) => {
    let filtered = materialData;

    if (category !== '全部') {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMaterials(filtered);
  };

  // 处理搜索
  const handleSearch = (text: string) => {
    setSearchText(text);
    filterMaterials(selectedCategory, text);
  };

  // 处理分类选择
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterMaterials(category, searchText);
  };

  // 处理物料点击
  // const handleMaterialPress = (materialId: string) => {
  const handleMaterialPress = (materialId: string) => {
    if (materialId != null) materialId = '1';
    // navigation.navigate('MaterialDetail', { materialId });
  };

  // 渲染物料项
  const renderMaterialItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="mx-3 mb-3 rounded-lg bg-white p-4 shadow-sm"
      onPress={() => handleMaterialPress(item.id)}
    >
      <View className="flex-row items-center justify-between">
        <View className={'flex-1'}>
          <Text className={'text-lg font-bold text-gray-800'}>{item.name}</Text>
          <Text className={'mt-1 text-sm text-gray-500'}>
            编码: {item.code}
          </Text>
          <View className={'mt-2 flex-row items-center'}>
            <Text className={'text-sm text-gray-600'}>
              库存: {item.stock} {item.unit}
            </Text>
            <View
              className={
                'ml-3 px-2 py-1 rounded-full ' +
                (item.status === '正常' ? 'bg-green-100' : 'bg-red-100')
              }
            >
              <Text
                className={
                  'text-xs ' +
                  (item.status === '正常' ? 'text-green-600' : 'text-red-600')
                }
              >
                {item.status}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center">
          <Text className="mr-2 text-xs text-gray-400">{item.lastUpdated}</Text>
          <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <NavHeader
        title="物料管理"
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
      {/* 头部 */}
      <View className="bg-white px-4 py-3 shadow-sm">
        {/* 搜索框 */}
        <View className="mt-3 flex-row items-center rounded-lg bg-gray-100 px-3 py-2">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="ml-2 flex-1 text-gray-800"
            placeholder="搜索物料名称或编码"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText ? (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* 分类选择 */}
      <View style={{ height: 50, marginBottom: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="bg-white py-2"
          contentContainerStyle={{ paddingHorizontal: 8 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              className={`mx-1 rounded-full px-4 py-2 ${selectedCategory === category.name ? 'bg-blue-500' : 'bg-gray-100'}`}
              onPress={() => handleCategorySelect(category.name)}
            >
              <View>
                {/* <FontAwesome5
                name={category.icon}
                size={14}
                color={
                  selectedCategory === category.name ? '#FFFFFF' : '#4B5563'
                }
              /> */}
                <Text
                  className={`${
                    selectedCategory === category.name
                      ? 'text-white'
                      : 'text-gray-600'
                  }`}
                >
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* 物料列表 */}
      <FlatList
        data={filteredMaterials}
        renderItem={renderMaterialItem}
        keyExtractor={(item) => item.id}
        // contentContainerStyle={tw('p-4')}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-10">
            <Ionicons name="search-outline" size={48} color="#D1D5DB" />
            <Text className="mt-4 text-center text-gray-400">
              未找到匹配的物料{'\n'}请尝试其他搜索条件
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginLeft: 16,
  },
});

export default Materials;
