<template>
<Transition name="loading">
    <div class="container" v-if="isHidden === false && props.show === false">
        <Spin :spinning="true" :size="props.size" :tip="props.description"></Spin>
    </div>
</Transition>
</template>

<script lang="ts" setup>
import { Spin } from "ant-design-vue";
import { onMounted, ref } from "vue";
const props = defineProps<{
    size: "small" | "default" | "large"
    show: boolean
    description?: string

}>();

const isHidden = ref<boolean>(false);
onMounted(() => {
    setTimeout(() => {
        isHidden.value = true;
    }, 1000);  
});
</script>

<style scoped lang="less">
.loading-leave-active{
    transition: opacity 0.5s ease;
}
.loading-enter-from {
    opacity: 1;
}
.loading-leave-to {
    opacity: 0;
}
.container{
    background: var(--bgColor);
    position: absolute;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    >.spin{
        
    }
}
</style>
