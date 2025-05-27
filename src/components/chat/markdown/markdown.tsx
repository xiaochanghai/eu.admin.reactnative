import React, {
  memo,
  type ReactElement,
  type ReactNode,
  useCallback,
} from 'react';
import { FlatList, useColorScheme } from 'react-native';
import { type MarkdownProps } from 'react-native-marked';

import { type ChatStatus } from '@/types';

import useMarkdown from './use-markdown';

type ChatMarkdownProps = MarkdownProps & {
  chatStatus: ChatStatus;
};

const Markdown = ({
  value,
  flatListProps,
  theme,
  baseUrl,
  renderer,
  styles,
  tokenizer,
  chatStatus,
}: ChatMarkdownProps) => {
  const colorScheme = useColorScheme();

  const rnElements = useMarkdown(value, {
    theme,
    baseUrl,
    renderer,
    colorScheme,
    styles,
    tokenizer,
    chatStatus,
  });

  const renderItem = useCallback(({ item }: { item: ReactNode }) => {
    return item as ReactElement;
  }, []);

  const keyExtractor = useCallback(
    (_: ReactNode, index: number) => index.toString(),
    []
  );

  return (
    <FlatList
      removeClippedSubviews={false}
      keyExtractor={keyExtractor}
      initialNumToRender={rnElements.length}
      style={{
        backgroundColor: colorScheme === 'light' ? '#ffffff' : '#000000',
      }}
      {...flatListProps}
      data={rnElements}
      renderItem={renderItem}
    />
  );
};

export default memo(Markdown);
