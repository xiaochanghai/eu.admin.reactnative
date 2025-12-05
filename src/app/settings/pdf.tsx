import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import {
  Alert,
  // Alert,
  Button,
  Dimensions,
  Linking,
  Text,
  StyleSheet
} from 'react-native';

// Remove the top-level import
// import Pdf from 'react-native-pdf';
import { NavHeader, SafeAreaView, View } from '@/components/ui';
import { isWeb } from '@/lib';

type Props = {
  defaultUrl?: string;
};

export default function PdfScreen({ defaultUrl }: Props) {
  const params = useLocalSearchParams<{ url?: string; title?: string }>();
  const pdfUrl =
    params?.url ??
    defaultUrl ??
    'https://work.porcelain.ink/oss/server/bucket1/data/1755854263541000_65959.PDF';
  const title = params?.title ?? 'PDF 预览';

  const [hasError, setHasError] = React.useState(false);
  const [PdfComponent, setPdfComponent] = React.useState<any>(null);

  // Dynamically import the PDF component only when not on web
  React.useEffect(() => {
    if (!isWeb) {
      import('react-native-pdf')
        .then((module) => {
          setPdfComponent(() => module.default);
        })
        .catch((error) => {
          console.error('Failed to load PDF component:', error);
          setHasError(true);
        });
    }
  }, []);

  const handlePdfError = (error: any) => {
    console.log('PDF Error:', error);
    setHasError(true);

    // 显示错误提示并提供备用方案
    Alert.alert('PDF 加载失败', '无法加载 PDF 文件，是否尝试在浏览器中打开？', [
      { text: '取消', style: 'cancel' },
      {
        text: '在浏览器中打开',
        onPress: () => {
          Linking.openURL(pdfUrl);
        },
      },
    ]);
  };

  const handlePdfLoadComplete = (numberOfPages: number) => {
    console.log(`Number of pages: ${numberOfPages}`);
    setHasError(false);
  };

  if (hasError) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <NavHeader title={title} />
        <View className="flex-1 items-center justify-center p-4">
          <Text className="mb-4 text-lg text-gray-600">PDF 加载失败</Text>
          <Button
            onPress={() => {
              setHasError(false);
              // 重新尝试加载
            }}
            title="重试"
          />
          <Button
            onPress={() => Linking.openURL(pdfUrl)}
            title="在浏览器中打开"
          />
        </View>
      </SafeAreaView>
    );
  }

  // Show loading state while PDF component is being imported
  if (!isWeb && !PdfComponent) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <NavHeader title={title} />
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-gray-600">正在加载 PDF 组件...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <NavHeader title={title} />
      <View style={styles.container}>
        {!isWeb && PdfComponent && (
          <PdfComponent
            source={{ uri: pdfUrl, cache: true }}
            onLoadComplete={handlePdfLoadComplete}
            onPageChanged={(page: number) => {
              console.log(`Current page: ${page}`);
            }}
            onError={handlePdfError}
            onPressLink={(uri: string) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
            enablePaging={true}
            enableRTL={false}
            enableAnnotationRendering={true}
            trustAllCerts={false}
          />
        )}
        {isWeb && (
          <View className="flex-1 items-center justify-center p-4">
            <Text className="mb-4 text-lg text-gray-600">
              PDF 预览在 Web 端暂不支持
            </Text>
            <Button
              onPress={() => Linking.openURL(pdfUrl)}
              title="在浏览器中打开"
            />
          </View>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
