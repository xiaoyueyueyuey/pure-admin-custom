import {
  UserQuery,
  UserDTO,
  UserRequest,
  PasswordRequest,
  UserProfileRequest,
  ResetPasswordRequest
} from "./type";
import { http } from "@/utils/http";
/** 获取用户列表 */
export const getUserListApi = (params?: UserQuery) => {
  return http.request<ResponseData<PageDTO<UserDTO>>>("get", "/system/users", {
    params
  });
};

/** 新增用户 */
export const addUserApi = (data?: UserRequest) => {
  return http.request<ResponseData<void>>("post", "/system/users", {
    data
  });
};

/** 编辑用户 */
export const updateUserApi = (userId: number, data?: UserRequest) => {
  return http.request<ResponseData<void>>("put", `/system/users/${userId}`, {
    data
  });
};

/** 更改用户密码 */
export const updateUserPasswordApi = (data?: PasswordRequest) => {
  return http.request<ResponseData<void>>(
    "put",
    `/system/users/${data.userId}/password`,
    {
      data
    }
  );
};

/** 删除用户 */
export const deleteUserApi = (userId: number) => {
  return http.request<ResponseData<void>>("delete", `/system/users/${userId}`);
};

/** 修改用户状态 */
export const updateUserStatusApi = (userId: number, status: number) => {
  return http.request<ResponseData<PageDTO<UserDTO>>>(
    "put",
    `/system/users/${userId}/status`,
    {
      data: {
        status: status
      }
    }
  );
};

/** 批量导出用户 */
export const exportUserExcelApi = (params: UserQuery, fileName: string) => {
  return http.download("/system/users/excel", fileName, {
    params
  });
};


/** 用户头像上传 */
export const uploadUserAvatarApi = data => {

  return http.request<ResponseData<void>>(

    "post",
    "/system/user/profile/avatar",
    {
      data
    },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

/** 更改用户资料 */
export const updateUserProfileApi = (data?: UserProfileRequest) => {
  return http.request<ResponseData<void>>("put", "/system/user/profile", {
    data
  });
};

/** 更改当前用户密码 */
export const updateCurrentUserPasswordApi = (data?: ResetPasswordRequest) => {
  return http.request<ResponseData<void>>(
    "put",
    "/system/user/profile/password",
    {
      data
    }
  );
};
