export type StreamingStore = {
  get: () => string;
  set: (value: string) => void;
  subscribe: (listener: () => void) => () => void;
};

export function createStreamingStore(): StreamingStore {
  let value = '';
  const listeners = new Set<() => void>();

  return {
    get: () => value,
    set: (nextValue) => {
      if (nextValue === value) return;
      value = nextValue;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
