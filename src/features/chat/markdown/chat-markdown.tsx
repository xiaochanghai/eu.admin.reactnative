import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';

import { useAppColorScheme } from '@/lib/hooks';

import Markdown from './markdown';

function preserveNewlines(markdown: string) {
  return markdown.replace(/(```[\s\S]*?```)|(\n)/g, (match, codeBlock) =>
    codeBlock ? match : '  \n'
  );
}

export function ChatMarkdown({ children }: { children: string }) {
  const { isDark } = useAppColorScheme();
  const foreground = isDark ? '#f5f5f5' : '#171717';
  const mutedForeground = isDark ? '#a3a3a3' : '#737373';
  const border = isDark ? '#404040' : '#e5e5e5';
  const secondary = isDark ? '#262626' : '#f5f5f5';
  const muted = isDark ? '#1f1f1f' : '#fafafa';
  const accent = isDark ? '#303030' : '#f0f0f0';
  const link = isDark ? '#60a5fa' : '#2563eb';
  const isWeb = Platform.OS === 'web';
  const baseFontSize = isWeb ? 14 : 16;
  const baseLineHeight = isWeb ? 23 : 24;

  const markdownStyles = {
    heading1: { fontSize: 24, color: foreground },
    heading2: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: 'bold' as const,
      color: foreground,
    },
    heading3: { fontSize: 18, color: foreground },
    heading4: { fontSize: 16, color: foreground },
    heading5: { fontSize: 14, color: foreground },
    heading6: { fontSize: 12, color: foreground },
    paragraph: {
      fontSize: baseFontSize,
      lineHeight: baseLineHeight,
      marginVertical: 7,
    },
    text: {
      color: foreground,
      fontSize: baseFontSize,
      lineHeight: baseLineHeight,
    },
    thematicBreak: { backgroundColor: border },
    blockquote: {
      backgroundColor: muted,
      borderColor: border,
      paddingHorizontal: 10,
    },
    codeContainer: { backgroundColor: accent, padding: 12, borderRadius: 8 },
    codeText: {
      fontSize: isWeb ? 12 : 14,
      color: foreground,
      fontFamily: Platform.select({
        ios: 'ui-monospace',
        default: 'monospace',
      }),
    },
    inlineCode: {
      fontFamily: Platform.select({
        ios: 'ui-monospace',
        default: 'monospace',
      }),
      paddingHorizontal: 4,
      fontSize: isWeb ? 12 : 15,
      color: foreground,
      overflow: 'hidden' as const,
      borderRadius: 4,
      backgroundColor: accent,
    },
    link: { fontSize: baseFontSize, color: link },
    image: {
      height: 200,
      aspectRatio: 16 / 9,
      backgroundColor: accent,
      borderRadius: 8,
    },
    listBullet: {
      color: mutedForeground,
      fontVariant: ['tabular-nums' as const],
      marginRight: 8,
    },
    table: { borderColor: border, borderRadius: 8 },
    tableRow: { borderBottomColor: border },
    tableHeaderRow: { backgroundColor: secondary },
    tableCell: { padding: 10, borderRightColor: border },
    tableHeaderCell: { backgroundColor: secondary },
    tableCellText: { color: foreground },
    tableHeaderCellText: { color: foreground },
  };

  return (
    <Markdown
      styles={markdownStyles}
      onLinkPress={(url) => {
        if (Platform.OS === 'web') {
          Linking.openURL(url);
        } else {
          WebBrowser.openBrowserAsync(url, {
            presentationStyle: WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
      renderRules={{
        listItem: ({ node, styles, children: renderedChildren, extras }) => (
          <View key={node.key} style={styles.listItem as never}>
            {extras?.customListStyleType ? (
              extras.customListStyleType
            ) : (
              <Text
                style={[
                  styles.listBullet as never,
                  extras?.ordered
                    ? fullStyles.orderedBullet
                    : fullStyles.unorderedBullet,
                ]}
              >
                {extras?.listStyleType}
              </Text>
            )}
            <View style={styles.listItemContent as never}>
              {renderedChildren}
            </View>
          </View>
        ),
      }}
      markdown={preserveNewlines(children)}
    />
  );
}

const fullStyles = StyleSheet.create({
  orderedBullet: {
    fontFamily: Platform.select({ ios: 'ui-monospace', default: 'monospace' }),
    fontWeight: 'normal',
  },
  unorderedBullet: { fontSize: 18, fontWeight: '900' },
});
