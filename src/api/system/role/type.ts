export interface RoleQuery extends BasePageQuery {
  roleKey?: string;
  roleName?: string;
  status?: string;
  timeRangeColumn?: string;
}

export interface RoleDTO {
  createTime: Date;
  dataScope: number;
  remark: string;
  roleId: number;
  roleKey: string;
  roleName: string;
  roleSort: number;
  selectedDeptList: number[];
  selectedMenuList: number[];
  status: number;
}

export interface AddRoleCommand {
  dataScope?: string;
  menuIds: number[];
  remark?: string;
  roleKey: string;
  roleName: string;
  roleSort: number;
  status?: string;
}

export interface UpdateRoleCommand extends AddRoleCommand {
  roleId: number;
}
