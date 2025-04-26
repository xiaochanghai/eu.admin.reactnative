import { create } from 'zustand';

import { currentUserApi } from '@/api/modules/login';

import type { UserInfo } from '../../api/modules/login';
import { createSelectors } from '../utils';
import { clear as clearUserInfo, set as setUserInfoData } from './utils';

interface UserInfoState {
  userInfo: UserInfo | null;
  setInfo: (userInfo: UserInfo | null) => void;
  getInfo: () => void;
  clear: () => void;
}
const _userInfo = create<UserInfoState>((set, get) => ({
  userInfo: null,
  setInfo: async (userInfo: UserInfo | null) => {
    if (userInfo != null) {
      setUserInfoData(userInfo);
      set({ userInfo });
    } else {
      const { Data } = await currentUserApi();
      setUserInfoData(Data);
      set({ userInfo: Data });
    }
  },
  getInfo: () => {
    return get().userInfo;
  },
  clear: () => {
    clearUserInfo();
  },
}));

export const userInfo = createSelectors(_userInfo);
export const setUserInfo = (_userInfo: UserInfo | null) =>
  userInfo.getState().setInfo(_userInfo);
export const getUserInfo = () => userInfo.getState().getInfo();
export const clear = () => userInfo.getState().clear();
