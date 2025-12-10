import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { queryByFilter } from '@/api';
import { RefreshListView } from '@/components';
import { NavHeader, Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';
import { useAppColorScheme } from '@/lib/hooks';
import { type Equipment, type EquipmentStatus } from '@/types';
import { Env } from '@env';

const PageSize = 10;
const moduleCode = 'EM_EQUIPMENT_INFO_MNG';

type FilterType = 'all' | 'running' | 'repairing' | 'fault';

const STATUS_COLORS = {
  running: { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0' },
  repairing: { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
  fault: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
  default: { bg: '#f3f4f6', text: '#6b7280', border: '#e5e7eb' },
};

const getStatusConfig = (status: EquipmentStatus | null | undefined) => {
  switch (status) {
    case 'running':
      return { ...STATUS_COLORS.running, icon: 'check-circle', label: '运行中' };
    case 'repairing':
      return { ...STATUS_COLORS.repairing, icon: 'wrench', label: '维修中' };
    case 'fault':
      return { ...STATUS_COLORS.fault, icon: 'exclamation-triangle', label: '故障' };
    default:
      return { ...STATUS_COLORS.default, icon: 'question-circle', label: '未知' };
  }
};

type FilterButtonProps = {
  label: string;
  count: number;
  active: boolean;
  onPress: () => void;
  color?: string;
  isDark: boolean;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  count,
  active,
  onPress,
  color,
  isDark,
}) => (
  <TouchableOpacity
    style={[
      styles.filterButton,
      isDark && styles.filterButtonDark,
      active && { backgroundColor: color || '#3b82f6' },
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      style={[
        styles.filterButtonText,
        isDark && styles.filterButtonTextDark,
        active && styles.filterButtonTextActive,
      ]}
    >
      {label}
    </Text>
    <View
      style={[
        styles.filterBadge,
        isDark && styles.filterBadgeDark,
        active && styles.filterBadgeActive,
        !active && color ? { backgroundColor: `${color}20` } : null,
      ]}
    >
      <Text
        style={[
          styles.filterBadgeText,
          active && styles.filterBadgeTextActive,
          !active && color ? { color } : null,
        ]}
      >
        {count}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function Equipment() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { isDark } = useAppColorScheme();
  const [list, setList] = useState<Equipment[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const pageNumRef = useRef(1);

  const loadData = async (append = false) => {
    const page = append ? pageNumRef.current + 1 : 1;
    pageNumRef.current = page;

    const filter = {
      PageIndex: page,
      PageSize: PageSize,
      Conditions: '',
    };

    const { success, data, total } = await queryByFilter(moduleCode, {}, filter);

    if (success && Array.isArray(data)) {
      const newHasMore = list.length + data.length < (total || 0);
      setHasMore(newHasMore);
      setList((prev) => (append ? [...prev, ...data] : data));
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadData(false);
  }, []);

  const handleEquipmentPress = (item: Equipment) => {
    console.log('Equipment pressed:', item);
  };

  const onRefresh = () => {
    pageNumRef.current = 1;
    loadData(false);
  };

  const onLoadMore = () => {
    if (!hasMore) return;
    loadData(true);
  };

  const filterCounts = useMemo(
    () => ({
      all: list.length,
      running: list.filter((e) => e.Status === 'running').length,
      repairing: list.filter((e) => e.Status === 'repairing').length,
      fault: list.filter((e) => e.Status === 'fault').length,
    }),
    [list]
  );

  const filteredList = useMemo(() => {
    if (activeFilter === 'all') return list;
    return list.filter((e) => e.Status === activeFilter);
  }, [list, activeFilter]);

  const renderEquipmentCard = ({ item }: { item: Equipment }) => {
    const statusConfig = getStatusConfig(item.Status);
    const healthRate = item.HealthRate ?? 0;
    const repairCount = item.RepairCount ?? 0;

    return (
      <TouchableOpacity
        style={[styles.card, isDark && styles.cardDark]}
        onPress={() => handleEquipmentPress(item)}
        activeOpacity={0.7}
      >
        {/* 状态指示条 */}
        <View style={[styles.statusBar, { backgroundColor: statusConfig.text }]} />

        <View style={styles.cardContent}>
          {/* 顶部区域：图片 + 信息 + 状态 */}
          <View style={styles.cardHeader}>
            {/* 设备图片 */}
            <View style={[styles.imageContainer, isDark && styles.imageContainerDark]}>
              {item.ImageId ? (
                <Image
                  source={{ uri: `${Env.API_URL}/api/File/Img/${item.ImageId}` }}
                  style={styles.equipmentImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <FontAwesome name="cogs" size={24} color="#9ca3af" />
                </View>
              )}
            </View>

            {/* 设备信息 */}
            <View style={styles.infoContainer}>
              <Text
                style={[styles.machineName, isDark && styles.textLight]}
                numberOfLines={1}
              >
                {item.MachineName}
              </Text>
              <Text style={[styles.machineNo, isDark && styles.textMuted]}>
                {item.MachineNo}
              </Text>
              <View style={styles.locationRow}>
                <FontAwesome name="map-marker" size={11} color="#9ca3af" />
                <Text
                  style={[styles.locationText, isDark && styles.textMuted]}
                  numberOfLines={1}
                >
                  {item.Location || '未设置'}
                </Text>
              </View>
            </View>

            {/* 状态标签 */}
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusConfig.bg, borderColor: statusConfig.border },
              ]}
            >
              <FontAwesome
                name={statusConfig.icon as any}
                size={10}
                color={statusConfig.text}
              />
              <Text style={[styles.statusText, { color: statusConfig.text }]}>
                {statusConfig.label}
              </Text>
            </View>
          </View>

          {/* 分隔线 */}
          <View style={[styles.divider, isDark && styles.dividerDark]} />

          {/* 底部统计区域 */}
          <View style={styles.statsContainer}>
            {/* 健康度 */}
            <View style={styles.statItem}>
              <View style={styles.statValueRow}>
                <Text
                  style={[
                    styles.statValue,
                    { color: healthRate < 50 ? '#dc2626' : '#059669' },
                  ]}
                >
                  {healthRate}
                </Text>
                <Text style={styles.statUnit}>%</Text>
              </View>
              <Text style={[styles.statLabel, isDark && styles.textMuted]}>健康度</Text>
              {/* 健康度进度条 */}
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(30, 100)}%`,
                      backgroundColor: healthRate < 50 ? '#dc2626' : '#059669',
                    },
                  ]}
                />
              </View>
            </View>

            {/* 分隔 */}
            <View style={[styles.statDivider, isDark && styles.dividerDark]} />

            {/* 维修次数 */}
            <View style={styles.statItem}>
              <View style={styles.statValueRow}>
                <Text style={[styles.statValue, { color: '#3b82f6' }]}>{repairCount}</Text>
                <Text style={styles.statUnit}>次</Text>
              </View>
              <Text style={[styles.statLabel, isDark && styles.textMuted]}>本月维修</Text>
            </View>

            {/* 分隔 */}
            <View style={[styles.statDivider, isDark && styles.dividerDark]} />

            {/* 停机日期 */}
            <View style={styles.statItem}>
              <View style={styles.statValueRow}>

                <Text
                  style={[
                    styles.statValueSmall,
                    isDark && styles.textLight,
                    {
                      color:
                        item.Status === 'repairing'
                          ? '#faad14'
                          : item.Status === 'fault'
                            ? '#f5222d'
                            : '#374151',
                    },
                  ]}
                >
                  xxxxxx
                </Text>
              </View>
              <Text style={[styles.statLabel, isDark && styles.textMuted]}> {item.Status === 'repairing'
                ? '维修状态'
                : item.Status === 'fault'
                  ? '优先级'
                  : '距保养'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconContainer, isDark && styles.emptyIconContainerDark]}>
        <FontAwesome
          name="inbox"
          size={40}
          color={isDark ? '#6b7280' : '#9ca3af'}
          group={GroupEnum.FontAwesome}
        />
      </View>
      <Text style={[styles.emptyTitle, isDark && styles.textLight]}>暂无设备信息</Text>
      <Text style={[styles.emptySubtitle, isDark && styles.textMuted]}>
        下拉刷新或添加新设备
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* 顶部导航 */}
      <NavHeader
        title="设备"
        leftShown={false}
        right={
          <TouchableOpacity
            className="mr-3"
            onPress={() => router.push('/equipment/add')}
          >

            <FontAwesome name="plus" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
          </TouchableOpacity>
        }
      />

      {/* 搜索和筛选区域 */}
      <View style={[styles.searchSection, isDark && styles.searchSectionDark]}>
        {/* 搜索框 */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <FontAwesome
              name="search"
              size={14}
              color="#9ca3af"
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, isDark && styles.searchInputDark]}
              placeholder="搜索设备名称、编号..."
              placeholderTextColor="#9ca3af"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.7}>
            <FontAwesome name="search" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* 筛选标签 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          <FilterButton
            label="全部"
            count={filterCounts.all}
            active={activeFilter === 'all'}
            onPress={() => setActiveFilter('all')}
            isDark={isDark}
          />
          <FilterButton
            label="运行中"
            count={filterCounts.running}
            active={activeFilter === 'running'}
            onPress={() => setActiveFilter('running')}
            color={STATUS_COLORS.running.text}
            isDark={isDark}
          />
          <FilterButton
            label="维修中"
            count={filterCounts.repairing}
            active={activeFilter === 'repairing'}
            onPress={() => setActiveFilter('repairing')}
            color={STATUS_COLORS.repairing.text}
            isDark={isDark}
          />
          <FilterButton
            label="故障"
            count={filterCounts.fault}
            active={activeFilter === 'fault'}
            onPress={() => setActiveFilter('fault')}
            color={STATUS_COLORS.fault.text}
            isDark={isDark}
          />
          <TouchableOpacity
            style={[styles.filterMoreButton, isDark && styles.filterMoreButtonDark]}
            activeOpacity={0.7}
          >
            <FontAwesome name="sliders" size={14} color={isDark ? '#d4d4d4' : '#374151'} />
            <Text style={[styles.filterMoreText, isDark && styles.filterMoreTextDark]}>
              筛选
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 设备列表 */}
      <RefreshListView
        data={filteredList}
        renderItem={renderEquipmentCard}
        keyExtractor={(item) => item.ID}
        showsVerticalScrollIndicator={false}
        hasMore={hasMore}
        ListEmptyComponent={EmptyState}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  containerDark: {
    backgroundColor: '#171717',
  },

  // 搜索区域
  searchSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchSectionDark: {
    backgroundColor: '#262626',
    borderBottomColor: '#404040',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  searchInputContainer: {
    flex: 1,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 14,
    color: '#374151',
  },
  searchInputDark: {
    backgroundColor: '#404040',
    color: '#f3f4f6',
  },
  searchButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    padding: 12,
  },

  // 筛选按钮
  filterScrollContent: {
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 6,
  },
  filterButtonDark: {
    backgroundColor: '#404040',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  filterButtonTextDark: {
    color: '#d4d4d4',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  filterBadge: {
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  filterBadgeDark: {
    backgroundColor: '#525252',
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterBadgeTextActive: {
    color: '#ffffff',
  },
  filterMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 6,
  },
  filterMoreButtonDark: {
    backgroundColor: '#404040',
  },
  filterMoreText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  filterMoreTextDark: {
    color: '#d4d4d4',
  },

  // 列表
  listContent: {
    padding: 12,
  },

  // 卡片
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardDark: {
    backgroundColor: '#262626',
  },
  statusBar: {
    height: 3,
    width: '100%',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  // 设备图片
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    overflow: 'hidden',
  },
  imageContainerDark: {
    backgroundColor: '#404040',
  },
  equipmentImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 设备信息
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  machineName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  machineNo: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4,
    flex: 1,
  },

  // 状态标签
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // 分隔线
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 14,
  },
  dividerDark: {
    backgroundColor: '#404040',
  },

  // 底部统计
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statValueSmall: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  statUnit: {
    fontSize: 11,
    color: '#9ca3af',
    marginLeft: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#f3f4f6',
  },

  // 进度条
  progressBar: {
    width: '70%',
    height: 3,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },

  // 文字样式
  textLight: {
    color: '#f3f4f6',
  },
  textMuted: {
    color: '#9ca3af',
  },

  // 空状态
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyIconContainerDark: {
    backgroundColor: '#404040',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
