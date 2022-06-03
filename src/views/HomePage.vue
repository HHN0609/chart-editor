<template>
  <a-layout class="home-page">
    <a-layout-sider class="sider" v-model:collapsed="collapsed" collapsible>
      <div class="logo">hi!</div>
      <a-menu theme="dark" mode="inline" @click="switchPage" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <bar-chart-outlined />
          <span>我的项目</span>
        </a-menu-item>
        <a-menu-item key="2">
          <user-outlined />
          <span>我的账户</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout class="main">
      <a-layout-header class="header">
        <strong>{{ headerTitle }}</strong>
        <strong>
          <a-avatar>
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          {{ user.userName }}
        </strong>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { UserOutlined, BarChartOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import userInfo from "../stores/userInfo";

const user = userInfo();
const router = useRouter();
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
const headerTitle = ref<string>("已创建大屏");

const switchPage = (event) => {
  switch (event.key) {
    case "1":
      headerTitle.value = "已创建大屏";
      router.push({
        name: "MyProject",
      });
      break;
    case "2":
      headerTitle.value = "个人信息";
      router.push({
        name: "MyProfile",
      });
      break;
    default:
      break;
  }
};
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
