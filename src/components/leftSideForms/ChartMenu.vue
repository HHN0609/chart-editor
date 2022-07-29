<template>
    <Popconfirm placement="rightTop" :showCancel="false">
      <template #icon></template>
      <template #okButton>
        <div class="tabs">
          <Tabs :style="{height: '100%'}" tab-position="left">
            <TabPane v-for="[chartType, subTypes] in CHARTTYPES" :key="chartType" :tab="chartType">
                <div class="tab-content-area" @click="createNewChart">
                  <div v-for="[subType, img] in subTypes" :key="subType" class="content-card">
                     <img :src="img" alt="Error" :data-key="subType">
                     {{subType}}
                  </div>
                </div>
            </TabPane>
          </Tabs>
        </div>
      </template>
      <div class="menu">
        <PlusCircleOutlined />
        New Chart
        <RightOutlined />
      </div>
    </Popconfirm>
  <!-- <Menu @select="createNewChart" :selectedKeys="[]">
    <SubMenu>
      <template #icon>
        <PlusCircleOutlined />
      </template>
      <template #title>New Chart</template>
      <MenuItem v-for="type in CHARTTYPES" :key="type">
        {{ type }}
      </MenuItem>
    </SubMenu>
  </Menu> -->
</template>
<script lang="ts" setup>
import {  message, Popconfirm, Tabs, TabPane } from "ant-design-vue";
import { PlusCircleOutlined, RightOutlined } from "@ant-design/icons-vue";
import { CHARTTYPES, DEFAULTOPTIONSDATA, DEFAULTSOURCEDATA } from "@/charts/index";
import ProjectInfo from "@/stores/projectInfo";
import { generateUUID } from "@/utils";
import { postUserChartDetailInfo } from "@/apis";

const projectInfo = ProjectInfo();

const createNewChart = (e: PointerEvent) => {
  let el = e.target as HTMLElement;
  let key = el.getAttribute("data-key");
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

<style lang="less" scoped>
  .menu{
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    border-bottom: 1px black solid;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding:  0 20px;
    transition: 0.5s;
    &:hover {
      color: #1890ff;
      cursor: pointer;
    }
  }
  .tabs{
    width: 370px;
    height: 400px;
    .tab-content-area {
      height: 400px;
      width: 100%;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      // justify-content:space-around;
      // align-items: center;
      align-content: flex-start;
      >.content-card{
        width: 120px;
        height: 120px;
        overflow: hidden;
        text-align: center;
        margin: 2px;
        transition: 0.5s;
        > img{
          width: 120px;
          height: 100px;
        }
        &:hover {
          box-shadow: 0 0 1px 3px rgba(60, 60, 60, 0.449);
        }
      }
    }
  }

</style>
