import { create } from 'zustand';

import type { UserInfo } from '@/api/modules/login';
import { currentUserApi } from '@/api/modules/login';

import { createSelectors } from '../utils';
import {
  clear as clearStorage,
  get as getStoredUserInfo,
  set as setStoredUserInfo,
} from './utils';

/**
 * 用户信息状态接口
 * 定义了用户信息存储和操作的相关方法
 */
interface UserInfoState {
  /** 用户信息对象 */
  userInfo: UserInfo | null;
  /** 加载状态 */
  isLoading: boolean;
  /** 错误信息 */
  error: string | null;

  /** 直接设置用户信息（登录成功后） */
  setUserInfo: (userInfo: UserInfo) => void;
  /** 从 API 获取最新用户信息 */
  fetchUserInfo: () => Promise<void>;
  /** 清除用户信息（登出） */
  clearUserInfo: () => void;
}

/**
 * 创建用户信息状态管理存储
 * 使用 Zustand 管理用户信息的状态
 */
const userInfoStore = create<UserInfoState>((set) => ({
  // 从本地存储初始化
  userInfo: getStoredUserInfo(),
  isLoading: false,
  error: null,

  /**
   * 直接设置用户信息
   * @param userInfo - 用户信息对象
   */
  setUserInfo: (userInfo: UserInfo) => {
    setStoredUserInfo(userInfo);
    set({ userInfo, error: null });
  },

  /**
   * 从 API 获取最新用户信息
   * @throws 如果获取失败会抛出错误
   */
  fetchUserInfo: async () => {
    set({ isLoading: true, error: null });
    try {
      const { Data } = await currentUserApi();
      if (Data) {
        setStoredUserInfo(Data);
        set({ userInfo: Data, isLoading: false });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '获取用户信息失败';
      set({ error: errorMessage, isLoading: false });
      throw error; // 向上抛出，让调用者处理
    }
  },

  /**
   * 清除用户信息
   * 从存储和状态中移除用户数据
   */
  clearUserInfo: () => {
    clearStorage();
    set({ userInfo: null, error: null });
  },
}));

// 创建带有选择器的用户信息存储
export const userInfo = createSelectors(userInfoStore);

/**
 * 直接设置用户信息的快捷方法
 * @param data - 用户信息对象
 */
export const setUserInfo = (data: UserInfo) =>
  userInfoStore.getState().setUserInfo(data);

/**
 * 从 API 获取用户信息的快捷方法
 * @returns Promise
 */
export const fetchUserInfo = () => userInfoStore.getState().fetchUserInfo();

/**
 * 获取当前用户信息的快捷方法
 * @returns 当前用户信息
 */
export const getUserInfo = () => userInfoStore.getState().userInfo;

/**
 * 清除用户信息的快捷方法
 */
export const clearUserInfo = () => userInfoStore.getState().clearUserInfo();
