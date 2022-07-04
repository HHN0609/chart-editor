<template>
    <Menu @select="createNewChart" :selectedKeys="[]">
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
import { CHARTTYPES } from "@/charts/index";
import ProjectInfo from "@/stores/projectInfo";
import { generateUUID } from "@/utils";

const projectInfo = ProjectInfo();
const createNewChart = ({ key }) => {
    let index = projectInfo.maxIndex + 1;
    projectInfo.chartsDatas.push({
      uid: generateUUID(),
      basicData: {
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        rotate: 0,
        index: index,
        type: key
      },
      sourceData: [],
      // 这里要deepClone一下
      optionsData: [],
    })

}

</script>

<style lang="less" scoped>
</style>
