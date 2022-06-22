<template>
  <div class="container" >
    <header class="header">
      <a-button type="primary" style="background-color:green; border: green 1px solid;" @click="modalVisible = true">Create Project</a-button>
      <a-input-search
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
  <a-modal v-model:visible="modalVisible" title="Create project" :footer="null" @cancel="closeModal">
    <a-form
      ref="modalForm"
      class="modalForm"
      :label-col="{span: 10}"
      :wrapper-col="{span: 14}"
      :model="newProjectState"
      @finish="createProject"
    >
      <a-form-item label="Name" name="name" required >
        <a-input type="text" v-model:value="newProjectState.name" :maxlength="15"/>
      </a-form-item>
      <a-form-item label="Width" name="width" required>
        <a-input type="number" v-model:value="newProjectState.width" suffix="px"/>
      </a-form-item>
      <a-form-item label="Height" name="height" required>
        <a-input type="number" v-model:value="newProjectState.height" suffix="px"/>
      </a-form-item>
      <a-form-item label="Background color" name="bgColor" required>
        <a-input type="color" v-model:value="newProjectState.bgColor" />
      </a-form-item>
      <a-form-item label="Viewport color" name="viewportColor" required>
        <a-input type="color" v-model:value="newProjectState.viewportColor" />
      </a-form-item>
      <a-form-item class="buttonItem" :wrapper-col="{span: 12}">
        <a-button type="primary" html-type="submit">Create</a-button>
        <a-button style="margin-left: 10px" @click="closeModal">Cancel</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { deleteUserProjects, getUserProjects, postUserProjects } from "@/apis/index";
import userInfo from "@/stores/userInfo";
import ChartCard from "@/components/ChartCard.vue";
import { getCookie } from "@/utils";
import { FormInstance, message } from "ant-design-vue";
import router from "@/router";

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

const deleteProject = (project_id: string) => {
  deleteUserProjects("/user/projects", project_id)
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
