<template>
    <div id="chart" ref="chart"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
// import * as vega from 'vega';
// import * as vegeLite from 'vega-lite';
import vegaEmbed from 'vega-embed';
let chart = ref();

const props = defineProps<{
    colName: string,
    data: any[]
}>();

onMounted(() => {
  watchEffect(() => {
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

</script>

<style scoped lang="less">
#chart {
  flex-grow: 1;
  overflow: hidden;
  padding: 0;
}
</style>
