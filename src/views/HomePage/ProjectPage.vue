<template>
<Spin size="large" :spinning="spinning" tip="Loading……" :delay="1000">
  <div class="container" >
    <header class="header">
      <Button type="primary" style="background-color:green; border: green 1px solid;" @click="modalVisible = true">Create Project</Button>
      <InputSearch
        v-model:value="searchInput"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
    </header>
    <Empty class="empty" v-if="projectInfoArr.length === 0" description="No Projects"></Empty>
    <main v-else class="main">
      <ChartCard
        v-for="data in projectInfoArr"
        :key="data.project_id"
        @delete-project="deleteProject"
        @go-dashboard="goDashboard" 
        :data="data">
      </ChartCard>
    </main>
  </div>
</Spin>
  <Modal v-model:visible="modalVisible" title="Create project" :footer="null" @cancel="closeModal">
    <Form
      ref="modalForm"
      class="modalForm"
      :label-col="{span: 10}"
      :wrapper-col="{span: 14}"
      :model="newProjectState"
      @finish="createProject"
    >
      <FormItem label="Name" name="name" required >
        <Input type="text" v-model:value="newProjectState.name" :maxlength="15"/>
      </FormItem>
      <FormItem label="Width" name="width" required>
        <Input type="number" v-model:value="newProjectState.width" suffix="px"/>
      </FormItem>
      <FormItem label="Height" name="height" required>
        <Input type="number" v-model:value="newProjectState.height" suffix="px"/>
      </FormItem>
      <FormItem label="Background color" name="bgColor" required>
        <ColorPicker v-model="newProjectState.bgColor" placement="right"></ColorPicker>
      </FormItem>
      <FormItem label="Viewport color" name="viewportColor" required>
        <ColorPicker v-model="newProjectState.viewportColor" placement="right"></ColorPicker>
      </FormItem>
      <div class="buttonItem">
        <Button type="primary" html-type="submit">Create</Button>
        <Button style="margin-left: 10px" @click="closeModal">Cancel</Button>
      </div>
    </Form>
  </Modal>
</template>
<script lang="ts" setup>
import { Spin, Modal, FormItem, Form, Button, Input, InputSearch, Empty } from "ant-design-vue"; 
import { onMounted, reactive, ref } from "vue";
import { deleteUserProjects, getUserProjects, postUserProjects } from "@/apis/index";
import userInfo from "@/stores/userInfo";
import ChartCard from "@/components/ChartCard.vue";
import { getCookie } from "@/utils";
import { FormInstance, message } from "ant-design-vue";
import ColorPicker from "@/components/rightSideForms/ColorPicker.vue";
import router from "@/router";

let spinning = ref<boolean>(true);
const modalForm = ref<FormInstance>();
const store = userInfo();
const searchInput = ref<string>("");
let projectInfoArr = reactive([]);
let newProjectState = reactive({
  name: "",
  width: 800,
  height: 450,
  bgColor: "#DCDCDC",
  viewportColor: "#272C2C",
});
const onSearch = (e) => {
  console.log(e);
};

const modalVisible = ref<boolean>(false);

const goDashboard = (project_Id: string) => {
  router.push({name: "DashBoard", params:{projectId: project_Id}});
}

const deleteProject = (project_id: string, ) => {
  deleteUserProjects("/user/projects", project_id, store.account)
    .then(({ data }) => {
      message.success(data.message, 1);
      getProjectsData();
    });
}

const closeModal = () => {
  modalVisible.value = false;
  modalForm.value.resetFields();
}

const createProject = () => {
  postUserProjects("/user/projects", store.account, {...newProjectState})
    .then(({data}) => {
      message.success(data.message, 0.2);
      closeModal();
      getProjectsData();
    })
}

onMounted(() => {
  getProjectsData();
});

function getProjectsData() {
  getUserProjects("/user/projects", store.account || getCookie("account")).then(({ data }) => {
    projectInfoArr.splice(0);
    projectInfoArr.push(...data);
    spinning.value = false;
  })
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: calc(100vh - 64px);
  position: relative;
  padding: 10px;
  overflow: hidden;
  > .header{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  >.empty{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50% - 8px);
  }
  > .main{
    height: calc(100% - 50px);
    overflow-x: hidden;
    overflow-y: auto;
    // display: flex;
    // flex-wrap: wrap;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-template-rows:repeat(auto-fill, 200px);
    justify-content: space-evenly;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(96, 96, 96, 0.4);
      box-shadow: inset006pxrgba(0, 0, 0, 0.5);
    }
  }
}
.modalForm{
  width: 70%;
  margin: 0 auto;
  > .buttonItem{
    display:flex;
    justify-content: center;
  }
}
</style>
