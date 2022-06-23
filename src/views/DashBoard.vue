<template>
  <div class="mainbox">
    <div class="left">
    </div>
    <div class="editorbox">
      <reload-outlined
        class="resizeBtn"
        title="恢复画布"
        @click="resetViewer"
      />
      <div class="guide horizontal"></div>
      <div class="guide vertical"></div>
      <vue-infinite-viewer
        ref="Viewer"
        class="viewer"
        :style="{ backgroundColor: projectGlobalInfo.bg_color }"
        v-bind="viewerOptions"
        >
        <div class="viewport"
          :style="{
            backgroundColor: projectGlobalInfo.viewport_color,
            width: projectGlobalInfo.width+'px',
            height: projectGlobalInfo.height+'px'
          }">
          <div
            data-type="moveBox"
            v-for="item in moveableData" 
            :class="item.className"
            :key="item.className"
            :style="item.style"
          >
            {{ item.text }}
          </div>
          <VueMoveable
            ref="moveable"
            v-bind="moveableOptions"
            @drag="onDrag"
            @resize="onResize"
            @rotate="onRotate"
            @dragEnd="onDragEnd"
            @resizeEnd="onResizeEnd"
            @rotateEnd="onRotateEnd"
          />
        </div>
      </vue-infinite-viewer>
      <div class="bottomBar">
        <a-input class="zoomInput" v-model:value="infiniteViewZoom" size="small" suffix="%" type="number" :min="10" :max="200"></a-input>
        <a-slider class="zoomSlider" v-model:value="infiniteViewZoom" :tip-formatter="tipFormatter" :min="10" :max="200"></a-slider>
        <h3>zoom: </h3>
      </div>
    </div>
    <div class="right">
      <TopBotton></TopBotton>
      <CanvasConfigForm></CanvasConfigForm>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ReloadOutlined } from "@ant-design/icons-vue";
import { nextTick, onBeforeUnmount, onMounted, reactive, Ref, ref, watch, h, render, provide, inject } from "vue";
import InfiniteViewer , { InfiniteViewerOptions, OnPinch, OnDrag, OnScroll } from "infinite-viewer";
import { VueInfiniteViewer } from "vue3-infinite-viewer";
import VueMoveable, { MoveableOptions, OnDragEnd, OnResize, OnResizeEnd, OnRotate, OnRotateEnd } from "vue3-moveable";
import CanvasConfigForm from "@/components/sideFroms/CanvasConfigForm.vue";
import { getUserProjectsBasic } from "@/apis";
import { getTargetIndex } from "@/utils";
import Guides from "@scena/guides";
import router from "@/router";
import useGuide from "@/hooks/useGuide";
import useDragGetso from "@/hooks/useDragGetso";
// import useInfiniteView from "@/hooks/useInfiniteView";
import { computed } from "@vue/reactivity";
import TopBotton from "@/components/sideFroms/TopBotton.vue";
type BasicInfo = {
  bg_color: string,
  height: number,
  init_zoom: number,
  project_id: string,
  viewport_color: string,
  width: number,
}
let guideHorizontal: Ref<Guides> = useGuide(".guide.horizontal", "horizontal");
let guideVertical: Ref<Guides> = useGuide(".guide.vertical", "vertical");
let Viewer = ref();
let infiniteViewer: InfiniteViewer;
let projectId = "";
let moveable = ref<VueMoveable>();
let projectGlobalInfo = reactive<Partial<BasicInfo>>({
  width: 800,
  height: 450,
});
provide("projectGlobalInfo", projectGlobalInfo);
useDragGetso(".viewer", (e: OnDrag) => {
    infiniteViewer.scrollBy(-1 * e.deltaX, -1 * e.deltaY);
});

// moveable包裹的数据，是有状态的，下次进来要还原的
const moveableData = [
  {
    className: "target_0",
    positionInfo: "",
    text: "vue22222222222222222222",
    style: {
      width: "160px",
      height: "130px",
      transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) translate(123px, 139px)"
    }
  },
  {
    className: "target_1",
    positionInfo: "",
    text: "vue3",
    style: {
      width: "200px",
      height: "200px",
      transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) translate(0px, 0px)"
    }
  }
];

// infinite-viewer的zoom是有状态的
const viewerOptions = reactive<Partial<InfiniteViewerOptions>>({
  rangeX: [-1000, 1000],
  rangeY: [-1000, 1000],
  usePinch: true,
  maxPinchWheel: 10,
  zoom: 1,
});

// moveable只有一个bounds有状态
const moveableOptions = reactive<Partial<MoveableOptions>>({
  target: "",
  draggable: true,
  rotatable: true,
  resizable: true,
  snapContainer: null,
  snappable: true,
  snapDirections: true,
  elementSnapDirections: true,
  isDisplayInnerSnapDigit: true,
  isDisplaySnapDigit: true,
  bounds: { left: 0, right: 800, top: 0, bottom: 450},
});

let infiniteViewZoom = computed({
  get: () => {
    return viewerOptions.zoom * 100;
  }, 
  set: (newValue) => {
    viewerOptions.zoom = newValue / 100;
  }
})

watch(
  () => viewerOptions.zoom,
  (newZoom: number) => {
    nextTick(() => {
      guideHorizontal.value.setState({scrollPos: infiniteViewer.getScrollLeft(), zoom: newZoom});
      guideVertical.value.setState({scrollPos: infiniteViewer.getScrollTop(), zoom: newZoom});
    })
  }
);

watch(
  [() => projectGlobalInfo.height, () => projectGlobalInfo.width],
  ([newH, newW]) => {
    console.log(newH, newW);
    moveableOptions.bounds.bottom = newH;
    moveableOptions.bounds.right = newW;
  }
);

// 点击切换moveable选中的元素
const changeTarget = ({target}) => {
  if( target.getAttribute("data-type") === "moveBox"){
    moveableOptions.target = `.${target.className}`;
  } else {
    moveableOptions.target = "";
    // 展示viewport的配置项
  }
}

// 点击左上角recoverBtn后让infiniteViewer的缩放和viewport的位置回到最初的样式
const resetViewer = () => {
  viewerOptions.zoom = 1;
  infiniteViewer.scrollCenter();
};

function onDrag({target, transform}) {
  target.style.transform = transform;
};

function onResize({target, width, height, drag}: OnResize) {
  target.style.width = `${width}px`;
  target.style.height = `${height}px`;
  // 这行代码是为了让缩放的origin在对角线位置
  target.style.transform = drag.transform;
};

function onRotate({ target, drag }: OnRotate) {
  target.style.transform = drag.transform;
};

// end函数主要用来改变状态，并给服务端回传数据的
function onDragEnd({lastEvent}: OnDragEnd){
  if(!lastEvent) return;
  const index = getTargetIndex(moveableOptions.target as string);
  moveableData[index].style.transform = lastEvent.transform;
}

function onResizeEnd({lastEvent}: OnResizeEnd){
  const index = getTargetIndex(moveableOptions.target as string);
  moveableData[index].style.width = `${lastEvent.width}px`;
  moveableData[index].style.height = `${lastEvent.height}px`;
  moveableData[index].style.transform = lastEvent.drag.transform;
}

function onRotateEnd({lastEvent}: OnRotateEnd){
  const index = getTargetIndex(moveableOptions.target as string);
  moveableData[index].style.transform = lastEvent.transform;
}

onMounted(() => {
  // 拿到infiniteViewer的实例
  infiniteViewer = Viewer.value.infiniteViewer;

  projectId = router.currentRoute.value.params.projectId as string;
  getUserProjectsBasic("/user/projectsBasic", projectId)
    .then(({ data }) => {
      Object.assign(projectGlobalInfo, data.message);
      viewerOptions.zoom = projectGlobalInfo.init_zoom;
      nextTick(() => {
        infiniteViewer.scrollCenter();
        guideHorizontal.value.setState({scrollPos: infiniteViewer.getScrollLeft()});
        guideVertical.value.setState({scrollPos: infiniteViewer.getScrollTop()});
      })
    });
  
  infiniteViewer.on("pinch", (e: OnPinch) => {
    // ctrl + 鼠标滚轮的缩放处理
    viewerOptions.zoom = e.zoom;
  });

  infiniteViewer.on("scroll", (e: OnScroll) => {
    // infiniteViewer的滚动处理，会带动guide的滚动
    // 拖拽事件也会触发这个回调函数
    guideHorizontal.value.scroll(e.scrollLeft);
    guideVertical.value.scroll(e.scrollTop);
  });

  // 添加点击事件的委托监听
  infiniteViewer.getContainer().addEventListener("click", changeTarget);
})

onMounted(() => {
  moveableOptions.elementGuidelines = [".viewport", ".target_1", ".target_2"]
  // moveableOptions.snapContainer = document.querySelector(".viewport") as HTMLElement;
  // let vNode = h(CanvasConfigForm, {
  //   onClick: () => { console.log("clicked!") },
  // });
  // console.log(vNode)
  // render(vNode, document.querySelector(".d1"));
});

onBeforeUnmount(() => {
  // 这里要记录一些图表的数据，回传给服务端
});

function tipFormatter (value: number) {
  return `${value}%`;
};
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
      > .resizeBtn{
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
        height: calc(100% - 60px);
        left: 30px;
        top: 30px;
        border: black 2px solid;
        overflow: hidden;
        .viewport {
          overflow: hidden;
          // width: 800px;
          // height: 450px;
          > [data-type="moveBox"] {
            color: white;
            background-color: cadetblue;
            position: absolute;
          }
        }
      }
      > .bottomBar{
        width: 100%;
        height: 30px;
        padding: 0 20px;
        background-color: gainsboro;
        position: absolute;
        bottom: 0px;
        border-left: black 2px solid;
        border-right: black 2px solid;
        overflow: hidden;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        > .zoomSlider{
          width: 100px;
        }
        > .zoomInput{
          height: 25px;
          width: 80px;
        }
      }
    }
  }
</style>
