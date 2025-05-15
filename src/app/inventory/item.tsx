import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type InventoryItemProps = {
  name: string;
  code: string;
  quantity: number;
  safetyStock: number;
  status: 'normal' | 'warning' | 'danger';
  onViewDetail?: () => void;
};

const Item = ({
  name,
  code,
  quantity,
  safetyStock,
  status,
  onViewDetail,
}: InventoryItemProps) => {
  let indicatorColor = '#22c55e'; // 绿色 - 正常
  let textColor = 'black';

  if (status === 'warning') {
    indicatorColor = '#eab308'; // 黄色 - 警告
  } else if (status === 'danger') {
    indicatorColor = '#ef4444'; // 红色 - 危险
    textColor = '#ef4444';
  }

  return (
    <TouchableOpacity onPress={onViewDetail}>
      <View style={styles.inventoryItem}>
        <View style={styles.flex1}>
          <View style={styles.flexRow}>
            <View
              style={[
                styles.stockIndicator,
                { backgroundColor: indicatorColor },
              ]}
            />
            <Text style={styles.itemName}>{name}</Text>
          </View>
          <Text className="text-base" style={styles.itemCode}>
            编号：{code}
          </Text>
        </View>
        <View className="items-end">
          <Text
            className="text-lg font-bold"
            style={[status === 'danger' ? { color: textColor } : null]}
          >
            {quantity}
          </Text>
          <Text className="text-sm" style={styles.safetyStockText}>
            安全库存：{safetyStock}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  inventoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemCode: {
    color: '#6b7280',
  },
  safetyStockText: {
    color: '#6b7280',
  },
});
export default Item;
