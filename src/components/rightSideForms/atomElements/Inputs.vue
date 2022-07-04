<template>
<Form :label-col="{ span: props.label ? 8 : 0 }" :wrapper-col="{ span: props.label ? 16 : 24}" class="form">
    <FormItem :label="props.label">
        <Input :type="props.type" v-model:value.lazy="value" size="small"></Input>
    </FormItem>
</Form>
</template>
<script lang="ts" setup>
import { Input, FormItem, Form } from 'ant-design-vue';
import ProjectInfo from "@/stores/projectInfo";
import { computed } from '@vue/reactivity';
import { _get, _set } from "@/utils"; 

const projectInfo = ProjectInfo();
type InputType = "color" | "text" | "number"
const props = defineProps<{
    type: InputType,
    label?: string,
    dataIndex: string,
}>();
let value = computed({
    get: () => {
        return _get(projectInfo.currChartData.optionsData, props.dataIndex);
    },
    set: (newValue) => {
        _set(projectInfo.currChartData.optionsData, props.dataIndex, newValue);
    }
});
</script>
<style lang="less" scoped>
.form{
    > div{
        margin-bottom: 0px;
    }
}
</style>