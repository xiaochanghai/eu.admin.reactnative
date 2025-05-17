import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { ProgressBar } from './progress-bar';
import { StatusBadge } from './status-badge';

/**
 * 生产计划项组件属性
 * @property title - 计划标题
 * @property code - 计划编号
 * @property manager - 负责人
 * @property deadline - 截止日期
 * @property progress - 进度百分比
 * @property total - 计划总量
 * @property completed - 已完成量
 * @property status - 状态文本
 * @property statusColor - 状态文本颜色
 * @property statusBgColor - 状态背景色
 * @property onViewDetail - 查看详情回调函数
 */
type PlanItemProps = {
  title: string;
  code: string;
  manager: string;
  deadline: string;
  progress: number;
  total: number;
  completed: number;
  status: string;
  statusColor: string;
  statusBgColor: string;
  onViewDetail?: () => void;
};

/**
 * 生产计划项组件
 * 显示单个生产计划的基本信息和进度
 */
export const PlanItem: React.FC<PlanItemProps> = ({
  title,
  code,
  manager,
  deadline,
  progress,
  total,
  completed,
  status,
  statusColor,
  statusBgColor,
  onViewDetail,
}) => (
  <TouchableOpacity onPress={onViewDetail} activeOpacity={0.7}>
    {/* 计划卡片 - 使用圆角、阴影和内边距 */}
    <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
      {/* 标题和状态区域 - 使用弹性布局和对齐方式 */}
      <View className="mb-2 flex-row items-start justify-between">
        <Text className="text-base font-medium text-gray-800">{title}</Text>
        <StatusBadge
          status={status}
          color={statusColor}
          bgColor={statusBgColor}
        />
      </View>

      {/* 计划编号 - 使用灰色文本和下边距 */}
      <Text className="mb-2 text-sm text-gray-500">计划编号：{code}</Text>

      {/* 负责人和截止日期 - 使用弹性布局和间距 */}
      <View className="mb-3 flex-row justify-between">
        <Text className="text-sm text-gray-500">负责人：{manager}</Text>
        <Text className="text-sm text-gray-500">截止日期：{deadline}</Text>
      </View>

      {/* 进度条区域 - 使用下边距和嵌套布局 */}
      <View className="mb-2">
        <View className="mb-1 flex-row justify-between">
          <Text className="text-sm text-gray-500">完成进度</Text>
          <Text className="text-sm text-gray-500">{progress}%</Text>
        </View>
        <ProgressBar progress={progress} color={statusColor} />
      </View>

      {/* 底部统计和详情链接 - 使用弹性布局和对齐 */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-500">计划产量：</Text>
          <Text className="mr-3 text-sm font-medium">{total}</Text>
          <Text className="text-sm text-gray-500">已完成：</Text>
          <Text className="mr-3 text-sm font-medium">{completed}</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-sm text-blue-600">详情</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

/**
 * 生产计划列表组件
 * 显示生产概览和多个生产计划项
 */
export const Plans = () => {
  const router = useRouter();

  // 模拟的生产计划数据
  const planItems = [
    {
      title: '智能手表主板生产计划',
      code: 'PP20231128-01',
      manager: '王工程师',
      deadline: '2023-12-15',
      progress: 65,
      total: 1000,
      completed: 650,
      status: '进行中',
      statusColor: '#22c55e',
      statusBgColor: '#dcfce7',
      id: 1,
    },
    {
      title: '智能音箱外壳注塑计划',
      code: 'PP20231125-03',
      manager: '李工程师',
      deadline: '2023-12-10',
      progress: 42,
      total: 2000,
      completed: 840,
      status: '进行中',
      statusColor: '#22c55e',
      statusBgColor: '#dcfce7',
      id: 2,
    },
    {
      title: '智能门锁电路板生产计划',
      code: 'PP20231202-03',
      manager: '张工程师',
      deadline: '2023-12-25',
      progress: 0,
      total: 500,
      completed: 0,
      status: '待开始',
      statusColor: '#f97316',
      statusBgColor: '#ffedd5',
      id: 3,
    },
  ];

  return (
    <>
      {/* 生产概览卡片 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          生产概览
        </Text>

        {/* 统计数据网格 */}
        <View className="mb-3 flex-row justify-between">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-blue-600">15</Text>
            <Text className="mt-1 text-xs text-gray-500">计划总数</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-green-500">8</Text>
            <Text className="mt-1 text-xs text-gray-500">进行中</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold text-orange-500">3</Text>
            <Text className="mt-1 text-xs text-gray-500">待开始</Text>
          </View>
        </View>

        {/* 完成率卡片 */}
        <View className="flex-row items-center rounded-xl bg-blue-50 p-3">
          <FontAwesome
            name="line-chart"
            size={20}
            color="#0066ff"
            className="mr-3"
          />
          <View className="flex-1">
            <Text className="text-sm font-medium">本月生产完成率</Text>
            <View className="flex-row items-center">
              <Text className="mr-2 text-lg font-bold text-blue-600">
                78.5%
              </Text>
              <Text className="text-xs text-green-500">↑ 5.2%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 生产计划列表标题 */}
      <Text className="mb-3 text-lg font-semibold text-gray-800">
        生产计划列表
      </Text>

      {/* 生产计划列表项 */}
      {planItems.map((item) => (
        <PlanItem
          key={item.id}
          title={item.title}
          code={item.code}
          manager={item.manager}
          deadline={item.deadline}
          progress={item.progress}
          total={item.total}
          completed={item.completed}
          status={item.status}
          statusColor={item.statusColor}
          statusBgColor={item.statusBgColor}
          onViewDetail={() => router.push(`/production/${item.id}`)}
        />
      ))}
    </>
  );
};
