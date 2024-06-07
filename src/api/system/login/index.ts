import {
  ConfigDTO,
  CaptchaDTO,
  TokenDTO,
  LoginByPasswordDTO,
  Result
} from "./type";
import { http } from "@/utils/http";

/** 获取系统配置接口 */
export const getConfig = () => {
  return http.request<ResponseData<ConfigDTO>>("get", "/getConfig");
};

/** 验证码接口 */
export const getCaptchaCode = () => {
  return http.request<ResponseData<CaptchaDTO>>("get", "/captchaImage");
};

/** 登录接口 */
export const loginByPassword = (data: LoginByPasswordDTO) => {
  console.log("登录url:/login");
  return http.request<ResponseData<TokenDTO>>("post", "/login", { data });
};

/** 获取当前登录用户接口 */
export const getLoginUserInfo = () => {
  return http.request<ResponseData<TokenDTO>>("get", "/getLoginUserInfo");
};

/** 获取动态菜单 */
export const getAsyncRoutes = () => {
  return http.request<Result>("get", "/getRouters");
};
