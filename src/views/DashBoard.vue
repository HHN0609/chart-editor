<template>
  <div class="mainBox">
    <vue-infinite-viewer
      :draggable="true"
      :zoom="1"
      :rangeX="[-5000, 5000]"
      :rangeY="[-5000, 5000]"
      @drag="onDrag"
      class="viewer">
      <div class="viewport">AA</div>
    </vue-infinite-viewer>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { VueInfiniteViewer } from "vue3-infinite-viewer";
import Moveable from "vue3-moveable";
// const target = ref(null);
const onDrag = (e) => {
  console.log(e.inputEvent);
}
// const onScale = ({ drag }) => {
//   target.style.transform = drag.transform;
// }
// const onRotate = ({ drag }) => {
//   target.style.transform = drag.transform;
// }
</script>
<style lang="less" scoped>
  .mainBox {
    width: 100%;
    min-height: 100%;
    > .viewer {
      width: 80%;
      height: 90vh;
      overflow: hidden;
      background:gainsboro;
      .viewport{
        width: 500px;
        height: 500px;
        background-color:aqua;
      }
    }
  }
</style>
