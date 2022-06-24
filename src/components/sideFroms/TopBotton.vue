<template>
    <div class="container">
        <div @click="$emit('save')">
            <save-outlined />
            <span>save</span>
        </div>
        <div @click="$emit('display')">
            <fund-projection-screen-outlined />
            <span>display</span>
        </div>
        <div @click="$emit('export')">
            <file-image-outlined />
            <span>export</span>
        </div>
        <div @click="$emit('exit')">
            <export-outlined />
            <span>exit</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { SaveOutlined, FileImageOutlined, ExportOutlined, FundProjectionScreenOutlined } from "@ant-design/icons-vue";
</script>
<style lang="less" scoped>
.container{
    width: 100%;
    height: 50px;
    display: flex;
    background-color:gainsboro;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: black 1px solid;
    > div{
        font-size:x-large;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 0.5s;
        cursor: pointer;
        > span{
            font-size: small;
        }
        &:hover{
            color: #1890ff;
        }
    }
}
</style>
