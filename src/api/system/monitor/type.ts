export interface OnlineUserQuery {
  ipAddress: string;
  username: string;
}

export interface OnlineUserInfo {
  browser?: string;
  deptName?: string;
  ipAddress?: string;
  loginLocation?: string;
  loginTime?: number;
  operationSystem?: string;
  tokenId?: string;
  username?: string;
}


/**
 * ServerInfo
 */
export interface ServerInfo {
  cpuInfo?: CpuInfo;
  diskInfos?: DiskInfo[];
  jvmInfo?: JvmInfo;
  memoryInfo?: MemoryInfo;
  systemInfo?: SystemInfo;
}

/**
 * CpuInfo
 */
export interface CpuInfo {
  cpuNum?: number;
  free?: number;
  sys?: number;
  total?: number;
  used?: number;
  wait?: number;
}

/**
 * DiskInfo
 */
export interface DiskInfo {
  dirName?: string;
  free?: string;
  sysTypeName?: string;
  total?: string;
  typeName?: string;
  usage?: number;
  used?: string;
}

/**
 * JvmInfo
 */
export interface JvmInfo {
  free?: number;
  home?: string;
  inputArgs?: string;
  max?: number;
  name?: string;
  runTime?: string;
  startTime?: string;
  total?: number;
  usage?: number;
  used?: number;
  version?: string;
}

/**
 * MemoryInfo
 */
export interface MemoryInfo {
  free?: number;
  total?: number;
  usage?: number;
  used?: number;
}

/**
 * SystemInfo
 */
export interface SystemInfo {
  computerIp?: string;
  computerName?: string;
  osArch?: string;
  osName?: string;
  userDir?: string;
}


/**
 * RedisCacheInfoDTO
 */
export interface RedisCacheInfoDTO {
  commandStats?: CommandStatusDTO[];
  dbSize?: number;
  info?: { [key: string]: string };
}

/**
 * CommandStatusDTO
 */
export interface CommandStatusDTO {
  name?: string;
  value?: string;
}

