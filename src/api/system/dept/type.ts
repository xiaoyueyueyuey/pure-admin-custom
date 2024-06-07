export interface DeptQuery extends BaseQuery {
  // TODO 目前不需要这个参数
  deptId?: number;
  parentId?: number;
}
/**
 * DeptDTO
 */
export interface DeptDTO {
  createTime?: Date;
  id?: number;
  deptName?: string;
  email?: string;
  leaderName?: string;
  orderNum?: number;
  parentId?: number;
  phone?: string;
  status?: number;
  statusStr?: string;
}

/**
 * AddDeptCommand
 */
export interface DeptRequest {
  deptName: string;
  email?: string;
  leaderName?: string;
  orderNum: number;
  parentId: number;
  phone?: string;
  status: number;
}

export interface DeptTreeDTO {
  id: number;
  parentId: number;
  label: string;
  children: [DeptTreeDTO];
}
