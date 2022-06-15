<template>
    <div class="box" @mouseenter="showOverLayout = true" @mouseleave="showOverLayout = false">
        <div class="imgBox">
            <img src="../../public/柱状图.svg" alt="No img">
        </div>
        <div class="infoBox">
            <strong>{{data.chart_name}}</strong>
            <h5>create time: </h5>
            <h5>{{create_time}}</h5>
        </div>
        <div class="overLayout" v-if="showOverLayout">
            <a-button type="primary" @click="goDashBoard">Edit</a-button>
            <a-button type="danger" @click="showModal = true">Delete</a-button>
        </div>
        <a-modal
            v-model:visible="showModal"
            title="Confirm deletion?"
            ok-text="Confirm"
            cancel-text="Cancel"
            @ok="deleteChart"
            @cancel="showModal = false"
        >
            <span>This operation can not be restored after deletion!</span>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';

type cardDataType = {
    chart_id: number,
    chart_name: string,
    create_time: string,
    last_modify: string,
    owner: string,
}
const props = defineProps<{
    data: cardDataType
}>();
const emitter = defineEmits(["delete-chart"]);
const create_time = computed(() => {
    const arr = props.data.create_time.split("T");
    return arr[0]+ " " + arr[1].split(".")[0];
});
const showOverLayout = ref<Boolean>(false);
const showModal = ref<Boolean>(false);
const deleteChart = () => {
    // 发出一个时间，父组件来删
    emitter("delete-chart", props.data.chart_id);
    showModal.value = false;
};
const goDashBoard = () => {
    //会把chart_id发过去
};
</script>
<style lang="less" scoped>
.box{
    width: 200px;
    height: 200px;
    margin: 10px;
    // border: 1px solid black;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    box-shadow: 2px 2px 4px 1px gainsboro;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
        box-shadow: 4px 4px 4px 3px gainsboro;
    }
    >.imgBox >img{
        width: 120px;
        height: 120px;
        overflow: hidden;
    }
    >.infoBox{
        overflow: hidden;
        height: fit-content;
        width: 80%;
    }
    >.overLayout{
        position: absolute;
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: inherit;
        display: flex;
        justify-content:space-evenly;
        align-items: center;
    }
}
</style>
