<template>
<div class="container"
    :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${resultInfo.colNum}, 500px)`,
        gridTemplateRows: `repeat(${resultInfo.rowNum}, 500px)` 
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
    <!-- <div v-for="n in resultInfo.result.length" :key="n.toString()" style="overflow: hidden; border: 1px solid black;">
        
    </div> -->
</div>
</template>

<script setup lang="ts">
import { ListType, MarkType } from "@/stores/chartData";
import { computed, watch } from "vue";
import useInputData from "@/stores/inputData";
import useChartData from "@/stores/chartData"
import { analysisField } from "./analysisField";
import AutoVega from "./autoVega.vue"

const inputData = useInputData();
const chartData = useChartData();

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

watch(resultInfo, (info) => {
    console.log(info);
});

</script>

<style scoped lang="less">
.container {
    > .chartGrids {

    }
}
</style>