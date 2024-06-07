import { defineStore } from "pinia";
import {
  type userType,
  store,
  router,
  resetRouter,
  routerArrays,
  storageLocal
} from "../utils";
import { useMultiTagsStoreHook } from "./multiTags";
import { removeToken, userKey } from "@/utils/auth";
import { TokenDTO } from "@/api/system/login/type";
import { storageSession } from "@pureadmin/utils";
import { DictionaryData } from "@/api/system/login/type";
const dictionaryListKey = "xy-dictionary-list";
const dictionaryMapKey = "xy-dictionary-map";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 用户名
    username:
      storageSession().getItem<TokenDTO>(userKey)?.currentUser.userInfo
        .username ?? "",
    // 页面级别权限，也就是有哪些角色
    roles: storageSession().getItem<TokenDTO>(userKey)?.currentUser.roleKey
      ? [storageSession().getItem<TokenDTO>(userKey)?.currentUser.roleKey]
      : [],
    dictionaryList:
      storageLocal().getItem<Map<String, Array<DictionaryData>>>(
        dictionaryListKey
      ) ?? new Map(),
    dictionaryMap:
      storageLocal().getItem<Map<String, Map<String, DictionaryData>>>(
        dictionaryMapKey
      ) ?? new Map(),
    currentUserInfo:
      storageSession().getItem<TokenDTO>(userKey)?.currentUser.userInfo ?? {}
    // // 头像
    // avatar: storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "",
    // // 用户名
    // username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // // 昵称
    // nickname: storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "",
    // // 页面级别权限
    // roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // // 是否勾选了登录页的免登录
    // isRemembered: false,
    // // 登录页的免登录存储几天，默认7天
    // loginDay: 7
  }),
  actions: {
    /** 存储头像 */
    // SET_AVATAR(avatar: string) {
    //   this.avatar = avatar;
    // },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储昵称 */
    // SET_NICKNAME(nickname: string) {
    //   this.nickname = nickname;
    // },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储是否勾选了登录页的免登录 */
    // SET_ISREMEMBERED(bool: boolean) {
    //   this.isRemembered = bool;
    // },
    /** 设置登录页的免登录存储几天 */
    // SET_LOGINDAY(value: number) {
    //   this.loginDay = Number(value);
    // },

    /** 存储系统内的字典值 并拆分为Map形式和List形式 */
    SET_DICTIONARY(dictionary: Map<String, Array<DictionaryData>>) {
      /** 由于localStorage不能存储Map对象,所以用Obj来装载数据 */
      const dictionaryMapTmp = {};

      for (const obj in dictionary) {
        dictionaryMapTmp[obj] = dictionary[obj].reduce((map, dict) => {
          map[dict.value] = dict;
          return map;
        }, {});
      }

      /** 将字典分成List形式和Map形式 List便于下拉框展示 Map便于匹配值 */
      this.dictionaryList = dictionary;
      this.dictionaryMap = dictionaryMapTmp;

      storageLocal().setItem<Map<String, Array<DictionaryData>>>(
        dictionaryListKey,
        dictionary
      );

      storageLocal().setItem<Map<String, Map<String, DictionaryData>>>(
        dictionaryMapKey,
        dictionaryMapTmp as Map<String, Map<String, DictionaryData>>
      );
    },

    /** 登入 TODO 这里AG没用，到时再修改*/
    // async loginByUsername(data) {
    //   return new Promise<UserResult>((resolve, reject) => {
    //     getLogin(data)
    //       .then(data => {
    //         if (data?.success) setToken(data.data);
    //         resolve(data);
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    }
    /** 刷新`token` ,需要再啓用 */
    // async handRefreshToken(data) {
    //   return new Promise<RefreshTokenResult>((resolve, reject) => {
    //     refreshTokenApi(data)
    //       .then(data => {
    //         if (data) {
    //           setToken(data.data);
    //           resolve(data);
    //         }
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
