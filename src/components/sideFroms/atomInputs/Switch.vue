<template>
<Form :label-col="{ span: props.label ? 8 : 0 }" :wrapper-col="{ span: props.label ? 16 : 24}" class="form">
    <FormItem :label="props.label">
       <Switch v-model:checked="value"></Switch>
    </FormItem>
</Form>
</template>
<script lang="ts" setup>
import { Switch ,FormItem, Form } from 'ant-design-vue';
import { ref, watch } from "vue";
const props = defineProps<{
    value: boolean,
    label?: string,
    dataIndex: string,
}>();
let value = ref<boolean>(props.value);
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