<template>
  <Popconfirm :placement=" props.placement || 'left' " :showCancel="false">
    <template #icon></template>
    <template #okButton>
      <Sketch :modelValue="modelValue" @update:modelValue="changeColor" @change="changeColor" />
    </template>
    <div class="colorInput" :style="{ backgroundColor: modelValue.hex8 || modelValue }"></div>
  </Popconfirm>
</template>

<script lang="ts" setup>
import { Sketch } from "@ckpack/vue-color";
import { Popconfirm, PopconfirmProps } from "ant-design-vue";

const props = defineProps<{
  modelValue: any,
  placement?: PopconfirmProps["placement"],
}>();
const emit = defineEmits(["update:modelValue"]);

const changeColor = (newColor: any) => {
  emit("update:modelValue", newColor.hex8);
};
</script>

<style scoped lang="less">
.colorInput {
  width: 50px;
  height: 24px;
  padding: 4px;
  background-clip: content-box;
  border: 1px solid rgba(155, 151, 151, 0.486);
  border-radius: 2px;
  transition: 0.3s;
  &:hover {
    border-color: #188fffc2;
  }
}
</style>
