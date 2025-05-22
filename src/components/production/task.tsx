import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@/components/ui/icons';

import { ProgressBar } from './progress-bar';
import { StatusBadge } from './status-badge';

/**
 * 任务状态类型定义
 */
type TaskStatus = '进行中' | '待分配' | '已完成' | '已延期';

/**
 * 任务数据接口定义
 */
interface TaskItem {
  id: string; // 任务ID
  title: string; // 任务标题
  taskNo: string; // 任务编号
  assignee: string; // 负责人
  deadline: string; // 截止日期
  progress: number; // 完成进度(0-100)
  planNo: string; // 所属计划编号
  status: TaskStatus; // 任务状态
}

/**
 * 状态颜色映射
 * 为不同的任务状态定义对应的颜色
 */
const statusColorMap: Record<TaskStatus, { color: string; bgColor: string }> = {
  进行中: { color: '#22c55e', bgColor: '#dcfce7' },
  待分配: { color: '#f97316', bgColor: '#ffedd5' },
  已完成: { color: '#0066ff', bgColor: '#e0f2fe' },
  已延期: { color: '#ef4444', bgColor: '#fee2e2' },
};

/**
 * 模拟任务数据
 * 在实际应用中，这些数据通常从API获取
 */
const taskData: TaskItem[] = [
  {
    id: '1',
    title: '主板元器件贴装任务',
    taskNo: 'TA20231205-01',
    assignee: '李技术员',
    deadline: '2023-12-10',
    progress: 70,
    planNo: 'PP20231128-01',
    status: '进行中',
  },
  {
    id: '2',
    title: '电路板焊接任务',
    taskNo: 'TA20231205-02',
    assignee: '待分配',
    deadline: '2023-12-12',
    progress: 0,
    planNo: 'PP20231128-01',
    status: '待分配',
  },
  {
    id: '3',
    title: '音箱外壳注塑任务',
    taskNo: 'TA20231204-03',
    assignee: '王技术员',
    deadline: '2023-12-15',
    progress: 45,
    planNo: 'PP20231130-02',
    status: '进行中',
  },
];

/**
 * Task 组件 - 生产任务管理界面
 *
 * 该组件展示生产任务的概览和详细列表，包括：
 * 1. 任务概览：显示任务总数、进行中任务数、待分配任务数和员工任务完成率
 * 2. 生产任务列表：展示各个生产任务的详细信息和进度
 */
export const Task = () => {
  const router = useRouter();
  /**
   * 处理任务详情点击事件
   * @param taskId 任务ID
   */
  const handleTaskDetail = (taskId: string) => {
    // 这里添加导航到任务详情页面的逻辑
    router.push(`/production/task/${taskId}`);
  };

  return (
    <View>
      {/* 任务概览 */}
      <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          任务概览
        </Text>
        <View className="mb-3 flex-row justify-between">
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#0066ff' }}>
              24
            </Text>
            <Text className="mt-1 text-xs text-gray-500">任务总数</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#22c55e' }}>
              12
            </Text>
            <Text className="mt-1 text-xs text-gray-500">进行中</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-2xl font-bold" style={{ color: '#f97316' }}>
              5
            </Text>
            <Text className="mt-1 text-xs text-gray-500">待分配</Text>
          </View>
        </View>
        <View className="flex-row items-center rounded-xl bg-blue-50 p-3">
          <FontAwesome
            name="users"
            size={20}
            color="#0066ff"
            style={{ marginRight: 12 }}
          />
          <View className="flex-1">
            <Text className="text-sm font-medium">员工任务完成率</Text>
            <View className="flex-row items-center">
              <Text className="mr-2 text-lg font-bold text-blue-600">
                82.3%
              </Text>
              <Text className="text-xs text-green-600">↑ 3.7%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 生产任务列表标题 */}
      <Text className="mb-3 text-lg font-semibold text-gray-800">
        生产任务列表
      </Text>

      {/* 使用数据循环渲染任务列表 */}
      {taskData.map((task) => (
        <TouchableOpacity
          key={task.id}
          onPress={() => handleTaskDetail(task.id)}
        >
          <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            {/* 任务标题和状态 */}
            <View className="mb-2 flex-row items-start justify-between">
              <Text className="text-base font-medium text-gray-800">
                {task.title}
              </Text>
              <StatusBadge
                status={task.status}
                color={statusColorMap[task.status].color}
                bgColor={statusColorMap[task.status].bgColor}
              />
            </View>

            {/* 任务编号 */}
            <Text className="mb-2 text-sm text-gray-500">
              任务编号：{task.taskNo}
            </Text>

            {/* 负责人和截止日期 */}
            <View className="mb-3 flex-row justify-between">
              <Text className="text-sm text-gray-500">
                负责人：{task.assignee}
              </Text>
              <Text className="text-sm text-gray-500">
                截止日期：{task.deadline}
              </Text>
            </View>

            {/* 完成进度条 */}
            <View className="mb-2">
              <View className="mb-1 flex-row justify-between">
                <Text className="text-sm text-gray-500">完成进度</Text>
                <Text className="text-sm text-gray-500">{task.progress}%</Text>
              </View>
              <ProgressBar
                progress={task.progress}
                color={statusColorMap[task.status].color}
              />
            </View>

            {/* 所属计划和详情按钮 */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-sm text-gray-500">所属计划：</Text>
                <Text className="mr-3 text-sm font-medium">{task.planNo}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
