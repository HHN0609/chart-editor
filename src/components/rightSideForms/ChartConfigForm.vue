<!-- 画布的配置表单 -->
<template>
  <div class="container">
    <Card size="small" title="Settings" v-if="!isChart">
      <Form name="basic" style="width: 100%" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }" :model="projectInfo">
        <FormItem label="Width" name="width">
          <Input type="number" suffix="px" v-model:value.number.lazy="projectInfo.width" size="small" style="width: 80px" />
        </FormItem>
        <FormItem label="Height" name="height">
          <Input type="number" suffix="px" v-model:value.number.lazy="projectInfo.height" size="small" style="width: 80px" />
        </FormItem>
        <FormItem label="Background Color" name="backgroundColor">
          <ColorPicker v-model="projectInfo.bgColor"></ColorPicker>
        </FormItem>
        <FormItem label="Viewport Color" name="viewportColor">
          <ColorPicker v-model="projectInfo.viewportColor"></ColorPicker>
        </FormItem>
      </Form>
    </Card>
    <Card size="small" :title="projectInfo.currChartData.uid" v-else>
      <Form name="basic" style="width: 100%" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
        <FormItem label="Width" name="width">
          <Input type="number" suffix="px" v-model:value.number.lazy="projectInfo.currChartData.basicData.width" size="small" style="width: 80px" />
        </FormItem>
        <FormItem label="Height" name="height">
          <Input type="number" suffix="px" v-model:value.number.lazy="projectInfo.currChartData.basicData.height" size="small" style="width: 80px" />
        </FormItem>

        <FormItem label="X" name="x">
          <Input type="number" suffix="px" v-model:value.number.lazy="projectInfo.currChartData.basicData.x" size="small" style="width: 80px" />
        </FormItem>
        <FormItem label="Y" name="y">
          <Input type="number" suffix="px" v-model:value.number.lazy="projectInfo.currChartData.basicData.x" size="small" style="width: 80px" />
        </FormItem>
        <FormItem label="Rotate" name="rotate">
          <Input type="number" suffix="°" v-model:value.number.lazy="projectInfo.currChartData.basicData.rotate" size="small" style="width: 80px" />
        </FormItem>
      </Form>
    </Card>
    <DynamicForm :configTree="CONFIGTREES[projectInfo.currChartData.basicData.type]" v-if="isChart"></DynamicForm>
  </div>
</template>

<script setup lang="ts">
import ProjectInfo from "@/stores/projectInfo";
import { Form, FormItem, Input, Card } from "ant-design-vue";
import { computed } from "vue";
import DynamicForm from "./DynamicForm.vue";
import ColorPicker from "@/components/rightSideForms/ColorPicker.vue";
import { CONFIGTREES } from "@/charts";
const projectInfo = ProjectInfo();

// 判断当前选中是不是图表
const isChart = computed(() => projectInfo.currTarget.slice(0, 7) === ".target");
</script>

<style scoped lang="less">
.container {
  width: 100%;

  .ant-form-item {
    margin-bottom: 0px;
  }
}
</style>
