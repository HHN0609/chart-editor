<template>
  <a-layout class="home-page">
    <a-layout-sider
      class="sider"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo">hi!</div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        @click="switchPage"
      >
        <a-menu-item key="1">
          <bar-chart-outlined />
          <span>我的项目</span>
        </a-menu-item>
        <a-menu-item key="2">
          <user-outlined />
          <span>我的账户</span>
        </a-menu-item>
        <div class="trigger-btn" @click="triggerHandle">
          <component
            :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
          ></component>
        </div>
      </a-menu>
    </a-layout-sider>

    <a-layout class="main">
      <a-layout-header class="header">
        <strong>{{ headerTitle }}</strong>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  BarChartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const selectedKeys = ref<string[]>(["1"]);
const collapsed = ref<boolean>(false);
const headerTitle = ref<string>("已创建大屏");
const triggerHandle = () => {
  collapsed.value = !collapsed.value;
};
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
