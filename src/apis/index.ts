import instance from "@/apis/config";
import { AxiosResponse } from "axios";

/**
 * @param relativeUrl 请求相对于baseUrl的地址
 * @param payload post请求携带的信息
 * @returns Promise
 */
export const postLogin = (relativeUrl: string, account: string, password: string): Promise<AxiosResponse<any, any>> => {
  return instance.post(relativeUrl, { account, password });
};

/**
 * @param relativeUrl 请求相对于baseUrl的地址
 * @returns Promise
 */
export const postVerify = (relativeUrl: string): Promise<AxiosResponse<any, any>> => {
  return instance.post(relativeUrl);
};
