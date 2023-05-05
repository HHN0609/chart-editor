<template>
<div class="container"
    :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${resultInfo.colNum}, ${gridWidth}px)`,
        gridTemplateRows: `repeat(${resultInfo.rowNum}, ${gridHeight}px)` 
    }"
>
    <div v-for="(result, index) in resultInfo.result" style="overflow: hidden; border: 1px dashed black;">
        <AutoVega
            :dataSource="props.dataSource"
            :X_axis="result.X_axis"
            :Y_axis="result.Y_axis"
            :shape="props.shape"
            :size="props.size"
            :color="props.color"
            :opacity="props.opacity"
            :markType="props.markType"
            :stack="props.stack"
            :isAggregation="props.isAggregation"
            :chartId="index"
        ></AutoVega>
    </div>
</div>
</template>

<script setup lang="ts">
import { ListType, MarkType } from "@/stores/chartData";
import { computed, nextTick, ref, watch } from "vue";
import useInputData from "@/stores/inputData";
import useChartData from "@/stores/chartData"
import { analysisField } from "./analysisField";
import AutoVega from "./autoVega.vue"

const inputData = useInputData();

type  AxisType = ListType;
type Legend = ListType;

const props = defineProps<{
    dataSource: any[],
    X_axis:  AxisType[],
    Y_axis:  AxisType[],
    shape: Legend,
    opacity: Legend,
    color: Legend,
    size: Legend,
    markType: MarkType,
    stack?: "normalize" | "" | "zero" | "center",
    isAggregation: boolean
}>();

const resultInfo = computed(() => analysisField(props.X_axis, props.Y_axis, inputData.dataColumnsInfo));

let gridWidth = ref<number>(200);
let gridHeight = ref<number>(200);

watch(resultInfo, () => {
    nextTick(() => {
        setTimeout(() => {
            let chart0 = document.getElementById("chart0");
            if(chart0) {
                let {width, height} = chart0.getBoundingClientRect();
                console.log(width, height);
                gridHeight.value = height;
                gridWidth.value = width;
            }
        }, 0); 
    });
});

</script>

<style scoped lang="less">
.container {
    > .chartGrids {

    }
}
</style>