import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatMode, type FileInfo, type SystemPrompt } from '@/types';
import { isAndroid } from '@/utils/platform-utils';

import {
  CustomFileListComponent,
  DisplayMode,
} from './custom-file-list-component';
import { ModelIconButton } from './model-icon-button';
import { ModelSelectionModal } from './model-selection-modal';
import { PromptListComponent } from './prompt-list-component';

interface CustomComposerProps {
  files: FileInfo[];
  onFileUpdated: (files: FileInfo[], isUpdate?: boolean) => void;
  onSystemPromptUpdated: (prompt: SystemPrompt | null) => void;
  chatMode: ChatMode;
  isShowSystemPrompt: boolean;
}

export const CustomChatFooter: React.FC<CustomComposerProps> = ({
  files,
  onFileUpdated,
  onSystemPromptUpdated,
  chatMode,
  isShowSystemPrompt,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const modelIconRef = useRef<View>(null);
  const iconPositionRef = useRef({ x: 0, y: 0 });
  const insets = useSafeAreaInsets();
  const statusBarHeight = useRef(insets.top);

  const handleOpenModal = () => {
    if (iconPositionRef.current.y === 0) {
      // eslint-disable-next-line max-params
      modelIconRef.current?.measure((x, y, width, height, pageX, pageY) => {
        iconPositionRef.current = {
          x: pageX,
          y: pageY + 10 + (isAndroid ? statusBarHeight.current : 0),
        };
        setIconPosition(iconPositionRef.current);
        setModalVisible(true);
      });
    } else {
      setModalVisible(true);
    }
  };
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => {
      // eslint-disable-next-line max-params
      modelIconRef.current?.measure((x, y, width, height, pageX, pageY) => {
        if (iconPositionRef.current.y === 0) {
          iconPositionRef.current = {
            x: pageX,
            y: pageY + 10 + (isAndroid ? statusBarHeight.current : 0),
          };
          setIconPosition(iconPositionRef.current);
        }
      });
    });
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (files.length > 0 || (isShowSystemPrompt && chatMode === ChatMode.Text)) {
    return (
      <>
        <View
          style={{
            ...styles.container,
            ...(isShowSystemPrompt &&
              files.length === 0 && {
                height: 60,
              }),
          }}
        >
          {files.length === 0 &&
            isShowSystemPrompt &&
            chatMode === ChatMode.Text && (
              <View style={styles.promptContainer}>
                <PromptListComponent
                  onSelectPrompt={(prompt) => {
                    onSystemPromptUpdated(prompt);
                  }}
                />
                <View ref={modelIconRef} collapsable={false}>
                  <ModelIconButton onPress={handleOpenModal} />
                </View>
              </View>
            )}
          {files.length > 0 && (
            <CustomFileListComponent
              files={files}
              onFileUpdated={onFileUpdated}
              mode={
                chatMode === ChatMode.Image
                  ? DisplayMode.GenImage
                  : DisplayMode.Edit
              }
            />
          )}
        </View>
        <ModelSelectionModal
          visible={modalVisible}
          onClose={handleCloseModal}
          iconPosition={iconPosition}
        />
      </>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    height: 90,
  },
  promptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
