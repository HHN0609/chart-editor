<!-- 画布的配置表单 -->
<template>
  <div class="container">
    <Card size="small" title="Settings" v-if="!isChart">
      <Form name="basic" style="width: 100%;" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }"
        :model="projectInfo">
        <FormItem label="Width" name="width">
          <Input type="number" suffix="px" v-model:value.number.lazy="projectInfo.width" size="small" style="width:80px" />
        </FormItem>
        <FormItem label="Height" name="height">
          <Input type="number" suffix="px" v-model:value.number.lazy="projectInfo.height" size="small" style="width:80px" />
        </FormItem>
        <FormItem label="Background Color" name="backgroundColor">
          <Input type="color" v-model:value="projectInfo.bgColor" size="small" style="width:80px" />
        </FormItem>
        <FormItem label="Viewport Color" name="viewportColor">
          <Input type="color" v-model:value="projectInfo.viewportColor" size="small" style="width:80px" />
        </FormItem>
      </Form>
    </Card>
      <!-- <Card size="small" title="a card" v-else>

        <Form name="basic" style="width: 100%;" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }"
          :model="projectInfo">
          <FormItem label="Width" name="width">
            <Input type="number" suffix="px" v-model:value="projectInfo.width" size="small" style="width:80px" />
          </FormItem>
          <FormItem label="Height" name="height">
            <Input type="number" suffix="px" v-model:value="projectInfo.height" size="small" style="width:80px" />
          </FormItem>

          <FormItem label="X" name="x">
            <Input type="number" v-model:value="projectInfo.x" size="small" style="width:80px" />
          </FormItem>
          <FormItem label="Y" name="y">
            <Input type="number" v-model:value="projectInfo.y" size="small" style="width:80px" />
          </FormItem>
        </Form>

      </Card> -->
    <DynamicForm :configTree="configTree" v-if="isChart"></DynamicForm>
  </div>
</template>

<script setup lang="ts">
import ProjectInfo from '@/stores/projectInfo';
import { Form, FormItem, Input, Card } from 'ant-design-vue';
import DynamicForm from './DynamicForm.vue';
import { computed } from '@vue/reactivity';

const projectInfo = ProjectInfo();
// 判断当前选中是不是图表
const isChart = computed(() => projectInfo.currTarget.slice(0, 6) === "target");

const configTree = [
  {
    type: "folder",
    label: "Axis",
    content: [
      {
        type: "font",
        label: "Axis font",
        dataIndex: "axis.font"
      },
      {
        type: "inputs",
        label: "Stroke Width",
        // type 是inputs的话就会有dataType这个选项
        dataType: "number",
        dataIndex: "axis.strokeWidth"
      },
      {
        type: "inputs",
        label: "Axis Color",
        dataType: "color",
        dataIndex: "axis.color"
      }
    ]
  },
  {
    type: "folder",
    label: "Title",
    content: [
      {
        type: "position",
        label: "Position",
        dataIndex: "title.position"
      },
      {
        type: "select",
        label: "Stroke Style",
        // type 是select和radio有options这个值
        options: [
          { label: "Solid", value: "solid" },
          { label: "Dash", value: "dash" }
        ],
        dataIndex: "axis.strokeStyle"
      },
      {
        type: "radio",
        label: "Title Style",
        options: [
          { label: "Style1", value: "Style1" },
          { label: "Style2", value: "Style2" },
        ],
        dataIndex: "axis.color"
      },
    ]
  },
  {
    type: "folder",
    label: "Title",
    content: [
      {
        type: "position",
        label: "Position",
        dataIndex: "title.position"
      },
      {
        type: "select",
        label: "Stroke Style",
        // type 是select和radio有options这个值
        options: [
          { label: "Solid", value: "solid" },
          { label: "Dash", value: "dash" }
        ],
        dataIndex: "axis.strokeStyle"
      },
      {
        type: "radio",
        label: "Title Style",
        options: [
          { label: "Style1", value: "Style1" },
          { label: "Style2", value: "Style2" },
        ],
        dataIndex: "axis.color"
      },
    ]
  },
  {
    type: "folder",
    label: "Title",
    content: [
      {
        type: "position",
        label: "Position",
        dataIndex: "title.position"
      },
      {
        type: "select",
        label: "Stroke Style",
        // type 是select和radio有options这个值
        options: [
          { label: "Solid", value: "solid" },
          { label: "Dash", value: "dash" }
        ],
        dataIndex: "axis.strokeStyle"
      },
      {
        type: "radio",
        label: "Title Style",
        options: [
          { label: "Style1", value: "Style1" },
          { label: "Style2", value: "Style2" },
        ],
        dataIndex: "axis.color"
      },
    ]
  },
];
</script>

<style scoped lang="less">
.container {
  width: 100%;

  .ant-form-item {
    margin-bottom: 0px;
  }
}
</style>

