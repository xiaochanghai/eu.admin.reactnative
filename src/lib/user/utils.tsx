import { type UserInfo } from '@/api/modules/login';
import { getItem, removeItem, setItem } from '@/lib/storage';

const USERINFO = 'userInfo';

export const clearUserInfoData = () => removeItem(USERINFO);
export const setUserInfoData = (value: UserInfo) =>
  setItem<UserInfo>('userInfo', value);
export const getUserInfoData = () => getItem<UserInfo>(USERINFO);
