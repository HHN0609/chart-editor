<template>
  <Form :label-col="{ span: props.label ? 10 : 0 }" :wrapper-col="{ span: props.label ? 14 : 24 }" class="form">
    <FormItem :label="props.label">
      <Switch v-model:checked="value"></Switch>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { _get, _set } from "@/utils";
import { computed } from "@vue/reactivity";
import { Switch, FormItem, Form } from "ant-design-vue";
import ProjectInfo from "@/stores/projectInfo";
const projectInfo = ProjectInfo();

const props = defineProps<{
  // value: boolean,
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
// let value = ref<boolean>(props.value);
// watch(value, () => {
//     console.log(value.value)
//     // 向外抛事件
// })
</script>
<style lang="less" scoped>
.form {
  > div {
    margin-bottom: 0px;
  }
}
</style>
