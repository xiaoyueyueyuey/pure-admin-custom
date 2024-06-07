import Cookies from "js-cookie";
import { storageLocal, storageSession } from "@pureadmin/utils";
import { useUserStoreHook } from "@/store/modules/user";
import { TokenDTO } from "@/api/system/login/type";
import { aesDecrypt, aesEncrypt } from "./crypt";

//AG这里好像没用
export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 头像 */
  // avatar?: string;
  /** 用户名 */
  username?: string;
  /** 昵称 */
  // nickname?: string;
  /** 当前登录用户的角色 */
  roles?: Array<string>;
}

// 这里AG是把userKey改名为了sessionKey,我就保持原样
export const userKey = "user-info";
export const tokenKey = "authorized-token";
// 自定义
export const isRememberMeKey = "xy-is-remember-me";
export const passwordKey = "xy-password";
export const unRepeatableTokenKey = "unRepeatableToken";

/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const multipleTabsKey = "multiple-tabs";

/** 获取`token` */
//TODO这里被修改了，到时自己自定义
export function getToken(): TokenDTO {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(tokenKey)
    ? JSON.parse(Cookies.get(tokenKey))
    : storageSession().getItem<TokenDTO>(userKey)?.token; //storageSession有问题 我改回local了
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`、`refreshToken`这三条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`avatar`、`username`、`nickname`、`roles`、`refreshToken`、`expires`这六条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */
// export function setToken(data: DataInfo<Date>) {
//   let expires = 0;
//   const { accessToken, refreshToken } = data;
//   const { isRemembered, loginDay } = useUserStoreHook();
//   expires = new Date(data.expires).getTime(); // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
//   const cookieString = JSON.stringify({ accessToken, expires, refreshToken });

//   expires > 0
//     ? Cookies.set(TokenKey, cookieString, {
//         expires: (expires - Date.now()) / 86400000
//       })
//     : Cookies.set(TokenKey, cookieString);

//   Cookies.set(
//     multipleTabsKey,
//     "true",
//     isRemembered
//       ? {
//           expires: loginDay
//         }
//       : {}
//   );

//   function setUserKey({ avatar, username, nickname, roles }) {
//     useUserStoreHook().SET_AVATAR(avatar);
//     useUserStoreHook().SET_USERNAME(username);
//     useUserStoreHook().SET_NICKNAME(nickname);
//     useUserStoreHook().SET_ROLES(roles);
//     storageLocal().setItem(userKey, {
//       refreshToken,
//       expires,
//       avatar,
//       username,
//       nickname,
//       roles
//     });
//   }

//   if (data.username && data.roles) {
//     const { username, roles } = data;
//     setUserKey({
//       avatar: data?.avatar ?? "",
//       username,
//       nickname: data?.nickname ?? "",
//       roles
//     });
//   } else {
//     const avatar =
//       storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "";
//     const username =
//       storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "";
//     const nickname =
//       storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "";
//     const roles =
//       storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [];
//     setUserKey({
//       avatar,
//       username,
//       nickname,
//       roles
//     });
//   }
// }
// 下面这是AG的写法
/**
 * 后端处理token
 */
export function setTokenFromBackend(data: TokenDTO): void {
  //他这里好像是把后端返回的token和用户信息存储在了一起，TODO分离
  // 这是AG的authorized-token
  // {"token":"eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImM1YjFkYjg1LWFkNzYtNDMxMy04MzJkLTc3NmJlMTdhNzg3MyJ9.oiwXPHvQYkN8zoVDjIlzuplKpv0qINwwvLMIE92Z3DjmdXs09eer4YJxclj056dlUFTGtnlEmMmkHuOzo8bp1Q","currentUser":{"userInfo":{"userId":1,"postId":1,"postName":"董事长","roleId":1,"roleName":"超级管理员","deptId":4,"deptName":"研发部门2","username":"admin","nickname":"valarchie1","userType":0,"email":"74550670@qq.com","phoneNumber":"15665569815","sex":1,"avatar":"/profile/avatar/20230827220914_blob_40c1158643f1495c9d69174c697ede6b.png","status":1,"loginIp":"183.46.17.12","loginDate":"2024-06-06 11:11:45","creatorId":null,"creatorName":null,"createTime":"2022-05-21 08:30:54","updaterId":1,"updaterName":null,"updateTime":"2024-06-06 11:11:45","remark":"管理员"},"roleKey":"admin","permissions":["*:*:*"]}}
  const cookieString = JSON.stringify(data);
  Cookies.set(tokenKey, cookieString);
  useUserStoreHook().SET_USERNAME(data.currentUser.userInfo.username);
  useUserStoreHook().SET_ROLES([data.currentUser.roleKey]);
  storageSession().setItem(userKey, data);
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken() {
  Cookies.remove(tokenKey);
  //这个可去可不去，这个是用来持久化之前打开过的标签页的
  // Cookies.remove(multipleTabsKey);
  storageLocal().removeItem(userKey);
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return "Bearer " + token;
};

/** 将密码加密后 存入cookies中 ,这是AG的，个人感觉不需要，可以使用token进行免密登录而不是存储加密密码 */
export function savePassword(password: string) {
  const encryptPassword = aesEncrypt(password);
  Cookies.set(passwordKey, encryptPassword);
}
/** 将密码中cookies中删除 */
export function removePassword() {
  Cookies.remove(passwordKey);
}

/** 获取密码 并解密 */
export function getPassword(): string {
  const encryptPassword = Cookies.get(passwordKey); //这里是加密后的密码
  if (
    encryptPassword !== null &&
    encryptPassword !== undefined &&
    encryptPassword.trim() !== ""
  ) {
    return aesDecrypt(encryptPassword); //解密
  }
  return null;
}

// 这个是AG的写法,如果不用可以删除
export function saveIsRememberMe(isRememberMe: boolean) {
  Cookies.set(isRememberMeKey, isRememberMe.toString());
}
export function getIsRememberMe() {
  const value = Cookies.get(isRememberMeKey);
  return value === "true";
}

// 防重令牌设置
export function setUnRepeatableToken(unRepeatableToken: string) {
  storageSession().setItem(unRepeatableTokenKey, unRepeatableToken);
}
export function getUnRepeatableToken() {
  return storageSession().getItem<string>(unRepeatableTokenKey); //可能返回null，或者空串，后端自己处理就好了
}
