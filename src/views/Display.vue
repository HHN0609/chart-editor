<template>
    <div
        class="viewport"
        :style="{
            backgroundColor: projectInfo.viewportColor,
            width: projectInfo.width + 'px',
            height: projectInfo.height + 'px',
        }"
    >
        <div
            v-for="(item) in projectInfo.chartsDatas"
            :data-uid="item.uid"
            :key="item.uid"
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
    </div>
</template>

<script lang="ts" setup>
import ProjectInfo from "@/stores/projectInfo";
import { CHARTS } from "@/charts";
import { onBeforeMount, onUnmounted } from "vue";
import { getUserChartDetailInfo, getUserProjectsBasic } from "@/apis";
import router from "@/router";
const projectInfo = ProjectInfo();
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
    })
    .then(() => {
      getUserChartDetailInfo("/user/chartDetailInfo", projectInfo.projectId).then(({ data }) => {
        if (data.message && data.message.length) {
          let arr = data.message.map(({ chart_detail }) => {
            return JSON.parse(chart_detail);
          });
          projectInfo.chartsDatas.push(...arr);
        }
      });
    });
});

onUnmounted(() => {
  projectInfo.$reset();
});
</script>

<style lang="less" scoped>
.viewport {
    overflow: hidden;
    > [data-uid] {
        color: white;
        position: absolute;
    }
}
</style>