<template>
<Form :label-col="{ span: props.label ? 8 : 0 }" :wrapper-col="{ span: props.label ? 16 : 24}" class="form">
    <FormItem :label="props.label">
        <div>
            <Row :gutter="5" style="margin-bottom: 5px;">
                <Col :span="12">
                    <Select v-model:value="value.fontFamily" size="small" :style="{ fontFamily: value.fontFamily }">
                        <SelectOption v-for="option in fontFamilyType" :value="option.value" :style="{ fontFamily: option.label }"> {{ option.label }} </SelectOption>
                    </Select>
                </Col>
                <Col :span="12">
                    <Input type="number" v-model:value="value.fontSize" suffix="px" size="small"></Input>
                </Col>
            </Row>
            <Row>
                <Input type="color" v-model:value="value.color" size="small"></Input>
            </Row>
        </div>
    </FormItem>
</Form>
</template>
<script lang="ts" setup>
import { Row, Col, FormItem, Form, Select, Input, SelectOption } from 'ant-design-vue';
import { GenericFamily } from 'csstype';
import { reactive, watch } from "vue";
type fontValueType = {
    fontFamily: string,
    color: string,
    fontSize: number,
};

const props = defineProps<{
    value: any,
    label?: string,
    dataIndex: string,
}>();
const fontFamilyType: { label:GenericFamily, value:GenericFamily}[] = [
    { label:"cursive", value: "cursive" },
    { label:"fantasy", value: "fantasy" },
    { label:"monospace", value: "monospace" },
    { label:"sans-serif", value: "sans-serif" },
    { label:"serif", value: "serif" }
]
let value = reactive<fontValueType>({
    fontFamily: "",
    color: "",
    fontSize: 16
});

const emitter = defineEmits(["dataChange"]);

watch(value, () => {
    // 这里的emitter要换掉
    console.log("change!")
    emitter("dataChange", {
        [props.dataIndex]: value
    });
});

</script>
<style lang="less" scoped>
.form {
    > div {
        margin-bottom: 0px;
        // > .ant-row.ant-form-item{
        //     > .ant-col.ant-col-8.ant-form-item-label{
        //         display: flex;
        //         justify-content: center;
        //         align-items: center;
        //     }
        // }
    }
}
</style>