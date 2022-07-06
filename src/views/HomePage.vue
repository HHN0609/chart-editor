<template>
  <Layout class="home-page">
    <LayoutSider class="sider" v-model:collapsed="collapsed" collapsible>
      <div class="logo">hi!</div>
      <Menu theme="dark" mode="inline" @click="switchTitle" v-model:selectedKeys="selectedKeys">
        <MenuItem key="1">
          <bar-chart-outlined />
          <span>Projects</span>
        </MenuItem>
        <MenuItem key="2">
          <user-outlined />
          <span>Profile</span>
        </MenuItem>
        <MenuItem key="3" v-if="store.$state.isAdmin !== 0">
          <cluster-outlined />
          <span>Management</span>
        </MenuItem>
      </Menu>
    </LayoutSider>

    <Layout class="main">
      <LayoutHeader class="header">
        <strong>{{ headerTitle }}</strong>
        <strong>
          <Avatar>
            <template #icon>
              <user-outlined />
            </template>
          </Avatar>
          <Popover title="More Operations" trigger="hover" placement="bottomRight">
            <template #content>
              <a @click="logOut">Logout</a>
            </template>
            <a>{{ store.userName || "Not logged in" }}</a>
          </Popover>
        </strong>
      </LayoutHeader>
      <LayoutContent class="content">
        <router-view></router-view>
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import { UserOutlined, BarChartOutlined, ClusterOutlined } from "@ant-design/icons-vue";
import { message, Layout, LayoutContent, LayoutHeader, LayoutSider , Popover, Avatar, Menu, MenuItem } from "ant-design-vue";
import { onMounted, ref } from "vue";
import router from "@/router/index";
import userInfo from "@/stores/userInfo";
import { clearAllCookies } from "@/utils";

const store = userInfo();
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
const headerTitle = ref<string>("Projects");

const switchTitle = (event) => {
  switch (event.key) {
    case "1":
      headerTitle.value = "Projects";
      router.push({ name: "MyProject" });
      break;
    case "2":
      headerTitle.value = "Profile";
      router.push({ name: "MyProfile" });
      break;
    case "3":
      headerTitle.value = "Management";
      router.push({ name: "Manage" });
      break;
    default:
      break;
  }
};

const logOut = () => {
  message.loading("Exiting", 0.5).then(() => {
    store.$reset();
    localStorage.removeItem("token");
    clearAllCookies();
    router.replace({ name: "Login" });
  });
};

// 刷新页面，侧边栏不变
onMounted(() => {
  if (router.currentRoute.value.name === "MyProject") {
    selectedKeys.value = ["1"];
    headerTitle.value = "Projects";
  } else if (router.currentRoute.value.name === "MyProfile") {
    selectedKeys.value = ["2"];
    headerTitle.value = "Profile";
  } else if (router.currentRoute.value.name === "Manage") {
    selectedKeys.value = ["3"];
    headerTitle.value = "Management";
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
