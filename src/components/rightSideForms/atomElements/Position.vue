<template>
  <Form :label-col="{ span: props.label ? 10 : 0 }" :wrapper-col="{ span: props.label ? 14 : 24 }" class="form" v-if="isShow">
    <FormItem v-if="props.positionNum === 4" :label="props.label" class="iconfont">
      <RadioGroup v-model:value="value" button-style="solid" size="small">
        <RadioButton title="top" value="top">&#xe67f;</RadioButton>
        <RadioButton title="left" value="left">&#xe662;</RadioButton>
        <RadioButton title="bottom" value="bottom">&#xe664;</RadioButton>
        <RadioButton title="right" value="right">&#xe673;</RadioButton>
      </RadioGroup>
    </FormItem>

    <FormItem v-else-if="props.positionNum === 6" :label="props.label" class="iconfont">
      <RadioGroup v-model:value="value" button-style="solid" size="small">
        <RadioButton title="top-left" value="top-left">&#xe681;</RadioButton>
        <RadioButton title="top-center" value="top-center">&#xe67f;</RadioButton>
        <RadioButton title="top-right" value="top-right">&#xe680;</RadioButton>
      </RadioGroup>
      <RadioGroup v-model:value="value" button-style="solid" size="small">
        <RadioButton title="bottom-left" value="bottom-left">&#xe661;</RadioButton>
        <RadioButton title="bottom-center" value="bottom-center">&#xe664;</RadioButton>
        <RadioButton title="bottom-right" value="bottom-right">&#xe663;</RadioButton>
      </RadioGroup>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { RadioGroup, RadioButton, FormItem, Form } from "ant-design-vue";
import { computed } from "vue";
import { _get, _set } from "@/utils";
import ProjectInfo from "@/stores/projectInfo";
type PositionNum = 4 | 6;

const projectInfo = ProjectInfo();
const props = defineProps<{
  dependOn?: any,
  positionNum: PositionNum,
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
@font-face {
  font-family: "iconfont"; /* Project id  */
  src: url("../../../../asset/iconfont.ttf") format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
