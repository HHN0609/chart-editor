<!-- 画布的配置表单 -->
<template>
  <div class="container">
      <Card size="small" title="a card">
        <Form name="basic" style="width: 100%;" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }"
          :model="fromState">
          <FormItem label="Width" name="width">
            <Input type="number" suffix="px" v-model:value="fromState.width" size="small" style="width:80px" />
          </FormItem>
          <FormItem label="Height" name="height">
            <Input type="number" suffix="px" v-model:value="fromState.height" size="small" style="width:80px" />
          </FormItem>

          <FormItem label="Background Color" name="backgroundColor" v-if="!isChart">
            <Input type="color" v-model:value="fromState.backgroundColor" size="small" style="width:80px" />
          </FormItem>
          <FormItem label="X" name="x" v-else>
            <Input type="number" v-model:value="fromState.x" size="small" style="width:80px" />
          </FormItem>

          <FormItem label="Viewport Color" name="viewportColor" v-if="!isChart">
            <Input type="color" v-model:value="fromState.viewportColor" size="small" style="width:80px" />
          </FormItem>
          <FormItem label="Y" name="y" v-else>
            <Input type="number" v-model:value="fromState.y" size="small" style="width:80px" />
          </FormItem>

        </Form>
      </Card>
    <DynamicForm :configTree="configTree"></DynamicForm>
  </div>
</template>

<script setup lang="ts">
import { reactive, inject } from 'vue';
// import { CanvasFormProps } from "./form.types";
import { Form, FormItem, Input, Card } from 'ant-design-vue';
import DynamicForm from './DynamicForm.vue';
import { computed } from '@vue/reactivity';
const props = defineProps<{
  targetClass: string
}>();
const isChart = computed(() => props.targetClass.slice(0, 6) === "target");
// const projectGlobalInfo = inject("projectGlobalInfo");
// console.log(projectGlobalInfo)
const fromState = reactive({
  width: 1920,
  height: 1080,
  backgroundColor: "",
  viewportColor: "",
  x: 0,
  y: 0,
});

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

