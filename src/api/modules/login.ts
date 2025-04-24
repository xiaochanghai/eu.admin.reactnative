import http from '@/api/common/http';
// import { ReqLogin, ResLogin } from "@/api/interface/index";

interface ResLogin {
  Token: string;
  UserId: string;
}
export interface ReqLogin {
  UserAccount: string;
  Password: string;
}
/**
 * @name AuthModule
 */
// User login
export const loginApi = (params: ReqLogin) => {
  return http.post<ResLogin>(`api/Authorize/Login`, params);
};
