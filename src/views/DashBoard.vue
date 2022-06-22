<template>
  <div class="mainbox">
    <div class="left" ref="viewer">

    </div>
    <div class="editorbox">
      <reload-outlined
        class="recoverBtn"
        title="恢复画布"
        @click="resetViewer"
      />
      <div class="guide horizontal"></div>
      <div class="guide vertical"></div>
      <vue-infinite-viewer
        ref="Viewer"
        class="viewer"
        v-bind="viewerOptions"
        @scroll.once="getInstance"
        >
        <div class="viewport">
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
      
    </div>
    <div class="right">
      <CanvasConfigForm></CanvasConfigForm>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ReloadOutlined } from "@ant-design/icons-vue";
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, Ref, ref } from "vue";
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

let ctrlDown = false;
let guideHorizontal: Ref<Guides> = useGuide(".guide.horizontal", "horizontal");
let guideVertical: Ref<Guides> = useGuide(".guide.vertical", "vertical");

let infiniteViewer: InfiniteViewer;
let projectId = ref<string>("");
let moveable = ref<VueMoveable>();
let Viewer = ref();
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

// infinite-viewer的无状态的（暂定），每次进来的样式都是一样的
const viewerOptions = reactive<Partial<InfiniteViewerOptions>>({
  rangeX: [-1000, 1000],
  rangeY: [-1000, 1000],
  usePinch: true,
  maxPinchWheel: 10,
});

// moveable本身是无状态的
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

// 点击切换moveable选中的元素
const changeTarget = ({target}) => {
  if( target.getAttribute("data-type") === "moveBox"){
    moveableOptions.target = `.${target.className}`;
  } else {
    moveableOptions.target = "";
  }
}

// 点击左上角recoverBtn后让infiniteViewer的缩放和viewport的位置回到最初的样式
const resetViewer = () => {
  infiniteViewer.setZoom(1);
  infiniteViewer.scrollCenter();
  guideHorizontal.value.setState({scrollPos: infiniteViewer.getScrollLeft(), zoom: 1});
  guideVertical.value.setState({scrollPos: infiniteViewer.getScrollTop(), zoom: 1});
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

onBeforeMount(() => {
  projectId.value = router.currentRoute.value.params.projectId as string;
  getUserProjectsBasic("/user/projectsBasic", projectId.value)
    .then(({ data }) => {
      console.log(data);
    });
})

onMounted(() => {
  moveableOptions.elementGuidelines = [".viewport", ".target_1", ".target_2"]
  moveableOptions.snapContainer = document.querySelector(".viewport") as HTMLElement;
});


// 页面在刚刚刷新进来的时候，会触发一次原始的scroll事件，利用这个事件来获取infiniteViewer的实例
const getInstance = ({currentTarget}) => {
  infiniteViewer = currentTarget;

  // 让viewport剧中，同时让guide也跟随到相应位置
  infiniteViewer.setZoom(1);
  infiniteViewer.scrollCenter();
  guideHorizontal.value.setState({scrollPos: infiniteViewer.getScrollLeft()});
  guideVertical.value.setState({scrollPos: infiniteViewer.getScrollTop()});
  
  infiniteViewer.on("pinch", (e: OnPinch) => {
    // ctrl + 鼠标滚轮的缩放处理
    infiniteViewer.setZoom(e.zoom);
    guideHorizontal.value.setState({ zoom: e.zoom, scrollPos: infiniteViewer.getScrollLeft() });
    guideVertical.value.setState({ zoom: e.zoom, scrollPos: infiniteViewer.getScrollTop() });
  });

  infiniteViewer.on("scroll", (e: OnScroll) => {
    // infiniteViewer的滚动处理，会带动guide的滚动
    // 拖拽事件也会触发这个回调函数
    guideHorizontal.value.scroll(e.scrollLeft);
    guideVertical.value.scroll(e.scrollTop);
  });

  // 添加点击事件的委托监听
  infiniteViewer.getContainer().addEventListener("click", changeTarget);
  
  // 初始化拖拽手势
  // getso = new Gesto(infiniteViewer.getContainer());
  // console.log(infiniteViewer.getContainer())
  // getso.on("drag", (e: OnDrag) => {
  //   // 这里要对画布拖拽进行判断，看是否按下了ctrl-left，以免和moveable的拖拽事件冲突
  //   if(!ctrlDown){
  //     return;      
  //   }
  //   infiniteViewer.scrollBy(-1 * e.deltaX, -1 * e.deltaY);
  // })
}

onBeforeUnmount(() => {
  // infiniteViewer.off();
  // infiniteViewer.destroy();
  // guideHorizontal.destroy();
  // guideVertical.destroy();
  // infiniteViewer.getContainer().removeEventListener("click", changeTarget);
  // window.removeEventListener("resize", guideResizeHandle);

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
          > [data-type="moveBox"] {
            color: white;
            background-color: cadetblue;
            position: absolute;
          }
        }
      }

    }
  }
</style>
