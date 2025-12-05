import { Redirect } from 'expo-router';
import {
  get as getUserInfoData,
} from '@/lib/user/utils';

export default function Index() {
  const userInfo = getUserInfoData();
  // console.log('userInfo', userInfo?.UserType);
  if (userInfo?.UserType === 'Repair') return <Redirect href="/(repair)" />;
  return <Redirect href="/(app)" />;
}
