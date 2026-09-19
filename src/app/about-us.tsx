// src/app/about-us.tsx

import { NavHeader, SafeAreaView } from '@/components/ui';
import AboutUs from '@/components/about-us';
export default function AboutUsScreen() {

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <NavHeader title="关于我们" />

      {/* 正文 */}
      <AboutUs />
    </SafeAreaView>
  );
}
