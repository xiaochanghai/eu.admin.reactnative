import { DarkTheme as _DarkTheme, DefaultTheme } from 'expo-router';

import { appColors, useAppColorScheme } from '@/lib/hooks';

type Theme = typeof DefaultTheme;
const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: appColors.dark.accent,
    background: appColors.dark.background,
    text: appColors.dark.text,
    border: appColors.dark.border,
    card: appColors.dark.card,
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: appColors.light.accent,
    background: appColors.light.background,
  },
};

export function useThemeConfig() {
  const { isDark } = useAppColorScheme();

  if (isDark) return DarkTheme;

  return LightTheme;
}
