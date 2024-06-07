export interface UserQuery extends BasePageQuery {
  deptId?: number;
  phoneNumber?: string;
  status?: number;
  userId?: number;
  username?: string;
}

/**
 * UserDTO
 */
export interface UserDTO {
  avatar?: string;
  createTime?: Date;
  creatorId?: number;
  creatorName?: string;
  deptId?: number;
  deptName?: string;
  email?: string;
  loginDate?: Date;
  loginIp?: string;
  nickname?: string;
  phoneNumber?: string;
  postId?: number;
  remark?: string;
  roleId?: number;
  roleName?: string;
  sex?: number;
  status?: number;
  updaterId?: number;
  updaterName?: string;
  updateTime?: Date;
  userId?: number;
  username?: string;
  userType?: number;
}

/**
 * AddUserCommand
 */
export interface UserRequest {
  userId: number;
  avatar?: string;
  deptId?: number;
  email?: string;
  nickname?: string;
  phoneNumber?: string;
  password: string;
  postId?: number;
  remark?: string;
  roleId?: number;
  sex?: number;
  status?: number;
  username?: string;
}

/**
 * UpdateProfileCommand
 */
export interface UserProfileRequest {
  email?: string;
  nickName?: string;
  phoneNumber?: string;
  sex?: number;
  userId?: number;
}

/**
 * ResetPasswordCommand
 */
export interface ResetPasswordRequest {
  newPassword?: string;
  oldPassword?: string;
  userId?: number;
}

/**
 * 修改密码
 */
export interface PasswordRequest {
  userId: number;
  password: string;
}
