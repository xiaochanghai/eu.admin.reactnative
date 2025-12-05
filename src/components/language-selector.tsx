import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Text, View } from '@/components/ui';
import { FontAwesome, GroupEnum } from '@/components/ui/icons';

type LanguageOption = {
  code: string;
  name: string;
  nativeName: string;
};

const languageOptions: LanguageOption[] = [
  {
    code: 'zh',
    name: '中文/China',
    nativeName: '中文',
  },
  {
    code: 'en',
    name: '英文/English',
    nativeName: 'English',
  },
];

type LanguageSelectorProps = {
  currentLanguage?: string;
  onLanguageChange?: (languageCode: string) => void;
  className?: string;
};

export const LanguageSelector = ({
  currentLanguage = '中文',
  onLanguageChange,
  className = '',
}: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => setIsOpen(!isOpen);

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange?.(languageCode);
    setIsOpen(false);
  };

  const getCurrentLanguageDisplay = () => {
    const current = languageOptions.find(
      (lang) => lang.code === currentLanguage.toLowerCase()
    );
    return current?.nativeName || currentLanguage;
  };

  return (
    <View className="relative">
      <Pressable
        onPress={handlePress}
        className={`flex-row items-center bg-white px-3 py-2 ${className}`}
      >
        {/* Chinese character "文" in a rounded square */}
        <View className="mr-2 size-6 items-center justify-center rounded border border-gray-300 bg-gray-50">
          <Text className="text-xs text-gray-500">文</Text>
        </View>

        {/* Language text */}
        <Text className="mr-1 text-sm font-medium text-gray-500">
          {getCurrentLanguageDisplay()}
        </Text>

        <FontAwesome
          name={isOpen ? 'up' : 'down'}
          size={14}
          group={GroupEnum.AntDesign}
          className=" text-gray-500"
        />
      </Pressable>

      {/* Floating dropdown menu */}
      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          className="absolute right-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {languageOptions.map((language, index) => (
            <Pressable
              key={language.code}
              onPress={() => handleLanguageSelect(language.code)}
              className={`px-4 py-3 ${index === 0 ? 'rounded-t-lg' : ''} ${
                index === languageOptions.length - 1 ? 'rounded-b-lg' : ''
              } ${
                currentLanguage.toLowerCase() === language.code
                  ? 'bg-gray-100'
                  : 'bg-white'
              }`}
            >
              <Text className="text-base font-medium text-black">
                {language.name}
              </Text>
            </Pressable>
          ))}
        </Animated.View>
      )}

      {/* Backdrop to close dropdown when clicking outside */}
      {isOpen && (
        <Pressable
          onPress={() => setIsOpen(false)}
          className="absolute inset-0 z-40"
          style={{ top: -1000, left: -1000, right: -1000, bottom: -1000 }}
        />
      )}
    </View>
  );
};
