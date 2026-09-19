import {
  Button,
  Host,
  HStack,
  Image as SwiftUIImage,
  Menu,
  Section,
  Text as SwiftUIText,
  Toggle,
  VStack,
} from '@expo/ui/swift-ui';
import {
  controlSize,
  font,
  foregroundStyle,
} from '@expo/ui/swift-ui/modifiers';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { useChatWorkspace } from '../chat-context';

function HeaderTitleMenu() {
  const {
    models,
    selectedModel,
    selectModel,
    extendedThinking,
    setExtendedThinking,
  } = useChatWorkspace();
  const isDark = useColorScheme() === 'dark';
  const foreground = isDark ? '#fff' : '#000';
  const muted = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)';

  return (
    <Host style={{ minWidth: 120, minHeight: 40 }}>
      <Menu
        label={
          <VStack spacing={0}>
            <HStack spacing={4} alignment="center">
              <SwiftUIText
                modifiers={[
                  foregroundStyle(foreground),
                  font({ weight: 'semibold', size: 17 }),
                ]}
              >
                {selectedModel.label}
              </SwiftUIText>
              <SwiftUIImage
                systemName="chevron.down"
                size={10}
                color={foreground}
              />
            </HStack>
            {extendedThinking ? (
              <SwiftUIText
                modifiers={[foregroundStyle(muted), font({ size: 12 })]}
              >
                Extended
              </SwiftUIText>
            ) : null}
          </VStack>
        }
        modifiers={[controlSize('regular')]}
      >
        <Section title="Models">
          {models.map((model) => (
            <Button
              key={model.id}
              label={model.label}
              onPress={() => selectModel(model.id)}
            />
          ))}
        </Section>
        <Toggle isOn={extendedThinking} onIsOnChange={setExtendedThinking}>
          <SwiftUIText>Extended thinking</SwiftUIText>
          <SwiftUIText>Think longer for complex tasks</SwiftUIText>
        </Toggle>
      </Menu>
    </Host>
  );
}

export function MainHeader() {
  const { openDrawer } = useChatWorkspace();

  return (
    <>
      <Stack.Title asChild>
        <HeaderTitleMenu />
      </Stack.Title>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button icon="list.bullet" onPress={openDrawer} />
      </Stack.Toolbar>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button icon="eyeglasses" />
      </Stack.Toolbar>
    </>
  );
}
