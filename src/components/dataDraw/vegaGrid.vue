<template>
<div class="container"
    :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${resultInfo.colNum}, 1fr)`,
        gridTemplateRows: `repeat(${resultInfo.rowNum}, 1fr)` 
    }"
>
    <div v-for="n in resultInfo.result.length">
        <AutoVega
            :dataSource="props.dataSource"
            :X_axis="resultInfo.result[n].X_axis"
            :Y_axis="resultInfo.result[n].Y_axis"
            :shape="props.shape"
            :size="props.size"
            :color="props.color"
            :opacity="props.opacity"
            :markType="props.markType"
            :stack="props.stack"
            :isAggregation="props.isAggregation"
            :chartId="n"
        ></AutoVega>
    </div>
</div>
</template>

<script setup lang="ts">
import { ListType, MarkType } from "@/stores/chartData";
import { computed, watch } from "vue";
import useInputData from "@/stores/inputData";
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

watch(resultInfo, (value) => {
    console.log(value.result.length);
});

</script>

<style scoped lang="less">
.container {
    > .chartGrids {

    }
}
</style>