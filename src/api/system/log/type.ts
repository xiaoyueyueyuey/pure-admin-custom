//操作日志查询
export interface OperationLogsQuery extends BasePageQuery {
  businessType?: string;
  requestModule?: string;
  status?: string;
  username?: string;
}

// 操作日志信息
export interface OperationLogDTO {
  businessType?: number;
  businessTypeStr?: string;
  calledMethod?: string;
  deptId?: number;
  deptName?: string;
  errorStack?: string;
  operationId?: number;
  operationParam?: string;
  operationResult?: string;
  operationTime?: Date;
  operatorIp?: string;
  operatorLocation?: string;
  operatorType?: number;
  operatorTypeStr?: string;
  requestMethod?: string;
  requestModule?: string;
  requestUrl?: string;
  status?: number;
  statusStr?: string;
  userId?: number;
  username?: string;
}

/** 登录日志查询类 */
export interface LoginLogQuery extends BasePageQuery {
  beginTime?: string;
  endTime?: string;
  ipAddress?: string;
  status?: string;
  username?: string;
}

/**
 * 登录日志信息
 */
export interface LoginLogsDTO {
  browser?: string;
  infoId?: string;
  ipAddress?: string;
  loginLocation?: string;
  loginTime?: Date;
  msg?: string;
  operationSystem?: string;
  /** TODO 这个登录状态的设计很奇怪  需要重构掉 */
  status?: number;
  statusStr?: string;
  username?: string;
}
