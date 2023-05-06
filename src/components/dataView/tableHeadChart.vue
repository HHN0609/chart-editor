<template>
    <div id="headChart" ref="headChart"></div>
</template>

<script setup lang="ts">
import { WatchStopHandle, computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import vegaEmbed from 'vega-embed';
import { SemanticType } from "@/stores/inputData";

let stop: WatchStopHandle;
const props = defineProps<{
    fieldName: string,
    datas: any[],
    semanticType: SemanticType
}>();

let headChart = ref();

onMounted(() => {
  stop = watchEffect(() => {
    let mark = props.semanticType === "quantitative" ? "area" : "bar"
    let spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: {
        values: props.datas
      },
      height: 100,
      width: 200,
      mark: { type: mark, tooltip: {content: "encoding"}},
      encoding: {
        x: {field: 'key', type: props.semanticType, axis: {title: "", tickMinStep: 1, ticks: false, labels: false}},
        y: {field: 'count', type: 'quantitative',  axis: {title: "", tickMinStep: 1}},
      }
    };
    vegaEmbed(headChart.value, spec);
  });    
});

onUnmounted(() => {
  stop();
});

</script>

<style scoped lang="less">
#headChart {
  flex-grow: 1;
  padding: 0;
}
</style>
