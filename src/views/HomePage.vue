<template>
  <a-layout class="home-page">
    <a-layout-sider class="sider" v-model:collapsed="collapsed" collapsible>
      <div class="logo">hi!</div>
      <a-menu theme="dark" mode="inline" @click="switchTitle" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <bar-chart-outlined />
          <span>我的项目</span>
        </a-menu-item>
        <a-menu-item key="2">
          <user-outlined />
          <span>我的账户</span>
        </a-menu-item>
        <a-menu-item key="3" v-if="store.$state.isAdmin === 1">
          <cluster-outlined />
          <span>全局管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout class="main">
      <a-layout-header class="header">
        <strong>{{ headerTitle }}</strong>
        <strong>
          <a-avatar>
            <template #icon>
              <user-outlined />
            </template>
          </a-avatar>
          {{ store.userName || "未登录" }}
        </strong>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { UserOutlined, BarChartOutlined, ClusterOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { postVerify } from "../apis";
import router from "../router";
import userInfo from "../stores/userInfo";

const store = userInfo();
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
const headerTitle = ref<string>("已创建大屏");

const switchTitle = (event) => {
  switch (event.key) {
    case "1":
      headerTitle.value = "已创建大屏";
      router.push({ name: "MyProject" });
      break;
    case "2":
      headerTitle.value = "个人信息";
      router.push({ name: "MyProfile" });
      break;
    case "3":
      headerTitle.value = "全局管理";
      router.push({ name: "GlobalManagement" });
      break;
    default:
      break;
  }
};
onMounted(() => {
  // postVerify("/user/verify")
  //   .then((value) => {
  //     console.log(value);
  //   })
  //   .catch((reason) => {
  //     console.log(reason);
  //   });
});
</script>
<style lang="less" scoped>
.home-page {
  width: 100%;
  height: inherit;
  > .sider {
    .trigger-btn {
      overflow: hidden;
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
    .trigger-btn:hover {
      background: #1890ff;
      cursor: pointer;
    }
  }
  .main {
    > .header {
      padding: 0px 20px;
      background: #fff;
      display: flex;
      justify-content: space-between;
    }
    > .content {
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
