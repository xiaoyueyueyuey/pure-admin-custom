import { http } from "@/utils/http";
import {RoleQuery,RoleDTO,AddRoleCommand,UpdateRoleCommand} from './type'
export function getRoleListApi(params: RoleQuery) {
  return http.request<ResponseData<PageDTO<RoleDTO>>>(
    "get",
    "/system/role/list",
    {
      params
    }
  );
}

export function getRoleInfoApi(roleId: number) {
  return http.request<ResponseData<RoleDTO>>("get", "/system/role/" + roleId);
}

export function addRoleApi(data: AddRoleCommand) {
  return http.request<void>("post", "/system/role", {
    data
  });
}
export function updateRoleApi(data: UpdateRoleCommand) {
  return http.request<void>("put", "/system/role", {
    data
  });
}

export function deleteRoleApi(roleId: number) {
  return http.request<void>("delete", "/system/role/" + roleId);
}
