import { http } from "@/utils/http";
import { ConfigQuery, ConfigDTO } from "./type";
/**
 * ConfigUpdateCommand
 */
export interface UpdateConfigRequest {
  configValue: string;
}

/** 获取配置列表 */
export const getConfigListApi = (params?: ConfigQuery) => {
  return http.request<ResponseData<PageDTO<ConfigDTO>>>(
    "get",
    "/system/configs",
    {
      params
    }
  );
};

/** 获取配置信息 */
export const getConfigInfoApi = (configId: string) => {
  return http.request<ResponseData<ConfigDTO>>(
    "get",
    `/system/config/${configId}`
  );
};

/** 刷新配置缓存 */
export const updateConfigApi = (
  configId: number,
  data: UpdateConfigRequest
) => {
  return http.request<ResponseData<PageDTO<ConfigDTO>>>(
    "put",
    `/system/config/${configId}`,
    {
      data
    }
  );
};

/** 刷新配置缓存 */
export const refreshConfigCacheApi = () => {
  return http.request<ResponseData<void>>("delete", "/system/configs/cache");
};
