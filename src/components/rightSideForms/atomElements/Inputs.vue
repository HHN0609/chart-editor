<template>
  <Form :label-col="{ span: props.label ? 10 : 0 }" :wrapper-col="{ span: props.label ? 14 : 24 }" class="form" v-if="isShow">
    <FormItem :label="props.label" v-if="props.type !== 'color'">
      <Input :type="props.type" v-model:value.lazy="value" size="small"></Input>
    </FormItem>
    <FormItem :label="props.label" v-else>
      <ColorPicker v-model="value"></ColorPicker>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { Input, FormItem, Form, PopconfirmProps } from "ant-design-vue";
import ProjectInfo from "@/stores/projectInfo";
import { computed } from "@vue/reactivity";
import { _get, _set } from "@/utils";
import ColorPicker from "@/components/rightSideForms/ColorPicker.vue";

const projectInfo = ProjectInfo();
type InputType = "color" | "text" | "number";
const props = defineProps<{
  dependOn?: any,
  type: InputType;
  label?: string;
  dataIndex: string;
  // placement?: PopconfirmProps["placement"];
}>();
let value = computed({
  get: () => {
    return _get(projectInfo.currChartData.optionsData, props.dataIndex);
  },
  set: (newValue) => {
    _set(projectInfo.currChartData.optionsData, props.dataIndex, newValue);
  },
});

let isShow = computed(() => {
  if(!props.dependOn) return true;
  else return _get(projectInfo.currChartData.optionsData, props.dependOn.dataIndex) === props.dependOn.value;
});
</script>
<style lang="less" scoped>
.form {
  > div {
    margin-bottom: 0px;
  }
}
</style>
