<template>
<div class="container">
    <div id="chart" ref="chart"></div>
</div>
</template>

<script setup lang="ts">
import { ListType, MarkType } from "@/stores/chartData";
import { WatchStopHandle, computed, onMounted, onUnmounted, watchEffect, ref } from "vue";
import vegaEmbed from "vega-embed";
import useInputData from "@/stores/inputData";
import useChartData from "@/stores/chartData"
import { id, renderModule } from "vega";
const inputData = useInputData();
const chartData = useChartData();

type axisType = ListType;
type legendType = ListType;


const props = defineProps<{
    dataSource: any[],
    X_axis: axisType[],
    Y_axis: axisType[],
    shape: legendType,
    opacity: legendType,
    color: legendType,
    size: legendType,
    markType: MarkType,
    stack?: "normalize" | "" | "zero" | "center",
}>();

let stop: WatchStopHandle;

let chart = ref();

let tooltip = computed<any>(() => {
    let p1 = chartData.datas[chartData.activeIndex].X_axis.map(({fieldName}) => {
        if(inputData.dataColumnsInfo[fieldName] === "measure") {
            return {
                field: fieldName,
                type: "quantitative",
                title: fieldName
            }
        } else {
            return {
                field: fieldName,
                type: "nominal",
                title: fieldName
            }
        }
    });

    let p2 = chartData.datas[chartData.activeIndex].Y_axis.map(({fieldName}) => {
        if(inputData.dataColumnsInfo[fieldName] === "measure") {
            return {
                field: fieldName,
                type: "quantitative",
                title: fieldName
            }
        } else {
            return {
                field: fieldName,
                type: "nominal",
                title: fieldName
            }
        }
    });

    return [
        ...p1,
        ...p2
    ]
});

let mark = computed<any>(() => {
    return {
        type: chartData.datas[chartData.activeIndex].markType,
        opacity: 0.96,
        tooltip: { content: "data"}
    }
});

let vegaSpec = computed(() => {

});

let color = computed<any>(() => {
    let fieldName = chartData.datas[chartData.activeIndex].color.fieldName;
    let aggregateMethod = chartData.datas[chartData.activeIndex].color.aggregateMethod;
    if(fieldName) {
        if(aggregateMethod && inputData.dataColumnsInfo[fieldName] === "measure"){
            // 开了数据聚合
            return {
                title: aggregateMethod + `(${fieldName})`,
                field: fieldName,
                type: "quantitative"
            }
        } else {
            return {
                title: fieldName,
                field: fieldName,
                type: "nominal",
                aggregate: null
            }
        }
    } else {
        return {};
    }
});

let size = computed<any>(() => {
    let fieldName = chartData.datas[chartData.activeIndex].size.fieldName;
    let aggregateMethod = chartData.datas[chartData.activeIndex].size.aggregateMethod;
    if(fieldName) {
        if(aggregateMethod && inputData.dataColumnsInfo[fieldName] === "measure"){
            // 开了数据聚合
            return {
                title: aggregateMethod + `(${fieldName})`,
                field: fieldName,
                type: "quantitative"
            }
        } else {
            return {
                title: fieldName,
                field: fieldName,
                type: "nominal",
                aggregate: null
            }
        }
    } else {
        return {};
    }
});

let opacity = computed<any>(() => {
    let fieldName = chartData.datas[chartData.activeIndex].opacity.fieldName;
    let aggregateMethod = chartData.datas[chartData.activeIndex].opacity.aggregateMethod;
    if(fieldName) {
        if(aggregateMethod && inputData.dataColumnsInfo[fieldName] === "measure"){
            // 开了数据聚合
            return {
                title: aggregateMethod + `(${fieldName})`,
                field: fieldName,
                type: "quantitative"
            }
        } else {
            return {
                title: fieldName,
                field: fieldName,
                type: "nominal",
                aggregate: null
            }
        }
    } else {
        return {};
    }
});

let shape = computed<any>(() => {
    let fieldName = chartData.datas[chartData.activeIndex].shape.fieldName;
    let aggregateMethod = chartData.datas[chartData.activeIndex].shape.aggregateMethod;
    if(fieldName) {
        if(aggregateMethod && inputData.dataColumnsInfo[fieldName] === "measure"){
            // 开了数据聚合
            return {
                title: aggregateMethod + `(${fieldName})`,
                field: fieldName,
                type: "quantitative"
            }
        } else {
            return {
                title: fieldName,
                field: fieldName,
                type: "nominal",
                aggregate: null
            }
        }
    } else {
        return {};
    }
});

let x = computed<any>(() => {
    let len = chartData.datas[chartData.activeIndex].X_axis.length;
    if(len === 0) return {};
    // X_axis的最后一个
    let { fieldName, aggregateMethod } = chartData.datas[chartData.activeIndex].X_axis[len - 1];
    if(inputData.inputData[fieldName] !== "measure") {
        return {
            title: fieldName,
            field: fieldName,
            type: "nominal",
            aggregate: null
        }
    }
    if(chartData.datas[chartData.activeIndex].isAggregation) {
        // 数据聚合
        return {
            title: aggregateMethod + `(${fieldName})`,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true }
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
    let len = chartData.datas[chartData.activeIndex].X_axis.length;
    if(len <= 1) return {};
    // X_axis的倒数第二个
    let { fieldName, aggregateMethod } = chartData.datas[chartData.activeIndex].X_axis[len - 2];
    if(inputData.inputData[fieldName] !== "measure") {
        return {
            title: fieldName,
            field: fieldName,
            type: "nominal",
            aggregate: null
        }
    }
    if(chartData.datas[chartData.activeIndex].isAggregation) {
        // 数据聚合
        return {
            title: aggregateMethod + `(${fieldName})`,
            field: fieldName,
            type: "quantitative"
        }
    } else {
        // 数据没聚合
        return {
            title: fieldName,
            field: fieldName,
            type: "quantitative"
        }
    }
});

let y = computed<any>(() => {
    let len = chartData.datas[chartData.activeIndex].Y_axis.length;
    if(len === 0) return {};
    // Y_axis的最后一个
    let { fieldName, aggregateMethod } = chartData.datas[chartData.activeIndex].Y_axis[len - 1];
    if(inputData.inputData[fieldName] !== "measure") {
        return {
            title: fieldName,
            field: fieldName,
            type: "nominal",
            aggregate: null
        }
    }
    if(chartData.datas[chartData.activeIndex].isAggregation) {
        // 数据聚合
        return {
            title: aggregateMethod + `(${fieldName})`,
            field: fieldName,
            type: "quantitative",
            axis: { labelOverlap: true }
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
    let len = chartData.datas[chartData.activeIndex].Y_axis.length;
    if(len <= 1) return {};
    // Y_axis的倒数第二个
    let { fieldName, aggregateMethod } = chartData.datas[chartData.activeIndex].Y_axis[len - 2];
    if(inputData.inputData[fieldName] !== "measure") {
        return {
            title: fieldName,
            field: fieldName,
            type: "nominal"
        }
    }
    if(chartData.datas[chartData.activeIndex].isAggregation) {
        // 数据聚合
        return {
            title: aggregateMethod + `(${fieldName})`,
            field: fieldName,
            type: "quantitative"
        }
    } else {
        // 数据没聚合
        return {
            title: fieldName,
            field: fieldName,
            type: "quantitative"
        }
    }
});


onMounted(() => {
    stop = watchEffect(() => {
        console.log("draw chart");
        vegaEmbed("#chart", {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: {
                values: props.dataSource
            },
            mark: mark.value,
            encoding: {
                color: color.value,
                opacity: opacity.value,
                size: size.value,
                shape: shape.value,
                x: x.value,
                y: y.value,
                row: row.value,
                column: column.value,
                tooltip: tooltip.value
            },
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