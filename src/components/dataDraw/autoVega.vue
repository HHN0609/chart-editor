<template>
    <div ref="chart" :id="'chart' + props.chartId.toString()"></div>
</template>

<script setup lang="ts">
import { ListType, MarkType, AggregateMethod } from "@/stores/chartData";
import { WatchStopHandle, computed, onMounted, onUnmounted, watchEffect, ref, nextTick, Ref } from "vue";
import vegaEmbed from "vega-embed";
import useInputData from "@/stores/inputData";
import { TimeUnit, View } from "vega";
import { emitter } from "@/utils";
import { themes } from "./vegaThemeConfig/index";


type  AxisType = ListType;
type Legend = ListType;
type VegaEncodingConfig = {
    field: string,
    title: string,
    type: "quantitative" | "nominal",
    aggregate?: AggregateMethod | null,
    axis?: any,
    stack?: "normalize" | "" | "zero" | "center",
    timeUnit?: TimeUnit
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
    isAggregation: boolean,
    chartId: number,
    stack?: "normalize" | "" | "zero" | "center",
    theme?: string
}>();

let stop: WatchStopHandle;

let chart = ref();

let vegaView: View;

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
        if(props.isAggregation && aggregateMethod && inputData.fieldAnalyticTypes[fieldName] === "measure"){
            // 开了数据聚合
            return {
                title: aggregateMethod + `(${fieldName})`,
                field: fieldName,
                type: inputData.fieldSemanticTypes[fieldName],
                aggregate: aggregateMethod
            }
        } else {
            return {
                title: fieldName,
                field: fieldName,
                type: inputData.fieldSemanticTypes[fieldName],
                 
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

function generateTooltip(axis: "X_axis" | "Y_axis"): VegaEncodingConfig[] {
    return props[axis].map(({fieldName, aggregateMethod, timeUnit}) => {
        if(inputData.fieldAnalyticTypes[fieldName] === "measure") {
            if(props.isAggregation) {
                return {
                    field: fieldName,
                    type: inputData.fieldSemanticTypes[fieldName],
                    title: `${aggregateMethod}(${fieldName})`,
                    aggregate: aggregateMethod
                }
            } else {
                return {
                    field: fieldName,
                    type: inputData.fieldSemanticTypes[fieldName],
                    title: fieldName
                }
            }
        } else {
            if(inputData.fieldSemanticTypes[fieldName] === "temporal") {
                return {
                    field: fieldName,
                    type: inputData.fieldSemanticTypes[fieldName],
                    title: timeUnit ? `${timeUnit}(${fieldName})` : fieldName,
                    timeUnit: timeUnit
                }
            }
            return {
                field: fieldName,
                type: inputData.fieldSemanticTypes[fieldName],
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
        ...p2,
        shape.value,
        size.value,
        opacity.value,
        color.value
    ];
});


function generateAxis(fieldName: string, aggregateMethod: AggregateMethod, timeUnit: TimeUnit): VegaEncodingConfig {
    if(inputData.fieldAnalyticTypes[fieldName] !== "measure") {
        let t = {
            title: fieldName,
            field: fieldName,
            type: inputData.fieldSemanticTypes[fieldName],
            aggregate: null,
            stack: props.stack
        };
        if(inputData.fieldSemanticTypes[fieldName] === "temporal") {
            t["timeUnit"] = timeUnit;
            t["title"] = timeUnit ? `${timeUnit}(${fieldName})` : fieldName;
        }
        return t;
    }
    if(props.isAggregation) {
        // 数据聚合
        return {
            title: aggregateMethod + `(${fieldName})`,
            field: fieldName,
            type: inputData.fieldSemanticTypes[fieldName],
            axis: { labelOverlap: true },
            aggregate: aggregateMethod
        }
    } else {
        // 数据没聚合
        return {
            title: fieldName,
            field: fieldName,
            type: inputData.fieldSemanticTypes[fieldName],
            axis: { labelOverlap: true },
            stack: props.stack
        }
    }
}


let x = computed<any>(() => {
    let len = props.X_axis.length;
    if(len === 0) return {};
    // X_axis的最后一个
    let { fieldName, aggregateMethod, timeUnit } = props.X_axis[len - 1];
    return generateAxis(fieldName, aggregateMethod, timeUnit);
});

let column = computed<any>(() => {
    let len = props.X_axis.length;
    if(len <= 1) return {};
    // X_axis的倒数第二个
    let { fieldName, aggregateMethod, timeUnit } = props.X_axis[len - 2];
    return generateAxis(fieldName, aggregateMethod, timeUnit);
});

let y = computed<any>(() => {
    let len = props.Y_axis.length;
    if(len === 0) return {};
    // Y_axis的最后一个
    let { fieldName, aggregateMethod, timeUnit } = props.Y_axis[len - 1];
    return generateAxis(fieldName, aggregateMethod, timeUnit);
});

let row = computed<any>(() => {
    let len = props.Y_axis.length;
    if(len <= 1) return {};
    // Y_axis的倒数第二个
    let { fieldName, aggregateMethod, timeUnit } = props.Y_axis[len - 2];
    return generateAxis(fieldName, aggregateMethod, timeUnit);
});


let vegaEncoding = () => {
    let spec = {
        tooltip: tooltip.value,
    };
    if(Object.keys(color.value).length){
        spec["color"] = color.value;
    }
    if(Object.keys(opacity.value).length){
        spec["opacity"] = opacity.value;
    }
    if(Object.keys(shape.value).length){
        spec["shape"] = shape.value;
    }
    if(Object.keys(size.value).length){
        spec["size"] = size.value;
    }
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
                config: themes[props.theme],
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