import { type UserInfo } from '@/api/modules/login';
import { getItem, removeItem, setItem } from '@/lib/storage';

/**
 * 用户信息在存储中的键名
 * 用于统一管理用户信息的存储位置
 */
const USERINFO = 'userInfo';

/**
 * 清除存储中的用户信息
 * 用于用户登出或需要重置用户状态时
 */
export const clear = () => removeItem(USERINFO);

/**
 * 将用户信息保存到存储中
 * @param value - 需要保存的用户信息对象
 * @returns 存储操作的结果
 */
export const set = (value: UserInfo) => setItem<UserInfo>(USERINFO, value);

/**
 * 从存储中获取用户信息
 * @returns 存储的用户信息，如果不存在则返回null
 */
export const get = () => getItem<UserInfo>(USERINFO);
