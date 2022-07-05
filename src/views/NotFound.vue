<template>
  <div class="notFoundContainer">
    <Result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <Button type="primary" @click="goHome">Back Home</Button>
      </template>
    </Result>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { Result, Button } from "ant-design-vue";
const goHome = () => {
  router.replace({ name: "MyProject" });
};
</script>
<style lang="less" scoped>
.notFoundContainer {
  width: 100vw;
  height: 100vh;
}
</style>
