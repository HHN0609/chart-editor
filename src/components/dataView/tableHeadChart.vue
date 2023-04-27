<template>
    <div id="chart" ref="chart"></div>
</template>

<script setup lang="ts">
import { WatchStopHandle, computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
// import * as vegeLite from 'vega-lite';
import vegaEmbed from 'vega-embed';
let chart = ref();
let stop: WatchStopHandle;
const props = defineProps<{
    colName: string,
    data: any[]
}>();

onMounted(() => {
  stop = watchEffect(() => {
    vegaEmbed(chart.value, {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: {
        values: props.data
      },
      height: 100,
      width: 200,
      mark: { type: 'bar', tooltip: {content: "encoding"}},
      encoding: {
        x: {field: 'key', type: 'nominal', axis: {title: "", tickMinStep: 1, ticks: false, labels: false}},
        y: {field: 'count', type: 'quantitative',  axis: {title: "", tickMinStep: 1}},
      }
    })
  });    
});

onUnmounted(() => {
  stop();
});

</script>

<style scoped lang="less">
#chart {
  flex-grow: 1;
  overflow: hidden;
  padding: 0;
}
</style>
