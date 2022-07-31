<template>
    <div class="container">

    </div>
</template>

<script lang="ts" setup>
import { Spin } from "ant-design-vue";
const props = defineProps<{
    size: "small" | "default" | "large"
    spinning: boolean
}>();
</script>

<style scoped lang="less">
.container{
    width: 100vw;
    height: 100vh;
    >.spin{
        
    }
}
</style>
