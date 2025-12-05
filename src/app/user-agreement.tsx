// src/app/user-agreement.tsx
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import {
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';

export default function UserAgreementScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <Stack.Screen options={{ headerShown: false }} />

      {/* 顶部自定义头部 */}
      <View className="flex-row items-center border-b border-gray-200 px-4 py-3 dark:border-neutral-700">
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text className="text-blue-600 dark:text-blue-400">返回</Text>
        </Pressable>
        <Text className="flex-1 text-center text-base font-semibold text-gray-800 dark:text-gray-100">
          用户协议
        </Text>
        {/* 占位使标题居中 */}
        <View style={{ width: 40 }} />
      </View>

      {/* 正文 */}
      <ScrollView
        className="flex-1 px-4 py-3"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          优智云用户协议
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          生效日期：2025年9月9日
        </Text>

        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          欢迎您使用由
          [苏州优智云有限公司]（以下简称&quot;我们&quot;或&quot;本公司&quot;）提供的
          优智云（以下简称&quot;本App&quot;）。本协议是您与本公司之间就您使用本App及相关服务所达成的具有法律约束力的协议。请您在使用本App前，仔细阅读并充分理解本协议的全部内容，特别是其中涉及您权利义务的条款、免责条款、争议解决方式等。一旦您开始使用本App，即表示您已接受并同意遵守本协议的所有条款。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          一、协议范围
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          本协议适用于您通过移动设备（如智能手机、平板电脑）下载、安装、访问或使用本App的所有行为。
          {'\n'}
          本协议可能包含针对特定功能或服务的附加条款（如有），附加条款与本协议具有同等法律效力。如附加条款与本协议不一致，以附加条款为准。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          二、账户注册与使用
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          为使用本App的部分功能，您可能需要注册账户。您应提供真实、准确、完整的信息，并及时更新。
          {'\n'}
          您有责任妥善保管您的账户信息（如用户名、密码），因账户泄露或被盗造成的损失由您自行承担。
          {'\n'}
          您不得将账户转让、出借或共享给他人。我们有权对异常使用行为进行调查并采取限制措施。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          三、用户行为规范
        </Text>
        <Text className="mb-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
          您在使用本App时，承诺不进行以下行为：
        </Text>
        <View className="mb-4 ml-3">
          <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            • 违反国家法律法规或社会公序良俗；
          </Text>
          <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            • 侵犯他人知识产权、隐私权、名誉权等合法权益；
          </Text>
          <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            • 上传或传播含有病毒、木马、恶意代码的文件；
          </Text>
          <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            • 干扰、破坏本App的正常运行，或进行爬虫、刷量、作弊等行为；
          </Text>
          <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            •
            发布广告、垃圾信息、虚假信息或进行商业推广（除非获得我们书面许可）；
          </Text>
          <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            • 其他我们认定为不当或禁止的行为。
          </Text>
        </View>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          我们有权对违反本条款的行为采取警告、限制功能、封禁账户等措施。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          四、知识产权
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          本App的所有内容（包括但不限于软件代码、界面设计、文字、图片、图标、音视频等）的知识产权归本公司或其许可方所有。
          {'\n'}
          我们授予您一项有限的、非独占的、不可转让的、可撤销的许可，仅用于在您的设备上安装和使用本App。
          {'\n'}
          您在使用本App过程中生成的内容（如评论、上传的图片等），您保留其知识产权，但授权我们为提供和优化服务之目的在全球范围内使用、复制、修改、传播。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          五、隐私保护
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          我们高度重视您的个人信息保护。我们如何收集、使用、存储和保护您的个人信息，请详见我们的《隐私政策》（链接：[插入隐私政策链接]）。
          {'\n'}
          您使用本App即表示您同意我们按照《隐私政策》处理您的个人信息。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          六、服务变更与终止
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          我们有权根据运营需要，随时对本App的功能、内容、服务形式进行变更、暂停或终止，且不承担赔偿责任。
          {'\n'}
          如您严重违反本协议，我们有权立即终止或限制您对本App的访问和使用。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          七、免责声明
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          本App按&quot;现状&quot;和&quot;可用&quot;提供，我们不保证其功能完整、无错误、无中断或绝对安全。我们不对因使用或无法使用本App所导致的任何直接、间接、偶然、特殊损失承担责任（包括数据丢失、利润损失等）。用户通过本App获取的信息或建议，不构成专业意见，您应自行判断并承担风险。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          八、协议修改
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          我们有权随时修改本协议。修改后的协议将在App内公告或通过其他方式通知您。若您在通知后继续使用本App，即视为接受修改后的协议。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          九、法律适用与争议解决
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          本协议的订立、执行和解释均适用中华人民共和国法律。
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
