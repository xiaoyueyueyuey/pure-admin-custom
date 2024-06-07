import { http } from "@/utils/http";
import { OnlineUserQuery, OnlineUserInfo, ServerInfo } from "./type";
/** 获取操作日志列表 */
export const getOnlineUserListApi = (params?: OnlineUserQuery) => {
  return http.request<ResponseData<PageDTO<OnlineUserInfo>>>(
    "get",
    "/monitor/onlineUsers",
    {
      params
    }
  );
};

/** 强制登出用户 */
export const logoutOnlineUserApi = (tokenId: string) => {
  return http.request<ResponseData<void>>(
    "delete",
    `/monitor/onlineUser/${tokenId}`
  );
};
/** 获取服务器信息 */
export const getServerInfoApi = () => {
  return http.request<ResponseData<ServerInfo>>("get", "/monitor/serverInfo");
};

/** 获取Redis信息 */
export const getCacheInfoApi = () => {
  return http.request<ResponseData<ServerInfo>>("get", "/monitor/cacheInfo");
};
