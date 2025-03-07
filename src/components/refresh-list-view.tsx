import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

interface PageableFlatListProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement; // 确保这里接收的对象包含item属性
  keyExtractor: (item: T) => string;
  onRefresh: () => void;
  onLoadMore: () => void;
  refreshing: boolean;
  hasMore: boolean;
}

const PageableFlatList = <T,>({
  data,
  renderItem,
  keyExtractor,
  onRefresh,
  onLoadMore,
  refreshing,
  hasMore,
}: PageableFlatListProps<T>) => {
  const [isLoadMore, setIsLoadMore] = useState(false);

  const handleEndReached = () => {
    if (!isLoadMore && hasMore) {
      setIsLoadMore(true);
      onLoadMore();
      // 假设onLoadMore执行完成后会调用setIsLoadMore(false)来重置状态
      setIsLoadMore(false); // 这里为了简化，直接重置，实际应用中可能需要在onLoadMore回调中处理
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem} // 直接传递renderItem函数
      keyExtractor={(item) => keyExtractor(item)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        hasMore ? (
          <View style={styles.loader}>
            <Text>Loading...</Text>
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PageableFlatList;
