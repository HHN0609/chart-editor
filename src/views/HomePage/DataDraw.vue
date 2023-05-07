<template>
    <Tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit">  
        <TabPane 
            v-for="data of chartData.datas" 
            :key="data.id" 
            :tab="data.name" 
            :closable="!(chartData.datas.length === 1)"
        >
        </TabPane>
    </Tabs>
    <div class="tabCard">
        <Row class="cardHeader">
            <div style="width: fit-content;"><Checkbox v-model:checked="activeChart.isAggregation">聚合数据</Checkbox></div>
            <div>
                <span>标记类型:</span>
                <Select size="small" style="width: 100px" v-model:value="activeChart.markType">
                    <SelectOption v-for="mark in markTypes" :value="mark.type" :key="mark.type">
                        <span><img :src="mark.icon" style="width: 15px; height: 15px; overflow: hidden;"/></span>
                        <span> {{ mark.type }}</span>
                    </SelectOption>
                </Select>
            </div>
            <div>
                <span>堆叠类型:</span>
                <Select size="small" style="width: 100px" v-model:value="activeChart.stack">
                    <SelectOption v-for="stack in stackTypes" :value="stack.type" :key="stack.type">
                        <span><Component :is="stack.icon"></Component></span>
                        <span>-{{ stack.type ? stack.type : "null" }}</span>
                    </SelectOption>
                </Select>
            </div>
            <div>
                <Tooltip :placement="'bottom'">
                    <template #title>
                        <span>转置行列</span>
                    </template>
                    <Button size="small" @click="reversal">
                        <template #icon>
                            <RedoOutlined/>
                        </template>
                    </Button>
                </Tooltip>
            </div>
            <div>
                <Popover :placement="'bottom'">
                    <template #title>
                        导出图片格式
                    </template>
                    <template #content>
                        <Button :size="'small'" :type="'link'" @click="emitter.$emit('SaveAsPng')">png</Button>
                        <Button :size="'small'" :type="'link'" @click="emitter.$emit('SaveAsSvg')">svg</Button>
                    </template>
                    <Button size="small">
                        <template #icon>
                            <PictureOutlined/>
                        </template>
                    </Button>
                </Popover>
            </div>
        </Row>
        <div style="display: flex; height: 100%;">
            <div class="fieldList">

                <div>维度</div>
                <div class="dimensionList">
                    <Draggable
                        :group="{ name: 'fieldList', pull: 'clone', put: true }"
                        :list="dimensionNames"
                        itemKey="fieldName"
                        :clone="cloneData"
                        :sort="false"
                    >
                        <template #item="{element}">
                            <FieldTag
                                :fieldName="element.fieldName"
                                :isAggregation="false"
                                :semanticType="inputData.fieldSemanticTypes[element.fieldName]"
                                :axis="''"
                                :analyticType="inputData.fieldAnalyticTypes[element.fieldName]"
                            ></FieldTag>
                        </template>
                    </Draggable>
                </div>

                <div>度量</div>
                <div class="measureList">
                    <Draggable
                        :group="{ name: 'fieldList', pull: 'clone', put: true }"
                        :list="measureNames"
                        itemKey="fieldName"
                        :clone="cloneData"
                        :sort="false"
                    >
                        <template #item="{element}">
                            <FieldTag
                                :fieldName="element.fieldName"
                                :isAggregation="false"
                                :semanticType="inputData.fieldSemanticTypes[element.fieldName]"
                                :axis="''"
                                :analyticType="inputData.fieldAnalyticTypes[element.fieldName]"
                            ></FieldTag>
                        </template>
                    </Draggable>
                </div>

            </div>

            <div class="legendList">
                <div class="color">
                    <div>颜色</div>
                    <Select style="width: 120px" v-model:value="activeChart.color.fieldName" size="middle">
                        <SelectOption value="">Empty</SelectOption>
                        <SelectOptGroup label="维度">
                            <SelectOption v-for="{fieldName} of dimensionNames" :value="fieldName" :key="fieldName">
                                <span>{{ fieldName }}</span>
                            </SelectOption>
                        </SelectOptGroup>
                        <SelectOptGroup label="度量">
                            <SelectOption v-for="{fieldName} of measureNames" :value="fieldName" :key="fieldName">
                                <span>{{ fieldName }}</span>
                            </SelectOption>
                        </SelectOptGroup>
                    </Select>
                    <div v-if="activeChart.isAggregation && inputData.fieldAnalyticTypes[activeChart.color.fieldName] === 'measure'">聚合方法</div>
                    <Select
                        style="width: 120px" 
                        v-model:value="activeChart.color.aggregateMethod"
                        size="middle"
                        v-if="activeChart.isAggregation && inputData.fieldAnalyticTypes[activeChart.color.fieldName] === 'measure'"
                    >
                        <SelectOption v-for="aggregateMethod of aggregateMethods" :value="aggregateMethod" :key="aggregateMethod">
                            <span>{{ aggregateMethod }}</span>
                        </SelectOption>
                    </Select>
                </div>
                <div class="opacity">
                    <div>透明度</div>
                    <Select style="width: 120px" v-model:value="activeChart.opacity.fieldName" size="middle">
                        <SelectOption value="">Empty</SelectOption>
                        <SelectOptGroup label="维度">
                            <SelectOption v-for="{fieldName} of dimensionNames" :value="fieldName" :key="fieldName">
                                <span>{{ fieldName }}</span>
                            </SelectOption>
                        </SelectOptGroup>
                        <SelectOptGroup label="度量">
                            <SelectOption v-for="{fieldName} of measureNames" :value="fieldName" :key="fieldName">
                                <span>{{ fieldName }}</span>
                            </SelectOption>
                        </SelectOptGroup>
                    </Select>
                    <div v-if="activeChart.isAggregation && inputData.fieldAnalyticTypes[activeChart.opacity.fieldName] === 'measure'">聚合方法</div>
                    <Select
                        style="width: 120px"
                        v-model:value="activeChart.opacity.aggregateMethod"
                        size="middle"
                        v-if="activeChart.isAggregation && inputData.fieldAnalyticTypes[activeChart.opacity.fieldName] === 'measure'"
                    >
                        <SelectOption v-for="aggregateMethod of aggregateMethods" :value="aggregateMethod" :key="aggregateMethod">
                            <span>{{ aggregateMethod }}</span>
                        </SelectOption>
                    </Select>
                </div>
                <div class="size">
                    <div>大小</div>
                    <Select style="width: 120px" v-model:value="activeChart.size.fieldName" size="middle">
                        <SelectOption value="">Empty</SelectOption>
                        <SelectOptGroup label="维度">
                            <SelectOption v-for="{fieldName} of dimensionNames" :value="fieldName" :key="fieldName">
                                <span>{{ fieldName }}</span>
                            </SelectOption>
                        </SelectOptGroup>
                        <SelectOptGroup label="度量">
                            <SelectOption v-for="{fieldName} of measureNames" :value="fieldName" :key="fieldName">
                                <span>{{ fieldName }}</span>
                            </SelectOption>
                        </SelectOptGroup>
                    </Select>
                    <div v-if="activeChart.isAggregation && inputData.fieldAnalyticTypes[activeChart.size.fieldName] === 'measure'">聚合方法</div>
                    <Select
                        style="width: 120px"
                        v-model:value="activeChart.size.aggregateMethod"
                        size="middle"
                        v-if="activeChart.isAggregation && inputData.fieldAnalyticTypes[activeChart.size.fieldName] === 'measure'"
                    >
                        <SelectOption v-for="aggregateMethod of aggregateMethods" :value="aggregateMethod" :key="aggregateMethod">
                            <span>{{ aggregateMethod }}</span>
                        </SelectOption>
                    </Select>
                </div>
                <div class="shape">
                    <div>形状</div>
                    <Select style="width: 120px" v-model:value="activeChart.shape.fieldName" size="middle">
                        <SelectOption value="">Empty</SelectOption>
                        <SelectOptGroup label="维度">
                            <SelectOption v-for="{fieldName} of dimensionNames" :value="fieldName" :key="fieldName">
                                <span>{{ fieldName }}</span>
                            </SelectOption>
                        </SelectOptGroup>
                        <SelectOptGroup label="度量">
                            <SelectOption v-for="{fieldName} of measureNames" :value="fieldName" :key="fieldName">
                                <span>{{ fieldName }}</span>
                            </SelectOption>
                        </SelectOptGroup>
                    </Select>
                    <div v-if="activeChart.isAggregation && inputData.fieldAnalyticTypes[activeChart.shape.fieldName] === 'measure'">聚合方法</div>
                    <Select
                        style="width: 120px"
                        v-model:value="activeChart.shape.aggregateMethod"
                        size="middle"
                        v-if="activeChart.isAggregation && inputData.fieldAnalyticTypes[activeChart.shape.fieldName] === 'measure'"
                    >
                        <SelectOption v-for="aggregateMethod of aggregateMethods" :value="aggregateMethod" :key="aggregateMethod">
                            <span>{{ aggregateMethod }}</span>
                        </SelectOption>
                    </Select>
                </div>
            </div>

            <div style="flex-grow: 1; align-self: stretch; overflow: auto;">
                <Row class="aixs">
                    <div>X轴</div>
                    <div class="colBox">
                        
                        <Draggable
                            class="broadwiseList"
                            group="fieldList"
                            :list="activeChart.X_axis"
                            itemKey="id"
                        >
                            <template #item="{element, index}">
                                <FieldTag
                                    :index="index"
                                    :axis="'X_axis'"
                                    :fieldName="element.fieldName"
                                    :isAggregation="activeChart.isAggregation && inputData.fieldAnalyticTypes[element.fieldName] === 'measure'"
                                    :semanticType="inputData.fieldSemanticTypes[element.fieldName]"
                                    :analyticType="inputData.fieldAnalyticTypes[element.fieldName]"
                                ></FieldTag>
                            </template>
                        </Draggable>

                    </div>
                </Row>

                <Row class="aixs">
                    <div>Y轴</div>
                    <div class="rowBox">

                        <Draggable
                            class="broadwiseList"
                            group="fieldList"
                            :list="activeChart.Y_axis"
                            itemKey="id"
                        >
                            <template #item="{element, index}">
                                <FieldTag
                                    :index="index"
                                    :axis="'Y_axis'"
                                    :fieldName="element.fieldName"
                                    :isAggregation="activeChart.isAggregation  && inputData.fieldAnalyticTypes[element.fieldName] === 'measure'"
                                    :semanticType="inputData.fieldSemanticTypes[element.fieldName]"
                                    :analyticType="inputData.fieldAnalyticTypes[element.fieldName]"
                                ></FieldTag>
                            </template>
                        </Draggable>

                    </div>
                </Row>

                <Row class="chartArea">
                    <vegaGrid
                        :dataSource="inputData.inputData"
                        :X_axis="activeChart.X_axis"
                        :Y_axis="activeChart.Y_axis"
                        :shape="activeChart.shape"
                        :size="activeChart.size"
                        :color="activeChart.color"
                        :opacity="activeChart.opacity"
                        :markType="activeChart.markType"
                        :stack="activeChart.stack"
                        :isAggregation="activeChart.isAggregation"
                    >
                    </vegaGrid>
                </Row>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Row, TabPane, Tabs, Button, Checkbox, Select, SelectOption, Popover, Tooltip, SelectOptGroup } from "ant-design-vue";
import {
    PictureOutlined, 
    RedoOutlined,
    CloseOutlined, 
    ColumnHeightOutlined, 
    VerticalAlignMiddleOutlined,
    VerticalAlignBottomOutlined 
} from "@ant-design/icons-vue";

import Arc from "@/assets/markTypeIcons/arc.svg";
import Area from "@/assets/markTypeIcons/area.svg";
import Bar from "@/assets/markTypeIcons/bar.svg";
import Boxplot from "@/assets/markTypeIcons/boxplot.svg";
import Line from "@/assets/markTypeIcons/line.svg";
import Point from "@/assets/markTypeIcons/point.svg";
import Rect from "@/assets/markTypeIcons/rect.svg";
import Scatter from "@/assets/markTypeIcons/scatter.svg";
import Tick from "@/assets/markTypeIcons/tick.svg";

import useChartData from "@/stores/chartData";
import useInputData from "@/stores/inputData";
import { computed, ref, watch } from "vue";
import FieldTag from "@/components/dataDraw/fieldTag.vue";
import Draggable from "vuedraggable";
import vegaGrid from "@/components/dataDraw/vegaGrid.vue";

import { emitter } from "@/utils";

const chartData = useChartData();
const inputData = useInputData();

const activeChart = computed(() => {
    return chartData.datas[chartData.activeIndex];
});

// 激活的tab id和该tab在全局状态管理datas中的下标
const activeKey = ref<string>(chartData.datas[0].id);

const onEdit = (targetKey: string, action: string) => {
  if (action === 'add') {
    chartData.addChart(activeKey);
  } else {
    chartData.removeChart(targetKey, activeKey);
  }
};

watch(activeKey, (currId) => {
    chartData.activeIndex = chartData.datas.findIndex((data) => data.id === currId);
});


// 拿到导入数据的属性
const fieldNames = computed(() => {
    return Object.keys(inputData.fieldAnalyticTypes);
});

const dimensionNames = computed(() => {
    return fieldNames.value.filter((name) => {
        return inputData.fieldAnalyticTypes[name] === "dimension";
    }).map((name) => {
        if(inputData.fieldSemanticTypes[name] === "temporal") {
            return {
                fieldName: name,
                aggregateMethod: "",
                timeUnit: ""
            }
        }
        return {
            fieldName: name,
            aggregateMethod: ""
        }
    });
});

const measureNames = computed(() => {
    return fieldNames.value.filter((name) => {
        return inputData.fieldAnalyticTypes[name] === "measure";
    }).map((name) => {
        if(inputData.fieldSemanticTypes[name] === "temporal") {
            return {
                fieldName: name,
                aggregateMethod: "",
                timeUnit: ""
            }
        }
        return {
            fieldName: name,
            aggregateMethod: "sum"
        }
    });
});

// 拖拽的时候进行浅拷贝，并添加上id
const cloneData = (data) => {
    return {
        ...data,
        id: new Date().getTime().toString()
    }
};

const reversal = () => {
    let temp;
    temp = activeChart.value.X_axis;
    activeChart.value.X_axis = activeChart.value.Y_axis;
    activeChart.value.Y_axis = temp;
};
    
const aggregateMethods = [
    "sum", "mean", "median", "variance", "stdev", "count", "max", "min"
];

const markTypes = [
    { type: "bar", icon: Bar },
    { type: "line", icon: Line },
    { type: "area", icon: Area },
    { type: "arc", icon: Arc },
    { type: "point", icon: Scatter },
    { type: "circle", icon: Point},
    {  type: "rect", icon: Rect},
    { type: "tick", icon: Tick },
    { type: "boxplot", icon: Boxplot }
]; 

const stackTypes = [
    { type: "", icon: CloseOutlined },
    { type: "zero", icon: VerticalAlignBottomOutlined },
    { type: "center", icon: VerticalAlignMiddleOutlined },
    { type: "normalize", icon: ColumnHeightOutlined },
];

</script>

<style scoped lang="less">
.tabCard {
    user-select:none;
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    >.cardHeader {
        height: 30px;
        border: 1px solid black;
        display: flex;
        align-items: center;
        > div{
            margin: 0px 5px;
        }
    }
    .fieldList {
        text-align: center;
        min-width: 120px;
        margin: 0 10px;
        
        >.dimensionList, >.measureList{
            border: 1px solid black;
            height: 220px;
            overflow-x: hidden;
            overflow-y: auto;
            padding: 5px 0px;
            > div >div{
                margin-bottom: 5px;
            }
        }
    }
    .legendList {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 10px;
        > div{
            border: 1px solid black;
            width: fit-content;
            margin: 10px 0px;
            text-align: center;
        }
    }
    .aixs {
        height: 35px;
        margin-top: 10px;
        border: 1px solid black;
        display: flex;
        >div:first-child{
            line-height: 35px;
            width: 100px;
            border-right: 1px black solid;
            padding:0px 10px;
        }
        >.colBox, >.rowBox{
            padding:0px 10px;
            flex-grow: 1;
            overflow-x: auto;
            >.broadwiseList{
                display: flex;
                height: 100%;
                align-items: center;
                > div{
                    margin: 0;
                    margin-right: 5px;
                }
            }
        }
    }
    .chartArea {
        margin-top: 10px;
        margin-bottom: 30px;
        padding: 10px;
        border: 1px solid rgb(0, 0, 0);
        min-height: 100%;
        max-width: 100%;
        overflow: auto;
    }
}
</style>
