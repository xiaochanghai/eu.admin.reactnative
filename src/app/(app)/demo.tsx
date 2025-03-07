import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { RefreshListView as PageableFlatList } from '@/components'; // 假设PageableFlatList位于同一目录下的PageableFlatList.tsx文件中

// 定义数据项类型
type ItemData = {
  id: string;
  title: string;
};

const App = () => {
  const [data, setData] = useState<ItemData[]>([]);
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 模拟数据获取函数
  const fetchData = async (reset: boolean = false) => {
    // setLoading(true);
    try {
      console.log('Fetching data...');
      // 模拟网络请求延迟
      const newData = await new Promise<ItemData[]>((resolve) =>
        setTimeout(() => {
          if (reset) {
            setPage(1); // 重置页码
            resolve(
              Array.from({ length: 25 }, (_, i) => ({
                id: `${Math.random()}`,
                title: `Item ${1}-${i + 1}`,
              }))
            );
          } else {
            const nextPage = page + 1;
            setPage(nextPage); // 重置页码
            resolve(
              Array.from({ length: 25 }, (_, i) => ({
                id: `${Math.random()}`,
                title: `Item ${nextPage}-${i + 1}`,
              }))
            );
          }
        }, 1000)
      );

      setData((prev) => (reset ? newData : [...prev, ...newData]));
      setHasMore(newData.length > 0); // 根据实际情况判断是否有更多数据
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // setLoading(false);
      setRefreshing(false);
    }
  };

  // 组件挂载时加载初始数据
  useEffect(() => {
    fetchData(true);
  }, []);

  // 动态渲染列表项，并增加保护性检查
  const renderItem = ({ item }: { item: ItemData }) => {
    if (!item || !item.title) {
      return <View />;
    }
    return (
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageableFlatList<ItemData>
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: ItemData) => item.id}
        onRefresh={() => {
          setRefreshing(true);
          fetchData(true); // 重置并重新获取数据
        }}
        onLoadMore={() => fetchData()}
        refreshing={refreshing}
        hasMore={hasMore}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
