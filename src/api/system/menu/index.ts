import { MenuQuery, MenuDTO, MenuRequest, MenuDetailDTO } from "./type";
import { http } from "@/utils/http";
/** 获取菜单列表 */
export const getMenuListApi = (params: MenuQuery) => {
  return http.request<ResponseData<Array<MenuDTO>>>("get", "/system/menus", {
    params
  });
};

/** 添加菜单 */
export const addMenuApi = (data: MenuRequest) => {
  return http.request<ResponseData<void>>("post", "/system/menus", { data });
};

/** 修改菜单 */
export const updateMenuApi = (menuId: string, data: MenuRequest) => {
  return http.request<ResponseData<void>>("put", `/system/menus/${menuId}`, {
    data
  });
};

/** 删除菜单 */
export const deleteMenuApi = (menuId: string) => {
  return http.request<ResponseData<void>>("delete", `/system/menus/${menuId}`);
};

/** 菜单详情 */
export const getMenuInfoApi = (menuId: string) => {
  return http.request<ResponseData<MenuDetailDTO>>(
    "get",
    `/system/menus/${menuId}`
  );
};
