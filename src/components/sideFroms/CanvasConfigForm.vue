<!-- 画布的配置表单 -->
<template>
  <div class="container">
    <Collapse :activeKey="[1]">
      <CollapsePanel key="1" header="Project settings">
        <Form
          name="basic"
          style="width: 100%;"
          :label-col="{ span: 12 }"
          :wrapper-col="{ span: 12 }"
          :model="fromState"
        >
          <FormItem label="Width" name="width">
            <Input type="number" suffix="px" v-model:value="fromState.width" size="small" style="width:80px"/>
          </FormItem>
          <FormItem label="Height" name="height">
            <Input type="number" suffix="px" v-model:value="fromState.height" size="small" style="width:80px" />
          </FormItem>
          <FormItem label="Background Color" name="backgroundColor">
            <Input type="color" v-model:value="fromState.backgroundColor" size="small" style="width:80px"/>
          </FormItem>
          <FormItem label="Viewport Color" name="viewportColor">
            <Input type="color" v-model:value="fromState.viewportColor" size="small" style="width:80px" />
          </FormItem>
        </Form>
      </CollapsePanel>
    </Collapse>
    <Collapse>
      <CollapsePanel key="1" header="test">
        <Font :label="'Font'"></Font>
      </CollapsePanel>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { reactive, inject } from 'vue';
import { CanvasFormProps } from "./form.types";
import { Collapse, CollapsePanel, Form, FormItem, Input } from 'ant-design-vue';
import Font from './atomInputs/Font.vue';
const projectGlobalInfo = inject("projectGlobalInfo");
console.log(projectGlobalInfo)
const fromState = reactive<CanvasFormProps>({
  width: 1920,
  height: 1080,
  backgroundColor: "",
  viewportColor: "",
});
const valueOptions = [
  {label: "top", value: "top"},
  {label: "right", value: "right"},
  {label: "bottom", value: "bottom"},
  {label: "left", value: "left"},
]
function test () {
  console.log("dataChange");
}
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    .ant-form-item{
      margin-bottom: 0px;
    }
  }
</style>

