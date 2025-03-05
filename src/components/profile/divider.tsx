import { View } from '@/components/ui';

type DividerProps = {
  colorScheme?: 'light' | 'dark' | undefined;
};

export const Divider = ({ colorScheme }: DividerProps) => {
  return (
    <View
      className={
        colorScheme === 'dark' ? 'border-neutral-600' : 'bg-neutral-200'
      }
      style={{
        height: 1,
        marginLeft: 16,
      }}
    />
  );
};

export const BigDivider = ({ colorScheme }: DividerProps) => {
  return (
    <View
      style={{
        height: 10,
      }}
      className={
        colorScheme === 'dark' ? 'border-neutral-600' : 'bg-neutral-200'
      }
    ></View>
  );
};
