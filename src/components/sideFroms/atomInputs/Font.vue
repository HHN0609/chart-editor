<template>
<Form :label-col="{ span: props.label ? 8 : 0 }" :wrapper-col="{ span: props.label ? 16 : 24}" class="form">
    <FormItem :label="props.label">
        <div>
            <Row :gutter="5" style="margin-bottom: 5px;">
                <Col :span="16">
                    <Select
                        v-model:value="value.fontFamily"
                        :options="fontFamilyType"
                    >
                    </Select>
                </Col>
                <Col :span="8">
                    <Input type="number" v-model:value="value.fontSize" suffix="px"></Input>
                </Col>
            </Row>
            <Row>
                <Input type="color" v-model:value="value.color"></Input>
            </Row>
        </div>
    </FormItem>
</Form>
</template>
<script lang="ts" setup>
import { Row, Col, FormItem, Form, Select, Input } from 'ant-design-vue';
import { GenericFamily } from 'csstype';
import { reactive, watch } from "vue";
type fontValueType = {
    fontFamily: string,
    color: string,
    fontSize: number,
};

const props = defineProps<{
    value: string | number | undefined,
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
        > div {
            display: flex !important;
            align-items: center !important;
            background: #000;
        }
    }
}
</style>