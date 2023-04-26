<template>
    <!-- <div></div> -->
    <Tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit">  
        <TabPane 
            v-for="data of chartData.datas" 
            :key="data.id" 
            :tab="data.name" 
            :closable="!(chartData.datas.length === 1)"
            @vnode-mounted="tabCardMounted"
        >
        </TabPane>
    </Tabs>
    <div class="tabCard">
        <Row class="cardHeader">
            <div style="width: fit-content;"><Checkbox v-model:checked="chartData.datas[chartData.activeIndex].isAggregation">聚合数据</Checkbox></div>
            <div>
                <span>标记类型:</span>
                <Select size="small" style="width: 100px" v-model:value="chartData.datas[chartData.activeIndex].markType">
                    <SelectOption v-for="mark in markTypes" :value="mark.type" :key="mark.type">
                        <span><Component :is="mark.icon"></Component></span>
                        <span>-{{ mark.type }}</span>
                    </SelectOption>
                </Select>
            </div>
            <div>
                <span>堆叠类型:</span>
                <Select size="small" style="width: 100px" v-model:value="chartData.datas[chartData.activeIndex].stack">
                    <SelectOption v-for="stack in stackTypes" :value="stack.type" :key="stack.type">
                        <span><Component :is="stack.icon"></Component></span>
                        <span>-{{ (stack.type || "null").toString() }}</span>
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
                        <Button :size="'small'" :type="'link'">png</Button>
                        <Button :size="'small'" :type="'link'">svg</Button>
                    </template>
                    <Button size="small">
                        <template #icon>
                            <PictureOutlined/>
                        </template>
                    </Button>
                </Popover>
            </div>
            <div>
                <!-- <Popover :placement="'bottom'">
                    <template #title>
                        数据排序
                    </template>
                    <template #content>
                        <Button :size="'small'" :type="'link'">png</Button>
                        <Button :size="'small'" :type="'link'">svg</Button>
                    </template>
                    <Button size="small">
                        <template #icon>
                            <PictureOutlined/>
                        </template>
                    </Button>
                </Popover> -->
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
                            ></FieldTag>
                        </template>
                    </Draggable>
                </div>

            </div>

            <div class="legendList">
                <!-- <div class="filter">
                    <Select size="small" style="width: 100px">
                        <SelectOption></SelectOption>
                        <SelectOption v-for="fieldName in fieldNames" :value="fieldName" :key="fieldName">
                            <span>{{ fieldName }}</span>
                        </SelectOption>
                    </Select>
                </div> -->
                <div class="color">
                    <div>颜色</div>
                    <Select 
                        style="width: 120px" 
                        v-model:value="chartData.datas[chartData.activeIndex].color.fieldName"
                        size="middle"
                    >
                        <SelectOption 
                            v-for="fieldName of ['', ...fieldNames]"
                            :value="fieldName"
                            :key="fieldName"
                        >
                            <span>{{ fieldName ? fieldName : "Empty"}}</span>
                        </SelectOption>
                    </Select>
                    <div v-if="isAggregation && inputData.dataColumnsInfo[chartData.datas[chartData.activeIndex].color.fieldName] === 'measure'">聚合方法</div>
                    <Select
                        style="width: 120px" 
                        v-model:value="chartData.datas[chartData.activeIndex].color.aggregateMethod"
                        size="middle"
                        v-if="isAggregation && inputData.dataColumnsInfo[chartData.datas[chartData.activeIndex].color.fieldName] === 'measure'"
                    >
                        <SelectOption v-for="aggregateMethod of aggregateMethods" :value="aggregateMethod" :key="aggregateMethod">
                            <span>{{ aggregateMethod }}</span>
                        </SelectOption>
                    </Select>
                </div>
                <div class="opacity">
                    <div>透明度</div>
                    <Select style="width: 120px" v-model:value="chartData.datas[chartData.activeIndex].opacity.fieldName" size="middle">
                        <SelectOption v-for="fieldName of ['', ...fieldNames]" :value="fieldName" :key="fieldName">
                            <span>{{ fieldName ? fieldName : "Empty"}}</span>
                        </SelectOption>
                    </Select>
                    <div v-if="isAggregation && inputData.dataColumnsInfo[chartData.datas[chartData.activeIndex].opacity.fieldName] === 'measure'">聚合方法</div>
                    <Select
                        style="width: 120px"
                        v-model:value="chartData.datas[chartData.activeIndex].opacity.aggregateMethod"
                        size="middle"
                        v-if="isAggregation && inputData.dataColumnsInfo[chartData.datas[chartData.activeIndex].opacity.fieldName] === 'measure'"
                    >
                        <SelectOption v-for="aggregateMethod of aggregateMethods" :value="aggregateMethod" :key="aggregateMethod">
                            <span>{{ aggregateMethod }}</span>
                        </SelectOption>
                    </Select>
                </div>
                <div class="size">
                    <div>大小</div>
                    <Select style="width: 120px" v-model:value="chartData.datas[chartData.activeIndex].size.fieldName" size="middle">
                        <SelectOption v-for="fieldName of ['', ...fieldNames]" :value="fieldName" :key="fieldName">
                            <span>{{ fieldName ? fieldName : "Empty"}}</span>
                        </SelectOption>
                    </Select>
                    <div v-if="isAggregation && inputData.dataColumnsInfo[chartData.datas[chartData.activeIndex].size.fieldName] === 'measure'">聚合方法</div>
                    <Select
                        style="width: 120px"
                        v-model:value="chartData.datas[chartData.activeIndex].size.aggregateMethod"
                        size="middle"
                        v-if="isAggregation && inputData.dataColumnsInfo[chartData.datas[chartData.activeIndex].size.fieldName] === 'measure'"
                    >
                        <SelectOption v-for="aggregateMethod of aggregateMethods" :value="aggregateMethod" :key="aggregateMethod">
                            <span>{{ aggregateMethod }}</span>
                        </SelectOption>
                    </Select>
                </div>
                <div class="shape">
                    <div>形状</div>
                    <Select style="width: 120px" v-model:value="chartData.datas[chartData.activeIndex].shape.fieldName" size="middle">
                        <SelectOption v-for="fieldName of ['', ...fieldNames]" :value="fieldName" :key="fieldName">
                            <span>{{ fieldName ? fieldName : "Empty"}}</span>
                        </SelectOption>
                    </Select>
                    <div v-if="isAggregation && inputData.dataColumnsInfo[chartData.datas[chartData.activeIndex].shape.fieldName] === 'measure'">聚合方法</div>
                    <Select
                        style="width: 120px"
                        v-model:value="chartData.datas[chartData.activeIndex].shape.aggregateMethod"
                        size="middle"
                        v-if="isAggregation && inputData.dataColumnsInfo[chartData.datas[chartData.activeIndex].shape.fieldName] === 'measure'"
                    >
                        <SelectOption v-for="aggregateMethod of aggregateMethods" :value="aggregateMethod" :key="aggregateMethod">
                            <span>{{ aggregateMethod }}</span>
                        </SelectOption>
                    </Select>
                </div>
            </div>

            <div style="flex-grow: 1; align-self: stretch;">
                <Row class="aixs">
                    <div>X轴</div>
                    <div class="colBox">
                        
                        <Draggable
                            class="broadwiseList"
                            group="fieldList"
                            :list="chartData.datas[chartData.activeIndex].X_axis"
                            itemKey="id"
                        >
                            <template #item="{element, index}">
                                <FieldTag
                                    @change="updetaChart"
                                    :index="index"
                                    :axis="'X_axis'"
                                    :fieldName="element.fieldName"
                                    :isAggregation="isAggregation && inputData.dataColumnsInfo[element.fieldName] === 'measure'"
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
                            :list="chartData.datas[chartData.activeIndex].Y_axis"
                            itemKey="id"
                        >
                            <template #item="{element, index}">
                                <FieldTag
                                    @change="updetaChart"
                                    :index="index"
                                    :axis="'Y_axis'"
                                    :fieldName="element.fieldName"
                                    :isAggregation="isAggregation  && inputData.dataColumnsInfo[element.fieldName] === 'measure'"
                                ></FieldTag>
                            </template>
                        </Draggable>

                    </div>
                </Row>

                <Row class="chartArea">
                    <!-- <div>
                        {{ chartData.datas[chartData.activeIndex].X_axis }}
                    </div>
                    <div>
                        {{ chartData.datas[chartData.activeIndex].Y_axis }}
                    </div>
                    <div style="width: 100%;">
                        {{ chartData.datas[chartData.activeIndex].color }}
                        {{ chartData.datas[chartData.activeIndex].shape }}
                        {{ chartData.datas[chartData.activeIndex].size }}
                        {{ chartData.datas[chartData.activeIndex].opacity }}
                    </div> -->
                </Row>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Row, TabPane, Tabs, Button, Checkbox, Select, SelectOption, Popover, Tooltip } from "ant-design-vue";
import { 
    BarChartOutlined, 
    LineChartOutlined, 
    AreaChartOutlined, 
    DotChartOutlined, 
    PieChartOutlined, 
    FontColorsOutlined, 
    PictureOutlined, 
    RedoOutlined,
    CloseOutlined, 
    ColumnHeightOutlined, 
    VerticalAlignMiddleOutlined,
    VerticalAlignBottomOutlined 
} from "@ant-design/icons-vue";
import useChartData, { ChartData } from "@/stores/chartData";
import useInputData from "@/stores/inputData";
import { computed, onMounted, ref, watch } from "vue";
import FieldTag from "@/components/dataDraw/fieldTag.vue";
import Draggable from "vuedraggable";

const chartData = useChartData();
const inputData = useInputData();

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

// de
// const legendAggregate = computed(() => {
//     return 
// });

const isAggregation = computed<boolean>(() => {
    return chartData.datas[chartData.activeIndex].isAggregation;
})

// 拿到导入数据的属性
const fieldNames = computed(() => {
    return Object.keys(inputData.dataColumnsInfo);
});

const dimensionNames = computed(() => {
    return fieldNames.value.filter((name) => {
        return inputData.dataColumnsInfo[name] === "dimension";
    }).map((name) => {
        return {
            fieldName: name,
            aggregateMethod: ""
        }
    });
});

const measureNames = computed(() => {
    return fieldNames.value.filter((name) => {
        return inputData.dataColumnsInfo[name] === "measure";
    }).map((name) => {
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

// 更新图标
const updetaChart = () => {

};

const reversal = (e) => {

};


const tabCardMounted = (e) => {
    // 监听卡片挂载，进行卡片的初始化
    
    console.log(e);
};

// onMounted(() => {
    
    // });
    
const aggregateMethods = [
    "sum", "mean", "median", "variance", "stdev", "count", "max", "min"
];

const markTypes = [
    { type: "auto", icon: FontColorsOutlined},
    { type: "bar", icon: BarChartOutlined },
    { type: "line", icon: LineChartOutlined },
    { type: "area", icon: AreaChartOutlined },
    { type: "arc", icon: PieChartOutlined },
    { type: "dot", icon: DotChartOutlined },
];

const stackTypes = [
    { type: null, icon: CloseOutlined },
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
        border: 1px solid black;
        height: 100%;
        width: 100%;
        overflow: scroll;
    }
}
</style>
