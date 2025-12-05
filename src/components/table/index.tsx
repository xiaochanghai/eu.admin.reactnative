import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DEFAULT_HEIGHT = 240;
const DEFAULT_COLUMN_WIDTH = 120;

export type Column = {
  title: string;
  key: string | number | symbol;
  width?: number;
};

type TableProps = {
  columns: Column[];
  columnWidth?: number;
  height?: number;
  dataSource: any[];
  renderCell?: (cellData: any, col: Column) => React.ReactNode;
  headerContainerStyle?: object;
  bodyContainerStyle?: object;
  headerStyle?: object;
  bodyStyle?: object;
  closeModal: () => void;
};

export function Table({
  columns = [],
  dataSource = [],
  columnWidth = DEFAULT_COLUMN_WIDTH,
  height = DEFAULT_HEIGHT,
  renderCell,
  headerContainerStyle = {},
  bodyContainerStyle = {},
  headerStyle = {},
  bodyStyle = {},
  closeModal,
}: TableProps) {
  const router = useRouter();

  const renderCellDefault = (cellData: any, col: Column) => {
    const style = { width: col.width || columnWidth || DEFAULT_COLUMN_WIDTH };

    return (
      <View
        key={String(col.key)}
        style={[styles.cell, bodyContainerStyle, style]}
      >
        {typeof cellData === 'string' && (
          <Text style={bodyStyle}>{cellData}</Text>
        )}
        {typeof cellData !== 'string' && (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => {
              if (cellData && cellData.length > 0) {
                closeModal();
                router.push({
                  pathname: '/settings/xlsx',
                  params: {
                    url: cellData[0].fileUrl,
                    title: cellData[0].fileName,
                  },
                });
              }
            }}
          >
            <Text style={bodyStyle} className="color-primary-500">
              {cellData && cellData.length > 0 ? cellData[0].fileName : ''}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderHeader = () => {
    return columns
      .filter((x) => x.key !== 'operations')
      .map((col, index) => {
        const style = {
          width: col.width || columnWidth || DEFAULT_COLUMN_WIDTH,
        };
        return (
          <View
            key={index}
            style={[styles.headerItem, headerContainerStyle, style]}
          >
            <Text style={headerStyle}>{col.title}</Text>
          </View>
        );
      });
  };

  const renderRow = (rowData: any, index: number) => {
    const cellRenderer = renderCell || renderCellDefault;
    return (
      <View key={index} style={styles.row}>
        {columns
          .filter((x) => x.key !== 'operations')
          .map((col) => {
            return cellRenderer(
              String(col.key)
                .split('.')
                .reduce(
                  (prev: any, curr: string) => (prev ? prev[curr] : null),
                  rowData
                ),
              col
            );
          })}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, { height }]}
      horizontal={true}
      bounces={false}
    >
      <View>
        <View style={styles.header}>{renderHeader()}</View>
        <ScrollView
          style={styles.dataView}
          contentContainerStyle={styles.dataViewContent}
        >
          {dataSource.map((rowData, index) => renderRow(rowData, index))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    height: 240,
  },
  header: {
    flexDirection: 'row',
  },
  headerItem: {
    minHeight: 30,
    width: DEFAULT_COLUMN_WIDTH,
    backgroundColor: '#efefef',
    borderRightWidth: 1,
    borderRightColor: '#dfdfdf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataView: {
    flexGrow: 1,
  },
  dataViewContent: {},
  row: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
  },
  cell: {
    minHeight: 25,
    width: DEFAULT_COLUMN_WIDTH,
    backgroundColor: 'transparent',
    borderRightWidth: 1,
    borderRightColor: '#dfdfdf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
