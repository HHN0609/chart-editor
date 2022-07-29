<template>
  <div class="box" @mouseenter="showOverLayout = true" @mouseleave="showOverLayout = false">
    <div class="imgBox">
      <img src="../../asset/柱状图.svg" alt="No img" />
    </div>
    <div class="infoBox">
      <strong>{{ data.project_name }}</strong>
      <h5>create time:</h5>
      <h5>{{ create_time }}</h5>
    </div>
    <div class="overLayout" v-if="showOverLayout">
      <Button type="primary" @click="goDashBoard">Edit</Button>
      <Button type="primary" danger @click="showDeleteConfirm">Delete</Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { computed, ref } from "@vue/reactivity";
import { Modal, Button } from "ant-design-vue";
import { createVNode } from "vue";

type cardDataType = {
  project_id: number;
  project_name: string;
  create_time: string;
  last_modify: string;
  owner: string;
};
const props = defineProps<{
  data: cardDataType;
}>();
const emitter = defineEmits(["delete-project", "go-dashboard"]);
const create_time = computed(() => {
  const arr = props.data.create_time.split("T");
  return arr[0] + " " + arr[1].split(".")[0];
});
const showOverLayout = ref<Boolean>(false);
const showModal = ref<Boolean>(false);

const showDeleteConfirm = () => {
  Modal.confirm({
    title: "Are you sure delete this project?",
    icon: createVNode(ExclamationCircleOutlined),
    content: "This operation can not be restored !",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      emitter("delete-project", props.data.project_id);
    },
  });
};
const goDashBoard = () => {
  //会把project_id发过去
  emitter("go-dashboard", props.data.project_id);
};
</script>
<style lang="less" scoped>
.box {
  width: 200px;
  height: 200px;
  margin: 10px;
  position: relative;
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
  > .imgBox > img {
    width: 120px;
    height: 120px;
    overflow: hidden;
  }
  > .infoBox {
    overflow: hidden;
    height: fit-content;
    width: 80%;
  }
  > .overLayout {
    position: absolute;
    width: 100%;
    height: 200px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: inherit;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
