import axios, { AxiosRequestConfig } from "axios";
import router from "@/router";
import { message } from "ant-design-vue";
import userInfo from "@/stores/userInfo";
import pinia from "@/stores/store";

const store = userInfo(pinia);
const instance = axios.create({
  baseURL: "http://127.0.0.1:8081/api",
  timeout: 2000,
  headers: { "content-type": "application/json;charset=utf-8" },
  responseType: "json",
});

/**
 * 只有**登录**与**注册**操作与token无关，其他请求全要带上token
 * @param {AxiosRequestConfig<any>} config axios的请求配置
 * @return {boolean} true or false
 */
export const needToken = (config: AxiosRequestConfig<any>): boolean => {
  if (config.url === "/user/login" || (config.url === "/user/info" && config.method === "POST")) {
    return false;
  }
  return true;
};

instance.interceptors.request.use(
  (config) => {
    let controller = new AbortController();
    let signal = controller.signal;
    config.signal = signal;
    // 根据请求的类型判断需不需要token
    if (!needToken(config)) {
      return config;
    } else {
      const token = localStorage.getItem("token");
      if (!token) {
        // 没token就先登录
        message.warn("Please Login", 0.5).then(() => {
          router.replace({ name: "Login" });
        });
        controller.abort();
        return null;
      } else {
        config.headers.Authorization = token;
        return config;
      }
    }
  },
  (error) => {
    console.log("请求拦截器的错误：");
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      //说明是首次登录，才会返回token
      //把token存到localStorage里
      localStorage.setItem("token", response.data.token);
      store.$patch({
        userName: response.data.username,
        account: response.data.account,
        isAdmin: response.data.isAdmin,
      });
    }
    return response;
  },
  (error) => {
    // Token 过期的错误在这里拦截
    console.log("响应拦截器的错误：");
    console.log(error);
    if (error.response.data.message === "Token Invalid!") {
      message.warn("Token Invalid", 0.5).then(() => {
        router.replace({ name: "Login" });
      });
    } else {
      message.warn(error.response.data.message, 0.5);
    }
    return Promise.reject(error);
  }
);

export default instance;
