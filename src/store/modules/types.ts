import type { RouteRecordName } from "vue-router";
import { DictionaryData } from "@/api/system/dictionary";
export type cacheType = {
  mode: string;
  name?: RouteRecordName;
};

export type positionType = {
  startIndex?: number;
  length?: number;
};

export type appType = {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    // 判断是否手动点击Collapse
    isClickCollapse: boolean;
  };
  layout: string;
  device: string;
  viewportSize: { width: number; height: number };
};

export type multiType = {
  path: string;
  name: string;
  meta: any;
  query?: object;
  params?: object;
};

export type setType = {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
};

export type userType = {
  // avatar?: string;
  // username?: string;
  // nickname?: string;
  // roles?: Array<string>;
  // isRemembered?: boolean;
  // loginDay?: number;
  //用AG的，到时需要自定义的时候再改
  username?: string;
  roles?: Array<string>;
  /** 字典ListMap 用于下拉框直接展示 */
  dictionaryList: Map<String, Array<DictionaryData>>;
  /** 字典MapMap 用于匹配值展示 */
  dictionaryMap: Record<string, Record<string, DictionaryData>>;
};
