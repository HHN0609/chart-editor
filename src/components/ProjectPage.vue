<template>
  <div class="container">
    <header class="header">
      <a-button type="primary" style="background-color:green; border: green 1px solid;">Create Project</a-button>
      <a-input-search
        v-model:value="searchInput"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
    </header>
    <main class="main">

    </main>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { getUserProjects } from "@/apis/index";
import userInfo from "@/stores/userInfo";

const store = userInfo();
const searchInput = ref<string>("");
const projectInfoArr = reactive([]);
const onSearch = (e) => {
  console.log(e);
};
onMounted(() => {
  console.log("account:", store.account)
  getUserProjects("/user/projects", store.account).then(({data}) => {
    console.log(data);
  })
});
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
