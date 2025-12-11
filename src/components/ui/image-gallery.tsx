import { Env } from '@env';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { View } from '@/components/ui';
import { FontAwesome } from '@/components/ui/icons';

export type ImageGalleryProps = {
  imageIds: string[];
};

const { width: screenWidth } = Dimensions.get('window');
// 屏幕宽度 - 外层padding(16*2) - 卡片padding(20*2) - 图片间距(12*2)
const imageSize = (screenWidth - 32 - 40 - 24) / 3;

export const ImageGallery: React.FC<ImageGalleryProps> = ({ imageIds }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openImage = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  if (!imageIds || imageIds.length === 0) {
    return null;
  }

  return (
    <>
      <View className="flex-row flex-wrap">
        {imageIds.map((imageId, index) => (
          <TouchableOpacity
            key={imageId}
            onPress={() => openImage(index)}
            activeOpacity={0.8}
            style={{
              marginRight: (index + 1) % 3 === 0 ? 0 : 12,
              marginBottom: 12,
            }}
          >
            <Image
              source={{ uri: `${Env.API_URL}/api/File/Img/${imageId}` }}
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: 8,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* 图片预览 Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/90">
          <TouchableOpacity
            className="absolute right-4 top-12 z-10 size-10 items-center justify-center rounded-full bg-white/20"
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome name="times" size={20} color="white" />
          </TouchableOpacity>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: selectedIndex * screenWidth, y: 0 }}
          >
            {imageIds.map((imageId) => (
              <View
                key={imageId}
                style={{ width: screenWidth }}
                className="items-center justify-center"
              >
                <Image
                  source={{ uri: `${Env.API_URL}/api/File/Img/${imageId}` }}
                  style={{
                    width: screenWidth - 32,
                    height: screenWidth - 32,
                    borderRadius: 12,
                  }}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>

          <View className="absolute bottom-12 flex-row">
            {imageIds.map((_, index) => (
              <View
                key={index}
                className={`mx-1 size-2 rounded-full ${
                  index === selectedIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};
