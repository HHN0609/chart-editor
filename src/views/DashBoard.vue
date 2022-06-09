<template>
  <div class="mainbox">
    <div class="left">

    </div>
    <div class="editorbox">
      <reload-outlined
        ref="recoverBtn"
        class="recoverBtn"
        title="恢复画布"
        @click="recoverViewer"
      />
      <div class="guide horizontal"></div>
      <div class="guide vertical"></div>
      <vue-infinite-viewer
        class="viewer"
        ref="viewer"
        v-bind="viewerOptions"
        @scroll.once="getInstance"
        >
        <div class="viewport">
          <div class="target1">Vue Moveable</div>
          <VueMoveable
            ref="moveable"
            className="moveable"
            v-bind:target="['.target1']"
            v-bind:draggable="true"
            v-bind:scalable="true"
            v-bind:rotatable="true"
            @drag="onDrag"
            @scale="onScale"
            @rotate="onRotate"
          />
        </div>
      </vue-infinite-viewer>
      
    </div>
    <div class="right">

    </div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, onUnmounted, reactive, ref } from "vue";
import InfiniteViewer , { InfiniteViewerOptions, OnPinch, OnDrag, OnScroll } from "infinite-viewer";
import { VueInfiniteViewer } from "vue3-infinite-viewer";
import { ReloadOutlined } from "@ant-design/icons-vue";
// import Moveable from "moveable";
import VueMoveable, { MoveableOptions } from "vue3-moveable";
import Guides from "@scena/guides";
import Gesto from "gesto";

let ctrlDown = false;
let guideHorizontal: Guides;
let guideVertical: Guides;
let infiniteViewer: InfiniteViewer;
let moveable;
let getso: Gesto;

const viewerOptions = reactive<Partial<InfiniteViewerOptions>>({
  zoom: 1,
  rangeX: [-1000, 1000],
  rangeY: [-1000, 1000],
  usePinch: true,
  maxPinchWheel: 10,
});

const moveableOptions = reactive<Partial<MoveableOptions>>({

});

const ctrlKeyDownHandle = (event: KeyboardEvent) => {
    if(event.code === "ControlLeft"){
        ctrlDown = true;
    }
};

const ctrlKeyUpHandle = (event: KeyboardEvent) => {
  ctrlDown = false;
};

const resizeHandle = () => {
  guideHorizontal.resize();
  guideVertical.resize();
};

const recoverViewer = () => {
  // 点击左上角recoverBtn后让infiniteViewer的缩放和viewport的位置回到最初的样式
  infiniteViewer.setZoom(1);
  infiniteViewer.scrollCenter();
  guideHorizontal.setState({scrollPos: infiniteViewer.getScrollLeft(), zoom: 1});
  guideVertical.setState({scrollPos: infiniteViewer.getScrollTop(), zoom: 1});
};

function onDrag(e) {
  console.log(e);
  e.target.style.transform = e.transform;
};

function onScale({ target, drag }) {
  target.style.transform = drag.transform;
};

function onRotate({ target, drag }) {
  target.style.transform = drag.transform;
};

onMounted(() => {
  // 初始化两个guide
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

  // 初始化moveable
  // moveable = new Moveable(document.querySelector(".viewport"), moveableOptions);
  moveable = ref();
  console.log(moveable)
  window.addEventListener("resize", resizeHandle);
  window.addEventListener("keyup", ctrlKeyUpHandle);
  window.addEventListener("keydown", ctrlKeyDownHandle);
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
    guideHorizontal.setState({ zoom: e.zoom, scrollPos: infiniteViewer.getScrollLeft() });
    guideVertical.setState({ zoom: e.zoom, scrollPos: infiniteViewer.getScrollTop() });
  });

  infiniteViewer.on("scroll", (e: OnScroll) => {
    // infiniteViewer的滚动处理，会带动guide的滚动
    // 拖拽事件也会触发这个回调函数
    guideHorizontal.scroll(e.scrollLeft);
    guideVertical.scroll(e.scrollTop);
  });

  getso = new Gesto(infiniteViewer.getContainer());
  getso.on("drag", (e: OnDrag) => {
    // 这里要对画布拖拽进行判断，看是否按下了ctrlleft，以免和moveable的拖拽事件冲突
    if(!ctrlDown){
      return;      
    }
    infiniteViewer.scrollBy(-1 * e.deltaX, -1 * e.deltaY);
  })
}

onBeforeUnmount(() => {
  getso.unset();
  infiniteViewer.off();
  infiniteViewer.destroy();
  guideHorizontal.destroy();
  guideVertical.destroy();
  window.removeEventListener("resize", resizeHandle);
  window.removeEventListener("keyup", ctrlKeyUpHandle);
  window.removeEventListener("keydown", ctrlKeyDownHandle);
  // 这里要记录一些图表的数据
});

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
      > .recoverBtn{
        width: 30px;
        height: 30px;
        position: absolute;
        z-index: 10;
        line-height: 30px;
        cursor: pointer;
        background: #000;
        color: white
      }
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
        height: calc(100% - 30px);
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
