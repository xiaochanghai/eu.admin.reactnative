import { useColorScheme as useNativewindColorScheme } from 'nativewind';

export type UseAppColorSchemeResult = {
  colorScheme: 'light' | 'dark';
  isDark: boolean;
};

export function useAppColorScheme(): UseAppColorSchemeResult {
  const { colorScheme: raw } = useNativewindColorScheme();
  const colorScheme: 'light' | 'dark' = raw === 'dark' ? 'dark' : 'light';
  const isDark = colorScheme === 'dark';
  return { colorScheme, isDark };
}
