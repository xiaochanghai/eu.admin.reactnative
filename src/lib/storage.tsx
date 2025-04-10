import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

/**
 * 从存储中获取数据
 * @param key 存储键
 * @returns 解析后的数据或null
 */
export function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
}

/**
 * 将数据保存到存储中
 * @param key 存储键
 * @param value 要存储的数据
 */
export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

/**
 * 从存储中删除数据
 * @param key 存储键
 */
export async function removeItem(key: string) {
  storage.delete(key);
}

/**
 * 清除所有存储的数据
 */
export function clearAll(): void {
  storage.clearAll();
}

/**
 * 获取所有存储的键
 * @returns 所有键的数组
 */
export function getAllKeys(): string[] {
  return storage.getAllKeys();
}
