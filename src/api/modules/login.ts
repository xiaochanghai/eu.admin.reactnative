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
  UserId: string;
  UserType: string;
  AvatarFileId: string;
};
export const loginApi = (params: ReqLogin) => {
  return http.post<ResLogin>(`api/Authorize/Login`, params);
};
export const currentUserApi = () => {
  return http.get<UserInfo>(`api/Authorize/CurrentUser`);
};
