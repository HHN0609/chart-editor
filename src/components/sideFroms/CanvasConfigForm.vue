<!-- 画布的配置表单 -->
<template>
  <div class="container">
    <a-collapse>
      <a-collapse-panel key="1" header="Canvas settings">
        <a-form
          name="basic"
          style="width: 100%;"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          :model="fromState"
        >
          <a-form-item label="Width" name="width">
            <a-input type="number" suffix="px" v-model:value="fromState.width" size="small" style="width:80px"/>
          </a-form-item>
          <a-form-item label="Height" name="height">
            <a-input type="number" suffix="px" v-model:value="fromState.height" size="small" style="width:80px" />
          </a-form-item>
          <a-form-item label="X(Left)" name="x">
            <a-input type="number" suffix="px" v-model:value="fromState.x" size="small" style="width:80px"/>
          </a-form-item>
          <a-form-item label="Y(Top)" name="y">
            <a-input type="number" suffix="px" v-model:value="fromState.y" size="small" style="width:80px" />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { CanvasFormProps } from "./form.types";
// const props = defineProps<CanvasFormProps>();
const fromState = reactive<CanvasFormProps>({
  width: 1920,
  height: 1080,
  x: 0,
  y: 0,
});
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    .ant-form-item{
      margin-bottom: 0px;
    }
  }
</style>

