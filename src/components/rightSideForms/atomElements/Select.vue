<template>
  <Form :label-col="{ span: props.label ? 10 : 0 }" :wrapper-col="{ span: props.label ? 14 : 24 }" class="form" v-if="isShow">
    <FormItem :label="props.label">
      <Select v-model:value="value" :options="props.valueOptions" size="small"> </Select>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import ProjectInfo from "@/stores/projectInfo";
import { _get, _set } from "@/utils";
import { computed } from "@vue/reactivity";
import { Select, FormItem, Form, SelectProps } from "ant-design-vue";
const projectInfo = ProjectInfo();
const props = defineProps<{
  valueOptions: SelectProps["options"];
  dependOn?: any,
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
