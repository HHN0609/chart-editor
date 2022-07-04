<template>
<Form :label-col="{ span: props.label ? 8 : 0 }" :wrapper-col="{ span: props.label ? 16 : 24}" class="form">
    <FormItem :label="props.label">
        <Select
            v-model:value="value"
            :options="props.valueOptions"
            size="small"
        >
        </Select>
    </FormItem>
</Form>
</template>
<script lang="ts" setup>
import ProjectInfo from '@/stores/projectInfo';
import { _get, _set } from '@/utils';
import { computed } from '@vue/reactivity';
import { Select ,FormItem, Form, SelectProps } from 'ant-design-vue';
import { ref, watch } from "vue";
const projectInfo = ProjectInfo();
const props = defineProps<{
    valueOptions: SelectProps["options"],
    // value: string,
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
// let value = ref(props.value);
// watch(value, () => {
//     console.log(value.value)
// })
</script>
<style lang="less" scoped>
.form{
    > div{
        margin-bottom: 0px;
    }
}
</style>