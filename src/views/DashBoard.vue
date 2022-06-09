<template>
  <div class="mainbox">
    <div class="left">

    </div>
    <div class="editorbox">
      <div class="guide horizontal"></div>
      <div class="guide vertical"></div>
      <vue-infinite-viewer
        class="viewer"
        ref="viewer"
        v-bind="viewerOptions"
        @scroll.once="getInstance"
        >
        <div class="viewport"></div>
      </vue-infinite-viewer>
    </div>
    <div class="right">

    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import InfiniteViewer , { InfiniteViewerOptions, OnPinch, OnDrag, OnScroll } from "infinite-viewer";
import { VueInfiniteViewer } from "vue3-infinite-viewer";
import Guides from "@scena/guides";
import Gesto from "gesto";
let guideHorizontal: Guides;
let guideVertical: Guides;
let infiniteViewer: InfiniteViewer;
let getso: Gesto;
let viewerOptions = reactive<Partial<InfiniteViewerOptions>>({
  zoom: 1,
  rangeX: [-1000, 1000],
  rangeY: [-1000, 1000],
  usePinch: true,
  maxPinchWheel: 10,
});

onMounted(() => {
  guideHorizontal = new Guides(
    document.querySelector(".guide.horizontal"),
    {
      type: "horizontal",
      rulerStyle: { left: "30px", width: "calc(100% - 30px)", height: "30px" },
    }
  );
  guideVertical = new Guides(
    document.querySelector(".guide.vertical"),
    {
      type: "vertical",
      rulerStyle: { top: "30px", height: "calc(100% - 30px)", width: "30px" },
    }
  );
  window.addEventListener("resize", () => {
    guideHorizontal.resize();
    guideVertical.resize();
  });
});

// 页面在刚刚刷新进来的时候，会触发一次原始的scroll事件，利用这个事件来获取infiniteViewer的实例
const getInstance = (e) => {
  infiniteViewer = e.currentTarget;

  // 让viewPort剧中，同时让guide也跟随
  infiniteViewer.scrollCenter();
  guideHorizontal.setState({scrollPos: infiniteViewer.getScrollLeft()});
  guideVertical.setState({scrollPos: infiniteViewer.getScrollTop()});
  
  infiniteViewer.on("pinch", (e: OnPinch) => {
    // ctrl + 鼠标滚轮的缩放处理
    infiniteViewer.setZoom(e.zoom);
    guideHorizontal.setState({
      zoom: e.zoom,
      scrollPos: infiniteViewer.getScrollLeft()
    });
    guideVertical.setState({
      zoom: e.zoom,
      scrollPos: infiniteViewer.getScrollTop()
    })
  });

  infiniteViewer.on("scroll", (e: OnScroll) => {
    // infiniteViewer的滚动处理，会带动guide的滚动
    // 拖拽事件也会触发这个回调函数
    guideHorizontal.scroll(e.scrollLeft);
    guideVertical.scroll(e.scrollTop);
  });
  getso = new Gesto(infiniteViewer.getContainer());
  getso.on("drag", (e: OnDrag) => {
    infiniteViewer.scrollBy(-1 * e.deltaX, -1 * e.deltaY);
  })
}

onUnmounted(() => {
  getso.unset();
  infiniteViewer.off();
  infiniteViewer.destroy();
  guideHorizontal.destroy();
  guideVertical.destroy();
  // 这里要记录一些图表的数据
})

</script>
<style lang="less" scoped>
  .mainbox {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    > .left {
      background: gainsboro;
      width: 200px;
      flex-basis: 200px;
      height: inherit;
      overflow-x: hidden;
      overflow-y: auto;
    }
    > .right{
      background-color: gainsboro;
      width: 300px;
      flex-basis: 300px;
      height: inherit;
      overflow: hidden;
      overflow-y: auto;
    }
    > .editorbox {
      // 中间撑满
      flex-grow: 1;
      height: inherit;
      overflow: hidden;
      position: relative;
      .guide { 
        position: absolute;
        &.horizontal{
          width: 100%;
        }
        &.vertical{
          height: 100%;
        }
      }
      > .viewer {
        overflow: hidden;
        width: calc(100% - 30px);
        height: calc(100% - 60px);
        left: 30px;
        top: 30px;
        border: black 2px solid;
        overflow: hidden;
        background:gainsboro;
        .viewport {
          overflow: hidden;
          width: 800px;
          height: 450px;
          background-color:rgb(39, 44, 44);
        }
      }

    }
  }
</style>
