<template>
<Form :label-col="{ span: props.label ? 8 : 0 }" :wrapper-col="{ span: props.label ? 16 : 24}" class="form">
    <FormItem :label="props.label">
        <Input :type="props.type" v-model:value="color"></Input>
    </FormItem>
</Form>
</template>
<script lang="ts" setup>
import { Input, FormItem, Form } from 'ant-design-vue';
import { ref, watch } from "vue";
type InputType = "color" | "text" | "number"
const props = defineProps<{
    type: InputType,
    value: string | number | undefined,
    label?: string,
    dataIndex: string,
}>();
const emitter = defineEmits(["dataChange"]);
const color = ref(props.value);
watch(color, () => {
    // 这里的emitter要换掉
    emitter("dataChange", {
        [props.dataIndex]: color.value
    });
});
watch(() => props.value, () => {
    color.value = props.value;
});
</script>
<style lang="less" scoped>
.form{
    > div{
        margin-bottom: 0px;
    }
}
</style>