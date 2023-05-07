<template>
    <div class="tagContainer" :style="{
        background: props.analyticType === 'dimension' ? 'black' : 'white',
        color: props.analyticType === 'dimension' ? 'white' : 'black'
    }">
        <div class="fieldName" :title="props.fieldName">{{ props.fieldName }}</div>

        <div class="aggregateState" v-if="props.isAggregation === true">
            <Popover placement="bottom" @update:visible="rotate">
                <template #title>
                    选择聚合方式
                </template>
                <template #content>
                    <RadioGroup
                        v-model:value="chartData.datas[chartData.activeIndex][props.axis][props.index].aggregateMethod"
                        style="width: 40px;"
                    >

                        <Radio
                            v-for="method of aggregateMethods"
                            :value="method"
                            :key="method" 
                        >
                            {{ method }}
                        </Radio>

                    </RadioGroup>
                </template>
                <div class="chooseAggregation">
                    {{ chartData.datas[chartData.activeIndex][props.axis][props.index].aggregateMethod }}
                    <DownOutlined :rotate="angle"/>
                </div>
            </Popover>
        </div>
        <div class="aggregateState" v-if="props.axis && props.semanticType === 'temporal'">
            <Popover placement="bottom" @update:visible="rotate">
                <template #title>
                    选择TimeUnit
                </template>
                <template #content>
                    <RadioGroup
                        v-model:value="chartData.datas[chartData.activeIndex][props.axis][props.index].timeUnit"
                        style="width: 40px;"
                    >
                        <Radio
                            v-for="unit of timeUnits"
                            :value="unit"
                            :key="unit" 
                        >
                            {{ unit === '' ? "null" : unit }}
                        </Radio>

                    </RadioGroup>
                </template>
                <div class="chooseAggregation">
                    {{ chartData.datas[chartData.activeIndex][props.axis][props.index].timeUnit }}
                    <DownOutlined :rotate="angle"/>
                </div>
            </Popover>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Popover, Radio, RadioGroup } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue"
import useChartData from "@/stores/chartData";
import { ref } from "vue";
import { AnalyticType, SemanticType } from "@/stores/inputData";

// index代表该标签在X_axis or Y_axis中的下标
// axis代表该标签那个轴
const props = defineProps<{
    axis?: "X_axis" | "Y_axis" | "",
    index?: number,
    fieldName: string,
    isAggregation: boolean,
    semanticType: SemanticType,
    analyticType: AnalyticType
}>();

const chartData = useChartData();

const angle = ref<number>(0);
const rotate = () => {
    if(angle.value === 0) {
        angle.value = 180;
    } else {
        angle.value = 0;
    }
};

const aggregateMethods = [
    "sum", "mean", "median", "variance", "stdev", "count", "max", "min"
];

const timeUnits = ["", "year", "quarter" , "month", "week", "day", "date", "dayofyear", "hours", "minutes", "seconds", "milliseconds"];
</script>

<style lang="less" scoped>
.tagContainer {
    width: 150px;
    height: 25px;
    font-size: small;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px black solid;
    border-radius: 5%;
    margin: 0 5px;
    padding:0px 5px;
    .fieldName {
        max-width: 120px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: x-small;
    }
    > .aggregateState {
        width: fit-content;
        .chooseAggregation {
            height: fit-content;
            font-size: x-small;
        }
    }
}
</style>