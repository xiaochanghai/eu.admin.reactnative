import { create } from 'zustand';

import { currentUserApi } from '@/api/modules/login';

import type { UserInfo } from '../../api/modules/login';
import { createSelectors } from '../utils';
import { clear as clearUserInfo, set as setUserInfoData } from './utils';

/**
 * 用户信息状态接口
 * 定义了用户信息存储和操作的相关方法
 */
interface UserInfoState {
  /** 用户信息对象 */
  userInfo: UserInfo | null;
  /** 设置用户信息 */
  setInfo: (userInfo: UserInfo | null) => void;
  /** 获取用户信息 */
  getInfo: () => UserInfo | null;
  /** 清除用户信息 */
  clear: () => void;
}

/**
 * 创建用户信息状态管理存储
 * 使用 Zustand 管理用户信息的状态
 */
const _userInfo = create<UserInfoState>((set, get) => ({
  // 初始状态为空
  userInfo: null,

  /**
   * 设置用户信息
   * @param userInfo - 用户信息对象或null
   * 如果传入用户信息，直接设置；如果为null，则从API获取
   */
  setInfo: async (userInfo: UserInfo | null) => {
    try {
      if (userInfo != null) {
        // 如果提供了用户信息，直接保存
        setUserInfoData(userInfo);
        set({ userInfo });
      } else {
        // 如果没有提供用户信息，从API获取
        const { Data } = await currentUserApi();
        if (Data) {
          setUserInfoData(Data);
          set({ userInfo: Data });
        }
      }
    } catch (error) {
      console.error('设置用户信息失败:', error);
      // 可以在这里添加错误处理逻辑
    }
  },

  /**
   * 获取当前用户信息
   * @returns 当前存储的用户信息
   */
  getInfo: () => {
    return get().userInfo;
  },

  /**
   * 清除用户信息
   * 从存储中移除用户数据
   */
  clear: () => {
    clearUserInfo();
    set({ userInfo: null }); // 同时清除状态
  },
}));

// 创建带有选择器的用户信息存储
export const userInfo = createSelectors(_userInfo);

/**
 * 设置用户信息的快捷方法
 * @param _userInfo - 用户信息对象或null
 */
export const setUserInfo = (_userInfo: UserInfo | null) =>
  userInfo.getState().setInfo(_userInfo);

/**
 * 获取用户信息的快捷方法
 * @returns 当前用户信息
 */
export const getUserInfo = () => userInfo.getState().getInfo();

/**
 * 清除用户信息的快捷方法
 */
export const clear = () => userInfo.getState().clear();
