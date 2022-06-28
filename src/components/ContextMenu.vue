<template>
    <div class="container">
        <Button danger @click.stop="showConfirm">Delete</Button>
    </div>
</template>

<script lang="ts" setup>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Button, Modal } from 'ant-design-vue';
import { createVNode, defineEmits } from 'vue';
const emitter = defineEmits(["delete"]);

const showConfirm = () => {
    Modal.confirm({
    title: 'Do you Want to delete this chart?',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', { style: 'color:red;'}, "Can't restore after deletion!"),
    onOk() {
        emitter("delete");
    }
    });
};
</script>

<style scoped lang="less">
.container{
    width: fit-content;
    height: fit-content;
    background-color: white;
    border: #1890ff 1px solid;
    box-shadow: #1890ff 0px 0px 2px;
    padding: 5px;
    position: fixed;
    z-index: 100;
}
</style>