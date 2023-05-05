<template>
    <div ref="chart" :id="'chart' + props.chartId.toString()"></div>
</template>

<script setup lang="ts">
import { ListType, MarkType, AggregateMethod } from "@/stores/chartData";
import { WatchStopHandle, computed, onMounted, onUnmounted, watchEffect, ref, nextTick, Ref } from "vue";
import vegaEmbed from "vega-embed";
import useInputData from "@/stores/inputData";
import { View } from "vega";
import { emitter } from "@/utils";

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

const inputData = useInputData();

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
    isAggregation: boolean,
    chartId: number
}>();

let stop: WatchStopHandle;

let chart = ref();

let vegaView: View;

function generateTooltip(axis: "X_axis" | "Y_axis"): VegaEncodingConfig[] {
    return props[axis].map(({fieldName, aggregateMethod}) => {
        if(inputData.dataColumnsInfo[fieldName] === "measure") {
            if(props.isAggregation) {
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
        type: props.markType,
        opacity: 0.96,
        tooltip: { content: "data"}
    }
});

function generateLegend(legendName: LegendTypes): VegaEncodingConfig {
    let fieldName = props[legendName].fieldName;
    let aggregateMethod = props[legendName].aggregateMethod;
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
    if(props.isAggregation) {
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
    let len = props.X_axis.length;
    if(len === 0) return {};
    // X_axis的最后一个
    let { fieldName, aggregateMethod } = props.X_axis[len - 1];
    return generateAxis(fieldName, aggregateMethod);
});

let column = computed<any>(() => {
    let len = props.X_axis.length;
    if(len <= 1) return {};
    // X_axis的倒数第二个
    let { fieldName, aggregateMethod } = props.X_axis[len - 2];
    return generateAxis(fieldName, aggregateMethod);
});

let y = computed<any>(() => {
    let len = props.Y_axis.length;
    if(len === 0) return {};
    // Y_axis的最后一个
    let { fieldName, aggregateMethod } = props.Y_axis[len - 1];
    return generateAxis(fieldName, aggregateMethod);
});

let row = computed<any>(() => {
    let len = props.Y_axis.length;
    if(len <= 1) return {};
    // Y_axis的倒数第二个
    let { fieldName, aggregateMethod } = props.Y_axis[len - 2];
    return generateAxis(fieldName, aggregateMethod);
});


let vegaEncoding = () => {
    let spec = {
        tooltip: tooltip.value,
        color: color.value,
        opacity: opacity.value,
        shape: shape.value,
        size: size.value,
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

            vegaView = null;
            emitter.$off("SaveAsPng");
            emitter.$off("SaveAsSvg");

            chart.value && vegaEmbed(`#chart${props.chartId}`, {
                $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                data: {
                    values: props.dataSource
                },
                mark: mark.value,
                encoding: vegaEncoding() as any,
            }).then((value) => {
                vegaView = value.view;
                emitter.$on("SaveAsPng", () => {
                    console.log("SaveAsPng");
                    vegaView.toCanvas(2).then((canvas) => {
                        let data = canvas.toDataURL('image/png', 1);
                        let filename = `gw chart ${Date.now() % 1_000_000}`.padStart(6, '0');
                        const a = document.createElement('a');
                        a.download = `${filename}${props.chartId}.png`;
                        a.href = data.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
                        a.click();
                    });
                });

                emitter.$on("SaveAsSvg", () => {
                    console.log("SaveAsSvg");
                    vegaView.toSVG().then(data => {
                        let filename = `gw chart ${Date.now() % 1_000_000}`.padStart(6, '0');
                        const file = new File([data], `${filename}${props.chartId}.svg`);
                        const url = URL.createObjectURL(file);
                        const a = document.createElement('a');
                        a.download = file.name;
                        a.href = url;
                        a.click();
                        requestAnimationFrame(() => {
                            URL.revokeObjectURL(url);
                        });
                    });
                });
            }).catch((reason) => {
                console.log("render error ", reason);
            });
    });
})

onUnmounted(() => {
    stop();
});


</script>