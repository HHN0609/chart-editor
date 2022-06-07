<template>
  <div class="mainBox">
    <vue-infinite-viewer :draggable="true" :zoom="10" class="viewer">
      <div>AA</div>
      <div class="target" ref="target">Vue Moveable</div>
      <Moveable
          class="moveable"
          v-bind:target="['.target']"
          v-bind:draggable="true"
          v-bind:scalable="true"
          v-bind:rotatable="true"
          @drag="onDrag"
          @scale="onScale"
          @rotate="onRotate"
      />
    </vue-infinite-viewer>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { VueInfiniteViewer } from "vue3-infinite-viewer";
import Moveable from "vue3-moveable";
const target = ref(null);
const onDrag = ({ transform }) => {
  target.style.transform = transform;
}
const onScale = ({ drag }) => {
  target.style.transform = drag.transform;
}
const onRotate = ({ drag }) => {
  target.style.transform = drag.transform;
}
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
