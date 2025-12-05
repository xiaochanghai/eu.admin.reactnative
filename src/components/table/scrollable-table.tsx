import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { ScrollView, Text, View } from '@/components/ui';

// 表格列定义
type Column<T> = {
  key: keyof T;
  title: string;
  width: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => React.ReactNode;
};

// 表格数据行
type TableRow<T> = T & {
  id: string | number;
};

// 表格组件Props
type ScrollableTableProps<T> = {
  columns: Column<T>[];
  data: TableRow<T>[];
  operationsButtons?: any[];
  headerStyle?: string;
  rowStyle?: string;
  cellStyle?: string;
  onRowPress?: (row: T) => void;
  onOperationPress?: (button: any, row: any) => void;
  showScrollIndicator?: boolean;
};

export function ScrollableTable<T>({
  columns,
  data,
  operationsButtons = [],
  headerStyle = 'bg-gray-100 dark:bg-gray-800',
  rowStyle = 'border-b border-gray-200 dark:border-gray-700',
  cellStyle = 'px-3 py-2',
  onRowPress,
  onOperationPress,
  showScrollIndicator = true,
}: ScrollableTableProps<T>) {
  const totalWidth = React.useMemo(
    () => columns.reduce((sum, col) => sum + col.width, 0),
    [columns]
  );

  const renderCell = (column: Column<T>, row: TableRow<T>) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    return (
      <Text
        className={`text-sm ${
          column.align === 'center'
            ? 'text-center'
            : column.align === 'right'
              ? 'text-right'
              : 'text-left'
        }`}
      >
        {String(value || '')}
      </Text>
    );
  };
  const operationCell = (column: Column<T>, row: TableRow<T>) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    return (
      <View
        className={`flex-row ${
          column.align === 'center'
            ? 'justify-center'
            : column.align === 'right'
              ? 'text-right'
              : 'text-left'
        }`}
      >
        {operationsButtons.map((button) => (
          <TouchableOpacity
            key={row.id + button.key}
            onPress={() => onOperationPress!(button, row)}
          >
            <Text className={`px-1 text-sm text-primary-600`}>
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  return (
    <View>
      {/* 使用单个 ScrollView 包装整个表格，实现标题和内容的同步滚动 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={showScrollIndicator}
        indicatorStyle="default"
        // 添加滚动条样式和位置控制
        contentContainerStyle={{ minWidth: '100%' }}
        // 改善滚动体验
        bounces={false}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        <View style={{ width: totalWidth }}>
          {/* 表头 */}
          <View className={`flex-row ${headerStyle}`}>
            {columns.map((column) => (
              <View
                key={String(column.key)}
                // style={{ width: column.width ??  100 }}
                style={{ width: column.key === 'operations' ? 200 : 150 }}
                className={`${cellStyle} justify-center`}
              >
                <Text
                  className={`font-semibold text-gray-900 dark:text-white ${
                    column.align === 'center'
                      ? 'text-center'
                      : column.align === 'right'
                        ? 'text-right'
                        : 'text-left'
                  }`}
                >
                  {column.title}
                </Text>
              </View>
            ))}
          </View>

          {/* 表格内容 */}
          {data.map((row, rowIndex) => (
            <View
              key={row.id + '_' + rowIndex}
              className={`flex-row ${rowStyle} ${
                onRowPress ? 'active:bg-gray-50 dark:active:bg-gray-900' : ''
              }`}
              {...(onRowPress && {
                onTouchEnd: () => onRowPress(row),
              })}
            >
              {columns.map((column) => (
                <View
                  key={String(column.key)}
                  style={{ width: column.key === 'operations' ? 200 : 150 }}
                  className={`${cellStyle} justify-center`}
                >
                  {column.key === 'operations'
                    ? operationCell(column, row)
                    : renderCell(column, row)}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
