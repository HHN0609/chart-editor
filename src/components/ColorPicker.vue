<template>
    <div class="container">
        <input @click.prevent="showPicker" type="color"/>
        <button @click="hidePicker"></button>
        <div id="colorPicker"></div>
    </div>
</template>

<script lang="ts" setup>
import '@easylogic/colorpicker/dist/colorpicker.css';
import {ColorPicker} from '@easylogic/colorpicker';
import { defineEmits, onMounted, ref } from 'vue';
const emitter = defineEmits(["delete"]);
let colorPicker;
let isShow = ref(false);
const showPicker = () => {
    // isShow.value = true;
//     colorPicker.show({
//     left : 100,
//     top : 0,
//     hideDelay : 2000 
// }, "#FFFFFF", function (newColor) {
//     console.log(newColor)
// })
}
const hidePicker = () => {
    colorPicker.hide();
}
onMounted(() => {
  colorPicker = new ColorPicker({
      type: "sketch",
      position: "inline",
      right: 0,
      top : 0,
      container: document.getElementById('colorPicker'),
  });
});
</script>

<style scoped lang="less">
.container{
    width: fit-content;
    height: fit-content;
    z-index: 100;
    > #colorPicker{
        position: fixed;
        z-index: 500;
    }
}
</style>