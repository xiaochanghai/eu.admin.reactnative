import React, { useState } from 'react';
import {
  FlatList,
  type FlatListProps,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface RefreshListViewProps<T>
  extends Omit<
    FlatListProps<T>,
    | 'renderItem'
    | 'data'
    | 'refreshControl'
    | 'onEndReached'
    | 'onEndReachedThreshold'
    | 'ListFooterComponent'
  > {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T) => string;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  refreshing?: boolean;
  hasMore?: boolean;
}

const RefreshListView = <T,>(props: RefreshListViewProps<T>) => {
  const {
    data,
    renderItem,
    keyExtractor,
    onRefresh,
    onLoadMore,
    refreshing,
    hasMore,
    ...restProps
  } = props;

  const [isLoadMore, setIsLoadMore] = useState(false);

  const handleEndReached = () => {
    if (!isLoadMore && hasMore) {
      setIsLoadMore(true);
      if (onLoadMore) onLoadMore();
      // 假设onLoadMore执行完成后会调用setIsLoadMore(false)来重置状态
      setIsLoadMore(false); // 这里为了简化，直接重置，实际应用中可能需要在onLoadMore回调中处理
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => keyExtractor(item)}
      refreshControl={
        <RefreshControl
          refreshing={refreshing != null ? refreshing : false}
          onRefresh={onRefresh}
        />
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
      {...restProps}
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

export default RefreshListView;
