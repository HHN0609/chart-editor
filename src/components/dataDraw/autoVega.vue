<template>

</template>

<script setup lang="ts">
import { aggregateMethod, ListType, MarkType } from "@/stores/chartData";
type axisType = {fieldName: string, aggregateMethod: aggregateMethod, id?: string};
type legendType = ListType;

const props = defineProps<{
    X_axis: axisType[],
    Y_axis: axisType[],
    shspe: legendType,
    opacity: legendType,
    color: legendType,
    size: legendType,
    markType: MarkType,
    stack?: "normalize" | null | "zero" | "center",
}>();
</script>

<style lang="less" scoped>

</style>