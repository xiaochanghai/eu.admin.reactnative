import React from 'react';
import {
  type GestureResponderEvent,
  Image,
  type ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface HeaderRightButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  imageSource: ImageSourcePropType;
}

export const CustomHeaderRightButton: React.FC<HeaderRightButtonProps> =
  React.memo(({ onPress, imageSource }) => (
    <TouchableOpacity onPress={onPress} style={styles.touchStyle}>
      <Image source={imageSource} style={styles.editImage} />
    </TouchableOpacity>
  ));

const styles = StyleSheet.create({
  touchStyle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  editImage: {
    width: 22,
    height: 22,
  },
});
