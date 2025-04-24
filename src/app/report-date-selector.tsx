import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ReportType = 'daily' | 'weekly' | 'monthly';

const ReportDateSelector: React.FC = () => {
  const [selectedReportType, setSelectedReportType] =
    useState<ReportType>('daily');

  const handleReportTypeChange = (type: ReportType) => {
    setSelectedReportType(type);
  };

  return (
    <View style={styles.reportDateSelector}>
      <TouchableOpacity
        style={[
          styles.reportDateButton,
          selectedReportType === 'daily' && styles.reportDateButtonActive,
        ]}
        onPress={() => handleReportTypeChange('daily')}
      >
        <Text
          style={[
            styles.reportDateButtonText,
            selectedReportType === 'daily' && styles.reportDateButtonTextActive,
          ]}
        >
          日报
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.reportDateButton,
          selectedReportType === 'weekly' && styles.reportDateButtonActive,
        ]}
        onPress={() => handleReportTypeChange('weekly')}
      >
        <Text
          style={[
            styles.reportDateButtonText,
            selectedReportType === 'weekly' &&
              styles.reportDateButtonTextActive,
          ]}
        >
          周报
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.reportDateButton,
          selectedReportType === 'monthly' && styles.reportDateButtonActive,
        ]}
        onPress={() => handleReportTypeChange('monthly')}
      >
        <Text
          style={[
            styles.reportDateButtonText,
            selectedReportType === 'monthly' &&
              styles.reportDateButtonTextActive,
          ]}
        >
          月报
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  reportDateSelector: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginTop: 12,
  },
  reportDateButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  reportDateButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  reportDateButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  reportDateButtonTextActive: {
    color: '#0066ff',
    fontWeight: '500',
  },
});

export default ReportDateSelector;
