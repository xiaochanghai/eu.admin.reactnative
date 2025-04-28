import { Platform } from 'react-native';
import {
  getBrand,
  getBundleId,
  getDeviceId,
  getSystemName,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';

import http from '@/api/common/http';
export type DeviceInfo = {
  UUID: string;
  Platform: string;
  Version: string;
  Brand: string;
  Model: string;
  BundleId: string;
  BundleVersion: string;
};

export const recordDevice = async (uniqueId: string) => {
  if (uniqueId !== '' && Platform.OS !== 'web') {
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
