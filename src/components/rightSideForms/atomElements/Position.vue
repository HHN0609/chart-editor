<template>
  <Form :label-col="{ span: props.label ? 8 : 0 }" :wrapper-col="{ span: props.label ? 16 : 24 }" class="form">
    <FormItem :label="props.label" class="iconfont">
      <RadioGroup v-model:value="value" button-style="solid" size="small">
        <RadioButton title="top" value="top">&#xe64c;</RadioButton>
        <RadioButton title="left" value="left">&#xe645;</RadioButton>
        <RadioButton title="bottom" value="bottom">&#xe64b;</RadioButton>
        <RadioButton title="right" value="right">&#xe646;</RadioButton>
      </RadioGroup>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { RadioGroup, RadioButton, FormItem, Form } from "ant-design-vue";
import { computed } from "vue";
import { _get, _set } from "@/utils";
import ProjectInfo from "@/stores/projectInfo";
// type PositionType = "position4" | "position8";
// type PositionOptions = "top" | "left" | "right" | "bottom";

const projectInfo = ProjectInfo();
const props = defineProps<{
  // type: PositionType,
  // value: PositionOptions,
  label?: string;
  dataIndex: string;
  kkk?: object;
}>();
let value = computed({
  get: () => {
    return _get(projectInfo.currChartData.optionsData, props.dataIndex);
  },
  set: (newValue) => {
    _set(projectInfo.currChartData.optionsData, props.dataIndex, newValue);
  },
});
// let value = ref<PositionOptions>(props.value);
// watch(value, () => {
//     // 向外抛事件
// })
</script>
<style lang="less" scoped>
.form {
  > div {
    margin-bottom: 0px;
  }
}
@font-face {
  font-family: "iconfont"; /* Project id  */
  src: url("../../../../public/iconfont.ttf?t=1655974908929") format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
