import {
  OperationLogsQuery,
  OperationLogDTO,
  LoginLogsDTO,
  LoginLogQuery
} from "./type";
import { http } from "@/utils/http";
/** 获取操作日志列表 */
export const getOperationLogListApi = (params?: OperationLogsQuery) => {
  return http.request<ResponseData<PageDTO<OperationLogDTO>>>(
    "get",
    "/logs/operationLogs",
    {
      params
    }
  );
};

export const exportOperationLogExcelApi = (
  params: OperationLogsQuery,
  fileName: string
) => {
  return http.download("/logs/operationLogs/excel", fileName, {
    params
  });
};

export const deleteOperationLogApi = (data: Array<number>) => {
  return http.request<ResponseData<void>>("delete", "/logs/operationLogs", {
    params: {
      // 需要将数组转换为字符串  否则Axios会将参数变成 noticeIds[0]:1  noticeIds[1]:2 这种格式，后端接收参数不成功
      operationIds: data.toString()
    }
  });
};

/** 获取登录日志列表 */
export const getLoginLogListApi = (params?: LoginLogQuery) => {
  return http.request<ResponseData<PageDTO<LoginLogsDTO>>>(
    "get",
    "/logs/loginLogs",
    {
      params
    }
  );
};

export const exportLoginLogExcelApi = (
  params: LoginLogQuery,
  fileName: string
) => {
  return http.download("/logs/loginLogs/excel", fileName, {
    params
  });
};

export const deleteLoginLogApi = (data: Array<number>) => {
  return http.request<ResponseData<void>>("delete", "/logs/loginLogs", {
    params: {
      // 需要将数组转换为字符串  否则Axios会将参数变成 noticeIds[0]:1  noticeIds[1]:2 这种格式，后端接收参数不成功
      ids: data.toString()
    }
  });
};
