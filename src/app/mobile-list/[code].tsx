import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { getMobilePageConfig } from '@/api';
import { DynamicListPageRenderer } from '@/components/dynamic-page';
import { NavHeader, Text, View } from '@/components/ui';
import type {
  MobilePageConfig,
  MobilePageConfigRecord,
} from '@/types/mobile-config';

const parseConfig = (
  record?: MobilePageConfigRecord
): MobilePageConfig | null => {
  if (!record?.ConfigJson) return null;
  try {
    const parsed = JSON.parse(record.ConfigJson) as MobilePageConfig;
    if (parsed?.type !== 'page') return null;
    return parsed;
  } catch {
    return null;
  }
};

export default function MobileListPage() {
  const params = useLocalSearchParams<{ code: string; appScope?: string }>();
  const [config, setConfig] = useState<MobilePageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!params.code) {
        setErrorText('Page code is required');
        setLoading(false);
        return;
      }
      setLoading(true);
      setErrorText('');
      try {
        const res = await getMobilePageConfig(params.code, params.appScope);
        if (!res.Success) {
          setErrorText(res.Message || '页面配置不存在');
          return;
        }
        const parsed = parseConfig(res.Data);
        if (!parsed) {
          setErrorText('页面配置格式错误');
          return;
        }
        setConfig(parsed);
      } catch {
        setErrorText('页面配置加载失败');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.appScope, params.code]);

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
        <NavHeader title="加载中" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  if (errorText || !config) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
        <NavHeader title="移动端页面" />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-sm text-gray-500">{errorText}</Text>
        </View>
      </View>
    );
  }

  if (config.props?.pageType === 'form') {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-neutral-900">
        <NavHeader title={config.props.title || '表单'} />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-sm text-gray-500">
            当前版本暂未支持动态表单页
          </Text>
        </View>
      </View>
    );
  }

  return <DynamicListPageRenderer config={config} />;
}
