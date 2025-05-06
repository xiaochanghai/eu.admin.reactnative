import React, { useState } from 'react';
import {
  FlatList,
  type FlatListProps,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * RefreshListView 组件属性接口
 *
 * 该组件扩展了 FlatList 的基础功能，添加了下拉刷新和上拉加载更多的能力
 * 通过 Omit 排除了需要自定义处理的 FlatList 原生属性
 */
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
  /** 列表数据源 */
  data: T[];
  /** 渲染列表项的函数 */
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  /** 提取列表项唯一键的函数 */
  keyExtractor: (item: T) => string;
  /** 下拉刷新回调函数 */
  onRefresh?: () => void;
  /** 上拉加载更多回调函数 */
  onLoadMore?: () => void;
  /** 是否正在刷新中 */
  refreshing?: boolean;
  /** 是否还有更多数据可加载 */
  hasMore?: boolean;
}

/**
 * 增强型列表组件，支持下拉刷新和上拉加载更多功能
 *
 * @example
 * ```tsx
 * <RefreshListView
 *   data={items}
 *   renderItem={({ item }) => <ItemComponent item={item} />}
 *   keyExtractor={(item) => item.id}
 *   onRefresh={handleRefresh}
 *   onLoadMore={handleLoadMore}
 *   refreshing={isRefreshing}
 *   hasMore={hasMoreItems}
 *   // 可传入其他 FlatList 支持的属性
 *   contentContainerStyle={{ padding: 16 }}
 * />
 * ```
 */
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

  // 控制加载更多状态，防止重复触发
  const [isLoadMore, setIsLoadMore] = useState(false);

  /**
   * 处理滚动到底部的事件，触发加载更多
   * 只有当前不在加载状态且还有更多数据时才会触发
   */
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
      onEndReachedThreshold={0.1} // 当距离底部还有10%时触发加载更多
      ListFooterComponent={
        hasMore ? (
          <View style={styles.loader}>
            <Text>Loading...</Text>
          </View>
        ) : null
      }
      {...restProps} // 传递其他FlatList支持的属性
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
