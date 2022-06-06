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
          <a-popover title="更多操作" trigger="hover" placement="bottomRight">
            <template #content>
              <a @click="logOut">退出登录</a>
            </template>
            <a>{{ store.userName || "未登录" }}</a>
          </a-popover>
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
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import router from "@/router/index";
import userInfo from "@/stores/userInfo";

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
      router.push({ name: "Manage" });
      break;
    default:
      break;
  }
};

const logOut = () => {
  message.loading("正在退出", 0.5).then(() => {
    store.$reset();
    localStorage.removeItem("token");
    router.replace({ name: "Login" });
  });
};

// 刷新页面，侧边栏不变
onMounted(() => {
  if (router.currentRoute.value.name === "MyProject") {
    selectedKeys.value = ["1"];
    headerTitle.value = "已创建大屏";
  } else if (router.currentRoute.value.name === "MyProfile") {
    selectedKeys.value = ["2"];
    headerTitle.value = "个人信息";
  } else if (router.currentRoute.value.name === "Manage") {
    selectedKeys.value = ["3"];
    headerTitle.value = "全局管理";
  }
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
    }
  }
}
</style>
