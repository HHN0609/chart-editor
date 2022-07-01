<template>
      <Popconfirm placement="left" :showCancel="false">
        <template #icon></template>
        <template #okButton>
          <Sketch v-model="color"/>
        </template>
        <div class="colorInput" :style="{ backgroundColor: color.hex8 || color }"></div>
      </Popconfirm>
</template>

<script lang="ts" setup>
import { Sketch } from "@ckpack/vue-color";
import { ref, watch } from "vue";
import { Popconfirm } from "ant-design-vue";
const props = defineProps(["modelValue"]);
const emitter = defineEmits(["update:modelValue"]);
let color = ref(props.modelValue);
watch(color, (newColor) => {
  emitter("update:modelValue", newColor.hex8);
});

watch(() => props.modelValue, (newValue) => {
  console.log("change", newValue);
  color = newValue;
});

</script>

<style scoped lang="less">
.colorInput{
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