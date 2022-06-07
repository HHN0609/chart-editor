<template>
  <div class="mainBox">
    <vue-infinite-viewer :draggable="true" :zoom="10" class="viewer">
      <div>AA</div>
    </vue-infinite-viewer>
  </div>
</template>
<script lang="ts" setup>
import { VueInfiniteViewer } from "vue3-infinite-viewer";
</script>
<style lang="less" scoped>
  .mainBox {
    width: 100%;
    min-height: 100%;
    > .viewer {
      width: 80%;
      height: 90vh;
      overflow: hidden;
    }
  }
</style>
