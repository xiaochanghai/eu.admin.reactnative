import { createMMKV } from 'react-native-mmkv';
import type { MMKV } from 'react-native-mmkv';

import { generateUUID } from './utils';

// 重新导出 MMKV hooks，便于统一从 storage 模块导入
export {
  useMMKV,
  useMMKVBoolean,
  useMMKVBuffer,
  useMMKVNumber,
  useMMKVObject,
  useMMKVString,
  useMMKVListener,
  useMMKVKeys,
} from 'react-native-mmkv';

// 初始化 MMKV 实例
export const storage: MMKV = createMMKV({
  id: 'eucloud',
});

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
export function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value));
}

/**
 * 从存储中删除数据
 * @param key 存储键
 * @returns 是否删除成功
 */
export async function removeItem(key: string): Promise<boolean> {
  return storage.remove(key);
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
export function getAllKeys(): readonly string[] {
  return storage.getAllKeys();
}

/**
 * 检查某个键是否存在
 * @param key 存储键
 * @returns 是否存在
 */
export function contains(key: string): boolean {
  return storage.contains(key);
}

const keyPrefix = 'eucloud/';
const messageKey = keyPrefix + 'chatId';

/**
 * 获取或设置聊天ID
 * @param chatId1 可选的聊天ID，如果提供则更新存储
 * @returns 聊天ID
 */
export function getChatId(chatId1?: string): string {
  let chatId = storage.getString(messageKey);

  if (chatId1) {
    chatId = chatId1;
    storage.set(messageKey, chatId);
  }

  if (!chatId) {
    chatId = generateUUID();
    storage.set(messageKey, chatId);
  }

  return chatId;
} 