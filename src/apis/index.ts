import instance from "@/apis/config";
import { AxiosResponse } from "axios";

/**
 * 用户登录的api
 * @param relativeUrl 请求相对于baseUrl的地址
 * @param account 用户账号
 * @param password 用户密码
 * @returns Promise
 */
export const postUserLogin = (relativeUrl: string, account: string, password: string): Promise<AxiosResponse<any, any>> => {
  return instance.post(relativeUrl, { account, password });
};

/**
 * 用户注册的api
 * @param relativeUrl 请求相对于baseUrl的地址
 * @param account 用户账号
 * @param name 用户名
 * @param password 用户密码
 * @returns Promise
 */
export const postUserRegister = (relativeUrl: string, account: string, name: string, password: string): Promise<AxiosResponse<any, any>> => {
  return instance.post(relativeUrl, { account, name, password });
};

/**
 * 查询登录状态(已经弃用)
 * @param relativeUrl 请求相对于baseUrl的地址
 * @returns Promise
 */
export const postVerify = (relativeUrl: string): Promise<AxiosResponse<any, any>> => {
  return instance.post(relativeUrl);
};

/**
 * get方法获取用户信息
 * @param relativeUrl 请求相对于baseUrl的地址
 * @param account 用户账号
 * @returns Promise
 */
export const getUserInfo = (relativeUrl: string, account: string): Promise<AxiosResponse<any, any>> => {
  return instance.get(relativeUrl, {
    params: {
      account,
    },
  });
};

/**
 * put方法修改用户信息
 * @param relativeUrl 请求相对于baseUrl的地址
 * @param account 用户账号
 * @param username 用户名
 * @param password 密码
 * @returns Promise
 */
export const putUserInfo = (relativeUrl: string, account: string, username: string, password?: string): Promise<AxiosResponse<any, any>> => {
  return instance.put(relativeUrl, {
    account,
    username,
    password,
  });
};

/**
* get方法获取用的project信息
* @param relativeUrl 请求相对于baseUrl的地址
* @param account 用户账号
* @returns Promise 
*/
export const getUserProjects = ( relativeUrl: string, account: string ): Promise<AxiosResponse<any, any>> => {
  return instance.get(relativeUrl, {
    params: {
      account,
    }
  });
};

/**
* post方法创建一个project
* @param relativeUrl 请求相对于baseUrl的地址
* @param account 用户账号
* @returns Promise 
*/
export const postUserProjects = (relativeUrl: string, account: string, chartName: string) => {
  return instance.post(relativeUrl, {
    account,
    chartName,
  });
};

/**
* delete方法删除一个project
* @param relativeUrl 请求相对于baseUrl的地址
* @param chartId 用户账号
* @returns Promise
*/
export const deleteUserProjects = (relativeUrl: string, chartId: number) => {
  return instance.delete(relativeUrl, {
    params: {
      chartId,
    }
  });
};