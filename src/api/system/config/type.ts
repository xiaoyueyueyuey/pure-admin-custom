export interface ConfigQuery extends BasePageQuery {
  /**
   * 配置key
   */
  configKey?: string;
  /**
   * 配置名称
   */
  configName?: string;
  /**
   * 是否允许更改配置
   */
  isAllowChange?: string;
}
/**
 * ConfigDTO, 配置信息
 */
export interface ConfigDTO {
  configId?: string;
  configKey?: string;
  configName?: string;
  configOptions?: string[];
  configValue?: string;
  createTime?: Date;
  isAllowChange?: string;
  isAllowChangeStr?: string;
  remark?: string;
}
