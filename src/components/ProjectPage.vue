<template>
  <div class="container" >
    <header class="header">
      <a-button type="primary" style="background-color:green; border: green 1px solid;" @click="modalVisible = !modalVisible">Create Project</a-button>
      <a-input-search
        v-model:value="searchInput"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
    </header>
    <main class="main">
      <ChartCard @delete-project="deleteProject" v-for="data in projectInfoArr" :data="data" :key="data.project_id"></ChartCard>
    </main>
  </div>
  <a-modal v-model:visible="modalVisible" title="Create project" :footer="null">
    <!-- <label>Project name: <a-input v-model:value="newprojectName"></a-input></label> -->
    <a-form
      style="width: 70%; margin: 0 auto;"
      :label-col="{span: 10}"
      :wrapper-col="{span: 14}"
      :model="newprojectState"
    >
      <a-form-item label="Name" name="name" required>
        <a-input type="text" v-model:value="newprojectState.name" />
      </a-form-item>
      <a-form-item label="Width" name="width" required>
        <a-input type="number" v-model:value="newprojectState.width" suffix="px"/>
      </a-form-item>
      <a-form-item label="Height" name="height" required>
        <a-input type="number" v-model:value="newprojectState.height" suffix="px"/>
      </a-form-item>
      <a-form-item label="Background color" name="bgColor" required>
        <a-input type="color" v-model:value="newprojectState.bgColor" />
      </a-form-item>
      <a-form-item label="Viewport color" name="viewportColor" required>
        <a-input type="color" v-model:value="newprojectState.viewportColor" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12 }">
        <a-button type="primary" html-type="submit" @click="createProject">Create</a-button>
        <a-button style="margin-left: 10px" @click="modalVisible=false">Cancel</a-button>
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
import { message } from "ant-design-vue";

const store = userInfo();
const searchInput = ref<string>("");
let projectInfoArr = reactive([]);
const newprojectState = reactive({
  name: "",
  width: 800,
  height: 450,
  bgColor: "#9c4f4f",
  viewportColor: "#9cdc4f"
})
let newprojectName = ref("");

const onSearch = (e) => {
  console.log(e);
};

const modalVisible = ref<boolean>(false);
const deleteProject = (project_id) => {
  deleteUserProjects("/user/projects", project_id)
    .then(({ data }) => {
      message.success(data.message, 1);
      getProjectsData();
    });
}

const createProject = () => {
  postUserProjects("/user/projects", store.account, newprojectName.value)
    .then(({data}) => {
      message.success(data.message, 0.2);
      modalVisible.value = false;
      newprojectName.value = "";
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
</style>
