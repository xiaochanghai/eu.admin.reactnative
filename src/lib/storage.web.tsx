import { useCallback, useSyncExternalStore } from 'react';

type StorageValue = string | number | boolean | ArrayBuffer;

const serverValues = new Map<string, StorageValue>();
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function browserStorage() {
  return typeof window === 'undefined' ? null : window.localStorage;
}

function readString(key: string) {
  const local = browserStorage();
  if (local) return local.getItem(key) ?? undefined;
  const value = serverValues.get(key);
  return typeof value === 'string' ? value : undefined;
}

export const storage = {
  getString: readString,
  getBoolean(key: string) {
    const value = readString(key);
    return value === undefined ? undefined : value === 'true';
  },
  getNumber(key: string) {
    const value = readString(key);
    if (value === undefined) return undefined;
    const number = Number(value);
    return Number.isNaN(number) ? undefined : number;
  },
  set(key: string, value: StorageValue) {
    const local = browserStorage();
    if (local) {
      local.setItem(key, String(value));
    } else {
      serverValues.set(key, value);
    }
    emitChange();
  },
  remove(key: string) {
    const existed = this.contains(key);
    const local = browserStorage();
    if (local) local.removeItem(key);
    else serverValues.delete(key);
    emitChange();
    return existed;
  },
  clearAll() {
    const local = browserStorage();
    if (local) local.clear();
    else serverValues.clear();
    emitChange();
  },
  getAllKeys() {
    const local = browserStorage();
    return local ? Object.keys(local) : Array.from(serverValues.keys());
  },
  contains(key: string) {
    const local = browserStorage();
    return local ? local.getItem(key) !== null : serverValues.has(key);
  },
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', listener);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', listener);
    }
  };
}

function useStoredValue<T>(
  key: string,
  read: (storageKey: string) => T | undefined
) {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => undefined
  );
  const setValue = useCallback(
    (next: T | undefined | ((current: T | undefined) => T | undefined)) => {
      const resolved =
        typeof next === 'function'
          ? (next as (current: T | undefined) => T | undefined)(read(key))
          : next;
      if (resolved === undefined) storage.remove(key);
      else storage.set(key, resolved as StorageValue);
    },
    [key, read]
  );
  return [value, setValue] as const;
}

export function useMMKVString(key: string, _instance?: unknown) {
  return useStoredValue(key, readString);
}

export function useMMKVBoolean(key: string, _instance?: unknown) {
  return useStoredValue(key, storage.getBoolean);
}

export function useMMKVNumber(key: string, _instance?: unknown) {
  return useStoredValue(key, storage.getNumber);
}

export const useMMKV = () => storage;
export const useMMKVBuffer = () => [undefined, () => {}] as const;
export const useMMKVObject = () => [undefined, () => {}] as const;
export const useMMKVKeys = () => storage.getAllKeys();
export const useMMKVListener = () => undefined;

export function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  return value ? (JSON.parse(value) as T) : null;
}

export function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string): Promise<boolean> {
  return storage.remove(key);
}

export function clearAll(): void {
  storage.clearAll();
}

export function getAllKeys(): readonly string[] {
  return storage.getAllKeys();
}

export function contains(key: string): boolean {
  return storage.contains(key);
}

const messageKey = 'eucloud/chatId';

export function getChatId(chatId?: string): string {
  const value = chatId ?? storage.getString(messageKey) ?? crypto.randomUUID();
  storage.set(messageKey, value);
  return value;
}
