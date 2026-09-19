import { Env } from '@env';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { queryByFilter } from '@/api';
import http from '@/api/common/http';
import { RefreshListView } from '@/components/refresh-list-view';
import { FontAwesome, NavHeader, Text, View } from '@/components/ui';
import type {
  MobileAction,
  MobileNode,
  MobilePageConfig,
  MobileStatusMapItem,
  MobileTone,
} from '@/types/mobile-config';

interface Props {
  config: MobilePageConfig;
}

const toneColors: Record<
  MobileTone,
  { text: string; bg: string; border: string }
> = {
  primary: { text: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  success: { text: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
  warning: { text: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  danger: { text: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  neutral: { text: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' },
};

const getValue = (record: Record<string, any>, path?: string) => {
  if (!path) return undefined;
  return path.split('.').reduce<any>((current, key) => current?.[key], record);
};

const formatText = (value: any, emptyText = '-') => {
  if (value === null || value === undefined || value === '') return emptyText;
  return String(value);
};

const resolvePath = (path: string, record: Record<string, any>) =>
  path.replace(/\{([^}]+)\}/g, (_, key) =>
    encodeURIComponent(formatText(getValue(record, key), ''))
  );

const executeAction = (
  action: MobileAction | undefined,
  record: Record<string, any>
) => {
  if (!action?.type) return;
  if (action.type === 'navigate' && action.path) {
    router.push(resolvePath(action.path, record) as any);
  }
};

const parseCsv = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value !== 'string') return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeApiUrl = (url?: string) => {
  if (!url) return '';
  return url.startsWith('/') ? url : `/${url}`;
};

const toNumber = (value: unknown, fallback: number) => {
  const next = Number(value);
  return Number.isFinite(next) ? next : fallback;
};

const getListMarginHorizontal = (
  value: unknown,
  defaultMarginHorizontal: number
) => {
  if (value === undefined || value === null || value === '') {
    return defaultMarginHorizontal;
  }

  const next = Number(value);
  if (!Number.isFinite(next)) return defaultMarginHorizontal;

  if (next !== 16) return next;

  return defaultMarginHorizontal;
};

const useDebouncedValue = <T,>(value: T, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [delay, value]);

  return debouncedValue;
};

const getStatus = (
  value: any,
  map?: Record<string, MobileStatusMapItem>
): MobileStatusMapItem => {
  const key = formatText(value, '');
  return map?.[key] ?? { label: key || '未知', tone: 'neutral' };
};

const SearchBar = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <View className="pb-3">
    <View className="flex-row items-center rounded-xl bg-gray-100 px-3 dark:bg-neutral-800">
      <FontAwesome name="search" size={14} color="#9ca3af" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || '搜索'}
        placeholderTextColor="#9ca3af"
        className="ml-2 h-11 flex-1 text-sm text-gray-900 dark:text-gray-100"
      />
    </View>
  </View>
);

const Tabs = ({
  items = [],
  value,
  onChange,
}: {
  items?: { label: string; value: string; tone?: MobileTone }[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="pb-3"
    contentContainerStyle={{ gap: 8 }}
  >
    {items.map((item) => {
      const active = value === item.value;
      const tone = toneColors[item.tone || 'primary'];
      return (
        <TouchableOpacity
          key={`${item.label}-${item.value}`}
          onPress={() => onChange(item.value)}
          activeOpacity={0.75}
          className="rounded-full border px-4 py-2"
          style={{
            backgroundColor: active ? tone.bg : '#fff',
            borderColor: active ? tone.border : '#e5e7eb',
          }}
        >
          <Text
            className="text-sm font-semibold"
            style={{ color: active ? tone.text : '#6b7280' }}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const StatRow = ({
  items = [],
  rows,
}: {
  items?: { label: string; bind: string; suffix?: string }[];
  rows: Record<string, any>[];
}) => (
  <View className="mb-3 flex-row rounded-xl bg-white p-3 shadow-sm dark:bg-neutral-800">
    {items.map((item) => {
      const value =
        item.bind === 'Total'
          ? rows.length
          : getValue(rows[0] || {}, item.bind);
      return (
        <View
          key={`${item.label}-${item.bind}`}
          className="flex-1 items-center"
        >
          <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {formatText(value, '0')}
            {item.suffix || ''}
          </Text>
          <Text className="mt-1 text-xs text-gray-500">{item.label}</Text>
        </View>
      );
    })}
  </View>
);

const DynamicItemField = ({
  node,
  record,
  statusMap,
}: {
  node: MobileNode;
  record: Record<string, any>;
  statusMap?: Record<string, MobileStatusMapItem>;
}): React.ReactNode => {
  const props = node.props || {};

  if (node.type === 'row') {
    return (
      <View
        className="flex-row items-center"
        style={{ gap: Number(props.gap ?? 8) }}
      >
        {node.children?.map((child, index) => (
          <React.Fragment key={child.id || index}>
            {DynamicItemField({ node: child, record, statusMap })}
          </React.Fragment>
        ))}
      </View>
    );
  }

  if (node.type === 'column') {
    return (
      <View className="flex-1" style={{ gap: Number(props.gap ?? 4) }}>
        {node.children?.map((child, index) => (
          <React.Fragment key={child.id || index}>
            {DynamicItemField({ node: child, record, statusMap })}
          </React.Fragment>
        ))}
      </View>
    );
  }

  if (node.type === 'text') {
    const role = props.role || 'subtitle';
    return (
      <Text
        numberOfLines={Number(props.maxLines || 1)}
        className={
          role === 'title'
            ? 'text-base font-semibold text-gray-900 dark:text-gray-100'
            : 'text-sm text-gray-500 dark:text-gray-400'
        }
      >
        {props.prefix || ''}
        {formatText(getValue(record, props.bind), props.emptyText || '-')}
        {props.suffix || ''}
      </Text>
    );
  }

  if (node.type === 'image') {
    const value = getValue(record, props.bind);
    const size = Number(props.size || 48);
    return value ? (
      <Image
        source={{ uri: `${Env.API_URL}/api/File/Img/${value}` }}
        style={{
          width: size,
          height: size,
          borderRadius: Number(props.radius || 8),
        }}
        resizeMode="cover"
      />
    ) : (
      <View
        className="items-center justify-center bg-gray-100 dark:bg-neutral-700"
        style={{
          width: size,
          height: size,
          borderRadius: Number(props.radius || 8),
        }}
      >
        <FontAwesome name="image" size={18} color="#9ca3af" />
      </View>
    );
  }

  if (node.type === 'statusTag') {
    const status = getStatus(getValue(record, props.bind), statusMap);
    const tone = toneColors[status.tone || 'neutral'];
    return (
      <View
        className="rounded-full border px-2 py-1"
        style={{ backgroundColor: tone.bg, borderColor: tone.border }}
      >
        <Text className="text-xs font-semibold" style={{ color: tone.text }}>
          {status.label}
        </Text>
      </View>
    );
  }

  if (node.type === 'metric') {
    return (
      <View className="flex-1 items-center">
        <Text className="text-base font-bold text-gray-900 dark:text-gray-100">
          {formatText(getValue(record, props.bind), props.emptyText || '-')}
          {props.suffix || ''}
        </Text>
        <Text className="mt-1 text-xs text-gray-400">{props.label}</Text>
      </View>
    );
  }

  if (node.type === 'iconText') {
    return (
      <View className="flex-row items-center">
        <FontAwesome
          name={(props.icon || 'info') as any}
          size={12}
          color="#9ca3af"
        />
        <Text
          numberOfLines={Number(props.maxLines || 1)}
          className="ml-1 flex-1 text-sm text-gray-500"
        >
          {formatText(getValue(record, props.bind), props.emptyText || '-')}
        </Text>
      </View>
    );
  }

  if (node.type === 'divider') {
    return <View className="my-3 h-px bg-gray-100 dark:bg-neutral-700" />;
  }

  if (node.type === 'spacer') {
    return <View style={{ height: Number(props.height || 8) }} />;
  }

  if (node.type === 'actionButton') {
    return (
      <TouchableOpacity onPress={() => executeAction(props.action, record)}>
        <Text className="text-sm font-semibold text-primary-500">
          {props.text || '操作'}
        </Text>
      </TouchableOpacity>
    );
  }

  return null;
};

const ListCard = ({
  node,
  record,
  statusMap,
  defaultMarginHorizontal,
}: {
  node?: MobileNode;
  record: Record<string, any>;
  statusMap?: Record<string, MobileStatusMapItem>;
  defaultMarginHorizontal?: number;
}) => {
  const props = node?.props || {};
  const itemLayout = (props.itemLayout || node?.children || []) as MobileNode[];
  const marginHorizontal = getListMarginHorizontal(
    props.marginHorizontal,
    defaultMarginHorizontal ?? 0
  );
  const marginBottom = toNumber(props.marginBottom, 12);
  const padding = toNumber(props.padding, 16);
  const cardRadius = toNumber(props.cardRadius, 16);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => executeAction(props.onPress, record)}
      className="bg-white dark:bg-neutral-800"
      style={{
        marginHorizontal,
        marginBottom,
        padding,
        borderRadius: cardRadius,
      }}
    >
      {itemLayout.length > 0 ? (
        itemLayout.map((child, index) => (
          <React.Fragment key={child.id || index}>
            {DynamicItemField({ node: child, record, statusMap })}
          </React.Fragment>
        ))
      ) : (
        <View>
          <Text className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {formatText(
              record.Title || record.Name || record.MachineName || record.ID
            )}
          </Text>
          <Text className="mt-1 text-sm text-gray-500">
            {formatText(record.Code || record.MachineNo || record.UpdateTime)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const DynamicListPageRenderer: React.FC<Props> = ({ config }) => {
  const [rows, setRows] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const debouncedKeyword = useDebouncedValue(keyword);

  const pageProps = config.props || {};
  const nodes = config.children || [];
  const searchNode = nodes.find((node) => node.type === 'searchBar');
  const tabsNode = nodes.find((node) => node.type === 'tabs');
  const statNode = nodes.find((node) => node.type === 'statRow');
  const listNode = nodes.find((node) => node.type === 'list');
  const emptyNode = nodes.find((node) => node.type === 'emptyState');
  const dataSource = pageProps.dataSource || {};
  const pagePaddingHorizontal = toNumber(pageProps.paddingHorizontal, 16);
  const pagePaddingTop = toNumber(pageProps.paddingTop, 0);
  const pagePaddingBottom = toNumber(pageProps.paddingBottom, 8);
  const pageBackgroundColor =
    typeof pageProps.backgroundColor === 'string' && pageProps.backgroundColor
      ? pageProps.backgroundColor
      : '#f9fafb';

  const filters = useMemo(() => {
    const next: Record<string, any> = {};
    const searchFields = parseCsv(searchNode?.props?.fields);
    if (debouncedKeyword && searchFields.length > 0) {
      next.keyword = debouncedKeyword;
      next.keywordFields = searchFields;
    }
    if (tabsNode?.props?.field && activeTab)
      next[tabsNode.props.field] = activeTab;
    return next;
  }, [
    activeTab,
    debouncedKeyword,
    searchNode?.props?.fields,
    tabsNode?.props?.field,
  ]);

  const loadData = useCallback(async () => {
    const params = { page: 1, limit: dataSource.pageSize || 10 };
    const apiUrl = normalizeApiUrl(dataSource.api);
    const moduleCode = dataSource.moduleCode;

    if (dataSource.type === 'api' && !apiUrl) {
      setRows([]);
      return;
    }

    if (dataSource.type === 'module' && !moduleCode) {
      setRows([]);
      return;
    }

    if (dataSource.type !== 'api' && dataSource.type !== 'module') {
      setRows([]);
      return;
    }

    setLoading(true);
    try {
      const res =
        dataSource.type === 'api'
          ? await http.getGridList(apiUrl, params, { filter: filters })
          : await queryByFilter(moduleCode!, params, filters);

      setRows(Array.isArray(res.data) ? res.data : []);
    } finally {
      setLoading(false);
    }
  }, [
    dataSource.api,
    dataSource.moduleCode,
    dataSource.pageSize,
    dataSource.type,
    filters,
  ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View className="flex-1" style={{ backgroundColor: pageBackgroundColor }}>
      <NavHeader title={pageProps.title || '列表'} />
      <RefreshListView
        className="flex-1"
        data={rows}
        estimatedItemSize={96}
        keyExtractor={(row, index) =>
          formatText(getValue(row, listNode?.props?.keyField), `row-${index}`)
        }
        renderItem={({ item }) => (
          <ListCard
            node={listNode}
            record={item}
            statusMap={pageProps.statusMap}
          />
        )}
        refreshing={loading}
        onRefresh={loadData}
        hasMore={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: pagePaddingHorizontal,
          paddingTop: pagePaddingTop,
          paddingBottom: pagePaddingBottom,
        }}
        ListHeaderComponent={
          <>
            {searchNode && (
              <SearchBar
                placeholder={searchNode.props?.placeholder}
                value={keyword}
                onChange={setKeyword}
              />
            )}
            {tabsNode && (
              <Tabs
                items={tabsNode.props?.items || []}
                value={activeTab}
                onChange={setActiveTab}
              />
            )}
            {statNode && (
              <StatRow items={statNode.props?.items || []} rows={rows} />
            )}
          </>
        }
        ListEmptyComponent={
          loading ? (
            <View className="items-center py-12">
              <ActivityIndicator />
            </View>
          ) : (
            <View className="items-center px-6 py-16">
              <FontAwesome name="inbox" size={32} color="#d1d5db" />
              <Text className="mt-3 text-sm text-gray-400">
                {emptyNode?.props?.text || '暂无数据'}
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};
