import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@/components/ui/icons';

import { ProcessNode } from './process-node';
import { ProgressBar } from './progress-bar';
import { StatusBadge } from './status-badge';

// 工序状态类型定义
type ProcessStatus = '使用中' | '待优化' | '已停用' | '开发中';

// 工序数据接口定义
interface ProcessItem {
  id: string; // 工序唯一标识
  name: string; // 工序名称
  code: string; // 工序编号
  status: ProcessStatus; // 工序状态
  responsible: string; // 负责人
  standardTime: string; // 标准工时
  utilizationRate: number; // 设备利用率
  equipment: {
    name: string; // 设备名称
    icon: string; // 设备图标
    iconColor: string; // 图标颜色
  };
  yieldRate: string; // 良品率
}

// 流程节点类型定义
interface ProcessFlowNode {
  icon: string; // 节点图标
  label: string; // 节点标签
  status: 'completed' | 'inProgress' | 'pending'; // 节点状态
}

/**
 * 工序管理组件
 * 展示工序概览、工序流程图和工序列表
 */
export const Process = () => {
  // 状态颜色映射
  const statusColorMap = {
    使用中: { color: '#22c55e', bgColor: '#dcfce7' },
    待优化: { color: '#f97316', bgColor: '#fff7ed' },
    已停用: { color: '#ef4444', bgColor: '#fee2e2' },
    开发中: { color: '#0066ff', bgColor: '#ebf5ff' },
  };

  // 工序流程节点数据
  const processFlowNodes: ProcessFlowNode[] = [
    { icon: 'box', label: '原料准备', status: 'completed' },
    { icon: 'cut', label: 'PCB切割', status: 'completed' },
    { icon: 'microchip', label: '元器件贴装', status: 'inProgress' },
    { icon: 'fire', label: '回流焊接', status: 'pending' },
    { icon: 'check-circle', label: '功能测试', status: 'pending' },
  ];

  // 工序数据
  const processData: ProcessItem[] = [
    {
      id: '1',
      name: '元器件贴装',
      code: 'PR20231201-03',
      status: '使用中',
      responsible: '王工程师',
      standardTime: '45分钟/批次',
      utilizationRate: 85,
      equipment: {
        name: 'SMT贴片机#2',
        icon: 'microchip',
        iconColor: '#0066ff',
      },
      yieldRate: '98.3%',
    },
    {
      id: '2',
      name: '电路板焊接',
      code: 'PR20231201-04',
      status: '使用中',
      responsible: '李工程师',
      standardTime: '60分钟/批次',
      utilizationRate: 75,
      equipment: {
        name: '波峰焊接机#1',
        icon: 'fire',
        iconColor: '#f97316',
      },
      yieldRate: '97.5%',
    },
    // 可以根据需要添加更多工序数据
  ];

  // 处理工序详情点击事件
  const handleProcessDetail = (processId: string) => {
    // 这里可以添加导航到工序详情页面的逻辑
    console.log(`查看工序详情: ${processId}`);
  };

  return (
    <View>
      {/* 工序概览 - 显示工序总数、使用中和待优化的统计信息 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          工序概览
        </Text>
        <View className="mb-3 flex-row justify-between">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#0066ff' }}>
              18
            </Text>
            <Text className="mt-1 text-xs text-gray-500">工序总数</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#22c55e' }}>
              10
            </Text>
            <Text className="mt-1 text-xs text-gray-500">使用中</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#f97316' }}>
              2
            </Text>
            <Text className="mt-1 text-xs text-gray-500">待优化</Text>
          </View>
        </View>
      </View>

      {/* 工序流程图 - 显示生产工序的流程和进度 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-medium">智能手表生产工序流程</Text>
          <View className="flex-row items-center">
            <Text className="text-sm font-medium text-blue-600">
              当前批次：
            </Text>
            <Text className="text-sm">B20231204-01</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-3"
        >
          <View className="min-w-full flex-row items-center py-2">
            {/* 使用map函数循环渲染流程节点 */}
            {processFlowNodes.map((node, index) => (
              <React.Fragment key={index}>
                <ProcessNode
                  icon={node.icon}
                  label={node.label}
                  status={node.status}
                />
                {/* 如果不是最后一个节点，添加连接线 */}
                {index < processFlowNodes.length - 1 && (
                  <View
                    className={`h-0.5 w-12 ${node.status === 'pending' ? 'bg-gray-200' : 'bg-green-500'}`}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>

        {/* 工序进度信息 */}
        <View className="flex-row items-center rounded-xl bg-blue-50 p-3">
          <FontAwesome
            name="info-circle"
            size={16}
            color="#0066ff"
            style={{ marginRight: 8 }}
          />
          <View>
            <Text className="text-sm">
              当前进度：
              <Text className="font-medium">40%</Text> | 预计完成时间：
              <Text className="font-medium">2023-12-05 18:00</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* 工序列表标题 */}
      <Text className="mb-3 text-lg font-semibold text-gray-800">工序列表</Text>

      {/* 工序列表 - 使用map函数循环渲染工序数据 */}
      {processData.map((process) => (
        <View
          key={process.id}
          className="mb-4 rounded-2xl bg-white p-4 shadow-sm"
        >
          {/* 工序名称和状态 */}
          <View className="mb-2 flex-row items-start justify-between">
            <Text className="text-base font-medium text-gray-800">
              {process.name}
            </Text>
            <StatusBadge
              status={process.status}
              color={statusColorMap[process.status].color}
              bgColor={statusColorMap[process.status].bgColor}
            />
          </View>

          {/* 工序编号 */}
          <Text className="mb-2 text-sm text-gray-500">
            工序编号：{process.code}
          </Text>

          {/* 工序基本信息 - 负责人和标准工时 */}
          <View className="mb-3 flex-row justify-between">
            <View className="flex-1">
              <Text className="mb-1 text-xs text-gray-500">负责人</Text>
              <Text className="text-sm font-medium">{process.responsible}</Text>
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-xs text-gray-500">标准工时</Text>
              <Text className="text-sm font-medium">
                {process.standardTime}
              </Text>
            </View>
          </View>

          {/* 设备利用率进度条 */}
          <View className="mb-2">
            <View className="mb-1 flex-row justify-between">
              <Text className="text-sm text-gray-500">设备利用率</Text>
              <Text className="text-sm">{process.utilizationRate}%</Text>
            </View>
            <ProgressBar progress={process.utilizationRate} color="#22c55e" />
          </View>

          {/* 关联设备信息 */}
          <View className="mb-3 rounded-xl bg-blue-50 p-3">
            <Text className="mb-2 text-sm font-medium">关联设备</Text>
            <View className="flex-row items-center">
              <FontAwesome
                name={process.equipment.icon}
                size={16}
                color={process.equipment.iconColor}
                style={{ marginRight: 8 }}
              />
              <Text className="text-sm">{process.equipment.name}</Text>
            </View>
          </View>

          {/* 工序项目底部 - 良品率和详情链接 */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-500">良品率：</Text>
              <Text className="mr-3 text-sm font-medium">
                {process.yieldRate}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleProcessDetail(process.id)}>
              <Text className="text-sm text-blue-600">详情</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};
