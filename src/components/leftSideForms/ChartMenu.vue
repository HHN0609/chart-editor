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
import { Menu, MenuItem, message, SubMenu } from "ant-design-vue";
import { PlusCircleOutlined } from "@ant-design/icons-vue";
import { CHARTTYPES, DEFAULTOPTIONSDATA, DEFAULTSOURCEDATA } from "@/charts/index";
import ProjectInfo from "@/stores/projectInfo";
import { generateUUID } from "@/utils";
import { postUserChartDetailInfo } from "@/apis";

const projectInfo = ProjectInfo();
const createNewChart = ({ key }) => {
  let index = projectInfo.maxIndex + 1;
  let newObj = {
    uid: generateUUID(),
    basicData: {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      rotate: 0,
      index: index,
      type: key,
    },
    sourceData: JSON.parse(JSON.stringify(DEFAULTSOURCEDATA[key])),
    optionsData: JSON.parse(JSON.stringify(DEFAULTOPTIONSDATA[key])),
  };
  // 写到数据库里面
  postUserChartDetailInfo("/user/chartDetailInfo", projectInfo.projectId, newObj.uid, JSON.stringify(newObj)).then(({ data }) => {
    message.success(data.message, 1);
    projectInfo.chartsDatas.push(newObj);
  });
};
</script>

<style lang="less" scoped></style>
