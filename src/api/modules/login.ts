import http from '@/api/common/http';
// import { ReqLogin, ResLogin } from "@/api/interface/index";

interface ResLogin {
  Token: string;
  UserId: string;
  UserInfo: UserInfo;
}
export interface ReqLogin {
  UserAccount: string;
  Password: string;
}

export type UserInfo = {
  UserName: string;
  WeekName: string;
  AvatarFileId: string;
};
/**
 * @name AuthModule
 */
// User login
export const loginApi = (params: ReqLogin) => {
  return http.post<ResLogin>(`api/Authorize/Login`, params);
};
