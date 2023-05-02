<template>
<div class="container">
    <div id="chart" ref="chart"></div>
</div>
</template>

<script setup lang="ts">
import { ListType, MarkType, AggregateMethod } from "@/stores/chartData";
import { WatchStopHandle, computed, onMounted, onUnmounted, watchEffect, ref } from "vue";
import vegaEmbed from "vega-embed";
import useInputData from "@/stores/inputData";
import useChartData from "@/stores/chartData"
const inputData = useInputData();
const chartData = useChartData();

type  AxisType = ListType;
type Legend = ListType;
type VegaEncodingConfig = {
    field: string,
    title: string,
    type: "quantitative" | "nominal",
    aggregate?: AggregateMethod | null,
    axis?: any
}
type LegendTypes = "color" | "size" | "shape" | "opacity";

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
}>();

let stop: WatchStopHandle;

let chart = ref();

// 当前被激活的图标(当前编辑的)
const activeChart = computed(() => {
    return chartData.datas[chartData.activeIndex];
});

function generateTooltip(axis: "X_axis" | "Y_axis"): VegaEncodingConfig[] {
    return activeChart.value[axis].map(({fieldName, aggregateMethod}) => {
        if(inputData.dataColumnsInfo[fieldName] === "measure") {
            if(activeChart.value.isAggregation) {
                return {
                    field: fieldName,
                    type: "quantitative",
                    title: `${aggregateMethod}(${fieldName})`,
                    aggregate: aggregateMethod
                }
            } else {
                return {
                    field: fieldName,
                    type: "quantitative",
                    title: fieldName
                }
            }
        } else {
            return {
                field: fieldName,
                type: "nominal",
                title: fieldName
            }
        }
    });
}

let tooltip = computed<VegaEncodingConfig[]>(() => {
    let p1 = generateTooltip("X_axis");

    let p2 = generateTooltip("Y_axis");

    return [
        ...p1,
        ...p2
    ];
});

let mark = computed<any>(() => {
    return {
        type: activeChart.value.markType,
        opacity: 0.96,
        tooltip: { content: "data"}
    }
});

function generateLegend(legendName: LegendTypes): VegaEncodingConfig {
    let fieldName = activeChart.value[legendName].fieldName;
    let aggregateMethod = activeChart.value[legendName].aggregateMethod;
    if(fieldName) {
        if(aggregateMethod && inputData.dataColumnsInfo[fieldName] === "measure"){
            // 开了数据聚合
            return {
                title: aggregateMethod + `(${fieldName})`,
                field: fieldName,
                type: "quantitative",
                aggregate: aggregateMethod
            }
        } else {
            return {
                title: fieldName,
                field: fieldName,
                type: "nominal",
                 
            }
        }
    } else {
        return {} as any;
    }
}

let color = computed<VegaEncodingConfig>(() => {
   return generateLegend("color");
});

let size = computed<VegaEncodingConfig>(() => {
    return generateLegend("size");
});

let opacity = computed<VegaEncodingConfig>(() => {
   return generateLegend("opacity");
});

let shape = computed<VegaEncodingConfig>(() => {
    return generateLegend("shape");
});


function generateAxis(fieldName: string, aggregateMethod: AggregateMethod): VegaEncodingConfig {
    if(inputData.dataColumnsInfo[fieldName] !== "measure") {
        return {
            title: fieldName,
            field: fieldName,
            type: "nominal",
            aggregate: null
        }
    }
    if(activeChart.value.isAggregation) {
        // 数据聚合
        return {
            title: aggregateMethod + `(${fieldName})`,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true },
            aggregate: aggregateMethod
        }
    } else {
        // 数据没聚合
        return {
            title: fieldName,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true }
        }
    }
}


let x = computed<any>(() => {
    let len = activeChart.value.X_axis.length;
    if(len === 0) return {};
    // X_axis的最后一个
    let { fieldName, aggregateMethod } = activeChart.value.X_axis[len - 1];
    if(inputData.dataColumnsInfo[fieldName] !== "measure") {
        return {
            title: fieldName,
            field: fieldName,
            type: "nominal",
            aggregate: null
        }
    }
    if(activeChart.value.isAggregation) {
        // 数据聚合
        return {
            title: aggregateMethod + `(${fieldName})`,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true },
            aggregate: aggregateMethod
        }
    } else {
        // 数据没聚合
        return {
            title: fieldName,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true }
        }
    }
});

let column = computed<any>(() => {
    let len = activeChart.value.X_axis.length;
    if(len <= 1) return {};
    // X_axis的倒数第二个
    let { fieldName, aggregateMethod } = activeChart.value.X_axis[len - 2];
    if(inputData.dataColumnsInfo[fieldName] !== "measure") {
        return {
            title: fieldName,
            field: fieldName,
            type: "nominal",
            aggregate: null
        }
    }
    if(activeChart.value.isAggregation) {
        // 数据聚合
        return {
            title: aggregateMethod + `(${fieldName})`,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true },
            aggregate: aggregateMethod
        }
    } else {
        // 数据没聚合
        return {
            title: fieldName,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true }
        }
    }
});

let y = computed<any>(() => {
    let len = activeChart.value.Y_axis.length;
    if(len === 0) return {};
    // Y_axis的最后一个
    let { fieldName, aggregateMethod } = activeChart.value.Y_axis[len - 1];
    if(inputData.dataColumnsInfo[fieldName] !== "measure") {
        return {
            title: fieldName,
            field: fieldName,
            type: "nominal",
            aggregate: null
        }
    }
    if(activeChart.value.isAggregation) {
        // 数据聚合
        return {
            title: aggregateMethod + `(${fieldName})`,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true },
            aggregate: aggregateMethod
        }
    } else {
        // 数据没聚合
        return {
            title: fieldName,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true }
        }
    }
});

let row = computed<any>(() => {
    let len = activeChart.value.Y_axis.length;
    if(len <= 1) return {};
    // Y_axis的倒数第二个
    let { fieldName, aggregateMethod } = activeChart.value.Y_axis[len - 2];
    if(inputData.dataColumnsInfo[fieldName] !== "measure") {
        return {
            title: fieldName,
            field: fieldName,
            type: "nominal",
            aggregate: null
        }
    }
    if(activeChart.value.isAggregation) {
        // 数据聚合
        return {
            title: aggregateMethod + `(${fieldName})`,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true },
            aggregate: aggregateMethod
        }
    } else {
        // 数据没聚合
        return {
            title: fieldName,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true }
        }
    }
});


let vegaEncoding = () => {
    let spec = {
        tooltip: tooltip.value,
        color,
        opacity,
        shape,
        size,
    };
    if(Object.keys(x.value).length){
        spec["x"] = x.value;
    }
    if(Object.keys(y.value).length){
        spec["y"] = y.value;
    }
    if(Object.keys(row.value).length){
        spec["row"] = row.value;
    }
    if(Object.keys(column.value).length){
        spec["column"] = column.value;
    }
    return spec;
}

onMounted(() => {
    stop = watchEffect(() => {
        vegaEmbed("#chart", {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: {
                values: props.dataSource
            },
            mark: mark.value,
            encoding: vegaEncoding() as any,
        });
    });
})

onUnmounted(() => {
    stop();
});


</script>

<style lang="less" scoped>
.container {
    width: fit-content;
    height: fit-content;
}
</style>