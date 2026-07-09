import http from '@/api/common/http';
import type { MobilePageConfigRecord } from '@/types/mobile-config';

export const getMobilePageConfig = (pageCode: string, appScope?: string) => {
  return http.get<MobilePageConfigRecord>(
    `/api/SmMobilePageConfig/Page/${encodeURIComponent(pageCode)}`,
    appScope ? { appScope } : undefined
  );
};
