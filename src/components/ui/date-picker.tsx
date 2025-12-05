import React, { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { Text } from './text';

export type DatePickerMode = 'date' | 'time' | 'datetime';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  mode?: DatePickerMode;
  children?: React.ReactNode;
}

export const DatePicker = React.forwardRef<any, DatePickerProps>(
  (
    {
      value = new Date(),
      onChange,
      format,
      minDate,
      maxDate,
      disabled = false,
      mode = 'date',
      children,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [tempDate, setTempDate] = useState(value);

    useEffect(() => {
      setTempDate(value);
    }, [value]);

    const handleConfirm = () => {
      onChange?.(tempDate);
      setVisible(false);
    };

    const handleCancel = () => {
      setTempDate(value);
      setVisible(false);
    };

    const getTitle = () => {
      switch (mode) {
        case 'time':
          return '选择时间';
        case 'datetime':
          return '选择日期时间';
        case 'date':
        default:
          return '选择日期';
      }
    };

    return (
      <>
        <Pressable onPress={() => !disabled && setVisible(true)} disabled={disabled}>
          {children}
        </Pressable>

        <Modal
          visible={visible}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <Pressable style={styles.modalOverlay} onPress={handleCancel}>
            <Pressable style={styles.modalContent}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.cancelButton}>取消</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{getTitle()}</Text>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={styles.confirmButton}>确定</Text>
                </TouchableOpacity>
              </View>

              {/* Date Picker */}
              {mode === 'date' || mode === 'datetime' ? (
                <View>
                  {mode === 'datetime' && (
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderText}>日期</Text>
                    </View>
                  )}
                  <DateSelector
                    date={tempDate}
                    onChange={setTempDate}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                </View>
              ) : null}

              {mode === 'time' || mode === 'datetime' ? (
                <View>
                  {mode === 'datetime' && (
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderText}>时间</Text>
                    </View>
                  )}
                  <TimeSelector date={tempDate} onChange={setTempDate} />
                </View>
              ) : null}
            </Pressable>
          </Pressable>
        </Modal>
      </>
    );
  }
);

// 日期选择器组件
const DateSelector: React.FC<{
  date: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}> = ({ date, onChange, minDate, maxDate }) => {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDate();

  const minYear = minDate?.getFullYear() || currentYear - 50;
  const maxYear = maxDate?.getFullYear() || currentYear + 50;

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const days = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth + 1) },
    (_, i) => i + 1
  );

  const handleYearChange = (year: number) => {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    onChange(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(date);
    newDate.setMonth(month - 1);
    onChange(newDate);
  };

  const handleDayChange = (day: number) => {
    const newDate = new Date(date);
    newDate.setDate(day);
    onChange(newDate);
  };

  return (
    <View style={styles.pickerContainer}>
      <PickerColumn
        data={years.map((y) => ({ label: `${y}年`, value: y }))}
        selectedValue={currentYear}
        onSelect={handleYearChange}
      />
      <PickerColumn
        data={months.map((m) => ({ label: `${m}月`, value: m }))}
        selectedValue={currentMonth + 1}
        onSelect={handleMonthChange}
      />
      <PickerColumn
        data={days.map((d) => ({ label: `${d}日`, value: d }))}
        selectedValue={currentDay}
        onSelect={handleDayChange}
      />
    </View>
  );
};

// 时间选择器组件
const TimeSelector: React.FC<{
  date: Date;
  onChange: (date: Date) => void;
}> = ({ date, onChange }) => {
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleHourChange = (hour: number) => {
    const newDate = new Date(date);
    newDate.setHours(hour);
    onChange(newDate);
  };

  const handleMinuteChange = (minute: number) => {
    const newDate = new Date(date);
    newDate.setMinutes(minute);
    onChange(newDate);
  };

  return (
    <View style={styles.pickerContainer}>
      <PickerColumn
        data={hours.map((h) => ({
          label: String(h).padStart(2, '0'),
          value: h,
        }))}
        selectedValue={currentHour}
        onSelect={handleHourChange}
      />
      <Text style={styles.separator}>:</Text>
      <PickerColumn
        data={minutes.map((m) => ({
          label: String(m).padStart(2, '0'),
          value: m,
        }))}
        selectedValue={currentMinute}
        onSelect={handleMinuteChange}
      />
    </View>
  );
};

// 滚动选择列组件
const PickerColumn: React.FC<{
  data: { label: string; value: number }[];
  selectedValue: number;
  onSelect: (value: number) => void;
}> = ({ data, selectedValue, onSelect }) => {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [containerHeight] = useState(200);
  const itemHeight = 40;

  useEffect(() => {
    const index = data.findIndex((item) => item.value === selectedValue);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: index * itemHeight,
        animated: false,
      });
    }
  }, []);

  return (
    <View style={[styles.column, { height: containerHeight }]}>
      <View style={styles.selectionIndicator} />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
          if (data[index]) {
            onSelect(data[index].value);
          }
        }}
        contentContainerStyle={{
          paddingVertical: (containerHeight - itemHeight) / 2,
        }}
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.pickerItem,
              { height: itemHeight },
              item.value === selectedValue && styles.selectedItem,
            ]}
            onPress={() => {
              onSelect(item.value);
              const index = data.findIndex((d) => d.value === item.value);
              scrollViewRef.current?.scrollTo({
                y: index * itemHeight,
                animated: true,
              });
            }}
          >
            <Text
              style={[
                styles.pickerItemText,
                item.value === selectedValue && styles.selectedItemText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  cancelButton: {
    fontSize: 16,
    color: '#6b7280',
  },
  confirmButton: {
    fontSize: 16,
    color: '#0066ff',
    fontWeight: '600',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  column: {
    flex: 1,
    position: 'relative',
  },
  selectionIndicator: {
    position: 'absolute',
    top: '50%',
    left: 8,
    right: 8,
    height: 40,
    marginTop: -20,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    zIndex: 0,
  },
  pickerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#6b7280',
  },
  selectedItem: {
    // 可以添加选中样式
  },
  selectedItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  separator: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginHorizontal: 8,
  },
});
