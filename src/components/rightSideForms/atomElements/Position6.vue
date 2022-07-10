<template>
  <Form :label-col="{ span: props.label ? 10 : 0 }" :wrapper-col="{ span: props.label ? 14 : 24 }" class="form">
    <FormItem :label="props.label" class="iconfont">
      <RadioGroup v-model:value="value" button-style="solid" size="small">
        <RadioButton title="top-left" value="top-left">&#xe681;</RadioButton>
        <RadioButton title="top-center" value="top-center">&#xe67f;</RadioButton>
        <RadioButton title="top-left" value="top-left">&#xe680;</RadioButton>
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

const projectInfo = ProjectInfo();
const props = defineProps<{
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
</script>
<style lang="less" scoped>
.form {
  > div {
    margin-bottom: 0px;
  }
}
@font-face {
  font-family: "iconfont"; /* Project id  */
  src: url("../../../../public/p4Iconfont.ttf?t=1657443847141") format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
