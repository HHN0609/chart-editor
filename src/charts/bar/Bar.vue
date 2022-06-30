<template>
    <div class="container" ref="dom"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const dom = ref();
let chart = null;

onMounted(() => {
    
});
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: inherit;
}
</style>