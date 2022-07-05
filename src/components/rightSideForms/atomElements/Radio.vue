<template>
  <Form :label-col="{ span: props.label ? 8 : 0 }" :wrapper-col="{ span: props.label ? 16 : 24 }" class="form">
    <FormItem :label="props.label">
      <RadioGroup v-model:value="value" button-style="solid" size="small" class="RadioGroup">
        <RadioButton v-for="item in props.valueOptions" :key="item.label" :title="item.label" :value="item.value">
          {{ item.label }}
        </RadioButton>
      </RadioGroup>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import ProjectInfo from "@/stores/projectInfo";
import { _get, _set } from "@/utils";
import { RadioGroup, RadioButton, FormItem, Form } from "ant-design-vue";
import { computed } from "vue";
const props = defineProps<{
  valueOptions: Array<{ label: string; value: string }>;
  // value: string,
  label?: string;
  dataIndex: string;
}>();
const projectInfo = ProjectInfo();
let value = computed({
  get: () => {
    return _get(projectInfo.currChartData.optionsData, props.dataIndex);
  },
  set: (newValue) => {
    _set(projectInfo.currChartData.optionsData, props.dataIndex, newValue);
  },
});
// let value = ref<string>(props.value);
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
  .RadioGroup {
    display: flex;
    > * {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
