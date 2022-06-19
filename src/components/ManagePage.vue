<template>
  <div class="container">121323</div>
</template>
<script lang="ts" setup>
import { getAllUsersInfo } from "@/apis";
import { onMounted } from "vue";
onMounted(() => {
  console.log("管理页面")
  getAllUsersInfo("/admin/usersInfo")
   .then(({data}) => {
      console.log(data);
   })
   .catch((reason) => {
      console.log(reason);
   });
});
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: left;
}
</style>
