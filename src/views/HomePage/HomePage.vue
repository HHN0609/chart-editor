<template>
  <Layout class="home-page">
    <LayoutSider class="sider" v-model:collapsed="collapsed" collapsible>
      <div class="logo">hi!</div>
      <Menu theme="dark" mode="inline" @click="switchTitle" v-model:selectedKeys="selectedKeys">
        <MenuItem v-for="{key, name, icon} in filterSiderConfig" :key="key">
          <Component :is="icon"></Component>
          <span>{{ name }}</span>
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
            <a style="margin-left: 5px;">{{ store.userName || "Not logged in" }}</a>
          </Popover>
        </strong>
      </LayoutHeader>
      <LayoutContent class="content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import { UserOutlined } from "@ant-design/icons-vue";
import { message, Layout, LayoutContent, LayoutHeader, LayoutSider , Popover, Avatar, Menu, MenuItem } from "ant-design-vue";
import { computed, onMounted, ref } from "vue";
import router from "@/router/index";
import userInfo from "@/stores/userInfo";
import { clearAllCookies } from "@/utils";
import siderConfig from "./siderConfig";

const store = userInfo();
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
const headerTitle = ref<string>("Projects");

const filterSiderConfig = computed(() => {
  return siderConfig.filter(({key}) => {
    return key === "3" && store.$state.isAdmin === 0 ? false : true;
  })
})

const switchTitle = (event) => {
  siderConfig.forEach((value) => {
    if(event.key === value.key){
      headerTitle.value = value.name;
      router.push({ name: value.routeName });
    }
  });
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
  siderConfig.forEach((value) => {
    if(router.currentRoute.value.name === value.routeName){
      selectedKeys.value = [`${value.key}`];
      headerTitle.value = value.name;
    }
  });
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
      padding: 0px 10px;
      height: 50px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    > .content {
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
