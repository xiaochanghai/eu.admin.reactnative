import React, { useSyncExternalStore } from 'react';
import { Text, View } from 'react-native';

import { ChatMarkdown } from '../markdown';
import type { StreamingStore } from './streaming-store';

export function StreamingMessage({ store }: { store: StreamingStore }) {
  const content = useSyncExternalStore(store.subscribe, store.get, store.get);

  return (
    <View>
      {content ? <ChatMarkdown>{content}</ChatMarkdown> : null}
      <Text className="text-[15px] leading-6 text-neutral-400">▌</Text>
    </View>
  );
}
