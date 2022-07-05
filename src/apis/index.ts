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
* @param projectName 项目名称
* @returns Promise 
*/
export const postUserProjects = (relativeUrl: string, account: string, initInfo: object) => {
  return instance.post(relativeUrl, {
    account,
    ...initInfo
  });
};

/**
* delete方法删除一个project
* @param relativeUrl 请求相对于baseUrl的地址
* @param projectId 项目id
* @returns Promise
*/
export const deleteUserProjects = (relativeUrl: string, projectId: string, account: string) => {
  return instance.delete(relativeUrl, {
    params: {
      projectId,
      account,
    }
  });
};

export const getAllUsersInfo = (relativeUrl: string) => {
  return instance.get(relativeUrl);
}

export const deleteUserInfo = (relativeUrl: string, account: string) => {
  return instance.delete(relativeUrl, {
    params: {
      account,
    }
  });
};

export const putUserAuth = (relativeUrl: string, account: string, newAuth: number) => {
  return instance.put(relativeUrl, {
    account,
    newAuth,
  });
};

export const getUserProjectsBasic = (relativeUrl: string, projectId: string) => {
  return instance.get(relativeUrl, {
    params: {
      projectId,
    }
  })
};

export const postUserChartDetailInfo = (relativeUrl: string, projectId: string, chartId: string, chartDetail: any) => {
  return instance.post(relativeUrl, {
    projectId,
    chartId,
    chartDetail,
  })
};

export const deleteUserChartDetailInfo = (relativeUrl: string, projectId: string, chartId: string) => {
  return instance.delete(relativeUrl, {
    params: {
      projectId,
      chartId,
    }
  })
};

export const getUserChartDetailInfo = (relativeUrl: string, projectId: string) => {
  return instance.get(relativeUrl, {
    params: {
      projectId
    }
  })
};
