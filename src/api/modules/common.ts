import http from '@/api/common/http';
import { isWeb } from '@/lib';
import { DeviceInfo, VersionInfo } from '../types';
import { getSystemName, getSystemVersion, getBrand, getDeviceId, getBundleId, getVersion } from 'react-native-device-info';

export const queryLatestVersion = () => {
  return http.get<VersionInfo>(
    `/api/SmApplicationVersion/latest`
  );
};
export const recordDevice = async (uniqueId: string) => {
  if (uniqueId !== '' && !isWeb) {
    let param: DeviceInfo = {
      UUID: uniqueId,
      Platform: getSystemName(),
      Version: getSystemVersion(),
      Brand: getBrand(),
      Model: getDeviceId(),
      BundleId: getBundleId(),
      BundleVersion: getVersion(),
    };
    await http.post(`api/SmApplicationDevice/Record`, param);
  }
};