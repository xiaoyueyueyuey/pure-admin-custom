import { http } from "@/utils/http";
import { DeptQuery, DeptRequest, DeptDTO, DeptTreeDTO } from "./type";
/** 获取部门列表 */
export const getDeptListApi = (params?: DeptQuery) => {
  return http.request<ResponseData<Array<DeptDTO>>>("get", "/system/depts", {
    params
  });
};

/** 新增部门 */
export const addDeptApi = (data: DeptRequest) => {
  console.log(data);
  return http.request<ResponseData<void>>("post", "/system/dept", {
    data
  });
};

/** 部门详情 */
export const getDeptInfoApi = (deptId: string) => {
  return http.request<ResponseData<DeptDTO>>("get", `/system/dept/${deptId}`);
};

/** 修改部门 */
export const updateDeptApi = (deptId: string, data: DeptRequest) => {
  return http.request<ResponseData<void>>("put", `/system/dept/${deptId}`, {
    data
  });
};

/** 删除部门 */
export const deleteDeptApi = (deptId: string) => {
  return http.request<ResponseData<void>>("delete", `/system/dept/${deptId}`);
};

/** 获取部门树级结构 */
export const getDeptTree = () => {
  return http.request<ResponseData<DeptTreeDTO>>(
    "get",
    "/system/depts/dropdown"
  );
};
