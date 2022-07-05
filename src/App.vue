<template>
  <div class="app-root">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import { getUserInfo } from "./apis";
import router from "./router";
import pinia from "./stores/store";
import userInfo from "./stores/userInfo";
import { getCookie } from "./utils";
const store = userInfo(pinia);

// 页面刷新的时候触发的获取信息
// 刷新的时候会把store里的信息给清楚掉，所以要用cookie来获取account的值
window.addEventListener("load", async () => {
  if (router.currentRoute.value.name === "Login") return;
  const _account = getCookie("account");
  if(!_account){
    message.warn("Cookie is expired", 0.5).then(() => {
      router.replace({name: "Login"});
    })
    return;
  }
  let { account, name, is_admin } = (await getUserInfo("/user/info", _account)).data;
  store.$patch({
    account: account,
    userName: name,
    isAdmin: is_admin,
  });
});
</script>

<style lang="less">
.app-root {
  width: 100vw;
  height: 100vh;
}
</style>
