import * as React from 'react';
import { Dimensions, View } from 'react-native';

import { Text } from '@/components/ui';

// export type Column<T> = {
//   key: keyof T;
//   title: string;
//   minWidth?: number;
//   flex?: number;
//   align?: 'left' | 'center' | 'right';
//   render?: (value: any, row: T) => React.ReactNode;
// };
// 添加类型定义
export type Column<T> = {
  align?: 'left' | 'center' | 'right';
  externalType?: number;
  hidden?: boolean;
  isExternal?: boolean;
  key: keyof T;
  sortable?: boolean;
  title: string;
  width: number;
  flex?: number;
  render?: (value: any, row: T) => React.ReactNode;
};

type TableRow<T> = T & {
  id: string | number;
};

type ResponsiveTableProps<T> = {
  columns: Column<T>[];
  data: TableRow<T>[];
  headerStyle?: string;
  rowStyle?: string;
  cellStyle?: string;
  onRowPress?: (row: T) => void;
};

export function ResponsiveTable<T>({
  columns,
  data,
  headerStyle = 'bg-gray-100 dark:bg-gray-800',
  rowStyle = 'border-b border-gray-200 dark:border-gray-700',
  cellStyle = 'px-2 py-2',
  onRowPress,
}: ResponsiveTableProps<T>) {
  const screenWidth = Dimensions.get('window').width;
  const padding = 32; // 左右边距
  const availableWidth = screenWidth - padding;

  const processedColumns = React.useMemo(() => {
    const totalFlex = columns.reduce((sum, col) => sum + (col.flex || 1), 0);

    return columns.map((col) => ({
      ...col,
      width: col.width || (availableWidth / totalFlex) * (col.flex || 1),
    }));
  }, [columns, availableWidth]);

  const renderCell = (column: Column<T>, row: TableRow<T>) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    return (
      <Text
        className={`text-xs ${
          column.align === 'center'
            ? 'text-center'
            : column.align === 'right'
              ? 'text-right'
              : 'text-left'
        }`}
        numberOfLines={2}
      >
        {String(value || '')}
      </Text>
    );
  };

  return (
    <View className="flex-1">
      {/* 表头 */}
      <View className={`flex-row ${headerStyle}`}>
        {processedColumns.map((column) => (
          <View
            key={String(column.key)}
            style={{ width: column.width }}
            className={`${cellStyle} justify-center`}
          >
            <Text className="text-xs font-semibold text-gray-900 dark:text-white">
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
          {processedColumns.map((column) => (
            <View
              key={String(column.key)}
              style={{ width: column.width }}
              className={`${cellStyle} justify-center`}
            >
              {renderCell(column, row)}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
