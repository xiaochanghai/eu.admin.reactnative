import React from 'react';

import { TabLayout, type TabConfig } from '@/components/tabs';
import {
  Analysis,
  Equipment,
  Home,
  Profile,
  Repair,
} from '@/components/ui/icons';

// Tab 配置
const tabConfig: TabConfig[] = [
  { name: 'index', title: '首页', icon: Home },
  { name: 'equipment', title: '设备', icon: Equipment },
  { name: 'repair-order', title: '维修', icon: Repair },
  { name: 'analytics', title: '分析', icon: Analysis },
  { name: 'profile', title: '我的', icon: Profile },
];

export default function RepairTabLayout() {
  return <TabLayout tabConfig={tabConfig} />;
}
