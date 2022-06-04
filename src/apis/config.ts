import axios from "axios";
import router from "@/router";
import { message } from "ant-design-vue";
// import userInfo from "@/stores/userInfo";
// const store = userInfo();

const instance = axios.create({
  baseURL: "http://127.0.0.1:8081/api",
  timeout: 2000,
  headers: { "content-type": "application/json;charset=utf-8" },
  responseType: "json",
});

instance.interceptors.request.use(
  (config) => {
    // 只有登录操作与token无关，其他请求全要带上token
    if (config.url === "/user/login") {
      return config;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      // 没token就先登录
      // 添加一个拦截请求
      message.warn("Please Login").then(() => {
        router.replace({ name: "Login" });
      });
      return null;
    } else {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    console.log("请求出错！");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      //说明是首次登录，才会返回token
      //把token存到localStorage里
      localStorage.setItem("token", response.data.token);
      //把state里的userInfo修改
      // store.$patch({
      //   userName: response.data.username,
      //   account: response.data.account,
      //   isAdmin: response.data.isAdmin,
      // });
    }
    return response;
  },
  (error) => {
    message.warn("Token Expire").then(() => {
      router.replace({ name: "Login" });
    });
    return Promise.reject(error);
  }
);

export default instance;
