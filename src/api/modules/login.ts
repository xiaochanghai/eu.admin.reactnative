import http from '@/api/common/http';

/** 用户信息 */
export interface UserInfo {
  UserName: string;
  WeekName: string;
  UserId: string;
  UserType: string;
  AvatarFileId: string;
}

/** 登录请求参数 */
export interface ReqLogin {
  UserAccount: string;
  Password: string;
}

/** 登录响应结果 */
interface ResLogin {
  Token: string;
  UserId: string;
  UserInfo: UserInfo;
}

/** 用户登录 */
export const loginApi = (params: ReqLogin) =>
  http.post<ResLogin>('/api/Authorize/Login', params);

/** 获取当前用户信息 */
export const currentUserApi = () =>
  http.get<UserInfo>('/api/Authorize/CurrentUser');
