import {
  getBrand,
  getBundleId,
  getDeviceId,
  getSystemName,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';

import http from '@/api/common/http';
import { type DeviceInfo, type VersionInfo } from '@/api/types';
import { isWeb } from '@/lib';

/** 查询最新版本信息 */
export const queryLatestVersion = () => {
  return http.get<VersionInfo>('/api/SmApplicationVersion/latest');
};

/** 记录设备信息 */
export const recordDevice = async (uniqueId: string) => {
  if (!uniqueId || isWeb) return;

  const param: DeviceInfo = {
    UUID: uniqueId,
    Platform: getSystemName(),
    Version: getSystemVersion(),
    Brand: getBrand(),
    Model: getDeviceId(),
    BundleId: getBundleId(),
    BundleVersion: getVersion(),
  };

  return http.post('/api/SmApplicationDevice/Record', param);
};
/**
 * 按过滤条件查询
 * @param moduleCode 模块代码
 * @param params 查询参数
 * @param filter 过滤条件
 * @returns 查询结果列表
 */
export const queryByFilter = (
  moduleCode: string,
  params: Record<string, any>,
  filter: any
) =>
  http.getGridList(`/api/Common/QueryByFilter/${moduleCode}`, params, {
    filter,
  });
