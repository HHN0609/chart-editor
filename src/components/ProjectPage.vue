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
      <ChartCard @delete-chart="deleteChart" v-for="data in projectInfoArr" :data="data" :key="data.chart_id"></ChartCard>
    </main>
  </div>
  <a-modal v-model:visible="modalVisible" title="Create project" @ok="createProject">
    <label>Chart name: <a-input v-model:value="newChartName"></a-input></label>
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

let newChartName = ref("");

const onSearch = (e) => {
  console.log(e);
};

const modalVisible = ref<boolean>(false);
const deleteChart = (chart_id) => {
  deleteUserProjects("/user/projects", chart_id)
    .then(data => {
      getProjectsData();
    })
    .catch(reason => {
    })
}

const createProject = () => {
  postUserProjects("/user/projects", store.account, newChartName.value)
    .then(({data}) => {
      message.success(data.message, 0.2);
      modalVisible.value = !modalVisible.value;
      newChartName.value = "";
      getProjectsData();
    })
}

onMounted(() => {
  console.log("获取工程信息")
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
