import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from 'expo-glass-effect';
import { useTheme } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/tabs';
import React from 'react';
import type * as ReactNative from 'react-native';
import { AccessibilityInfo, Text } from 'react-native';

import { CustomTabBar } from './custom-tab-bar';
import { TabBarSurface } from './tab-bar-surface.ios';

jest.mock('@/components/ui', () => ({
  Text: jest.requireActual<typeof ReactNative>('react-native').Text,
}));
jest.mock('expo-router', () => ({ useTheme: jest.fn() }));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 34, left: 24, right: 0 }),
}));
jest.mock('expo-glass-effect', () => ({
  GlassView: ({ children, ...props }: React.PropsWithChildren<object>) => {
    const { View } = jest.requireActual<typeof ReactNative>('react-native');
    return (
      <View {...props} testID="glass">
        {children}
      </View>
    );
  },
  isGlassEffectAPIAvailable: jest.fn(),
  isLiquidGlassAvailable: jest.fn(),
}));
jest.mock('expo-blur', () => ({
  BlurView: ({ children, ...props }: React.PropsWithChildren<object>) => {
    const { View } = jest.requireActual<typeof ReactNative>('react-native');
    return (
      <View {...props} testID="blur">
        {children}
      </View>
    );
  },
}));

beforeEach(() => {
  jest.mocked(useTheme).mockReturnValue({
    dark: true,
    colors: { primary: '#FFDEA8', card: '#171717' },
  } as ReturnType<typeof useTheme>);
  jest.mocked(isGlassEffectAPIAvailable).mockReturnValue(true);
  jest.mocked(isLiquidGlassAvailable).mockReturnValue(true);
  jest
    .spyOn(AccessibilityInfo, 'isReduceTransparencyEnabled')
    .mockResolvedValue(false);
});
afterEach(() => {
  jest.restoreAllMocks();
});

describe('iOS tab surface', () => {
  it('uses interactive native glass with the application theme', async () => {
    render(
      <TabBarSurface>
        <Text>Tabs</Text>
      </TabBarSurface>
    );
    const glass = await screen.findByTestId('glass');
    expect(glass.props).toMatchObject({
      colorScheme: 'dark',
      isInteractive: true,
    });
    expect(screen.getByText('Tabs')).toBeOnTheScreen();
  });

  it.each(['runtime', 'build'])(
    'falls back to blur when %s support is absent',
    async (support) => {
      jest
        .mocked(
          support === 'runtime'
            ? isGlassEffectAPIAvailable
            : isLiquidGlassAvailable
        )
        .mockReturnValue(false);
      render(
        <TabBarSurface>
          <Text>Tabs</Text>
        </TabBarSurface>
      );
      expect(await screen.findByTestId('blur')).toBeOnTheScreen();
      expect(screen.queryByTestId('glass')).toBeNull();
    }
  );

  it('keeps controls visible on an opaque surface when transparency is reduced', async () => {
    jest
      .mocked(AccessibilityInfo.isReduceTransparencyEnabled)
      .mockResolvedValue(true);
    render(
      <TabBarSurface>
        <Text>Tabs</Text>
      </TabBarSurface>
    );
    await screen.findByText('Tabs');
    expect(screen.getByText('Tabs')).toBeOnTheScreen();
    expect(screen.queryByTestId('glass')).toBeNull();
    expect(screen.queryByTestId('blur')).toBeNull();
  });

  it('responds to accessibility changes and removes its listener on unmount', async () => {
    let listener: (enabled: boolean) => void = () => {};
    const remove = jest.fn();
    jest
      .spyOn(AccessibilityInfo, 'addEventListener')
      .mockImplementation((_event, handler) => {
        listener = handler as unknown as (enabled: boolean) => void;
        return { remove } as unknown as ReturnType<
          typeof AccessibilityInfo.addEventListener
        >;
      });
    const { unmount } = render(
      <TabBarSurface>
        <Text>Tabs</Text>
      </TabBarSurface>
    );
    await screen.findByTestId('glass');
    act(() => listener(true));
    await waitFor(() => expect(screen.queryByTestId('glass')).toBeNull());
    expect(screen.queryByTestId('blur')).toBeNull();
    unmount();
    expect(remove).toHaveBeenCalledTimes(1);
  });
});

function tabProps(prevented = false) {
  return {
    state: {
      index: 0,
      routes: [
        { key: 'home-key', name: 'index' },
        { key: 'equipment-key', name: 'equipment', params: { filter: 'all' } },
      ],
    },
    descriptors: {
      'home-key': { options: { title: 'Home' } },
      'equipment-key': { options: { title: 'Equipment' } },
    },
    navigation: {
      emit: jest.fn(() => ({ defaultPrevented: prevented })),
      navigate: jest.fn(),
    },
  };
}

describe('custom tab navigation', () => {
  it('emits the route key and preserves parameters when changing tabs', async () => {
    const props = tabProps();
    render(<CustomTabBar {...(props as unknown as BottomTabBarProps)} />);
    await screen.findByTestId('glass');
    fireEvent.press(screen.getByRole('tab', { name: 'Equipment' }));
    expect(props.navigation.emit).toHaveBeenCalledWith({
      type: 'tabPress',
      target: 'equipment-key',
      canPreventDefault: true,
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith('equipment', {
      filter: 'all',
    });
    fireEvent(screen.getByRole('tab', { name: 'Equipment' }), 'longPress');
    expect(props.navigation.emit).toHaveBeenLastCalledWith({
      type: 'tabLongPress',
      target: 'equipment-key',
    });
  });

  it('does not navigate when the press is prevented or the tab is already focused', async () => {
    const props = tabProps(true);
    render(<CustomTabBar {...(props as unknown as BottomTabBarProps)} />);
    await screen.findByTestId('glass');
    fireEvent.press(screen.getByRole('tab', { name: 'Equipment' }));
    props.navigation.emit.mockReturnValue({ defaultPrevented: false });
    fireEvent.press(screen.getByRole('tab', { name: 'Home' }));
    expect(props.navigation.navigate).not.toHaveBeenCalled();
  });
});
