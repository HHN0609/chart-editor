<template>
  <div class="container">
    <div @click="onSave">
      <loading-outlined v-if="saving" />
      <save-outlined v-else />

      <span v-if="saving">saving</span>
      <span v-else>save</span>
    </div>
    <div @click="$emit('display')">
      <fund-projection-screen-outlined />
      <span>display</span>
    </div>
    <div @click="onExport">
      <file-image-outlined />
      <span>export</span>
    </div>
    <div @click="onExit">
      <export-outlined />
      <span>exit</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { SaveOutlined, FileImageOutlined, ExportOutlined, FundProjectionScreenOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import ProjectInfo from "@/stores/projectInfo";
import { putUserChartDetailInfo, putUserProjectsBasic } from "@/apis";
import { message } from "ant-design-vue";
import router from "@/router";
import html2canvas from "html2canvas";
// import { message } from "ant-design-vue";
const projectInfo = ProjectInfo();
let saving = ref(false);
const onSave = () => {
  saving.value = true;
  let req = putUserProjectsBasic("/user/projectsBasic", projectInfo.projectId, projectInfo.width, projectInfo.height, projectInfo.initZoom, projectInfo.bgColor, projectInfo.viewportColor);
  let reqArr = projectInfo.chartsDatas.map((data) => {
    return putUserChartDetailInfo("/user/chartDetailInfo", projectInfo.projectId, data.uid, JSON.stringify(data));
  });
  reqArr.unshift(req);
  Promise.all(reqArr).then(() => {
    message.success("Saved", 1).then(() => {
      saving.value = false;
    });
  });
};

const onExit = () => {
  let trigger = window.confirm("It will lost your progress, if you have't saved.");
  if (trigger) {
    router.replace({ name: "MyProject" });
  }
};
const saveHandle = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    onSave();
  }
};
onMounted(() => {
  window.addEventListener("keydown", saveHandle);
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", saveHandle);
});

const onExport = () => {
  const dom = document.querySelector(".pngDom") as HTMLElement;
  html2canvas(dom)
    .then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("png", 1);
      link.download = `${projectInfo.currChartData.uid}.png`;
      link.click();
    })
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 50px;
  display: flex;
  background-color: rgb(255, 255, 255);
  justify-content: space-evenly;
  align-items: center;
  border-bottom: black 1px solid;
  > div {
    flex-basis: calc(100% / 4);
    font-size: x-large;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    cursor: pointer;
    > span {
      font-size: small;
    }
    &:hover {
      color: #1890ff;
      font-size: larger;
    }
  }
}
</style>
