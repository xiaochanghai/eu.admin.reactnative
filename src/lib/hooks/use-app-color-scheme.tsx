import { useColorScheme as useNativewindColorScheme } from 'nativewind';

import colors from '@/components/ui/colors';

export const appColors = {
  light: {
    ...colors,
    accent: colors.primary[600],
    background: colors.white,
    border: colors.neutral[200],
    card: colors.white,
    foreground: colors.charcoal[900],
    icon: colors.neutral[700],
    muted: colors.neutral[100],
    placeholder: colors.neutral[400],
    surface: colors.neutral[50],
    text: colors.charcoal[900],
    textSecondary: colors.neutral[600],
  },
  dark: {
    ...colors,
    accent: colors.primary[200],
    background: colors.charcoal[950],
    border: colors.charcoal[500],
    card: colors.charcoal[850],
    foreground: colors.charcoal[100],
    icon: colors.charcoal[300],
    muted: colors.charcoal[800],
    placeholder: colors.charcoal[400],
    surface: colors.charcoal[900],
    text: colors.charcoal[100],
    textSecondary: colors.charcoal[300],
  },
} as const;

export type AppColors = (typeof appColors)[keyof typeof appColors];

export type UseAppColorSchemeResult = {
  colorScheme: 'light' | 'dark';
  isDark: boolean;
  colors: AppColors;
};

export function useAppColorScheme(): UseAppColorSchemeResult {
  const { colorScheme: raw } = useNativewindColorScheme();
  const colorScheme: 'light' | 'dark' = raw === 'dark' ? 'dark' : 'light';
  const isDark = colorScheme === 'dark';
  return { colorScheme, isDark, colors: appColors[colorScheme] };
}
