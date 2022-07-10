<template>
  <Form :label-col="{ span: props.label ? 10 : 0 }" :wrapper-col="{ span: props.label ? 14 : 24 }" class="form">
    <FormItem :label="props.label">
      <Slider v-model:value="value" :min="props.valueOptions.min" :max="props.valueOptions.max" :step="props.valueOptions.step" size="small"> </Slider>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import ProjectInfo from "@/stores/projectInfo";
import { _get, _set } from "@/utils";
import { computed } from "@vue/reactivity";
import { Slider, FormItem, Form } from "ant-design-vue";
const projectInfo = ProjectInfo();
const props = defineProps<{
  valueOptions: {
    min: number,
    max: number,
    step: number
  }
  label?: string;
  dataIndex: string;
}>();

let value = computed({
  get: () => {
    return _get(projectInfo.currChartData.optionsData, props.dataIndex);
  },
  set: (newValue) => {
    _set(projectInfo.currChartData.optionsData, props.dataIndex, newValue);
  },
});
</script>
<style lang="less" scoped>
.form {
  > div {
    margin-bottom: 0px;
  }
}
</style>
