import React from 'react';

import { type TabConfig, TabLayout } from '@/components/tabs';
import {
  Home,
  Inventory,
  Order,
  Production,
  Profile,
} from '@/components/ui/icons';

// Tab 配置
const tabConfig: TabConfig[] = [
  { name: 'index', title: '首页', icon: Home },
  { name: 'production', title: '生产', icon: Production },
  { name: 'inventory', title: '库存', icon: Inventory },
  { name: 'order', title: '订单', icon: Order },
  { name: 'profile', title: '我的', icon: Profile },
];

export default function AppTabLayout() {
  return <TabLayout tabConfig={tabConfig} />;
}
