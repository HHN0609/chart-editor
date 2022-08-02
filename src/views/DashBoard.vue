<template>
    <LoginPage :show="showLoading" size="large" description="Loading……"></LoginPage>
    <div class="dashBoardContainer">
      <div class="left">
        <ChartMenu></ChartMenu>
        <SortList />
      </div>
      <div class="editorbox">
        <reload-outlined class="resizeBtn" title="恢复画布" @click="resetViewer" />
        <div class="guide horizontal"></div>
        <div class="guide vertical"></div>
        <vue-infinite-viewer ref="Viewer" class="viewer" :style="{ backgroundColor: projectInfo.bgColor }" v-bind="viewerOptions">
          <div class="pngDom" style="width:fit-content;">
            <div
              class="viewport"
              :style="{
                backgroundColor: projectInfo.viewportColor,
                width: projectInfo.width + 'px',
                height: projectInfo.height + 'px',
              }"
            >
              <div
                v-for="(item, index) in projectInfo.chartsDatas"
                :data-uid="item.uid"
                :key="item.uid"
                :class="`target_${index}`"
                :style="{
                  width: `${item.basicData.width}px`,
                  height: `${item.basicData.height}px`,
                  transform: projectInfo.transform(item.uid),
                  zIndex: item.basicData.index + 10,
                }"
              >
                <!-- 图表组件的入口 -->
                <component :is="CHARTS[item.basicData.type]" :uid="item.uid" :sourceData="item.sourceData" :optionsData="item.optionsData"></component>
              </div>
              <VueMoveable
                ref="moveable"
                v-bind="moveableOptions"
                :target="projectInfo.currTarget"
                @drag="onDrag"
                @resize="onResize"
                @rotate="onRotate"
                @dragEnd="onDragEnd"
                @resizeEnd="onResizeEnd"
                @rotateEnd="onRotateEnd"
                :style="{ zIndex: projectInfo.currChartData?.basicData.index + 10 || 0 }"
              />
            </div>
          </div>
        </vue-infinite-viewer>
        <div class="bottomBar">
          <Input class="zoomInput" v-model:value.lazy.number="infiniteViewZoom" size="small" suffix="%" type="number" :min="10" :max="200"></Input>
          <Slider class="zoomSlider" v-model:value.number="infiniteViewZoom" :tip-formatter="tipFormatter" :min="10" :max="200"></Slider>
          <h3>zoom:</h3>
        </div>
      </div>
      <div class="right">
        <TopBotton style="position: sticky; top: 0px; z-index: 10"></TopBotton>
        <div class="tabs">
          <Tabs v-model:activeKey="tabActiveKey" animated>
            <TabPane key="1" tab="Config">
              <ChartConfigForm></ChartConfigForm>
            </TabPane>
            <TabPane key="2" tab="Data">
              <CodeMirror></CodeMirror>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { Tabs, TabPane, Input, Slider } from "ant-design-vue";
import { ReloadOutlined } from "@ant-design/icons-vue";
import { nextTick, onMounted, reactive, Ref, ref, watch, onBeforeMount, onUnmounted } from "vue";
import InfiniteViewer, { InfiniteViewerOptions, OnPinch, OnDrag, OnScroll } from "infinite-viewer";
import { VueInfiniteViewer } from "vue3-infinite-viewer";
import VueMoveable, { MoveableOptions, OnDragEnd, OnResize, OnResizeEnd, OnRotate, OnRotateEnd } from "vue3-moveable";
import ChartConfigForm from "@/components/rightSideForms/ChartConfigForm.vue";
import { getUserChartDetailInfo, getUserProjectsBasic } from "@/apis";
import { destructTransform, getTargetIndex } from "@/utils";
import Guides from "@scena/guides";
import router from "@/router";
import useGuide from "@/hooks/useGuide";
import useDragGetso from "@/hooks/useDragGetso";
import { computed } from "@vue/reactivity";
import TopBotton from "@/components/rightSideForms/TopBotton.vue";
import ProjectInfo from "@/stores/projectInfo";
import ChartMenu from "@/components/leftSideForms/ChartMenu.vue";
import SortList from "@/components/leftSideForms/SortList.vue";
import { CHARTS } from "@/charts/index";
import CodeMirror from "@/components/rightSideForms/CodeMirror.vue";
import LoginPage from "@/views/LoadingPage.vue";
const projectInfo = ProjectInfo();

let showLoading = ref<boolean>(true);
let tabActiveKey = ref("1");
let guideHorizontal: Ref<Guides> = useGuide(".guide.horizontal", "horizontal");
let guideVertical: Ref<Guides> = useGuide(".guide.vertical", "vertical");
let Viewer = ref();
let infiniteViewer: InfiniteViewer;
let moveable = ref<VueMoveable>();

useDragGetso(".viewer", (e: OnDrag) => {
  infiniteViewer.scrollBy(-1 * e.deltaX, -1 * e.deltaY);
});

// infinite-viewer的zoom是有状态的
// infinite-viewer的zoom由这里的zoom控制
const viewerOptions = reactive<Partial<InfiniteViewerOptions>>({
  rangeX: [-1000, 1000],
  rangeY: [-1000, 1000],
  usePinch: true,
  maxPinchWheel: 10,
  zoom: 1,
});

// moveable只有一个bounds有状态
const moveableOptions = reactive<Partial<MoveableOptions>>({
  draggable: true,
  rotatable: true,
  resizable: true,
  snapContainer: null,
  snappable: true,
  snapDirections: true,
  elementSnapDirections: true,
  isDisplayInnerSnapDigit: true,
  isDisplaySnapDigit: true,
  bounds: { left: 0, right: 800, top: 0, bottom: 450 },
});

let infiniteViewZoom = computed({
  get: () => {
    return viewerOptions.zoom * 100;
  },
  set: (newValue) => {
    viewerOptions.zoom = newValue / 100;
  },
});

watch(
  () => viewerOptions.zoom,
  (newZoom: number) => {
    // pinia中的initZoom并不提供响应式绑定，只是暂存数据的作用
    projectInfo.initZoom = newZoom;
    nextTick(() => {
      guideHorizontal.value.setState({ scrollPos: infiniteViewer.getScrollLeft(), zoom: newZoom });
      guideVertical.value.setState({ scrollPos: infiniteViewer.getScrollTop(), zoom: newZoom });
    });
  }
);

// viewport的长和宽发生了变化，对应的viewport的边界也发生变化
// 首次渲染会自动触发一次回调函数
watch([() => projectInfo.height, () => projectInfo.width], ([newH, newW]) => {
  moveableOptions.bounds.bottom = newH;
  moveableOptions.bounds.right = newW;
});

// 点击切换moveable选中的元素
const changeTarget = (e) => {
  for (let el of e.path) {
    if (el === infiniteViewer.getWrapper()) {
      projectInfo.$patch({
        currTarget: "",
      });
      return;
    }
    if (el.getAttribute("data-uid")) {
      projectInfo.$patch({
        currTarget: `.${el.className}`,
        currChartIndex: getTargetIndex(el.className),
      });
      return;
    }
  }
};

// 点击左上角recoverBtn后让infiniteViewer的缩放和viewport的位置回到最初的样式
const resetViewer = () => {
  viewerOptions.zoom = 1;
  infiniteViewer.scrollCenter();
};

function onDrag({ target, transform }) {
  target.style.transform = transform;
}

function onResize({ target, width, height, drag }: OnResize) {
  target.style.width = `${width}px`;
  target.style.height = `${height}px`;
  target.style.transform = drag.transform;
}

function onRotate({ target, drag }: OnRotate) {
  target.style.transform = drag.transform;
}

// end函数主要用来改变状态，并给服务端回传数据的
function onDragEnd({ lastEvent }: OnDragEnd) {
  if (!lastEvent) return;
  let t = destructTransform(lastEvent.transform);
  projectInfo.currChartData.basicData.x = t.x;
  projectInfo.currChartData.basicData.y = t.y;
}

function onResizeEnd({ lastEvent }: OnResizeEnd) {
  if (!lastEvent) return;
  projectInfo.currChartData.basicData.height = lastEvent.height;
  projectInfo.currChartData.basicData.width = lastEvent.width;

  let t = destructTransform(lastEvent.drag.transform);
  projectInfo.currChartData.basicData.x = t.x;
  projectInfo.currChartData.basicData.y = t.y;
  projectInfo.currChartData.basicData.rotate = t.rotate;
}

function onRotateEnd({ lastEvent }: OnRotateEnd) {
  if (!lastEvent) return;
  let t = destructTransform(lastEvent.transform);
  projectInfo.currChartData.basicData.rotate = t.rotate;
}

// 获取数据
onBeforeMount(() => {
  // 获取project的信息
  getUserProjectsBasic("/user/projectsBasic", router.currentRoute.value.params.projectId as string)
    .then(({ data }) => {
      projectInfo.$patch({
        width: data.message.width,
        height: data.message.height,
        initZoom: data.message.init_zoom,
        projectId: data.message.project_id,
        bgColor: data.message.bg_color,
        viewportColor: data.message.viewport_color,
      });
      viewerOptions.zoom = projectInfo.initZoom;
      nextTick(() => {
        infiniteViewer.scrollCenter();
        guideHorizontal.value.setState({ scrollPos: infiniteViewer.getScrollLeft() });
        guideVertical.value.setState({ scrollPos: infiniteViewer.getScrollTop() });
      });
    })
    .then(() => {
      getUserChartDetailInfo("/user/chartDetailInfo", projectInfo.projectId).then(({ data }) => {
        if (data.message && data.message.length) {
          let arr = data.message.map(({ chart_detail }) => {
            return JSON.parse(chart_detail);
          });
          projectInfo.chartsDatas.push(...arr);
        }
        showLoading.value = false;
      });
    });
});

onMounted(() => {
  // 拿到infiniteViewer的实例
  infiniteViewer = Viewer.value.infiniteViewer;

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
  infiniteViewer.getWrapper().addEventListener("click", changeTarget, {
    passive: true
  });
});

onMounted(() => {
  moveableOptions.elementGuidelines = [".viewport", ".target_0"];
  // moveableOptions.snapContainer = document.querySelector(".viewport") as HTMLElement;
});

watch(
  () => projectInfo.chartsDatas.length,
  (newLength) => {
    let newArr = Array.from({ length: newLength }).map((item, index) => {
      return `.target_${index}`;
    });
    newArr.unshift(".viewport");
    moveableOptions.elementGuidelines = newArr;
  }
);

onUnmounted(() => {
  projectInfo.$reset();
});

function tipFormatter(value: number) {
  return `${value}%`;
}
</script>

<style lang="less">
.dashBoardContainer {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  > .left {
    background: rgb(255, 255, 255);
    width: 200px;
    flex-basis: 200px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
  > .right {
    background-color: rgb(255, 255, 255);
    width: 300px;
    flex-basis: 300px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 5px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(96, 96, 96, 0.4);
        box-shadow: inset006pxrgba(0, 0, 0, 0.5);
      }
    > .tabs {
      > .ant-tabs.ant-tabs-top {
        > .ant-tabs-nav {
          margin: 0;
          > .ant-tabs-nav-wrap {
            > .ant-tabs-nav-list {
              justify-content: center;
              > .ant-tabs-tab {
                width: 80px;
                display: flex;
                justify-content: center;
                margin: 0px;
              }
            }
          }
        }
        > .ant-tabs-content-holder {
          .container {
            .ant-collapse.ant-collapse-icon-position-left {
              > .ant-collapse-item {
                > .ant-collapse-header {
                  padding-top: 8px;
                  padding-bottom: 8px;
                }
              }
            }
          }
        }
      }
    }
  }
  > .editorbox {
    // 中间撑满
    flex-grow: 1;
    height: inherit;
    overflow: hidden;
    height: 100vh;
    position: relative;
    > .resizeBtn {
      width: 30px;
      height: 30px;
      position: absolute;
      z-index: 10;
      line-height: 30px;
      cursor: pointer;
      background: #000;
      color: white;
    }
    .guide {
      position: absolute;
      &.horizontal {
        width: 100%;
      }
      &.vertical {
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
        > [data-uid] {
          color: white;
          position: absolute;
        }
      }
    }
    > .bottomBar {
      width: 100%;
      height: 30px;
      padding: 0 20px;
      background-color: rgb(255, 255, 255);
      position: absolute;
      bottom: 0px;
      border-left: black 2px solid;
      border-right: black 2px solid;
      overflow: hidden;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      > .zoomSlider {
        width: 100px;
      }
      > .zoomInput {
        height: 25px;
        width: 80px;
      }
    }
  }
}
</style>
