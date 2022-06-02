<template>
  <a-layout class="home-page">
    <a-layout-sider
      class="sider"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo">hi!</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <bar-chart-outlined />
          <span>我的项目</span>
        </a-menu-item>
        <a-menu-item key="2">
          <user-outlined />
          <span>我的账户</span>
        </a-menu-item>
        <a-menu-item>
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="header" style="background: #fff; padding: 0">
      </a-layout-header>
      <a-layout-content>
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
const selectedKeys = ref<string[]>(["1"]);
const collapsed = ref<boolean>(false);
</script>
<style lang="less" scoped>
.home-page {
  width: 100%;
  height: inherit;
  > .sider {
    > .trigger {
      margin: 0 auto;
    }
  }
}
</style>
