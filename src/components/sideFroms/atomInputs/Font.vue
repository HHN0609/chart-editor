<template>
<Form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" class="form">
    <FormItem :label="props.label">
        <Row>
            <Col :span="16">
                <Select></Select>
            </Col>
            <Col :span="8">
                <Inputs></Inputs>
            </Col>
        </Row>
        <Row>
            
        </Row>
    </FormItem>
</Form>
</template>
<script lang="ts" setup>
import { Row, Col, FormItem, Form } from 'ant-design-vue';
import { ref, watch } from "vue";
import Inputs from "./Inputs.vue";
import Select from "./Select.vue";
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