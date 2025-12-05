import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

// import http from '@/api/common/http';
import { NavHeader, Text, View } from '@/components/ui';

type Props = {
  defaultUrl?: string;
};

export default function PdfScreen({ defaultUrl }: Props) {
  const params = useLocalSearchParams<{ fileId?: string; title?: string }>();
  const title = params?.title ?? 'PDF 预览';
  const [pdfUrl] = React.useState(defaultUrl ?? ''); // 抽屉是否打开

  // const queryToDoApi = (param: any) => {
  //   return http.post<any>(`/server/common/get_file_info`, param);
  // };

  React.useEffect(() => {
    // const fetchModuleInfo = async () => {
    //   const { success, presignedUrl } = await queryToDoApi({
    //     file_id: params?.fileId,
    //   });
    //   if (success && presignedUrl) setPdfUrl(presignedUrl);
    // };
    // fetchModuleInfo();
  }, []);

  // iOS có thể load PDF trực tiếp; Android thường ổn nhất qua Google Docs Viewer
  const viewerUrl = React.useMemo(() => {
    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(pdfUrl)}`;
  }, [pdfUrl]);
  // console.log('viewerUrl', viewerUrl);
  return (
    <>
      <NavHeader title={title} />
      <View className="flex-1">
        {pdfUrl ? (
          <WebView
            source={{ uri: viewerUrl }}
            startInLoadingState
            renderLoading={() => (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator />
                <Text className="mt-2 text-neutral-500">加载中...</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            androidLayerType="hardware"
            allowFileAccess
            allowUniversalAccessFromFileURLs
            originWhitelist={['*']}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
            <Text className="mt-2 text-neutral-500">加载中...</Text>
          </View>
        )}
      </View>
    </>
  );
}
