<template>
  <div class="app-root">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { onMounted } from "vue";
onMounted(() => {
  axios.get("/api/user").then(
    (value) => {
      console.log(value);
    },
    (reason) => {
      console.log(reason);
    }
  );
});
</script>

<style lang="less" scoped>
.app-root {
  width: 100vw;
  height: 100vh;
}
</style>
