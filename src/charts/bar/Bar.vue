// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="container" ref="chartDom"></div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import BarTransform from "./barTransform";
// import ProjectInfo from "@/stores/projectInfo";
// customOptions会被转化为echart的option
const props = defineProps(["sourceData", "optionsData", "uid"]);
let resizeObserver: ResizeObserver;
let chart: echarts.ECharts;
const chartDom = ref<HTMLElement>();
let option = BarTransform(props.optionsData, props.sourceData);
// const projectInfo = ProjectInfo();
watch([props.optionsData, props.sourceData], () => {
  // 侧边栏的变化回触发对应的customOption的变化， config变化后重新生成options
  option = BarTransform(props.optionsData, props.sourceData);
  option && chart.setOption(option);
});

onMounted(() => {
  chart = echarts.init(chartDom.value, {}, { renderer: "svg" });
  option && chart.setOption(option);
  // 用ResizeObserver来监听dom容器的尺寸变化,后续可以添加节流
  resizeObserver = new ResizeObserver(() => {
    chart.resize();
  });
  resizeObserver.observe(chartDom.value);
});
onBeforeUnmount(() => {
  resizeObserver.disconnect();
  chart.dispose();
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: inherit;
}
</style>
