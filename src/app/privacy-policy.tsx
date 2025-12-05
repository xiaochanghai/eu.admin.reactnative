// src/app/privacy-policy.tsx
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import {
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';

export default function PrivacyPolicyScreen() {
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
          隐私政策
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
          优智云隐私政策
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          生效日期：2025年9月9日
        </Text>

        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          欢迎您使用由
          [苏州优智云有限公司]（以下简称&quot;我们&quot;或&quot;本公司&quot;）提供的
          优智云（以下简称&quot;本App&quot;）。本隐私政策旨在帮助您了解我们如何收集、使用、存储和共享您的个人信息，以及您享有的相关权利。请您在使用本App前，仔细阅读并充分理解本政策的全部内容。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          一、我们收集的信息
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          1.
          您主动提供的信息：当您注册账户、使用特定功能或服务时，我们可能收集您提供的个人信息，如姓名、电话号码、电子邮箱等。
          {'\n'}
          2.
          设备信息：我们可能会申请系统设备权限收集设备信息、日志信息，用于推送和安全风控。
          {'\n'}
          3. 存储权限：我们可能申请存储权限，用于保存和读取您上传的内容。{'\n'}
          4. 使用记录：我们会收集您使用本App的相关记录，如操作日志、访问时间等。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          二、信息的使用
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          我们可能将收集的信息用于以下目的：{'\n'}
          1. 提供、维护和改进我们的服务；{'\n'}
          2. 开发新的服务或功能；{'\n'}
          3. 了解用户如何访问和使用我们的服务，以优化用户体验；{'\n'}
          4. 进行身份验证、安全防护、反欺诈监测等；{'\n'}
          5. 向您推送通知、活动信息等。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          三、信息的共享
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          我们不会将您的个人信息提供给任何第三方，除非：{'\n'}
          1. 事先获得您的明确同意；{'\n'}
          2. 法律法规要求或政府机构依法提出要求；{'\n'}
          3. 为维护我们、您或其他用户的合法权益所必需。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          四、信息安全
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          我们会采取合理的技术措施保护您的个人信息安全，防止信息的丢失、被盗用、被篡改或泄露。但请理解，互联网环境并非百分之百安全，我们将尽最大努力确保您的信息安全，但无法保证绝对的安全。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          五、您的权利
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          您对个人信息享有以下权利：{'\n'}
          1. 访问权：您可以随时访问您的个人信息；{'\n'}
          2. 更正权：您可以要求更正不准确的个人信息；{'\n'}
          3. 删除权：在特定情况下，您可以要求删除您的个人信息；{'\n'}
          4. 撤回同意权：您可以随时撤回此前作出的同意；{'\n'}
          5. 注销权：您可以注销您的账户。
        </Text>

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          六、权限说明
        </Text>
        <Text className="mb-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
          本App可能需要以下权限：
        </Text>
        <View className="mb-4 ml-3">
          <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            • 存储权限：用于保存和读取您上传的内容；
          </Text>
          <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            • 相机权限：用于拍摄照片或视频；
          </Text>
          <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            • 麦克风权限：用于录制音频；
          </Text>
          <Text className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            • 相册权限：用于上传照片或视频。
          </Text>
        </View>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          麦克风、相册等权限均不会默认或强制开启收集信息。您有权拒绝开启，拒绝授权不会影响App提供基本服务。
        </Text>

        {/* <Text className="mb-1 text-base font-semibold text-gray-900">
          七、儿童隐私
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700">
          我们的服务不面向13岁以下的儿童。如果我们发现自己收集了13岁以下儿童的个人信息，我们会立即删除相关信息。如果您是父母或监护人，发现您的孩子向我们提供了个人信息，请联系我们，我们将采取措施删除相关信息。
        </Text> */}

        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          七、政策更新
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          我们可能会不时更新本隐私政策。当政策发生重大变更时，我们会在App内显著位置发布更新通知，并在必要时重新征求您的同意。
        </Text>

        {/* <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
          九、联系我们
        </Text>
        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          如您对本隐私政策有任何疑问，或需要行使您的权利，请通过以下方式联系我们：
          {'\n'}
          电子邮箱：[公司邮箱]{'\n'}
          地址：[公司地址]{'\n'}
          如果您对我们的回复不满意，您还可以向当地数据保护监管机构提出申诉。
        </Text> */}

        <Text className="mb-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
          感谢您对我们的支持与信任！我们将竭尽全力保护您的个人信息安全。
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
