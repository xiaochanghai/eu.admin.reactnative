import { type UserInfo } from '@/api/modules/login';
import { getItem, removeItem, setItem } from '@/lib/storage';

const USERINFO = 'userInfo';

export const clear = () => removeItem(USERINFO);
export const set = (value: UserInfo) => setItem<UserInfo>('userInfo', value);
export const get = () => getItem<UserInfo>(USERINFO);
