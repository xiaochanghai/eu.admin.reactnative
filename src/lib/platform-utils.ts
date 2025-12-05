import { Env } from '@env';
import { NativeModules, Platform } from 'react-native';

const { PlatformModule } = NativeModules;

export const isMacCatalyst =
  Platform.OS === 'ios' && PlatformModule?.isMacCatalyst === true;

export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';
export const isWeb = Platform.OS === 'web';

export function PlatformOS(): string {
  return Platform.OS;
}

export function IsDevelopment(): boolean {
  return Env.APP_ENV !== 'production';
}
