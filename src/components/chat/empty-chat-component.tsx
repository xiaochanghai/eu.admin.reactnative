// import { type DrawerNavigationProp } from '@react-navigation/drawer';
// import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ChatMode } from '@/types';
// import { type RouteParamList } from '@/types';
import { getImageModel, getTextModel } from '@/utils/storage-utils';

import { useAppContext } from '../history/app-provider';
import ImageSpinner from './image-spinner';

const isAndroid = Platform.OS === 'android';
// type NavigationProp = DrawerNavigationProp<RouteParamList>;

interface EmptyChatComponentProps {
  chatMode: ChatMode;
  isLoadingMessages?: boolean;
}

export const EmptyChatComponent = ({
  chatMode,
  isLoadingMessages = false,
}: EmptyChatComponentProps): React.ReactElement => {
  // const navigation = useNavigation<NavigationProp>();
  const { event } = useAppContext();
  const [currentTextModel, setCurrentTextModel] = useState(getTextModel());

  // Listen for model change events
  useEffect(() => {
    if (event?.event === 'modelChanged') {
      setCurrentTextModel(getTextModel());
    }
  }, [event]);

  const modelName =
    chatMode === ChatMode.Text
      ? currentTextModel.modelName
      : getImageModel().modelName;

  return (
    <View style={styles.emptyChatContainer}>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('Settings', {});
        }}
      >
        {isLoadingMessages ? (
          <ImageSpinner
            visible={true}
            size={24}
            isRotate={true}
            source={require('../../../assets/loading.png')}
          />
        ) : (
          <Text style={styles.greetingText}>Hi, I'm {modelName}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyChatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
    transform: [{ scaleY: -1 }, { scaleX: isAndroid ? -1 : 1 }],
  },
});
