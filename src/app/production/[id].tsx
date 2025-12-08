import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavHeader, SafeAreaView } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib';

const ProductionDetail = () => {
  const [activeTab, setActiveTab] = useState('production-process');
  const { isDark } = useAppColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <NavHeader
        title="生产详情"
        right={
          <>
            <TouchableOpacity className="mr-4">
              <FontAwesome name="share-alt" size={18} color={isDark ? '#9ca3af' : '#4b5563'} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="ellipsis-v" size={18} color={isDark ? '#9ca3af' : '#4b5563'} />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView className="flex-1 p-4">
        {/* 生产计划基本信息 */}
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-3 flex-row items-start justify-between">
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              夏季新品连衣裙生产计划
            </Text>
            <View className="rounded-full bg-green-100 px-2 py-1 dark:bg-green-900/30">
              <Text className="text-xs font-medium text-green-800 dark:text-green-300">
                <FontAwesome
                  name="play-circle"
                  size={12}
                  color={isDark ? '#86efac' : '#15803d'}
                  style={{ marginRight: 4 }}
                />
                进行中
              </Text>
            </View>
          </View>

          <Text className="mb-3 text-sm text-gray-500 dark:text-gray-400">
            计划编号: PL20230601
          </Text>

          <View className="mb-4 flex-row flex-wrap">
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">负责人</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">张经理</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">所属订单</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">ORD20230520</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">开始日期</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">2023-06-01</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">截止日期</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">2023-06-30</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">计划产量</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">2,500件</Text>
            </View>
            <View className="mb-3 w-1/2">
              <Text className="mb-1 text-xs text-gray-500 dark:text-gray-400">已完成</Text>
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">1,875件 (75%)</Text>
            </View>
          </View>

          <View className="mb-3">
            <View className="mb-1 flex-row justify-between">
              <Text className="text-xs text-gray-900 dark:text-gray-100">生产进度</Text>
              <Text className="text-xs font-medium text-gray-900 dark:text-gray-100">75%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <View
                className="h-full rounded-full bg-green-500"
                style={{ width: '75%' }}
              />
            </View>
          </View>

          <View className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <View className="flex-row">
              <FontAwesome
                name="info-circle"
                size={16}
                color={isDark ? '#60a5fa' : '#0066ff'}
                style={{ marginTop: 2, marginRight: 8 }}
              />
              <View>
                <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">生产说明</Text>
                <Text className="text-sm text-gray-900 dark:text-gray-100">
                  本批次连衣裙采用新型面料，需特别注意缝制工艺和质量控制。
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 选项卡控制器 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row">
            {[
              { id: 'production-process', label: '生产流程' },
              { id: 'task-list', label: '任务列表' },
              { id: 'material-usage', label: '物料使用' },
              { id: 'quality-control', label: '质量控制' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                className={`mr-2 rounded-full px-4 py-2 ${activeTab === tab.id ? 'bg-blue-600' : 'bg-gray-100 dark:bg-gray-700'}`}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text
                  className={`text-sm font-medium ${activeTab === tab.id ? 'text-white' : 'text-gray-800 dark:text-gray-300'}`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 选项卡内容区域 */}
        <View className="mt-2">
          {/* 生产流程内容 */}
          {activeTab === 'production-process' && (
            <View>
              {/* 工序流程图 */}
              <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
                <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">生产流程</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row items-center py-2">
                    <View className="items-center">
                      <View className="size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <FontAwesome name="cut" size={30} color={isDark ? '#4ade80' : '#16a34a'} />
                        <View className="absolute right-6 top-6 size-5 items-center justify-center rounded-full bg-green-500">
                          <FontAwesome name="check" size={10} color="#fff" />
                        </View>
                      </View>
                      <Text className="mt-1 text-xs font-medium text-gray-900 dark:text-gray-100">裁剪</Text>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">已完成</Text>
                    </View>

                    <View className="mx-1 h-0.5 w-10 bg-green-500" />

                    <View className="items-center">
                      <View className="size-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <FontAwesome
                          name="tshirt"
                          size={30}
                          color={isDark ? '#60a5fa' : '#2563eb'}
                          group={GroupEnum.FontAwesome5}
                        />
                        <View className="right-5.5 absolute top-6 size-5 items-center justify-center rounded-full bg-blue-500">
                          <FontAwesome
                            name="sync"
                            size={10}
                            color="#fff"
                            group={GroupEnum.AntDesign}
                          />
                        </View>
                      </View>
                      <Text className="mt-1 text-xs font-medium text-gray-900 dark:text-gray-100">缝制</Text>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">进行中</Text>
                    </View>

                    <View className="mx-1 h-0.5 w-10 bg-gray-300 dark:bg-gray-600" />

                    <View className="items-center">
                      <View className="size-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                        <FontAwesome
                          name="paint-brush"
                          size={30}
                          color={isDark ? '#9ca3af' : '#6b7280'}
                        />
                      </View>
                      <Text className="mt-1 text-xs font-medium text-gray-900 dark:text-gray-100">装饰</Text>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">待开始</Text>
                    </View>

                    <View className="mx-1 h-0.5 w-10 bg-gray-300 dark:bg-gray-600" />

                    <View className="items-center">
                      <View className="size-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                        <FontAwesome name="search" size={30} color={isDark ? '#9ca3af' : '#6b7280'} />
                      </View>
                      <Text className="mt-1 text-xs font-medium text-gray-900 dark:text-gray-100">质检</Text>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">待开始</Text>
                    </View>

                    <View className="mx-1 h-0.5 w-10 bg-gray-300 dark:bg-gray-600" />

                    <View className="items-center">
                      <View className="size-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                        <FontAwesome name="tags" size={30} color={isDark ? '#9ca3af' : '#6b7280'} />
                      </View>
                      <Text className="mt-1 text-xs font-medium text-gray-900 dark:text-gray-100">包装</Text>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">待开始</Text>
                    </View>
                  </View>
                </ScrollView>
              </View>

              {/* 生产时间线 */}
              <View className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
                <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">生产时间线</Text>

                <View className="ml-2">
                  {[
                    {
                      title: '生产计划创建',
                      time: '2023-05-25 10:30',
                      desc: '创建了夏季新品连衣裙生产计划',
                      active: true,
                    },
                    {
                      title: '物料准备完成',
                      time: '2023-05-30 16:45',
                      desc: '所有面料和辅料已准备就绪',
                      active: true,
                    },
                    {
                      title: '裁剪工序开始',
                      time: '2023-06-01 08:00',
                      desc: '开始裁剪面料，预计3天完成',
                      active: true,
                    },
                    {
                      title: '裁剪工序完成',
                      time: '2023-06-03 17:30',
                      desc: '所有面料裁剪完成，提前半天完成任务',
                      active: true,
                    },
                    {
                      title: '缝制工序开始',
                      time: '2023-06-04 08:00',
                      desc: '开始连衣裙缝制工作',
                      active: true,
                    },
                    {
                      title: '第一批次完成',
                      time: '2023-06-10 15:20',
                      desc: '完成500件连衣裙的缝制',
                      active: true,
                    },
                    {
                      title: '当前进度',
                      time: '2023-06-15 12:00',
                      desc: '已完成1,875件，缝制工序进行中',
                      active: true,
                    },
                    {
                      title: '预计装饰工序开始',
                      time: '2023-06-18',
                      desc: '',
                      active: false,
                    },
                    {
                      title: '预计质检工序开始',
                      time: '2023-06-25',
                      desc: '',
                      active: false,
                    },
                  ].map((item, index) => (
                    <View key={index} className="relative pb-4 pl-7">
                      <View
                        className={`absolute left-0 top-1 size-2.5 rounded-full ${item.active ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                      />
                      {index < 8 && (
                        <View
                          className={`absolute left-1 top-3 h-full w-0.5 ${item.active ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                          style={{ height: '100%' }}
                        />
                      )}
                      <Text
                        className={`mb-1 font-medium ${!item.active ? 'text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}
                      >
                        {item.title}
                      </Text>
                      <Text
                        className={`text-sm ${!item.active ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}
                      >
                        {item.time}
                      </Text>
                      {item.desc && (
                        <Text className="mt-1 text-sm text-gray-900 dark:text-gray-100">{item.desc}</Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* 任务列表内容 */}
          {activeTab === 'task-list' && (
            <View>
              {[
                {
                  title: '连衣裙裁剪任务',
                  id: 'T20230601-01',
                  status: '已完成',
                  statusColor: 'green',
                  icon: 'check-circle',
                  manager: '张工',
                  completeTime: '2023-06-03 17:30',
                  planHours: '24小时',
                  actualHours: '21.5小时',
                  progress: 100,
                },
                {
                  title: '连衣裙缝制任务',
                  id: 'T20230604-01',
                  status: '进行中',
                  statusColor: 'blue',
                  icon: 'play-circle',
                  manager: '李工',
                  completeTime: '2023-06-18',
                  planHours: '120小时',
                  actualHours: '90小时',
                  progress: 75,
                },
                {
                  title: '连衣裙装饰任务',
                  id: 'T20230618-01',
                  status: '待开始',
                  statusColor: 'gray',
                  icon: 'clock',
                  manager: '王工',
                  startTime: '2023-06-18',
                  completeTime: '2023-06-24',
                  planHours: '48小时',
                  progress: 0,
                },
              ].map((task, index) => (
                <View
                  key={index}
                  className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800"
                >
                  <View className="mb-2 flex-row items-start justify-between">
                    <View>
                      <Text className="font-semibold text-gray-900 dark:text-gray-100">{task.title}</Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">
                        任务编号: {task.id}
                      </Text>
                    </View>
                    <View
                      className={`rounded-full px-2 py-1 ${task.statusColor === 'green' ? 'bg-green-100 dark:bg-green-900/30' : task.statusColor === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}
                    >
                      <Text
                        className={`text-xs font-medium ${task.statusColor === 'green' ? 'text-green-800 dark:text-green-300' : task.statusColor === 'blue' ? 'text-blue-800 dark:text-blue-300' : 'text-gray-800 dark:text-gray-300'}`}
                      >
                        <FontAwesome
                          name={task.icon}
                          size={12}
                          color={
                            task.statusColor === 'green'
                              ? (isDark ? '#86efac' : '#15803d')
                              : task.statusColor === 'blue'
                                ? (isDark ? '#93c5fd' : '#1d4ed8')
                                : (isDark ? '#9ca3af' : '#4b5563')
                          }
                          style={{ marginRight: 4 }}
                        />
                        {task.status}
                      </Text>
                    </View>
                  </View>

                  <View className="my-3 flex-row flex-wrap">
                    <View className="mb-2 w-1/2">
                      <Text className="text-xs text-gray-500 dark:text-gray-400">负责人</Text>
                      <Text className="font-medium text-gray-900 dark:text-gray-100">{task.manager}</Text>
                    </View>
                    <View className="mb-2 w-1/2">
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        {task.status === '已完成'
                          ? '完成时间'
                          : task.status === '进行中'
                            ? '预计完成'
                            : '计划开始'}
                      </Text>
                      <Text className="font-medium text-gray-900 dark:text-gray-100">
                        {task.status === '已完成'
                          ? task.completeTime
                          : task.status === '进行中'
                            ? task.completeTime
                            : task.startTime}
                      </Text>
                    </View>
                    <View className="mb-2 w-1/2">
                      <Text className="text-xs text-gray-500 dark:text-gray-400">计划工时</Text>
                      <Text className="font-medium text-gray-900 dark:text-gray-100">{task.planHours}</Text>
                    </View>
                    <View className="mb-2 w-1/2">
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        {task.status === '已完成'
                          ? '实际工时'
                          : task.status === '进行中'
                            ? '已用工时'
                            : '计划完成'}
                      </Text>
                      <Text className="font-medium text-gray-900 dark:text-gray-100">
                        {task.status === '已完成'
                          ? task.actualHours
                          : task.status === '进行中'
                            ? task.actualHours
                            : task.completeTime}
                      </Text>
                    </View>
                  </View>

                  {task.status === '进行中' && (
                    <View className="mb-2">
                      <View className="mb-1 flex-row justify-between text-xs">
                        <Text className="text-gray-900 dark:text-gray-100">任务进度</Text>
                        <Text className="font-medium text-gray-900 dark:text-gray-100">{task.progress}%</Text>
                      </View>
                      <View className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <View
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* 物料使用内容 */}
          {activeTab === 'material-usage' && (
            <View>
              <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
                <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">
                  物料使用情况
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View>
                    <View className="flex-row bg-gray-50 py-2 dark:bg-gray-700">
                      <Text className="w-24 px-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        物料名称
                      </Text>
                      <Text className="w-20 px-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        规格
                      </Text>
                      <Text className="w-20 px-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        计划用量
                      </Text>
                      <Text className="w-20 px-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        已用量
                      </Text>
                      <Text className="w-20 px-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        剩余量
                      </Text>
                    </View>

                    {[
                      {
                        name: '棉麻面料',
                        spec: '1.5米宽',
                        plan: '3,750米',
                        used: '2,850米',
                        remain: '900米',
                      },
                      {
                        name: '拉链',
                        spec: '20cm',
                        plan: '2,500个',
                        used: '1,875个',
                        remain: '625个',
                      },
                      {
                        name: '装饰纽扣',
                        spec: '1.2cm',
                        plan: '10,000个',
                        used: '0个',
                        remain: '10,000个',
                      },
                      {
                        name: '缝纫线',
                        spec: '白色',
                        plan: '250卷',
                        used: '180卷',
                        remain: '70卷',
                      },
                    ].map((material, index) => (
                      <View
                        key={index}
                        className="flex-row border-t border-gray-200 py-2 dark:border-gray-700"
                      >
                        <Text className="w-24 px-3 text-sm text-gray-900 dark:text-gray-100">
                          {material.name}
                        </Text>
                        <Text className="w-20 px-3 text-sm text-gray-900 dark:text-gray-100">
                          {material.spec}
                        </Text>
                        <Text className="w-20 px-3 text-sm text-gray-900 dark:text-gray-100">
                          {material.plan}
                        </Text>
                        <Text className="w-20 px-3 text-sm text-gray-900 dark:text-gray-100">
                          {material.used}
                        </Text>
                        <Text className="w-20 px-3 text-sm text-gray-900 dark:text-gray-100">
                          {material.remain}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>

              <View className="mb-20 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
                <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">
                  物料消耗分析
                </Text>

                <View className="mb-4">
                  <View className="mb-1 flex-row justify-between text-sm">
                    <Text className="text-gray-900 dark:text-gray-100">面料利用率</Text>
                    <Text className="text-gray-900 dark:text-gray-100">92.5%</Text>
                  </View>
                  <View className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <View
                      className="h-full rounded-full bg-green-500"
                      style={{ width: '92.5%' }}
                    />
                  </View>
                </View>

                <View className="mb-4">
                  <View className="mb-1 flex-row justify-between text-sm">
                    <Text className="text-gray-900 dark:text-gray-100">辅料消耗率</Text>
                    <Text className="text-gray-900 dark:text-gray-100">75%</Text>
                  </View>
                  <View className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <View
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: '75%' }}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* 质量控制内容 */}
          {activeTab === 'quality-control' && (
            <View>
              <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
                <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">
                  质量检验标准
                </Text>

                <View className="mb-4">
                  <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">面料质量</Text>
                  <Text className="text-sm text-gray-700 dark:text-gray-300">
                    面料平整度≥95%，色差≤±2%，接缝强度≥4.5kg/cm
                  </Text>
                </View>

                <View className="mb-4">
                  <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">缝制质量</Text>
                  <Text className="text-sm text-gray-700 dark:text-gray-300">
                    针距均匀度≥98%，接缝平整，无跳针、断线现象
                  </Text>
                </View>

                <View>
                  <Text className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">外观质量</Text>
                  <Text className="text-sm text-gray-700 dark:text-gray-300">
                    无明显瑕疵，装饰部件牢固，整体外观符合设计要求
                  </Text>
                </View>
              </View>

              <View className="mb-10 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
                <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">
                  质量检验记录
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View>
                    <View className="flex-row bg-gray-50 py-2 dark:bg-gray-700">
                      <Text className="w-24 px-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        批次
                      </Text>
                      <Text className="w-24 px-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        检验日期
                      </Text>
                      <Text className="w-20 px-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        检验数量
                      </Text>
                      <Text className="w-20 px-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        合格率
                      </Text>
                      <Text className="w-24 px-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        检验员
                      </Text>
                    </View>

                    {[
                      {
                        batch: 'B20230603-01',
                        date: '2023-06-03',
                        count: '500件',
                        rate: '98.4%',
                        inspector: '王质检',
                      },
                      {
                        batch: 'B20230610-01',
                        date: '2023-06-10',
                        count: '500件',
                        rate: '99.2%',
                        inspector: '李质检',
                      },
                      {
                        batch: 'B20230615-01',
                        date: '2023-06-15',
                        count: '875件',
                        rate: '97.8%',
                        inspector: '张质检',
                      },
                    ].map((record, index) => (
                      <View
                        key={index}
                        className="flex-row border-t border-gray-200 py-2 dark:border-gray-700"
                      >
                        <Text className="w-24 px-3 text-sm text-gray-900 dark:text-gray-100">
                          {record.batch}
                        </Text>
                        <Text className="w-24 px-3 text-sm text-gray-900 dark:text-gray-100">{record.date}</Text>
                        <Text className="w-20 px-3 text-sm text-gray-900 dark:text-gray-100">
                          {record.count}
                        </Text>
                        <Text className="w-20 px-3 text-sm text-gray-900 dark:text-gray-100">{record.rate}</Text>
                        <Text className="w-24 px-3 text-sm text-gray-900 dark:text-gray-100">
                          {record.inspector}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductionDetail;
