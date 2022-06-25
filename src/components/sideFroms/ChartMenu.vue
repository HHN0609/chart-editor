<template>
    <Menu @select="change" :selectedKeys="[]">
      <SubMenu>
        <template #icon>
          <PlusCircleOutlined />
        </template>
        <template #title>New Chart</template>
        <MenuItem v-for="type in CHARTTYPES" :key="type">
          {{ type }}
        </MenuItem>
      </SubMenu>
    </Menu>
</template>
<script lang="ts" setup>
import { Menu, MenuItem, SubMenu } from "ant-design-vue";
import { PlusCircleOutlined } from "@ant-design/icons-vue";
import { CHARTTYPES } from "@/components/charts/index";
const change = ({ key }) => {
    console.log(key);
}
</script>

<style lang="less" scoped>
</style>
