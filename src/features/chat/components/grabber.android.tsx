import { Minus } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

import { Icon } from './icon';

export function AndroidGrabber() {
  return (
    <View className="items-center pb-1 pt-2">
      <Icon
        icon={Minus}
        strokeWidth={4}
        className="size-8 text-neutral-400 dark:text-neutral-600"
      />
    </View>
  );
}
