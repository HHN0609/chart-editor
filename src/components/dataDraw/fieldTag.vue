<template>
    <div class="tagContainer">
        <div class="fieldName" style="font-size: x-small;" :title="props.fieldName">{{ props.fieldName }}</div>

        <div class="aggregateState" v-if="props.isAggregation">
            <Popover placement="bottom" @update:visible="rotate">
                <template #title>
                    选择聚合方式
                </template>
                <template #content>
                    <RadioGroup
                        v-model:value="chartData.datas[chartData.activeIndex][props.axis][props.index].aggregateMethod"
                        style="width: 40px;"
                        @change="emit('changeAggregation')"
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

    </div>
</template>

<script setup lang="ts">
import { Popover, Radio, RadioGroup } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue"
import useChartData from "@/stores/chartData";
import { defineEmits, ref } from "vue";

// index代表该标签在X_axis or Y_axis中的下标
// axis代表该标签那个轴
const props = defineProps<{
    axis?: "X_axis" | "Y_axis" | "",
    index?: number,
    fieldName: string,
    isAggregation: boolean,
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

const emit = defineEmits<{
  (event: 'changeAggregation'): void
}>();

const aggregateMethods = [
    "sum", "mean", "median", "variance", "stdev", "count", "max", "min"
];
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
    }
    > .aggregateState {
        width: fit-content;
        .chooseAggregation {
            color: black;
            height: fit-content;
            font-size: x-small;
        }
    }
}
</style>