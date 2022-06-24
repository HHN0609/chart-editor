<template>
<Form :label-col="{ span: props.label ? 8 : 0 }" :wrapper-col="{ span: props.label ? 16 : 24}" class="form">
    <FormItem :label="props.label">
        <Select
            v-model:value="value"
            :options="props.selectOptions"
            size="small"
        >
        </Select>
    </FormItem>
</Form>
</template>
<script lang="ts" setup>
import { Select ,FormItem, Form, SelectProps } from 'ant-design-vue';
import { ref, watch } from "vue";
const props = defineProps<{
    selectOptions: SelectProps["options"],
    value: string,
    label?: string,
    dataIndex: string,
}>();
let value = ref(props.value);
watch(value, () => {
    console.log(value.value)
    // 向外抛事件
})
</script>
<style lang="less" scoped>
.form{
    > div{
        margin-bottom: 0px;
    }
}
</style>