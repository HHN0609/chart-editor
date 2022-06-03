<template>
  <div class="container"></div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
  let a = 10;
  a++;
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
