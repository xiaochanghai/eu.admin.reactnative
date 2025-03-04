import type {
  GetNextPageParamFunction,
  GetPreviousPageParamFunction,
} from '@tanstack/react-query';

import { message } from '@/utils';

import type { PaginateQuery } from '../types';

type KeyParams = {
  [key: string]: any;
};
export const DEFAULT_LIMIT = 10;

export function getQueryKey<T extends KeyParams>(key: string, params?: T) {
  return [key, ...(params ? [params] : [])];
}

// for infinite query pages  to flatList data
export function normalizePages<T>(pages?: PaginateQuery<T>[]): T[] {
  return pages
    ? pages.reduce((prev: T[], current) => [...prev, ...current.results], [])
    : [];
}

// a function that accept a url and return params as an object
export function getUrlParameters(
  url: string | null
): { [k: string]: string } | null {
  if (url === null) {
    return null;
  }
  let regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while ((match = regex.exec(url))) {
    if (match[1] !== null) {
      //@ts-ignore
      params[match[1]] = match[2];
    }
  }
  return params;
}

export const getPreviousPageParam: GetNextPageParamFunction<
  unknown,
  PaginateQuery<unknown>
> = (page) => getUrlParameters(page.previous)?.offset ?? null;

export const getNextPageParam: GetPreviousPageParamFunction<
  unknown,
  PaginateQuery<unknown>
> = (page) => getUrlParameters(page.next)?.offset ?? null;

/**
 * @description: Verify network request status code
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number) => {
  switch (status) {
    case 400:
      message.error('请求失败！请您稍后重试');
      break;
    case 401:
      message.error('登录失效！请您重新登录');
      break;
    case 403:
      message.error('当前账号无权限访问！');
      break;
    case 404:
      message.error('你所访问的资源不存在！');
      break;
    case 405:
      message.error('请求方式错误！请您稍后重试');
      break;
    case 408:
      message.error('请求超时！请您稍后重试');
      break;
    case 500:
      message.error('服务异常！');
      break;
    case 502:
      message.error('网关错误！');
      break;
    case 503:
      message.error('服务不可用！');
      break;
    case 504:
      message.error('网关超时！');
      break;
    default:
      message.error('请求失败！');
  }
};
