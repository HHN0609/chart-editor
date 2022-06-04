<template>
  <div class="app-root">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
// import { onBeforeRouteUpdate } from "vue-router";
import { getUserInfo } from "./apis";
import router from "./router";
import userInfo from "./stores/userInfo";
const store = userInfo();

// 页面刷新的时候触发的获取信息
window.addEventListener("load", async () => {
  // if(router.currentRoute.value === "Login") return;
  let { account, name, is_admin } = (await getUserInfo("/user/info")).data;
  store.$patch({
    account: account,
    userName: name,
    isAdmin: is_admin,
  });
});
</script>

<style lang="less" scoped>
.app-root {
  width: 100vw;
  height: 100vh;
}
</style>
