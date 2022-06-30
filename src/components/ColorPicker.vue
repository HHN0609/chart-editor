<template>
    <input type="color" @click="showPicker"/>
    <Sketch @mouseleave="hidePicker" class="colorInput" v-model="color" v-if="isVisible"/>
</template>

<script lang="ts" setup>
import { Sketch } from '@ckpack/vue-color';
import { computed, onMounted, ref, watch } from 'vue';
const props = defineProps(["color"]);
const emitter = defineEmits(["update:color"]);
let color = ref(props.color);

const value = computed({
  get() {
    return props.color;
  },
  set(value) {
    emitter('update:color', value);
  }
});

watch(color, (newColor) => {
    let p = newColor.hex8;
    console.log(p);
})

let isVisible = ref(false);
function showPicker(e: PointerEvent) {
    e.preventDefault();
    isVisible.value = true;
};

function hidePicker(e: PointerEvent) {
    e.preventDefault();
    isVisible.value = false;
};
</script>

<style scoped lang="less">
.colorInput{
    position: fixed;
    z-index: 100;
    transform: translateX(-110px);
}
</style>