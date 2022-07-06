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
    <main class="main">
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
        <ColorPicker v-model="newProjectState.bgColor"></ColorPicker>
      </FormItem>
      <FormItem label="Viewport color" name="viewportColor" required>
        <ColorPicker v-model="newProjectState.viewportColor"></ColorPicker>
      </FormItem>
      <FormItem class="buttonItem" :wrapper-col="{span: 12}">
        <Button type="primary" html-type="submit">Create</Button>
        <Button style="margin-left: 10px" @click="closeModal">Cancel</Button>
      </FormItem>
    </Form>
  </Modal>
</template>
<script lang="ts" setup>
import { Spin, Modal, FormItem, Form, Button, Input, InputSearch } from "ant-design-vue"; 
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
  height: 100%;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  > .header{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  > .main{
    display: flex;
    justify-content: left;
    align-items: center;
    justify-items: center;
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
