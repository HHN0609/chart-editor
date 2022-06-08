<template>
  <div class="mainbox">
  <div class=".guide .Horizontal"></div>
  <div class=".guide .Vertical"></div>
  <vue-infinite-viewer
    class="viewer"
    ref="viewer"
    v-bind="viewerOptions"
    @scroll.once="getInstance"
    >
    <div class="viewport"></div>
  </vue-infinite-viewer>
  </div>
</template>
<script lang="ts" setup>
import { onUnmounted, reactive, ref } from "vue";
import InfiniteViewer , { InfiniteViewerOptions, OnPinch, OnDrag, OnScroll } from "infinite-viewer";
import { VueInfiniteViewer } from "vue3-infinite-viewer";
import Guides from "@scena/guides";
let guideHorizontal: Guides;
let guideVertical: Guides;
let infiniteViewer: InfiniteViewer;
let viewerOptions = reactive<Partial<InfiniteViewerOptions>>({
  zoom: 1,
  rangeX: [-1000, 1000],
  rangeY: [-1000, 1000],
  usePinch: true,
  maxPinchWheel: 10,
});

const getInstance = (e) => {
  guideHorizontal = new Guides(document.querySelector(".guide.Horizontal"));
  guideVertical = new Guides(document.querySelector(".guide.Vertical"));
  infiniteViewer = e.currentTarget;
  infiniteViewer.scrollCenter();
  infiniteViewer.on("pinch", (e: OnPinch) => {
    console.log(e);
    infiniteViewer.setZoom(e.zoom);
  });

  infiniteViewer.on("drag", (e: OnDrag) => {
    console.log(e);
  });
}
onUnmounted(() => {
  infiniteViewer.off();
  infiniteViewer.destroy();
  // 这里要记录一些图表的数据
})

</script>
<style lang="less" scoped>
  .mainbox {
    width: 100%;
    min-height: 100%;
    > .viewer {
      overflow: hidden;
      width: 80%;
      height: 90vh;
      border: black 1px solid;
      overflow: hidden;
      background:gainsboro;
      .viewport{
        overflow: hidden;
        width: 800px;
        height: 450px;
        background-color:rgb(39, 44, 44);
      }
    }
  }
</style>
